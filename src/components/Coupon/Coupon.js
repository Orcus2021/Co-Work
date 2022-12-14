import { useState, useContext, useEffect } from "react";
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
  font-size: 1.2rem;
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
  const { type, coupon, onUseCoupon, isUse } = props;

  let btnName = "??????";
  if (type === "get") {
    btnName = "??????";
  }
  let title = "??????";
  if (coupon.type === "amount") {
    title = "??????";
  }
  const range = {
    all: "??????",
    women: "??????",
    men: "??????",
    accessories: "??????",
    other: "??????",
  };

  useEffect(() => {
    if (isUse) {
      setBtnStyle(false);
    }
  }, [isUse]);

  const date = coupon.expired_time.split("T");

  const btnClickHandler = async () => {
    setBtnStyle(false);
    // ????????????????????? ?????????????????????
    if (type === "list") {
      navigate("/");
      return;
    }
    // ????????????????????????
    if (btnStyle && type === "get") {
      const couponID = { coupon_id: coupon.coupon_id };
      const response = await api.receiveCoupon(
        couponID,
        userCtx.user?.accessToken
      );

      return;
    }
    // ????????????????????????
    if (btnStyle && type === "use") {
      onUseCoupon({
        type: coupon.type,
        discount: coupon.discount,
        id: coupon.coupon_id,
      });
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
        {coupon.discount}???
      </Title>
      <CouponDesc>
        <CouponTitle>????????????:{range[coupon.applied_range]}</CouponTitle>
        {coupon.product_id && (
          <CouponTitle>{`(ID:${coupon.product_id})`}</CouponTitle>
        )}

        <CouponTitle>????????????:{date[0]}</CouponTitle>
      </CouponDesc>
      <CouponBtn $isClick={btnStyle} onClick={btnClickHandler}>
        {btnName}
      </CouponBtn>
      {[1, 3, 5, 7].map((index) => {
        return <Circle key={index + "coupon"} $index={index}></Circle>;
      })}
    </CouponBx>
  );
};

export default Coupon;
