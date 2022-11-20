from pydantic import BaseModel

class GroupAddStruct(BaseModel):
    gid: int = None

    def to_command(self, groupname):
        command = 'groupadd'
        if self.gid:
            command += ' -g {}'.format(self.gid)
        command += ' {}'.format(groupname)
        return command
