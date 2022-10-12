import styled from "styled-components";
import "./loading.css";

const Title = styled.div`
  color: #99262a;
  text-align: center;
  margin-top: 60vh;
  font-size: 1.6rem;
`;

const Loading = ({ word, isMode }) => {
  let backClass = "back";
  let heartClass = "heart ";
  if (isMode === "hide") {
    backClass = "back  hideLove";
    heartClass = "heart hideLove";
  }

  return (
    <>
      <div className={backClass}>
        <Title>{word}</Title>
      </div>
      <div className={heartClass}></div>
    </>
  );
};

export default Loading;
