import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

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

const ToSignIn = styled.div`
  font-size: 17px;
  margin-bottom: 20px;
`;
const SignInbtn = styled.button`
  background-color: #fff;
  border: 0px;
  border-radius: 30px;
  font-size: 17px;
  line-height: 1.24;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: #fff;
    transition: 1s;
  }
`;

const SignUpButton = styled.button`
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
    transition: 1s;
  }
`;

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const userCtx = useContext(UserContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "invitationCode") {
      setInvitationCode(value);
    }
  };
  const handleSubmit = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    if (email.length <= 0 || password.length <= 0 || name.length <= 0) {
      window.alert("資料請勿空白");
      return;
    }
    try {
      await signUp(data);
    } catch (error) {
      window.alert(`${error}`);
    }

    setName("");
    setEmail("");
    setPassword("");
  };
  async function signUp(data) {
    const response = await fetch(`https://kelvin-wu.site/api/1.0/user/signup`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
    });

    if (response.ok) {
      const resUser = await response.json();
      const userObj = {
        accessToken: resUser.data.access_token,
        accessExpired: resUser.data.access_expired,
        loginAt: resUser.data.login_at,
        id: resUser.data.user.id,
        provider: resUser.data.user.provider,
        email: resUser.data.user.email,
        picture: resUser.data.user.picture,
        name: resUser.data.user.name,
      };

      userCtx.addUser(userObj);
      navigate("/");
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  }

  return (
    <Wrapper>
      <Title>會員註冊</Title>
      <form>
        <Form>
          <InputGroup>
            <InputLabel>姓名</InputLabel>
            <InputControl
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleInputChange(e)}
            />
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
            <InputLabel>邀請碼</InputLabel>
            <InputControl
              type="text"
              name="invitationCode"
              value={invitationCode}
              onChange={(e) => handleInputChange(e)}
            />
          </InputGroup>
        </Form>
      </form>
      <ToSignIn>
        已有會員？
        <SignInbtn onClick={() => navigate("/profile/signin")}>
          返回登入頁
        </SignInbtn>
      </ToSignIn>
      <SignUpButton onClick={() => handleSubmit()}>註冊</SignUpButton>
    </Wrapper>
  );
}

export default SignUp;
