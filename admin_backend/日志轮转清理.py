import os
import time
from datetime import datetime, timedelta

LOG_DIR = os.getenv('LOG_DIR', './logs')
MAX_LOG_SIZE_MB = int(os.getenv('MAX_LOG_SIZE_MB', 20))  # 单个日志最大20MB
MAX_LOG_DAYS = int(os.getenv('MAX_LOG_DAYS', 30))  # 日志保留30天

if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

def rotate_and_clean_logs():
    now = datetime.now()
    for fname in os.listdir(LOG_DIR):
        fpath = os.path.join(LOG_DIR, fname)
        if not os.path.isfile(fpath):
            continue
        # 按大小轮转
        if os.path.getsize(fpath) > MAX_LOG_SIZE_MB * 1024 * 1024:
            bak_name = fpath + '.' + now.strftime('%Y%m%d_%H%M%S')
            os.rename(fpath, bak_name)
            open(fpath, 'w').close()
        # 按日期清理
        mtime = datetime.fromtimestamp(os.path.getmtime(fpath))
        if (now - mtime).days > MAX_LOG_DAYS:
            os.remove(fpath)
            print(f'已删除过期日志: {fpath}')

if __name__ == '__main__':
    rotate_and_clean_logs() 