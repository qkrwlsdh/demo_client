import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

//http://localhost:3000/success?
//paymentType=NORMAL&orderId=Vv-u-wdtfqBTUvtmBTSa6&paymentKey=WjDM1PvGzZ0RnYX2w532yDGdDx11k8NeyqApQEJmKBaOo47l&amount=50000

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const response = await fetch("/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      console.log(json);

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        navigate(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
    }
    confirm();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>
          결제 성공
        </h2>
        <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
        <Link to={"/"}>
          <input className="m-5 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 border-blue-900 rounded cursor-pointer" type='button' value='돌아가기'/>
        </Link>
      </div>
    </div>
  );
}