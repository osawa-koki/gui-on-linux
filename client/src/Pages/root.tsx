import React from 'react';
import { Link } from 'react-router-dom';
import file_img from '../Assets/file.png';
import './root.scss';

function Root() {
  return (
    <div className="Root">
      <Link to="/file">
        <img src={file_img} alt="file" />
        <div className='description'></div>
      </Link>
      <Link to="/user">
        <img src="" alt="" />
        <div className='description'></div>
      </Link>
      <Link to="/group">
        <img src="" alt="" />
        <div className='description'></div>
      </Link>
      <Link to="/process">
        <img src="" alt="" />
        <div className='description'></div>
      </Link>
      <Link to="/net">
        <img src="" alt="" />
        <div className='description'></div>
      </Link>
    </div>
  );
}

export default Root;
