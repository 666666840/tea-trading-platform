# 茶叶一点通API服务器使用指南

## 🚀 快速开始

### 1. 启动服务器

#### Windows用户
双击运行 `一键启动API服务器.bat`

#### 手动启动
```bash
python start_server.py
```

### 2. 访问地址
- **API服务器**: http://localhost:3000
- **健康检查**: http://localhost:3000/health
- **API文档**: http://localhost:3000

## 📋 API接口列表

### 基础接口

#### 健康检查
```
GET /health
```
返回服务器状态信息

#### 服务器信息
```
GET /
```
返回API服务器基本信息和可用接口列表

### 认证接口

#### 用户登录
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### 用户注册
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}
```

#### 用户登出
```
GET /api/auth/logout
```

### 市场管理

#### 获取市场列表
```
GET /api/markets?province=北京&page=1&per_page=20
```

#### 获取市场详情
```
GET /api/markets/1
```

#### 创建市场（管理员）
```
POST /api/markets
Content-Type: application/json

{
  "name": "新茶叶市场",
  "province": "广东",
  "city": "深圳",
  "address": "深圳市南山区",
  "phone": "0755-12345678",
  "description": "市场描述"
}
```

### 新品到货

#### 获取新品列表
```
GET /api/newarrivals?category=绿茶&page=1&per_page=20
```

#### 获取新品详情
```
GET /api/newarrivals/1
```

### 供求信息

#### 获取供求列表
```
GET /api/supplies?type=supply&page=1&per_page=20
```

#### 发布供求信息
```
POST /api/supplies
Content-Type: application/json

{
  "type": "supply",
  "title": "优质铁观音批发",
  "price": 120,
  "quantity": "500公斤",
  "contact": "13800138000",
  "description": "详细描述"
}
```

### 清仓特价

#### 获取清仓列表
```
GET /api/clearance?page=1&per_page=20
```

### 内容管理

#### 获取内容列表
```
GET /api/content?type=recommend&page=1&per_page=20
```

#### 创建内容（管理员）
```
POST /api/content
Content-Type: application/json

{
  "title": "文章标题",
  "content": "文章内容",
  "type": "recommend",
  "author": "作者",
  "tag": "标签",
  "image": "图片URL"
}
```

### 采购询价

#### 获取询价列表
```
GET /api/inquiry?page=1&per_page=20
```

#### 发布询价
```
POST /api/inquiry
Content-Type: application/json

{
  "title": "求购西湖龙井",
  "description": "需要高品质西湖龙井",
  "requirements": "特级，50斤",
  "user_name": "采购商",
  "contact": "13800138000"
}
```

### 品牌管理

#### 获取品牌列表
```
GET /api/brands?page=1&per_page=20
```

### 茶园直通

#### 获取茶园列表
```
GET /api/gardens?page=1&per_page=20
```

### 系统管理

#### 获取系统统计
```
GET /api/stats
```

#### 获取系统日志
```
GET /api/logs?page=1&per_page=20
```

#### 导出数据
```
GET /api/export/markets
GET /api/export/newarrivals
GET /api/export/supplies
```

## 🔐 权限说明

### 用户角色
- **user**: 普通用户，可以查看数据和发布供求信息
- **dataadmin**: 数据管理员，可以管理数据
- **auditor**: 审核员，可以审核内容
- **admin**: 超级管理员，拥有所有权限

### 默认账户
- 管理员: `admin` / `admin123`
- 数据管理员: `dataadmin` / `dataadmin123`
- 审核员: `auditor` / `auditor123`

## 📊 响应格式

### 成功响应
```json
{
  "status": "success",
  "message": "操作成功",
  "data": {
    // 具体数据
  },
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "pages": 5
  }
}
```

### 错误响应
```json
{
  "status": "error",
  "message": "错误信息"
}
```

## 🔧 配置说明

### 数据库
- 默认使用SQLite数据库
- 数据库文件: `tea_platform.db`
- 支持数据库迁移

### 日志
- 日志文件: `logs/tea_platform.log`
- 支持日志轮转

### 端口配置
- 默认端口: 3000
- 可在 `server.py` 中修改

## 🚀 部署说明

### 开发环境
```bash
python start_server.py
```

### 生产环境
```bash
# 使用gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:3000 server:app

# 使用uwsgi
pip install uwsgi
uwsgi --http 0.0.0.0:3000 --module server:app --processes 4
```

## 📝 注意事项

1. 首次启动会自动创建数据库和默认数据
2. 所有API都支持CORS跨域请求
3. 分页参数：page（页码，从1开始），per_page（每页数量，最大100）
4. 时间格式统一使用ISO 8601格式
5. 文件上传功能需要配置uploads目录权限

## 🆘 常见问题

### Q: 端口被占用怎么办？
A: 修改 `server.py` 中的端口号，或使用 `netstat -ano | findstr :3000` 查看占用进程

### Q: 数据库文件在哪里？
A: 数据库文件 `tea_platform.db` 在项目根目录

### Q: 如何备份数据？
A: 直接复制 `tea_platform.db` 文件即可

### Q: 如何重置数据？
A: 删除 `tea_platform.db` 文件，重启服务器会自动重新初始化 