import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';


const Menubar = () => {
    return (
      <nav className="menubar">
        <div className="menubar-menu">
          <Link to="/">feedback</Link> 
        </div>
        <div className="menubar-menu">
          <Link to="/comment">comment</Link>
        </div>
        <div className="menubar-menu">
          <Link to="/links">Links</Link>
        </div>
      </nav>
    );
  };
  
  export default Menubar;