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
  fileinfo: lsRecord[];
  popup: boolean;
  popup_data: lsRecord;
};

class File extends React.Component {

  state: Props = {
    cd: null,
    directories: [],
    files: [],
    fileinfo: [],
    popup: false,
    popup_data: {
      filename: '',
      owner: '',
      group: '',
      size: 0,
      date: new Date(1970, 1, 1),
      flags: '',
      links: 0,
      epoch: 0,
      epoch_utc: 0
    }
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
    for (let i = 0; i < this.state.fileinfo.length; i++) {
      if (this.state.fileinfo[i].filename === filename) {
        this.setState({
          popup: true,
          popup_data: this.state.fileinfo[i]
        });
        break;
      }
    }
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
        files: files,
        fileinfo: response
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
            <div className='filename'>{this.state.popup_data.filename}</div>
            <div className='owner'>{this.state.popup_data.owner}</div>
            <div className='group'>{this.state.popup_data.group}</div>
            <div className='size'>{this.state.popup_data.size}</div>
            <div className='date'>{this.state.popup_data.date.toString()}</div>
            <div className='flags'>{this.state.popup_data.flags}</div>
            <div className='deleteFile'>DELETE</div>
            <div className='updateFile'>UPDATE</div>
          </div>
        </div>
      </div>
    );
  }
}

export default File;
