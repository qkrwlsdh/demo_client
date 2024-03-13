import { React, useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import BoardList from "../components/BoardList/BoardList";
import { BoardAtom, PagingAtom, ModalAtom, ModalDetailAtom, ModalUpdateAtom } from "../recoil/BoardAtom";
import { Link } from "react-router-dom";
import { loginIdAtom } from "../recoil/MemberAtom";
import ReactModal from "react-modal";
import CreateBoard from "./CreateBoard";
import Detail from "./Detail";
import UpdateBoard from "./UpdateBoard";
import { authorizationAtom, cidAtom, tidAtom } from "../recoil/KakaopayAtom";
import Pagination from "../components/Pagination";

const Main = () => {
    const [data, setData] = useRecoilState(BoardAtom);
    const userId = useRecoilValue(loginIdAtom);
    const [page, setPage] = useRecoilState(PagingAtom);
    const [modalIsOpen, setModalIsOpen] = useRecoilState(ModalAtom);
    const modalDetailIsOpen = useRecoilValue(ModalDetailAtom);
    const modalUpdateIsOpen = useRecoilValue(ModalUpdateAtom);
    const cid = useRecoilValue(cidAtom);
    const setTid = useSetRecoilState(tidAtom);
    const authSecretKey = useRecoilValue(authorizationAtom);

    const getBoardList = async (pageNumber) => {
      // let response = await axios.get(
      //   `/api/paging?page=${pageNumber === 0 ? 1 : pageNumber}`
      //   , {withCredentials: true}
      // );
      let response = await axios.get(
        "/"
        , {withCredentials: true}
      );
      // setData(response.data.data.boardPages.content);
      // setPage(response.data.data.boardPages);
    };

    const handlePageChange = (pageNumber) => {
      getBoardList(pageNumber);
    };

    useEffect(() => {
      getBoardList(page.number);

    }, [modalIsOpen, modalDetailIsOpen, modalUpdateIsOpen]); // 변수가 수정될때마다 렌더링

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
      );
      if (response.status === 200) {
        console.log(response.data);
        console.log(response.data.tid);

        setTid(response.data.tid);
        window.open(response.data.next_redirect_pc_url);
      }
    }

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
                <Link>
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='팝업으로 작성하기' onClick={() => setModalIsOpen(true)}/>
                </Link>
              </div>

              <div className="m-5 text-blue-900">{ userId } 님 환영합니다</div>
            </div>
            <div className="w-full flex items-center justify-between py-5">
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
                <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type="button" value='네이버 결제' />
              </div>
            </div>

            <div className="gap-10">
              <BoardList data={data}/>
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