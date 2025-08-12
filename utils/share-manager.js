// 分享管理器 - 统一处理分享功能
class ShareManager {
  constructor() {
    this.shareHistory = []
    this.shareStats = {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    }
    this.storageKey = 'shareHistory'
    this.loadShareHistory()
  }

  /**
   * 加载分享历史
   */
  loadShareHistory() {
    try {
      const history = wx.getStorageSync(this.shareHistory) || []
      this.shareHistory = history
      this.updateShareStats()
    } catch (error) {
      console.error('加载分享历史失败:', error)
    }
  }

  /**
   * 保存分享历史
   */
  saveShareHistory() {
    try {
      wx.setStorageSync(this.storageKey, this.shareHistory)
    } catch (error) {
      console.error('保存分享历史失败:', error)
    }
  }

  /**
   * 更新分享统计
   */
  updateShareStats() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    this.shareStats = {
      total: this.shareHistory.length,
      today: this.shareHistory.filter(item => 
        new Date(item.shareTime) >= today
      ).length,
      thisWeek: this.shareHistory.filter(item => 
        new Date(item.shareTime) >= thisWeek
      ).length,
      thisMonth: this.shareHistory.filter(item => 
        new Date(item.shareTime) >= thisMonth
      ).length
    }
  }

  /**
   * 记录分享行为
   */
  recordShare(shareData) {
    const shareRecord = {
      id: Date.now() + Math.random(),
      type: shareData.type,
      title: shareData.title,
      path: shareData.path,
      imageUrl: shareData.imageUrl,
      shareTime: new Date().toISOString(),
      platform: shareData.platform || 'wechat',
      contentId: shareData.contentId || null,
      userId: shareData.userId || null
    }

    this.shareHistory.unshift(shareRecord)
    
    // 保持历史记录不超过100条
    if (this.shareHistory.length > 100) {
      this.shareHistory = this.shareHistory.slice(0, 100)
    }

    this.saveShareHistory()
    this.updateShareStats()

    return shareRecord
  }

  /**
   * 生成分享内容 - 市场
   */
  generateMarketShare(marketInfo) {
    const shareData = {
      type: 'market',
      title: `${marketInfo.name} - 茶叶批发市场`,
      path: `/pages/market-detail/market-detail?id=${marketInfo.id}`,
      imageUrl: marketInfo.image || '/images/default-market.jpg',
      contentId: marketInfo.id,
      desc: `📍 ${marketInfo.address}\n🏪 ${marketInfo.shopCount || 0}家商户\n📱 茶叶一点通小程序`
    }

    return this.createShareObject(shareData)
  }

  /**
   * 生成分享内容 - 供求信息
   */
  generateSupplyShare(supplyInfo) {
    const typeText = supplyInfo.type === 'supply' ? '供应' : '求购'
    const shareData = {
      type: 'supply',
      title: `${typeText}: ${supplyInfo.title}`,
      path: `/pages/supply-detail/supply-detail?id=${supplyInfo.id}`,
      imageUrl: supplyInfo.image || '/images/default-supply.jpg',
      contentId: supplyInfo.id,
      desc: `💰 ${supplyInfo.price || '价格面议'}\n📍 ${supplyInfo.location || '详情请联系'}\n📱 茶叶一点通小程序`
    }

    return this.createShareObject(shareData)
  }

  /**
   * 生成分享内容 - 新品到货
   */
  generateNewArrivalShare(newArrivalInfo) {
    const shareData = {
      type: 'newarrival',
      title: `新品到货: ${newArrivalInfo.title}`,
      path: `/pages/newarrival-detail/newarrival-detail?id=${newArrivalInfo.id}`,
      imageUrl: newArrivalInfo.image || '/images/default-newarrival.jpg',
      contentId: newArrivalInfo.id,
      desc: `🆕 ${newArrivalInfo.category || '茶叶'}\n💰 ${newArrivalInfo.price || '价格面议'}\n📱 茶叶一点通小程序`
    }

    return this.createShareObject(shareData)
  }

  /**
   * 生成分享内容 - 特价尾货
   */
  generateClearanceShare(clearanceInfo) {
    const shareData = {
      type: 'clearance',
      title: `特价尾货: ${clearanceInfo.title}`,
      path: `/pages/clearance-detail/clearance-detail?id=${clearanceInfo.id}`,
      imageUrl: clearanceInfo.image || '/images/default-clearance.jpg',
      contentId: clearanceInfo.id,
      desc: `🔥 特价优惠\n💰 ${clearanceInfo.price || '价格面议'}\n📱 茶叶一点通小程序`
    }

    return this.createShareObject(shareData)
  }

  /**
   * 生成分享内容 - 茶园直通
   */
  generateGardenShare(gardenInfo) {
    const shareData = {
      type: 'garden',
      title: `茶园直通: ${gardenInfo.name}`,
      path: `/pages/garden-detail/garden-detail?id=${gardenInfo.id}`,
      imageUrl: gardenInfo.image || '/images/default-garden.jpg',
      contentId: gardenInfo.id,
      desc: `🌱 ${gardenInfo.area || ''}亩茶园\n📍 ${gardenInfo.location || ''}\n📱 茶叶一点通小程序`
    }

    return this.createShareObject(shareData)
  }

  /**
   * 生成分享内容 - 文章内容
   */
  generateArticleShare(articleInfo) {
    const shareData = {
      type: 'article',
      title: articleInfo.title,
      path: `/pages/content-detail/content-detail?id=${articleInfo.id}`,
      imageUrl: articleInfo.cover || '/images/default-article.jpg',
      contentId: articleInfo.id,
      desc: `📰 ${articleInfo.summary || '茶叶资讯'}\n📱 茶叶一点通小程序`
    }

    return this.createShareObject(shareData)
  }

  /**
   * 生成分享内容 - 小程序首页
   */
  generateAppShare(customMessage = '') {
    const shareData = {
      type: 'app',
      title: '茶叶一点通 - 专业的茶叶批发平台',
      path: '/pages/index/index',
      imageUrl: '/images/app-share.jpg',
      desc: customMessage || '🍵 找茶叶，上茶叶一点通\n📱 小程序内容丰富，功能强大'
    }

    return this.createShareObject(shareData)
  }

  /**
   * 创建分享对象
   */
  createShareObject(shareData) {
    const shareObject = {
      title: shareData.title,
      path: shareData.path,
      imageUrl: shareData.imageUrl,
      desc: shareData.desc,
      success: (res) => {
        // 记录分享成功
        this.recordShare({
          ...shareData,
          platform: 'wechat',
          result: 'success'
        })
        
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        })
      },
      fail: (res) => {
        // 记录分享失败
        this.recordShare({
          ...shareData,
          platform: 'wechat',
          result: 'fail',
          error: res.errMsg
        })
        
        console.error('分享失败:', res.errMsg)
      }
    }

    return shareObject
  }

  /**
   * 显示分享面板
   */
  showSharePanel(shareData, options = {}) {
    const { showCopyLink = true, showSaveImage = true } = options
    
    const actionItems = ['微信好友', '朋友圈']
    
    if (showCopyLink) {
      actionItems.push('复制链接')
    }
    
    if (showSaveImage) {
      actionItems.push('保存图片')
    }
    
    wx.showActionSheet({
      itemList: actionItems,
      success: (res) => {
        const selectedItem = actionItems[res.tapIndex]
        
        switch (selectedItem) {
          case '微信好友':
            this.shareToWechat(shareData)
            break
          case '朋友圈':
            this.shareToMoments(shareData)
            break
          case '复制链接':
            this.copyShareLink(shareData)
            break
          case '保存图片':
            this.saveShareImage(shareData)
            break
        }
      }
    })
  }

  /**
   * 分享到微信
   */
  shareToWechat(shareData) {
    // 触发页面的 onShareAppMessage 事件
    const shareObj = this.createShareObject(shareData)
    
    // 如果在页面中，需要手动触发分享
    wx.showShareMenu({
      withShareTicket: true,
      success: () => {
        console.log('分享菜单显示成功')
      }
    })
    
    return shareObj
  }

  /**
   * 分享到朋友圈
   */
  shareToMoments(shareData) {
    // 微信小程序不支持直接分享到朋友圈
    // 这里可以生成海报图片让用户保存分享
    this.generateSharePoster(shareData)
  }

  /**
   * 复制分享链接
   */
  copyShareLink(shareData) {
    const link = `https://小程序链接.com${shareData.path}`
    
    wx.setClipboardData({
      data: link,
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        })
        
        this.recordShare({
          ...shareData,
          platform: 'clipboard',
          result: 'success'
        })
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'error'
        })
      }
    })
  }

  /**
   * 保存分享图片
   */
  saveShareImage(shareData) {
    // 这里可以实现保存分享图片的逻辑
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }

  /**
   * 生成分享海报
   */
  generateSharePoster(shareData) {
    // 这里可以实现生成分享海报的逻辑
    wx.showModal({
      title: '生成分享海报',
      content: '正在生成分享海报，请稍候...',
      showCancel: false
    })
  }

  /**
   * 获取分享历史
   */
  getShareHistory(limit = 20) {
    return this.shareHistory.slice(0, limit)
  }

  /**
   * 获取分享统计
   */
  getShareStats() {
    return this.shareStats
  }

  /**
   * 清空分享历史
   */
  clearShareHistory() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空分享历史吗？',
      success: (res) => {
        if (res.confirm) {
          this.shareHistory = []
          this.saveShareHistory()
          this.updateShareStats()
          
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  }

  /**
   * 获取热门分享内容
   */
  getPopularShares() {
    const contentCount = {}
    
    this.shareHistory.forEach(item => {
      if (item.contentId) {
        contentCount[item.contentId] = (contentCount[item.contentId] || 0) + 1
      }
    })
    
    return Object.entries(contentCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([contentId, count]) => ({
        contentId,
        shareCount: count
      }))
  }

  /**
   * 分享内容类型统计
   */
  getShareTypeStats() {
    const typeCount = {}
    
    this.shareHistory.forEach(item => {
      typeCount[item.type] = (typeCount[item.type] || 0) + 1
    })
    
    return typeCount
  }
}

// 创建全局分享管理器实例
const shareManager = new ShareManager()

// 导出便捷方法
const Share = {
  // 分享市场
  market(marketInfo) {
    return shareManager.generateMarketShare(marketInfo)
  },

  // 分享供求信息
  supply(supplyInfo) {
    return shareManager.generateSupplyShare(supplyInfo)
  },

  // 分享新品到货
  newarrival(newArrivalInfo) {
    return shareManager.generateNewArrivalShare(newArrivalInfo)
  },

  // 分享特价尾货
  clearance(clearanceInfo) {
    return shareManager.generateClearanceShare(clearanceInfo)
  },

  // 分享茶园直通
  garden(gardenInfo) {
    return shareManager.generateGardenShare(gardenInfo)
  },

  // 分享文章
  article(articleInfo) {
    return shareManager.generateArticleShare(articleInfo)
  },

  // 分享小程序
  app(customMessage) {
    return shareManager.generateAppShare(customMessage)
  },

  // 显示分享面板
  showPanel(shareData, options) {
    return shareManager.showSharePanel(shareData, options)
  },

  // 记录分享
  record(shareData) {
    return shareManager.recordShare(shareData)
  },

  // 获取分享历史
  getHistory(limit) {
    return shareManager.getShareHistory(limit)
  },

  // 获取分享统计
  getStats() {
    return shareManager.getShareStats()
  },

  // 清空历史
  clearHistory() {
    return shareManager.clearShareHistory()
  },

  // 获取热门分享
  getPopular() {
    return shareManager.getPopularShares()
  }
}

module.exports = {
  ShareManager,
  Share,
  shareManager
} 