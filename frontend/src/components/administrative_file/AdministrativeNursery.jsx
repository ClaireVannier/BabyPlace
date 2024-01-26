import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";
import  uploadFile from "../../utils/upload-file";

function AdministrativeNursery() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [filePictureUrl, setFilePictureUrl] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
    developmentalActivities: false,
    musicalActivities: false,
    outdoorSpace: false,
    homemadeMeals: false,
    capacity: "",
    timeSlot: "",
    userId: userId
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
      .post(`${import.meta.env.VITE_BACKEND_URL}/nursery`, formData)
      .then(async (resp) => {
        if (resp.status === 201) {
          const insertId = resp.data.insertId;
          await uploadFile("NurseryPicture", filePictureUrl, "upload-nursery-picture", insertId);
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
              className="input-file"
              type="file"
              name="pictureUrl"
              onChange={(e) => setFilePictureUrl(e.target.files[0])}
              required
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

export default AdministrativeNursery;
