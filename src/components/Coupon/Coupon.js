import React from "react";
import styled from "styled-components";
import logoIcon from "../../assets/logoIcon.png";

const CouponBx = styled.div`
position:relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:flex-start;
  width: 95%;
  margin-bottom: 10px;
  height: 80px;
  
  border-radius:3px;
  margin:0 auto 10px auto;
  background-color:white; 
}
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
  background-color: #99262a;
  font-size: 0.8rem;
  padding: 3px 8px;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
`;

const Coupon = () => {
  return (
    <CouponBx>
      <CouponLeft>
        <ImgBx>
          <CouponImg src={logoIcon} />
        </ImgBx>
      </CouponLeft>
      <Title>折抵100元</Title>
      <CouponDesc>
        <CouponTitle>使用範圍:全部</CouponTitle>
        <CouponTitle>有效期限:2002.8.15</CouponTitle>
      </CouponDesc>
      <CouponBtn>使用</CouponBtn>
      {[1, 3, 5, 7].map((index) => {
        return <Circle $index={index}></Circle>;
      })}
    </CouponBx>
  );
};

export default Coupon;
