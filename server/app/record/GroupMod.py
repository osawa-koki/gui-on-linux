from pydantic import BaseModel

class GroupModStruct(BaseModel):
    gid: int = None
    new_name: str = None

    def to_command(self, groupname):
        command = 'groupmod'
        if self.gid:
            command += ' -g {}'.format(self.gid)
        if self.new_name:
            command += ' -n {}'.format(self.new_name)
        command += ' {}'.format(groupname)
        return command
