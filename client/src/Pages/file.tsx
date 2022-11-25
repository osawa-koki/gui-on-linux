import React from 'react';

import './File.scss';

// モジュールのインポート
import HttpClient from '../Common/HttpClient';
import Format from '../Common/Format';

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
  popup_content: string;
  popup_content_on: boolean;
  mkstruct: mkStruct;
};
type mkStruct = {
  filename: string;
  dirname: string;
}

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
      epoch_utc: 0,
    },
    popup_content: '',
    popup_content_on: false,
    mkstruct: {
      filename: '',
      dirname: '',
    },
  };

  ChangeDirectory(path: string) {
    var body: object = {'path': path};
    try {
      HttpClient.Put(Config.server_origin + '/api/cd', body)
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

  delete_file(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(event);

  }

  update_file(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(event);
  }

  removePopup() {
    this.setState({
      popup: false,
      popup_content_on: false
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

  cat_file() {
    try {
      HttpClient.Get(Config.server_origin + '/api/cat?filename=' + this.state.popup_data.filename)
      .then(({content}) => {
        this.setState({
          popup_content: content,
          popup_content_on: true,
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
        <div className='mk-container'>
          <div>
            <input className='mkfile-input' type='text' value={this.state.mkstruct.filename} onChange={(event) => this.setState({mkstruct: {filename: event.target.value}})} />
            <button>ファイルを作成</button>
          </div>
          <div>
            <input className='mkdir-input' type='text' value={this.state.mkstruct.dirname} onChange={(event) => this.setState({mkstruct: {dirname: event.target.value}})} />
            <button>ディレクトリを作成</button>
          </div>
        </div>
        <div className='dirfile-container'>
          <div onDoubleClick={() => {this.ChangeDirectory("../")}} className='isDir'>../</div>
          <div className='isDir'>./</div>
          {this.state.directories}
          {this.state.files}
        </div>
        <div className={((this.state.popup) ? "on" : "off") + " dirfile-popup-background"}>
          <div className='dirfile-popup'>
            <div className='dirfile-popup-eraser' onClick={() => {this.removePopup()}}>×</div>
            <div className='filename-text'>ファイル名</div>
            <input className='filename' type='text' value={this.state.popup_data.filename} onChange={(event) => this.setState({popup_data: {filename: event.target.value}})} data-prev_filename={this.state.popup_data.filename} />
            <div className='owner-text'>所有者</div>
            <input className='owner' type='text' value={this.state.popup_data.owner} onChange={(event) => this.setState({popup_data: {owner: event.target.value}})} />
            <div className='group-text'>所有者グループ</div>
            <input className='group' type='text' value={this.state.popup_data.group} onChange={(event) => this.setState({popup_data: {group: event.target.value}})} />
            <div className='size-text'>ファイルサイズ</div>
            <input className='size' type='number' value={this.state.popup_data.size} onChange={(event) => this.setState({popup_data: {size: event.target.value}})} readOnly />
            <div className='date-text'>最終更新日</div>
            <input className='date' type='datetime-local' value={Format.DateTime_toStr(this.state.popup_data.date)} onChange={(event) => this.setState({popup_data: {date: event.target.value}})} />
            <div className='flags-text'>権限</div>
            <input className='flags' type='text' value={this.state.popup_data.flags} onChange={(event) => this.setState({popup_data: {flags: event.target.value}})} />
            <button  className={((this.state.popup_content_on) ? 'off' : 'on') + ' cat-button'} onClick={() => {this.cat_file()}}>ファイルを開く</button>
            <textarea className={((this.state.popup_content_on) ? 'on' : 'off') + ' content'} cols={100} rows={30} value={this.state.popup_content} onChange={(event) => {this.setState({popup_content: event.target.value})}} />
            <button className='delete-button' onClick={this.delete_file}>ファイルを削除</button>
            <button className='update-button' onClick={this.update_file}>ファイルを更新</button>
          </div>
        </div>
      </div>
    );
  }
}

export default File;
