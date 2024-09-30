import React from 'react';
import Header from './Components/Header';
import Home from './Components/Home'; 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// import 'antd/dist/reset.css';  // Import Ant Design styles for consistent UI

function App() {
  return (
    <div className="App">
      <Router>
        <Header /> {/* Header will always be visible */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          {/* You can add more routes here if needed, like a Dashboard or other pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
