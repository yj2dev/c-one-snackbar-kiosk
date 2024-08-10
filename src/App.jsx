import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/index.jsx";
import OrderPage from "./pages/OrderPage/index.jsx";
import LockerKeyPage from "./pages/LockerKeyPage/index.jsx";
// import AdminLandingPage from "./pages/AdminLandingPage/index.jsx";
// import OrderListPage from "./pages/AdminOrderListPage/index.jsx";
// import QROrderPage from "./pages/QROrderPage/index.jsx";
// import MenuEditPage from "./pages/AdminMenuEditPage/index.jsx";
// import QRLockerKeyPage from "./pages/QRLockerKeyPage/index.jsx";

// const LandingPage = lazy(() => import("./pages/LandingPage/index.jsx"));
// const OrderPage = lazy(() => import("./pages/OrderPage/index.jsx"));
// const LockerKeyPage = lazy(() => import("./pages/LockerKeyPage/index.jsx"));
const AdminLandingPage = lazy(
  () => import("./pages/AdminLandingPage/index.jsx"),
);
const OrderListPage = lazy(
  () => import("./pages/AdminOrderListPage/index.jsx"),
);
const QROrderPage = lazy(() => import("./pages/QROrderPage/index.jsx"));
const MenuEditPage = lazy(() => import("./pages/AdminMenuEditPage/index.jsx"));
const QRLockerKeyPage = lazy(() => import("./pages/QRLockerKeyPage/index.jsx"));

import {
  createQRToken,
  getExpireQrToken,
  isCreateQrToken,
} from "./network/request/supabase.js";

import QRNotFoundPopup from "./components/QRNotFoundPopup/index.jsx";
import { notFoundPopupState } from "./recoil/atoms/notFoundPopupState.js";
import { modeState } from "./recoil/atoms/modeState.js";
import usePreloadImages from "./hooks/usePreloadImages/index.jsx";
import AdminStockPage from "./pages/AdminStockPage/index.jsx";

function App() {
  usePreloadImages();

  const setMode = useSetRecoilState(modeState);

  const notFoundShow = useRecoilValue(notFoundPopupState);

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
      url = `${baseUrl}/qro/${curToken}`;
    } else {
      url = `http://localhost:5173/qro/${curToken}`;
    }

    console.log(url);

    if (curToken) {
      setMode((prev) => ({ ...prev, qrUrl: url, token: [...token] }));
    }
  };

  useEffect(() => {
    generateQrCode();

    const genQrId = setInterval(generateQrCode, 3000);

    return () => clearInterval(genQrId);
  }, []);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            씨원리조트
          </div>
        }
      >
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
          <Route path="/admin/stock" element={<AdminStockPage />} />
        </Routes>
        <QRNotFoundPopup show={notFoundShow} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
