import os
import sys
import subprocess
import socket
import importlib.util
import time

REQUIRED_PACKAGES = [
    'flask', 'pymysql', 'cryptography'
]

TEMPLATES = ['login.html', 'base.html']
TEMPLATES_DIR = os.path.join('admin-backend', 'templates')
APP_FILE = 'app.py'
PORT = 5001


def check_and_install_packages():
    print('【1】检查依赖包...')
    for pkg in REQUIRED_PACKAGES:
        if importlib.util.find_spec(pkg) is None:
            print(f'  - 未安装 {pkg}，正在自动安装...')
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', pkg])
        else:
            print(f'  - {pkg} 已安装')
    print('依赖包检查完成。\n')

def check_port(port):
    print(f'【2】检查端口 {port} 是否被占用...')
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.bind(('127.0.0.1', port))
        s.close()
        print(f'  - 端口 {port} 可用')
        return True
    except OSError:
        print(f'  - 端口 {port} 已被占用，请关闭占用该端口的程序或更换端口！')
        return False

def check_templates():
    print('【3】检查模板文件...')
    missing = []
    for tpl in TEMPLATES:
        path = os.path.join(TEMPLATES_DIR, tpl)
        if not os.path.exists(path):
            print(f'  - 缺少模板文件: {path}')
            missing.append(tpl)
        else:
            print(f'  - 模板文件存在: {tpl}')
    if missing:
        print('  请补充缺失的模板文件，否则部分页面会 500 错误！')
    else:
        print('模板文件检查通过。')
    print()

def check_app_port():
    print('【4】检查 app.py 是否指定了端口...')
    if not os.path.exists(APP_FILE):
        print('  - 未找到 app.py，请确认后端主程序文件名。')
        return
    with open(APP_FILE, encoding='utf-8') as f:
        content = f.read()
    if f'port={PORT}' in content or f'port = {PORT}' in content:
        print(f'  - app.py 已指定端口 {PORT}')
    else:
        print(f'  - app.py 未指定端口 {PORT}，请在 app.run() 里加上 port={PORT}')
    print()

def check_mysql():
    print('【5】检查数据库连接...')
    try:
        import pymysql
        # 这里假设你的数据库配置在环境变量或 config.py
        import importlib
        config = None
        if os.path.exists('config.py'):
            config = importlib.util.spec_from_file_location('config', 'config.py')
            config = importlib.util.module_from_spec(config)
            config.__spec__.loader.exec_module(config)
        db_host = getattr(config, 'DB_HOST', 'localhost') if config else 'localhost'
        db_user = getattr(config, 'DB_USER', 'root') if config else 'root'
        db_pass = getattr(config, 'DB_PASSWORD', '') if config else ''
        db_name = getattr(config, 'DB_NAME', 'test') if config else 'test'
        conn = pymysql.connect(host=db_host, user=db_user, password=db_pass, database=db_name, connect_timeout=3)
        conn.close()
        print('  - 数据库连接正常')
    except Exception as e:
        print(f'  - 数据库连接失败：{e}')
        print('    请检查 config.py 或环境变量中的数据库配置，确保数据库服务已启动。')
    print()

def main():
    print('==== Flask 后端自动检测与修复工具 ====' )
    check_and_install_packages()
    check_port(PORT)
    check_templates()
    check_app_port()
    check_mysql()
    print('==== 检查完毕！如有红色提示请按建议修复，再重启后端服务。====')
    time.sleep(2)

if __name__ == '__main__':
    main() 