import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import api from "../../utils/api";
import ProductVariants from "./ProductVariants";

const Wrapper = styled.div`
  max-width: 1030px;
  margin: 0 auto;
  padding: 65px 0 49px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const MainImage = styled.img`
  width: 560px;
  cursor: zoom-in;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const Details = styled.div`
  margin-left: 42px;
  flex-grow: 1;

  @media screen and (max-width: 1279px) {
    margin: 17px 24px 0;
  }
`;

const Title = styled.div`
  line-height: 38px;
  font-size: 32px;
  letter-spacing: 6.4px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    font-size: 20px;
    letter-spacing: 4px;
  }
`;

const ID = styled.div`
  line-height: 24px;
  margin-top: 16px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #bababa;

  @media screen and (max-width: 1279px) {
    line-height: 19px;
    margin-top: 10px;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const Price = styled.div`
  line-height: 36px;
  margin-top: 40px;
  font-size: 30px;
  color: #3f3a3a;
  padding-bottom: 20px;
  border-bottom: 1px solid #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    margin-top: 20px;
    font-size: 20px;
    padding-bottom: 10px;
  }
`;

const Detail = styled.div`
  line-height: 30px;
  font-size: 20px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    font-size: 14px;
  }
`;

const Note = styled(Detail)`
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 28px;
  }
`;

const Texture = styled(Detail)`
  margin-top: 30px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const Description = styled(Detail)`
  white-space: pre;
`;

const Place = styled(Detail)`
  ${Description} + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 24px;
    }
  }
`;

const Story = styled.div`
  margin: 50px 0 0;
  width: 100%;

  @media screen and (max-width: 1279px) {
    margin: 28px 24px 0;
  }
`;

const StoryTitle = styled.div`
  line-height: 30px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #99262a;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 3.2px;
  }

  &::after {
    content: "";
    height: 1px;
    flex-grow: 1;
    background-color: #3f3a3a;
    margin-left: 64px;

    @media screen and (max-width: 1279px) {
      margin-left: 35px;
    }
  }
`;

const StoryContent = styled.div`
  line-height: 30px;
  margin-top: 28px;
  font-size: 20px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 25px;
    margin-top: 12px;
    font-size: 14px;
  }
`;

const Images = styled.div`
  margin: 30px 0 0;

  @media screen and (max-width: 1279px) {
    margin: 20px 24px 0;
    width: 100%;
  }
`;

const Image = styled.img`
  @media screen and (max-width: 1279px) {
    width: 100%;
  }

  & + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;

const ShowImage = styled.div`
  width: 460px;
  height: 560px;
  border: 1px solid white;
  position: absolute;
  top: 205px;
  right: 0;
  @media screen and (max-width: 1279px) {
    width: 0;
  }
`;

function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [mouseIn, setMouseIn] = useState(false);
  const [scale, setScale] = useState(250);

  useEffect(() => {
    async function getProduct() {
      const { data } = await api.getProduct(id);
      setProduct(data);
    }
    getProduct();
  }, [id]);

  // const src = product.main_image;
  const [zoomIn, setZoomIn] = useState({
    // backgroundImage: `url(${src})`,
    backgroundPosition: "0% 0%",
  });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomIn({
      backgroundPosition: `${x}% ${y}%`,
    });
  };
  const mouseInEvent = () => {
    setMouseIn(true);
  };
  const mouseOutEvent = () => {
    setMouseIn(false);
  };
  const scaleHandler = () => {
    setScale((pre) => {
      if (pre === 250) return 500;
      if (pre === 500) return 750;
      return 250;
    });
  };

  if (!product) return null;

  return (
    <Wrapper>
      <MainImage
        src={product.main_image}
        onMouseMove={handleMouseMove}
        onMouseEnter={mouseInEvent}
        onMouseLeave={mouseOutEvent}
        onClick={scaleHandler}
      />
      {mouseIn && (
        <ShowImage
          style={{
            ...zoomIn,
            backgroundImage: `url(` + `${product.main_image}`,
            backgroundSize: `${scale}% ${scale}%`,
          }}
        />
      )}
      <Details>
        <Title>{product.title}</Title>
        <ID>{product.id}</ID>
        <Price>TWD.{product.price}</Price>
        <ProductVariants product={product} />
        <Note>{product.note}</Note>
        <Texture>{product.texture}</Texture>
        <Description>{product.description}</Description>
        <Place>???????????? / {product.place}</Place>
        <Place>???????????? / {product.place}</Place>
      </Details>
      <Story>
        <StoryTitle>????????????</StoryTitle>
        <StoryContent>{product.story}</StoryContent>
      </Story>
      <Images>
        {product.images.map((image, index) => (
          <Image src={image} key={index} />
        ))}
      </Images>
    </Wrapper>
  );
}

export default Product;
