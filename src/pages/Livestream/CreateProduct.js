import React, { useState, useEffect } from "react";
import styled from "styled-components";

const dummy = {
  id: 201807242222,
  category: "men",
  title: "經典商務西裝",
  description: "厚薄：薄\r\n彈性：無",
  price: 3999,
  texture: "棉 100%",
  wash: "手洗，溫水",
  place: "中國",
  note: "實品顏色依單品照為主",
  story:
    "O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.",
  main_image: "https://api.appworks-school.tw/assets/201807242222/main.jpg",
  images: [
    "https://api.appworks-school.tw/assets/201807242222/0.jpg",
    "https://api.appworks-school.tw/assets/201807242222/1.jpg",
    "https://api.appworks-school.tw/assets/201807242222/0.jpg",
    "https://api.appworks-school.tw/assets/201807242222/1.jpg",
  ],
  variants: [
    {
      color_code: "334455",
      size: "S",
      stock: 9,
    },
    {
      color_code: "334455",
      size: "M",
      stock: 5,
    },
    {
      color_code: "334455",
      size: "L",
      stock: 1,
    },
    {
      color_code: "334455",
      size: "XL",
      stock: 9,
    },
  ],
  colors: [
    {
      code: "334455",
      name: "深藍",
    },
  ],
  sizes: ["S", "M", "L", "XL"],
};

const Product = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  height: 120px;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
}
`;
const ImgBx = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ProductImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ProductTitle = styled.p`
  flex-grow: 1;

  font-size: 1.5rem;
  text-align: center;
`;
const Price = styled.p`
  flex-grow: 1;

  font-size: 1.5rem;
  text-align: center;
`;
const CheckProduct = styled.input`
  width: 30px;
  height: 30px;
`;
const RightBx = styled.div`
  width: 300px;
`;
const InitPrice = styled.p`
  font-size: 1.2rem;
  text-align: center;
  flex-grow: 1;
`;
const CouponBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CouponLabel = styled.label`
  font-size: 1.2rem;
`;
const CouponInput = styled.input`
  width: 100px;
`;

const CreateProduct = (props) => {
  const { isAll, onAll, isClear, onClear, product, onAdd, onRemove } = props;

  const [isChecked, setIsChecked] = useState(false);
  const [isCheckCoupon, setIsCheckCoupon] = useState(false);

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
      onAdd(product.id);
    } else {
      onRemove(product.id);
    }
  }, [isChecked]);

  const checkHandler = () => {
    setIsChecked((pre) => !pre);
  };
  const checkCouponHandler = () => {
    setIsCheckCoupon((pre) => !pre);
  };
  console.log(isCheckCoupon);
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
          <CouponInput type="text" disabled={!isCheckCoupon} />
        </CouponBx>
      </RightBx>
    </Product>
  );
};

export default CreateProduct;
