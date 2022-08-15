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

const Product = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  height: 120px;
  border-bottom: 1px dashed #99262a;
  padding-bottom: 20px;
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
`;
const Price = styled.p`
  flex-grow: 1;
  font-size: 1rem;
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

const AddBtn = styled(Btn)`
  width: 80px;
  height: 30px;
  background-color: #99262a;
  color: white;
  border: #99262a;
  margin-bottom: 10px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e08386;
    color: #99262a;
  }
`;
const RemoveBtn = styled(Btn)`
  width: 80px;
  height: 30px;
  background-color: #f6dbdb;
  color: #99262a;
  border: #99262a;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const StandbyProduct = (props) => {
  const { product, onSale, onDelete } = props;
  const deleteHandler = () => {
    onDelete(product.id);
  };
  return (
    <Product>
      <ImgBx>
        <ProductImg src={product.main_image} />
      </ImgBx>
      <ProductTitle>{product.title}</ProductTitle>
      <Price>
        原價:{product.price} <br />
        特價:100
      </Price>
      <AddBtn
        onClick={() => {
          onSale(product);
        }}
      >
        上架
      </AddBtn>
      <RemoveBtn onClick={deleteHandler}>移除</RemoveBtn>
    </Product>
  );
};

export default StandbyProduct;
