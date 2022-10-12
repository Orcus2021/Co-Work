import React, { useState, useEffect, useContext } from "react";
import { SaleContext } from "../../contexts/SaleProduct";
import styled from "styled-components";
import StandbyProduct from "./StandbyProduct";

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 281px;
  @media screen and (max-width: 1279px) {
    height: 500px;
  }
`;
const AddProductBx = styled.div`
  position: relative;
  width: 100%;
  ${"" /* border: 2.5px solid black; */}
  padding: 20px;
  height: 281px;
  @media screen and (max-width: 1279px) {
    height: 400px;
  }
`;
const SaleTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #99262a;
  padding-bottom: 10px;
  margin-top: 10px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 210px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
    height: 400px;
  }
`;
const ImgBx = styled.div`
  width: 150px;
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
const Details = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;
const ProductTitle = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 10px;
`;
const Price = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 5px;
  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;
const InitPrice = styled(Price)`
  text-decoration: line-through;
`;
const Variants = styled.div`
  width: 400px;
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
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Label = styled.div`
  padding-right: 10px;
`;
const Color = styled.div`
  position: relative;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background-color: ${(props) => props.$colorCode};
  cursor: pointer;
  &::after {
    content: "";
    border-radius: 3px;
    width: 32px;
    height: 32px;
    position: absolute;
    top: -5px;
    left: -5px;
    border: 1px solid ${(props) => (props.$isChose ? "black" : "#eeeeee")};
  }
`;
const SizeBx = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;
const Size = styled.div`
  position: relative;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  background-color: #99262a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  &::after {
    content: "";
    border-radius: 3px;
    width: 32px;
    height: 32px;
    position: absolute;
    top: -5px;
    left: -5px;
    border: 1px solid ${(props) => (props.$isChose ? "black" : "#eeeeee")};
  }
`;
const Qty = styled.p`
  width: 100%;
  font-size: 1rem;

  @media screen and (max-width: 1279px) {
    padding-bottom: 10px;
  }
`;
const Btn = styled.button`
  width: 150px;
  font-size: 1rem;
  border-radius: 30px;
  border: 2px solid black;
  cursor: pointer;
  height: 40px;
`;
const RemoveBtn = styled(Btn)`
  width: 100px;
  height: 40px;
  background-color: #f6dbdb;
  color: #99262a;
  border: #99262a;
  margin-bottom: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: red;
    color: white;
    transition: 1s;
  }
`;
const StandbyProductBx = styled.div`
  width: 100%;
  padding: 20px;
  max-height: 460px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: rgba(153, 38, 42, 0.7);
  }
`;
const StreamProductEmpty = styled.div`
  border: 1px dashed #99262a;
  height: 200px;
  font-size: 20px;
  text-align: center;
  padding: 90px;
  background-color: #f6dbdb;
`;

const StreamerProduct = (props) => {
  const { onAdd, onRemove } = props;
  const saleCtx = useContext(SaleContext);
  const [allProduct, setAllProduct] = useState([]);
  const [saleProduct, setSaleProduct] = useState(null);
  const [colorCode, setColorCode] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    setAllProduct(saleCtx.products);
  }, [saleCtx]);

  const saleProductHandler = (product) => {
    setSaleProduct(product);
  };
  const removeSaleHandler = () => {
    onRemove();
    setSaleProduct(null);
  };
  const deleteStandbyProduct = (id) => {
    const newArr = allProduct.filter((product) => {
      return product.id !== id;
    });
    setAllProduct(newArr);
  };

  useEffect(() => {
    saleProduct?.variants.forEach((data) => {
      if (size === data.size && colorCode === data.color_code) {
        setQty(data.stock);
      }
    });
  }, [size, colorCode, saleProduct]);

  return (
    <>
      <ProductContainer>
        <AddProductBx>
          <SaleTitle>拍賣區</SaleTitle>
          {saleProduct ? (
            <Product>
              <ImgBx>
                <ProductImg src={saleProduct.main_image} />
              </ImgBx>
              <Details>
                <ProductTitle>{saleProduct.title}</ProductTitle>
                <InitPrice>原價:{saleProduct.price}</InitPrice>
                <Price>特價:{saleProduct.discount}</Price>
              </Details>
              <Variants>
                <ColorBx>
                  <Label>顏色:</Label>
                  {saleProduct.colors.map((colorObj, index) => {
                    return (
                      <Color
                        key={index}
                        $colorCode={`#${colorObj.code}`}
                        $isChose={colorCode === colorObj.code}
                        onClick={() => {
                          setColorCode(colorObj.code);
                        }}
                      ></Color>
                    );
                  })}
                </ColorBx>
                <SizeBx>
                  <Label>尺寸:</Label>
                  {saleProduct.sizes.map((sizeName, index) => {
                    return (
                      <Size
                        key={index}
                        $isChose={sizeName === size}
                        onClick={() => {
                          setSize(sizeName);
                        }}
                      >
                        {sizeName}
                      </Size>
                    );
                  })}
                </SizeBx>
                <Qty>數量: {qty}件</Qty>
              </Variants>
              <RemoveBtn onClick={removeSaleHandler}>下架</RemoveBtn>
            </Product>
          ) : (
            <StreamProductEmpty>本次預計拍賣商品</StreamProductEmpty>
          )}
        </AddProductBx>
      </ProductContainer>
      <SaleTitle>待上架區</SaleTitle>
      <StandbyProductBx>
        {allProduct.map((product, index) => {
          return (
            <StandbyProduct
              key={index}
              onAdd={onAdd}
              product={product}
              onSale={saleProductHandler}
              onDelete={deleteStandbyProduct}
            ></StandbyProduct>
          );
        })}
      </StandbyProductBx>
    </>
  );
};

export default StreamerProduct;
