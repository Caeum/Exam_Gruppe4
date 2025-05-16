import React from "react";
import { Link } from "react-router-dom";
  
  const EventPager = () => {
    return (
      <nav id="sport-color">
        <h1>Findings Festival</h1>
        <h2>Sjanger</h2>
        <ul>
        <li>Music</li>
        <li>Undefined</li>
        <li>Festival</li>
        <li>Undefined</li>
        </ul>
        <h3>Følg oss på sosiale medier</h3>
        <h3>Festivalplass:</h3>
        <a href="#/oslo" category="EventPage" id="oslo-color"><button><p>Kjøp</p></button></a>
        <a href="#/stockholm" category="EventPage" id="stockholm-color"><p>Legg til i ønskeliste</p></a>
        <a href="#/berlin" category="EventPage" id="berlin-color"><p>Kjøp</p></a>
        <a href="#/london" category="EventPage" id="london-color"><p>Legg til i ønskeliste</p></a>
        <a href="#/paris" category="EventPage" id="paris-color"><p>Kjøp</p></a>
          </nav>
      );
  };

  export default EventPager;