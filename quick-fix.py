from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 模拟数据
content_data = {
    'recommend': [],
    'news': [],
    'art': [],
    'hot': []
}

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'message': '本地茶叶API服务运行正常'})

@app.route('/api/content')
def get_content():
    content_type = request.args.get('type', 'recommend')
    if content_type in content_data:
        return jsonify({
            'status': 'success',
            'data': content_data[content_type]
        })
    return jsonify({'status': 'error', 'message': '无效的内容类型'})

@app.route('/api/content/all')
def get_all_content():
    all_data = []
    for items in content_data.values():
        all_data.extend(items)
    return jsonify({
        'status': 'success',
        'data': all_data
    })

if __name__ == '__main__':
    print("🚀 本地茶叶API服务启动中...")
    print("📍 访问地址：http://localhost:3000")
    print("🔍 健康检查：http://localhost:3000/health")
    app.run(host='0.0.0.0', port=3000, debug=True) 