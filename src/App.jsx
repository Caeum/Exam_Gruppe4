import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import CategoryPage from './components/CategoryPage';
import Dashboard from './pages/LoggInn';

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
        <Route path="/sport" element={<CategoryPage category="sport" />} />
        <Route path="/teatershow" element={<CategoryPage category="teatershow" />} />

        {/* Midlertidig rute for "Logg inn"-siden – kan erstattes med Dashboard senere */}
        <Route path="/logginn" element={<Dashboard category="logginn" />} />
        <Route path="/music" element={<Dashboard category="music" />} />
        <Route path="/" element={<EventCard />} />
      </Routes>
    </Router>
  );
};

export default App;
