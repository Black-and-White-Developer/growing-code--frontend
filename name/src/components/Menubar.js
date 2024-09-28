import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';


const Menubar = () => {
    return (
      <nav className="menubar">
        <div className="menubar-logo">
          <Link to="/"><img src="images/blank_icon.jpg" alt="Menu" /></Link> 
        </div>
        <ul className="menubar-menu">
          <li><Link to="/"><img src="images/home2_icon.png" alt="Home" /></Link></li>
        </ul>
      </nav>
    );
  };
  
  export default Menubar;