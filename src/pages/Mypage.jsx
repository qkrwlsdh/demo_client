import { React, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil';
import BoardList from "../components/BoardList/BoardList";
import { BoardAtom } from "../recoil/BoardAtom";
import { Link } from "react-router-dom";
import { loginIdAtom } from "../recoil/MemberAtom";

const Mypage = () => {
    const [data, setData] = useRecoilState(BoardAtom)
    const userId = useRecoilValue(loginIdAtom);

    useEffect(() => {
        const getBoardList = async () => {
            console.log('getBoardList()');
            let response = await axios.get("/api/board-list");
            console.log('main/response: ', response);
            setData(response.data.data);
        };
        getBoardList();
    }, [setData])
    return(
      <>
        <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          <div class="m-10 flex flex-col items-center mx-auto max-w-screen-lg">
            <div class="header flex w-full justify-center">
              <h2 class="font-black pb-10 mb-20 text-5xl text-blue-900 before:block before:absolute before:bg-sky-300  relative before:w-1/3 before:h-1 before:bottom-0 before:left-1/3">Bankedin articles</h2>
            </div>

            <div className="w-full flex items-center justify-between py-5">
              <div>
                <Link to={"/create-board"} >
                  <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='게시글 작성하기'/>
                </Link>
              </div>

              <div className="text-blue-900">{ userId }님 환영합니다</div>
            </div>

            <div class="grid w-full gap-10 grid-cols-3">
              <BoardList data={data}/>
            </div>
          </div>
        </div>
      </>
    )
};
export default Mypage;