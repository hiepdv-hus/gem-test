import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapBoxExample from './MapboxExample';
import AboutPage from './AboutPage';
import AboutPage25D from './AboutPage25D';

const App = () => {
  return (
    <Router>
      <nav className="nav-bar">
        <Link to="/" style={{ marginRight: '10px' }}>Mapbox</Link>
        {/* <Link to="/2-5D">Bản đồ 2.5D</Link> */}
        <Link to="/2D">OpenStreetMap</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MapBoxExample />} />
        <Route path="/2-5D" element={<AboutPage25D />} />
        <Route path="/2D" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
