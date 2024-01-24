import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import logobaby from "../../assets/logobaby.svg";
import logocoeur from "../../assets/logocoeur.svg";
import imgregister from "../../assets/imgregister.svg";
import { useState } from "react";

function AdministrativeParent() {
  const navigate = useNavigate();
  const { parentId } = useParams();

  const [fileIncomeProof, setFileIncomeProof] = useState(null);
  const [fileVideoPermission, setFileVideoPermission] = useState(null);
  const [fileOutsidePermission, setFileOutsidePermission] = useState(null);
  const [socialSecurityNumber, setSocialSecurityNumber] = useState(null);

  const uploadFile = async (typeOfFile, file, endpoint, insertId) => {
    const formData = new FormData();
    formData.append(typeOfFile, file);

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/${endpoint}/${insertId}`,
      formData
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/administrative`, {
        socialSecurityNumber: socialSecurityNumber,
        parentId: parentId
      })
      .then(async (resp) => {
        if (resp.status === 201) {
          const insertId = resp.data.insertId;


          await uploadFile("incomeProofUrl", fileIncomeProof, "upload-income", insertId);
          await uploadFile("PhotoVideoPermission", fileOutsidePermission, "upload-photo", insertId);
          await uploadFile("OutsidePermission",fileVideoPermission, "upload-outside-permission",insertId);
        
          navigate(`/register/children/${parentId}`);

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

        <h2 className="titleFormRegister">
          Je remplis mon dossier d'inscription
        </h2>

        <form onSubmit={handleSubmit}>
          <label>
            N° Sécurité Sociale <br />
            <input
              className="input-file-secu"
              type="text"
              onChange={(e) => setSocialSecurityNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Justificatif de revenu (moins de 3 mois) <br />
            <input
              className="input-file"
              type="file"
              name="incomeProofUrl"
              onChange={(e) => setFileIncomeProof(e.target.files[0])}
              required
            />
          </label>
          <label>
            Autorisation de photo et vidéo <br />
            <input
              className="input-file"
              type="file"
              name="PhotoVideoPermission"
              onChange={(e) => setFileVideoPermission(e.target.files[0])}
              required
            />
          </label>
          <label>
            Autorisation de sortie <br />
            <input
              className="input-file"
              type="file"
              name="OutsidePermission"
              onChange={(e) => setFileOutsidePermission(e.target.files[0])}
              required
            />
          </label>
          <p className="confirm-file">
            Tout est bien complet? Alors vous pouvez:
          </p>

          <button className="formBtnRegister" type="submit">
            Renseigner mes enfants
          </button>
          {/* <NavLink
            to="/register/children"
            className="formBtnRegister"
            type="submit"
          >
            Renseigner mes enfants
          </NavLink> */}
        </form>
      </div>
    </div>
  );
}

export default AdministrativeParent;
