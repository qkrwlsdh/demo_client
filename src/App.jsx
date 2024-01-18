import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import CreateBoard from './pages/CreateBoard';
import UpdateBoard from './pages/UpdateBoard';
import Mypage from './pages/Mypage';
import Login from './pages/Login';

/**
 * @BrowserRouter는 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 한다.
 */
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/create-board" element={<CreateBoard />} />
          <Route path="/update-board" element={<UpdateBoard />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" elemen={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;