// 示例页面 - 展示开发者和用户界面分离
const { envDetector } = require('../../utils/env-detector.js')

Page({
  data: {
    // 环境相关
    isDeveloper: false,
    isTester: false,
    isProduction: true,
    canShowDevTools: false,
    
    // 页面内容
    userContent: {
      title: '茶叶一点通',
      subtitle: '专业的茶叶批发平台',
      features: [
        { icon: '🫖', name: '优质茶叶', desc: '精选优质茶源' },
        { icon: '💰', name: '批发价格', desc: '厂家直供优惠' },
        { icon: '🚚', name: '快速配送', desc: '全国物流配送' },
        { icon: '🎯', name: '品质保证', desc: '质量检测认证' }
      ]
    },
    
    developerContent: {
      title: '🔧 开发者模式 - 茶叶一点通',
      subtitle: '开发调试界面 (用户看不到)',
      features: [
        { icon: '📊', name: '数据管理', desc: '商户数据管理后台', action: 'dataManagement' },
        { icon: '🔍', name: '调试工具', desc: '开发调试功能', action: 'debugTools' },
        { icon: '⚙️', name: '环境切换', desc: '切换运行模式', action: 'envSwitch' },
        { icon: '📝', name: '日志查看', desc: '系统运行日志', action: 'viewLogs' },
        { icon: '🧪', name: '测试功能', desc: '功能测试工具', action: 'testFeatures' },
        { icon: '📈', name: '性能监控', desc: '应用性能分析', action: 'performance' }
      ]
    },
    
    // 测试数据（仅开发者可见）
    testData: {
      apiCalls: 156,
      errorCount: 3,
      responseTime: '245ms',
      userCount: 1234,
      lastUpdate: '2024-01-15 14:30:00'
    }
  },

  onLoad() {
    this.initializeEnvironment()
  },

  onShow() {
    // 每次显示时重新检查环境
    this.refreshEnvironment()
  },

  // 初始化环境
  initializeEnvironment() {
    const env = envDetector.getEnvironmentSummary()
    
    this.setData({
      isDeveloper: env.isDeveloper,
      isTester: env.isTester,
      isProduction: env.isProduction,
      canShowDevTools: envDetector.canShowDevTools()
    })

    // 开发者模式下显示详细信息
    if (env.isDeveloper) {
      console.log('🔧 开发者模式已激活')
      console.log('环境信息:', env)
      this.loadDeveloperFeatures()
    } else {
      console.log('👤 用户模式 - 隐藏开发工具')
    }
  },

  // 刷新环境状态
  refreshEnvironment() {
    this.initializeEnvironment()
  },

  // 加载开发者功能
  loadDeveloperFeatures() {
    // 模拟加载开发者专用数据
    const testData = {
      ...this.data.testData,
      lastUpdate: new Date().toLocaleString()
    }
    
    this.setData({ testData })
  },

  // === 用户功能 ===
  
  // 用户功能点击
  onUserFeatureTap(e) {
    const { name } = e.currentTarget.dataset
    
    wx.showModal({
      title: name,
      content: '这是用户看到的正常功能',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 查看茶叶产品
  viewProducts() {
    wx.showToast({
      title: '跳转到产品页面',
      icon: 'success'
    })
  },

  // 联系客服
  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '客服电话：400-123-4567\n工作时间：9:00-18:00',
      showCancel: false
    })
  },

  // === 开发者功能 ===

  // 开发者功能点击
  onDeveloperFeatureTap(e) {
    const { action } = e.currentTarget.dataset
    
    switch(action) {
      case 'dataManagement':
        this.openDataManagement()
        break
      case 'debugTools':
        this.openDebugTools()
        break
      case 'envSwitch':
        this.openEnvSwitch()
        break
      case 'viewLogs':
        this.viewSystemLogs()
        break
      case 'testFeatures':
        this.openTestFeatures()
        break
      case 'performance':
        this.viewPerformance()
        break
      default:
        wx.showToast({
          title: `${action} 功能开发中`,
          icon: 'none'
        })
    }
  },

  // 打开数据管理
  openDataManagement() {
    wx.navigateTo({
      url: '/pages/data-admin/data-admin',
      fail: () => {
        wx.showToast({
          title: '数据管理页面开发中',
          icon: 'none'
        })
      }
    })
  },

  // 打开调试工具
  openDebugTools() {
    wx.navigateTo({
      url: '/pages/debug-env/debug-env',
      fail: () => {
        wx.showToast({
          title: '调试工具页面开发中',
          icon: 'none'
        })
      }
    })
  },

  // 打开环境切换
  openEnvSwitch() {
    wx.navigateTo({
      url: '/pages/env-switcher/env-switcher',
      fail: () => {
        wx.showToast({
          title: '环境切换页面开发中',
          icon: 'none'
        })
      }
    })
  },

  // 查看系统日志
  viewSystemLogs() {
    const logs = [
      '[14:30:15] 用户登录成功',
      '[14:29:45] API调用：获取商户列表',
      '[14:29:30] 数据缓存更新',
      '[14:29:12] 环境检测：开发版',
      '[14:29:00] 应用启动'
    ]

    wx.showModal({
      title: '系统日志 (最近5条)',
      content: logs.join('\n'),
      showCancel: false,
      confirmText: '关闭'
    })
  },

  // 打开测试功能
  openTestFeatures() {
    wx.showActionSheet({
      itemList: [
        '🧪 测试用户注册',
        '🔄 测试数据同步', 
        '📤 测试消息推送',
        '🎯 测试支付流程',
        '📊 测试数据统计'
      ],
      success: (res) => {
        const features = [
          '用户注册测试',
          '数据同步测试', 
          '消息推送测试',
          '支付流程测试',
          '数据统计测试'
        ]
        
        wx.showToast({
          title: `${features[res.tapIndex]} 执行中...`,
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },

  // 查看性能数据
  viewPerformance() {
    const performanceData = `📈 应用性能报告

🔹 API调用次数：${this.data.testData.apiCalls}
🔹 错误次数：${this.data.testData.errorCount}
🔹 平均响应时间：${this.data.testData.responseTime}
🔹 在线用户数：${this.data.testData.userCount}
🔹 最后更新：${this.data.testData.lastUpdate}

💡 建议：响应时间正常，系统运行稳定`

    wx.showModal({
      title: '性能监控',
      content: performanceData,
      showCancel: false,
      confirmText: '关闭'
    })
  },

  // === 环境信息 ===

  // 显示环境信息
  showEnvironmentInfo() {
    const env = envDetector.getEnvironmentSummary()
    const info = `🌐 当前环境：${env.environment}
📱 版本类型：${env.version}
👨‍💻 开发者模式：${env.isDeveloper ? '开启' : '关闭'}
🧪 测试模式：${env.isTester ? '开启' : '关闭'}
🔧 开发工具：${env.canShowDevTools ? '可用' : '隐藏'}
⏰ 检测时间：${new Date(env.timestamp).toLocaleString()}`

    wx.showModal({
      title: '环境信息',
      content: info,
      showCancel: false,
      confirmText: '关闭'
    })
  },

  // 导出环境配置
  exportEnvironmentConfig() {
    const config = envDetector.exportConfig()
    
    wx.setClipboardData({
      data: JSON.stringify(config, null, 2),
      success: () => {
        wx.showToast({
          title: '环境配置已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  }
}) 