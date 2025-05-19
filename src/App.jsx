import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Home';
import EventCard from './components/EventCard';
import CategoryPage from './components/CategoryPage';
import Dashboard from './components/LoggInn';
import EventPage from './components/EventPage';
import Eventer from './components/EventPage';
import Artist from './components/ArtistCard';

// Hovedkomponenten for applikasjonen
const App = () => {
  return (
    // Router sørger for at applikasjonen kan bruke ruter med React Router
    <Router>
      {/* Navbar vises alltid øverst på alle sider */}
      <Navbar />

      {/* Definerer ulike ruter (URL-stier) og hvilke komponenter som skal vises for hver */}
      <Routes>
         {/* Kategorisider */}
        <Route path="/music" element={<CategoryPage category="music" />} />
        <Route path="/teatershow" element={<EventPage category="teatershoe" />} />
        <Route path="/sport" element={<Eventer category="sport" />} />

        {/* Hjemmeside */}
        <Route path="/" element={<EventCard category="billettlyst" />} />

        <Route path="#/oslo" slug={<EventCard category="billettlyst" />} />
        <Route path="#/paris" slug={<EventCard category="billettlyst" />} />
        <Route path="#/stockholm" slug={<EventCard category="billettlyst" />} />
        <Route path="#/berlin" slug={<EventCard category="billettlyst" />} />
        <Route path="#/london" slug={<EventCard category="billettlyst" />} />

        {/* Midlertidig rute for "Logg inn"-siden – kan erstattes med Dashboard senere */}
        <Route path="/logginn" element={<Dashboard category="logginn" />} />

        {/* Artist-side */}
        <Route path="/artist" element={<Artist />} />
      </Routes>
    </Router>
  );
};

export default App;
