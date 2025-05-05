import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import CategoryPage from './pages/CategoryPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/music" element={<CategoryPage category="music" />} />
        <Route path="/sport" element={<CategoryPage category="sport" />} />
        <Route path="/teatershow" element={<CategoryPage category="teatershow" />} />
        <Route path="/logginn" element={<div>Logg inn</div>} />
      </Routes>
    </Router>
  );
};

export default App;
