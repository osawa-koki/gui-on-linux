# FastAPIモジュール
from fastapi import FastAPI

# Python全般モジュール
import yaml

# 独自モジュール
from common.log import logging
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
client = SSHClient(HOST, PORT, USER, IDENTITYFILE, PASSPHRASE)

@app.get("/pwd")
def pwd():
    return client.execute('pwd')

@app.get("/ls")
def ls():
    return client.execute('ls')
