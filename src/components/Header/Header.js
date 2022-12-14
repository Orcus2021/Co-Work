import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";

import logo from "./logo.png";
import search from "./search.png";
import cart from "./cart.png";
import cartMobile from "./cart-mobile.png";
import profile from "./profile.png";
import profileMobile from "./profile-mobile.png";
import CartContext from "../../contexts/CartContext";
import "./Header.css";

const Wrapper = styled.div`
  position: fixed;
  height: 100px;
  width: 100%;
  padding: 0 54px 0 60px;
  background-color: #f6dbdb;
  ${"" /* border-bottom: 40px solid #f6dbdb; */}
  z-index: 99;
  display: flex;
  align-items: center;
  font-family: PingFangTC;

  @media screen and (max-width: 1279px) {
    height: 52px;
    padding: 0;
    border: none;
    justify-content: center;
  }
`;

const Logo = styled(Link)`
  width: 258px;
  height: 48px;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;

  @media screen and (max-width: 1279px) {
    width: 129px;
    height: 24px;
  }
`;

const CategoryLinks = styled.div`
  margin: 16px 0 0 57px;

  @media screen and (max-width: 1279px) {
    margin: 0;
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    background-color: #f6dbdb;
  }
`;

const CategoryLink = styled(Link)`
  font-size: 20px;
  letter-spacing: 20px;
  padding-left: 25px;
  padding-right: 3px;
  position: relative;
  text-decoration: none;
  color: ${(props) => (props.$isActive ? "#8b572a" : "#99262a")};

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: normal;
    padding: 0;
    text-align: center;
    color: ${(props) => (props.$isActive ? "white" : "#99262a")};
    line-height: 50px;
    flex-grow: 1;
  }

  &:hover {
    color: white;

    @media screen and (max-width: 1279px) {
      color: white;
    }
  }

  & + &::before {
    content: "|";
    position: absolute;
    left: 0;
    color: #3f3a3a;

    @media screen and (max-width: 1279px) {
      color: #828282;
    }
  }
`;

const SearchInput = styled.input`
  background-color: #f6dbdb;
  height: 40px;
  width: 214px;
  border: none;
  outline: none;
  margin-left: auto;
  border-radius: 20px;
  padding: 6px 45px 6px 20px;
  border: solid 1px #979797;
  background-image: url(${search});
  background-size: 44px;
  background-position: 160px center;
  background-repeat: no-repeat;
  font-size: 20px;
  line-height: 24px;
  color: #8b572a;

  @media screen and (max-width: 1279px) {
    width: 0;
    border: none;
    position: fixed;
    right: 16px;
    background-size: 32px;
    background-position: right center;
  }

  &:focus {
    @media screen and (max-width: 1279px) {
      width: calc(100% - 20px);
      border: solid 1px #979797;
    }
  }
`;

const PageLinks = styled.div`
  margin-left: 42px;
  display: flex;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-left: 0;
    height: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #f6dbdb;
  }
`;

const PageLink = styled(Link)`
  @media screen and (max-width: 1279px) {
    width: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & + & {
    margin-left: 42px;

    @media screen and (max-width: 1279px) {
      margin-left: 0;
    }
  }

  & + &::before {
    @media screen and (max-width: 1279px) {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 24px;
      margin: 10px 51px 10px 0;
      background-color: #828282;
    }
  }
`;

const PageLinkIcon = styled.div`
  width: 44px;
  height: 44px;
  cursor: pointer;
  background-size: contain;
  position: relative;
`;

const PageLinkCartIcon = styled(PageLinkIcon)`
  background-image: url(${cart});

  @media screen and (max-width: 1279px) {
    background-image: url(${cartMobile});
  }
`;

const PageLinkProfileIcon = styled(PageLinkIcon)`
  background-image: url(${profile});

  @media screen and (max-width: 1279px) {
    background-image: url(${profileMobile});
  }
`;

const PageLinkIconNumber = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background-color: #8b572a;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
`;

const PageLinkText = styled.div`
  display: none;

  @media screen and (max-width: 1279px) {
    display: block;
    color: white;
  }
`;

const categories = [
  {
    name: "women",
    displayText: "??????",
  },
  {
    name: "men",
    displayText: "??????",
  },
  {
    name: "accessories",
    displayText: "??????",
  },
];

function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userCtx = useContext(UserContext);
  const category = searchParams.get("category");
  const { getItems } = useContext(CartContext);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (category) setInputValue("");
  }, [category]);

  const profileHandler = () => {
    if (userCtx.user?.accessToken) {
      navigate("/user");
    } else {
      navigate("/profile/signin");
    }
  };

  return (
    <nav className={show ? "active" : "hidden"}>
      <Wrapper>
        <Logo to="/" />
        <CategoryLinks>
          {categories.map(({ name, displayText }, index) => (
            <CategoryLink
              to={`/?category=${name}`}
              $isActive={category === name}
              key={index}
            >
              {displayText}
            </CategoryLink>
          ))}
          <CategoryLink key="liveStream" to={"liveStream"}>
            ??????
          </CategoryLink>
        </CategoryLinks>
        <SearchInput
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              navigate(`/?keyword=${inputValue}`);
            }
          }}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <PageLinks>
          <PageLink to="/checkout">
            <PageLinkCartIcon icon={cart}>
              <PageLinkIconNumber>{getItems().length}</PageLinkIconNumber>
            </PageLinkCartIcon>
            <PageLinkText>?????????</PageLinkText>
          </PageLink>
          <PageLink as="div" onClick={profileHandler}>
            <PageLinkProfileIcon icon={profile} />
            <PageLinkText>??????</PageLinkText>
          </PageLink>
        </PageLinks>
      </Wrapper>
    </nav>
  );
}

export default Header;
