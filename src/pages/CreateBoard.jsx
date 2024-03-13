import React from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginIdAtom } from "../recoil/MemberAtom";
import { ModalAtom } from "../recoil/BoardAtom";
const titleState = atom({ key: "title", default: "" });
const contentState = atom({ key: "content", default: "" });

const CreateBoard = () => {

    const [title, setTitle] = useRecoilState(titleState);
    const [content, setContent] = useRecoilState(contentState);
    const author = useRecoilValue(loginIdAtom);
    const [modalIsOpen, setModalIsOpen] = useRecoilState(ModalAtom);
    let navigate = useNavigate(); // 다른 component 로 이동할 때 사용

    const resetInput = () => {
        setContent("");
        setTitle("");
    }
    const handleInputClick = async (e) => {
        const requestData = { title, content, author };

        try{
            const response = await axios.post(
                "/api/create-board"
                , requestData
                , {headers: { "Content-Type": "application/json" },
              });

              if (response.status >= 400) {
                alert("게시글 생성이 정상적으로 되지 않았습니다.");
              }

              navigate("/mypage", {});
              setModalIsOpen(false);
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
        } finally {
            resetInput();
        }
    }
    return (
        <form>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold mt-1">게시글 작성</h3>
                            <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => modalIsOpen ? setModalIsOpen(false) : navigate("/mypage", {})}>
                                <span className="bg-transparent text-black h-6 w-6 block outline-none focus:outline-none">
                                ×
                                </span>
                            </button>
                        </div>

                        <label>제목</label><br/>
                        <input
                            id='input_title'
                            type="text"
                            placeholder="제목을 입력해주세요"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title} /><br/><br/>
                        <label>내용</label><br/>
                        <textarea
                            id='textarea_content'
                            type="text"
                            placeholder="내용을 입력해주세요"
                            onChange={(e) => setContent(e.target.value)}
                            value={content} /><br/>
                        <input type="button" className="m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded" onClick={handleInputClick} value="작성 완료" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateBoard;