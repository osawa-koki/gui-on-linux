
# 静的メソッドを疑似的に再現するためのクラス
# 同ディレクトリ内にある各種パーサー関数をまとめて呼び出す
class Parser():
    from parser.user_get import user_get
    from parser.group_get import group_get

