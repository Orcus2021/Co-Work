import React, { useState, useEffect, useRef, useContext } from "react";
import { SaleContext } from "../../contexts/SaleProduct";
import styled from "styled-components";

const Product = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  height: 120px;
  border-bottom: 1px dashed #99262a;
  padding-bottom: 20px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    height: 200px;
  }
`;
const ImgBx = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
`;

const ProductImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ProductTitle = styled.p`
  flex-grow: 1;
  font-size: 1rem;
  text-align: center;
  @media screen and (max-width: 1279px) {
    font-size: 0.5rem;
  }
`;
const Price = styled.p`
  flex-grow: 1;
  font-size: 1.5rem;
  text-align: center;
  @media screen and (max-width: 1279px) {
    font-size: 0.5rem;
  }
`;
const CheckProduct = styled.input`
  width: 20px;
  height: 20px;
`;
const RightBx = styled.div`
  width: 300px;
`;
const InitPrice = styled.p`
  font-size: 1rem;
  text-align: center;
  flex-grow: 1;
  @media screen and (max-width: 1279px) {
    font-size: 0.5rem;
  }
`;
const CouponBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CouponLabel = styled.label`
  font-size: 1rem;
  @media screen and (max-width: 1279px) {
    font-size: 0.5rem;
  }
`;
const CouponInput = styled.input`
  width: 100px;
`;

const CreateProduct = (props) => {
  const { isAll, onAll, isClear, onClear, product, onAdd, onRemove } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckCoupon, setIsCheckCoupon] = useState(false);
  const [amount, setAmount] = useState(0);
  const saleCtx = useContext(SaleContext);
  const productRef = useRef(product);

  useEffect(() => {
    if (isAll) {
      setIsChecked(true);
      onAll(false);
    }
    if (isClear) {
      setIsChecked(false);
      onClear(false);
    }
  }, [isAll, isClear]);
  useEffect(() => {
    if (isChecked) {
      // saleCtx.addProduct()
      onAdd(productRef.current);
    } else {
      onRemove(product.id);
    }
  }, [isChecked, product, productRef, saleCtx]);
  const checkHandler = () => {
    setIsChecked((pre) => !pre);
  };
  const checkCouponHandler = () => {
    setIsCheckCoupon((pre) => {
      productRef.current.isCoupon = !pre;
      return !pre;
    });
  };
  const amountHandler = (e) => {
    setAmount(e.target.value);
    productRef.current.discount = e.target.value;
  };

  return (
    <Product>
      <CheckProduct
        type="checkbox"
        checked={isChecked}
        onChange={checkHandler}
      />
      <ImgBx>
        <ProductImg src={product.main_image} />
      </ImgBx>
      <ProductTitle>{product.title}</ProductTitle>
      <InitPrice>價格:{product.price}</InitPrice>
      <RightBx>
        <CouponBx>
          <CheckProduct
            type="checkbox"
            value={isCheckCoupon}
            onChange={checkCouponHandler}
          />
          <CouponLabel>優惠券折抵價:</CouponLabel>
          <CouponInput
            type="text"
            disabled={!isCheckCoupon}
            onChange={amountHandler}
            value={amount}
          />
        </CouponBx>
      </RightBx>
    </Product>
  );
};

export default CreateProduct;
