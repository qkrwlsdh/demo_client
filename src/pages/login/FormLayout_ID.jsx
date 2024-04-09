import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import TailwindToaster from '../../components/Toaster';

export default function FormLayout_ID() {

    const [ccNo, setCcNo] = useState('');
    const [repBirthDt, setRepBirthDt] = useState('');
    let navigate = useNavigate();

    /**
     * 사업자 번호 입력 이벤트 (총 10자 중 3자-2자-5자로 표현)
     * @param {*} e
     */
    const handleNumber = (e) => {
        const value = e.target.value.replace(/\D+/g, "");
        const numberLength = 10;
        let result = "";

        for (let i = 0; i < value.length && i < numberLength; i++) {
          switch (i) {
            case 3:
              result += "-";
              break;
            case 5:
              result += "-";
              break;

            default:
              break;
        }
        result += value[i];
        }
        e.target.value = result;

        setCcNo(e.target.value);
    };

    /**
     * 생년월일 입력 이벤트 (총 8자 중 4자-2자-2자로 표현)
     * @param {*} e
     */
    const handleBirthDate = (e) => {
        const value = e.target.value.replace(/\D+/g, "");
        const numberLength = 8;
        let result = "";

        for (let i = 0; i < value.length && i < numberLength; i++) {
          switch (i) {
            case 4:
              result += "/";
              break;
            case 6:
              result += "/";
              break;

            default:
              break;
        }
        result += value[i];
        }
        e.target.value = result;

        setRepBirthDt(e.target.value);
    };

    /**
     * API 호출 (요청이 완료되면 완료 메세지를 띄우고 로그인 화면으로 라우팅)
     * @param {*} e
     */
    const sendForm = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Loading...");
        await axios.post(
            "/api/findUsername",
            {
                "ccNo": ccNo.replace(/\D+/g, ""),
                "repBirthDt": repBirthDt.replace(/\D+/g, ""),
            },
            {
                headers: {
                'Content-Type': 'application/json' // 헤더에 Content-Type 지정
                }
            },
        ).then(response => {
          // TODO 동기로 찾아보기
          console.log(response);
          toast.dismiss(toastId);
          toast.success("아이디 찾기 요청이 완료되었습니다.\n\n등록된 이메일로 아이디를 전송합니다.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }).catch(error => {
          console.error(error);
          toast.dismiss(toastId);
          toast.error("아이디 찾기 요청을 실패했습니다.\n\n입력한 값을 다시 확인해보세요.");

        });
    }

  return (
    <>
      <form className=''>
        <div className="space-y-12 w-9/12 mx-auto">
          <div className="border-b border-gray-900/10 py-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">아이디 찾기</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">등록된 이메일로 아이디를 전송합니다.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="ccNo" className="block text-sm font-medium leading-6 text-gray-900">
                  사업자 번호
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ccNo"
                    id="ccNo"
                    value={ccNo}
                    onChange={handleNumber}
                    placeholder='000-00-00000'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className='text-xs ml-2 text-slate-500'>사업자 번호 10자리를 "-" 없이 입력해주세요.</p>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="repBirthDt" className="block text-sm font-medium leading-6 text-gray-900">
                  대표자 생년월일
                </label>
                <div className="mt-2">
                  <input
                    id="repBirthDt"
                    name="repBirthDt"
                    type="text"
                    onChange={handleBirthDate}
                    placeholder='YYYY/MM/DD'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <p className='text-xs ml-2 text-slate-500'>YYYY/MM/DD 형식에 맞춰 "/" 없이 입력해주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 w-9/12 py-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/')}>
            취소
          </button>
          <button
            type="submit"
            onClick={sendForm}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            확인
          </button>
        </div>
      </form>
      <TailwindToaster />
    </>
  )
}
