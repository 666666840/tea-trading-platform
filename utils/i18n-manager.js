/**
 * 国际化管理器
 * 提供多语言支持、文本翻译等功能
 */

const { systemInfoHelper } = require('./system-info-helper')

class I18nManager {
  constructor() {
    this.currentLocale = 'zh-CN'
    this.fallbackLocale = 'zh-CN'
    this.storageKey = 'app_locale_preference'
    this.translations = {}
    this.supportedLocales = ['zh-CN', 'en-US', 'zh-TW']
    
    this.init()
  }

  /**
   * 初始化国际化管理器
   */
  init() {
    try {
      // 加载翻译文件
      this.loadTranslations()
      
      // 读取用户偏好设置
      const savedLocale = wx.getStorageSync(this.storageKey)
      if (savedLocale && this.supportedLocales.includes(savedLocale)) {
        this.currentLocale = savedLocale
      } else {
        // 自动检测系统语言
        this.currentLocale = this.detectSystemLocale()
      }

      console.log('国际化管理器初始化完成，当前语言:', this.currentLocale)
    } catch (error) {
      console.error('国际化管理器初始化失败:', error)
      this.currentLocale = this.fallbackLocale
    }
  }

  /**
   * 加载翻译文件
   */
  loadTranslations() {
    // 简体中文
    this.translations['zh-CN'] = {
      common: {
        loading: '加载中...',
        confirm: '确定',
        cancel: '取消',
        submit: '提交',
        save: '保存',
        delete: '删除',
        edit: '编辑',
        search: '搜索',
        refresh: '刷新',
        more: '更多',
        back: '返回',
        home: '首页',
        profile: '个人中心',
        settings: '设置',
        about: '关于',
        help: '帮助',
        feedback: '反馈',
        share: '分享',
        favorite: '收藏',
        history: '历史',
        login: '登录',
        logout: '退出',
        register: '注册'
      },
      business: {
        teaMarket: '茶叶市场',
        merchant: '商户',
        teaGarden: '茶园',
        brand: '品牌',
        supply: '供应',
        demand: '求购',
        newArrival: '新品到货',
        clearance: '尾货清仓',
        rental: '出租转让',
        inquiry: '采购询价',
        smartTea: '智慧茶业',
        merchantJoin: '商户入驻',
        categoryPrice: '品类行情',
        marketMap: '市场地图'
      },
      messages: {
        networkError: '网络连接失败，请检查网络设置',
        loadingFailed: '加载失败，请稍后重试',
        operationSuccess: '操作成功',
        operationFailed: '操作失败',
        noData: '暂无数据',
        noMoreData: '没有更多数据了',
        pleaseWait: '请稍候...',
        developing: '功能开发中',
        comingSoon: '即将上线'
      },
      forms: {
        required: '此项为必填项',
        invalidPhone: '请输入正确的手机号',
        invalidEmail: '请输入正确的邮箱地址',
        passwordTooShort: '密码至少6位字符',
        confirmPassword: '两次密码输入不一致'
      }
    }

    // 英文
    this.translations['en-US'] = {
      common: {
        loading: 'Loading...',
        confirm: 'Confirm',
        cancel: 'Cancel',
        submit: 'Submit',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        search: 'Search',
        refresh: 'Refresh',
        more: 'More',
        back: 'Back',
        home: 'Home',
        profile: 'Profile',
        settings: 'Settings',
        about: 'About',
        help: 'Help',
        feedback: 'Feedback',
        share: 'Share',
        favorite: 'Favorite',
        history: 'History',
        login: 'Login',
        logout: 'Logout',
        register: 'Register'
      },
      business: {
        teaMarket: 'Tea Market',
        merchant: 'Merchant',
        teaGarden: 'Tea Garden',
        brand: 'Brand',
        supply: 'Supply',
        demand: 'Demand',
        newArrival: 'New Arrival',
        clearance: 'Clearance',
        rental: 'Rental',
        inquiry: 'Inquiry',
        smartTea: 'Smart Tea',
        merchantJoin: 'Merchant Join',
        categoryPrice: 'Category Price',
        marketMap: 'Market Map'
      },
      messages: {
        networkError: 'Network connection failed, please check network settings',
        loadingFailed: 'Loading failed, please try again later',
        operationSuccess: 'Operation successful',
        operationFailed: 'Operation failed',
        noData: 'No data available',
        noMoreData: 'No more data',
        pleaseWait: 'Please wait...',
        developing: 'Feature in development',
        comingSoon: 'Coming soon'
      },
      forms: {
        required: 'This field is required',
        invalidPhone: 'Please enter a valid phone number',
        invalidEmail: 'Please enter a valid email address',
        passwordTooShort: 'Password must be at least 6 characters',
        confirmPassword: 'Password confirmation does not match'
      }
    }

    // 繁体中文
    this.translations['zh-TW'] = {
      common: {
        loading: '載入中...',
        confirm: '確定',
        cancel: '取消',
        submit: '提交',
        save: '儲存',
        delete: '刪除',
        edit: '編輯',
        search: '搜尋',
        refresh: '重新整理',
        more: '更多',
        back: '返回',
        home: '首頁',
        profile: '個人中心',
        settings: '設定',
        about: '關於',
        help: '說明',
        feedback: '意見回饋',
        share: '分享',
        favorite: '收藏',
        history: '歷史',
        login: '登入',
        logout: '登出',
        register: '註冊'
      },
      business: {
        teaMarket: '茶葉市場',
        merchant: '商戶',
        teaGarden: '茶園',
        brand: '品牌',
        supply: '供應',
        demand: '求購',
        newArrival: '新品到貨',
        clearance: '尾貨清倉',
        rental: '出租轉讓',
        inquiry: '採購詢價',
        smartTea: '智慧茶業',
        merchantJoin: '商戶入駐',
        categoryPrice: '品類行情',
        marketMap: '市場地圖'
      },
      messages: {
        networkError: '網路連線失敗，請檢查網路設定',
        loadingFailed: '載入失敗，請稍後重試',
        operationSuccess: '操作成功',
        operationFailed: '操作失敗',
        noData: '暫無資料',
        noMoreData: '沒有更多資料了',
        pleaseWait: '請稍候...',
        developing: '功能開發中',
        comingSoon: '即將上線'
      },
      forms: {
        required: '此項為必填項',
        invalidPhone: '請輸入正確的手機號碼',
        invalidEmail: '請輸入正確的電子信箱',
        passwordTooShort: '密碼至少6位字元',
        confirmPassword: '兩次密碼輸入不一致'
      }
    }
  }

  /**
   * 检测系统语言
   */
  detectSystemLocale() {
    try {
      const systemInfo = systemInfoHelper.getSystemInfo()
      const systemLanguage = systemInfo.language || 'zh_CN'
      
      // 转换为标准格式
      const localeMap = {
        'zh_CN': 'zh-CN',
        'zh-CN': 'zh-CN',
        'zh_TW': 'zh-TW',
        'zh-TW': 'zh-TW',
        'en': 'en-US',
        'en_US': 'en-US',
        'en-US': 'en-US'
      }

      const detectedLocale = localeMap[systemLanguage] || 'zh-CN'
      
      if (this.supportedLocales.includes(detectedLocale)) {
        return detectedLocale
      }
      
      return this.fallbackLocale
    } catch (error) {
      console.error('检测系统语言失败:', error)
      return this.fallbackLocale
    }
  }

  /**
   * 设置语言
   * @param {string} locale - 语言代码
   */
  setLocale(locale) {
    try {
      if (!this.supportedLocales.includes(locale)) {
        throw new Error(`不支持的语言: ${locale}`)
      }

      this.currentLocale = locale
      wx.setStorageSync(this.storageKey, locale)
      
      // 触发语言变化事件
      this.emitLocaleChange()
      
      return true
    } catch (error) {
      console.error('设置语言失败:', error)
      return false
    }
  }

  /**
   * 获取翻译文本
   * @param {string} key - 翻译键，支持点分隔的路径，如 'common.loading'
   * @param {object} params - 参数对象，用于替换占位符
   */
  t(key, params = {}) {
    try {
      const keys = key.split('.')
      let translation = this.translations[this.currentLocale]
      
      // 逐级查找翻译
      for (const k of keys) {
        if (translation && typeof translation === 'object' && translation[k] !== undefined) {
          translation = translation[k]
        } else {
          translation = null
          break
        }
      }

      // 如果没找到，尝试使用回退语言
      if (!translation) {
        let fallbackTranslation = this.translations[this.fallbackLocale]
        for (const k of keys) {
          if (fallbackTranslation && typeof fallbackTranslation === 'object' && fallbackTranslation[k] !== undefined) {
            fallbackTranslation = fallbackTranslation[k]
          } else {
            fallbackTranslation = null
            break
          }
        }
        translation = fallbackTranslation
      }

      // 如果还是没找到，返回原始键名
      if (!translation) {
        console.warn(`翻译未找到: ${key}`)
        return key
      }

      // 替换参数
      if (typeof translation === 'string' && Object.keys(params).length > 0) {
        return this.interpolate(translation, params)
      }

      return translation
    } catch (error) {
      console.error('获取翻译失败:', error)
      return key
    }
  }

  /**
   * 插值替换
   * @param {string} template - 模板字符串
   * @param {object} params - 参数对象
   */
  interpolate(template, params) {
    try {
      return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match
      })
    } catch (error) {
      console.error('插值替换失败:', error)
      return template
    }
  }

  /**
   * 获取当前语言信息
   */
  getCurrentLocale() {
    return {
      code: this.currentLocale,
      name: this.getLocaleName(this.currentLocale),
      direction: this.getTextDirection(this.currentLocale)
    }
  }

  /**
   * 获取语言名称
   * @param {string} locale - 语言代码
   */
  getLocaleName(locale) {
    const localeNames = {
      'zh-CN': '简体中文',
      'en-US': 'English',
      'zh-TW': '繁體中文'
    }
    return localeNames[locale] || locale
  }

  /**
   * 获取文本方向
   * @param {string} locale - 语言代码
   */
  getTextDirection(locale) {
    // 大部分语言都是从左到右
    const rtlLocales = ['ar', 'he', 'fa']
    return rtlLocales.some(rtl => locale.startsWith(rtl)) ? 'rtl' : 'ltr'
  }

  /**
   * 获取支持的语言列表
   */
  getSupportedLocales() {
    return this.supportedLocales.map(locale => ({
      code: locale,
      name: this.getLocaleName(locale),
      direction: this.getTextDirection(locale),
      isCurrent: locale === this.currentLocale
    }))
  }

  /**
   * 格式化数字
   * @param {number} number - 数字
   * @param {object} options - 格式化选项
   */
  formatNumber(number, options = {}) {
    try {
      if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
        return new Intl.NumberFormat(this.currentLocale, options).format(number)
      }
      
      // 简单回退
      return number.toLocaleString()
    } catch (error) {
      console.error('格式化数字失败:', error)
      return number.toString()
    }
  }

  /**
   * 格式化日期
   * @param {Date|string|number} date - 日期
   * @param {object} options - 格式化选项
   */
  formatDate(date, options = {}) {
    try {
      const dateObj = date instanceof Date ? date : new Date(date)
      
      if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(this.currentLocale, options).format(dateObj)
      }
      
      // 简单回退
      return dateObj.toLocaleDateString()
    } catch (error) {
      console.error('格式化日期失败:', error)
      return date.toString()
    }
  }

  /**
   * 格式化货币
   * @param {number} amount - 金额
   * @param {string} currency - 货币代码
   */
  formatCurrency(amount, currency = 'CNY') {
    try {
      if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
        return new Intl.NumberFormat(this.currentLocale, {
          style: 'currency',
          currency: currency
        }).format(amount)
      }
      
      // 简单回退
      const symbols = {
        'CNY': '¥',
        'USD': '$',
        'EUR': '€'
      }
      return `${symbols[currency] || currency} ${amount}`
    } catch (error) {
      console.error('格式化货币失败:', error)
      return `${amount} ${currency}`
    }
  }

  /**
   * 触发语言变化事件
   */
  emitLocaleChange() {
    try {
      const app = getApp()
      if (app && app.globalData) {
        app.globalData.currentLocale = this.currentLocale
        
        // 如果有事件总线，触发事件
        if (app.eventBus && app.eventBus.emit) {
          app.eventBus.emit('localeChanged', {
            locale: this.currentLocale,
            localeInfo: this.getCurrentLocale()
          })
        }
      }
    } catch (error) {
      console.error('触发语言变化事件失败:', error)
    }
  }

  /**
   * 创建语言选择器数据
   */
  createLocalePickerData() {
    return {
      currentLocale: this.getCurrentLocale(),
      supportedLocales: this.getSupportedLocales()
    }
  }

  /**
   * 批量翻译对象
   * @param {object} obj - 包含翻译键的对象
   */
  translateObject(obj) {
    try {
      const result = {}
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          result[key] = this.t(value)
        } else if (Array.isArray(value)) {
          result[key] = value.map(item => 
            typeof item === 'string' ? this.t(item) : item
          )
        } else {
          result[key] = value
        }
      }
      return result
    } catch (error) {
      console.error('批量翻译失败:', error)
      return obj
    }
  }
}

// 创建全局国际化管理器实例
const i18nManager = new I18nManager()

// 在 app.js 中使用的工具函数
function initI18nManager(app) {
  try {
    if (!app) {
      console.warn('initI18nManager: app参数未提供，跳过初始化')
      return
    }
    
    // 将国际化管理器添加到 app 实例
    app.i18nManager = i18nManager
    
    // 确保 globalData 存在
    if (!app.globalData) {
      app.globalData = {}
    }
    
    // 在 globalData 中添加语言信息
    app.globalData.locale = i18nManager.getCurrentLocale()
    
    // 添加全局翻译函数
    app.t = (key, params) => i18nManager.t(key, params)
    
    console.log('国际化管理器初始化完成')
  } catch (error) {
    console.error('国际化管理器初始化失败:', error)
  }
}

// 页面级国际化工具函数
function setupPageI18n(page) {
  const currentLocale = i18nManager.getCurrentLocale()
  
  // 设置页面数据
  page.setData({
    locale: currentLocale.code,
    localeInfo: currentLocale
  })
  
  // 添加页面翻译函数
  page.t = (key, params) => i18nManager.t(key, params)
  
  // 监听语言变化
  page.onLocaleChange = function(newLocale) {
    this.setData({
      locale: newLocale.locale,
      localeInfo: newLocale.localeInfo
    })
    
    // 重新加载页面文本
    if (typeof this.refreshPageText === 'function') {
      this.refreshPageText()
    }
  }
}

module.exports = {
  I18nManager,
  i18nManager,
  initI18nManager,
  setupPageI18n
} 