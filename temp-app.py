from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 妯℃嫙鏁版嵁
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
        'message': '鑼跺彾API鏈嶅姟杩愯姝ｅ父',
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
        'message': f'鏃犳晥鐨勫唴瀹圭被鍨? {content_type}',
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
    
    # 鎸夋椂闂存帓搴?
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
            {'key': 'recommend', 'name': '鎺ㄨ崘', 'count': len(content_data['recommend'])},
            {'key': 'news', 'name': '鑼惰', 'count': len(content_data['news'])},
            {'key': 'art', 'name': '鑼惰壓', 'count': len(content_data['art'])},
            {'key': 'hot', 'name': '鐑偣', 'count': len(content_data['hot'])}
        ]
    })

if __name__ == '__main__':
    print("馃崈 鑼跺彾鍐呭API鏈嶅姟鍚姩涓?..")
    print("馃搷 鏈嶅姟鍦板潃: http://0.0.0.0:3000")
    print("馃攳 鍋ュ悍妫€鏌? http://0.0.0.0:3000/health")
    print("馃摑 API鏂囨。:")
    print("   - GET /health - 鍋ュ悍妫€鏌?)
    print("   - GET /api/content?type=[recommend|news|art|hot] - 鑾峰彇鎸囧畾绫诲瀷鍐呭")
    print("   - GET /api/content/all - 鑾峰彇鎵€鏈夊唴瀹?)
    print("   - GET /api/types - 鑾峰彇鍐呭绫诲瀷鍒楄〃")
    print("=" * 50)
    app.run(host='0.0.0.0', port=3000, debug=False)
