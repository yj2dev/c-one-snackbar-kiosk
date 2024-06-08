import "./App.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  getExpireQrToken,
  isCreateQrToken,
} from "./network/request/supabase.js";
import { useEffect } from "react";

import QRNotFoundPopup from "./components/QRNotFoundPopup/index.jsx";
import { notFoundPopupState } from "./recoil/atoms/notFoundPopupState.js";
import { modeState } from "./recoil/atoms/modeState.js";
import QRLockerKeyPage from "./pages/QRLockerKeyPage/index.jsx";

function App() {
  const { data } = useQuery("products", getProduct);
  const setMode = useSetRecoilState(modeState);

  const notFoundShow = useRecoilValue(notFoundPopupState);

  const preLoadImg = () => {
    data?.map((item) => {
      item.product.map((v) => {
        const img = new Image();
        img.src = `${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`;
      });
    });
  };

  const generateQrCode = async () => {
    const { data, token, curDate } = await getExpireQrToken();

    const isCreate = isCreateQrToken(data, curDate);

    let curToken = null;
    if (isCreate) {
      curToken = await createQRToken();
    } else {
      curToken = token[0];
    }

    let url = null;

    if (import.meta.env.MODE === "production") {
      const baseUrl = import.meta.env.VITE_QR_BASE_URL;
      url = `${baseUrl}/${curToken}/qro`;
    } else {
      url = `http://localhost:5173/qro/${curToken}`;
    }

    console.log(url);

    if (curToken) {
      setMode((prev) => ({ ...prev, qrUrl: url, token: [...token] }));
    }
  };

  useEffect(() => {
    preLoadImg();
    generateQrCode();

    const genQrId = setInterval(generateQrCode, 3000);

    return () => clearInterval(genQrId);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/locker" element={<LockerKeyPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/qro" element={<QROrderPage />} />
        <Route path="/qro/:token" element={<QROrderPage />} />
        <Route path="/qrl" element={<QRLockerKeyPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin/order" element={<OrderListPage />} />
        <Route path="/admin/menu" element={<MenuEditPage />} />
      </Routes>
      <QRNotFoundPopup show={notFoundShow} />
    </BrowserRouter>
  );
}

export default App;
