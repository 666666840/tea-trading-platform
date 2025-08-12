import os
import sys
import subprocess
import time
import requests
import shutil
import webbrowser

REQUIRED_PACKAGES = ['flask', 'requests', 'python-dotenv']
NGROK_BIN = 'ngrok.exe' if os.name == 'nt' else 'ngrok'
NGROK_URL = 'https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip'
ENV_FILE = os.path.join('admin-backend', '.env')
APP_FILE = os.path.join('admin-backend', 'app.py')

# 1. 检查并安装依赖
print('【1】检查依赖包...')
for pkg in REQUIRED_PACKAGES:
    try:
        __import__(pkg)
        print(f'  - {pkg} 已安装')
    except ImportError:
        print(f'  - 未安装 {pkg}，正在自动安装...')
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', pkg])
print('依赖包检查完成。\n')

# 2. 检查ngrok
print('【2】检查 ngrok...')
if not shutil.which(NGROK_BIN):
    print('  - 未检测到 ngrok，正在下载...')
    import zipfile
    import urllib.request
    zip_path = 'ngrok.zip'
    urllib.request.urlretrieve(NGROK_URL, zip_path)
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall('.')
    os.remove(zip_path)
    print('  - ngrok 下载并解压完成')
else:
    print('  - ngrok 已安装')
print()

# 3. 启动ngrok（如未启动）
def is_ngrok_running():
    try:
        r = requests.get('http://localhost:4040/api/tunnels', timeout=2)
        return r.status_code == 200
    except:
        return False

if not is_ngrok_running():
    print('  - 启动 ngrok...')
    ngrok_cmd = f'{NGROK_BIN} http 5001 --log=stdout > ngrok.log 2>&1 &'
    if os.name == 'nt':
        ngrok_cmd = f'start /B {NGROK_BIN} http 5001 > ngrok.log 2>&1'
    os.system(ngrok_cmd)
    time.sleep(5)
else:
    print('  - ngrok 已在运行')

# 4. 获取ngrok公网域名
print('【3】获取 ngrok 公网 https 域名...')
public_url = None
for _ in range(10):
    try:
        tunnels = requests.get('http://localhost:4040/api/tunnels').json()['tunnels']
        public_url = [t['public_url'] for t in tunnels if t['proto'] == 'https'][0]
        break
    except Exception:
        time.sleep(1)
if public_url:
    print(f'  - 公网 https 域名: {public_url}')
else:
    print('  - 获取 ngrok 域名失败，请手动检查 ngrok 是否正常启动。')
    public_url = input('请手动输入你的公网 https 域名: ')
print()

# 5. 检查.env配置
print('【4】检查 .env 配置...')
if not os.path.exists(ENV_FILE):
    print('  - 未检测到 .env 文件，请先运行 auto_setup.py 初始化环境！')
    sys.exit(1)
else:
    print('  - .env 配置已存在')
print()

# 6. 启动 Flask 后端（如未启动）
def is_flask_running():
    try:
        r = requests.get('http://127.0.0.1:5001/login', timeout=2)
        return r.status_code == 200 or r.status_code == 302
    except:
        return False

if not is_flask_running():
    print('  - 启动 Flask 后端服务...')
    flask_cmd = f'{sys.executable} {APP_FILE}'
    if os.name == 'nt':
        flask_cmd = f'start /B {sys.executable} {APP_FILE}'
    os.system(flask_cmd)
    time.sleep(3)
else:
    print('  - Flask 后端已在运行')

# 7. 自动打开浏览器访问后台页面
print('【5】自动打开浏览器...')
webbrowser.open(f'{public_url}/login')
print(f'  - 已在浏览器打开: {public_url}/login')
print('\n==== 一键启动全部服务完成！====') 