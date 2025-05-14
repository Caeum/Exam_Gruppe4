import React from "react";
import { Link } from "react-router-dom"; //Importerer Link fra react-router-dom for Nav.

// Nav-komponenten viser navigasjonsmenyen som skal vises på alle sider
const Nav = () => {
    return (
      // <nav> brukes for semantisk HTML – markerer navigasjonsinnhold
      <nav id="categories">
        {/* Link-komponentene brukes for å navigere til ulike kategorier og logg inn-siden */}
        <Link to="/" id="billettlyst-color">BillettLyst</Link>
        <Link to="/music" id="music-color">Music</Link>             {/* Går til musikk-kategori */}
        <Link to="/sport" id="sport-color">Sport</Link>             {/* Går til sport-kategori */}
        <Link to="/teatershow" id="teatershow-color">Teater/Show</Link>  {/* Går til teater/show-kategori */}
        <Link to="/logginn" id="logginn-color">Logg inn</Link>         {/* Går til logg inn-siden */}
      </nav>
    );
  };

  export default Nav;