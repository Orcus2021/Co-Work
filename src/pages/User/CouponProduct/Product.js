import React from "react";
import styled from "styled-components";

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
