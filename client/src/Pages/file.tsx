import React from 'react';

import './file.scss';

// コンポーネントのインポート

// データ型
type Props = {
  cd: string;
  directories: string[];
  files: string[];
};

class File extends React.Component {

  state: Props = {
    cd: "/",
    directories: [],
    files: []
  };

  render() {
    return (
      <div className='File'>
        <h1>ファイル管理</h1>
        <div className='cd'>{this.state.cd}</div>
        <div className='dirfile-container'>
          <div>..</div>
          <div>.</div>
        </div>
      </div>
    );
  }
}

export default File;
