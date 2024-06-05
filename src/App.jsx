import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage/index.jsx";
import OrderPage from "./pages/OrderPage/index.jsx";
import LockerKeyPage from "./pages/LockerKeyPage/index.jsx";
import AdminLandingPage from "./pages/AdminLandingPage/index.jsx";
import OrderListPage from "./pages/AdminOrderListPage/index.jsx";
import QROrderPage from "./pages/QROrderPage/index.jsx";
import MenuEditPage from "./pages/AdminMenuEditPage/index.jsx";
import { useQuery } from "react-query";
import { getProduct } from "./network/request/supabase.js";
import { useEffect } from "react";

function App() {
  const { data } = useQuery("products", getProduct);

  const preLoadImg = () => {
    data?.map((item) => {
      item.product.map((v) => {
        const img = new Image();
        img.src = `${import.meta.env.VITE_STORAGE_BASE_URL}/${v.img}`;
      });
    });
  };

  useEffect(() => {
    preLoadImg();
  }, []);

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default App;
