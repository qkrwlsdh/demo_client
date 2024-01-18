import { React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import { useRecoilState } from 'recoil';
import { loginIdAtom, loginPwAtom, modalIsOpenAtom, responseDataAtom, tokenAtom } from "../recoil/MemberAtom";
const Login = () => {
    /**
     * @useState
     * state란 컴포넌트가 가질 수 있는 상태를 말합니다.
     * 변수 선언 예시로는 const [state, setState] = useState(초기값);
     * state의 값을 변경할 때는 setState(변경할 값); 처럼 setState 함수를 불러 변경할 값을 인자로 넣어주면 됩니다.
     * setState 함수를 이용해서 값을 변경하면 해당 컴포넌트는 렌더링이 되어 화면이 업데이트 됩니다.
     */
    const [loginId, setLoginId] = useRecoilState(loginIdAtom);
    const [loginPw, setLoginPw] = useRecoilState(loginPwAtom);
    const [token, setToken] = useRecoilState(tokenAtom);
    const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenAtom);
    const [responseData, setResponseData] = useRecoilState(responseDataAtom);
    // const [qrModalIsOpen, setQrModalIsOpen] = useState(false);
    // const [qrUrl, setQrUrl] = useState(null);
    /**
     * @useNavigate
     * Link의 용도와 마찬가지로 페이지 이동을 하게 하는 함수입니다.
     * 하지만 Link는 클릭시 페이지를 바로 이동하게 하는 기능을 하고 useNavigate는 조건을 만족했을때 페이지 전환을 하도록 합니다.
     */
    let navigate = useNavigate();

    const resetInput = () => {
        // setLoginId("");
        setLoginPw("");
    }

    const validations = () => {
        if (loginId.length < 6 || loginId.length > 20) {
            alert("아이디는 6자 이상 20자 이하로 입력해주세요.");
            return false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/;
        // 비밀번호 vaildateion
        if (!passwordRegex.test(loginPw)) {
            alert("비밀번호는 숫자, 영문자, 특수문자를 혼합하여 8자 이상으로 설정해주세요.");
            return false;
        }
        // 비밀번호에 아이디가 포함되었는지 체크
        if (loginPw.includes(loginId)) {
            alert("비밀번호에 아이디를 포함할 수 없습니다.");
            return false;
        }
        // 비밀번호 분기별 1회 이상 변경 기능은 비밀번호 변경 히스토리 생성 후 작업
        return true;
    }

    // 로그인 버튼 이벤트
    const loginBtnClick = async (e) => {
        const requestData = { loginId, loginPw };

        if (!validations()) {
            return;
        } else {
            try {
                const response = await axios.post(
                    '/api/login'
                    , requestData
                    , {headers: {'Content-Type': 'application/json'},
                });

                // 구글 OTP 등록
                if (response.status === 200) {
                    setResponseData({loginId: response.data.loginId, googleOtp: response.data.googleOtp});
                    setModalIsOpen(true);

                // 구글 OTP 미등록
                // } else if (response.status === 201) {
                //     setQrUrl(response.data.QRUrl);

                //     // QR 등록 모달 오픈
                //     setQrModalIsOpen(true);

                } else if (response.status === 204) {
                    alert('로그인 5회 이상 실패 시 로그인이 불가합니다.');
                }
            } catch (err) {
                alert('로그인 실패');
                console.log('Login/loginBtnClick/err: ', err);
            } finally {
                resetInput();
            }
        }
    }
    // Enter 입력이 되면 클릭 이벤트 실행
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginBtnClick();
        }
    };
    // otp code input 이벤트
    const handleInput = (e) => {
        e.preventDefault();
        setToken(e.target.value);
    };
    // otp code submit 이벤트
    const handleSubmit = async (e) => {
        e.preventDefault();
        await checkingAuth().then(() => {
            navigate("/mypage", { state: { loginId: responseData.loginId }});
        }).catch(() => {
            alert('인증 코드가 맞지 않습니다.');
        });
    };
    /**
     *
     * @Promise
     * Promise 객체는 비동기 로직을 마치 동기처럼 사용할 수 있는 기능을 가집니다.
     * 실행 함수는 프로미스를 이행(resolve)하거나, 거부(reject)할 수 있음.
     * 프로미스를 이행했을 때 할 일은 then() 호출로 정의하고, 거부됐을 때 할 일은 catch() 호출로 정의함.
     */
    function checkingAuth() {
        return new Promise((resolve, reject) => {
            const data = {
                "token": token,
                "loginId": responseData.loginId,
            }
            axios.post('/api/auth', data).then(res => {
                console.log(res.data);
                console.log(res.status);

                if (JSON.parse(res.data.verify) === true) {
                    console.log('JSON.parse(isValid): ', JSON.parse(res.data.verify));
                    resolve();
                } else {
                    console.log('JSON.parse(isValid): ', JSON.parse(res.data.verify));
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
                        {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1> */}
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                                <input type="text" name="userid" id="userid" autoFocus value={loginId} onChange={(e) => setLoginId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@bankedin.io" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" value={loginPw} placeholder="••••••••" onChange={(e) => setLoginPw(e.target.value)} onKeyPress={handleOnKeyPress} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                {/* <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
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
                                <input className="m-5 p-3 border" type="number" name="code" autoFocus onChange={handleInput} placeholder="6자리 입력" />
                                <input type="submit" className="m-5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 border-blue-700 rounded" onClick={handleSubmit} value="확인" />
                            </div>
                        </div>
                    </div>
                </form>
            </ReactModal>
            {/* <ReactModal className="relative" isOpen={qrModalIsOpen} ariaHideApp={false}>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold mt-1">QR CODE 등록</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => qrModalIsOpen(false)}>
                                        <span className="bg-transparent text-black h-6 w-6 block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
                                </div>
                                <div className="items-center">
                                    <img src={qrUrl} alt="" className="inset-0 w-1/2 h-1/2" />
                                </div>
                            </div>
                        </div>
                </div>
            </ReactModal> */}
        </section>

    );
}

export default Login;