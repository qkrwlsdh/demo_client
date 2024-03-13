import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BoardDetailAtom, ModalDetailAtom } from '../../recoil/BoardAtom';

const BoardBox = (props) => {
    const setModalDetailIsOpen = useSetRecoilState(ModalDetailAtom);
    const setBoardDetail = useSetRecoilState(BoardDetailAtom)
    // console.log('beerBox/props: ', props);
    return(
    <>
        <li className="flex justify-between py-5">
            <div className="">
                <div className="">
                    <Link
                        to = {"/detail"}
                        onClick={() => {setBoardDetail({
                            id: props.id,
                            title: props.title,
                            content: props.content
                            })
                        }}
                        state = {{
                            id: props.id,}}
                    >
                        <p className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600">{props.title}</p>
                    </Link>
                    <p className="mt-1 text-xs leading-5 text-gray-500 max-w-lg truncate ...">{props.content}</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900 cursor-pointer transition-all hover:text-blue-600" onClick={() => {setModalDetailIsOpen(true); setBoardDetail({id: props.id, title: props.title, content: props.content});}}>{props.author}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">{new Date(props.createdDt).toLocaleString()}</p>
            </div>
        </li>
    </>
    )
}
export default BoardBox;