import React from "react";
import { Link } from "react-router-dom";

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

export const ArtistCard = () => {
  const kategorier = [
    { navn: "Les mer om NEON| Lørdagspass - Music", slug: "neon" },
    { navn: "Les mer om Tons of Rock at the Fortress - Music", slug: "tons-of-rock" },
    { navn: "Les mer om Skeikampfestivalen - Dagspass - FREDAG - Music", slug: "skeikampfestivalen" },
    { navn: "Les mer om Findings Festival 2025 - Festivalpass - Music", slug: "findings-festival" },
  ];

  return (
    <nav>
      {kategorier.map((kategori) => (
        <button key={kategori.slug} id="this">
          <Link to={`/sport/${kategori.slug}`} id={`${kategori.slug}-color`}>
            {kategori.navn}
          </Link>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;