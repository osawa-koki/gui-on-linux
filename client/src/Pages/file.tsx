import React from 'react';

import './File.scss';

// モジュールのインポート
import HttpClient from '../Common/HttpClient';

// コンポーネントのインポート
import Config from '../Common/Config';
import Header from '../Components/Header';

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

  componentDidMount() {
    HttpClient.Get(Config.server_origin + '/pwd')
      .then((response) => {
        this.setState({
          cd: response.data.cd
        });
      }
    );
  }

  render() {
    return (
      <div className='File'>
        <Header />
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
