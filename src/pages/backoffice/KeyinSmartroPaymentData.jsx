import React, { useState } from "react";
import './Table.css'; // CSS 파일을 불러옵니다.
import { Radio } from '../../components/Radio'

function KeyinSmartroPaymentData() {
 
  const [isLoading, setIsLoading] = useState(false);  
  
  const [inputs, setInputs] = useState({
    MerchantId: "mid3", //가맹점코드
    PoIdx: "3", //가맹점코드
    Mid: "t_2404033m",  //가맹점스마트로 id
    poCd: "SMTR", //PG사
    Moid: "",  //주문번호
    StateCd: "0",   // 승인[0] 취소[1] 구분
    GoodsName: "My Macarong",  //상품명
    GoodsCnt: "1",  //상품개수
    Amt: "1004",  //결제요청금액
    BuyerName: "ME",  //구매자명
    BuyerTel: "01025965546",  //휴대폰번호
    BuyerEmail: "noname@smartro.co.kr",   //이메일
    BuyerAuthNum: "800915",  //생년월일/사업자번호
    CardCode: "06",  //신용카드번호
    CardNum: "5241440824913343",  //신용카드번호 
    CardExpire: "2712",  //카드유효기간 YYMM
    CardQuota: "00",  //할부개월
    CardType: "01",  //개인/법인
    CardPwd: "10",  //비밀번호
    PayMethod: "CARD",  
    
  });

  // 0부터 12까지의 숫자 배열 생성
  const options = [];

  // 0부터 12까지의 숫자를 생성하여 select 옵션에 추가합니다.
  for (let i = 0; i <= 36; i++) {
    const month = i < 10 ? `0${i}` : `${i}`; // 한 자리 숫자인 경우 앞에 0을 추가합니다.
    options.push(
      <option key={month} value={month}>
        {i === 0 ? '일시불' : `${i}개월`}
      </option>
    );
  }

  const onSubmit = async (e) => {  
    setIsLoading(true);   
    try{ 
      e.preventDefault();  //이벤트(예: 클릭, 제출 등)의 기본 동작을 취소하는 JavaScript의 메서드
      // 비동기 fetch
      const response = await fetch('/payment/key-in-smartro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',  //array, list -> JSON format
            },
            body: JSON.stringify(inputs),
          });
      
      const message = await response.text();

      if (response.status === 200) {
        alert('Process successfully.');
      } else {
        alert(response.status + ' - Failed to send data.' + message);
      }

      setIsLoading(false);

    } catch (error) {  
      alert('Error while sending data: '+ error);
    }
    setIsLoading(false);// error가 발생하더라도, loading 상태는 처리되야함

  };

  // 핸드폰번호 유효성 검사
  const checkPhonenumber = (e) => {
    // '-' 입력 시
    var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
    // 숫자만 입력시
    var regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    // 형식에 맞는 경우 true 리턴
    console.log('핸드폰번호 유효성 검사 :: ', regExp.test(e.target.value))
  }

  //비밀번호 유효성 검사
  const checkPassword = (e) => {
      //  8 ~ 10자 영문, 숫자 조합
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
      // 형식에 맞는 경우 true 리턴
      console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
  }

  // 이메일 유효성 검사
  const checkEmail = (e) => {
      var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      // 형식에 맞는 경우 true 리턴
      console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
  }

  //입력 상자의 변경 이벤트가 발생했을 때 호출, 여러 입력 상자를 관리할 때 사용
  const onChange = (e) => {
    const { name, value } = e.target; //이벤트가 발생한 요소에 접근, name과 value를 추출하여 해당 입력 상자의 이름과 새로운 값에 접근
    // 입력 상자들의 상태를 업데이트
    // 이때, 이전 상태를 유지하기 위해 spread 연산자(...)를 사용하여 기존 상태를 복사한 후 변경된 값을 적용
    setInputs({  
      ...inputs,
      [name]: value,
    }); 
  }; 

  return (
    <div>
      <h1>신용카드 수기결제</h1>
      
      <form onSubmit={onSubmit}> 
        <button type="submit">전송</button>
        <div className="table-container">
          <ul className="table-outline">
            <li>

              <ul className="table">

                <li className="itemLabel">가맹점ID</li> 
                <li className="itemValue"><input type="text"
                      name="Mid"
                      placeholder="가맹점ID"
                      onChange={onChange}
                      value={inputs.Mid}
                    />
                </li>

                <li className="itemLabel">PG사</li> 
                <li className="itemValue">
                  <select name="poCd" value={inputs.poCd} onChange={onChange}>
                    <option value="">=선택=</option>
                    <option value="SMTR">스마트로</option>
                    <option value="KCP">KCP</option>
                  </select> 
                </li> 

                <li className="itemLabel">주문번호</li> 
                <li className="itemValue"><input type="text"
                      name="Moid"
                      placeholder="주문번호" 
                      value={inputs.Moid}
                    />
                </li>
                
                <li className="itemLabel">승인/취소</li> 
                <li className="itemValue">
                  <select name="StateCd" value={inputs.StateCd} onChange={onChange}>
                    <option value="">=선택=</option>
                    <option value="0">승인</option>
                    <option value="1">취소</option>
                  </select> 
                </li>

              </ul>
            </li>

            <li>
              <ul className="table"> 

                <li className="itemLabel">상품명</li> 
                <li className="itemValue"><input type="text"
                      name="GoodsName"
                      placeholder="상품명"
                      onChange={onChange}
                      value={inputs.GoodsName}
                    />
                </li>
                
                <li className="itemLabel">상품개수</li> 
                <li className="itemValue"><input type="text"
                      name="GoodsCnt"
                      placeholder="상품개수"
                      onChange={onChange}
                      value={inputs.GoodsCnt}
                    />
                </li>
                
                <li className="itemLabel">결제요청금액</li> 
                <li className="itemValue"><input type="text"
                      name="Amt"
                      placeholder="결제요청금액"
                      onChange={onChange}
                      value={inputs.Amt}
                    />
                </li>

              </ul> 
            </li>

            <li>
              <ul className="table">   

                <li className="itemLabel">구매자명</li> 
                <li className="itemValue"><input type="text"
                      name="BuyerName"
                      placeholder="구매자명"
                      onChange={onChange}
                      value={inputs.BuyerName}
                    />
                </li>

                <li className="itemLabel">휴대폰번호</li> 
                <li className="itemValue"><input type="text"
                      type="text" 
                      onChange={onChange}
                      placeholder="핸드폰 번호를 입력하세요 (예: 010-1234-5678)"
                      name="BuyerTel"  
                      value={inputs.BuyerTel}
                      onBlur={checkPhonenumber}
                    />
                </li>
                
                <li className="itemLabel">이메일</li> 
                <li className="itemValue"><input type="text"
                      name="BuyerEmail"
                      placeholder="이메일"
                      onChange={onChange}
                      value={inputs.BuyerEmail}
                    />
                </li>
                
                <li className="itemLabel">생년월일/사업자번호</li> 
                <li className="itemValue"><input type="text"
                      name="BuyerAuthNum"
                      placeholder="이메일"
                      onChange={onChange}
                      value={inputs.BuyerAuthNum}
                    />
                </li>

                
              </ul>
            </li>
            
            <li>
              <ul className="table">
                <li className="itemLabel">카드사</li> 
                <li className="itemValue"><input type="text"
                      name="CardCode"
                      placeholder="카드사"
                      onChange={onChange}
                      value={inputs.CardCode}
                    />
                </li>

                <li className="itemLabel">신용카드번호</li> 
                <li className="itemValue"><input type="text"
                      name="CardNum"
                      placeholder="신용카드번호"
                      onChange={onChange}
                      value={inputs.CardNum}
                    />
                </li>
                
                <li className="itemLabel">카드유효기간</li> 
                <li className="itemValue"><input type="text"
                      name="CardExpire"
                      placeholder="카드유효기간"
                      onChange={onChange}
                      value={inputs.CardExpire}
                    />
                </li>
                
                <li className="itemLabel">할부기간</li> 
                <li className="itemValue">
                  <select name="CardQuota" value={inputs.CardQuota} onChange={onChange}>
                    <option value="">=선택=</option>
                    {options}
                  </select> 
                </li> 
                
                <li className="itemLabel">개인/법인</li> 
                <li className="itemValue">
                  <Radio name="CardType" value="01" checked={inputs.CardType === "01"} onChange={onChange} >개인</Radio> 
                  <Radio name="CardType" value="02" checked={inputs.CardType === "02"} onChange={onChange} >법인</Radio>
                </li> 
                
                <li className="itemLabel">비밀번호</li> 
                <li className="itemValue"><input type="password"
                      name="CardPwd"
                      placeholder="비밀번호"
                      onChange={onChange}
                      value={inputs.CardPwd}
                    />
                </li> 
              </ul>
            </li>
            
          </ul> 
        </div>


        <input name="PayMethod" type="hidden" value="CARD"/>

        <input name="MerchantId" type="hidden" value=""/>

        <input name="PoIdx" type="hidden" value=""/>
 
      </form>
    </div> 
  );
}

export default KeyinSmartroPaymentData;
