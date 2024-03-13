import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import CreateBoard from './pages/CreateBoard';
import UpdateBoard from './pages/UpdateBoard';
import Main from './pages/Main';
import Login from './pages/Login';
import KakaoResult from './pages/KakaoResult';
import { CheckoutPage } from './pages/toss/Checkout';
import { SuccessPage } from './pages/toss/Success';
import { FailPage } from './pages/toss/Fail';

/**
 * @BrowserRouter는 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 한다.
 */
function App() {

  console.log(localStorage.getItem('recoil-persist'));
  console.log(document.cookie);
  console.log(document.cookie.split(";"));

  /* document.cookie = "username=John Doe";

  let cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    let trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith("username=")) {
      let username = trimmedCookie.substring(
        "username=".length
      );

      console.log("Username: " + username);
    }
  } */

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/update-board" element={<UpdateBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kakaoResult" element={<KakaoResult />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;