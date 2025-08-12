import os
import requests
from flask import Blueprint, session, redirect, request, url_for, jsonify

WECHAT_APPID = os.getenv('WECHAT_APPID', '你的AppID')
WECHAT_SECRET = os.getenv('WECHAT_SECRET', '你的AppSecret')
WECHAT_REDIRECT_URI = os.getenv('WECHAT_REDIRECT_URI', 'https://xxxx.ngrok.io/wechat/callback')

wechat_auth = Blueprint('wechat_auth', __name__)

@wechat_auth.route('/wechat/login')
def wechat_login():
    # 生成微信扫码登录二维码
    state = os.urandom(8).hex()
    session['wechat_oauth_state'] = state
    oauth_url = (
        f'https://open.weixin.qq.com/connect/qrconnect?appid={WECHAT_APPID}'
        f'&redirect_uri={WECHAT_REDIRECT_URI}'
        f'&response_type=code&scope=snsapi_login&state={state}#wechat_redirect'
    )
    return redirect(oauth_url)

@wechat_auth.route('/wechat/callback')
def wechat_callback():
    code = request.args.get('code')
    state = request.args.get('state')
    if not code or state != session.get('wechat_oauth_state'):
        return '扫码失败或非法请求', 400
    # 获取 access_token 和 openid
    token_url = (
        f'https://api.weixin.qq.com/sns/oauth2/access_token?appid={WECHAT_APPID}'
        f'&secret={WECHAT_SECRET}&code={code}&grant_type=authorization_code'
    )
    resp = requests.get(token_url).json()
    openid = resp.get('openid')
    if not openid:
        return '微信认证失败', 400
    # 只允许绑定指定 openid
    allowed_openid = os.getenv('ADMIN_WECHAT_OPENID', None)
    if allowed_openid and openid != allowed_openid:
        return '非管理员本人扫码，禁止操作', 403
    session['wechat_authenticated'] = True
    session['wechat_openid'] = openid
    return redirect(url_for('profile'))

@wechat_auth.route('/wechat/check')
def wechat_check():
    # 前端轮询扫码状态
    return jsonify({'authenticated': session.get('wechat_authenticated', False)}) 