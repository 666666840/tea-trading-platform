import os
import time
from datetime import datetime

# 数据库配置
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '3306')
DB_NAME = os.getenv('DB_NAME', 'tea_db')
BACKUP_DIR = os.getenv('BACKUP_DIR', './db_backups')

if not os.path.exists(BACKUP_DIR):
    os.makedirs(BACKUP_DIR)

def backup():
    now = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = os.path.join(BACKUP_DIR, f'{DB_NAME}_backup_{now}.sql')
    cmd = f"mysqldump -h{DB_HOST} -P{DB_PORT} -u{DB_USER} -p{DB_PASSWORD} {DB_NAME} > {backup_file}"
    print(f"[备份] {cmd}")
    os.system(cmd)
    print(f"[完成] 数据库已备份到: {backup_file}")

if __name__ == '__main__':
    backup()
    # 可配合计划任务/定时器实现定时备份 