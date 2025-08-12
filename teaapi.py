from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = {
    'recommend': [],
    'news': [],
    'art': [],
    'hot': []
}

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'message': '茶叶API服务运行正常'})

@app.route('/api/content')
def get_content():
    t = request.args.get('type', 'recommend')
    if t in data:
        return jsonify({'status': 'success', 'data': data[t]})
    return jsonify({'status': 'error', 'message': '无效的内容类型'})

@app.route('/api/content/all')
def get_all():
    all_data = []
    for items in data.values():
        all_data.extend(items)
    return jsonify({'status': 'success', 'data': all_data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=False) 