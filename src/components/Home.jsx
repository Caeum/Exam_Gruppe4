import React from "react";
import { Link } from "react-router-dom";

// Navbar-komponent for hovednavigasjon mellom kategorisider
const Navbar = () => {
  return (
    <nav id="categories">
      <Link to="/" id="billettlyst-color">BillettLyst</Link>
      <Link to="/music" id="music-color">Music</Link>
      <Link to="/sport" id="sport-color">Sport</Link>
      <Link to="/teatershow" id="teatershow-color">Teater/Show</Link>
      <Link to="/logginn" id="logginn-color">Logg inn</Link>
    </nav>
  );
};

// ArtistCard-komponent viser knapper for spesifikke festivalarrangementer
export const ArtistCard = () => {
// Statisk liste med festivaler
  const kategorier = [
    { navn: "Les mer om NEON| Lørdagspass - Music", slug: "#" },
    { navn: "Les mer om Tons of Rock at the Fortress - Music", slug: "#" },
    { navn: "Les mer om Skeikampfestivalen - Dagspass - FREDAG - Music", slug: "#" },
    { navn: "Les mer om Findings Festival 2025 - Festivalpass - Music", slug: "#" },
  ];

  return (
    <nav>
      {/* Mapper over festivalene og lager en knapp for hver */}
      {kategorier.map((kategori) => (
        <button key={kategori.slug} id="this">
          <Link to={`/events/${kategori.slug}`} id={`${kategori.slug}-color`}>
            {kategori.navn}
          </Link>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;