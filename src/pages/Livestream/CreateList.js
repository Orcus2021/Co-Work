import React, { useRef, useState } from "react";
import styled from "styled-components";
import CreateProduct from "./CreateProduct";
import api from "../../utils/api";

const CreateProductBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 820px;
`;
const CreateRightBx = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
`;
const SearchInput = styled.input`
  outline: none;
  border: 1px solid black;
  flex-grow: 1;
  height: 100%;
`;
const SearchInputBx = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
`;
const SearchBtn = styled.button`
  color: white;
  background-color: black;
`;
const Category = styled.select`
  border: none;
`;
const CategoryOption = styled.option`
  font-size: 1rem;
`;
const Btn = styled.button`
  width: 150px;
  font-size: 1rem;
  border-radius: 30px;
  border: 2px solid black;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
`;
const SelectAll = styled(Btn)`
  background-color: black;
  color: white;
`;
const ClearAll = styled(Btn)`
  background-color: black;
  color: white;
`;
const AddProduct = styled(Btn)`
  background-color: black;
  color: white;
`;

const ProductList = styled.div`
flex-grow: 1;
overflow-y: scroll;
padding: 20px;
}
`;
const CreateList = () => {
  const addProductArr = useRef([]);
  const [allSelect, setAllSelect] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  const allSelectHandler = () => {
    setAllSelect(true);
  };
  const clearAllHandler = () => {
    setClearAll(true);
  };
  const addProductHandler = (id) => {
    addProductArr.current.push(id);
  };
  const removeProductHandler = (id) => {
    const newArr = addProductArr.current.filter((productId) => {
      return productId !== id;
    });
    addProductArr.current = newArr;
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const searchValueHandler = (e) => {
    setSearch(e.target.value);
  };
  const searchResultHandler = async () => {
    const data = await api.getProducts(category, 0);
    setSearchProducts(data.data);
  };
  return (
    <CreateProductBx>
      <ProductList>
        {searchProducts.map((item) => {
          return (
            <CreateProduct
              isAll={allSelect}
              onAll={setAllSelect}
              isClear={clearAll}
              onClear={setClearAll}
              product={item}
            ></CreateProduct>
          );
        })}
      </ProductList>
      <CreateRightBx>
        <SearchInputBx>
          <SearchInput
            type="text"
            onChange={searchValueHandler}
            value={search}
          />
          <SearchBtn onClick={searchResultHandler}>搜尋</SearchBtn>
        </SearchInputBx>
        <Category onChange={categoryHandler}>
          <CategoryOption value="all">All</CategoryOption>
          <CategoryOption value="women">女裝</CategoryOption>
          <CategoryOption value="men">男裝</CategoryOption>
          <CategoryOption value="accessories">配件</CategoryOption>
        </Category>
        <SelectAll onClick={allSelectHandler}>全選</SelectAll>
        <ClearAll onClick={clearAllHandler}>清除</ClearAll>
        <AddProduct>上架</AddProduct>
      </CreateRightBx>
    </CreateProductBx>
  );
};

export default CreateList;
