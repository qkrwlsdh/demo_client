import React from "react";
import BoardBox from "../BoardBox/BoardBox";
import { BoardAtom } from "../../recoil/BoardAtom";
import { useRecoilValue } from "recoil";


const BoardList = () => {
  const boardAtom = useRecoilValue(BoardAtom);
   console.log('boerdList/props: ', boardAtom);
  return (
    <>
       {Array.isArray(boardAtom) && boardAtom.length !== 0 ?
        boardAtom.map((i) => (
            <BoardBox
                key = {i.id}
                id = {i.id}
                author = {i.author}
                title = {i.title}
                content = {i.content}
            />
        ))
        : <p>게시글이 존재하지 않습니다.</p>}
    </>
  );
};
export default BoardList;