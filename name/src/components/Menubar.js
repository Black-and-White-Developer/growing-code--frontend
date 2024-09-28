import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';


const Menubar = () => {
  return (
    <nav className="menubar">
      <div className="feedback">
        <Link to="/">feedback</Link> 
      </div>
      <div className="c">
        <Link to="/comment">comment</Link>
      </div>
      <div>
        <Link to="/links">links</Link>
      </div>
    </nav>
    );
};
  
  export default Menubar;