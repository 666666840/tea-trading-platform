# API监控与埋点系统使用指南

## 📊 系统概述

本系统为茶叶批发平台提供了完整的API调用监控和用户行为埋点功能，帮助开发者实时了解系统性能和用户行为模式。

### 核心功能

- **API调用监控**: 自动记录所有API请求的详细信息
- **性能分析**: 实时监控响应时间、错误率等关键指标
- **用户行为追踪**: 收集页面访问、功能使用等用户行为数据
- **数据可视化**: 提供直观的监控仪表盘
- **告警机制**: 支持性能异常自动告警
- **数据导出**: 支持多种格式的数据导出

## 🚀 快速开始

### 1. 系统启动

系统已集成到主服务器中，启动服务器时自动启用：

```bash
python server.py
```

启动后会看到以下提示：
```
📊 API监控和埋点系统已加载
📊 API监控中间件已启用
```

### 2. 访问监控数据

#### API接口
- **获取监控数据**: `GET /api/monitor/data`
- **重置监控数据**: `GET /api/monitor/reset`

#### 小程序页面
- **监控仪表盘**: `/pages/monitor-dashboard/monitor-dashboard`

## 📈 监控数据说明

### API监控数据

#### 基础统计
- `totalCalls`: 总API调用次数
- `totalErrors`: 总错误次数
- `avgResponseTime`: 平均响应时间
- `errorRate`: 错误率百分比

#### 实时统计
- `lastMinuteCalls`: 最近1分钟调用次数
- `lastHourCalls`: 最近1小时调用次数
- `currentCalls`: 当前活跃调用数

#### 慢API列表
记录响应时间超过2秒的API：
```json
{
  "url": "/api/content",
  "method": "GET",
  "responseTime": 2500,
  "count": 5,
  "timestamp": "2024-07-06T10:30:00Z"
}
```

#### 错误API列表
记录频繁出错的API：
```json
{
  "url": "/api/inquiry",
  "method": "POST",
  "statusCode": 500,
  "count": 3,
  "timestamp": "2024-07-06T10:30:00Z"
}
```

### 埋点数据

#### 页面访问统计
- `views`: 页面访问次数
- `uniqueUsers`: 独立用户数
- `avgLoadTime`: 平均加载时间
- `lastViewed`: 最后访问时间

#### 功能使用统计
- `uses`: 功能使用次数
- `uniqueUsers`: 独立用户数
- `lastUsed`: 最后使用时间
- `successRate`: 成功率

#### 用户行为事件
```json
{
  "type": "user_action",
  "action": "publish_inquiry",
  "page": "/pages/inquiry/inquiry",
  "timestamp": "2024-07-06T10:30:00Z",
  "userId": "user123",
  "sessionId": "session456"
}
```

## 🛠️ 配置选项

### API监控配置

```javascript
// utils/api-monitor-middleware.js
const config = {
  enabled: true,              // 是否启用监控
  logToFile: true,           // 是否记录到文件
  logToConsole: false,       // 是否控制台输出
  maxRecords: 10000,         // 最大记录数
  slowThreshold: 2000,       // 慢API阈值(毫秒)
  errorThreshold: 500,       // 错误API阈值(毫秒)
  logFile: 'api-monitor.log', // 日志文件路径
  dataFile: 'api-monitor-data.json' // 数据文件路径
}
```

### 埋点配置

```javascript
// utils/analytics-tracker.js
const config = {
  enabled: true,              // 是否启用埋点
  logToFile: true,           // 是否记录到文件
  maxRecords: 50000,         // 最大记录数
  sessionTimeout: 30 * 60 * 1000, // 会话超时时间(毫秒)
  dataFile: 'analytics-data.json', // 数据文件路径
  logFile: 'analytics.log'   // 日志文件路径
}
```

## 📊 监控仪表盘使用

### 页面功能

1. **实时数据刷新**: 支持手动刷新和自动更新
2. **数据筛选**: 按时间范围、API类型、页面类型筛选
3. **数据导出**: 支持JSON、CSV格式导出
4. **数据重置**: 一键清空所有监控数据

### 主要视图

#### API监控概览
- 总调用次数
- 平均响应时间
- 错误率
- 最近1分钟调用数

#### 埋点数据概览
- 今日事件数
- 活跃会话数
- 访问页面数
- 错误数量

#### 性能分析
- API响应时间分布
- 错误率趋势
- 慢API排行
- 错误API排行

#### 用户行为分析
- 热门页面排行
- 功能使用频率
- 用户行为路径
- 错误统计

## 🔧 自定义埋点

### 页面访问埋点

```javascript
// 在页面onLoad中调用
analyticsTracker.trackPageView({
  page: '/pages/index/index',
  title: '首页',
  userId: 'user123',
  sessionId: 'session456',
  loadTime: 1500,
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
  screenSize: '375x667',
  platform: 'iOS'
})
```

### 用户行为埋点

```javascript
// 在用户操作时调用
analyticsTracker.trackUserAction({
  action: 'click_button',
  element: 'publish_btn',
  page: '/pages/inquiry/inquiry',
  value: '发布询价',
  userId: 'user123',
  sessionId: 'session456',
  category: 'business',
  label: '发布询价按钮',
  properties: {
    buttonType: 'primary',
    position: 'bottom'
  }
})
```

### 业务事件埋点

```javascript
// 在业务操作时调用
analyticsTracker.trackBusinessEvent({
  event: 'purchase_completed',
  category: 'transaction',
  value: 299.99,
  userId: 'user123',
  sessionId: 'session456',
  page: '/pages/checkout/checkout',
  properties: {
    productId: 'tea_001',
    quantity: 2,
    paymentMethod: 'wechat'
  }
})
```

### 性能指标埋点

```javascript
// 在性能监控时调用
analyticsTracker.trackPerformance({
  metric: 'page_load_time',
  value: 1200,
  unit: 'ms',
  page: '/pages/index/index',
  userId: 'user123',
  sessionId: 'session456',
  context: {
    networkType: 'wifi',
    deviceModel: 'iPhone 12'
  }
})
```

### 错误埋点

```javascript
// 在错误发生时调用
analyticsTracker.trackError({
  error: 'api_request_failed',
  message: '网络请求超时',
  stack: 'Error: timeout...',
  page: '/pages/index/index',
  userId: 'user123',
  sessionId: 'session456',
  severity: 'error',
  context: {
    apiUrl: '/api/content',
    requestMethod: 'GET'
  }
})
```

## 📋 数据导出

### JSON格式导出

```javascript
// 获取完整监控数据
const monitorData = apiMonitor.getMonitorData()
const analyticsData = analyticsTracker.getAnalyticsData()

const exportData = {
  apiMonitor: monitorData,
  analytics: analyticsData,
  exportTime: new Date().toISOString()
}
```

### CSV格式导出

```javascript
// 生成API性能CSV
let csv = 'API,响应时间,错误率,调用次数\n'
apiMonitor.getSlowAPIs().forEach(api => {
  csv += `${api.url},${api.responseTime},${api.count},${api.count}\n`
})
```

## 🔍 数据分析

### 性能分析

1. **响应时间分析**
   - 识别慢API
   - 分析性能瓶颈
   - 优化建议

2. **错误率分析**
   - 识别问题API
   - 错误模式分析
   - 稳定性评估

3. **使用量分析**
   - API调用频率
   - 峰值时间分析
   - 容量规划

### 用户行为分析

1. **页面访问分析**
   - 热门页面识别
   - 用户路径分析
   - 转化率优化

2. **功能使用分析**
   - 功能受欢迎程度
   - 使用习惯分析
   - 功能优化建议

3. **错误分析**
   - 错误发生位置
   - 错误影响范围
   - 用户体验优化

## 🚨 告警机制

### 性能告警

- **慢API告警**: 响应时间超过阈值
- **错误率告警**: 错误率超过阈值
- **调用量告警**: 调用量异常波动

### 告警配置

```javascript
// 配置告警阈值
const alertConfig = {
  slowAPITimeout: 3000,    // 慢API超时时间
  errorRateThreshold: 5,   // 错误率阈值(%)
  callVolumeThreshold: 1000 // 调用量阈值
}
```

## 🔧 故障排除

### 常见问题

1. **监控数据不显示**
   - 检查监控系统是否启用
   - 确认数据文件权限
   - 查看控制台错误信息

2. **数据文件过大**
   - 调整maxRecords配置
   - 定期清理旧数据
   - 启用数据压缩

3. **性能影响**
   - 调整日志记录频率
   - 优化数据存储方式
   - 使用异步处理

### 日志文件

- `api-monitor.log`: API监控日志
- `analytics.log`: 埋点数据日志
- `api-monitor-data.json`: API监控数据
- `analytics-data.json`: 埋点数据

## 📚 最佳实践

### 1. 合理配置阈值
- 根据业务特点设置合理的性能阈值
- 定期调整告警配置

### 2. 数据清理策略
- 定期清理过期数据
- 保留重要历史数据
- 压缩存储空间

### 3. 隐私保护
- 敏感信息脱敏处理
- 遵守数据保护法规
- 用户授权管理

### 4. 性能优化
- 异步处理监控数据
- 批量写入日志
- 合理设置缓存

## 🔄 系统维护

### 日常维护

1. **数据备份**
   - 定期备份监控数据
   - 备份配置文件
   - 测试恢复流程

2. **性能监控**
   - 监控系统自身性能
   - 检查磁盘空间
   - 优化查询性能

3. **安全维护**
   - 定期更新依赖
   - 检查安全漏洞
   - 访问权限控制

### 升级指南

1. **版本兼容性**
   - 检查API兼容性
   - 数据格式迁移
   - 配置项更新

2. **测试验证**
   - 功能测试
   - 性能测试
   - 数据准确性验证

## 📞 技术支持

如遇到问题，请检查：

1. 系统日志文件
2. 控制台错误信息
3. 配置文件设置
4. 数据文件权限

更多技术支持请联系开发团队。 