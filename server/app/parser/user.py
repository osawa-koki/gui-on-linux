
def user(stdout):
    lines = stdout.strip().splitlines()
    result = []
    for line in lines:
        line = line.split(':')
        result.append({
            'name': line[0],
            'password': line[1],
            'uid': line[2],
            'gid': line[3],
            'comment': line[4],
            'home': line[5],
            'shell': line[6]
        })
    return result
