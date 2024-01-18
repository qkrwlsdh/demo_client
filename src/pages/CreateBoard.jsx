import React from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { loginIdAtom } from "../recoil/MemberAtom";
const titleState = atom({ key: "title", default: "" });
const contentState = atom({ key: "content", default: "" });

const CreateBoard = () => {

    const [title, setTitle] = useRecoilState(titleState);
    const [content, setContent] = useRecoilState(contentState);
    const author = useRecoilValue(loginIdAtom);
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
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
        } finally {
            resetInput();
        }
    }
    return (
        <form>
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
            <input type="button" value="게시글 생성" onClick={handleInputClick}/>
        </form>
    )
}

export default CreateBoard;