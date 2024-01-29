
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/auth.context";
import { useHttp } from "../../../contexts/http.context";


function Setting() {

  const auth = useAuth();
  const http = useHttp();

  const parent = auth.profil.parent;

  return (
    <div className="profilContainer">
      <div className="header-profil">
        <div>
          <NavLink to="/search" className="iconsearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </NavLink>
          <NavLink to="/profil" className="iconsearch">
            <svg
              className="icon-profil"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          </NavLink></div>
        <h2 className="title-profil">Modifier mon profil</h2>
      </div>

      <div className="nameiconuser">

        <img
          className="iconprofil"
          src={`${import.meta.env.VITE_BACKEND_UPLOADS_URL}/${parent.avatar_url}`}
          alt="profil"
        />

        <h3 className="name-user">{`Bonjour ${parent.firstname} ${parent.lastname} ! `}</h3>
      </div>
      <div className="registerContainer">
        <div className="registerForm">
          <h2 className="titleFormRegister">Vous pouvez modifier ces informations :</h2>

          <form>
            <label>
              Numéro de téléphone : <br />
              <input
                name="firstName"
                className="input-file-secu"
                type="text"
              />
            </label>
            <label>
              Marcheur? <br />
              Cocher si oui: <br />
              <input
                name="isWalking"
                className="input-checkbox"
                type="checkbox"
              />
            </label>
            <label>
              Nom du médecin traitant: <br />
              <input
                name="doctor"
                className="input-file-secu"
                type="text"
              />
            </label>
            <label>
              Allergies connues: <br />
              <input
                name="allergies"
                className="input-file-secu"
                type="text"
              />
            </label>

            <button className="formBtnRegister" type="submit">
              Modifier
            </button>
          </form>

          <button className="delete">Supprimer mon compte</button>
        </div>
      </div>
    </div>
  )
}
export default Setting;