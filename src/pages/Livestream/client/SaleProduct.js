import React, { useState, useEffect, useContext } from "react";
import CartContext from "../../../contexts/CartContext";
import styled from "styled-components";

const SaleTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #99262a;
  border-bottom: 1px solid #99262a;
  padding-bottom: 10px;
`;
const Product = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 210px;
  padding: 20px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    height: 400px;
  }
`;
const ImgBx = styled.div`
  border-radius: 30px;
  width: 150px;
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
const Details = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;
const ProductTitle = styled.p`
  margin-bottom: 10px;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
`;
const Price = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;
const InitPrice = styled(Price)`
  text-decoration: line-through;
`;
const Variants = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ColorBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Label = styled.div`
  padding-right: 10px;
`;
const Color = styled.div`
  position: relative;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background-color: ${(props) => props.$colorCode};
  cursor: pointer;
  &::after {
    content: "";
    border-radius: 3px;
    width: 32px;
    height: 32px;
    position: absolute;
    top: -5px;
    left: -5px;
    border: 1px solid ${(props) => (props.$isChose ? "black" : "#eeeeee")};
  }
`;
const SizeBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Size = styled.div`
  position: relative;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  background-color: #99262a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  &:hover {
    background-color: #e08386;
    color: #99262a;
    transition: 1s;
  }
  &::after {
    content: "";
    border-radius: 3px;
    width: 32px;
    height: 32px;
    position: absolute;
    top: -5px;
    left: -5px;
    border: 1px solid ${(props) => (props.$isChose ? "black" : "#eeeeee")};
  }
`;
const Qty = styled.p`
  width: 100%;
  font-size: 1rem;

  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;
const Btn = styled.button`
  width: 150px;
  font-size: 1rem;
  border-radius: 30px;
  border: 2px solid black;
  cursor: pointer;
  height: 40px;
`;
const AddCartBtn = styled(Btn)`
  background-color: #99262a;
  color: white;
  border: #99262a;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e08386;
    color: #99262a;
    transition: 1s;
  }
`;

const SaleProduct = (props) => {
  const { product } = props;
  const [colorCode, setColorCode] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(0);
  const cart = useContext(CartContext);
  useEffect(() => {
    product?.variants.forEach((data) => {
      if (size === data.size && colorCode === data.color_code) {
        setQty(data.stock);
      }
    });
  }, [size, colorCode, product]);

  function getStock(colorCode, size) {
    return product.variants.find(
      (variant) => variant.color_code === colorCode && variant.size === size
    )?.stock;
  }
  const addToCartHandler = () => {
    cart.addItem({
      color: product.colors.find((color) => color.code === colorCode),
      id: product.id,
      image: product.main_image,
      name: product.title,
      price: product.price,
      discount: product.discount,
      coupon_id: product.coupon_id,
      category: product.category,
      qty: 1,
      size: size,
      stock: getStock(colorCode, size),
    });
  };
  return (
    <>
      <SaleTitle>?????????</SaleTitle>
      {product && (
        <Product key={product.id}>
          <ImgBx>
            <ProductImg src={product.main_image} />
          </ImgBx>
          <Details>
            <ProductTitle>{product.title}</ProductTitle>
            <InitPrice>??????:{product.price}</InitPrice>
            <Price>??????:{product.discount}</Price>
          </Details>
          <Variants>
            <ColorBx>
              <Label>??????:</Label>
              {product.colors.map((colorObj, index) => {
                return (
                  <Color
                    key={index}
                    $colorCode={`#${colorObj.code}`}
                    $isChose={colorCode === colorObj.code}
                    onClick={() => {
                      setColorCode(colorObj.code);
                    }}
                  ></Color>
                );
              })}
            </ColorBx>
            <SizeBx>
              <Label>??????:</Label>
              {product.sizes.map((sizeName, index) => {
                return (
                  <Size
                    key={index}
                    $isChose={sizeName === size}
                    onClick={() => {
                      setSize(sizeName);
                    }}
                  >
                    {sizeName}
                  </Size>
                );
              })}
            </SizeBx>
            <Qty>??????: {qty}???</Qty>
          </Variants>
          <AddCartBtn onClick={addToCartHandler}>???????????????</AddCartBtn>
        </Product>
      )}
    </>
  );
};

export default SaleProduct;
