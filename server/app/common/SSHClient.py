import paramiko

from common.Log import logging

class SSHClient:

    # クライアントオブジェクトの生成
    client = paramiko.SSHClient()

    # SSH接続に関する設定
    HOST: str = None
    PORT: int = None
    USER: str = None
    IDENTITYFILE: str = None
    PASSPHRASE: str = None

    def __init__(self, host: str, port: int, user: str, identityfile: str, passphrase: str):
        logging.info('以下の設定でSSHクライアントを生成します。')
        logging.info('HOST: {}'.format(host))
        logging.info('PORT: {}'.format(port))
        logging.info('USER: {}'.format(user))
        logging.info('IDENTITYFILE: {}'.format(identityfile))
        logging.info('PASSPHRASE: {}'.format(passphrase))

        # SSH接続の取扱いに関しては要検討
        self.HOST = host
        self.PORT = port
        self.USER = user
        self.IDENTITYFILE = identityfile
        self.PASSPHRASE = passphrase

        self.client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.client.connect(hostname=self.HOST, username=self.USER, port=self.PORT, key_filename=self.IDENTITYFILE, passphrase=self.PASSPHRASE)

    def execute(self, command: str):
        logging.info('以下のコマンドを実行します。')
        logging.info(command)
        stdin, stdout, stderr = self.client.exec_command(command)
        is_success = stdout.channel.recv_exit_status() == 0
        if is_success:
            return True, stdout.read().decode('utf-8')
        else:
            return False, stderr.read().decode('utf-8')

    def __del__(self):
        self.client.close()
