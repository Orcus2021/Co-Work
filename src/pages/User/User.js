import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Product from "./CouponProduct/Product";
import Coupon from "../../components/Coupon/Coupon";
import Modal from "../../components/Modal/Modal";
import api from "../../utils/api";

import cameraIcon from "../../assets/camera.png";
import styled from "styled-components";
import logoutIcon from "../../assets/logout.png";

const Wrapper = styled.div`
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 1279px) {
    margin-bottom: 200px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px solid #e08386;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  padding-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  padding-left: 11%;
  color: #e08386;
`;
const LogOutBtn = styled.div`
  background-color: #fff;
  border: 0px;
  padding: 10px 20px;
  font-size: 17px;
  line-height: 1.24;
  cursor: pointer;
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  @media screen and (max-width: 1279px) {
    flex-wrap: wrap;
  }
`;
const LeftWrapper = styled.div`
  border: 2px solid #e08386;
  border-radius: 30px;
  width: 30%;
  height: 500px;
  margin-right: 20px;
  overflow: hidden;
  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;
const RightWrapper = styled.div`
  ${
    "" /* border: 2px solid #979797;
  border-radius: 30px; */
  }
  width: 70%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const UserProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const UserProfileImgP = styled.p`
  position: relative;
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 999em;
  background-color: #eeede7;
  margin-top: 30px;
  margin-bottom: 30px;
  color: black;
  font-size: 6rem;
`;
const UserProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #eeede7;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const UserProfileMenu = styled.div`
  display: flex;
  flex-direction: column;
`;
const MenuLabel = styled(Link)`
  border: 0px;
  background-color: white;
  line-height: 25px;
  font-size: 20px;
  cursor: pointer;
  padding: 15px 0 15px 0;
  text-decoration: none;
  color: #e08386;
  @media screen and (max-width: 1279px) {
    font-size: 16px;
  }
  &:hover {
    transition: 1s;
    background-color: #e08386;
    color: #fff;
  }
`;
const UserProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const SubTitle = styled.div`
  padding-top: 40px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;
const InputLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const InputControl = styled.p`
  width: 250px;
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
`;
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 360px;
  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
  }
`;
const LogOutImgBx = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const CouponBx = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;
const CreateCoupon = styled.div`
  margin-right: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const SearchCoupon = styled(CreateCoupon)``;
const CouponLabel = styled.label`
  width: 110px;
  font-size: 1rem;
`;
const CouponInput = styled.input`
  flex-grow: 1;
  font-size: 1rem;
  padding: 10px;
  border: solid 1px #979797;

  border-radius: 8px;
`;
const InputBx = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 30px;
`;
const DiscountSelect = styled.select`
  flex-grow: 1;
  font-size: 1rem;
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
`;
const DiscountOption = styled.option`
  font-size: 1rem;
`;
const CouponBtn = styled.button`
  background-color: #fff;
  border: solid 2px #e6e6e6;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  margin-top: 24px;
  cursor: pointer;
  width: 100px;
  align-self: center;
`;
const SearchBtn = styled(CouponBtn)`
  height: 40px;
  margin-top: 0px;
  margin-left: 10px;
`;
const SearchResultBx = styled.div`
  height: 329px;
  margin-top: 30px;
  ${
    "" /* border: 2px solid #979797;
  border-radius: 30px; */
  }
  overflow-y: auto;
  width: 100%;
  flex-grow: 1;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: rgba(153, 38, 42, 0);
  }
`;
const EditImg = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  right: 80px;
  bottom: 40px;
  object-fit: cover;
  cursor: pointer;
`;
const CouponList = styled(SearchResultBx)`
  width: 400px;
  margin-top: 10px;
  height: 324px;
  overflow-y: overlay;
`;
const Input = styled.input`
  flex-grow: 1;
  height: 30px;
  border-radius: 8px 0 0 8px;
  border: solid 1px #979797;

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const CouponCodeBx = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  flex-direction: row;
  margin-top: 5px;
`;
const UseCouponBtn = styled.button`
  background-color: #99262a;
  font-size: 0.8rem;
  padding: 3px 8px;
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;

  cursor: pointer;
`;
const UserBx = styled(CouponBx)`
  @media screen and (max-width: 1279px) {
    height: fit-content;
    display: flex;
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 400px;
  padding: 10px;
  background-color: #fff;
  border-radius: 3px;
`;
const UserRight = styled(SearchCoupon)``;

const PanelTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  color: #99262a;
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
  }
`;

const UploadCardInput = styled.input.attrs({
  type: "file",
  accept: "image/png, image/jpeg",
})`
  opacity: 0;
  z-index: -1;
  position: absolute;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
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
    font-size: 0.8rem;
  }
`;

const UploadBtn = styled(Btn)`
  background-color: black;
  color: white;
  margin: 0 auto;
  margin-bottom: 20px;
`;
const UseCouponList = styled(CouponList)`
  height: 430px;
  width: 80%;
`;

function User() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [isCoupon, setIsCoupon] = useState(false);
  const [isGetCoupon, setIsGetCoupon] = useState(false);
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const [couponList, setCouponList] = useState([]);
  const [userCouponList, setUserCouponList] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [showImgUpload, setShowImgUpload] = useState(false);
  const [modalCloseEffect, setModalCloseEffect] = useState(false);
  const [fileSrc, setFileSrc] = useState(null);
  // -----產生優惠券的state----
  const [couponDate, setCouponDate] = useState("");
  const [couponType, setCouponType] = useState("");
  const [couponScope, setCouponScope] = useState("all");
  const [couponID, setCouponID] = useState("");
  const [couponTimes, setCouponTimes] = useState("");
  const [couponAmount, setCouponAmount] = useState(0);

  const nextPagingRef = useRef();
  const waypointRef = useRef();
  const intersectionObserver = useRef(null);
  const imgFile = useRef("");

  useEffect(() => {
    if (!userCtx.user) {
      navigate("/profile/signin");
      return;
    }
  }, [userCtx]);

  const getCoupon = useCallback(async () => {
    const { data } = await api.getUserCoupon(userCtx.user.accessToken);
    // console.log(data);
    if (data?.error) {
      console.log(data.error);
      return;
    }
    setUserCouponList(data);
  }, [userCtx]);

  useEffect(() => {
    getCoupon();
  }, [userCtx, getCoupon]);

  const logoutHandler = () => {
    userCtx.removeUser();
    navigate("/profile/signin");
  };
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const searchSelectHandler = (e) => {
    setSearchCategory(e.target.value);
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
      setSearchProduct((prev) => [...prev, ...data]);

      nextPagingRef.current = next_paging;
      isFetching = false;
    });

    intersectionObserver.current.observe(waypointRef.current);
  };

  const searchHandler = () => {
    // 打API
    if (intersectionObserver) {
      const waypoint = waypointRef.current;
      intersectionObserver.current?.unobserve(waypoint);
    }

    setSearchProduct([]);
    setTimeout(() => {
      bottomToFetch(searchCategory, searchInput);
    }, 500);
  };
  const couponCodeHandler = (e) => {
    setCouponCode(e.target.value);
  };

  const useCodeHandler = () => {
    // 打API
  };

  // --------產生優惠券-------
  const couponDateHandler = (e) => {
    setCouponDate(e.target.value);
  };
  const couponTypeHandler = (e) => {
    setCouponType(e.target.value);
  };
  const couponScopeHandler = (e) => {
    setCouponScope(e.target.value);
  };
  const couponIDHandler = (e) => {
    setCouponID(e.target.value);
  };
  const couponTimesHandler = (e) => {
    setCouponTimes(e.target.value);
  };
  const couponAmountHandler = (e) => {
    setCouponAmount(e.target.value);
  };

  const createCouponHandler = async () => {
    // 打api coupon
    const couponObj = {
      data: [
        {
          type: couponType,
          discount: couponAmount,
          available_times: couponTimes,
          applied_range: couponScope,
          expired_time: couponDate,
          product_id: couponID,
        },
      ],
    };
    const response = await api.createCoupon(
      couponObj,
      userCtx.user.accessToken
    );
    console.log(response);
    // if (response.ok) {
    //   const coupon = await response;
    //   alert(coupon.data[0].code);
    // } else {
    //   const error = await response;
    //   throw new Error(error.error);
    // }
  };

  const getIDHandler = (id) => {
    if (couponScope == "other") {
      setCouponID(id);
    }
  };

  const showUploadImgHandler = () => {
    setShowImgUpload(true);
  };

  const closeCouponBx = () => {
    setModalCloseEffect(true);
    setTimeout(() => {
      setShowImgUpload(false);
      setModalCloseEffect(false);
    }, 600);
  };

  const uploadImgHandler = (e) => {
    imgFile.current = e.target.files;
    const fileReader = new FileReader();
    fileReader.onload = fileLoad;
    fileReader.readAsDataURL(imgFile.current.item(0));
  };
  const fileLoad = (e) => {
    // setUploadImg(e.target.result);
    setFileSrc(e.target.result);
  };

  const submitImgHandler = async () => {
    const formData = new FormData();
    formData.append("image", imgFile.current[0]);
    // 打API
    const { data } = await api.uploadUserImg(
      formData,
      userCtx.user.accessToken
    );
    if (data?.picture) {
      userCtx.user.picture = data.picture;
      const updateUser = { ...userCtx.user };
      userCtx.addUser(updateUser);
      setShowImgUpload(false);
      setFileSrc(null);
    }
  };

  const getCouponHandler = async () => {
    setIsGetCoupon(true);
    setIsCoupon(false);
    const { data } = await api.getAllCoupon();
    setCouponList(data);
  };

  const profileHandler = () => {
    setIsCoupon(false);
    setIsGetCoupon(false);
    getCoupon();
  };

  if (!userCtx.user) return;
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>會員頁面</Title>
          <LogOutBtn onClick={logoutHandler}>
            Log out
            <LogOutImgBx>
              <Img src={logoutIcon} />
            </LogOutImgBx>
          </LogOutBtn>
        </TitleWrapper>
        <UserWrapper>
          <LeftWrapper>
            <UserProfileImgWrapper>
              {userCtx.user.picture ? (
                <>
                  <UserProfileImg as="img" src={userCtx.user?.picture} />
                  <EditImg
                    onClick={showUploadImgHandler}
                    src={cameraIcon}
                  ></EditImg>
                </>
              ) : (
                <>
                  <UserProfileImgP>
                    {userCtx.user.name[0].toUpperCase()}
                  </UserProfileImgP>

                  <EditImg
                    onClick={showUploadImgHandler}
                    src={cameraIcon}
                  ></EditImg>
                </>
              )}
            </UserProfileImgWrapper>
            <UserProfileMenu>
              <MenuLabel to="#" onClick={profileHandler}>
                基本資料
              </MenuLabel>
              <MenuLabel to="#" onClick={getCouponHandler}>
                領取優惠券
              </MenuLabel>
              <MenuLabel to="/streamer">商品直播頁</MenuLabel>
              <MenuLabel to="/user/upload">商品管理系統</MenuLabel>
              <MenuLabel
                to="#"
                onClick={() => {
                  setIsCoupon(true);
                  setIsGetCoupon(false);
                }}
              >
                優惠券管理系統
              </MenuLabel>
            </UserProfileMenu>
          </LeftWrapper>
          <RightWrapper>
            {!isCoupon && !isGetCoupon && (
              <UserProfileContent>
                <SubTitle>基本資料</SubTitle>
                <UserBx>
                  <Form>
                    <InputGroup>
                      <InputContainer>
                        <InputLabel>姓名</InputLabel>
                        <InputControl>{userCtx.user?.name}</InputControl>
                      </InputContainer>
                      <InputContainer>
                        <InputLabel>信箱</InputLabel>
                        <InputControl>{userCtx.user?.email}</InputControl>
                      </InputContainer>
                      <InputContainer>
                        <InputLabel>密碼</InputLabel>
                        <InputControl>
                          &hearts;&hearts;&hearts;&hearts;&hearts;&hearts;&hearts;&hearts;
                        </InputControl>
                      </InputContainer>
                      <InputContainer>
                        <InputLabel>訂單編號</InputLabel>
                        <InputControl>2131233234151</InputControl>
                      </InputContainer>
                      <InputContainer>
                        <InputLabel>邀請碼</InputLabel>
                        <InputControl>2131233234151</InputControl>
                      </InputContainer>
                    </InputGroup>
                  </Form>
                  <UserRight>
                    <SubTitle>現有優惠券</SubTitle>
                    {/* <CouponCodeBx>
                      <Input
                        type="text"
                        placeholder="請輸入優惠碼"
                        onChange={couponCodeHandler}
                        value={couponCode}
                      />
                      <UseCouponBtn onClick={useCodeHandler}>使用</UseCouponBtn>
                    </CouponCodeBx> */}
                    <CouponList>
                      {userCouponList.map((coupon) => {
                        return <Coupon type="list" coupon={coupon}></Coupon>;
                      })}
                    </CouponList>
                  </UserRight>
                </UserBx>
              </UserProfileContent>
            )}
            {isCoupon && (
              <UserProfileContent>
                <SubTitle>優惠券管理系統</SubTitle>
                <CouponBx>
                  <CreateCoupon>
                    <InputBx>
                      <CouponLabel>使用期限</CouponLabel>
                      <CouponInput
                        type="date"
                        onChange={couponDateHandler}
                        value={couponDate}
                      />
                    </InputBx>
                    <InputBx>
                      <CouponLabel>折扣</CouponLabel>
                      <DiscountSelect onChange={couponTypeHandler}>
                        <DiscountOption value="percent">折數</DiscountOption>
                        <DiscountOption value="amount">抵扣</DiscountOption>
                      </DiscountSelect>
                      <CouponInput
                        type="number"
                        onChange={couponAmountHandler}
                        value={couponAmount}
                      />
                    </InputBx>
                    <InputBx>
                      <CouponLabel>使用範圍</CouponLabel>
                      <DiscountSelect onClick={couponScopeHandler}>
                        <DiscountOption value="all">全部</DiscountOption>
                        <DiscountOption value="women">女裝</DiscountOption>
                        <DiscountOption value="men">男裝</DiscountOption>
                        <DiscountOption value="accessories">
                          配件
                        </DiscountOption>
                        <DiscountOption value="other">限定</DiscountOption>
                      </DiscountSelect>
                      {couponScope == "other" && (
                        <CouponInput
                          onChange={couponIDHandler}
                          value={couponID}
                          type="text"
                          placeholder="限定產品ID"
                        />
                      )}
                    </InputBx>
                    <InputBx>
                      <CouponLabel>使用次數</CouponLabel>
                      <CouponInput
                        onChange={couponTimesHandler}
                        value={couponTimes}
                        type="number"
                      />
                    </InputBx>
                    <CouponBtn onClick={createCouponHandler}>新增</CouponBtn>
                  </CreateCoupon>
                  <SearchCoupon>
                    <InputBx>
                      <DiscountSelect onChange={searchSelectHandler}>
                        <DiscountOption value="all">全部</DiscountOption>
                        <DiscountOption value="women">女裝</DiscountOption>
                        <DiscountOption value="men">男裝</DiscountOption>
                        <DiscountOption value="accessories">
                          配件
                        </DiscountOption>
                      </DiscountSelect>
                      <CouponInput
                        type="text"
                        placeholder="搜尋產品"
                        value={searchInput}
                        onChange={searchInputHandler}
                      />
                      <SearchBtn onClick={searchHandler}>搜尋</SearchBtn>
                    </InputBx>
                    <SearchResultBx>
                      {searchProduct.map((product, index) => {
                        return (
                          <Product
                            key={index}
                            product={product}
                            onID={getIDHandler}
                          ></Product>
                        );
                      })}
                      <div ref={waypointRef} style={{ height: "10px" }} />
                    </SearchResultBx>
                  </SearchCoupon>
                </CouponBx>
              </UserProfileContent>
            )}
            {isGetCoupon && (
              <>
                <SubTitle>領用優惠券</SubTitle>
                <UseCouponList>
                  {couponList.map((coupon, index) => {
                    return (
                      <Coupon key={index} type="get" coupon={coupon}></Coupon>
                    );
                  })}
                </UseCouponList>
              </>
            )}
          </RightWrapper>
        </UserWrapper>
      </Wrapper>
      {showImgUpload && (
        <Modal onClose={closeCouponBx} closeEffect={modalCloseEffect}>
          <Container>
            <PanelTitle>個人照片</PanelTitle>
            <UploadCardStyled>
              {fileSrc ? (
                <>
                  {/* <ClearBtn onClick={handleClear}>刪除</ClearBtn> */}
                  <UploadPreview>
                    <UploadPreviewImg src={fileSrc} />
                  </UploadPreview>
                </>
              ) : (
                <UploadCardButton>選擇照片</UploadCardButton>
              )}
              <UploadCardInput onChange={uploadImgHandler} />
            </UploadCardStyled>
            <BtnWrapper>
              <UploadBtn onClick={submitImgHandler}>上傳照片</UploadBtn>
              <UploadBtn onClick={closeCouponBx}>關閉</UploadBtn>
              {/* <UploadBtn onClick={clearImgHandler}>清除照片</UploadBtn> */}
            </BtnWrapper>
          </Container>
        </Modal>
      )}
    </>
  );
}

export default User;
