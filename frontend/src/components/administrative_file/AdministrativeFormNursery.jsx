import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";

function AdministrativeFormNursery() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    pictureUrl: "",
    description: "",
    developmentalActivities: false,
    musicalActivities: false,
    outdoorSpace: false,
    homemadeMeals: false,
    capacity: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked || value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/nursery`, {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        pictureUrl: formData.pictureUrl,
        description: formData.description,
        developmentalActivities: formData.developmentalActivities,
        musicalActivities: formData.musicalActivities,
        outdoorSpace: formData.outdoorSpace,
        homemadeMeals: formData.homemadeMeals,
        capacity: formData.capacity,
        timeSlot: formData.timeSlot,
      })
      .then((resp) => {
        if (resp.status === 201) {
          console.info(resp);
          navigate("/register/confirmationfile/true");
        } else {
          alert("Une erreur est survenue, veuillez réessayer");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="registerContainer">
      <img className="imgRegister" src={imgregister} alt="inscription" />
      <div className="registerForm">
        <div className="logoForm">
          <img id="logoFormCoeur" src={logocoeur} alt="coeur du site" />
          <img id="logoFormTxt" src={logobaby} alt="texte du site" />
        </div>
        <h2 className="titleFormRegister">Je renseigne ma crèche</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom de la crèche :<br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-file-secu"
              required
            />
          </label>
          <label>
            Adresse :<br />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-file-secu"
              required
            />
          </label>
          <label>
            Numéro de téléphone : <br />
            <input
              name="phone"
              className="input-file-secu"
              type="text"
              onChange={handleChange}
              value={formData.phone}
              required
            />
          </label>
          <label>
            Photo de la crèche : <br />
            <input
              name="pictureUrl"
              className="input-file"
              type="file"
              value={formData.pictureUrl}
              onChange={handleChange}
              // required
            />
          </label>
          <label>
            Une petite description ? <br />
            <input
              name="description"
              className="input-file-description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Quel est votre capacité d'accueil :<br />
            <input
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="input-file-secu"
              type="number"
              required
            />
          </label>
          <label>
            Quels sont vos horaires ?<br />
            <input
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="input-file-secu"
              type="text"
              // required
            />
          </label>

          <p>Quels services proposez-vous ?</p>
          <label>
            Activités de développement ? <br />
            <input
              name="developmentalActivities"
              value={formData.developmentalActivities}
              onChange={handleChange}
              className="input-checkbox"
              type="checkbox"
            />
          </label>
          <label>
            Eveil musical ? <br />
            <input
              name="musicalActivities"
              value={formData.musicalActivities}
              onChange={handleChange}
              className="input-checkbox"
              type="checkbox"
            />
          </label>
          <label>
            Espace extérieur ? <br />
            <input
              name="outdoorSpace"
              value={formData.outdoorSpace}
              onChange={handleChange}
              className="input-checkbox"
              type="checkbox"
            />
          </label>
          <label>
            Repas fait maison ? <br />
            <input
              name="homemadeMeals"
              value={formData.homemadeMeals}
              onChange={handleChange}
              className="input-checkbox"
              type="checkbox"
            />
          </label>

          <p className="confirm-file">
            Tout est bien complet? Alors vous pouvez:
          </p>
          <button className="formBtnRegister" type="submit">
            Déposer ma crèche
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdministrativeFormNursery;
