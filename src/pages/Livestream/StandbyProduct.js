import React from "react";
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
    transition: 1s;
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
    transition: 1s;
  }
`;

const StandbyProduct = (props) => {
  const { product, onSale, onDelete, onAdd } = props;
  const deleteHandler = () => {
    onDelete(product.id);
  };
  const addProductHandler = () => {
    onSale(product);
    onAdd(product);
  };
  return (
    <Product>
      <ImgBx>
        <ProductImg src={product.main_image} />
      </ImgBx>
      <ProductTitle>{product.title}</ProductTitle>
      <Price>
        原價:{product.price} 特價:{product.discount}
      </Price>
      <AddBtn onClick={addProductHandler}>上架</AddBtn>
      <RemoveBtn onClick={deleteHandler}>移除</RemoveBtn>
    </Product>
  );
};

export default StandbyProduct;
