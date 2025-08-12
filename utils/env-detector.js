// 环境检测工具模块
class EnvironmentDetector {
  constructor() {
    this.envInfo = null
    this.init()
  }

  // 初始化环境检测
  init() {
    this.envInfo = this.detectEnvironment()
  }

  // 检测当前运行环境
  detectEnvironment() {
    let wechatEnv = 'release' // 默认正式版
    let accountInfo = null

    try {
      // 使用微信官方API检测环境
      accountInfo = wx.getAccountInfoSync()
      wechatEnv = accountInfo.miniProgram.envVersion || 'release'
    } catch (error) {
      console.warn('环境检测失败，默认为正式版:', error)
    }

    return {
      // 微信环境信息
      wechatEnv: {
        version: wechatEnv,
        name: this.getEnvName(wechatEnv),
        description: this.getEnvDescription(wechatEnv),
        accountInfo: accountInfo
      },
      
      // 环境能力
      capabilities: {
        isDeveloper: wechatEnv === 'develop',
        isTester: wechatEnv === 'trial', 
        isProduction: wechatEnv === 'release',
        canShowDevTools: wechatEnv !== 'release',
        canSwitchMode: wechatEnv !== 'release',
        allowDebugFeatures: wechatEnv === 'develop',
        allowTestFeatures: wechatEnv !== 'release'
      },

      // 检测时间
      timestamp: new Date().toISOString()
    }
  }

  // 获取环境名称
  getEnvName(version) {
    const names = {
      'develop': '开发版',
      'trial': '体验版', 
      'release': '正式版'
    }
    return names[version] || '未知版本'
  }

  // 获取环境描述
  getEnvDescription(version) {
    const descriptions = {
      'develop': '通过微信开发者工具打开，具备完整开发调试功能',
      'trial': '通过体验版二维码打开，适合内测和验收',
      'release': '通过微信正式渠道打开，为用户提供稳定体验'
    }
    return descriptions[version] || '未知环境类型'
  }

  // 检查是否为开发者环境
  isDeveloperMode() {
    return this.envInfo?.capabilities?.isDeveloper || false
  }

  // 检查是否为测试环境
  isTesterMode() {
    return this.envInfo?.capabilities?.isTester || false
  }

  // 检查是否为生产环境
  isProductionMode() {
    return this.envInfo?.capabilities?.isProduction || true
  }

  // 检查是否可以显示开发工具
  canShowDevTools() {
    return this.envInfo?.capabilities?.canShowDevTools || false
  }

  // 检查是否可以切换模式
  canSwitchMode() {
    return this.envInfo?.capabilities?.canSwitchMode || false
  }

  // 检查是否允许调试功能
  allowDebugFeatures() {
    return this.envInfo?.capabilities?.allowDebugFeatures || false
  }

  // 检查是否允许测试功能
  allowTestFeatures() {
    return this.envInfo?.capabilities?.allowTestFeatures || false
  }

  // 获取完整环境信息
  getEnvironmentInfo() {
    return this.envInfo
  }

  // 获取环境状态摘要
  getEnvironmentSummary() {
    const env = this.envInfo
    return {
      environment: env.wechatEnv.name,
      version: env.wechatEnv.version,
      isDeveloper: this.isDeveloperMode(),
      isTester: this.isTesterMode(),
      isProduction: this.isProductionMode(),
      canShowDevTools: this.canShowDevTools(),
      timestamp: env.timestamp
    }
  }

  // 生成环境配置用于调试
  exportConfig() {
    return {
      detector: 'EnvironmentDetector v1.0',
      timestamp: new Date().toISOString(),
      environment: this.envInfo,
      summary: this.getEnvironmentSummary()
    }
  }
}

// 创建全局实例
const envDetector = new EnvironmentDetector()

module.exports = {
  EnvironmentDetector,
  envDetector
} 