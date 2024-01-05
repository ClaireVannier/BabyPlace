import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home";
import Login from "./components/login/Login";
import RegisterParent from "./components/register/RegisterParent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterParent />} />
      </Routes>
    </div>
  );
}

export default App;
