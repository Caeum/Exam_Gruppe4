import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = () => {
  const kategorier = [
    { navn: "Les mer om NEON | Lørdagspass - Music", slug: "oslo" },
    { navn: "Les mer om Tons of Rock at the Fortress - Music", slug: "stockholm" },
    { navn: "Les mer om Skeikampenfestivalen - Dagspass - FREDAG - Music", slug: "berlin" },
    { navn: "Les mer om Findings Festival 2025 - Festivalpass - Music", slug: "london" },
  ];

  return (
    <nav>
      {kategorier.map((kategori) => (
            <button id="lis"><Link
          key={kategori.slug}
          to={`#${kategori.slug}`}
          id={`#${kategori.slug}-color`}
        >
          {kategori.navn}
        </Link></button>
      ))}
      </nav>
  );
}

export default ArtistCard;
