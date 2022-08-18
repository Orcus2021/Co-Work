import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";
import api from "../../utils/api";
import logoIcon from "../../assets/logoIcon.png";

const CouponBx = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  margin-bottom: 10px;
  height: 80px;
  border-radius: 3px;
  margin: 0 auto 10px auto;
  background-color: white;
`;
const ImgBx = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  overflow: hidden;
`;

const CouponImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const CouponTitle = styled.p`
  flex-grow: 1;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 3px;
`;
const CouponLeft = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f6dbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const CouponDesc = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 10px;
`;
const Title = styled(CouponTitle)`
  font-size: 1.6rem;
`;
const Circle = styled.div`
  width: 8px;
  height: 8px;
  background-color: #f2f2f2;
  border-radius: 0 50% 50% 0;
  left: 0;
  //   top: 8px;
  top: ${(props) => props.$index * 8 + 4}px;
  position: absolute;
`;
const CouponBtn = styled.button`

  background-color:${(props) => (props.$isClick ? "#99262a;" : "#9f9f9f;")} 
  font-size: 0.8rem;
  padding: 3px 8px;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor:${(props) => (props.$isClick ? "pointer;" : "not-allowed;")}  
`;

const Coupon = (props) => {
  const [btnStyle, setBtnStyle] = useState(true);
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const { type, coupon } = props;
  let btnName = "使用";
  if (type === "get") {
    btnName = "領取";
  }
  let title = "打折";
  if (coupon.type === "amount") {
    title = "折抵";
  }
  const range = {
    all: "全部",
    women: "女裝",
    men: "男裝",
    accessories: "配件",
    other: "限定",
  };
  const date = coupon.expired_time.split("T");

  const btnClickHandler = async () => {
    setBtnStyle(false);
    if (type === "list") {
      navigate(`./?category=${coupon.applied_range}`);
    }
    if (btnStyle) {
      const couponID = { coupon_id: coupon.coupon_id };
      const response = await api.receiveCoupon(
        couponID,
        userCtx.user?.accessToken
      );
      console.log(response);
      return;
    }
  };

  return (
    <CouponBx>
      <CouponLeft>
        <ImgBx>
          <CouponImg src={logoIcon} />
        </ImgBx>
      </CouponLeft>
      <Title>
        {title}
        {coupon.discount}元
      </Title>
      <CouponDesc>
        <CouponTitle>使用範圍:{range[coupon.applied_range]}</CouponTitle>
        {coupon.product_id && (
          <CouponTitle>{`(ID:${coupon.product_id})`}</CouponTitle>
        )}

        <CouponTitle>有效期限:{date[0]}</CouponTitle>
      </CouponDesc>
      <CouponBtn $isClick={btnStyle} onClick={btnClickHandler}>
        {btnName}
      </CouponBtn>
      {[1, 3, 5, 7].map((index) => {
        return <Circle $index={index}></Circle>;
      })}
    </CouponBx>
  );
};

export default Coupon;
