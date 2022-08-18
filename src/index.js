import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import ThankYou from "./pages/ThankYou/ThankYou";
import Product from "./pages/Product/Product";
import SignIn from "./pages/Profile/SignIn";
import SignUp from "./pages/Profile/SignUp";
import User from "./pages/User/User";
import Upload from "./pages/User/Upload";
import Streamer from "./pages/Livestream/Streamer";
// import LiveStream from "./pages/Livestream/client/LiveStream";
import Test from "./pages/Livestream/Test";
import Loading from "./components/Love/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
        <Route path="profile/signin" element={<SignIn />} />
        <Route path="profile/signup" element={<SignUp />} />
        <Route path="user" element={<User />} />
        <Route path="user/upload" element={<Upload />} />
        <Route path="streamer" element={<Streamer />} />
        <Route path="liveStream" element={<div />} />
        <Route path="loading" element={<Loading />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
