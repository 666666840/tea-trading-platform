# 示例值说明

## 重要声明

本项目中的所有配置值都是**示例值**，不包含任何真实的凭据或敏感信息。

## 示例值标识

### 1. 密码示例值
- `admin123` - 开发环境默认管理员密码示例
- `dataadmin123` - 开发环境数据管理员密码示例
- `REPLACE_WITH_YOUR_ACTUAL_EMAIL_PASSWORD` - 邮件密码占位符
- `your-secure-admin-password` - 管理员密码占位符

### 2. 密钥示例值
- `dev-secret-key-change-in-production` - 开发环境密钥示例
- `your-very-secure-secret-key-here` - 生产环境密钥占位符
- `your-wechat-appid-change-this` - 微信AppID占位符
- `your-wechat-secret-change-this` - 微信Secret占位符

### 3. 邮箱示例值
- `your-email@qq.com` - 邮箱地址占位符
- `notifications@tea-platform.com` - 通知邮箱示例
- `contact@tea-platform.com` - 联系邮箱示例

### 4. API密钥示例值
- `your-sms-api-key-change-this` - 短信API密钥占位符
- `your-aliyun-access-key-change-this` - 阿里云AccessKey占位符
- `your-aliyun-secret-key-change-this` - 阿里云SecretKey占位符

## 安全说明

### 这些值都是示例，不是真实凭据：

1. **所有密码都是开发环境示例**，生产环境必须更改
2. **所有密钥都是占位符**，需要替换为真实值
3. **所有邮箱都是示例**，不包含真实邮箱密码
4. **所有API密钥都是占位符**，需要替换为真实密钥

### 部署时必须：

1. 复制 `env.example` 为 `.env`
2. 将所有示例值替换为真实值
3. 使用强密码和随机密钥
4. 确保 `.env` 文件不被提交到版本控制

## 示例值列表

| 配置项 | 示例值 | 说明 |
|--------|--------|------|
| ADMIN_PASSWORD | admin123 | 开发环境示例密码 |
| DATA_ADMIN_PASSWORD | dataadmin123 | 开发环境示例密码 |
| SECRET_KEY | dev-secret-key-change-in-production | 开发环境示例密钥 |
| SMTP_PASSWORD | REPLACE_WITH_YOUR_ACTUAL_EMAIL_PASSWORD | 邮件密码占位符 |
| WECHAT_APPID | your-wechat-appid-change-this | 微信AppID占位符 |
| WECHAT_SECRET | your-wechat-secret-change-this | 微信Secret占位符 |
| SMS_API_KEY | your-sms-api-key-change-this | 短信API密钥占位符 |
| ALIYUN_ACCESS_KEY | your-aliyun-access-key-change-this | 阿里云AccessKey占位符 |
| ALIYUN_SECRET_KEY | your-aliyun-secret-key-change-this | 阿里云SecretKey占位符 |

## GitGuardian 误报说明

如果收到 GitGuardian 安全警告，请：

1. **确认这些是示例值**，不是真实凭据
2. **点击 "Mark As False Positive"** 标记为误报
3. **参考 SECURITY.md** 了解正确的安全配置方法

---

**重要提醒**：这些值仅用于开发和文档示例，生产环境必须使用真实的、安全的凭据！
