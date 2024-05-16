import { useState } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import LandingPage from "./pages/LandingPage/index.jsx";

function App() {
  return (
    <RecoilRoot>
      <LandingPage />
    </RecoilRoot>
  );
}

export default App;
