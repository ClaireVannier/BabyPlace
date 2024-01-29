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
import { HttpProvider } from "./contexts/http.context";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoutes from "./utils/private-routes";
import 'react-toastify/dist/ReactToastify.css';
import Setting from "./components/profil/setting/Setting";

function App() {
  return (
    <div>
      <HttpProvider>
        <AuthProvider>
          <NurseryProvider>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              <Route element={<PrivateRoutes />}>

                <Route path="/register/parent" element={<RegisterParent />} />
                <Route path="/register/parent/file/:parentId" element={<AdministrativeParent />} />

                <Route path="/register/nursery" element={<RegisterNursery />} />
                <Route path="/profil" element={<Profil />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<NurseryList />} />
                <Route path="/setting" element={<Setting />} />

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

              </Route>
              
            </Routes>

          </NurseryProvider>
        </AuthProvider>
      </HttpProvider>


    </div>
  );
}

export default App;
