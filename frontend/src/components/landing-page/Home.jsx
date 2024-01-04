import { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import mom2 from "../../assets/mom2.png";
import pro1 from "../../assets/pro1.svg";

function Home() {
  const [userType, setUserType] = useState("parent");
  return (
    <div>
      <NavBar userType={userType} setUserType={setUserType} />
      {userType === "parent" ? (
        <main className="home">
          <img src={mom2} alt="mère qui tient son enfant" className="imgHome" />
          <div className="titleHome">
            <h2>Simplifiez vous la vie avec BabyPlace.</h2>
            <p className="descriptionHome">
              Accédez aux disponibilités de crèche auprès de chez vous, réservez
              en ligne et retrouver votre historique de réservation !{" "}
            </p>
          </div>
        </main>
      ) : (
        <main className="home">
          <img src={pro1} alt="page d'acceuil" className="imgHome" />
          <div className="titleHome">
            <h2>Simplifiez votre agenda avec BabyPlace</h2>
            <p className="descriptionHome">
              Gérez vos réservations depuis votre tableau de bord et équipez
              vous du logiciel de gestion de place le plus simple !
            </p>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default Home;
