import React, { useRef, useState, useEffect } from "react";
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

const UploadBtn = styled(Btn)`
  background-color: black;
  color: white;
`;

const ProductList = styled.div`
flex-grow: 1;
overflow-y: scroll;
padding: 20px;
}
`;
const UploadLiveForm = styled.form`
  width: 100%;
  height: auto;
`;
const InputImg = styled.input`
  border: none;
`;
const ImgBx = styled.div`
  width: 80%;
  height: 200px;
  position: relative;
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CreateList = () => {
  const addProductArr = useRef([]);
  const [allSelect, setAllSelect] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  const [uploadImg, setUploadImg] = useState("");

  const nextPagingRef = useRef();
  const waypointRef = useRef();

  const allSelectHandler = () => {
    setAllSelect(true);
  };
  const clearAllHandler = () => {
    setClearAll(true);
  };
  const addProductHandler = (id) => {
    addProductArr.current.push(id);

    console.log(addProductArr.current);
  };

  const removeProductHandler = (id) => {
    const newArr = addProductArr.current.filter((productId) => {
      return productId !== id;
    });
    addProductArr.current = newArr;

    console.log(addProductArr.current);
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const searchValueHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchResultHandler = () => {
    // const data = await api.getProducts(category, 0);
    // setSearchProducts(data.data);
    bottomToFetch(category);
  };
  const bottomToFetch = (select) => {
    nextPagingRef.current = 0;
    let isFetching = false;
    const intersectionObserver = new IntersectionObserver(async (entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      if (nextPagingRef.current === undefined) return;

      if (isFetching) return;

      function fetchProducts() {
        // if (keyword) {
        //   return api.searchProducts(keyword, nextPagingRef.current);
        // }
        // if (category) {
        //   return api.getProducts(category, nextPagingRef.current);
        // }
        return api.getProducts(select, nextPagingRef.current);
      }

      isFetching = true;
      console.log(isFetching);
      const { data, next_paging } = await fetchProducts();
      setSearchProducts((prev) => [...prev, ...data]);
      nextPagingRef.current = next_paging;
      isFetching = false;
    });

    intersectionObserver.observe(waypointRef.current);
    const waypoint = waypointRef.current;

    return () => {
      intersectionObserver.unobserve(waypoint);
    };
  };
  const fileLoad = (e) => {
    setUploadImg(e.target.result);
  };
  const uploadImgHandler = (e) => {
    const file = e.target.files.item(0);
    const fileReader = new FileReader();
    fileReader.onload = fileLoad;
    fileReader.readAsDataURL(file);
  };

  const submitImgHandler = () => {
    // 打API
  };
  const clearImgHandler = () => {
    setUploadImg("");
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
              onAdd={addProductHandler}
              onRemove={removeProductHandler}
            ></CreateProduct>
          );
        })}
        <div ref={waypointRef} style={{ height: "20px" }} />
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

        <UploadLiveForm>
          <InputImg type="file" name="img" onChange={uploadImgHandler} />
          <ImgBx>{uploadImg && <Img src={uploadImg} />}</ImgBx>
        </UploadLiveForm>
        <UploadBtn onClick={submitImgHandler}>上傳</UploadBtn>
        <UploadBtn onClick={clearImgHandler}>清除照片</UploadBtn>
      </CreateRightBx>
    </CreateProductBx>
  );
};

export default CreateList;
