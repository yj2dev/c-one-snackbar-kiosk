import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage/index.jsx";
import OrderPage from "./pages/OrderPage/index.jsx";
import LockerKeyPage from "./pages/LockerKeyPage/index.jsx";
import AdminLandingPage from "./pages/AdminLandingPage/index.jsx";
import OrderListPage from "./pages/OrderListPage/index.jsx";
import MenuEditPage from "./pages/MenuEditPage/index.jsx";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/locker" element={<LockerKeyPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin" element={<AdminLandingPage />} />
          <Route path="/admin/order" element={<OrderListPage />} />
          <Route path="/admin/menu" element={<MenuEditPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
