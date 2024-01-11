import {Route, Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import CreateBoard from './pages/CreateBoard';
import UpdateBoard from './pages/UpdateBoard';
import Mypage from './pages/Mypage';
import LoginOtp from './components/Login/LoginOtp';

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
            <Route path="/loginOtp" element={<LoginOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;