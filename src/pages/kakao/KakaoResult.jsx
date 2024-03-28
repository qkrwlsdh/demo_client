import axios from "axios";
import { React, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authorizationAtom, cidAtom, tidAtom } from "../../recoil/KakaopayAtom";

const KakaoResult = (props) => {
    const cid = useRecoilValue(cidAtom);
    const tid = useRecoilValue(tidAtom);
    const authSecretKey = useRecoilValue(authorizationAtom);

    const [amount, setAmount] = useState("");
    const [itemName, setItemName] = useState("");
    const [approvedAt, setApprovedAt] = useState("");
    const [paymentType, setPaymentType] = useState("");

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);

        let kakaoApprData = {
            "cid": cid,
            "tid": tid,
            "partner_order_id": "partner_order_id",
            "partner_user_id": "partner_user_id",
            "pg_token": searchParams.get("pg_token"),
            "authorization": authSecretKey,
        }

        let response = axios.post(
            "http://localhost:8080/payment/kakaopayAppr",
            kakaoApprData,
        ).then(res => {
            console.log(res.data);
            console.log(res.status);

            if (res.data !== null) {
                setAmount((res.data.amount.total).toLocaleString('ko-KR'));
                setItemName(res.data.item_name);
                setApprovedAt(new Date(res.data.approved_at).toLocaleDateString());
                setPaymentType(res.data.payment_method_type);
            }
        }).catch(err => {
            alert(err.message);
        });

    },[]);

  return (
    <>
        <h1>결제 성공</h1>
        <div>결제 금액 : {amount} 원</div>
        <div>상품명 : {itemName}</div>
        <div>결제 일시 : {approvedAt}</div>
        <div>결제 수단 : {paymentType}</div>
    </>
  );
};
export default KakaoResult;