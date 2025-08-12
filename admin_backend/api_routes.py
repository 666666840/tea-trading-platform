from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/health')
def health():
    return jsonify({'status': 'ok', 'message': 'API服务正常'})

# 这里可以继续添加其他API接口 