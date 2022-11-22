// React全般設定
import { Link } from 'react-router-dom';

// CSS設定
import './Header.scss';

function Header() {
  return (
    <div className='Header'>
      <Link to="/">トップ</Link>
      <Link to="/user">ユーザ管理</Link>
      <Link to="/group">グループ管理</Link>
      <Link to="/proccess">プロセス管理</Link>
      <Link to="/netstat">ネットワーク管理</Link>
    </div>
  );
}

export default Header;
