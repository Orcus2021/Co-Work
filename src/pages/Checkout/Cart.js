import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import CartItem from "./CartItem";

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
const CouponTitle = styled(Price)`
  padding-left: 0;
  text-align: center;
`;

function Cart() {
  const cart = useContext(CartContext);
  const items = cart.getItems();

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
          <CartItem
            key={`${item.id}-${item.color.code}-${item.size}`}
            item={item}
            cartIndex={index}
          ></CartItem>
        ))}
      </Items>
    </>
  );
}

export default Cart;
