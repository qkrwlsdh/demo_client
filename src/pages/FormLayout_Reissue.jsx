import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import TailwindToaster from '../components/Toaster';
import toast from 'react-hot-toast';

export default function FormLayout_Reissue() {

    let location = useLocation();
    let navigate = useNavigate();
    const username = location.state.username;

    const sendForm = async (data) => {
        const toastId = toast.loading("Loading...");
        const requestData = {
            username: username,
            currentPw: data.currentPw,
            newPw: data.password,
        };

        await axios.post(
            "/api/changePassword",
            requestData,
            {
                headers: {
                  'Content-Type': 'application/json' // 헤더에 Content-Type 지정
                }
            },
        ).then(response => {
          console.log(response);
          toast.dismiss(toastId);
          toast.success("비밀번호 변경이 완료되었습니다.");
          setTimeout(() => {
            navigate("/");
          }, 2000);

        }).catch((e) => {
          console.log(e);
          toast.dismiss(toastId);
          toast.error("현재 비밀번호를 다시 확인해주세요.");
        });
    }

    const { register, watch, setError, clearErrors, formState: { errors }, handleSubmit } = useForm({
      mode: "onChange",
    });

    useEffect(() => {
      if (watch('password') !== watch('passwordCheck') && watch('passwordCheck')) {
        setError('passwordCheck', {
          type: 'password-mismatch',
          message: '비밀번호가 일치하지 않습니다.',
        });
      } else {
        clearErrors('passwordCheck');
      }
    }, [watch('password'), watch('passwordCheck')]);

  return (
    <>
      <form onSubmit={handleSubmit(sendForm)}>
        <div className="space-y-12 w-9/12 mx-auto">
          <div className="border-b border-gray-900/10 py-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">비밀번호 재설정</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">비밀번호는 <strong><u>최소 8자리 이상 영문자 + 숫자 + 특수문자 20자리 이내</u></strong> 으로 등록하셔야 합니다.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-4">
                <label htmlFor="currentPw" className="block text-sm font-medium leading-6 text-gray-900">
                  현재 비밀번호
                </label>
                <div className="mt-2">
                  {/* <input
                    type="password"
                    name="currentPw"
                    id="currentPw"
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  /> */}
                  <input
                    type="password"
                    {...register('currentPw', {
                      required: '현재 비밀번호를 입력해주세요',
                      pattern: {
                          value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                          message: '영문, 숫자, 특수문자 포함 8 ~ 20자로 입력해주세요'
                      }
                    })}
                    maxLength="15"
                    placeholder='영문, 숫자, 특수문자 포함 8자 ~ 20자'
                    name="currentPw"
                    id="currentPw"
                    // onChange={(e) => setCurrentPw(e.target.value)}
                    className={errors.currentPw ? "text-red-900 bg-red-50 block w-full rounded-md border-0 border-red-500 placeholder-red-700 py-1.5 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 focus:border-red-500 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                  />
                  {errors.currentPw ? <p className='text-red-500 text-xs ml-2'>{errors.currentPw.message}</p> : <p className='text-white text-xs ml-2'>temp</p>}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  새비밀번호
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register('password', {
                      required: '비밀번호를 입력해주세요',
                      pattern: {
                          value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                          message: '영문, 숫자, 특수문자 포함 8 ~ 20자로 입력해주세요'
                      }
                    })}
                    maxLength="15"
                    placeholder='영문, 숫자, 특수문자 포함 8자 ~ 20자'
                    name="password"
                    id="password"
                    className={errors.password ? "text-red-900 bg-red-50 block w-full rounded-md border-0 border-red-500 placeholder-red-700 py-1.5 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 focus:border-red-500 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                  />
                  {errors.password ? <p className='text-red-500 text-xs ml-2'>{errors.password.message}</p> : <p className='text-white text-xs ml-2'>temp</p>}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="passwordCheck" className="block text-sm font-medium leading-6 text-gray-900">
                  새비밀번호 확인
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    {...register('passwordCheck', {
                      required: '비밀번호를 확인해주세요',
                      validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다'
                    })}
                    maxLength="15"
                    placeholder='비밀번호 확인'
                    id="passwordCheck"
                    name="passwordCheck"
                    className={errors.passwordCheck ? "text-red-900 bg-red-50 block w-full rounded-md border-0 border-red-500 placeholder-red-700 py-1.5 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-500 focus:border-red-500 sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                  />
                  {errors.passwordCheck ? <p className='text-red-500 text-xs ml-2'>{errors.passwordCheck.message}</p> : <p className='text-white text-xs ml-2'>temp</p>}
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
