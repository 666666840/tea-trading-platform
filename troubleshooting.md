# 部署故障排除指南

## 🔗 连接问题

### 无法连接服务器
**症状**：SSH连接超时或拒绝连接
**解决方案**：
1. 检查服务器IP是否正确
2. 确认安全组开放了22端口
3. 检查服务器是否正常运行
4. 尝试ping服务器IP

```bash
# 检查服务器状态
ping 您的服务器IP

# 检查端口开放
telnet 您的服务器IP 22
```

### 密码错误
**症状**：认证失败
**解决方案**：
1. 确认密码输入正确
2. 检查大小写锁定
3. 重置服务器密码（腾讯云控制台）

## 📦 安装问题

### Node.js安装失败
**症状**：yum install nodejs失败
**解决方案**：
```bash
# 清理yum缓存
yum clean all
yum makecache

# 重新安装NodeSource仓库
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs
```

### npm安装包失败
**症状**：npm install超时或失败
**解决方案**：
```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# 清理npm缓存
npm cache clean --force

# 重新安装
npm install
```

## 🚀 服务问题

### PM2服务启动失败
**症状**：pm2 start失败
**解决方案**：
```bash
# 检查PM2状态
pm2 status

# 查看错误日志
pm2 logs smart-tea-crawler

# 重启服务
pm2 restart smart-tea-crawler

# 重新安装PM2
npm uninstall -g pm2
npm install -g pm2
```

### 采集脚本执行失败
**症状**：内容采集失败
**解决方案**：
```bash
# 检查脚本权限
chmod +x smart-tea-crawler.js

# 手动运行测试
node smart-tea-crawler.js

# 查看详细错误
node --trace-warnings smart-tea-crawler.js
```

## 🌐 网络问题

### 无法访问输出文件
**症状**：http://服务器IP/content.json无法访问
**解决方案**：
```bash
# 检查Nginx状态
systemctl status nginx

# 启动Nginx
systemctl start nginx
systemctl enable nginx

# 检查防火墙
firewall-cmd --list-all
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```

### 域名解析问题
**症状**：域名无法访问
**解决方案**：
1. 检查域名解析设置
2. 确认A记录指向服务器IP
3. 等待DNS生效（最多24小时）

## 💾 存储问题

### 磁盘空间不足
**症状**：写入失败，磁盘空间不足
**解决方案**：
```bash
# 检查磁盘使用
df -h

# 清理日志文件
find /var/log -name "*.log" -mtime +7 -delete

# 清理npm缓存
npm cache clean --force

# 清理yum缓存
yum clean all
```

### 文件权限问题
**症状**：权限被拒绝
**解决方案**：
```bash
# 修改文件权限
chmod 755 /usr/share/nginx/html
chown -R nginx:nginx /usr/share/nginx/html

# 修改项目目录权限
chmod -R 755 /home/tea-crawler
```

## 📊 性能问题

### 内存不足
**症状**：服务运行缓慢或崩溃
**解决方案**：
1. 检查内存使用：`free -h`
2. 增加swap空间
3. 优化Node.js内存设置
4. 考虑升级服务器配置

### CPU使用率过高
**症状**：系统响应缓慢
**解决方案**：
```bash
# 查看进程占用
top
htop

# 检查PM2进程
pm2 monit

# 优化采集频率
# 修改smart-tea-crawler.js中的定时设置
```

## 🔧 日志分析

### 查看系统日志
```bash
# 查看系统日志
journalctl -f

# 查看Nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 查看PM2日志
pm2 logs smart-tea-crawler
```

### 常见错误代码
- **EADDRINUSE**: 端口被占用
- **ENOENT**: 文件不存在
- **EACCES**: 权限不足
- **ECONNREFUSED**: 连接被拒绝
- **ETIMEDOUT**: 连接超时

## 📞 获取帮助

### 腾讯云支持
- 控制台 → 工单 → 提交工单
- 技术支持热线：4009-100-100

### 社区支持
- Node.js官方文档
- PM2官方文档
- 腾讯云开发者社区 