import { React } from "react";
import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import BoardList from "../components/BoardList/BoardList";

const Mypage = (props) => {
    // const [data, setData] = useState("")
    const state = useLocation();
    const userId = state.state.loginId;

    // useEffect(() => {
    //     const getBoardList = async () => {
    //         console.log('getBoardList()');
    //         let response = await axios.get("/api/board-list");
    //         console.log('main/response: ', response);
    //         setData(response.data.data);
    //     };
    //     getBoardList();
    // }, [])
    return(
        <>
      <div className="h-screen bg-gray-100">
        <nav className="bg-indigo-400 py-4">
          <div className="container mx-auto px-5">
            <h1 className="font-bold text-xl text-white">Demo-Project</h1>
          </div>
        </nav>
          <div className="flex w-full space-x-96px">
            <div className="m-5">{ userId }님 환영합니다</div>
            {/* <Link to={"/create-board"} >
              <input className="m-5 bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 border-indigo-700 rounded" type='button' value='게시글 작성하기'/>
            </Link> */}
          </div>
          <div className="container mx-auto">
            <section className="p-5 flex justify-center">
              <header className="mb-4 text-center">
                {/* <h2 className="font-bold text-lg">내 게시물</h2> */}
              </header>
              <div className="grid grid-cols-4 gap-5">
                {/* <BoardList data={data}/> */}
              </div>
            </section>
          </div>
       </div>
    </>
    )
};
export default Mypage;