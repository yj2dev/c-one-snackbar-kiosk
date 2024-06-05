import "./App.css";
import { useSetRecoilState } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage/index.jsx";
import OrderPage from "./pages/OrderPage/index.jsx";
import LockerKeyPage from "./pages/LockerKeyPage/index.jsx";
import AdminLandingPage from "./pages/AdminLandingPage/index.jsx";
import OrderListPage from "./pages/AdminOrderListPage/index.jsx";
import QROrderPage from "./pages/QROrderPage/index.jsx";
import MenuEditPage from "./pages/AdminMenuEditPage/index.jsx";
import { useQuery } from "react-query";
import {
  createQRToken,
  getProduct,
  isInitQRToken,
} from "./network/request/supabase.js";
import { useEffect } from "react";
import { modeState } from "./recoil/atoms/modeState.js";

function App() {
  const { data } = useQuery("products", getProduct);
  const setMode = useSetRecoilState(modeState);

  const preLoadImg = () => {
    data?.map((item) => {
      item.product.map((v) => {
        const img = new Image();
        img.src = `${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`;
      });
    });
  };

  const generateQrCode = async () => {
    const { isToken, token } = await isInitQRToken();

    console.log(isToken, token);

    if (isToken) return;

    const createToken = token === "" ? await createQRToken() : token;
    let url = null;

    if (import.meta.env.MODE === "production") {
      const baseUrl = import.meta.env.VITE_QR_BASE_URL;
      url = `${baseUrl}/${createToken}/qro`;
    } else {
      url = `http://localhost:5173/${createToken}/qro`;
    }

    if (createToken) {
      setMode((prev) => ({ ...prev, qrUrl: url, token }));
    }
  };

  useEffect(() => {
    preLoadImg();
    generateQrCode();

    const genQrId = setInterval(generateQrCode, 1000);

    // const genQrId = setInterval(generateQrCode, 15000);

    return () => clearInterval(genQrId);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/locker" element={<LockerKeyPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/:token/qro" element={<QROrderPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin/order" element={<OrderListPage />} />
        <Route path="/admin/menu" element={<MenuEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
