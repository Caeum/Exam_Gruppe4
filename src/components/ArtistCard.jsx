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
        <Link
          key={kategori.slug}
          to={`${kategori.slug}`}
          id={`${kategori.slug}-color`}
        >
          {kategori.navn}
        </Link>
      ))}
                <a href="oslo"><button><p>Oslo</p></button></a>
                <a href="stockholm"><button><p>Stockholm</p></button></a>
                <a href="berlin"><button><p>Berlin</p></button></a>
                <a href="london"><button><p>London</p></button></a>
    </nav>
  );
}

export default ArtistCard;
