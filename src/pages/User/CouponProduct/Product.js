import React from "react";
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

const ProductBx = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin-bottom: 10px;
  height: 50px;
  padding:10px;
  border-radius:8px;
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.3);
  margin:0 auto 10px auto;
  background-color:#fff;
  cursor:pointer;
}

`;
const ImgBx = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

const ProductImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const ProductTitle = styled.p`
  flex-grow: 1;
  font-size: 1rem;
  text-align: center;
`;

const Product = (props) => {
  const { product, onID } = props;
  const getIDHandler = () => {
    onID(product.id);
  };
  return (
    <ProductBx onClick={getIDHandler}>
      <ImgBx>
        <ProductImg src={product.main_image} />
      </ImgBx>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductTitle>{product.id}</ProductTitle>
    </ProductBx>
  );
};

export default Product;
