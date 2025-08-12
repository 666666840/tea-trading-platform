import os
import sys
import subprocess
import time
import requests
import shutil

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

# 3. 启动ngrok并获取公网域名
print('【3】启动 ngrok 并获取公网 https 域名...')
ngrok_cmd = f'{NGROK_BIN} http 5001 --log=stdout > ngrok.log 2>&1 &'
if os.name == 'nt':
    ngrok_cmd = f'start /B {NGROK_BIN} http 5001 > ngrok.log 2>&1'
os.system(ngrok_cmd)
time.sleep(5)
try:
    tunnels = requests.get('http://localhost:4040/api/tunnels').json()['tunnels']
    public_url = [t['public_url'] for t in tunnels if t['proto'] == 'https'][0]
    print(f'  - 公网 https 域名: {public_url}')
except Exception as e:
    print('  - 获取 ngrok 域名失败，请手动检查 ngrok 是否正常启动。')
    public_url = input('请手动输入你的公网 https 域名: ')
print()

# 4. 生成/更新 .env 配置
print('【4】生成/更新 .env 配置文件...')
def ask_env(key, prompt, default=''):
    val = input(f'{prompt}（当前: {os.getenv(key, default)}）: ').strip()
    return val or os.getenv(key, default) or default

appid = ask_env('WECHAT_APPID', '请输入微信开放平台AppID')
secret = ask_env('WECHAT_SECRET', '请输入微信开放平台AppSecret')
redirect_uri = f'{public_url}/wechat/callback'

env_lines = [
    f'WECHAT_APPID={appid}',
    f'WECHAT_SECRET={secret}',
    f'WECHAT_REDIRECT_URI={redirect_uri}'
]
with open(ENV_FILE, 'w', encoding='utf-8') as f:
    f.write('\n'.join(env_lines) + '\n')
print('  - .env 配置已生成/更新')
print()

# 5. 启动 Flask 后端服务
print('【5】启动 Flask 后端服务...')
flask_cmd = f'{sys.executable} {APP_FILE}'
if os.name == 'nt':
    flask_cmd = f'start /B {sys.executable} {APP_FILE}'
os.system(flask_cmd)
print('  - Flask 后端已启动，请在浏览器访问:')
print(f'    {public_url}/login')
print()

print('==== 自动化环境配置完成！请用微信扫码体验认证与通知全流程。====') 