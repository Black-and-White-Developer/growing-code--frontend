import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menubar.css';


const Menubar = () => {

  const location = useLocation(); // 현재 경로 가져오기

  // 해당 경로가 활성화된 경우 배경색을 변경하는 함수
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''; // 현재 경로와 비교
  };

  return (
    <nav className="menubar">
      <Link id='FBA' className={`menubar-menu ${isActive('/')}`} to="/">
        <div id='FB' className={`menubar-menu-op ${isActive('/')}`}>FEEDBACK</div>
      </Link> 
      <Link id='CMA' className={`menubar-menu ${isActive('/comment')}`} to="/comment">
        <div id='CM' className={`menubar-menu-op ${isActive('/comment')}`}>COMMENT</div>
      </Link>
      <Link id='LKA' className={`menubar-menu ${isActive('/links')}`} to="/links">
        <div id='LK' className={`menubar-menu-op ${isActive('/links')}`}>LINKS</div>
      </Link>

    </nav>
  );
};

export default Menubar;