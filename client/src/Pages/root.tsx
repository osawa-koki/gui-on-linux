import React from 'react';
import { Link } from 'react-router-dom';
import './root.scss';

function Root() {
  return (
    <div className="Root">
      <Link to="/app">Contact</Link>
      <Link to="/app">Contact</Link>
      <Link to="/app">Contact</Link>
    </div>
  );
}

export default Root;
