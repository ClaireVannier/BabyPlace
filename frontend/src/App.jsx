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
import AdministrativeParent from "./components/administrative_file/AdministrativeParent";
import NurseryPage from "./components/search/nursery_details /NurseryPage";
import Reservation from "./components/reservations/Reservations";
import AdministrativeChildren from "./components/administrative_file/AdministrativeChildren";
import AdministrativeFormNursery from "./components/administrative_file/AdministrativeFormNursery";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterParent />} />
        <Route path="/register/file" element={<AdministrativeParent />} />

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
          path="/register/confirmationfile/:isNursery"
          element={<ConfirmationFile />}
        />
        <Route path="search/nurserydetails/:id" element={<NurseryPage />} />
        <Route path="nursery/reservation/:id" element={<Reservation />} />
        <Route path="/register/children" element={<AdministrativeChildren />} />
        <Route
          path="/register/pro/file"
          element={<AdministrativeFormNursery />}
        />
      </Routes>
    </div>
  );
}

export default App;
