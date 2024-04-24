import React, { useState } from "react";

function KeyinSmartroPaymentData() {
 const [inputs, setInputs] = useState({
    userName: "userName",
    userId: "userId",
    userEmail: "userEmail",
 });

 const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
 };

 const onSubmit = (e) => {
    e.preventDefault();
    // 여기서 서버에 POST 요청을 보냅니다.
    // 예: fetch('https://example.com/api/users', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(inputs),
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch((error) => console.error('Error:', error));
    fetch('/key-in-smartro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
 };

 return (
    <form onSubmit={onSubmit}>
      <input
        name="userName"
        placeholder="사용자 이름"
        onChange={onChange}
        value={inputs.userName}
      />
      <input
        name="userId"
        placeholder="사용자 ID"
        onChange={onChange}
        value={inputs.userId}
      />
      <input
        name="userEmail"
        placeholder="사용자 이메일"
        onChange={onChange}
        value={inputs.userEmail}
      />
      <button type="submit">전송</button>
    </form>
 );
}

export default KeyinSmartroPaymentData;
