import React, { useState } from "react";

const Test = () => {
  const [num, setNum] = useState<number>(0);
  const strHandler = () => {
    setNum((pre: number) => pre + 1);
  };
  return (
    <div>
      <p onClick={strHandler}>{num}</p>
    </div>
  );
};

export default Test;
