


import { useAuth } from "../../contexts/auth.context";
import { useHttp } from "../../contexts/http.context";
import { useEffect, useState } from "react";
import logocoeur from "../../assets/logocoeur.svg";

function Dashboard() {

  const auth = useAuth()
  const http = useHttp();

  const nursery = auth.profil.nursery;

  const [bookingList, setBookingList] = useState([]);


  const handleSubmit = (e, bookingId) => {
    http.put(`booking/${bookingId}/${nursery.id}`, {
      bookingId: bookingId,
      statut: e.target.name
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log("Mise à jour réussie.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    http.get(`booking/nursery/${nursery.id}`)
      .then((resp) => {
        if (resp.status === 200) {
          setBookingList(resp.data);
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header-container">
        <div className="logopro">
          <img className="logocoeur" src={logocoeur} alt="logo du site" /> <p className="pro">pro</p>
        </div>
        <h2 className="dashboard-title">Mon tableau de bord 👩🏻‍💻</h2></div>
      <div>
        <h3 className="welcome">
          Bonjour {nursery.name} 👋, <br />vous pouvez gérer vos réservations ici !</h3>
        {
          bookingList.map((booking, index) =>
          (
            <div className="resa-container" key={index}>
              <div className="info-head-container">
                <div className="parent-info">
                  <p className="parent-name">
                    {booking.parent_firstname} {booking.parent_lastname} <br />{booking.parent_phone}
                  </p>
                </div>
                <div className="child-info">
                  <p> Vous accueillez : <br />
                    {booking.children_firstname}
                    {booking.children_is_walking ? ' qui sait marcher.' : ' qui ne sait pas encore marcher'}</p>
                </div>
                <div className="dashboard-button">
                  <button className="accept" name="Acceptée" onClick={(e) => handleSubmit(e, booking.booking_id)}>
                    Accepter
                  </button>
                  <button className="reject" name="Rejetée" onClick={(e) => handleSubmit(e, booking.booking_id)}>
                    Refuser
                  </button>
                </div>

              </div>
              <div className="dashboard-date">
                <p>Date d'arrivée : <br />{booking.start_date}</p>
                <p> Date de départ : <br />{booking.end_date}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default Dashboard;
