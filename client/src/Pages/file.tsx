import React from 'react';

import './File.scss';

// モジュールのインポート
import HttpClient from '../Common/HttpClient';

// コンポーネントのインポート
import Config from '../Common/Config';
import Header from '../Components/Header';

// レコードのインポート
import pwdRecord from '../Records/pwdRecord';
import lsRecord from '../Records/lsRecord';

// データ型
type Props = {
  cd: string | null;
  directories: string[];
  files: string[];
  popup: boolean;
};

class File extends React.Component {

  state: Props = {
    cd: null,
    directories: [],
    files: [],
    popup: false
  };

  ChangeDirectory(path: string) {
    var body: Map<string, string> = new Map();
    body.set('path', path);
    HttpClient.Post(Config.server_origin + '/api/cd', body)
    .then(() => {
      this.getPwd();
      this.GetDirFiles();
    });
  }

  ShowDetail(filename: string) {
    this.setState({
      popup: true
    });
    console.log(filename);
  }

  removePopup() {
    this.setState({
      popup: false
    });
  }

  getPwd() {
    HttpClient.Get(Config.server_origin + '/api/pwd')
    .then((response: pwdRecord) => {
      this.setState({
        cd: response.cd
      });
    });
  }

  GetDirFiles() {
    HttpClient.Get(Config.server_origin + '/api/ls')
    .then((response: lsRecord[]) => {
      const dirs: JSX.Element[] = [];
      const files: JSX.Element[] = [];
      response.forEach(lsObject => {
        if (lsObject.filename.slice(-1) === '/') {
          dirs.push(<div onDoubleClick={() => {this.ChangeDirectory(lsObject.filename)}} key={lsObject.filename}>{lsObject.filename}</div>);
        } else {
          files.push(<div onClick={() => {this.ShowDetail(lsObject.filename)}} key={lsObject.filename}>{lsObject.filename}</div>);
        }
      });
      this.setState({
        directories: dirs,
        files: files
      });
    });
  }

  componentDidMount() {
    this.getPwd();
    this.GetDirFiles();
  }

  render() {
    return (
      <div className='File'>
        <Header />
        <h1>ファイル管理</h1>
        <div className='cd'>$ {this.state.cd}</div>
        <div className='dirfile-container'>
          <div onDoubleClick={() => {this.ChangeDirectory("..")}}>..</div>
          <div>.</div>
          {this.state.directories}
          {this.state.files}
        </div>
        <div className={((this.state.popup) ? "on" : "off") + " dirfile-popup-background"}>
          <div className='dirfile-popup'>
            <div className='dirfile-popup-eraser' onClick={() => {this.removePopup()}}>×</div>
          </div>
        </div>
      </div>
    );
  }
}

export default File;
