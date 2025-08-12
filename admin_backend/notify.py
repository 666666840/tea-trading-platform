import smtplib
from email.mime.text import MIMEText
from email.header import Header
import os
import requests

def send_wechat_notify(openid, content):
    appid = os.getenv('WECHAT_APPID', '你的AppID')
    secret = os.getenv('WECHAT_SECRET', '你的AppSecret')
    # 获取 access_token
    token_url = f'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appid}&secret={secret}'
    token_resp = requests.get(token_url).json()
    access_token = token_resp.get('access_token')
    if not access_token:
        return False
    # 发送模板消息
    msg_url = f'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={access_token}'
    data = {
        'touser': openid,
        'msgtype': 'text',
        'text': {'content': content}
    }
    resp = requests.post(msg_url, json=data).json()
    return resp.get('errcode') == 0

def send_error_mail(subject, content):
    mail_host = os.getenv('MAIL_HOST', 'smtp.qq.com')
    mail_user = os.getenv('MAIL_USER', '')
    mail_pass = os.getenv('MAIL_PASS', '')
    sender = os.getenv('MAIL_SENDER', mail_user)
    receivers = os.getenv('MAIL_RECEIVERS', '').split(',')
    msg = MIMEText(content, 'plain', 'utf-8')
    msg['From'] = Header(sender)
    msg['To'] = Header(','.join(receivers))
    msg['Subject'] = Header(subject, 'utf-8')
    try:
        smtpObj = smtplib.SMTP_SSL(mail_host, 465)
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receivers, msg.as_string())
        smtpObj.quit()
        print('邮件发送成功')
    except Exception as e:
        print('邮件发送失败:', e) 