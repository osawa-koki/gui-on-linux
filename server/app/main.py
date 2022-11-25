# FastAPIモジュール
from fastapi import FastAPI, status
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

# Python全般モジュール
import yaml
import jc

# 独自モジュール
from common.Log import logging
from common.SSHClient import SSHClient
from common.sudo import sudo
from parser.Parser import Parser

# 構造体モジュール
from record.UserAdd import UserAddStruct
from record.UserMod import UserModStruct
from record.UserDel import UserDelStruct
from record.GroupAdd import GroupAddStruct
from record.GroupMod import GroupModStruct

# CORS対応
from fastapi.middleware.cors import CORSMiddleware

# FastAPIオブジェクトの生成
app = FastAPI()

# CORS対応
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get('/api/helloworld')
def helloworld():
    return 'Hello World'

@app.get('/api/pwd')
def pwd():
    # $ pwd
    successed, stdout = sshclient.execute('pwd')
    if successed:
        return {'cd': stdout.strip()}
    else:
        return {'error': stdout}


@app.get('/api/ls')
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

@app.put('/api/cd/{path:path}')
def cd(path: str):
    # $ cd {path}
    successed, stdout = sshclient.execute(f'cd "{path}"; pwd')
    if successed:
        sshclient.cd = stdout.strip()
        return {'cd': sshclient.cd}
    else:
        return {'error': stdout}

@app.get('/api/cat/{path:path}')
def cat(path: str):
    # $ cat {path}
    successed, stdout = sshclient.execute(f'cat "{path}"')
    if successed:
        return {'content': stdout}
    else:
        return {'error': stdout}

@app.get('/api/user')
def user_get():
    # $ cat /etc/passwd
    successed, stdout = sshclient.execute('cat /etc/passwd')
    if successed:
        return Parser.user_get(stdout)
    else:
        return {'error': stdout}

@app.post('/api/user', status_code=status.HTTP_201_CREATED)
def user_post(user_add_struct: UserAddStruct):
    # sudo
    # $ useradd
    successed, stdout = sshclient.execute(sudo(user_add_struct.to_command()))
    if successed:
        return {}
    else:
        return {'error': stdout}

@app.put('/api/user/{username}')
def user_put(username: str, user_mod_struct: UserModStruct):
    # sudo
    # $ usermod
    successed, stdout = sshclient.execute(sudo(user_mod_struct.to_command(username)))
    if successed:
        return {}
    else:
        return {'error': stdout}

@app.delete('/api/user/{username}', status_code=status.HTTP_204_NO_CONTENT)
def user_delete(username: str, user_del_struct: UserDelStruct):
    # sudo
    # $ userdel
    successed, stdout = sshclient.execute(sudo(user_del_struct.to_command(username)))
    if successed:
        return {}
    else:
        return {'error': stdout}

@app.get('/api/group')
def group_get():
    # sudo
    # $ cat /etc/group
    successed, stdout = sshclient.execute(sudo('cat /etc/group'))
    if successed:
        return Parser.group_get(stdout)
    else:
        return {'error': stdout}

@app.post('/api/group/{groupname}', status_code=status.HTTP_201_CREATED)
def group_post(groupname: str, group_add_struct: GroupAddStruct):
    # sudo
    # $ groupadd
    successed, stdout = sshclient.execute(sudo(group_add_struct.to_command(groupname)))
    if successed:
        return {}
    else:
        return {'error': stdout}

@app.put('/api/group/{groupname}')
def group_put(groupname: str, group_mod_struct: GroupModStruct):
    # sudo
    # $ groupmod
    successed, stdout = sshclient.execute(sudo(group_mod_struct.to_command(groupname)))
    if successed:
        return {}
    else:
        return {'error': stdout}

@app.delete('/api/group/{groupname}', status_code=status.HTTP_204_NO_CONTENT)
def group_delete(groupname: str):
    # sudo
    # $ groupdel
    successed, stdout = sshclient.execute(sudo('groupdel {}'.format(groupname)))
    if successed:
        return {}
    else:
        return {'error': stdout}
