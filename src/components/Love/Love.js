import React from "react";
import styled from "styled-components";
import loveIcon from "../../assets/love.png";

const LoveBx = styled.div`
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  position: absolute;
`;
const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const ImgLove = styled(Img)`
  animation: move1 1.5s linear infinite;
  @keyframes move1 {
    0% {
      transform: translate(0) rotate(0deg);
      opacity: 1;
    }
    10% {
      transform: translate(5px, -20px) rotate(90deg);
    }
    50% {
      transform: translate(-15px, -60px) rotate(200deg);
    }
    70% {
      transform: translate(-10px, -80px) rotate(300deg);
    }
    100% {
      transform: translate(-20px, -140px) rotate(400deg);
      opacity: 0;
    }
  }
`;
const ImgLove1 = styled(Img)`
  animation: move2 1.5s linear infinite;
  @keyframes move2 {
    0% {
      transform: translate(0) rotate(0deg) scale(0.7);
      opacity: 1;
    }
    20% {
      transform: translate(-40px, -20px) rotate(50deg) scale(0.7);
    }
    60% {
      transform: translate(-20px, -60px) rotate(200deg) scale(0.7);
    }
    80% {
      transform: translate(-66px, -80px) rotate(400deg) scale(0.7);
    }
    100% {
      transform: translate(-55px, -90px) rotate(500deg) scale(0.7);
      opacity: 0;
    }
  }
`;
const ImgLove2 = styled(Img)`
  animation: move3 1.5s linear infinite;
  @keyframes move3 {
    0% {
      transform: translate(0) rotate(0deg) scale(0.7);
      opacity: 1;
    }
    30% {
      transform: translate(30px, -20px) rotate(150deg) scale(0.8);
    }
    50% {
      transform: translate(45px, -60px) rotate(350deg) scale(0.8);
    }
    70% {
      transform: translate(36px, -80px) rotate(600deg) scale(0.8);
    }
    100% {
      transform: translate(60px, -120px) rotate(650deg) scale(0.7);
      opacity: 0;
    }
  }
`;
const ImgLove3 = styled(Img)`
  animation: move4 1.5s linear infinite;
  @keyframes move4 {
    0% {
      transform: translate(0) rotate(0deg) scale(0.8);
      opacity: 1;
    }
    15% {
      transform: translate(20px, -20px) rotate(100deg) scale(0.9);
    }
    30% {
      transform: translate(15px, -30px) rotate(146deg) scale(0.9);
    }
    65% {
      transform: translate(33px, -75px) rotate(234deg) scale(0.9);
    }
    77% {
      transform: translate(14px, -90px) rotate(445deg) scale(0.8);
    }
    90% {
      transform: translate(13px, -120px) rotate(550deg) scale(0.8);
    }
    100% {
      transform: translate(9px, -155px) rotate(555deg) scale(0.8);
      opacity: 0;
    }
  }
`;
const LoveAnimation = () => {
  return (
    <LoveBx>
      <ImgLove src={loveIcon} />
      <ImgLove1 src={loveIcon} />
      <ImgLove2 src={loveIcon} />
      <ImgLove3 src={loveIcon} />
    </LoveBx>
  );
};

export default LoveAnimation;
