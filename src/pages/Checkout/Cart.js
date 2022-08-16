import { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal/Modal";
import Coupon from "../../components/Coupon/Coupon";

import CartContext from "../../contexts/CartContext";
import trash from "./trash.png";
import couponIcon from "../../assets/coupon.png";

const Header = styled.div`
  display: flex;

  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
    border-bottom: 1px solid #3f3a3a;
  }
`;

const ItemCount = styled.div`
  flex-grow: 1;
`;

const Quantity = styled.div`
  width: 185px;
  padding-left: 20px;

  @media screen and (max-width: 1279px) {
    ${(props) => props.hideOnMobile && "display: none;"}
  }
`;

const UnitPrice = styled.div`
  width: 166px;
  padding-left: 12px;

  @media screen and (max-width: 1279px) {
    ${(props) => props.hideOnMobile && "display: none;"}
  }
`;

const Price = styled.div`
  width: 167px;

  @media screen and (max-width: 1279px) {
    ${(props) => props.hideOnMobile && "display: none;"}
  }
`;

const Empty = styled.div`
  width: 70px;
`;

const Items = styled.div`
  padding: 40px 30px;
  margin-top: 16px;
  border: solid 1px #979797;

  @media screen and (max-width: 1279px) {
    padding: 0;
    margin-top: 10px;
    border: none;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    align-items: flex-start;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #3f3a3a;
    font-size: 14px;
    line-height: 17px;
  }

  & + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;

const ItemImage = styled.img`
  width: 114px;

  @media screen and (max-width: 1279px) {
    order: 1;
  }
`;

const ItemDetails = styled.div`
  margin-left: 20px;
  flex-grow: 1;
  align-self: flex-start;

  @media screen and (max-width: 1279px) {
    width: calc(100% - 174px);
    order: 1;
  }
`;

const ItemName = styled.div``;

const ItemID = styled.div`
  margin-top: 18px;
`;

const ItemColorName = styled.div`
  margin-top: 22px;
`;

const ItemSize = styled.div`
  margin-top: 10px;
`;

const ItemQuantity = styled.div`
  width: 185px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    text-align: center;
    width: calc(100% / 4);
    order: 2;
  }
`;

const ItemQuantityName = styled.div`
  ${(props) => props.hideOnDesktop && "display: none;"}

  @media screen and (max-width: 1279px) {
    display: block;
  }
`;

const ItemQuantitySelect = styled.select`
  width: 80px;
  height: 30px;
  padding-left: 17px;
  border-radius: 8px;
  border: solid 1px #979797;
  background-color: #f3f3f3;

  @media screen and (max-width: 1279px) {
    margin-top: 12px;
  }
`;

const ItemUnitPrice = styled.div`
  width: 166px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    text-align: center;
    width: calc(100% / 4);
    order: 2;
  }
`;

const ItemUnitPriceName = styled.div`
  ${(props) => props.hideOnDesktop && "display: none;"}

  @media screen and (max-width: 1279px) {
    display: block;
  }
`;

const ItemUnitPriceValue = styled.div`
  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;

const ItemPrice = styled.div`
  width: 167px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
    text-align: center;
    width: calc(100% / 4);
    order: 2;
  }
`;

const ItemPriceName = styled.div`
  ${(props) => props.hideOnDesktop && "display: none;"}

  @media screen and (max-width: 1279px) {
    display: block;
  }
`;

const ItemPriceValue = styled.div`
  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;
const CouponBx = styled.div`
  width: 167px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1279px) {
    text-align: center;
    order: 3;
  }
`;
// const CouponName = styled.div`
//   ${(props) => props.hideOnDesktop && "display: none;"}

//   @media screen and (max-width: 1279px) {
//     display: block;
//   }
// `;

const CouponValue = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  line-height: 20px;

  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;

const DeleteButton = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${trash});
  background-size: contain;
  cursor: pointer;

  @media screen and (max-width: 1279px) {
    order: 1;
    background-position: center -10px;
  }
`;
const ImgBx = styled.span`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px; ;
`;
const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const UserRight = styled.div`
  width: 460px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  border-radius: 8px;
  background-color: #f2f2f2;
`;
const SubTitle = styled.div`
display:
  margin-bottom: 10px;
`;
const CouponCodeBx = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  height: 30px;
  flex-direction: row;
  margin-top: 5px;
`;
const Input = styled.input`
  flex-grow: 1;

  border-radius: 8px 0 0 8px;
  border: solid 1px #979797;
  height: 100%;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const UseCouponBtn = styled.button`
  background-color: #99262a;
  font-size: 0.8rem;
  padding: 3px 8px;
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;
  width: 80px;

  cursor: pointer;
`;
const CouponList = styled.div`
  width: 100%;
  flex-grow: 1;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  margin-top: 10px;
  height: 324px;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: rgba(153, 38, 42, 0);
  }
`;

const CouponTitle = styled(Price)`
  padding-left: 0;
  text-align: center;
`;
function Cart() {
  const cart = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [showCouponBx, setShowCouponBx] = useState(false);
  const [modalCloseEffect, setModalCloseEffect] = useState(false);
  const items = cart.getItems();
  const couponCodeHandler = (e) => {
    setCouponCode(e.target.value);
  };
  const useCodeHandler = () => {
    // 打API
  };
  const closeCouponBx = () => {
    setModalCloseEffect(true);
    setTimeout(() => {
      setShowCouponBx(false);
      setModalCloseEffect(false);
    }, 600);
  };
  const couponBxHandler = () => {
    setShowCouponBx((pre) => !pre);
  };
  return (
    <>
      <Header>
        <ItemCount>購物車({items.length})</ItemCount>
        <Quantity hideOnMobile>數量</Quantity>
        <UnitPrice hideOnMobile>單價</UnitPrice>
        <Price hideOnMobile>小計</Price>
        <CouponTitle hideOnMobile>優惠券</CouponTitle>
        <Empty />
      </Header>
      <Items>
        {items.map((item, index) => (
          <Item key={`${item.id}-${item.color.code}-${item.size}`}>
            <ItemImage src={item.image} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemID>{item.id}</ItemID>
              <ItemColorName>顏色｜{item.color.name}</ItemColorName>
              <ItemSize>尺寸｜{item.size}</ItemSize>
            </ItemDetails>
            <ItemQuantity>
              <ItemQuantityName hideOnDesktop>數量</ItemQuantityName>
              <ItemQuantitySelect
                value={item.qty}
                onChange={(e) => cart.changeItemQuantity(index, e.target.value)}
              >
                {Array(item.stock)
                  .fill()
                  .map((_, index) => (
                    <option key={index}>{index + 1}</option>
                  ))}
              </ItemQuantitySelect>
            </ItemQuantity>
            <ItemUnitPrice>
              <ItemUnitPriceName hideOnDesktop>單價</ItemUnitPriceName>
              <ItemUnitPriceValue>NT.{item.price}</ItemUnitPriceValue>
            </ItemUnitPrice>
            <ItemPrice>
              <ItemPriceName hideOnDesktop>小計</ItemPriceName>
              <ItemPriceValue>NT.{item.qty * item.price}</ItemPriceValue>
            </ItemPrice>
            <CouponBx>
              <CouponValue onClick={couponBxHandler}>
                <ImgBx>
                  <Img src={couponIcon}></Img>
                </ImgBx>
                優惠券&gt;&gt;
              </CouponValue>
            </CouponBx>
            <DeleteButton onClick={() => cart.deleteItem(index)} />
          </Item>
        ))}
      </Items>
      {showCouponBx && (
        <Modal onClose={closeCouponBx} closeEffect={modalCloseEffect}>
          <UserRight>
            <SubTitle>優惠券</SubTitle>
            <CouponCodeBx>
              <Input
                type="text"
                placeholder="請輸入優惠碼"
                onChange={couponCodeHandler}
                value={couponCode}
              />
              <UseCouponBtn onClick={useCodeHandler}>使用</UseCouponBtn>
            </CouponCodeBx>
            <CouponList>
              <Coupon></Coupon>
              <Coupon></Coupon>
              <Coupon></Coupon>
              <Coupon></Coupon>
            </CouponList>
          </UserRight>
        </Modal>
      )}
    </>
  );
}

export default Cart;
