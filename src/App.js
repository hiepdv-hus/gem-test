import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapBoxExample from './MapboxExample';
import AboutPage from './AboutPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapBoxExample />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
