import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home";
import Login from "./components/login/Login";
import RegisterParent from "./components/register/RegisterParent";
import RegisterPro from "./components/register/RegisterPro";
import Profil from "./components/profil/Profil";
import NurseryList from "./components/search/NurseryList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterParent />} />
        <Route path="/register/pro" element={<RegisterPro />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/search" element={<NurseryList />} />
      </Routes>
    </div>
  );
}

export default App;
