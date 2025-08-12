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
    return jsonify({
        'status': 'ok', 
        'message': '茶叶API服务运行正常',
        'version': '1.0.0',
        'timestamp': '2024-01-15 13:00:00'
    })

@app.route('/api/content')
def get_content():
    content_type = request.args.get('type', 'recommend')
    if content_type in content_data:
        return jsonify({
            'status': 'success',
            'type': content_type,
            'count': len(content_data[content_type]),
            'data': content_data[content_type]
        })
    return jsonify({
        'status': 'error', 
        'message': f'无效的内容类型: {content_type}',
        'available_types': list(content_data.keys())
    })

@app.route('/api/content/all')
def get_all_content():
    all_data = []
    for content_type, items in content_data.items():
        for item in items:
            item_copy = item.copy()
            item_copy['type'] = content_type
            all_data.append(item_copy)
    
    # 按时间排序
    all_data.sort(key=lambda x: x['create_time'], reverse=True)
    
    return jsonify({
        'status': 'success',
        'total_count': len(all_data),
        'data': all_data
    })

@app.route('/api/types')
def get_types():
    return jsonify({
        'status': 'success',
        'types': [
            {'key': 'recommend', 'name': '推荐', 'count': len(content_data['recommend'])},
            {'key': 'news', 'name': '茶讯', 'count': len(content_data['news'])},
            {'key': 'art', 'name': '茶艺', 'count': len(content_data['art'])},
            {'key': 'hot', 'name': '热点', 'count': len(content_data['hot'])}
        ]
    })

if __name__ == '__main__':
    print("🍃 茶叶内容API服务启动中...")
    print("📍 服务地址: http://0.0.0.0:3000")
    print("🔍 健康检查: http://0.0.0.0:3000/health")
    print("📝 API文档:")
    print("   - GET /health - 健康检查")
    print("   - GET /api/content?type=[recommend|news|art|hot] - 获取指定类型内容")
    print("   - GET /api/content/all - 获取所有内容")
    print("   - GET /api/types - 获取内容类型列表")
    print("=" * 50)
    app.run(host='0.0.0.0', port=3000, debug=False) 