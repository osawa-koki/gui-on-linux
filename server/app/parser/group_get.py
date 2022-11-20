
def group_get(stdio):
    lines = stdio.strip().splitlines()
    result = []
    for line in lines:
        line = line.split(':')
        users = line[3].split(',')
        result.append({
            'name': line[0],
            'password': line[1],
            'gid': line[2],
            'members': users
        })
    return result
