import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logocoeur from "../../assets/logocoeur.svg";
import { useAuth } from "../../contexts/auth.context";
import axios from "axios";

function Booking() {
  const { id } = useParams();
  const auth = useAuth();
  const children = auth.profil.children[0];

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    childrenId: children.id,
    nurseryId: parseInt(id, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("formData", formData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/booking`, formData)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 201) {

          alert("Votre réservation à bien été effectuée")
        }
      })
      .catch((err) => {
        console.error(err)
      });
  };

  // je vérifie que je recupere bien la valeur des deux input
  // useEffect(() => {
  //   console.log(formData)
  // },
  //   [formData.startDate, formData.endDate])


  return (
    <div className="reservation-container">
      <div className="header-reservation-container">
        <img src={logocoeur} alt="logo du coeur" className="logo-resa-coeur" />
        <h2 className="title-resa">Réserver une place</h2>
      </div>
      <div className="info-reservation-container">
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Je réserve du: <br />
              <input
                type="datetime-local"
                name="startDate"
                onChange={handleChange}
              />
            </label>
            <label>
              {" "}
              <br />
              au: <br />
              <input
                type="datetime-local"
                name="endDate"
                onChange={handleChange}
              />
            </label>
            <p className="children-resa">Pour mon enfant : {children.firstname}</p>
            <button
              type="submit"
              className="button-reservation">
              Réserver
            </button>
          </form >
        </div>
      </div>
    </div >
  );

}

export default Booking;
