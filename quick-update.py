import datetime
import json

# 快速生成今日内容
data = {
    'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
    'recommendations': [
        {
            'title': '夏日清香绿茶推荐',
            'description': '精选高山绿茶，清香甘甜，消暑佳品',
            'price': '128-288元/斤',
            'origin': '浙江西湖',
            'features': ['清热降火', '香气清雅', '回甘持久']
        },
        {
            'title': '优质白牡丹白茶',
            'description': '福鼎白茶，茶汤清淡甘甜，夏季降火首选',
            'price': '158-368元/斤',
            'origin': '福建福鼎',
            'features': ['降火消暑', '口感清甜', '茶香淡雅']
        }
    ],
    'hotTopics': [
        {
            'title': '茶叶直播带货成新趋势',
            'content': '传统茶企纷纷转型线上，通过直播带货拓展销售渠道',
            'hotIndex': 89
        },
        {
            'title': '夏季茶叶保存技巧火热讨论',
            'content': '高温高湿季节，茶叶保存方法引发广泛关注',
            'hotIndex': 85
        }
    ]
}

# 生成文件
filename = f"daily_update_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
with open(filename, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'✅ 每日内容更新完成！生成文件：{filename}')
print('📊 新增内容：2条茶叶推荐，2个热点话题')
print('🔥 服务器将在30秒内自动检测并更新内容') 