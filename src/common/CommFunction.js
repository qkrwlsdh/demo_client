/**
 * input 박스 Number Format 맞춰주기 
 * inputNumberFormat(값, 입력가능글자수, 구분자, 구분자 위치 배열 or 간격 )
 * 구분자 간격이 동일하면 숫자 입력 ex. 금액인 경우 숫자 3
 * 구분자 간격이 다르면 배열로 입력 ex. 핸드폰 번호 [3, 4] , 날짜 [4,2]
 */
function inputNumberFormat(val, maxLength, separator, space){  
  // console.log(val)
  const value = val.replace(/\D+/g, "");  
  // console.log(value)
  // console.log(maxLength)
  // console.log(separator)
  // console.log(space)
  let result = "";
  let type = typeof space; 

  if (type === "number"){
    let arrayIdx = space
    for (let i = 0; i < value.length && i < maxLength; i++) { 
      if (i === arrayIdx) { 
          result += separator; 
          arrayIdx += space;
      }
      result += value[i];
    } 
  }else{ 
    let j = 0;
    let arrayIdx = space[j]  
    for (let i = 0; i < value.length && i < maxLength; i++) { 
      if (i === arrayIdx) { 
          result += separator; 
          arrayIdx += space[++j];
      }
      result += value[i];
    } 
  }
  console.log("inputNumberFormat : ", result)
  return result;
}


window.onlyNumeric = function (e) { 
  const value = Number(e.target.value); 
  if (Number.isNaN(value)) return;
  if (value === 0) return; 
}

window.handleInputYYYYMMDD = function (e) {    
  // 자리수 채워주기 
  // 총 8자리 숫자 
  // 구분자 "/"
  // 구분자 위치 
  e.target.value = inputNumberFormat(e.target.value, 8, "/", [4,2]); 
};

window.handleInputYYYYMM = function (e) {  
  e.preventDefault() 
  e.target.value = inputNumberFormat(e.target.value, 6, "/", 4); 
};

window.handleInputYYMM = function (e) { 
  e.preventDefault() 
  e.target.value = inputNumberFormat(e.target.value, 4, "/", 2);
};


window.handleInputCellPhoneType = function (e) {  
  e.preventDefault() 
  e.target.value = inputNumberFormat(e.target.value, 11, "-", [3,4]);
}; 


window.handleInputCreditCard = function (e) {
  e.preventDefault() 
  e.target.value = inputNumberFormat(e.target.value, 16, "-", 4);
};  


window.handleInputMoney = function (e) {
  e.preventDefault() 
  let inputValue = e.target.value.replace(/\D+/g, "");
  inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  e.target.value = inputValue 
};



window.isValidDate = function (dateString) {
  // YYYY-MM-DD 형식의 유효한 날짜인지 확인
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  // 날짜 형식이 유효하면 Date 객체로 변환하여 유효한 날짜인지 확인
  const date = new Date(dateString);
  return !isNaN(date.getTime());
} 

window.isValidYYMMDate = function (yearMonthString) { 
  if (yearMonthString === undefined) return false;

  yearMonthString = yearMonthString.replace(/\D+/g, "");
  // 유효한 날짜인지 확인 
  const year = yearMonthString.substring(0, 2);
  const month = yearMonthString.substring(2, 4);
  if (isNaN(year)) return false;
  if (isNaN(month)) return false;
  
  // 유효한 년도는 0부터 99까지로 가정합니다.
  if (year < 0 || year > 99) return false;
  
  // 유효한 월은 1부터 12까지로 가정합니다.
  if (month < 1 || month > 12) return false;
  
  return true;
};

//비밀번호 유효성 검사
const checkPassword = (e) => {
  //  8 ~ 10자 영문, 숫자 조합
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  // 형식에 맞는 경우 true 리턴
  console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
}


window.isValidEmail = function (email) { 
  if (email === undefined) return false;
  // 이메일 주소의 유효성을 검사하는 정규 표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};


window.isTelFormat = function (tel) { 
  if(tel === ""){
    return true;	
  }	
  var phoneRule = /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;	
  return phoneRule.test(tel);
}


window.isHpFormat = function (hp) {  
  if (hp === undefined) return false;
  console.log(hp)
  if(hp === ""){
    return false;
  }	 
  hp = hp.replace(/\D+/g, "");
  console.log(hp)
  var phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;	
  console.log(phoneRule.test(hp))
  return phoneRule.test(hp);
}
 