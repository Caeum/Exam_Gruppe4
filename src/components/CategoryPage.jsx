import React from "react";
import { Link } from "react-router-dom";
  
  const MusicCategory = () => {
    return (
      <nav id="music-color">
        <a href="/#/oslo" category="EventCard" id="oslo-color"><p>Link til Oslo</p></a>
        <a href="/#/stockholm" category="EventCard" id="stockholm-color"><p>Link til Stockholm</p></a>
        <a href="/#/berlin" category="EventCard" id="berlin-color"><p>Link til Berlin</p></a>
        <a href="/#/london" category="EventCard" id="london-color"><p>Link til London</p></a>
        <a href="/#/paris" category="EventCard" id="paris-color"><p>Link til Paris</p></a>
          </nav>
      );
  };

  export default MusicCategory;