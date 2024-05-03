import { React, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import BoardList from "../components/BoardList/BoardList";
import { BoardAtom, PagingAtom, ModalAtom, ModalDetailAtom, ModalUpdateAtom } from "../recoil/BoardAtom";
import { Link, useNavigate } from "react-router-dom";
import { loginIdAtom, modalIsOpenAtom } from "../recoil/MemberAtom";
import ReactModal from "react-modal";
import CreateBoard from "./board/CreateBoard";
import Detail from "./board/Detail";
import UpdateBoard from "./board/UpdateBoard";
import { authorizationAtom, cidAtom, tidAtom } from "../recoil/KakaopayAtom";
import Pagination from "../components/Pagination";
import { useCookies } from "react-cookie";

const Main = () => {
    const boardData = useRecoilValue(BoardAtom);
    const [userId, setUserId] = useRecoilState(loginIdAtom);
    const page = useRecoilValue(PagingAtom);
    const [modalIsOpen, setModalIsOpen] = useRecoilState(ModalAtom);
    const setOtpmodalIsOpen = useSetRecoilState(modalIsOpenAtom);
    const modalDetailIsOpen = useRecoilValue(ModalDetailAtom);
    const modalUpdateIsOpen = useRecoilValue(ModalUpdateAtom);
    const cid = useRecoilValue(cidAtom);
    const setTid = useSetRecoilState(tidAtom);
    const authSecretKey = useRecoilValue(authorizationAtom);
    const [cookies, setCookie, removeCookie] = useCookies(['refresh']);
    let navigate = useNavigate();

    const getBoardList = async (pageNumber) => {
      await axios.get(
        // `/api/paging?page=${pageNumber === 0 ? 1 : pageNumber}`
        '/'
        , {withCredentials: true}
      );
      // setData(response.data.data.boardPages.content);
      // setPage(response.data.data.boardPages);
    };

    const handlePageChange = (pageNumber) => {
      getBoardList(pageNumber);
    };

    useEffect(() => {
      const base64Payload = cookies.refresh.split('.')[1];
      const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedJWT = JSON.parse(decodeURIComponent(
        window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
      ));
      console.log('decodedJWT : ', decodedJWT);

      setUserId(decodedJWT.username);

      getBoardList(page.number);
    }, [modalIsOpen, modalDetailIsOpen, modalUpdateIsOpen]); // 변수가 수정될때마다 렌더링

    const logOut = async () => {
      setOtpmodalIsOpen(false);
      await axios.post(
        "/logout",
        {withCredentials: true}
        ).then((res) => {
          navigate('/');
        }).catch((err) => {
          console.log(err);
        });
      // removeCookie('refresh'); // 쿠키를 삭제
      // removeCookie('verify');
      // navigate('/'); // 메인 페이지로 이동
    };


    const kakaopay = async () => {
      let kakaoData = {
        "cid": cid,
        "partner_order_id": "partner_order_id",
        "partner_user_id": "partner_user_id",
        "item_name": "초코파이",
        "quantity": "1",
        "total_amount": "2200",
        "vat_amount": "200",
        "tax_free_amount": "0",
        "approval_url": "http://localhost:3000/kakaoResult",
        "fail_url": "http://localhost:3000",
        "cancel_url": "http://localhost:3000",
        "authorization": authSecretKey,
      }

      let response = await axios.post(
        "http://localhost:8080/payment/kakaopay",
        kakaoData,
        {withCredentials: true}
      );
      if (response.status === 200) {
        console.log(response.data);
        console.log(response.data.tid);

        setTid(response.data.tid);
        window.open(response.data.next_redirect_pc_url);
      }
    }
    const merchantId = 'mid3';

    return(
      <>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6">
          <div className="m-10 flex flex-col items-center mx-auto max-w-screen-sm">
            <div className="header flex w-full justify-center">
              <h2 className="font-black pb-10 mb-20 text-5xl text-blue-900 before:block before:absolute before:bg-sky-300  relative before:w-1/3 before:h-1 before:bottom-0 before:left-1/3">Bankedin articles</h2>
            </div>

            <div className="w-full flex items-center justify-between py-5">
              <div>
                <Link to={"/create-board"} >
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='게시글 작성하기'/>
                </Link>
              </div>
              <div>
                <Link to={"/resend-unnotify"} >
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='미반영 데이터 처리'/>
                </Link>
              </div>
              <div>
                <Link>
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='팝업으로 작성하기' onClick={() => setModalIsOpen(true)}/>
                </Link>
              </div>

              {/* <div className="m-5 text-blue-900">{ userId } 님 환영합니다</div> */}
              <Link>
                <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='로그아웃' onClick={logOut}/>
              </Link>
            </div>
            <div className="w-full flex items-center justify-between py-5">
              <div>
                <Link to={"/keyin-smartro"} state={{merchantId: merchantId}}>
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='스마트로 수기결제' />
                </Link>
              </div>
              <div>
                <Link>
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='카카오 결제' onClick={() => kakaopay()}/>
                </Link>
              </div>
              <div>
                <Link to={"/checkout"}>
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='토스 결제'/>
                </Link>
              </div>
              <div>
                <Link to={"/formlayout_reissue"} state={{username: userId}}>
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type="button" value='비밀번호 재설정' />
                </Link>
              </div>
            </div>

            <div className="gap-10">
              <BoardList data={boardData}/>
            </div>
            <Pagination currentPage={page.number+1} totalPages={page.totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
        <ReactModal className="relative" isOpen={modalIsOpen} ariaHideApp={false}>
          <CreateBoard />
        </ReactModal>

        <ReactModal className="relative" isOpen={modalDetailIsOpen} ariaHideApp={false}>
          <Detail />
        </ReactModal>

        <ReactModal className="relative" isOpen={modalUpdateIsOpen} ariaHideApp={false}>
          <UpdateBoard />
        </ReactModal>
      </>
    )
};
export default Main;