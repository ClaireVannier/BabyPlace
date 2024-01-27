import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/landing-page/Home/Home";
import Login from "./components/login/Login";
import RegisterParent from "./components/register/RegisterParent";
import RegisterNursery from "./components/register/RegisterNursery";
import Profil from "./components/profil/Profil";
import NurseryList from "./components/search/NurseryList";
import ConfirmationBooking from "./components/confirmations/ConfirmationBooking";
import ConfirmationFile from "./components/confirmations/ConfirmationFile";
import AdministrativeParent from "./components/administrative_file/AdministrativeParent";
import NurseryPage from "./components/search/nursery_details /NurseryPage";
import Booking from "./components/booking/Booking";
import AdministrativeChildren from "./components/administrative_file/AdministrativeChildren";
import AdministrativeNursery from "./components/administrative_file/AdministrativeNursery";
import { NurseryProvider } from "./contexts/nursery.context";
import { AuthProvider } from "./contexts/auth.context";

function App() {
  return (
    <div>
      <AuthProvider>
        <NurseryProvider>
         

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register/parent" element={<RegisterParent />} />
              <Route path="/register/parent/file/:parentId" element={<AdministrativeParent />} />

              <Route path="/register/nursery" element={<RegisterNursery />} />
              <Route path="/profil" element={<Profil />} />


              <Route path="/search" element={<NurseryList />} />

              <Route
                path="/booking/confirmation"
                element={<ConfirmationBooking />}
              />

              <Route
                path="/register/confirmationfile/:isNursery"
                element={<ConfirmationFile />}
              />


              <Route path="search/nursery-details/:id" element={<NurseryPage />} />

              <Route path="nursery/booking/:id" element={<Booking />} />
              <Route path="/register/children/:parentId" element={<AdministrativeChildren />} />
              <Route
                path="/register/nursery/file/:userId"
                element={<AdministrativeNursery />}
              />
            </Routes>

            
        </NurseryProvider>
      </AuthProvider>


    </div>
  );
}

export default App;
