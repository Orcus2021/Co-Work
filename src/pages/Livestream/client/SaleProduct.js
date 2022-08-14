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

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 281px;
`;
const AddProductBx = styled.div`
  position: relative;
  width: 100%;
  border: 2.5px solid black;
  padding: 20px;
  height: 281px;
`;
const SaleTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #e08386;
  border-bottom: 1px solid #e08386;
  padding-bottom: 10px;
`;
const Product = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 210px;
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
`;
const ProductTitle = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
`;
const Price = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
`;
const Variants = styled.div`
  width: 300px;
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
  justify-content: center;
  margin-bottom: 10px;
`;
const Color = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  background-color: ${(props) => props.$colorCode};
  cursor: pointer;
`;
const SizeBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Size = styled.div`
  width: 30px;
  height: 30px;
  background-color: rgb(131, 152, 222);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;
const Qty = styled.p`
  width: 100%;

  font-size: 1.2rem;
  text-align: center;
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
  background-color: #d5575c;
  color: white;
  border: #d5575c;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

const SaleProduct = (props) => {
  const [colorCode, setColorCode] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(0);
  useEffect(() => {
    dummy?.variants.forEach((data) => {
      if (size === data.size && colorCode === data.color_code) {
        setQty(data.stock);
      }
    });
  }, [size, colorCode, dummy]);

  const addToCartHandler = () => {
    // 加入購物車
  };
  return (
    <>
      <SaleTitle>拍賣區</SaleTitle>
      {dummy && (
        <Product key={dummy.id}>
          <ImgBx>
            <ProductImg src={dummy.main_image} />
          </ImgBx>
          <Details>
            <ProductTitle>{dummy.title}</ProductTitle>
            <Price>原價:{dummy.price} 特價:100</Price>
          </Details>
          <Variants>
            <ColorBx>
              {dummy.colors.map((color) => {
                return (
                  <Color
                    $colorCode={`#${color.code}`}
                    onClick={() => {
                      setColorCode(color.code);
                    }}
                  ></Color>
                );
              })}
            </ColorBx>
            <SizeBx>
              {dummy.sizes.map((size) => {
                return (
                  <Size
                    onClick={() => {
                      setSize(size);
                    }}
                  >
                    {size}
                  </Size>
                );
              })}
            </SizeBx>
            <Qty>數量:{qty}件</Qty>
          </Variants>
          <AddCartBtn onClick={addToCartHandler}>加入購物車</AddCartBtn>
        </Product>
      )}
    </>
  );
};

export default SaleProduct;
