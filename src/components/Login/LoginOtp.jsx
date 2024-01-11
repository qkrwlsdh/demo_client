import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginOtp() {
  const [value, setValue] = useState("");
  const state = useLocation();
  let navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        "token": value,
        "loginId": state.state.loginId,
        "googleOtp": state.state.googleOtp
    }
    axios.post('/api/auth', data).then(res => {
      console.log(res)
      console.log(res.data.verify)
      if (res.data.verify) {
        navigate("/mypage", { state: { loginId: state.state.loginId }});
      } else {
        alert('인증 코드가 맞지 않습니다.');
      }
    })
  };

  return (
      <form className="grid-cols-1 m-10">
          <input className="m-5 p-3" type="number" name="code" onChange={handleInput} />
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleSubmit}>BUTTON</button>
      </form>
  );
}

export default LoginOtp;