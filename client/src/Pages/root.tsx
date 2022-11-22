import { Link } from 'react-router-dom';
import file_img from '../Assets/file.png';
import user_img from '../Assets/user.png';
import group_img from '../Assets/group.png';
import proccess_img from '../Assets/proccess.png';
import netstat_img from '../Assets/netstat.png';
import './Root.scss';

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
        <img src={proccess_img} alt="proccess" />
        <div className='description'></div>
      </Link>
      <Link className='RootImg' to="/netstat">
        <img src={netstat_img} alt="netstat" />
        <div className='description'></div>
      </Link>
    </div>
  );
}

export default Root;
