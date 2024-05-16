import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage/index.jsx";
import LockerKeyPage from "./pages/LockerKeyPage/index.jsx";
import React from "react";
import MenuEditPage from "./pages/MenuEditPage/index.jsx";
import AdminLandingPage from "./pages/AdminLandingPage/index.jsx";
import orderListPage from "./pages/OrderListPage/index.jsx";
import OrderPage from "./pages/OrderPage/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(LandingPage),
  },
  {
    path: "/locker",
    element: React.createElement(LockerKeyPage),
  },
  {
    path: "/order",
    element: React.createElement(OrderPage),
  },
  {
    path: "/admin",
    element: React.createElement(AdminLandingPage),
  },
  {
    path: "/admin/order",
    element: React.createElement(orderListPage),
  },
  {
    path: "/admin/menu-edit",
    element: React.createElement(MenuEditPage),
  },
]);

export default router;
