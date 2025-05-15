import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = () => {
  const kategorier = [
    { navn: "Oslo", slug: "oslo" },
    { navn: "Stockholm", slug: "stockholm" },
    { navn: "Berlin", slug: "berlin" },
    { navn: "London", slug: "london" },
    { navn: "Paris", slug: "paris" },
  ];

  return (
    <nav>
      {kategorier.map((kategori) => (
        <button><Link
          key={kategori.slug}
          to={`#/${kategori.slug}`}
          id={`#/${kategori.slug}-color`}
        >
          {kategori.navn}
        </Link></button>
      ))}
        </nav>
  );
}

export default ArtistCard;
