import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';


const Menubar = () => {
  return (
    <nav className="menubar">
      <div className="menuOp" id='FB'>
        <Link to="/">feedback</Link> 
      </div>
      <div className="menuOp" id='CM'>
        <Link to="/comment">comment</Link>
      </div>
      <div className='menuOp' id='LK'>
        <Link to="/links">links</Link>
      </div>
    </nav>
  );
};

export default Menubar;