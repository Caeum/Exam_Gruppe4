import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Home';
import EventCard from './components/EventCard';
import CategoryPage from './components/CategoryPage';
import Dashboard from './pages/LoggInn';
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
        {/* Kategori-sider for musikk, sport og teater/show – sender kategori som prop */}
        <Route path="/music" element={<CategoryPage category="music" />} />
        <Route path="/teatershow" element={<EventPage category="teatershow" />} />
        <Route path="/sport" element={<Eventer category="sport" />} />
        <Route path="/" element={<EventCard category="billettlyst" />} />
        <Route path="#/oslo" id="oslo-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/paris" id="paris-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/stockholm" id="stockhom-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/berlin" id="berlin-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/london" id="london-color" slug={<EventCard category="billettlyst" />} />

        {/* Midlertidig rute for "Logg inn"-siden – kan erstattes med Dashboard senere */}
        <Route path="/logginn" element={<Dashboard category="logginn" />} />
        <Route path="/artist" id="london-color" element={<Artist />} />
      </Routes>
    </Router>
  );
};

export default App;
