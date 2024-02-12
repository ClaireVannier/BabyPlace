


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
    const newStatut = e.target.name;

    http.put(`booking/${bookingId}/${nursery.id}`, {
      bookingId: bookingId,
      statut: newStatut
    })
      .then((resp) => {
        if (resp.status === 200) {
          console.log("Mise à jour réussie.");
          alert("Vous avez bien mis à jour la réservation !")
          setBookingList(prevBookingList =>
            prevBookingList.map(booking =>
              booking.booking_id === bookingId ? { ...booking, statut: newStatut } : booking
            )
          );
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

  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char, index) => { 
      return index === str.length - 1 ? char : char.toUpperCase();

    });
  };
  
  const StatutTitleCase = (statut) => {
    const newStatut = toTitleCase(statut);
    return newStatut;
  };
  

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
              <div className="statut"></div>
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
                  <button className="accept" name="ACCEPTÉE" onClick={(e) => handleSubmit(e, booking.booking_id)}>
                    Accepter
                  </button>
                  <button className="reject" name="REJETÉE" onClick={(e) => handleSubmit(e, booking.booking_id)}>
                    Refuser
                  </button>
                </div>

              </div>
              <div className="dashboard-date">
                <p>Date d'arrivée : <br /><span>{booking.start_date}</span></p>
                <p> Date de départ : <br /><span>{booking.end_date}</span></p>
                <div className="rod-statut">
                  <p className="actual-statut" style={{ backgroundColor: booking.statut === "ACCEPTÉE" ? '#22c55e' : booking.statut === "REJETÉE" ? 'red' : 'orange' }}>{StatutTitleCase(booking.statut)}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )

}

export default Dashboard;
