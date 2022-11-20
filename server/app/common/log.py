import sys, os
from datetime import datetime
import logging
from logging import StreamHandler, FileHandler, Formatter
from logging import INFO, DEBUG, NOTSET

# ロガー

# ストリームハンドラの設定
stream_handler = StreamHandler()
stream_handler.setLevel(DEBUG)
stream_handler.setFormatter(Formatter("%(asctime)s [%(levelname)s]: %(message)s"))

# 保存先の有無チェック
if not os.path.isdir('./Log'):
    os.makedirs('./Log', exist_ok=True)

# ファイルハンドラの設定
file_handler = FileHandler(f"./Log/{datetime.now():%Y%m%d%H%M%S}.log", encoding='utf-8')
file_handler.setLevel(INFO)
file_handler.setFormatter(Formatter("%(asctime)s [%(levelname)s]: %(message)s"))

# ルートロガーの設定
logging.basicConfig(level=NOTSET, handlers=[stream_handler, file_handler])
