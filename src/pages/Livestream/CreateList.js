import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import CreateProduct from "./CreateProduct";
import api from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";
import { SaleContext } from "../../contexts/SaleProduct";

const CreateProductBx = styled.div`
  margin: 0 auto;
  padding: 20px 0 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 60vh;
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
  padding-right: 20px;
  margin-left: 40px;
  @media screen and (max-width: 1279px) {
    width: 40%;
    margin-left: 5px;
    margin-top: 10vh;
  }
`;
const PanelTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  color: #99262a;
  @media screen and (max-width: 1279px) {
    font-size: 0.8rem;
  }
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
  @media screen and (max-width: 1279px) {
    width: 20%;
  }
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
  @media screen and (max-width: 1279px) {
    font-size: 0.5rem;
  }
`;
const SearchBtn = styled(Btn)`
  color: white;
  background-color: black;
  margin-bottom: 0px;
  margin-left: 5px;
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
  border: 1px dashed #99262a;
  margin: 0 40px 20px 40px;
  @media screen and (max-width: 1279px) {
    width: 60%;
    margin: 0 20px 10px 20px;
    height: 40vh;
  }
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
  margin-bottom: 10px;
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
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
    transition: 1s;
  }
  @media screen and (max-width: 1279px) {
    font-size: 0.8rem;
  }
`;
const CloseButton = styled.button`
  border: none;
  background: none;
  color: red;
  margin-top: 0;
  cursor: pointer;
`;

export default function CreateList(props) {
  const { trigger, setButtonPop } = props;
  const userCtx = useContext(UserContext);
  const saleCtx = useContext(SaleContext);
  const addProductArr = useRef([]);
  const imgFile = useRef();
  const [allSelect, setAllSelect] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  // const [uploadImg, setUploadImg] = useState("");
  const [fileSrc, setFileSrc] = useState(null);

  const nextPagingRef = useRef();
  const waypointRef = useRef();
  const intersectionObserver = useRef(null);

  const allSelectHandler = () => {
    setAllSelect(true);
  };
  const clearAllHandler = () => {
    setClearAll(true);
  };
  const addProductHandler = (product) => {
    addProductArr.current.push(product);
  };

  const removeProductHandler = (id) => {
    const newArr = addProductArr.current.filter((product) => {
      return product.id !== id;
    });
    addProductArr.current = newArr;
  };
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const searchValueHandler = (e) => {
    setSearch(e.target.value);
  };

  const bottomToFetch = (category, search) => {
    nextPagingRef.current = 0;
    let isFetching = false;
    const newCategory = category;
    const newSearch = search;

    intersectionObserver.current = new IntersectionObserver(async (entries) => {
      if (entries[0].intersectionRatio <= 0) return;
      if (nextPagingRef.current === undefined) return;

      if (isFetching) return;

      const fetchProducts = () => {
        if (newSearch && newCategory) {
          return api.getAnyProducts(
            newCategory,
            newSearch,
            nextPagingRef.current
          );
        }
        if (newSearch) {
          return api.searchProducts(newSearch, nextPagingRef.current);
        }
        if (newCategory) {
          return api.getProducts(newCategory, nextPagingRef.current);
        }
      };

      isFetching = true;

      const { data, next_paging } = await fetchProducts();
      setSearchProducts((prev) => [...prev, ...data]);
      nextPagingRef.current = next_paging;
      isFetching = false;
    });

    intersectionObserver.current.observe(waypointRef.current);
  };
  const searchResultHandler = () => {
    if (intersectionObserver) {
      const waypoint = waypointRef.current;
      intersectionObserver.current?.unobserve(waypoint);
    }

    setSearchProducts([]);
    setTimeout(() => {
      bottomToFetch(category, search);
    }, 500);
  };

  const fileLoad = (e) => {
    // setUploadImg(e.target.result);
    setFileSrc(e.target.result);
  };
  const uploadImgHandler = (e) => {
    imgFile.current = e.target.files;
    const file = e.target.files.item(0);
    const fileReader = new FileReader();
    fileReader.onload = fileLoad;
    fileReader.readAsDataURL(file);
  };

  // const submitImgHandler = () => {
  //   // ??????????????????API
  // };
  // const clearImgHandler = (event) => {
  //   setUploadImg("");
  // };

  const submitProductHandler = async () => {
    if (!userCtx.user?.accessToken) {
      alert("????????????");
      return;
    }

    const isCorrect = addProductArr.current
      .map((product) => {
        if (product.isCoupon) {
          if (product.discount <= 0) {
            return false;
          }
        }
      })
      .find((data) => data === false);

    if (isCorrect === false) {
      alert("??????????????????????????????");
      return;
    }
    const formData = new FormData();
    const ids = addProductArr.current.map((product) => {
      return product.id;
    });
    formData.append("title", "Penny Show");
    formData.append("product_ids", JSON.stringify(ids));
    formData.append("image", imgFile.current[0]);
    const response = await api.addStreamerProduct(
      formData,
      userCtx.user.accessToken
    );
    if (response.success) {
      const dataArr = addProductArr.current.map((data) => {
        const obj = {
          type: "amount",
          discount: data.discount,
          available_times: 99,
          applied_range: "live",
          expired_time: "2022-08-19",
          product_id: data.id,
        };
        return obj;
      });
      const newCoupon = { data: dataArr };

      const { data } = await api.createCoupon(
        newCoupon,
        userCtx.user.accessToken
      );
      const newArr = addProductArr.current.map((product, index) => {
        delete product.isCoupon;
        product.coupon_id = data[index].id;
        product.discount = data[index].discount;
        return product;
      });

      saleCtx.addProduct(newArr);
      setButtonPop(false);
    } else {
      alert("??????????????????");
    }
  };

  return trigger ? (
    <>
      <CreateProductBx>
        <CreateRightBx>
          <PanelTitle>????????????????????????</PanelTitle>
          <UploadCardStyled>
            {fileSrc ? (
              <>
                {/* <ClearBtn onClick={handleClear}>??????</ClearBtn> */}
                <UploadPreview>
                  <UploadPreviewImg src={fileSrc} />
                </UploadPreview>
              </>
            ) : (
              <UploadCardButton>?????????????????????</UploadCardButton>
            )}
            <UploadCardInput onChange={uploadImgHandler} />
          </UploadCardStyled>
          <BtnWrapper>
            {/* <UploadBtn onClick={submitImgHandler}>????????????</UploadBtn> */}
            {/* <UploadBtn onClick={clearImgHandler}>????????????</UploadBtn> */}
          </BtnWrapper>
          {/* <UploadLiveForm>
            <InputImg type="file" name="img" onChange={uploadImgHandler} />
            <ImgBx>{uploadImg && <Img src={uploadImg} />}</ImgBx>
          </UploadLiveForm>
          <BtnWrapper>
            <UploadBtn onClick={submitImgHandler}>??????</UploadBtn>
            <UploadBtn onClick={clearImgHandler}>????????????</UploadBtn>
          </BtnWrapper> */}
          <PanelTitle>??????????????????</PanelTitle>
          <SearchWrapper>
            <Category onClick={categoryHandler}>
              <CategoryOption value="all">All</CategoryOption>
              <CategoryOption value="women">??????</CategoryOption>
              <CategoryOption value="men">??????</CategoryOption>
              <CategoryOption value="accessories">??????</CategoryOption>
            </Category>
            <SearchInputBx>
              <SearchInput
                type="text"
                onChange={searchValueHandler}
                value={search}
              />
              <SearchBtn onClick={searchResultHandler}>????????????</SearchBtn>
            </SearchInputBx>
          </SearchWrapper>
          <BtnWrapper>
            <SelectAll onClick={allSelectHandler}>??????</SelectAll>
            <ClearAll onClick={clearAllHandler}>??????</ClearAll>
            <AddProduct onClick={submitProductHandler}>??????</AddProduct>
          </BtnWrapper>
        </CreateRightBx>
        <ProductList>
          {searchProducts.map((item) => {
            return (
              <CreateProduct
                key={item.id}
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
          <div ref={waypointRef} style={{ height: "10px" }} />
        </ProductList>
        <div>
          <CloseButton onClick={() => props.setButtonPop(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-x-circle-fill"
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
