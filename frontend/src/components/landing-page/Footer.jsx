import logocoeur from "../../assets/logocoeur.svg";
import logobaby from "../../assets/logobaby.svg";

function Footer() {
  return (
    <footer>
      {" "}
      <div className="footerLogo">
        <img src={logocoeur} alt="coeur babyplace" />
        <img src={logobaby} alt="nom du site" />
      </div>
      <div className="footerDescription">
        <p>
          {" "}
          DaveWarehouse Society, <br />4 rue Baron 44000 NANTES <br />
          info@davewarehouse.projet - 02.40.01.02.03
        </p>
      </div>
    </footer>
  );
}

export default Footer;
