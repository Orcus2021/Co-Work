import React from "react";
import styled from "styled-components";
import "./loading.css";

const Title = styled.div`
  color: #99262a;
  text-align: center;
  margin-top: 60vh;
  font-size: 1.6rem;
`;

const Loading = ({ word }) => {
  return (
    <>
      <div className="back">
        <Title>{word}</Title>
      </div>
      <div className="heart"></div>
    </>
  );
};

export default Loading;
