import React from 'react';
import { Link } from 'react-router-dom';
import file_img from '../Assets/file.png';
import user_img from '../Assets/user.png';
import group_img from '../Assets/group.png';
import './root.scss';

function Root() {
  return (
    <div className="Root">
      <Link className='RootImg' to="/file">
        <img src={file_img} alt="file" />
        <div className='description'></div>
      </Link>
      <Link className='RootImg' to="/user">
        <img src={user_img} alt="user" />
        <div className='description'></div>
      </Link>
      <Link className='RootImg' to="/group">
        <img src={group_img} alt="group" />
        <div className='description'></div>
      </Link>
      <Link className='RootImg' to="/process">
        <img src="" alt="" />
        <div className='description'></div>
      </Link>
      <Link className='RootImg' to="/net">
        <img src="" alt="" />
        <div className='description'></div>
      </Link>
    </div>
  );
}

export default Root;
