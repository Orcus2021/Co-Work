import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CreateProduct from "./CreateProduct";
import api from "../../utils/api";

const CreateProductBx = styled.div`
  margin: 0 auto;
  padding: 20px 0 20px;
  ${"" /* max-width: 1160px; */}
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 600px;
  position: fixed;
  background-color: #f6dbdb;
  z-index: 999;
  padding-right: 20px;
  border-radius: 0 0 30px 30px;
  @media screen and (max-width: 1279px) {
    padding: 20px 24px 236px;
  }
`;
const CreateRightBx = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${"" /* border: 1px solid black; */}
  padding-right:20px;
`;
const PanelTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
`;
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 214px;
  outline: none;
  border: solid 1px #979797;
  flex-grow: 1;
  height: 100%;
  border-radius: 20px;
`;
const SearchInputBx = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
  width: 80%;
  margin-right: 5px;
`;
const Category = styled.select`
  height: 30px;
  width: 100px;
  border: none;
  margin-bottom: 5px;
  margin-right: 5px;
`;
const CategoryOption = styled.option`
  font-size: 1rem;
`;
const Btn = styled.button`
  width: 80px;
  font-size: 1rem;
  border-radius: 30px;
  border: 2px solid black;
  cursor: pointer;
  height: 30px;
  margin-bottom: 10px;
`;
const SearchBtn = styled(Btn)`
  color: white;
  background-color: black;
  margin-bottom: 0px;
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
  margin-top: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const ProductList = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 20px;
  border: 1px dashed #99262a;
  margin: 0 40px 20px 40px;
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
const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const UploadCardInput = styled.input.attrs({
  type: "file",
  accept: "image/png, image/jpeg",
})`
  opacity: 0;
  z-index: -1;
  position: absolute;
`;
const UploadCardStyled = styled.label`
  background-color: #fff;
  padding: 10px;
  width: 100%;
  max-width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  cursor: pointer;
`;
const UploadPreview = styled.div`
  max-width: 100%;
  max-height: 100%;
  text-align: center;
`;
const UploadPreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const UploadCardButton = styled.span`
  background-color: #fff;
  border: solid 2px #e6e6e6;
  padding: 10px 10px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
  }
`;
const CloseButton = styled.button`
  border: none;
  background: none;
  color: red;
  margin-top: 0;
  cursor: pointer;
`;

// const CreateList = () => {
//   const addProductArr = useRef([]);
//   const [allSelect, setAllSelect] = useState(false);
//   const [clearAll, setClearAll] = useState(false);
//   const [category, setCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [searchProducts, setSearchProducts] = useState([]);
//   const [uploadImg, setUploadImg] = useState("");

//   const nextPagingRef = useRef();
//   const waypointRef = useRef();

//   const allSelectHandler = () => {
//     setAllSelect(true);
//   };
//   const clearAllHandler = () => {
//     setClearAll(true);
//   };
//   const addProductHandler = (id) => {
//     addProductArr.current.push(id);

//     console.log(addProductArr.current);
//   };

//   const removeProductHandler = (id) => {
//     const newArr = addProductArr.current.filter((productId) => {
//       return productId !== id;
//     });
//     addProductArr.current = newArr;

//     console.log(addProductArr.current);
//   };
//   const categoryHandler = (e) => {
//     setCategory(e.target.value);
//   };
//   const searchValueHandler = (e) => {
//     setSearch(e.target.value);
//   };
//   const searchResultHandler = () => {
//     // const data = await api.getProducts(category, 0);
//     // setSearchProducts(data.data);
//     bottomToFetch(category);
//   };
//   const bottomToFetch = (select) => {
//     nextPagingRef.current = 0;
//     let isFetching = false;
//     const intersectionObserver = new IntersectionObserver(async (entries) => {
//       if (entries[0].intersectionRatio <= 0) return;
//       if (nextPagingRef.current === undefined) return;

//       if (isFetching) return;

//       function fetchProducts() {
//         // if (keyword) {
//         //   return api.searchProducts(keyword, nextPagingRef.current);
//         // }
//         // if (category) {
//         //   return api.getProducts(category, nextPagingRef.current);
//         // }
//         return api.getProducts(select, nextPagingRef.current);
//       }

//       isFetching = true;
//       console.log(isFetching);
//       const { data, next_paging } = await fetchProducts();
//       setSearchProducts((prev) => [...prev, ...data]);
//       nextPagingRef.current = next_paging;
//       isFetching = false;
//     });

//     intersectionObserver.observe(waypointRef.current);
//     const waypoint = waypointRef.current;

//     return () => {
//       intersectionObserver.unobserve(waypoint);
//     };
//   };
//   const fileLoad = (e) => {
//     setUploadImg(e.target.result);
//   };
//   const uploadImgHandler = (e) => {
//     const file = e.target.files.item(0);
//     const fileReader = new FileReader();
//     fileReader.onload = fileLoad;
//     fileReader.readAsDataURL(file);
//   };

//   const submitImgHandler = () => {
//     // 打API
//   };
//   const clearImgHandler = () => {
//     setUploadImg("");
//   };

//   return (
//     <CreateProductBx>
//       <ProductList>
//         {searchProducts.map((item) => {
//           return (
//             <CreateProduct
//               isAll={allSelect}
//               onAll={setAllSelect}
//               isClear={clearAll}
//               onClear={setClearAll}
//               product={item}
//               onAdd={addProductHandler}
//               onRemove={removeProductHandler}
//             ></CreateProduct>
//           );
//         })}
//         <div ref={waypointRef} style={{ height: "20px" }} />
//       </ProductList>
//       <CreateRightBx>
//         <UploadLiveForm>
//           <InputImg type="file" name="img" onChange={uploadImgHandler} />
//           <ImgBx>{uploadImg && <Img src={uploadImg} />}</ImgBx>
//         </UploadLiveForm>
//         <BtnWrapper>
//           <UploadBtn onClick={submitImgHandler}>上傳</UploadBtn>
//           <UploadBtn onClick={clearImgHandler}>清除照片</UploadBtn>
//         </BtnWrapper>
//         <SearchInputBx>
//           <SearchInput
//             type="text"
//             onChange={searchValueHandler}
//             value={search}
//           />
//           <SearchBtn onClick={searchResultHandler}>搜尋</SearchBtn>
//         </SearchInputBx>
//         <Category onChange={categoryHandler}>
//           <CategoryOption value="all">All</CategoryOption>
//           <CategoryOption value="women">女裝</CategoryOption>
//           <CategoryOption value="men">男裝</CategoryOption>
//           <CategoryOption value="accessories">配件</CategoryOption>
//         </Category>
//         <BtnWrapper>
//           <SelectAll onClick={allSelectHandler}>全選</SelectAll>
//           <ClearAll onClick={clearAllHandler}>清除</ClearAll>
//           <AddProduct>上架</AddProduct>
//         </BtnWrapper>
//       </CreateRightBx>
//     </CreateProductBx>
//   );
// };

export default function CreateList(props) {
  const addProductArr = useRef([]);
  const [allSelect, setAllSelect] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [uploadImg, setUploadImg] = useState("");
  const [fileSrc, setFileSrc] = useState(null);

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
    setFileSrc(e.target.result);
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
  const clearImgHandler = (event) => {
    setUploadImg("");
  };
  return props.trigger ? (
    <>
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
          <PanelTitle>本次直播主題照片</PanelTitle>
          <UploadCardStyled>
            {fileSrc ? (
              <>
                {/* <ClearBtn onClick={handleClear}>刪除</ClearBtn> */}
                <UploadPreview>
                  <UploadPreviewImg src={fileSrc} />
                </UploadPreview>
              </>
            ) : (
              <UploadCardButton>請選擇直播封面照</UploadCardButton>
            )}
            <UploadCardInput onChange={uploadImgHandler} />
          </UploadCardStyled>
          <BtnWrapper>
            <UploadBtn onClick={submitImgHandler}>上傳照片</UploadBtn>
            {/* <UploadBtn onClick={clearImgHandler}>清除照片</UploadBtn> */}
          </BtnWrapper>
          {/* <UploadLiveForm>
            <InputImg type="file" name="img" onChange={uploadImgHandler} />
            <ImgBx>{uploadImg && <Img src={uploadImg} />}</ImgBx>
          </UploadLiveForm>
          <BtnWrapper>
            <UploadBtn onClick={submitImgHandler}>上傳</UploadBtn>
            <UploadBtn onClick={clearImgHandler}>清除照片</UploadBtn>
          </BtnWrapper> */}
          <PanelTitle>本次直播商品</PanelTitle>
          <SearchWrapper>
            <Category onChange={categoryHandler}>
              <CategoryOption value="all">All</CategoryOption>
              <CategoryOption value="women">女裝</CategoryOption>
              <CategoryOption value="men">男裝</CategoryOption>
              <CategoryOption value="accessories">配件</CategoryOption>
            </Category>
            <SearchInputBx>
              <SearchInput
                type="text"
                onChange={searchValueHandler}
                value={search}
              />
              <SearchBtn onClick={searchResultHandler}>搜尋商品</SearchBtn>
            </SearchInputBx>
          </SearchWrapper>
          <BtnWrapper>
            <SelectAll onClick={allSelectHandler}>全選</SelectAll>
            <ClearAll onClick={clearAllHandler}>清除</ClearAll>
            <AddProduct>上架</AddProduct>
          </BtnWrapper>
        </CreateRightBx>
        <div>
          <CloseButton onClick={() => props.setButtonPop(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </CloseButton>
        </div>
      </CreateProductBx>
    </>
  ) : null;
}
