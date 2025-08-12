from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok', 'message': 'API服务正常'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)