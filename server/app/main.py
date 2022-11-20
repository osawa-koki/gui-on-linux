# FastAPIモジュール
from fastapi import FastAPI

# Python全般モジュール
import yaml
import jc

# 独自モジュール
from common.Log import logging
from common.SSHClient import SSHClient

# FastAPIオブジェクトの生成
app = FastAPI()

# 構成ファイルの読み込み
with open('config.yaml', 'r') as yml:
    config = yaml.load(yml, Loader=yaml.SafeLoader)

HOST = config['host']
PORT = config['port']
USER = config['user']
IDENTITYFILE = config['identityfile']
PASSPHRASE = config['passphrase']

# SSHクライアントオブジェクトの生成
sshclient = SSHClient(HOST, PORT, USER, IDENTITYFILE, PASSPHRASE)

@app.get('/pwd')
def pwd():
    successed, stdout = sshclient.execute('pwd')
    if successed:
        return {'cd': stdout.strip()}
    else:
        return {'error': stdout}


@app.get('/ls')
def ls():
    # $ ls
    # $   -a # 全てのファイルを表示(隠しファイルも含む | 「.」「..」は除く)
    # $   -p # ディレクトリには末尾に「/」を付与
    # $   -l # 詳細情報を表示
    successed, stdout = sshclient.execute('ls -Apl --full-time')
    if successed:
        result = jc.parse('ls', stdout)
        return result
    else:
        return {'error': stdout}
