import { Link } from 'react-router-dom';
import './file.scss';

function File() {
  return (
    <div className="File">
      <h1>ファイル管理</h1>
      <p>指定したページが見つかりません。</p>
      <Link to="/">トップへ</Link>
    </div>
  );
}

export default File;
