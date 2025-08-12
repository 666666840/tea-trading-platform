const app = getApp()
const { API } = require('../../utils/api-manager')

Page({
  data: {
    loading: false,
    // 当前选中的Tab
    currentTab: 'all', // all: 全部, supply: 供应, demand: 求购
    
    // 供求信息列表
    supplyList: [],
    demandList: [],
    
    // 筛选选项
    filterOptions: [
      { value: 'all', label: '全部' },
      { value: 'supply', label: '供应信息' },
      { value: 'demand', label: '求购信息' }
    ],
    
    // 当前筛选状态
    currentFilter: {
      teaType: 'all',
      sort: 'recommend'
    },
    
    // 推荐信息
    recommendedList: [],
    
    // 加载状态
    loading: false,
    hasMore: true,
    
    // 搜索关键词
    searchKeyword: ''
  },

  onLoad() {
    this.loadSupplyData()
    // 添加一些模拟数据用于测试数字显示
    this.addMockData()
  },

  // 添加模拟数据用于测试
  addMockData() {
    // 模拟供应数据
    const mockSupplyList = [
      {
        id: 'supply_1',
        type: 'supply',
        typeText: '供应',
        title: '优质普洱茶供应',
        description: '云南勐海普洱茶，品质优良，价格实惠',
        teaType: '黑茶',
        teaSubType: '普洱茶',
        price: '¥180/斤',
        quantity: '500斤',
        location: '云南',
        market: '勐海',
        tags: ['优质', '实惠', '现货'],
        isNew: true,
        isRecommended: true,
        viewCount: 156,
        favoriteCount: 23,
        contactCount: 8,
        validityPeriod: '30天',
        updateTime: '2小时前',
        isFavorited: false,
        merchant: {
          name: '勐海茶厂',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=勐',
          rating: 4.8,
          isVerified: true,
          mainBusiness: '普洱茶生产'
        },
        images: ['https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=普洱茶']
      },
      {
        id: 'supply_2',
        type: 'supply',
        typeText: '供应',
        title: '明前龙井茶供应',
        description: '杭州西湖明前龙井，清香持久，回甘明显',
        teaType: '绿茶',
        teaSubType: '龙井茶',
        price: '¥320/斤',
        quantity: '200斤',
        location: '浙江',
        market: '杭州',
        tags: ['明前', '清香', '回甘'],
        isNew: true,
        isRecommended: false,
        viewCount: 89,
        favoriteCount: 15,
        contactCount: 5,
        validityPeriod: '15天',
        updateTime: '1天前',
        isFavorited: false,
        merchant: {
          name: '西湖茶庄',
          avatar: 'https://via.placeholder.com/60x60/2196F3/FFFFFF?text=西',
          rating: 4.6,
          isVerified: true,
          mainBusiness: '龙井茶销售'
        },
        images: ['https://via.placeholder.com/300x200/2196F3/FFFFFF?text=龙井茶']
      }
    ]

    // 模拟求购数据
    const mockDemandList = [
      {
        id: 'demand_1',
        type: 'demand',
        typeText: '求购',
        title: '求购老白茶',
        description: '求购5年以上老白茶，品质要求高，价格可议',
        teaType: '白茶',
        teaSubType: '老白茶',
        quantity: '100斤',
        budget: '¥500/斤',
        location: '福建',
        market: '福鼎',
        tags: ['老茶', '高品质', '价格可议'],
        isUrgent: true,
        isRecommended: true,
        viewCount: 234,
        favoriteCount: 12,
        contactCount: 15,
        validityPeriod: '7天',
        updateTime: '3小时前',
        isFavorited: false,
        requirements: ['5年以上', '品质优良', '有证书'],
        buyer: {
          name: '福鼎茶商',
          avatar: 'https://via.placeholder.com/60x60/FF9800/FFFFFF?text=福',
          rating: 4.9,
          isVerified: true,
          purchaseScale: '大型采购商'
        }
      },
      {
        id: 'demand_2',
        type: 'demand',
        typeText: '求购',
        title: '求购铁观音',
        description: '求购安溪铁观音，要求清香型，数量不限',
        teaType: '青茶',
        teaSubType: '铁观音',
        quantity: '不限',
        budget: '¥200-300/斤',
        location: '福建',
        market: '安溪',
        tags: ['清香型', '数量不限', '长期合作'],
        isUrgent: false,
        isRecommended: false,
        viewCount: 67,
        favoriteCount: 8,
        contactCount: 3,
        validityPeriod: '长期有效',
        updateTime: '2天前',
        isFavorited: false,
        requirements: ['清香型', '品质稳定', '长期供应'],
        buyer: {
          name: '安溪茶店',
          avatar: 'https://via.placeholder.com/60x60/9C27B0/FFFFFF?text=安',
          rating: 4.7,
          isVerified: true,
          purchaseScale: '中型采购商'
        }
      }
    ]

    // 设置模拟数据
    this.setData({
      supplyList: mockSupplyList,
      demandList: mockDemandList
    })

    console.log('模拟数据加载完成:', mockSupplyList.length, '条供应,', mockDemandList.length, '条求购')
  },

  // 加载供求数据 - 使用API
  async loadSupplyData(type = 'all', append = false) {
    this.setData({ loading: true })
    
    try {
      // 加载供应数据
      const supplyRes = await API.getSupplies('supply')
      const supplyList = supplyRes.data || []
      
      // 加载求购数据
      const demandRes = await API.getSupplies('demand')
      const demandList = demandRes.data || []
      
      if (append) {
        this.setData({
          supplyList: this.data.supplyList.concat(supplyList),
          demandList: this.data.demandList.concat(demandList),
          loading: false,
          hasMore: supplyList.length > 0 || demandList.length > 0
        })
      } else {
        this.setData({
          supplyList: supplyList,
          demandList: demandList,
          loading: false,
          hasMore: supplyList.length > 0 || demandList.length > 0
        })
      }
      
      console.log('供求数据加载完成:', supplyList.length, '条供应,', demandList.length, '条求购')
    } catch (error) {
      // API降级已在api-manager处理，这里只需关闭loading
      this.setData({ loading: false })
      wx.showToast({ title: '供求数据加载失败，已切换离线模式', icon: 'none' })
    }
  },

  onShow() {
    console.log('供求平台页面加载完成')
    this.loadUserPreferences && this.loadUserPreferences()
    this.generateRecommendations && this.generateRecommendations()
    this.sortList && this.sortList()
  },

  // 加载用户偏好
  loadUserPreferences() {
    // 模拟从本地存储或服务器获取用户偏好
    const preferences = this.data.currentUser.preferences
    const behaviorTags = this.data.currentUser.behaviorTags
    
    if (preferences.length > 0 || behaviorTags.length > 0) {
      this.setData({
        'currentUser.preferences': preferences,
        'currentUser.behaviorTags': behaviorTags
      })
    }
  },

  // 生成推荐列表
  generateRecommendations() {
    const { supplyList, demandList, currentUser } = this.data
    const preferences = currentUser.preferences
    const behaviorTags = currentUser.behaviorTags
    
    // 根据用户偏好和行为标签生成推荐
    let recommended = []
    
    // 供应信息推荐
    for (let i = 0; i < supplyList.length; i++) {
      const item = supplyList[i]
      let score = 0
      
      // 偏好匹配加分
      if (preferences.indexOf(item.teaType) !== -1) score += 10
      if (preferences.indexOf(item.teaSubType) !== -1) score += 8
      
      // 行为标签匹配加分
      for (let j = 0; j < behaviorTags.length; j++) {
        const tag = behaviorTags[j]
        if (item.tags.indexOf(tag) !== -1) score += 5
      }
      
      // 推荐标识加分
      if (item.isRecommended) score += 3
      
      // 新品加分
      if (item.isNew) score += 2
      
      // 同城加分
      if (item.location.indexOf(currentUser.location) !== -1) score += 3
      
      if (score > 0) {
        recommended.push({
          id: item.id,
          type: item.type,
          typeText: item.typeText,
          title: item.title,
          description: item.description,
          recommendScore: score
        })
      }
    }
    
    // 求购信息推荐
    for (let i = 0; i < demandList.length; i++) {
      const item = demandList[i]
      let score = 0
      
      // 偏好匹配加分
      if (preferences.indexOf(item.teaType) !== -1) score += 10
      if (preferences.indexOf(item.teaSubType) !== -1) score += 8
      
      // 行为标签匹配加分
      for (let j = 0; j < behaviorTags.length; j++) {
        const tag = behaviorTags[j]
        if (item.tags.indexOf(tag) !== -1) score += 5
      }
      
      // 推荐标识加分
      if (item.isRecommended) score += 3
      
      // 紧急加分
      if (item.isUrgent) score += 2
      
      if (score > 0) {
        recommended.push({
          id: item.id,
          type: item.type,
          typeText: item.typeText,
          title: item.title,
          description: item.description,
          recommendScore: score
        })
      }
    }
    
    // 按推荐度排序
    recommended.sort((a, b) => b.recommendScore - a.recommendScore)
    
    this.setData({ recommendedList: recommended.slice(0, 3) })
  },

  // Tab切换时重新加载
  onTabChange(e) {
    const { tab } = e.currentTarget.dataset
    this.setData({ currentTab: tab })
    // 数据已经在loadSupplyData中加载，这里只需要重新排序
    this.sortList && this.sortList()
  },

  // 切换筛选
  onFilterChange(e) {
    const { type, value } = e.currentTarget.dataset
    this.setData({
      [`currentFilter.${type}`]: value
    })
    this.filterAndSortList()
    
    // 查找对应的标签文本
    let label = ''
    for (let i = 0; i < this.data.filterOptions[type].length; i++) {
      if (this.data.filterOptions[type][i].value === value) {
        label = this.data.filterOptions[type][i].label
        break
      }
    }
    
    wx.showToast({
      title: `已筛选${label}`,
      icon: 'none'
    })
  },

  // 搜索输入
  onSearchInput(e) {
    const { value } = e.detail
    this.setData({ searchKeyword: value })
    
    // 实时搜索联想
    if (value.length > 0) {
      this.showSearchSuggestions(value)
    }
  },

  // 显示搜索建议
  showSearchSuggestions(keyword) {
    const suggestions = []
    
    // 根据关键词生成建议
    if (keyword.indexOf('普洱') !== -1) {
      suggestions.push('普洱茶供应')
      suggestions.push('普洱熟茶求购')
      suggestions.push('勐海普洱茶')
    }
    if (keyword.indexOf('白茶') !== -1) {
      suggestions.push('福鼎白茶供应')
      suggestions.push('老白茶求购')
      suggestions.push('白毫银针')
    }
    if (keyword.indexOf('龙井') !== -1) {
      suggestions.push('')
      suggestions.push('明前龙井求购')
    }
    
    // 这里可以显示搜索建议弹窗
    console.log('搜索建议:', suggestions)
  },

  // 筛选和排序列表
  filterAndSortList() {
    const { currentTab, currentFilter, searchKeyword } = this.data
    let list = currentTab === 'supply' ? this.data.supplyList.concat() : this.data.demandList.concat()
    
    // 茶类筛选
    if (currentFilter.teaType !== 'all') {
      list = list.filter(item => item.teaType === currentFilter.teaType)
    }
    
    // 关键词搜索
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase()
      list = list.filter(item => {
        // 检查标题和描述
        if (item.title.toLowerCase().indexOf(keyword) !== -1 ||
            item.description.toLowerCase().indexOf(keyword) !== -1) {
          return true
        }
        
        // 检查标签
        for (let i = 0; i < item.tags.length; i++) {
          if (item.tags[i].toLowerCase().indexOf(keyword) !== -1) {
            return true
          }
        }
        
        return false
      })
    }
    
    // 排序
    switch (currentFilter.sort) {
      case 'recommend':
        // 智能推荐排序
        list.sort((a, b) => {
          let scoreA = 0, scoreB = 0
          
          // 推荐标识加分
          if (a.isRecommended) scoreA += 10
          if (b.isRecommended) scoreB += 10
          
          // 新品/紧急加分
          if (a.isNew || a.isUrgent) scoreA += 5
          if (b.isNew || b.isUrgent) scoreB += 5
          
          // 活跃度加分
          scoreA += a.viewCount / 100 + a.contactCount * 2
          scoreB += b.viewCount / 100 + b.contactCount * 2
          
          return scoreB - scoreA
        })
        break
        
      case 'latest':
        // 按发布时间排序
        list.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
        break
        
      case 'popular':
        // 按热度排序
        list.sort((a, b) => b.viewCount - a.viewCount)
        break
        
      case 'urgent':
        // 紧急优先
        list.sort((a, b) => {
          if (a.isUrgent && !b.isUrgent) return -1
          if (!a.isUrgent && b.isUrgent) return 1
          return b.viewCount - a.viewCount
        })
        break
    }
    
    if (currentTab === 'supply') {
      this.setData({ supplyList: list })
    } else {
      this.setData({ demandList: list })
    }
  },

  // 排序列表（初始）
  sortList() {
    this.filterAndSortList()
  },

  // 点击信息项
  onItemTap(e) {
    const { id, type } = e.currentTarget.dataset
    const page = type === 'supply' ? 'supply-detail' : 'demand-detail'
    wx.navigateTo({
      url: `/pages/${page}/${page}?id=${id}`
    })
  },

  // 联系发布者
  contactPublisher(e) {
    const { wechat } = e.currentTarget.dataset
    
    wx.showModal({
      title: '联系发布者',
      content: `微信号：${wechat}`,
      confirmText: '复制微信号',
      success: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: wechat,
            success: () => {
              wx.showToast({
                title: '微信号已复制',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },

  // 收藏信息
  toggleFavorite(e) {
    const { id, type } = e.currentTarget.dataset
    const list = type === 'supply' ? 'supplyList' : 'demandList'
    
    // 使用传统for循环查找索引
    let index = -1
    for (let i = 0; i < this.data[list].length; i++) {
      if (this.data[list][i].id === id) {
        index = i
        break
      }
    }
    
    if (index > -1) {
      const item = this.data[list][index]
      const isFavorited = item.isFavorited || false
      
      this.setData({
        [`${list}[${index}].isFavorited`]: !isFavorited,
        [`${list}[${index}].favoriteCount`]: isFavorited ? item.favoriteCount - 1 : item.favoriteCount + 1
      })
      
      wx.showToast({
        title: isFavorited ? '已取消收藏' : '已收藏',
        icon: 'success'
      })
      
      // 记录用户行为标签
      this.recordUserBehavior(item.tags)
    }
  },

  // 记录用户行为
  recordUserBehavior(tags) {
    // 模拟记录用户行为标签
    console.log('记录用户行为标签:', tags)
    // 实际项目中这里会调用API记录用户行为
  },

  // 发布供应信息
  publishSupply() {
    wx.navigateTo({
      url: '/pages/publish-supply/publish-supply'
    })
  },

  // 发布求购信息
  publishDemand() {
    wx.navigateTo({
      url: '/pages/publish-demand/publish-demand'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadSupplyData(this.data.currentTab)
    wx.stopPullDownRefresh()
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      // 假设API支持分页，可扩展page参数
      // 这里只做简单模拟
      this.loadSupplyData(this.data.currentTab, true)
    }
  }
}) 