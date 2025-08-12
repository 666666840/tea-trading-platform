// 引入外部文章API
const { contentAPIManager, CONTENT_API_CONFIG } = require('../../utils/content-api.js')
const { rssParser } = require('../../utils/rss-parser.js')

Page({
  data: {
    // 页面状态
    loading: false,
    activeTab: 'config',
    
    // 内容源配置
    contentSource: {
      useExternal: true,
      useRSS: true,
      useLocal: true,
      externalPriority: 0.7,
      localPriority: 0.3
    },
    
    // 外部API配置
    externalAPIs: [
      {
        name: '茶叶行业资讯',
        baseUrl: 'https://api.tea-news.com',
        status: 'connected',
        lastCheck: '2024-03-15 10:30',
        articleCount: 1250
      },
      {
        name: '茶艺文化网站',
        baseUrl: 'https://api.tea-culture.com',
        status: 'connected',
        lastCheck: '2024-03-15 10:25',
        articleCount: 890
      },
      {
        name: '茶叶市场数据',
        baseUrl: 'https://api.tea-market.com',
        status: 'connected',
        lastCheck: '2024-03-15 10:20',
        articleCount: 1560
      }
    ],
    
    // RSS源配置
    rssFeeds: [
      {
        name: '中国茶叶网',
        url: 'https://www.chinatea.com/rss.xml',
        category: 'news',
        status: 'active',
        lastUpdate: '2024-03-15 10:30',
        articleCount: 45
      },
      {
        name: '茶艺网',
        url: 'https://www.tea-art.com/rss.xml',
        category: 'art',
        status: 'active',
        lastUpdate: '2024-03-15 10:25',
        articleCount: 32
      },
      {
        name: '茶叶市场网',
        url: 'https://www.tea-market.com/rss.xml',
        category: 'market',
        status: 'active',
        lastUpdate: '2024-03-15 10:20',
        articleCount: 28
      }
    ],
    
    // 内容统计
    contentStats: {
      totalArticles: 0,
      externalArticles: 0,
      rssArticles: 0,
      localArticles: 0,
      lastUpdate: null
    },
    
    // 网络状态
    networkStatus: {
      externalAvailable: true,
      rssAvailable: true,
      lastCheck: null
    }
  },

  onLoad() {
    console.log('内容管理页面加载完成')
    this.loadContentStats()
    this.checkNetworkStatus()
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 内容安全审核钩子（可扩展：敏感词检测、违规内容过滤等）
  contentSafetyCheck(article) {
    // 示例：简单敏感词检测
    const sensitiveWords = ['违规', '涉黄', '违法', '广告'];
    for (const word of sensitiveWords) {
      if (article.title.includes(word) || article.content.includes(word)) {
        return false; // 不通过审核
      }
    }
    return true; // 通过审核
  },

  // 加载内容统计（聚合时增加内容安全审核）
  async loadContentStats() {
    this.setData({ loading: true })
    try {
      // 模拟统计数据
      let articles = [
        // ...假设有内容数据结构...
        { title: '茶叶市场动态', content: '...', id: 1 },
        { title: '违规内容示例', content: '...', id: 2 }
      ];
      // 内容安全审核过滤
      articles = articles.filter(this.contentSafetyCheck);
      const stats = {
        totalArticles: articles.length,
        externalArticles: 1980,
        rssArticles: 560,
        localArticles: 300,
        lastUpdate: new Date().toLocaleString()
      }
      this.setData({ 
        contentStats: stats,
        loading: false
      })
    } catch (error) {
      console.error('加载内容统计失败:', error)
      this.setData({ loading: false })
    }
  },

  // 检查网络状态
  async checkNetworkStatus() {
    try {
      // 测试外部API连接
      const externalTest = await contentAPIManager.getExternalArticles('recommend', 1, 1)
      
      // 测试RSS连接
      const rssFeeds = rssParser.getRSSFeedsByCategory('news')
      let rssTest = { success: false }
      if (rssFeeds.length > 0) {
        rssTest = await rssParser.testRSSFeed(rssFeeds[0].url)
      }
      
      this.setData({
        'networkStatus.externalAvailable': externalTest.length > 0,
        'networkStatus.rssAvailable': rssTest.success,
        'networkStatus.lastCheck': new Date().toLocaleString()
      })
    } catch (error) {
      console.error('网络状态检查失败:', error)
      this.setData({
        'networkStatus.externalAvailable': false,
        'networkStatus.rssAvailable': false
      })
    }
  },

  // 切换内容源开关
  toggleContentSource(e) {
    const { key } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`contentSource.${key}`]: value
    })
    
    // 保存配置
    wx.setStorageSync('contentSource', this.data.contentSource)
    
    wx.showToast({
      title: value ? '已启用' : '已禁用',
      icon: 'success'
    })
  },

  // 调整内容优先级
  adjustPriority(e) {
    const { key } = e.currentTarget.dataset
    const value = parseFloat(e.detail.value)
    
    this.setData({
      [`contentSource.${key}`]: value
    })
    
    // 保存配置
    wx.setStorageSync('contentSource', this.data.contentSource)
  },

  // 测试API连接
  async testAPIConnection(e) {
    const { index } = e.currentTarget.dataset
    const api = this.data.externalAPIs[index]
    
    wx.showLoading({ title: '测试连接中...' })
    
    try {
      // 模拟API测试
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const apis = [...this.data.externalAPIs]
      apis[index].status = 'connected'
      apis[index].lastCheck = new Date().toLocaleString()
      
      this.setData({ externalAPIs: apis })
      
      wx.hideLoading()
      wx.showToast({
        title: '连接成功',
        icon: 'success'
      })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '连接失败',
        icon: 'error'
      })
    }
  },

  // 测试RSS源
  async testRSSFeed(e) {
    const { index } = e.currentTarget.dataset
    const feed = this.data.rssFeeds[index]
    
    wx.showLoading({ title: '测试RSS源...' })
    
    try {
      // 检查URL是否有效
      if (!rssParser.isValidUrl(feed.url)) {
        throw new Error('无效的URL格式')
      }
      
      const result = await rssParser.testRSSFeed(feed.url)
      
      const feeds = [...this.data.rssFeeds]
      feeds[index].status = result.success ? 'active' : 'error'
      feeds[index].lastUpdate = new Date().toLocaleString()
      feeds[index].articleCount = result.articleCount || 0
      
      this.setData({ rssFeeds: feeds })
      
      wx.hideLoading()
      wx.showToast({
        title: result.success ? 'RSS源正常' : 'RSS源异常',
        icon: result.success ? 'success' : 'error'
      })
    } catch (error) {
      wx.hideLoading()
      
      const feeds = [...this.data.rssFeeds]
      feeds[index].status = 'error'
      feeds[index].lastUpdate = new Date().toLocaleString()
      feeds[index].articleCount = 0
      
      this.setData({ rssFeeds: feeds })
      
      wx.showToast({
        title: '测试失败',
        icon: 'error'
      })
    }
  },

  // 添加RSS源
  addRSSFeed() {
    wx.showModal({
      title: '添加RSS源',
      content: '请输入RSS源的URL地址',
      editable: true,
      placeholderText: 'https://example.com/rss.xml',
      success: (res) => {
        if (res.confirm && res.content) {
          this.handleAddRSSFeed(res.content)
        }
      }
    })
  },

  // 处理添加RSS源
  async handleAddRSSFeed(url) {
    try {
      // 检查URL是否有效
      if (!rssParser.isValidUrl(url)) {
        wx.showToast({
          title: 'URL格式无效',
          icon: 'error'
        })
        return
      }
      
      // 测试RSS源
      const result = await rssParser.testRSSFeed(url)
      
      if (result.success) {
        const newFeed = {
          name: '新RSS源',
          url: url,
          category: 'news',
          status: 'active',
          lastUpdate: new Date().toLocaleString(),
          articleCount: result.articleCount || 0
        }
        
        const feeds = [...this.data.rssFeeds, newFeed]
        this.setData({ rssFeeds: feeds })
        
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: 'RSS源无效',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('添加RSS源失败:', error)
      wx.showToast({
        title: '添加失败',
        icon: 'error'
      })
    }
  },

  // 删除RSS源
  deleteRSSFeed(e) {
    const { index } = e.currentTarget.dataset
    const feed = this.data.rssFeeds[index]
    
    wx.showModal({
      title: '删除RSS源',
      content: `确定要删除"${feed.name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          const feeds = [...this.data.rssFeeds]
          feeds.splice(index, 1)
          this.setData({ rssFeeds: feeds })
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 刷新内容
  async refreshContent() {
    wx.showLoading({ title: '刷新内容中...' })
    
    try {
      // 清除缓存
      contentAPIManager.clearCache()
      
      // 重新加载内容统计
      await this.loadContentStats()
      
      // 重新检查网络状态
      await this.checkNetworkStatus()
      
      wx.hideLoading()
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '刷新失败',
        icon: 'error'
      })
    }
  },

  // 导出配置
  exportConfig() {
    const config = {
      contentSource: this.data.contentSource,
      externalAPIs: this.data.externalAPIs,
      rssFeeds: this.data.rssFeeds,
      exportTime: new Date().toISOString()
    }
    
    const configStr = JSON.stringify(config, null, 2)
    
    wx.setClipboardData({
      data: configStr,
      success: () => {
        wx.showToast({
          title: '配置已复制',
          icon: 'success'
        })
      }
    })
  },

  // 导入配置
  importConfig() {
    wx.showModal({
      title: '导入配置',
      content: '请将配置JSON粘贴到输入框中',
      editable: true,
      placeholderText: '{"contentSource": {...}}',
      success: (res) => {
        if (res.confirm && res.content) {
          this.handleImportConfig(res.content)
        }
      }
    })
  },

  // 处理导入配置
  handleImportConfig(configStr) {
    try {
      const config = JSON.parse(configStr)
      
      if (config.contentSource) {
        this.setData({ contentSource: config.contentSource })
        wx.setStorageSync('contentSource', config.contentSource)
      }
      
      if (config.rssFeeds) {
        this.setData({ rssFeeds: config.rssFeeds })
      }
      
      wx.showToast({
        title: '导入成功',
        icon: 'success'
      })
    } catch (error) {
      wx.showToast({
        title: '配置格式错误',
        icon: 'error'
      })
    }
  },

  // 重置配置
  resetConfig() {
    wx.showModal({
      title: '重置配置',
      content: '确定要恢复默认配置吗？此操作不可撤销。',
      success: (res) => {
        if (res.confirm) {
          const defaultConfig = {
            useExternal: true,
            useRSS: true,
            useLocal: true,
            externalPriority: 0.7,
            localPriority: 0.3
          }
          
          this.setData({ contentSource: defaultConfig })
          wx.setStorageSync('contentSource', defaultConfig)
          
          wx.showToast({
            title: '重置成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 查看内容详情
  viewContentDetail(e) {
    const { type, index } = e.currentTarget.dataset
    
    if (type === 'external') {
      const api = this.data.externalAPIs[index]
      wx.showModal({
        title: api.name,
        content: `基础URL: ${api.baseUrl}\n状态: ${api.status}\n文章数量: ${api.articleCount}\n最后检查: ${api.lastCheck}`,
        showCancel: false
      })
    } else if (type === 'rss') {
      const feed = this.data.rssFeeds[index]
      wx.showModal({
        title: feed.name,
        content: `URL: ${feed.url}\n分类: ${feed.category}\n状态: ${feed.status}\n文章数量: ${feed.articleCount}\n最后更新: ${feed.lastUpdate}`,
        showCancel: false
      })
    }
  }
}) 