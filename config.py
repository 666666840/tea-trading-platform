import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

class Config:
    """应用配置类"""
    
    # 基础配置
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    
    # 数据库配置
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///tea_platform.db')
    
    # 管理员账户配置
    ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')
    DATA_ADMIN_USERNAME = os.getenv('DATA_ADMIN_USERNAME', 'dataadmin')
    DATA_ADMIN_PASSWORD = os.getenv('DATA_ADMIN_PASSWORD', 'dataadmin123')
    
    # SMTP邮件配置
    SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.qq.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
    NOTIFICATION_EMAIL = os.getenv('NOTIFICATION_EMAIL', 'notifications@tea-platform.com')
    
    # 短信配置
    SMS_API_KEY = os.getenv('SMS_API_KEY', '')
    SMS_SECRET = os.getenv('SMS_SECRET', '')
    
    # 微信小程序配置
    WECHAT_APPID = os.getenv('WECHAT_APPID', '')
    WECHAT_SECRET = os.getenv('WECHAT_SECRET', '')
    
    # 第三方服务配置
    ALIYUN_ACCESS_KEY = os.getenv('ALIYUN_ACCESS_KEY', '')
    ALIYUN_SECRET_KEY = os.getenv('ALIYUN_SECRET_KEY', '')
    
    # 文件上传配置
    MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', '10485760'))
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    
    # 安全配置
    PASSWORD_MIN_LENGTH = int(os.getenv('PASSWORD_MIN_LENGTH', '8'))
    SESSION_TIMEOUT = int(os.getenv('SESSION_TIMEOUT', '3600'))
    MAX_LOGIN_ATTEMPTS = int(os.getenv('MAX_LOGIN_ATTEMPTS', '5'))
    LOCKOUT_DURATION = int(os.getenv('LOCKOUT_DURATION', '1800'))
    
    # 系统配置
    SITE_NAME = os.getenv('SITE_NAME', '茶叶交易平台')
    SITE_DESCRIPTION = os.getenv('SITE_DESCRIPTION', '专业的茶叶行业交易平台')
    CONTACT_EMAIL = os.getenv('CONTACT_EMAIL', 'contact@tea-platform.com')
    CONTACT_PHONE = os.getenv('CONTACT_PHONE', '400-123-4567')
    COMPANY_ADDRESS = os.getenv('COMPANY_ADDRESS', '北京市朝阳区茶叶大厦')
    ICP_NUMBER = os.getenv('ICP_NUMBER', '京ICP备12345678号')

class DevelopmentConfig(Config):
    """开发环境配置"""
    DEBUG = True
    FLASK_ENV = 'development'

class ProductionConfig(Config):
    """生产环境配置"""
    DEBUG = False
    FLASK_ENV = 'production'
    
    # 生产环境必须设置安全的SECRET_KEY
    SECRET_KEY = os.getenv('SECRET_KEY')
    if not SECRET_KEY or SECRET_KEY == 'dev-secret-key-change-in-production':
        raise ValueError('生产环境必须设置安全的SECRET_KEY')

class TestingConfig(Config):
    """测试环境配置"""
    TESTING = True
    DEBUG = True
    DATABASE_URL = 'sqlite:///:memory:'

# 配置字典
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config():
    """获取当前环境配置"""
    env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])
