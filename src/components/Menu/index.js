import React from 'react';
import { Link,useLocation } from 'react-router-dom';

import './styles.css';



function Menu() {

  const location = useLocation();
  const VerifiPath = (pathname) => 
  pathname === location.pathname ? {color:'#1976d2'} : null

  return (
    <div className="menu-container">
      <Link style={VerifiPath('/')} to="/">Incio</Link>
      <Link style={VerifiPath('/planos')} to="/planos">Planos</Link>
    </div>
  );
}

export default Menu;