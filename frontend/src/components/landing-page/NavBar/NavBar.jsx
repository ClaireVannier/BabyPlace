import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logobaby from "../../../assets/logobaby.svg";
import logocoeur from "../../../assets/logocoeur.svg";

function NavBar({ userType, setUserType }) {
  const registerLink = userType === "pro" ? "/register/nursery" : "/register/parent";

  return userType === "parent" ? (
    <nav className="navBar">
      <div className="logoContainer">
        <img src={logocoeur} alt="logo site coeur" id="logoCoeur" />
        <img src={logobaby} alt="logo site" id="logoTxt" />
      </div>
      <button
        className="userButton"
        type="button"
        onClick={() => setUserType("pro")}
      >
        Vous êtes une crèche ?
      </button>
      <div className="navButton">
        <Link to={registerLink}>S'inscrire</Link>
        <Link to="/login">Connexion</Link>
      </div>
    </nav>
  ) : (
    <nav className="navBar">
      <div className="logoContainer">
        <img src={logocoeur} alt="logo site coeur" id="logoCoeur" />
        <img src={logobaby} alt="logo site" id="logoTxt" />
      </div>
      <button
        className="userButton"
        type="button"
        onClick={() => setUserType("parent")}
      >
        Vous êtes un parent?
      </button>
      <div className="navButton">
        <Link to={registerLink}>S'inscrire</Link>
        <Link to="/login">Connexion</Link>
      </div>
    </nav>
  );
}

export default NavBar;

NavBar.propTypes = {
  userType: PropTypes.string.isRequired,
  setUserType: PropTypes.func.isRequired,
};
