// 用户反馈管理器 - 统一处理用户反馈功能
const { systemInfoHelper } = require('./system-info-helper')
class FeedbackManager {
  constructor() {
    this.feedbacks = []
    this.storageKey = 'userFeedbacks'
    this.maxFeedbacks = 50 // 最大反馈数量
    
    this.loadFeedbacks()
  }

  /**
   * 加载反馈数据
   */
  loadFeedbacks() {
    try {
      const feedbacks = wx.getStorageSync(this.storageKey) || []
      this.feedbacks = feedbacks
    } catch (error) {
      console.error('加载反馈数据失败:', error)
    }
  }

  /**
   * 保存反馈数据
   */
  saveFeedbacks() {
    try {
      wx.setStorageSync(this.storageKey, this.feedbacks)
    } catch (error) {
      console.error('保存反馈数据失败:', error)
    }
  }

  /**
   * 提交反馈
   */
  submitFeedback(feedbackData) {
    const feedback = {
      id: Date.now() + Math.random(),
      type: feedbackData.type || 'suggestion', // suggestion, bug, complaint, praise
      title: feedbackData.title,
      content: feedbackData.content,
      rating: feedbackData.rating || null,
      contact: feedbackData.contact || '',
      images: feedbackData.images || [],
      page: feedbackData.page || '',
      deviceInfo: this.getDeviceInfo(),
      submitTime: new Date().toISOString(),
      status: 'pending', // pending, processing, resolved
      response: null
    }

    this.feedbacks.unshift(feedback)

    // 保持反馈数量不超过最大值
    if (this.feedbacks.length > this.maxFeedbacks) {
      this.feedbacks = this.feedbacks.slice(0, this.maxFeedbacks)
    }

    this.saveFeedbacks()

    // 显示提交成功提示
    this.showSubmitSuccess(feedback.type)

    return feedback
  }

  /**
   * 获取设备信息
   */
  getDeviceInfo() {
    try {
      const systemInfo = systemInfoHelper.getSystemInfo()
      return {
        platform: systemInfo.platform,
        system: systemInfo.system,
        version: systemInfo.version,
        brand: systemInfo.brand,
        model: systemInfo.model,
        pixelRatio: systemInfo.pixelRatio,
        screenWidth: systemInfo.screenWidth,
        screenHeight: systemInfo.screenHeight,
        language: systemInfo.language,
        wechatVersion: systemInfo.version,
        SDKVersion: systemInfo.SDKVersion
      }
    } catch (error) {
      console.error('获取设备信息失败:', error)
      return {}
    }
  }

  /**
   * 显示提交成功提示
   */
  showSubmitSuccess(type) {
    const messages = {
      suggestion: '建议已提交，感谢您的宝贵意见！',
      bug: '问题已反馈，我们会尽快处理！',
      complaint: '投诉已收到，我们将认真对待！',
      praise: '感谢您的认可和支持！'
    }

    wx.showToast({
      title: messages[type] || '反馈已提交',
      icon: 'success',
      duration: 3000
    })
  }

  /**
   * 快速反馈
   */
  quickFeedback(type, content, options = {}) {
    const quickFeedbackData = {
      type,
      title: this.getQuickTitle(type),
      content,
      page: options.page || '',
      rating: options.rating || null
    }

    return this.submitFeedback(quickFeedbackData)
  }

  /**
   * 获取快速反馈标题
   */
  getQuickTitle(type) {
    const titles = {
      suggestion: '功能建议',
      bug: '问题反馈',
      complaint: '意见投诉',
      praise: '表扬建议'
    }
    return titles[type] || '用户反馈'
  }

  /**
   * 页面问题反馈
   */
  reportPageIssue(pagePath, issueType, description) {
    const feedback = {
      type: 'bug',
      title: `页面问题反馈 - ${pagePath}`,
      content: `问题类型：${issueType}\n描述：${description}`,
      page: pagePath
    }

    return this.submitFeedback(feedback)
  }

  /**
   * 功能建议
   */
  suggestFeature(featureName, description, priority = 'medium') {
    const feedback = {
      type: 'suggestion',
      title: `功能建议 - ${featureName}`,
      content: `功能描述：${description}\n优先级：${priority}`,
    }

    return this.submitFeedback(feedback)
  }

  /**
   * 体验评价
   */
  submitExperience(rating, content, page = '') {
    const feedback = {
      type: rating >= 4 ? 'praise' : 'suggestion',
      title: '用户体验评价',
      content,
      rating,
      page
    }

    return this.submitFeedback(feedback)
  }

  /**
   * 获取反馈列表
   */
  getFeedbacks(options = {}) {
    const { 
      type = null, 
      status = null, 
      limit = null,
      offset = 0 
    } = options

    let filteredFeedbacks = this.feedbacks

    // 按类型筛选
    if (type) {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.type === type)
    }

    // 按状态筛选
    if (status) {
      filteredFeedbacks = filteredFeedbacks.filter(f => f.status === status)
    }

    // 分页
    if (limit) {
      filteredFeedbacks = filteredFeedbacks.slice(offset, offset + limit)
    }

    return filteredFeedbacks.map(feedback => ({
      ...feedback,
      timeText: this.formatTime(feedback.submitTime)
    }))
  }

  /**
   * 获取反馈统计
   */
  getFeedbackStats() {
    const stats = {
      total: this.feedbacks.length,
      types: {},
      statuses: {},
      ratings: {
        average: 0,
        distribution: {}
      }
    }

    // 按类型统计
    this.feedbacks.forEach(feedback => {
      // 类型统计
      if (!stats.types[feedback.type]) {
        stats.types[feedback.type] = 0
      }
      stats.types[feedback.type]++

      // 状态统计
      if (!stats.statuses[feedback.status]) {
        stats.statuses[feedback.status] = 0
      }
      stats.statuses[feedback.status]++

      // 评分统计
      if (feedback.rating) {
        if (!stats.ratings.distribution[feedback.rating]) {
          stats.ratings.distribution[feedback.rating] = 0
        }
        stats.ratings.distribution[feedback.rating]++
      }
    })

    // 计算平均评分
    const ratings = this.feedbacks.filter(f => f.rating).map(f => f.rating)
    if (ratings.length > 0) {
      stats.ratings.average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    }

    return stats
  }

  /**
   * 格式化时间
   */
  formatTime(timeString) {
    const time = new Date(timeString)
    const now = new Date()
    const diff = now - time

    if (diff < 60000) { // 1分钟内
      return '刚刚'
    } else if (diff < 3600000) { // 1小时内
      return `${Math.floor(diff / 60000)}分钟前`
    } else if (diff < 86400000) { // 1天内
      return `${Math.floor(diff / 3600000)}小时前`
    } else if (diff < 604800000) { // 1周内
      return `${Math.floor(diff / 86400000)}天前`
    } else {
      return time.toLocaleDateString()
    }
  }

  /**
   * 删除反馈
   */
  deleteFeedback(feedbackId) {
    const index = this.feedbacks.findIndex(f => f.id === feedbackId)
    if (index !== -1) {
      this.feedbacks.splice(index, 1)
      this.saveFeedbacks()
      return true
    }
    return false
  }

  /**
   * 清空反馈历史
   */
  clearFeedbacks() {
    this.feedbacks = []
    this.saveFeedbacks()
  }

  /**
   * 显示反馈对话框
   */
  showFeedbackDialog(options = {}) {
    const { 
      title = '意见反馈',
      placeholder = '请输入您的意见或建议...',
      showRating = false,
      showContact = false,
      page = ''
    } = options

    return new Promise((resolve, reject) => {
      // 这里实现一个简单的反馈对话框
      wx.showModal({
        title,
        content: '请选择反馈类型',
        showCancel: true,
        cancelText: '建议',
        confirmText: '问题',
        success: (res) => {
          const type = res.confirm ? 'bug' : 'suggestion'
          
          // 跳转到反馈页面
          wx.navigateTo({
            url: `/pages/feedback/feedback?type=${type}&page=${page}`,
            success: () => resolve(type),
            fail: reject
          })
        },
        fail: reject
      })
    })
  }

  /**
   * 快速评价弹窗
   */
  showQuickRating(page = '') {
    wx.showModal({
      title: '使用体验',
      content: '请为您的使用体验打分',
      showCancel: true,
      cancelText: '稍后',
      confirmText: '评价',
      success: (res) => {
        if (res.confirm) {
          // 跳转到评价页面
          wx.navigateTo({
            url: `/pages/feedback/feedback?type=rating&page=${page}`
          })
        }
      }
    })
  }

  /**
   * 页面错误自动反馈
   */
  autoReportError(error, page) {
    const feedback = {
      type: 'bug',
      title: `自动错误报告 - ${page}`,
      content: `错误信息：${error.message || error}\n错误堆栈：${error.stack || '无'}\n页面路径：${page}`,
      page,
      rating: null,
      contact: '',
      images: []
    }

    // 自动提交，但不显示成功提示
    const errorFeedback = {
      ...feedback,
      id: Date.now() + Math.random(),
      deviceInfo: this.getDeviceInfo(),
      submitTime: new Date().toISOString(),
      status: 'pending',
      response: null
    }

    this.feedbacks.unshift(errorFeedback)
    this.saveFeedbacks()

    return errorFeedback
  }

  /**
   * 获取常见问题
   */
  getCommonIssues() {
    return [
      {
        id: 1,
        question: '页面加载很慢怎么办？',
        answer: '请检查网络连接，或尝试重新进入页面。如果问题持续存在，请反馈给我们。',
        category: 'performance'
      },
      {
        id: 2,
        question: '如何联系商户？',
        answer: '在商品详情页点击"联系商户"按钮，需要消耗一定积分解锁联系方式。',
        category: 'usage'
      },
      {
        id: 3,
        question: '如何收藏商品？',
        answer: '在商品页面点击"收藏"按钮，收藏的商品可在"我的收藏"中查看。',
        category: 'usage'
      },
      {
        id: 4,
        question: '价格信息不准确怎么办？',
        answer: '价格信息由商户提供，如发现不准确请及时反馈，我们会联系商户更新。',
        category: 'content'
      },
      {
        id: 5,
        question: '如何发布供求信息？',
        answer: '进入"供求平台"，点击"发布"按钮，填写相关信息即可发布。',
        category: 'usage'
      }
    ]
  }

  /**
   * 搜索常见问题
   */
  searchCommonIssues(keyword) {
    const issues = this.getCommonIssues()
    if (!keyword) return issues

    return issues.filter(issue => 
      issue.question.includes(keyword) || 
      issue.answer.includes(keyword)
    )
  }
}

// 创建全局反馈管理器实例
const feedbackManager = new FeedbackManager()

// 导出便捷方法
const Feedback = {
  // 提交反馈
  submit(feedbackData) {
    return feedbackManager.submitFeedback(feedbackData)
  },

  // 快速反馈
  quick(type, content, options) {
    return feedbackManager.quickFeedback(type, content, options)
  },

  // 页面问题反馈
  reportPage(pagePath, issueType, description) {
    return feedbackManager.reportPageIssue(pagePath, issueType, description)
  },

  // 功能建议
  suggest(featureName, description, priority) {
    return feedbackManager.suggestFeature(featureName, description, priority)
  },

  // 体验评价
  rate(rating, content, page) {
    return feedbackManager.submitExperience(rating, content, page)
  },

  // 获取反馈列表
  getList(options) {
    return feedbackManager.getFeedbacks(options)
  },

  // 获取统计信息
  getStats() {
    return feedbackManager.getFeedbackStats()
  },

  // 删除反馈
  delete(id) {
    return feedbackManager.deleteFeedback(id)
  },

  // 清空反馈
  clear() {
    return feedbackManager.clearFeedbacks()
  },

  // 显示反馈对话框
  showDialog(options) {
    return feedbackManager.showFeedbackDialog(options)
  },

  // 快速评价
  showRating(page) {
    return feedbackManager.showQuickRating(page)
  },

  // 自动错误报告
  autoError(error, page) {
    return feedbackManager.autoReportError(error, page)
  },

  // 常见问题
  getCommonIssues() {
    return feedbackManager.getCommonIssues()
  },

  searchIssues(keyword) {
    return feedbackManager.searchCommonIssues(keyword)
  }
}

module.exports = {
  FeedbackManager,
  Feedback,
  feedbackManager
} 