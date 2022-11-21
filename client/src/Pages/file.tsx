import React from 'react';

import './file.scss';

// コンポーネントのインポート
import FilePwd from '../Components/FilePwd';

function File(props: { pwd: string }) {
  return (
    <div className="File">
      <h1 onClick={() => {props.pwd = "#"}}>ファイル管理</h1>
      {FilePwd(props.pwd)}
      <div>{props.pwd}</div>
    </div>
  );
}

export default File;
