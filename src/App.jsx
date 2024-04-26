import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './common/CommFunction';
import Detail from './pages/board/Detail';
import CreateBoard from './pages/board/CreateBoard';
import UpdateBoard from './pages/board/UpdateBoard';
import Main from './pages/Main';
import Login from './pages/login/Login';
import KakaoResult from './pages/kakao/KakaoResult';
import { CheckoutPage } from './pages/toss/Checkout';
import { SuccessPage } from './pages/toss/Success';
import { FailPage } from './pages/toss/Fail';
import { useCookies } from 'react-cookie';
import FormLayout_ID from './pages/login/FormLayout_ID';
import FormLayout_PW from './pages/login/FormLayout_PW';
import FormLayout_Reissue from './pages/login/FormLayout_Reissue';
import UnNotifyDataHandling from './pages/backoffice/UnNotifyDataHandling'
import KeyinSmartroPaymentData from './pages/backoffice/KeyinSmartroPaymentData'

/**
 * @BrowserRouter는 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 한다.
 */
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['refresh']);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ cookies.refresh != null ? <Main /> : <Login /> } />
          <Route path="/detail" element={<Detail />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/update-board" element={<UpdateBoard />} />
          <Route path="/login" element={ cookies.refresh != null ? <Main /> : <Login /> } />
          <Route path="/kakaoResult" element={<KakaoResult />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailPage />} />
          <Route path="/formlayout_id" element={<FormLayout_ID />} />
          <Route path="/formlayout_pw" element={<FormLayout_PW />} />
          <Route path="/formlayout_reissue" element={<FormLayout_Reissue />} />
          <Route path="/resend-unnotify" element={<UnNotifyDataHandling/>} />
          <Route path="/keyin-smartro" element={<KeyinSmartroPaymentData/>} />

          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;