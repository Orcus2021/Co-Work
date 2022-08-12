import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Title = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #979797;
  font-size: 24px;
  font-weight: bold;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const InputLabel = styled.label`
  width: 110px;
  line-height: 19px;
  font-size: 16px;
  color: #3f3a3a;
  display: block;
  margin-bottom: 30px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const InputControl = styled.input`
  width: 250px;
  height: 30px;
  border-radius: 8px;
  border: solid 1px #979797;
  margin-bottom: 30px;
  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 400px;
  @media screen and (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
    margin-top: 20px;
    width: 100%;
  }
`;

const ToSignUp = styled.div`
  font-size: 17px;
  margin-bottom: 20px;
`;
const SignUpbtn = styled.button`
  background-color: #fff;
  border: 0px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
  }
`;

const SignInButton = styled.button`
  background-color: #fff;
  border: solid 2px #e6e6e6;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  margin-top: 24px;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
  }
`;

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async () => {
    const data = {
      provider: "native",
      email: email,
      password: password,
    };
    // console.log(data);
    signIn(data);
    setEmail("");
    setPassword("");
  };
  async function signIn(data) {
    const response = await fetch(`https://kelvin-wu.site/api/1.0/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
    });
    console.log(response);
    if (response.ok) {
      return await response.json();
    }
    throw new Error("error message");
  }

  return (
    <Wrapper>
      <Title>會員登入</Title>
      <form>
        <Form>
          <InputGroup>
            <InputLabel>信箱</InputLabel>
            <InputControl
              type="text"
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            <InputLabel>密碼</InputLabel>
            <InputControl
              type="password"
              name="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
            />
          </InputGroup>
        </Form>
      </form>
      <ToSignUp>
        尚未成為會員？
        <SignUpbtn onClick={() => navigate("/profile/signup")}>
          點我註冊
        </SignUpbtn>
      </ToSignUp>
      <SignInButton onClick={() => handleSubmit()}>登入</SignInButton>
    </Wrapper>
  );
}

export default SignIn;
