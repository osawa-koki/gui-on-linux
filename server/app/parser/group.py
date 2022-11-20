
def group(stdio):
    lines = stdio.strip().splitlines()
    result = []
    for line in lines:
        line = line.split(':')
        result.append({
            'name': line[0],
            'password': line[1],
            'gid': line[2],
            'members': line[3]
        })
    return result
