# 茶叶平台内容管理系统

## 📖 概述

茶叶平台内容管理系统是一个完整的内容管理解决方案，为茶叶一点通小程序提供强大的内容管理功能。系统包含内容创建、编辑、审核、发布、统计分析等完整功能模块。

## ✨ 主要功能

### 🎯 核心功能
- **内容CRUD操作** - 创建、读取、更新、删除内容
- **内容审核系统** - 自动和手动审核内容质量
- **内容质量分析** - 智能分析内容质量并给出评分
- **内容调度发布** - 支持定时发布和批量操作
- **统计分析** - 详细的内容数据统计和分析
- **权限管理** - 基于角色的权限控制

### 📝 内容类型支持
- **推荐内容** (recommend) - 推荐商品和内容
- **资讯内容** (news) - 行业新闻和资讯
- **茶艺内容** (art) - 茶文化相关内容
- **热点内容** (hot) - 热门话题和活动
- **指南内容** (guide) - 使用指南和教程
- **评测内容** (review) - 产品评测和推荐

### 🔄 内容状态管理
- **草稿** (draft) - 未完成的内容
- **待审核** (pending) - 等待审核的内容
- **已审核** (approved) - 审核通过的内容
- **已发布** (published) - 已发布的内容
- **已拒绝** (rejected) - 审核拒绝的内容
- **已归档** (archived) - 已归档的内容

### ⭐ 内容优先级
- **低优先级** (low) - 低优先级内容
- **普通优先级** (normal) - 普通优先级内容
- **高优先级** (high) - 高优先级内容
- **紧急优先级** (urgent) - 紧急优先级内容

## 🏗️ 系统架构

### 后端架构
```
content_management_system.py    # 核心内容管理系统
content_management_api.py       # Flask API接口
server.py                       # 主服务器（集成API）
```

### 前端架构
```
pages/content-management/       # 小程序内容管理页面
├── content-management.js       # 页面逻辑
├── content-management.wxml     # 页面模板
├── content-management.wxss     # 页面样式
└── content-management.json     # 页面配置

utils/content-api.js            # API调用工具
```

## 🚀 快速开始

### 1. 启动后端服务

```bash
# 启动Flask服务器
python server.py
```

### 2. 测试系统功能

```bash
# 运行测试脚本
python test_content_management.py
```

### 3. 访问小程序页面

在小程序中导航到内容管理页面：
```javascript
wx.navigateTo({
  url: '/pages/content-management/content-management'
})
```

## 📡 API接口文档

### 基础URL
```
http://localhost:3000/api/content-management
```

### 内容CRUD接口

#### 获取内容列表
```http
GET /contents?page=1&per_page=20&type=news&status=published
```

#### 获取内容详情
```http
GET /contents/{content_id}
```

#### 创建内容
```http
POST /contents
Content-Type: application/json

{
  "title": "内容标题",
  "content": "内容正文",
  "type": "news",
  "priority": "normal",
  "author": "作者",
  "tags": ["标签1", "标签2"],
  "category": "分类"
}
```

#### 更新内容
```http
PUT /contents/{content_id}
Content-Type: application/json

{
  "title": "更新后的标题",
  "content": "更新后的内容"
}
```

#### 删除内容
```http
DELETE /contents/{content_id}
```

### 内容操作接口

#### 发布内容
```http
POST /contents/{content_id}/publish
```

#### 审核通过
```http
POST /contents/{content_id}/approve
Content-Type: application/json

{
  "auditor": "审核员",
  "notes": "审核备注"
}
```

#### 审核拒绝
```http
POST /contents/{content_id}/reject
Content-Type: application/json

{
  "auditor": "审核员",
  "notes": "拒绝原因"
}
```

#### 切换推荐状态
```http
POST /contents/{content_id}/toggle-featured
```

#### 切换置顶状态
```http
POST /contents/{content_id}/toggle-top
```

### 批量操作接口

#### 批量发布
```http
POST /contents/batch-publish
Content-Type: application/json

{
  "content_ids": [1, 2, 3]
}
```

#### 批量删除
```http
POST /contents/batch-delete
Content-Type: application/json

{
  "content_ids": [1, 2, 3]
}
```

### 统计分析接口

#### 获取统计信息
```http
GET /statistics
```

#### 内容质量分析
```http
GET /contents/{content_id}/analyze
```

### 枚举值接口

#### 获取内容类型
```http
GET /enums/content-types
```

#### 获取内容状态
```http
GET /enums/content-statuses
```

#### 获取内容优先级
```http
GET /enums/content-priorities
```

### 系统接口

#### 健康检查
```http
GET /health
```

## 🎨 小程序页面功能

### 内容列表页面
- ✅ 内容列表展示
- ✅ 分页加载
- ✅ 筛选和搜索
- ✅ 批量选择操作
- ✅ 内容状态标识
- ✅ 快速操作按钮

### 内容创建页面
- ✅ 表单验证
- ✅ 富文本编辑
- ✅ 标签管理
- ✅ SEO设置
- ✅ 媒体资源上传
- ✅ 预览功能

### 统计分析页面
- ✅ 总体统计
- ✅ 类型分布
- ✅ 质量分析
- ✅ 趋势图表
- ✅ 导出功能

### 系统设置页面
- ✅ 自动审核设置
- ✅ 质量阈值配置
- ✅ 发布规则设置
- ✅ 权限管理

## 🔧 配置说明

### 内容质量分析配置
```python
# 质量分析权重配置
quality_weights = {
    'title_length': 0.15,      # 标题长度权重
    'content_length': 0.20,    # 内容长度权重
    'keyword_density': 0.15,   # 关键词密度权重
    'readability': 0.20,       # 可读性权重
    'uniqueness': 0.15,        # 唯一性权重
    'completeness': 0.15       # 完整性权重
}
```

### 审核规则配置
```python
# 敏感词配置
sensitive_words = [
    '违法', '违规', '涉黄', '涉毒', '赌博', '诈骗', '传销',
    '政治敏感', '暴力', '恐怖', '歧视', '侮辱', '诽谤'
]

# 垃圾信息检测
spam_patterns = [
    r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
    r'\d{11}',  # 手机号
    r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',  # 邮箱
]
```

## 📊 数据模型

### ContentItem 数据模型
```python
@dataclass
class ContentItem:
    id: Optional[int] = None
    title: str = ""                    # 标题
    content: str = ""                  # 内容
    summary: str = ""                  # 摘要
    type: str = "recommend"            # 类型
    status: str = "draft"              # 状态
    priority: str = "normal"           # 优先级
    author: str = ""                   # 作者
    tags: List[str] = None             # 标签
    category: str = ""                 # 分类
    image_url: str = ""                # 图片URL
    video_url: str = ""                # 视频URL
    seo_title: str = ""                # SEO标题
    seo_description: str = ""          # SEO描述
    seo_keywords: str = ""             # SEO关键词
    view_count: int = 0                # 浏览量
    like_count: int = 0                # 点赞数
    comment_count: int = 0             # 评论数
    share_count: int = 0               # 分享数
    quality_score: float = 0.0         # 质量分数
    audit_score: float = 0.0           # 审核分数
    is_featured: bool = False          # 是否推荐
    is_top: bool = False               # 是否置顶
    publish_time: Optional[datetime] = None  # 发布时间
    expire_time: Optional[datetime] = None   # 过期时间
    created_at: Optional[datetime] = None    # 创建时间
    updated_at: Optional[datetime] = None    # 更新时间
    created_by: str = ""               # 创建者
    updated_by: str = ""               # 更新者
    audit_by: str = ""                 # 审核者
    audit_time: Optional[datetime] = None    # 审核时间
    audit_notes: str = ""              # 审核备注
    metadata: Dict[str, Any] = None    # 元数据
```

## 🧪 测试

### 运行测试
```bash
# 运行完整测试
python test_content_management.py

# 测试特定功能
python -c "
from content_management_system import ContentManager
manager = ContentManager()
print('内容管理器初始化成功')
"
```

### 测试覆盖
- ✅ API接口测试
- ✅ 内容CRUD测试
- ✅ 审核流程测试
- ✅ 批量操作测试
- ✅ 错误处理测试
- ✅ 统计分析测试

## 🔒 安全特性

### 权限控制
- 基于角色的访问控制
- API接口权限验证
- 操作日志记录
- 敏感操作确认

### 内容安全
- 敏感词过滤
- 垃圾信息检测
- 内容质量评估
- 自动审核机制

### 数据保护
- 输入验证和清理
- SQL注入防护
- XSS攻击防护
- CSRF保护

## 📈 性能优化

### 数据库优化
- 索引优化
- 查询优化
- 分页加载
- 缓存机制

### 前端优化
- 懒加载
- 虚拟滚动
- 图片压缩
- 代码分割

## 🚀 部署指南

### 环境要求
- Python 3.7+
- Flask 2.0+
- SQLite/MySQL/PostgreSQL
- 微信开发者工具

### 安装步骤
1. 克隆项目
2. 安装依赖
3. 配置数据库
4. 启动服务
5. 配置小程序

### 生产环境配置
- 使用生产级数据库
- 配置反向代理
- 启用HTTPS
- 设置监控告警

## 🤝 贡献指南

### 开发流程
1. Fork项目
2. 创建功能分支
3. 提交代码
4. 创建Pull Request

### 代码规范
- 遵循PEP 8规范
- 添加类型注解
- 编写单元测试
- 更新文档

## 📞 技术支持

### 常见问题
1. **API接口返回404**
   - 检查服务器是否启动
   - 确认API路径正确

2. **内容创建失败**
   - 检查必填字段
   - 验证数据格式

3. **审核功能异常**
   - 检查权限配置
   - 确认审核规则

### 联系方式
- 邮箱: support@tea-platform.com
- 微信: tea-platform-support
- 文档: https://docs.tea-platform.com

## 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢所有为茶叶平台内容管理系统做出贡献的开发者和用户。

---

**茶叶平台内容管理系统** - 让内容管理更简单、更高效！ 🍵 