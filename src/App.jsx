import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventCard from './components/EventCard';
import CategoryPage from './components/CategoryPage';
import Dashboard from './components/Dashboard';
import EventPage from './components/EventPage';
import Eventer from './components/EventPage';

// Hovedkomponenten for applikasjonen
const App = () => {
  return (
    // Router sørger for at applikasjonen kan bruke ruter med React Router
    <Router>
      {/* Navbar vises alltid øverst på alle sider */}
      {/* Definerer ulike ruter (URL-stier) og hvilke komponenter som skal vises for hver */}
      <Routes>
         {/* Kategorisider */}
        <Route path="/music" element={<CategoryPage category="music" />} />
        <Route path="/sport" element={<CategoryPage category="sport" />} />
        <Route path="/teatershow" element={<CategoryPage category="teatershow" />} />
        <Route path="/events" element={<EventPage category="events" />} />
        <Route path="/events" element={<Eventer category="events" />} />

        {/* Hjemmeside */}
        <Route path="/" element={<EventCard category="billettlyst" />} />

        <Route path="#/oslo" slug={<EventCard category="billettlyst" />} />
        <Route path="#/paris" slug={<EventCard category="billettlyst" />} />
        <Route path="#/stockholm" slug={<EventCard category="billettlyst" />} />
        <Route path="#/berlin" slug={<EventCard category="billettlyst" />} />
        <Route path="#/london" slug={<EventCard category="billettlyst" />} />

        {/* Midlertidig rute for "Logg inn"-siden – kan erstattes med Dashboard senere */}
        <Route path="/logginn" element={<Dashboard category="logginn" />} />
      </Routes>
    </Router>
  );
};

export default App;
