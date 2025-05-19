import React from "react";
import { Link } from "react-router-dom"; //Importerer Link fra react-router-dom for Nav.

// Nav-komponenten viser navigasjonsmenyen som skal vises på alle sider
const ArtistCard = () => {
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


  // Navbar-komponenten viser ArtistCard og en dynamisk liste av knapper med linker
const Navbar = () => {
  // En liste med kategorier som skal vises som knapper
const kategorier = [
{ navn: "Les mer om NEON  | Lørdagspass - Music", slug: "" },
{ navn: "Les mer om Tons of Rock at the Fortress - Music", slug: "" },
{ navn: "Les mer om Skeikampfestivalen - Dagspass - FREDAG - Music", slug: "" },
{ navn: "Les mer om Findings Festival 2025 - Festivalpass - Music", slug: "" },
];

return (
<nav>
<ArtistCard />
{/* Mapper over kategorier og lager en knapp for hver */}
{kategorier.map((kategori) => (
<button id="this"><Link
key={kategori.slug}
to={`/sport${kategori.slug}`}
id={`${kategori.slug}-color`}
>
{kategori.navn}
</Link></button>
))};
</nav>
)};

export default Navbar;
