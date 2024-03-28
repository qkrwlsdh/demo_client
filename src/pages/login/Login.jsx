import { React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import { useRecoilState } from 'recoil';
import { loginIdAtom, loginPwAtom, modalIsOpenAtom, loginResDataAtom, tokenAtom } from "../../recoil/MemberAtom";
import toast from "react-hot-toast";
import TailwindToaster from "../../components/Toaster";

const Login = () => {

    const [username, setUsername] = useRecoilState(loginIdAtom);
    const [password, setPassword] = useRecoilState(loginPwAtom);
    const [token, setToken] = useRecoilState(tokenAtom);
    const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenAtom);
    const [loginResData, setLoginResData] = useRecoilState(loginResDataAtom);
    let navigate = useNavigate();

    const resetInput = () => {
        setPassword("");
    }

    const validations = () => {
        if (username.length < 6 || username.length > 20) {
            toast.error("아이디는 6자 이상 20자 이하로 입력해주세요.");
            return false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        // 비밀번호 vaildation
        if (!passwordRegex.test(password)) {
            toast.error("비밀번호는 숫자, 영문자, 특수문자를 혼합하여 8자 이상으로 입력해주세요.");
            return false;
        }
        // 비밀번호에 아이디가 포함되었는지 체크
        if (password.includes(username)) {
            toast.error("비밀번호에 아이디를 포함할 수 없습니다.");
            return false;
        }
        // 비밀번호 분기별 1회 이상 변경 기능은 비밀번호 변경 히스토리 생성 후 작업
        return true;
    }

    // 로그인 버튼 이벤트
    const loginBtnClick = async () => {
        const requestData = { username, password };

        if (!validations()) {
            return;
        } else {
            try {
                const response = await axios.post(
                    '/login'
                    , requestData
                    , {
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' // 헤더에 Content-Type 지정
                        }
                    },
                    {withCredentials: true}
                )

                // 구글 OTP 등록
                if (response.status === 200) {
                    setLoginResData({loginId: username, googleOtp: response.data.googleOtp});
                    setModalIsOpen(true);
                }
            } catch (err) {
                if (err.response.status === 423) {
                    toast.error("로그인 5회 이상 실패 시 로그인이 불가합니다.");
                } else if (err.response.status === 401) {
                    toast.error("로그인 실패");
                }
                console.log('Login/loginBtnClick/err: ', err);
            } finally {
                resetInput();
            }
        }
    }
    // Enter 입력이 되면 클릭 이벤트 실행
    const handleOnKeyPressLogin = (e) => {
        if (e.key === 'Enter') {
            loginBtnClick();
        }
    };
    const handleOnKeyPressAuth = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };
    // otp code input 이벤트
    const handleInput = (e) => {
        e.preventDefault();
        if (e.target.value.length > 6) {
            e.target.value = e.target.value.substr(0,6);
        }
        setToken(e.target.value);
    };
    // otp code submit 이벤트
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await checkAuth();
        } catch (err) {
            console.log('Login/handleSubmit/err: ', err);
        }
    };
    /**
     * @Promise
     * Promise 객체는 비동기 로직을 마치 동기처럼 사용할 수 있는 기능을 가집니다.
     * 실행 함수는 프로미스를 이행(resolve)하거나, 거부(reject)할 수 있음.
     * 프로미스를 이행했을 때 할 일은 then() 호출로 정의하고, 거부됐을 때 할 일은 catch() 호출로 정의함.
     */
    function checkAuth() {
        return new Promise((resolve, reject) => {
            const data = {
                "token": token,
                "loginId": loginResData.loginId,
            }
            axios.post(
                    '/api/auth'
                    , data
                    , {withCredentials: true}
                ).then(res => {

                if (res.status === 200) {
                    console.log(res)

                    if (res.data === 'Y') {
                        console.log('res.data = Y');
                        navigate("/formlayout_reissue", {state: {username: loginResData.loginId}});
                    } else if (res.data === 'N') {
                        console.log('res.data = N');
                        navigate("/");
                    }
                    resolve();
                } else {
                    toast.error("인증 코드가 맞지 않습니다.");
                    reject();
                }
            });
        });
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Bankedin Demo
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                                <input type="text" name="userid" id="userid" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@bankedin.io" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={password} placeholder="영문, 숫자, 특수문자 포함 8자 ~ 20자" onChange={(e) => setPassword(e.target.value)} onKeyDown={handleOnKeyPressLogin} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    {/* <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div> */}
                                    {/* <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div> */}
                                    <div className="ml-3 text-sm">
                                        <a href="/formlayout_id" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">아이디 찾기</a>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <a href="/formlayout_pw" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">비밀번호 찾기</a>
                                    </div>
                                </div>
                            </div>
                            <input type="button" onClick={loginBtnClick} value='Sign in' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" />
                        </form>
                    </div>
                </div>
            </div>
            <ReactModal className="relative" isOpen={modalIsOpen} ariaHideApp={false}>
                <form className="">
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold mt-1">Authenticator CODE</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setModalIsOpen(false)}>
                                        <span className="bg-transparent text-black h-6 w-6 block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
                                </div>
                                <input className="m-5 p-3 border" type="number" name="code" autoFocus onChange={handleInput} onKeyDown={handleOnKeyPressAuth} placeholder="6자리 입력" />
                                <input type="submit" className="m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded" onClick={handleSubmit} value="확인" />
                            </div>
                        </div>
                    </div>
                </form>
            </ReactModal>
        <TailwindToaster />
        </section>
    );
}

export default Login;