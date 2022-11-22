import React from 'react';

import './File.scss';

// モジュールのインポート
import HttpClient from '../Common/HttpClient';

// コンポーネントのインポート
import Config from '../Common/Config';
import Header from '../Components/Header';

// レコードのインポート
import pwdRecord from '../Records/pwdRecord';

// データ型
type Props = {
  cd: string;
  directories: string[];
  files: string[];
};

class File extends React.Component {

  state: Props = {
    cd: "/home/osawakoki",
    directories: [],
    files: []
  };

  componentDidMount() {
    // HttpClient.Get(Config.server_origin + '/api/pwd')
    //   .then((response: pwdRecord) => {
    //     this.setState({
    //       cd: response.cd
    //     });
    //   }
    // );
  }

  render() {
    return (
      <div className='File'>
        <Header />
        <h1>ファイル管理</h1>
        <div className='cd'>$ {this.state.cd}</div>
        <div className='dirfile-container'>
          <div>..</div>
          <div>.</div>
        </div>
      </div>
    );
  }
}

export default File;
