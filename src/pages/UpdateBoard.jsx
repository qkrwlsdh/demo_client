import { React, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BoardDetailAtom, ModalUpdateAtom } from "../recoil/BoardAtom";

const UpdateBoard = () => {
    // 지역 state
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // 글로벌 state
    const [boardDetail, setBoardDetail] = useRecoilState(BoardDetailAtom);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useRecoilState(ModalUpdateAtom);

    const id = boardDetail.id;
    const old_title = boardDetail.title;
    const old_content = boardDetail.content;

    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용

    const resetInput = () => {
        setContent("");
        setTitle("");
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
    }

    const handleInputClick = async (e) => {
        e.preventDefault();
        console.log('writeBoard');
        const request_data = {id: id, title: title, content: content};
        console.log('req_data: ', request_data);
        try{
            let response = await axios.put('/api/update-board', request_data);
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            navigate("/mypage", {});
            setModalUpdateIsOpen(false);
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
            resetInput();
        }
    }
    useEffect(() => {
            console.log('UpdateBoard/useEffect()');
            setTitle(old_title);
            setContent(old_content);
        }, [old_title, old_content])
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold mt-1 text">Update</h3>
                            <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => modalUpdateIsOpen ? setModalUpdateIsOpen(false) : navigate("/mypage", {})}>
                                <span className="bg-transparent text-black h-6 w-6 block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                        </div>

                        <div className="justify-center items-center text-center">
                            <label>제목</label> <br/>
                            <input id='input_title' type="text" placeholder="수정할 제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value) }/><br/>

                            <label>내용</label><br/>
                            <textarea id='textarea_content' type="text" placeholder="수정할 내용 을 입력해주세요" value={content}  onChange={(e) => setContent(e.target.value) }/><br/>

                            <div>
                                <input className="cursor-pointer m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded" type="button" value="게시글 수정" onClick={handleInputClick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateBoard;