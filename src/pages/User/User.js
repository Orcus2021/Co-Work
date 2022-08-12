import { useEffect, useState, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;
const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 2px solid #979797;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  padding-bottom: 16px;
  font-size: 24px;
  font-weight: bold;
  padding-left: 11%;
`;
const LogOutBtn = styled.button`
  background-color: #fff;
  border: 0px;
  padding: 10px 20px;
  font-size: 17px;
  line-height: 1.24;
  cursor: pointer;
  margin-right: 5%;
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
  border: 2px solid #979797;
  border-radius: 30px;
  width: 30%;
  height: 500px;
  margin-right: 20px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;
const RightWrapper = styled.div`
  border: 2px solid #979797;
  border-radius: 30px;
  width: 70%;
  height: 500px;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
const UserProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserProfileImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 999em;
  background-color: #eeede7;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const UserProfileMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const MenuLabel = styled.button`
  border: 0px;
  background-color: white;
  line-height: 26px;
  font-size: 20px;
  cursor: pointer;
  padding: 20px 0 20px 0;
  @media screen and (max-width: 1279px) {
    font-size: 16px;
  }
  &:hover {
    background-color: #eeede7;
    color: #fff;
  }
`;
const UserProfileContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubTitle = styled.div`
  margin-top: 40px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
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

function User() {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>會員頁面</Title>
        <LogOutBtn>Log out</LogOutBtn>
      </TitleWrapper>
      <UserWrapper>
        <LeftWrapper>
          <UserProfileImgWrapper>
            <UserProfileImg />
          </UserProfileImgWrapper>
          <UserProfileMenu>
            <MenuLabel>基本資料</MenuLabel>
            <MenuLabel>商品直播頁</MenuLabel>
            <MenuLabel>商品管理系統</MenuLabel>
          </UserProfileMenu>
        </LeftWrapper>
        <RightWrapper>
          <UserProfileContent>
            <SubTitle>基本資料</SubTitle>
            <Form>
              <InputGroup>
                <InputLabel>姓名</InputLabel>
                <InputControl />
                <InputLabel>信箱</InputLabel>
                <InputControl />
                <InputLabel>密碼</InputLabel>
                <InputControl />
              </InputGroup>
            </Form>
            <SubTitle>訂單管理</SubTitle>
            <SubTitle>優惠券</SubTitle>
            <SubTitle>邀請碼生成</SubTitle>
          </UserProfileContent>
        </RightWrapper>
      </UserWrapper>
    </Wrapper>
  );
}

export default User;
