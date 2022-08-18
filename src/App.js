import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import UserProvider from "./contexts/UserContext";
import SaleProvider from "./contexts/SaleProduct";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartContext from "./contexts/CartContext";
import LiveStream from "./pages/Livestream/client/LiveStream";
import PingFangTCRegular from "./fonts/PingFang-TC-Regular-2.otf";
import PingFangTCThin from "./fonts/PingFang-TC-Thin-2.otf";
import NotoSansTCRegular from "./fonts/NotoSansTC-Regular.otf";
import NotoSansTCBold from "./fonts/NotoSansTC-Bold.otf";
import loveIcon from "./assets/love.png";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url(${PingFangTCThin}) format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCRegular}) format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url(${NotoSansTCBold}) format('opentype');
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
        text-decoration: none;
  }

  body {
    font-family: NotoSansTC;
  }

  // .love {
  //   z-index:9999;
  //   position:absolute;
    
  //   pointer-events: none;
  //   filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
  //   animation: fadeInOut 1s linear infinite;
  // }
  
  // @keyframes fadeInOut {
  //   0%,
  //   100% {
  //     opacity: 0;
  //   }
  //   20%,
  //   80% {
  //     opacity: 1;
  //   }
  // }
  // .love::before {
  //   z-index:9999;
  //   content: "";
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   background: url(${loveIcon});
  //   background-size: cover;
  //   animation: moveShape 1s linear infinite;
  // }
  
  // @keyframes moveShape {
  //   0% {
  //     transform: translate(0) rotate(0deg);
  //   }
  //   100% {
  //     transform: translate(10px, 100px) rotate(360deg);
  //   }
  // }
  


  #root {
    min-height: 100vh;
    padding: 100px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(window.localStorage.getItem("cartItems")) || []
  );

  function getItems() {
    return cartItems;
  }

  function addItem(item) {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已加入商品");
  }

  function changeItemQuantity(itemIndex, itemQuantity) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            qty: itemQuantity,
          }
        : item
    );
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已修改數量");
  }

  function changeItemDiscount(itemIndex, itemDiscount) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            discount: itemDiscount.discount,
            coupon_id: itemDiscount.coupon_id,
          }
        : item
    );
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已折價");
  }

  function deleteItem(itemIndex) {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    window.alert("已刪除商品");
  }

  function clearItems() {
    const newCartItems = [];
    setCartItems(newCartItems);
    window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  const cart = {
    getItems,
    addItem,
    changeItemQuantity,
    deleteItem,
    clearItems,
    changeItemDiscount,
  };

  return (
    <CartContext.Provider value={cart}>
      <UserProvider>
        <SaleProvider>
          <Reset />
          <GlobalStyle />
          <Header />
          <LiveStream />
          <Outlet />
          <Footer />
        </SaleProvider>
      </UserProvider>
    </CartContext.Provider>
  );
}

export default App;
