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
    },
  };

  ChangeDirectory(path: string) {
    var body: Map<string, string> = new Map();
    body.set('path', path);
    try {
      HttpClient.Post(Config.server_origin + '/api/cd', body)
      .then(() => {
        this.getPwd();
        this.GetDirFiles();
      });
    } catch (err) {
      console.log(err);
    }
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

  delete_file(event: React.MouseEvent<HTMLInputElement>) {
    console.log(event);

  }

  update_file(event: React.MouseEvent<HTMLInputElement>) {
    console.log(event);
  }

  removePopup() {
    this.setState({
      popup: false
    });
  }

  getPwd() {
    try {
      HttpClient.Get(Config.server_origin + '/api/pwd')
      .then((response: pwdRecord) => {
        this.setState({
          cd: response.cd
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  GetDirFiles() {
    try {
      HttpClient.Get(Config.server_origin + '/api/ls')
      .then((response: lsRecord[]) => {
        const dirs: JSX.Element[] = [];
        const files: JSX.Element[] = [];
        response.forEach(lsObject => {
          if (lsObject.filename.slice(-1) === '/') {
            dirs.push(<div className='isDir' onDoubleClick={() => {this.ChangeDirectory(lsObject.filename)}} key={lsObject.filename}>{lsObject.filename}</div>);
          } else {
            files.push(<div className='isFile' onClick={() => {this.ShowDetail(lsObject.filename)}} key={lsObject.filename}>{lsObject.filename}</div>);
          }
        });
        this.setState({
          directories: dirs,
          files: files,
          fileinfo: response
        });
      });
    } catch (err) {
      console.log(err);
    }
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
          <div onDoubleClick={() => {this.ChangeDirectory("..")}} className='isDir'>../</div>
          <div className='isDir'>./</div>
          {this.state.directories}
          {this.state.files}
        </div>
        <div className={((this.state.popup) ? "on" : "off") + " dirfile-popup-background"}>
          <div className='dirfile-popup'>
            <div className='dirfile-popup-eraser' onClick={() => {this.removePopup()}}>×</div>
            <input className='filename' type='text' value={this.state.popup_data.filename} onChange={(event) => this.setState({popup_data: {filename: event.target.value}})} data-prev_filename={this.state.popup_data.filename} />
            <input className='owner' type='text' value={this.state.popup_data.owner} onChange={(event) => this.setState({popup_data: {owner: event.target.value}})} />
            <input className='group' type='text' value={this.state.popup_data.group} onChange={(event) => this.setState({popup_data: {group: event.target.value}})} />
            <input className='size' type='number' value={this.state.popup_data.size} onChange={(event) => this.setState({popup_data: {size: event.target.value}})} />
            <input className='date' type='date' value={this.state.popup_data.date.toString()} onChange={(event) => this.setState({popup_data: {date: event.target.value}})} />
            <input className='flags' type='text' value={this.state.popup_data.flags} onChange={(event) => this.setState({popup_data: {flags: event.target.value}})} />
            <div className='deleteFile' onClick={this.delete_file}>DELETE</div>
            <div className='updateFile' onClick={this.update_file}>UPDATE</div>
          </div>
        </div>
      </div>
    );
  }
}

export default File;
