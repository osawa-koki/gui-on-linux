from pydantic import BaseModel

class UserModStruct(BaseModel):
    password: str = None
    uid: int = None
    gid: int = None
    comment: str = None
    homedir: str = None
    shell: str = None
    create_home: bool = True
    home_dir: str = None

    def to_command(self, username):
        command = 'usermod'
        if self.password:
            command += ' -p {}'.format(self.password)
        if self.uid:
            command += ' -u {}'.format(self.uid)
        if self.gid:
            command += ' -g {}'.format(self.gid)
        if self.comment:
            command += ' -c {}'.format(self.comment)
        if self.homedir:
            command += ' -d {}'.format(self.homedir)
        if self.shell:
            command += ' -s {}'.format(self.shell)
        if not self.create_home:
            command += ' -m'
        command += ' {}'.format(username)
        return command
