import React from 'react';
import '../Css/Header.css';
import logo from '../../logo/logo.png'

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Sportify Logo" className="logo-image" />
        {/* <h1 className="logo-text">Sportify</h1> */}
      </div>

      <nav className="nav">
        <button className="nav-button">Dashboard</button>
        <button className="nav-button">Home</button>
        <button className="nav-button add-button">+</button>
      </nav>
    </header>
  );
}

export default Header;
