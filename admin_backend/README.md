# 茶叶平台管理后台

一个功能完整的茶叶行业管理后台系统，提供用户管理、系统设置、数据管理等功能。

## 功能特性

### 用户管理
- ✅ 用户列表查看和搜索
- ✅ 用户创建、编辑、删除
- ✅ 角色权限管理（超级管理员、管理员、数据管理员）
- ✅ 密码重置功能
- ✅ 批量操作（启用、禁用、删除）
- ✅ 用户状态管理

### 系统设置
- ✅ 基本设置（网站信息、联系方式等）
- ✅ 安全设置（密码策略、登录限制等）
- ✅ 通知设置（邮件、短信配置）
- ✅ 系统设置（维护模式、备份策略等）
- ✅ 业务设置（茶叶分类、审核要求等）
- ✅ 界面设置（主题、分页等）

### 数据管理
- ✅ 茶叶市场数据管理
- ✅ 商户信息管理
- ✅ 系统日志查看

### 安全特性
- ✅ 基于角色的权限控制
- ✅ 操作日志记录
- ✅ 密码加密存储
- ✅ 会话管理
- ✅ 登录尝试限制

## 系统要求

- Python 3.7+
- MySQL 5.7+ 或 MariaDB 10.2+
- Redis 3.0+（可选，用于缓存）
- 现代浏览器（Chrome、Firefox、Safari、Edge）

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd -tea-miniprogram/admin-backend
```

### 2. 安装依赖

```bash
# 创建虚拟环境（推荐）
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 3. 配置环境

```bash
# 复制环境配置文件
cp env.example .env

# 编辑配置文件
# 修改数据库连接信息和其他配置
```

### 4. 初始化数据库

```bash
# 运行初始化脚本
python create_admin.py
```

### 5. 启动服务

```bash
# 方法1: 直接运行
python app.py

# 方法2: 使用启动脚本（Windows）
start_admin.bat
```

### 6. 访问管理后台

打开浏览器访问：http://127.0.0.1:3000

默认管理员账户：
- 用户名：admin
- 密码：admin123

**重要：请及时修改默认密码！**

## 配置说明

### 环境变量配置

创建 `.env` 文件并配置以下变量：

```env
# 数据库配置
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tea_admin

# Redis配置（可选）
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# 应用配置
APP_SECRET=your-secret-key-change-this-in-production
UPLOAD_PATH=uploads
MAX_FILE_SIZE=10485760

# 邮件配置
SMTP_HOST=smtp.qq.com
SMTP_PORT=587
SMTP_USERNAME=your_email@qq.com
SMTP_PASSWORD=your_email_password
```

### 数据库配置

1. 创建MySQL数据库：
```sql
CREATE DATABASE tea_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 创建数据库用户（可选）：
```sql
CREATE USER 'tea_admin'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON tea_admin.* TO 'tea_admin'@'localhost';
FLUSH PRIVILEGES;
```

## 用户角色说明

### 超级管理员 (super_admin)
- 拥有所有权限
- 可以管理其他管理员
- 可以修改系统设置
- 可以查看所有日志

### 管理员 (admin)
- 可以管理普通用户
- 可以管理市场和商户数据
- 可以查看部分日志
- 不能修改系统设置

### 数据管理员 (data_admin)
- 只能管理数据相关功能
- 可以查看市场、商户、价格等数据
- 不能管理用户
- 不能修改系统设置

## API接口

### 用户管理API

- `GET /api/users` - 获取用户列表
- `POST /api/users` - 创建新用户
- `PUT /api/users` - 批量操作用户
- `DELETE /api/users` - 删除用户
- `GET /api/users/<id>` - 获取用户详情
- `PUT /api/users/<id>` - 更新用户信息
- `POST /api/users/<id>/reset-password` - 重置用户密码

### 系统设置API

- `GET /api/settings` - 获取所有设置
- `POST /api/settings` - 创建新设置
- `PUT /api/settings` - 批量更新设置
- `GET /api/settings/<id>` - 获取设置详情
- `PUT /api/settings/<id>` - 更新设置
- `DELETE /api/settings/<id>` - 删除设置

## 部署说明

### 生产环境部署

1. **使用生产级WSGI服务器**：
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:3000 app:app
```

2. **使用Nginx反向代理**：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

3. **配置SSL证书**（推荐）

4. **设置防火墙规则**

5. **配置数据库备份**

### Docker部署

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 3000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:3000", "app:app"]
```

## 安全建议

1. **修改默认密码**：首次登录后立即修改默认密码
2. **使用强密码**：密码应包含大小写字母、数字和特殊字符
3. **定期备份**：定期备份数据库和配置文件
4. **更新依赖**：定期更新Python包和系统依赖
5. **监控日志**：定期检查系统日志和访问日志
6. **限制访问**：使用防火墙限制管理后台访问IP
7. **启用HTTPS**：生产环境必须使用HTTPS

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据库服务是否启动
   - 验证数据库连接信息
   - 确认数据库用户权限

2. **端口被占用**
   - 修改app.py中的端口号
   - 或停止占用端口的其他服务

3. **权限不足**
   - 确认当前用户有相应权限
   - 检查文件系统权限

4. **依赖包安装失败**
   - 升级pip：`pip install --upgrade pip`
   - 使用国内镜像：`pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt`

### 日志查看

- 应用日志：`admin.log`
- 系统日志：`logs/` 目录
- 错误日志：检查控制台输出

## 开发指南

### 添加新功能

1. 在 `app.py` 中添加新的路由和API
2. 创建相应的数据模型
3. 添加前端页面和JavaScript
4. 更新权限控制
5. 添加操作日志

### 代码规范

- 使用Python PEP 8代码规范
- 添加适当的注释和文档字符串
- 进行单元测试
- 遵循RESTful API设计原则

## 许可证

本项目采用MIT许可证，详见LICENSE文件。

## 联系方式

如有问题或建议，请联系：
- 邮箱：admin@tea-platform.com
- 电话：400-123-4567

## 更新日志

### v1.0.0 (2024-01-01)
- 初始版本发布
- 实现用户管理功能
- 实现系统设置功能
- 实现数据管理功能
- 添加权限控制系统
- 添加操作日志记录 