# 安全配置指南

## 概述

本项目已采用环境变量管理敏感信息，确保代码中不包含真实的密码、密钥等敏感数据。

## 环境变量配置

### 1. 复制环境变量模板

```bash
# 复制环境变量模板
cp env.example .env
```

### 2. 配置环境变量

编辑 `.env` 文件，设置真实的配置值：

```bash
# 数据库配置
DATABASE_URL=sqlite:///tea_platform.db

# Flask应用配置
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
FLASK_ENV=production

# 管理员账户配置
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
DATA_ADMIN_USERNAME=dataadmin
DATA_ADMIN_PASSWORD=your-secure-data-admin-password

# SMTP邮件配置
SMTP_HOST=smtp.qq.com
SMTP_PORT=587
SMTP_USERNAME=your-real-email@qq.com
SMTP_PASSWORD=your-real-email-password
NOTIFICATION_EMAIL=notifications@your-domain.com

# 微信小程序配置
WECHAT_APPID=your-wechat-appid
WECHAT_SECRET=your-wechat-secret

# 其他配置...
```

## 安全最佳实践

### 1. 密码安全

- ✅ 使用强密码（至少8位，包含大小写字母、数字、特殊字符）
- ✅ 定期更换密码
- ✅ 不同环境使用不同密码
- ❌ 不要在代码中硬编码密码

### 2. 密钥管理

- ✅ 使用环境变量存储密钥
- ✅ 生产环境使用强随机密钥
- ✅ 定期轮换密钥
- ❌ 不要将密钥提交到版本控制

### 3. 文件安全

- ✅ `.env` 文件已添加到 `.gitignore`
- ✅ 敏感配置文件不会被提交
- ✅ 大文件使用 Git LFS 管理
- ❌ 不要提交包含真实凭据的文件

### 4. 环境隔离

- ✅ 开发、测试、生产环境使用不同配置
- ✅ 生产环境禁用调试模式
- ✅ 使用不同的数据库
- ❌ 不要在生产环境使用开发配置

## 部署安全检查清单

### 部署前检查

- [ ] 确认 `.env` 文件已正确配置
- [ ] 确认所有密码已更改为安全密码
- [ ] 确认 `SECRET_KEY` 已设置为强随机值
- [ ] 确认 `DEBUG=False`（生产环境）
- [ ] 确认数据库连接安全

### 部署后检查

- [ ] 确认应用正常运行
- [ ] 确认管理员账户可以正常登录
- [ ] 确认邮件功能正常（如果启用）
- [ ] 确认日志中没有敏感信息泄露
- [ ] 确认防火墙配置正确

## 常见安全问题

### 1. GitGuardian 警告

如果收到 GitGuardian 安全警告：

1. **检查是否为误报**：确认代码中只包含示例值
2. **标记为误报**：在 GitGuardian 邮件中点击 "Mark As False Positive"
3. **更新示例值**：将示例值改为更明显的占位符

### 2. 密码泄露

如果发现密码泄露：

1. **立即更改密码**：更改所有相关账户密码
2. **检查日志**：确认没有敏感信息记录
3. **更新环境变量**：重新生成所有密钥
4. **通知相关人员**：通知团队成员更改密码

### 3. 环境变量未加载

如果环境变量未正确加载：

1. **检查文件路径**：确认 `.env` 文件在正确位置
2. **检查文件格式**：确认没有语法错误
3. **重启应用**：重新启动应用以加载新配置
4. **检查权限**：确认文件读取权限正确

## 开发环境配置

### 本地开发

```bash
# 1. 复制环境变量模板
cp env.example .env

# 2. 编辑配置（使用开发环境安全值）
vim .env

# 3. 安装依赖
pip install -r requirements.txt

# 4. 启动应用
python app.py
```

### 测试环境

```bash
# 设置环境变量
export FLASK_ENV=testing
export DATABASE_URL=sqlite:///:memory:

# 运行测试
python -m pytest tests/
```

## 生产环境配置

### 服务器部署

```bash
# 1. 创建生产环境配置
cp env.example .env.production

# 2. 设置强密码和密钥
vim .env.production

# 3. 设置环境变量
export FLASK_ENV=production
export $(cat .env.production | xargs)

# 4. 启动应用
python app.py
```

### Docker 部署

```bash
# 1. 构建镜像
docker build -t tea-platform .

# 2. 运行容器（传递环境变量）
docker run -d \
  --name tea-platform \
  --env-file .env.production \
  -p 5000:5000 \
  tea-platform
```

## 监控和日志

### 安全日志

- 记录所有登录尝试
- 记录敏感操作
- 记录异常访问
- 定期检查日志文件

### 监控告警

- 设置异常登录告警
- 设置系统性能监控
- 设置数据库连接监控
- 设置文件访问监控

## 应急响应

### 安全事件处理流程

1. **发现事件**：立即停止相关服务
2. **评估影响**：确定影响范围和严重程度
3. **隔离系统**：隔离受影响的系统
4. **修复问题**：修复安全漏洞
5. **恢复服务**：在确认安全后恢复服务
6. **事后分析**：分析事件原因，改进安全措施

### 联系方式

- 安全负责人：[填写联系方式]
- 技术支持：[填写联系方式]
- 紧急联系：[填写联系方式]

---

**重要提醒**：安全是持续的过程，请定期检查和更新安全配置！
