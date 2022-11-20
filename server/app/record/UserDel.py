from pydantic import BaseModel

class UserDelStruct(BaseModel):

    force: bool = False
    remove: bool = False

    def to_command(self, username):
        command = 'userdel'
        if self.force:
            command += ' -f'
        if self.remove:
            command += ' -r'
        command += ' {}'.format(username)
        return command

