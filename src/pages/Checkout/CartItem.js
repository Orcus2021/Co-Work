import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "../../components/Modal/Modal";
import Coupon from "../../components/Coupon/Coupon";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import api from "../../utils/api";
import CartContext from "../../contexts/CartContext";

import couponIcon from "../../assets/coupon.png";
import trash from "./trash.png";

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
  display: block;
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

const CartItem = (props) => {
  const { item, cartIndex } = props;
  const couponList = useRef();
  const [showCouponBx, setShowCouponBx] = useState(false);
  const [modalCloseEffect, setModalCloseEffect] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [userCoupon, setUserCoupon] = useState([]);
  const userCtx = useContext(UserContext);
  const cart = useContext(CartContext);

  useEffect(() => {
    const getCoupon = async () => {
      const { data } = await api.getUserCoupon(userCtx.user.accessToken);
      couponList.current = data;
    };
    getCoupon();
  }, []);

  const closeCouponBx = () => {
    setModalCloseEffect(true);
    setTimeout(() => {
      setShowCouponBx(false);
      setModalCloseEffect(false);
    }, 600);
  };

  const couponBxHandler = () => {
    if (!userCtx.user) {
      alert("請先登入會員");
      return;
    }
    const couponArr = couponList.current.filter((coupon) => {
      if (coupon.applied_range === "all") {
        return true;
      } else if (coupon.applied_range === item.category) {
        return true;
      } else if (coupon.product_id === item.id) {
        return true;
      } else {
        return false;
      }
    });

    setUserCoupon(couponArr);
    setShowCouponBx((pre) => !pre);
  };
  const couponCodeHandler = (e) => {
    setCouponCode(e.target.value);
  };

  const useCodeHandler = () => {
    // 打輸入邀請碼API
  };
  const useCouponHandler = (discount) => {
    let newPrice;
    if (discount.type === "amount") {
      newPrice = item.price - discount.discount;
    } else {
      newPrice = Math.ceil((item.price * discount.discount) / 100);
    }
    const newDiscount = {
      discount: newPrice,
      coupon_id: discount.id,
    };

    cart.changeItemDiscount(cartIndex, newDiscount);
  };
  let couponName = "優惠券";
  if (item.coupon_id) {
    couponName = `已折抵${item.price - item.discount}`;
  }

  return (
    <>
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
            onChange={(e) => cart.changeItemQuantity(cartIndex, e.target.value)}
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
          <ItemUnitPriceValue>NT.{item.discount}</ItemUnitPriceValue>
        </ItemUnitPrice>
        <ItemPrice>
          <ItemPriceName hideOnDesktop>小計</ItemPriceName>
          <ItemPriceValue>NT.{item.qty * item.discount}</ItemPriceValue>
        </ItemPrice>
        <CouponBx>
          <CouponValue onClick={couponBxHandler}>
            <ImgBx>
              <Img src={couponIcon}></Img>
            </ImgBx>
            {couponName}&gt;&gt;
          </CouponValue>
        </CouponBx>
        <DeleteButton onClick={() => cart.deleteItem(cartIndex)} />
      </Item>

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
              {userCoupon.map((coupon) => {
                return (
                  <Coupon
                    key={coupon.code}
                    coupon={coupon}
                    type="use"
                    onUseCoupon={useCouponHandler}
                  ></Coupon>
                );
              })}
            </CouponList>
          </UserRight>
        </Modal>
      )}
    </>
  );
};
export default CartItem;
