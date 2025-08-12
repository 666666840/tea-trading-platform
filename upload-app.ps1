# 创建简化版的app.py文件
@"
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
data = {
'recommend': [{'id': 1, 'title': '推荐：优质铁观音新品上市', 'content': '来自安溪的优质铁观音，香气浓郁，口感醇厚...', 'create_time': '2024-01-15 10:00:00'}],
'news': [{'id': 2, 'title': '茶讯：春茶采摘季即将开始', 'content': '随着气温回暖，各大茶区即将迎来春茶采摘季...', 'create_time': '2024-01-15 09:00:00'}],
'art': [{'id': 3, 'title': '茶艺：功夫茶的冲泡技巧', 'content': '功夫茶是中国传统茶艺的精髓，讲究水温、时间...', 'create_time': '2024-01-15 08:00:00'}],
'hot': [{'id': 4, 'title': '热点：茶叶市场价格走势分析', 'content': '今年茶叶市场呈现稳中有升的趋势...', 'create_time': '2024-01-15 07:00:00'}]
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
"@ | Out-File -FilePath "simple-app.py" -Encoding utf8

Write-Host "✅ API文件已创建：simple-app.py"
Write-Host "🔄 现在请通过宝塔面板文件管理："
Write-Host "1. 打开 /www/wwwroot/tea-api/ 目录"
Write-Host "2. 上传本地的 simple-app.py 文件"
Write-Host "3. 重命名为 app.py"
Write-Host "4. 在终端执行: cd /www/wwwroot/tea-api && nohup python3 app.py > server.log 2>&1 &" 