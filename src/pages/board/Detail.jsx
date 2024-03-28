import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ModalDetailAtom, BoardDetailAtom, ModalUpdateAtom } from "../../recoil/BoardAtom";

const Detail = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();
    const [modalDetailIsOpen, setModalDetailIsOpen] = useRecoilState(ModalDetailAtom);
    const [boardDetail, setBoardDetail] = useRecoilState(BoardDetailAtom);
    const setUpdateModalIsOpen = useSetRecoilState(ModalUpdateAtom);

    const handleDeleteBtnClick = async (e) => {
        e.preventDefault();
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            const request_data = {id: boardDetail.id};
            let response = await axios({
                method: 'delete',
                url: '/api/delete-board',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(request_data),
                withCredentials: true
            });
            console.log('Detail/handleDeleteBtnClick/response: ', response);
            if (response.status === 204) {
                alert('삭제 완료');
                setModalDetailIsOpen(false);
                navigate("/mypage", { });
            } else {
                alert('게시글 삭제 실패');
            }
        } else {
            return
        }
    };

    useEffect(() => {
        console.log('Detail/id: ', boardDetail.id);
        const getDetailBoard = async () => {
            let response = await axios.get(`/api/board-detail/${boardDetail.id}`, {withCredentials: true});
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
            setAuthor(response.data.data.author);
        }
        getDetailBoard();
    }, [boardDetail.id])
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold mt-1 text">Detail</h3>
                            <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => modalDetailIsOpen ? setModalDetailIsOpen(false) : navigate("/mypage", {})}>
                                <span className="bg-transparent text-black h-6 w-6 block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                        </div>

                        <div className="justify-center items-center text-center">
                            <h1> {author} </h1>
                            <h1> {title} </h1>
                            <h3> {content} </h3>
                            <div>

                                {modalDetailIsOpen === false ? (
                                    <Link
                                        to="/update-board"
                                        className="m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded"
                                        state={{
                                            id: boardDetail.id,
                                            title: boardDetail.title,
                                            content: boardDetail.content,
                                        }}
                                    >
                                        수정 하기
                                    </Link>
                                ) : (
                                    <input
                                        className="cursor-pointer m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded"
                                        type="button"
                                        onClick={() => {
                                            setModalDetailIsOpen(false);
                                            setUpdateModalIsOpen(true);
                                            setBoardDetail({
                                                id: boardDetail.id,
                                                title: boardDetail.title,
                                                content: boardDetail.content,
                                            })
                                        }}
                                        value="수정 하기"
                                    />
                                )}

                                <input className="cursor-pointer m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded" type="button" onClick={handleDeleteBtnClick} value="삭제 하기"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail;