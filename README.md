# 多环境配置与团队协作说明

- 支持 .env.development、.env.staging、.env.production 多环境切换
- 推荐严格遵循《代码规范与分支管理规范》《项目开发运维上线手册》
- 监控与告警体系建议见《监控与告警体系建设建议.md》

---

## 分支管理与CI/CD
- 生产环境仅允许合并 release/xxx 或 develop 分支
- 推荐使用 GitHub Actions 自动化部署，详见 .github/workflows/deploy.yml

---

# 智能茶叶内容采集系统

## 项目简介

智能茶叶内容采集系统是一个专为茶叶行业设计的自动化内容采集和管理平台。系统能够从多个RSS源、API接口和网站自动采集茶叶相关的内容，并进行智能分类、去重和质量评估，为茶叶一点通小程序提供丰富的内容支持。

## 需求、设计、细节与任务清单

### 1. 项目需求（对标大型信息聚合类小程序）
- 支持多源内容聚合（RSS、API、网站等），内容涵盖新闻、行情、专栏、热点等。
- 智能分类、去重、质量评估，保障内容丰富且高质量。
- 支持内容搜索、标签、筛选、个性化推荐。
- 用户可收藏、评论、点赞、分享内容。
- 后台支持内容审核、数据统计、运营管理。
- 高可用、易扩展、易维护，适配多终端。

### 2. 设计思路与创新点
- 智能内容聚合与自动分类，结合AI关键词提取与质量评分。
- 多源融合与去重，提升内容多样性与独特性。
- 用户行为数据驱动的个性化推荐。
- 支持内容安全审核与合规管理。
- 前后端分离，微服务/模块化架构，便于扩展。

### 3. 关键实现细节
- 统一目录结构与命名规范，公共组件、工具函数沉淀。
- API接口鉴权、限流、防刷，敏感数据加密。
- 首屏加载优化、资源懒加载、性能监控。
- 日志、异常、数据埋点全链路监控。
- 合规上线流程：备案、隐私政策、用户协议、第三方授权。

### 4. 可落地任务清单
1. 完善核心功能：确保主流程无严重bug，处理边界场景和异常流程，补充用户引导与帮助说明。
2. 优化用户体验：提升页面加载速度，完善交互动画，适配不同机型，考虑无障碍支持。
3. 完善内容与数据：保证信息源稳定，完善分类、标签、搜索、筛选，建立内容安全审核机制。
4. 统一代码规范与重构：整理目录结构，统一命名，完善注释和开发文档，沉淀公共组件和工具函数。
5. 加强接口与数据安全：API鉴权、限流、防刷，敏感数据加密，日志与异常监控。
6. 性能优化：首屏加载、资源懒加载与压缩、性能监控。
7. 上线合规准备：备案、资质、隐私政策、用户协议、第三方授权、平台审核。
8. 全方位测试与验收：功能、兼容性、压力、体验、回归测试。
9. 部署与发布：生产环境配置、服务器部署、小程序上传与提审。
10. 运营与维护：用户反馈、客服系统、数据统计、内容运营、活动策划。
11. 长期维护与升级：安全合规跟进、技术升级、团队协作与知识沉淀。

## 主要功能

### 🚀 核心功能
- **多源采集**: 支持RSS、API、网站等多种数据源
- **智能分类**: 自动将内容分类为推荐、茶讯、茶艺、热点四个栏目
- **内容去重**: 基于标题和链接的智能去重算法
- **质量评估**: 基于内容长度、时效性、完整性等因素的质量评分
- **自动更新**: 支持定时采集和实时更新
- **本地混合**: 结合外部采集内容和本地原创内容

### 📊 数据统计
- 实时统计各栏目文章数量
- 内容质量评分统计
- 采集成功率监控
- 系统运行状态监控

### 🔧 系统特性
- **高可用性**: 自动重启和故障恢复
- **可扩展性**: 支持添加新的数据源和采集规则
- **易维护性**: 完善的日志记录和监控机制
- **跨平台**: 支持CentOS、Ubuntu等主流Linux系统

## 系统架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   RSS源采集     │    │   API数据采集   │    │   网站内容采集   │
│                 │    │                 │    │                 │
│ • 中国茶叶网    │    │ • 新闻API       │    │ • 茶叶资讯网站   │
│ • 茶叶中国      │    │ • 价格API       │    │ • 行业门户网站   │
│ • 茶艺网        │    │ • 行情API       │    │ • 专业媒体网站   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   内容处理引擎   │
                    │                 │
                    │ • 文本清理      │
                    │ • 关键词提取    │
                    │ • 图片处理      │
                    │ • 质量评估      │
                    │ • 去重排序      │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   内容输出      │
                    │                 │
                    │ • JSON格式      │
                    │ • 分类存储      │
                    │ • 静态文件      │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   小程序端      │
                    │                 │
                    │ • 内容展示      │
                    │ • 用户交互      │
                    │ • 数据统计      │
                    └─────────────────┘
```

## 快速开始

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0
- Linux系统 (CentOS 7+/Ubuntu 18.04+)
- 至少1GB内存
- 至少10GB磁盘空间

### 一键部署

1. **上传文件到服务器**
```bash
# 将以下文件上传到服务器
smart-tea-crawler.js
package.json
deploy.sh
```

2. **执行部署脚本**
```bash
# 给脚本执行权限
chmod +x deploy.sh

# 执行部署
./deploy.sh
```

3. **验证部署**
```bash
# 检查服务状态
pm2 status

# 查看日志
pm2 logs smart-tea-crawler

# 访问内容
curl http://localhost/content.json
```

### 手动部署

1. **安装Node.js**
```bash
# CentOS
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```

2. **安装依赖**
```bash
npm install
```

3. **启动服务**
```bash
# 使用PM2启动
npm install -g pm2
pm2 start smart-tea-crawler.js --name smart-tea-crawler
pm2 save
pm2 startup
```

## 配置说明

### 数据源配置

在 `smart-tea-crawler.js` 中配置数据源：

```javascript
this.sources = {
  rss: {
    recommend: [
      { name: '中国茶叶网', url: 'http://www.tea.cn/rss.xml' },
      { name: '茶叶中国', url: 'https://www.chinatea.com/rss.xml' }
    ],
    news: [
      { name: '茶叶流通协会', url: 'http://www.ctma.com.cn/rss.xml' }
    ],
    // ... 更多配置
  },
  api: {
    news: 'https://api.tea-news.com/articles',
    prices: 'https://api.tea-price.com/prices'
  }
};
```

### 输出配置

```javascript
this.config = {
  outputDir: '/usr/share/nginx/html',    // 输出目录
  outputFile: '/usr/share/nginx/html/content.json',  // 输出文件
  logFile: './crawler.log',              // 日志文件
  maxRetries: 3,                         // 最大重试次数
  timeout: 10000                         // 超时时间(ms)
};
```

## 内容格式

### JSON输出格式

```json
{
  "recommend": [
    {
      "id": "1703123456789abc123",
      "title": "2024年春季茶叶市场深度分析报告",
      "description": "基于大数据分析，深入解读2024年春季茶叶市场走势...",
      "link": "https://example.com/article/123",
      "pubDate": "2024-01-15T10:30:00.000Z",
      "image": "https://via.placeholder.com/200x140/4CAF50/FFFFFF?text=市场分析",
      "source": "茶叶一点通",
      "category": "recommend",
      "tags": ["市场分析", "春季茶叶", "投资参考"],
      "views": 1500,
      "likes": 120,
      "isLocal": true,
      "quality": 95
    }
  ],
  "news": [...],
  "art": [...],
  "hot": [...]
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识符 |
| title | string | 文章标题 |
| description | string | 文章描述 |
| link | string | 原文链接 |
| pubDate | string | 发布时间 |
| image | string | 封面图片 |
| source | string | 来源网站 |
| category | string | 内容分类 |
| tags | array | 关键词标签 |
| views | number | 浏览量 |
| likes | number | 点赞数 |
| isLocal | boolean | 是否本地内容 |
| quality | number | 质量评分(0-100) |

## 管理命令

### PM2管理
```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs smart-tea-crawler

# 重启服务
pm2 restart smart-tea-crawler

# 停止服务
pm2 stop smart-tea-crawler

# 删除服务
pm2 delete smart-tea-crawler
```

### 系统服务管理
```bash
# 启动服务
systemctl start tea-crawler

# 停止服务
systemctl stop tea-crawler

# 查看状态
systemctl status tea-crawler

# 启用开机自启
systemctl enable tea-crawler
```

### 监控脚本
```bash
# 手动执行监控
/home/tea-crawler/monitor.sh

# 查看监控日志
tail -f /home/tea-crawler/crawler.log
```

## 用户反馈与客服系统

- 个人中心、设置等页面提供“意见反馈”入口，支持建议、问题、投诉、表扬等多类型反馈。
- 反馈表单支持一键联系客服（如企业微信、在线客服、客服电话等），提升响应效率。
- 反馈数据本地存储并可扩展推送到管理后台或客服系统，便于集中处理。
- 管理后台可统计反馈类型、处理进度、满意度等，辅助内容与活动运营决策。
- 建议定期分析反馈数据，结合用户行为策划内容更新、用户激励、专题活动等，持续提升用户满意度。

## 故障排除

### 常见问题

1. **服务启动失败**
```bash
# 检查Node.js版本
node --version

# 检查依赖安装
npm list

# 查看详细错误日志
pm2 logs smart-tea-crawler --lines 100
```

2. **采集失败**
```bash
# 检查网络连接
ping www.tea.cn

# 检查RSS源是否可用
curl -I http://www.tea.cn/rss.xml

# 查看采集日志
tail -f /home/tea-crawler/crawler.log
```

3. **输出文件为空**
```bash
# 检查输出目录权限
ls -la /usr/share/nginx/html/

# 检查磁盘空间
df -h

# 手动执行采集
cd /home/tea-crawler
node smart-tea-crawler.js
```

### 日志分析

日志文件位置：`/home/tea-crawler/crawler.log`

日志格式：
```
[2024-01-15 10:30:00] [INFO] 开始智能茶叶内容采集...
[2024-01-15 10:30:01] [INFO] 采集RSS栏目: recommend
[2024-01-15 10:30:02] [INFO] RSS采集成功: 中国茶叶网, 5条
[2024-01-15 10:30:03] [INFO] 采集完成! 统计: {"totalArticles":20,"byCategory":{"recommend":5,"news":5,"art":5,"hot":5}}
```

## 扩展开发

### 添加新的RSS源

1. 在 `sources.rss` 中添加新源
2. 重启服务
3. 检查采集结果

### 添加新的API源

1. 实现API采集函数
2. 在 `mainCrawler` 中调用
3. 处理返回数据

### 自定义内容处理

1. 修改 `cleanText` 函数
2. 调整 `extractKeywords` 规则
3. 优化 `calculateQuality` 算法

## 性能优化

### 系统优化
- 使用SSD硬盘提升I/O性能
- 增加内存减少磁盘交换
- 配置合适的Node.js内存限制

### 采集优化
- 调整并发数量
- 优化超时设置
- 实现增量采集

### 存储优化
- 定期清理日志文件
- 压缩历史数据
- 使用CDN加速静态文件

## 性能优化说明

- 首页等核心页面集成性能监控，自动采集首屏加载、响应时间、内存等指标。
- 图片等资源采用懒加载（lazy-load），静态资源压缩，提升加载速度。
- 关键数据分批加载，减少首屏阻塞。
- 性能异常自动告警，便于及时优化。
- 工具函数、第三方库等按需异步加载，减小主包体积。

## 安全考虑

### 网络安全
- 配置防火墙规则
- 使用HTTPS协议
- 限制访问IP范围

### 数据安全
- 定期备份数据
- 加密敏感信息
- 监控异常访问

### 系统安全
- 及时更新系统补丁
- 使用强密码
- 限制root权限

## 技术支持

### 联系方式
- 项目维护：茶叶一点通团队
- 技术支持：support@tea-platform.com
- 问题反馈：https://github.com/tea-platform/smart-crawler/issues

### 文档更新
- 最新文档：https://github.com/tea-platform/smart-crawler/wiki
- 更新日志：CHANGELOG.md
- API文档：API.md

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

**茶叶一点通 - 让茶叶交易更简单** 

## 代码规范与组件沉淀

- 目录结构清晰，所有页面按 `pages/模块名/` 组织，工具函数统一放在 `utils/`，静态资源放在 `images/`。
- 命名规范统一，采用小写字母+中划线或驼峰，术语全站一致（如“品类”“行情”等）。
- 主要模块、工具函数、组件均有详细注释，复杂逻辑补充用途/参数/返回值说明。
- 公共工具函数沉淀于 `utils/`，如缓存、通知、收藏、数据管理等，便于复用和维护。
- 所有导出均采用统一的 `module.exports = { ... }` 格式，便于团队协作。
- 新增/修改工具或组件时，需同步补充开发文档和注释。 

## 长期维护与升级

- 定期进行安全漏洞扫描，及时修复依赖和代码安全隐患。
- 跟进法律法规变更，及时调整隐私政策、用户协议等合规文档。
- 定期升级依赖库、框架，保持技术栈安全与现代化，关注平台API变更并及时适配。
- 团队内部推行代码Review、技术分享，重要经验文档化，维护开发、运维、运营等多角色协作手册。
- 建立知识库，沉淀常见问题、最佳实践、上线/回滚/应急流程等，便于团队传承和新成员快速上手。 

---

## FAQ
- 如何切换环境？复制对应 .env 文件并重命名为 .env
- 如何备份数据库？运行 python admin_backend/数据库自动备份.py
- 日志太大如何清理？运行 python admin_backend/日志轮转清理.py

## 联系方式
- 主要开发/运维负责人：xxx

## 常用文档索引
- [项目开发运维上线手册](项目开发运维上线手册.md)
- [代码规范与分支管理规范](代码规范与分支管理规范.md)
- [监控与告警体系建设建议](监控与告警体系建设建议.md)
- [前端与接口统一体验建议](前端与接口统一体验建议.md) 