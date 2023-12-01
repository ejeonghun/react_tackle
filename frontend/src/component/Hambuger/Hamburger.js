// Hamburger.js

import React , {useState} from 'react';
import './Hamburger.css';

const Hamburger = ({ isOpen, toggle }) => {
  return (
    <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Hamburger;
