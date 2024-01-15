import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home/Home";
import Login from "./components/login/Login";
import RegisterParent from "./components/register/RegisterParent";
import RegisterPro from "./components/register/RegisterPro";
import Profil from "./components/profil/Profil";
import NurseryList from "./components/search/NurseryList";
import ConfirmationAccount from "./components/confirmations/ConfirmationAccount";
import ConfirmationReservation from "./components/confirmations/ConfirmationReservation";
import ConfirmationFile from "./components/confirmations/ConfirmationFile";
import RegisterForm from "./components/administrative_file/AdministrativeForm";

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
        <Route
          path="/register/accountcreated"
          element={<ConfirmationAccount />}
        />
        <Route
          path="/reservation/confirmation"
          element={<ConfirmationReservation />}
        />
        <Route
          path="/register/confirmationfile"
          element={<ConfirmationFile />}
        />
        <Route path="/register/file" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
