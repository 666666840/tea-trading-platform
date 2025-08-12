# 版权安全的茶叶平台示例内容
# 📝 版权声明：所有内容均为平台原创，基于公开行业知识编写
# 🔒 使用许可：仅供演示和学习使用
# ⚖️ 免责声明：内容仅供参考，不构成专业建议

from datetime import datetime

# 版权信息配置
COPYRIGHT_INFO = {
    "platform": "茶叶批发演示平台",
    "version": "1.0",
    "license": "Demo License - For Educational Use Only",
    "disclaimer": "本平台内容为演示数据，仅供学习参考。实际信息请以权威机构发布为准。",
    "contact": "如有问题请联系平台管理员",
    "created": datetime.now().strftime("%Y-%m-%d"),
    "copyright_notice": "© 2024 茶叶批发演示平台 - 所有演示内容均为原创"
}

# 安全的示例内容 - 推荐板块
SAFE_RECOMMEND_DATA = []

# 安全的示例内容 - 资讯板块
SAFE_NEWS_DATA = []

# 安全的示例内容 - 茶艺板块
SAFE_ART_DATA = []

# 安全的示例内容 - 热点板块
SAFE_HOT_DATA = []

# 整合所有安全内容
SAFE_CONTENT_DATA = {
    'recommend': SAFE_RECOMMEND_DATA,
    'news': SAFE_NEWS_DATA,
    'art': SAFE_ART_DATA,
    'hot': SAFE_HOT_DATA,
    'copyright_info': COPYRIGHT_INFO
}

# 添加版权声明到每条内容
def add_copyright_disclaimer(content_item):
    """为内容项添加版权免责声明"""
    content_item['disclaimer'] = COPYRIGHT_INFO["disclaimer"]
    content_item['copyright_notice'] = COPYRIGHT_INFO["copyright_notice"]
    return content_item

# 获取带版权声明的安全内容
def get_safe_content(content_type='all'):
    """获取版权安全的内容"""
    if content_type == 'all':
        return SAFE_CONTENT_DATA
    elif content_type in SAFE_CONTENT_DATA:
        return SAFE_CONTENT_DATA[content_type]
    else:
        return []

if __name__ == "__main__":
    print("🛡️ 版权安全内容数据已加载")
    print(f"📄 版权声明: {COPYRIGHT_INFO['copyright_notice']}")
    print(f"⚖️ 免责声明: {COPYRIGHT_INFO['disclaimer']}") 