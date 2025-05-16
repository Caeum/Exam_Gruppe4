import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import CategoryPage from './components/CategoryPage';
import Dashboard from './pages/LoggInn';
import ArtistCard from './components/ArtistCard';
import EventPager from './components/EventPage';

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
        <Route path="/sport" element={<EventPager category="sport" />} />
        <Route path="/teatershow" element={<CategoryPage category="teatershow" />} />
        <Route path="/" element={<EventCard category="billettlyst" />} />
        <Route path="#/oslo" id="oslo-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/paris" id="paris-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/stockholm" id="stockhom-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/berlin" id="berlin-color" slug={<EventCard category="billettlyst" />} />
        <Route path="#/london" id="london-color" slug={<EventCard category="billettlyst" />} />

        {/* Midlertidig rute for "Logg inn"-siden – kan erstattes med Dashboard senere */}
        <Route path="/logginn" element={<Dashboard category="logginn" />} />
      </Routes>
    </Router>
  );
};

export default App;
