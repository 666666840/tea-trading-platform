from flask import Flask, jsonify, request, render_template, redirect, url_for, session, send_file
import datetime
import io
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'  # 用于 session

# 内容数据
content_data = {
    'recommend': [],
    'news': [],
    'art': [],
    'hot': []
}

# 市场数据
markets_data = [
    {'id': 1, 'name': '北京马连道茶叶市场', 'province': '北京', 'city': '北京', 'address': '马连道路11号', 'phone': '010-63346677'},
    {'id': 2, 'name': '上海天山茶城', 'province': '上海', 'city': '上海', 'address': '中山西路520号', 'phone': '021-62737000'},
    {'id': 3, 'name': '广州芳村茶叶市场', 'province': '广东', 'city': '广州', 'address': '芳村大道中508号', 'phone': '020-81502688'},
    {'id': 4, 'name': '杭州中国茶叶博物馆茶市', 'province': '浙江', 'city': '杭州', 'address': '龙井路双峰村', 'phone': '0571-87964221'},
    {'id': 5, 'name': '福州五里亭茶叶批发市场', 'province': '福建', 'city': '福州', 'address': '五里亭路18号', 'phone': '0591-83611234'}
]

# 新品到货数据
newarrivals_data = [
    {'id': 1, 'name': '特级铁观音', 'price': 168, 'category': '乌龙茶', 'origin': '福建安溪', 'description': '香气浓郁，回甘持久'},
    {'id': 2, 'name': '明前龙井', 'price': 288, 'category': '绿茶', 'origin': '浙江杭州', 'description': '鲜嫩清香，形美色绿'},
    {'id': 3, 'name': '金骏眉红茶', 'price': 398, 'category': '红茶', 'origin': '福建武夷山', 'description': '甘甜醇厚，汤色金黄'},
    {'id': 4, 'name': '陈年普洱', 'price': 199, 'category': '普洱茶', 'origin': '云南勐海', 'description': '陈香浓郁，越陈越香'},
    {'id': 5, 'name': '白毫银针', 'price': 328, 'category': '白茶', 'origin': '福建福鼎', 'description': '清淡甘甜，具有药香'}
]

# 供求信息数据
supplies_data = []

# 清仓数据
clearance_data = []

# 租赁数据  
rental_data = []

# 仪表板、市场、用户、日志模拟数据
MARKETS = [
    {'id': 1, 'name': '北京马连道茶叶市场', 'province': '北京', 'city': '北京', 'address': '马连道路11号', 'phone': '010-63346677'},
    {'id': 2, 'name': '上海天山茶城', 'province': '上海', 'city': '上海', 'address': '中山西路520号', 'phone': '021-62737000'},
    {'id': 3, 'name': '广州芳村茶叶市场', 'province': '广东', 'city': '广州', 'address': '芳村大道中508号', 'phone': '020-81502688'},
    {'id': 4, 'name': '杭州中国茶叶博物馆茶市', 'province': '浙江', 'city': '杭州', 'address': '龙井路双峰村', 'phone': '0571-87964221'},
    {'id': 5, 'name': '福州五里亭茶叶批发市场', 'province': '福建', 'city': '福州', 'address': '五里亭路18号', 'phone': '0591-83611234'}
]
USERS = [
    {'id': 1, 'username': 'admin', 'role': '超级管理员', 'status': '正常'},
    {'id': 2, 'username': 'dataadmin', 'role': '数据管理员', 'status': '正常'},
    {'id': 3, 'username': 'auditor', 'role': '商户审核员', 'status': '正常'}
]
LOGS = [
    {"time": "2025-07-10 17:12:38", "user_id": 1, "action": "login", "desc": "用户 admin 登录成功", "ip": "127.0.0.1", "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."},
    {"time": "2025-07-10 17:12:18", "user_id": 18, "action": "logout", "desc": "用户 dataadmin 登出", "ip": "127.0.0.1", "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."},
    {"time": "2025-07-10 17:12:07", "user_id": 18, "action": "login", "desc": "用户 dataadmin 登录成功", "ip": "127.0.0.1", "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."}
]

from config import get_config

# 获取配置
config = get_config()

# 管理员账户配置
USERS = {
    config.ADMIN_USERNAME: {'password': config.ADMIN_PASSWORD, 'role': '超级管理员'},
    config.DATA_ADMIN_USERNAME: {'password': config.DATA_ADMIN_PASSWORD, 'role': '数据管理员'},
    'auditor': {'password': 'auditor123', 'role': '商户审核员'}
}

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'message': '茶叶一点通API服务正常运行，欢迎使用'})

@app.route('/status')
def status():
    return jsonify({'status': 'healthy', 'service': '茶叶一点通API', 'version': '1.0.0'})

@app.route('/index')
def index():
    username = session.get('username')
    role = session.get('role')
    if not username:
        return redirect(url_for('login'))
    return render_template('index.html', username=username, role=role)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = USERS.get(username)
        if user and user['password'] == password:
            session['username'] = username
            session['role'] = user['role']
            return redirect(url_for('index'))
        else:
            error = '用户名或密码错误'
    return render_template('login.html', error=error)

# 内容相关API
@app.route('/api/content')
def get_content():
    t = request.args.get('type', 'recommend')
    if t in content_data:
        return jsonify({'status': 'success', 'data': content_data[t]})
    return jsonify({'status': 'error', 'message': '无效的内容类型'})

@app.route('/api/content/all')
def get_all_content():
    all_data = []
    for items in content_data.values():
        all_data.extend(items)
    return jsonify({'status': 'success', 'data': all_data})

# 市场相关API
@app.route('/api/markets')
def get_markets():
    province = request.args.get('province')
    if province:
        filtered_markets = [m for m in markets_data if m['province'] == province]
        return jsonify({'status': 'success', 'data': filtered_markets})
    return jsonify({'status': 'success', 'data': markets_data})

@app.route('/api/markets/<int:market_id>')
def get_market_detail(market_id):
    market = next((m for m in markets_data if m['id'] == market_id), None)
    if market:
        return jsonify({'status': 'success', 'data': market})
    return jsonify({'status': 'error', 'message': '市场不存在'})

# 新品到货API
@app.route('/api/newarrivals')
def get_newarrivals():
    category = request.args.get('category')
    if category:
        filtered_items = [item for item in newarrivals_data if item['category'] == category]
        return jsonify({'status': 'success', 'data': filtered_items})
    return jsonify({'status': 'success', 'data': newarrivals_data})

@app.route('/api/newarrivals/<int:item_id>')
def get_newarrival_detail(item_id):
    item = next((item for item in newarrivals_data if item['id'] == item_id), None)
    if item:
        return jsonify({'status': 'success', 'data': item})
    return jsonify({'status': 'error', 'message': '商品不存在'})

# 供求信息API
@app.route('/api/supplies')
def get_supplies():
    supply_type = request.args.get('type')
    if supply_type:
        filtered_supplies = [s for s in supplies_data if s['type'] == supply_type]
        return jsonify({'status': 'success', 'data': filtered_supplies})
    return jsonify({'status': 'success', 'data': supplies_data})

# 清仓特价API
@app.route('/api/clearance')
def get_clearance():
    return jsonify({'status': 'success', 'data': clearance_data})

# 租赁信息API
@app.route('/api/rental')
def get_rental():
    return jsonify({'status': 'success', 'data': rental_data})

@app.route('/')
def home():
    return redirect(url_for('dashboard'))

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', active='dashboard', username='admin')

@app.route('/market')
def market():
    return render_template('market.html', active='market', username='admin', markets=MARKETS)

@app.route('/user')
def user():
    return render_template('user.html', active='user', username='admin', users=USERS)

@app.route('/logs')
def logs():
    return render_template('logs.html', active='logs', username='admin', logs=LOGS)

@app.route('/export_logs')
def export_logs():
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerow(["时间", "用户ID", "操作类型", "描述", "IP地址", "用户代理"])
    for log in LOGS:
        cw.writerow([log['time'], log['user_id'], log['action'], log['desc'], log['ip'], log['ua']])
    output = io.BytesIO()
    output.write(si.getvalue().encode('utf-8'))
    output.seek(0)
    return send_file(output, mimetype='text/csv', as_attachment=True, download_name='logs.csv')

@app.route('/clear_logs')
def clear_logs():
    LOGS.clear()
    return redirect(url_for('logs'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)