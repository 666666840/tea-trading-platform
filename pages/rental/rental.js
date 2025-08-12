Page({
  data: {
    // 当前用户信息
    currentUser: {
      location: '杭州',
      preferences: ['仓库', '设备'] // 用户偏好
    },
    
    // 分类数据
    categories: [
      {
        id: 'market',
        name: '市场档口',
        icon: '🏪',
        count: 156,
        isHot: true
      },
      {
        id: 'warehouse',
        name: '仓库/厂房',
        icon: '🏭',
        count: 89,
        isHot: true
      },
      {
        id: 'garden',
        name: '茶园',
        icon: '🌱',
        count: 67,
        isHot: false
      },
      {
        id: 'equipment',
        name: '设备',
        icon: '⚙️',
        count: 234,
        isHot: true
      },
      {
        id: 'factory',
        name: '整厂转让',
        icon: '🏢',
        count: 23,
        isHot: false
      }
    ],
    
    // 出租转让列表
    rentalList: [
      {
        id: 1,
        title: '',
        type: 'market',
        typeName: '市场档口',
        price: '面议',
        priceType: 'transfer', // transfer: 转让, rent: 出租
        location: '浙江杭州西湖区',
        area: 25,
        areaUnit: '㎡',
        boothNumber: 'A-108',
        marketContact: '茶城管理处 0571-88888888',
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=档口1',
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=档口2'
        ],
        merchant: {
          name: '茶城管理处',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=管理处',
          rating: 4.8,
          isVerified: true
        },
        isRecommended: true,
        isUrgent: false,
        createTime: '2024-03-15 10:30:00',
        viewCount: 189,
        tags: ['黄金位置', '客流量大', '手续齐全']
      },
      {
        id: 2,
        title: '安溪铁观音产区茶园出租',
        type: 'garden',
        typeName: '茶园',
        price: '5000元/年',
        priceType: 'rent',
        location: '福建安溪县感德镇',
        area: 50,
        areaUnit: '亩',
        landType: '租赁',
        remainingYears: 8,
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=茶园1'
        ],
        merchant: {
          name: '安溪茶农',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶农',
          rating: 4.6,
          isVerified: true
        },
        isRecommended: true,
        isUrgent: true,
        createTime: '2024-03-14 15:20:00',
        viewCount: 234,
        tags: ['核心产区', '土壤肥沃', '交通便利']
      },
      {
        id: 3,
        title: '茶叶加工设备转让',
        type: 'equipment',
        typeName: '设备',
        price: '15万元',
        priceType: 'transfer',
        location: '浙江杭州余杭区',
        equipmentList: ['杀青机', '揉捻机', '烘干机', '包装机'],
        useYears: 3,
        canTest: true,
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=设备1',
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=设备2'
        ],
        merchant: {
          name: '杭州茶厂',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶厂',
          rating: 4.7,
          isVerified: true
        },
        isRecommended: false,
        isUrgent: false,
        createTime: '2024-03-13 09:15:00',
        viewCount: 156,
        tags: ['九成新', '性能稳定', '包安装']
      },
      {
        id: 4,
        title: '茶叶仓储仓库出租',
        type: 'warehouse',
        typeName: '仓库/厂房',
        price: '8000元/月',
        priceType: 'rent',
        location: '浙江杭州萧山区',
        area: 500,
        areaUnit: '㎡',
        height: 6,
        loadCapacity: '2吨/㎡',
        truckWidth: 4.5,
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=仓库1'
        ],
        merchant: {
          name: '萧山物流园',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=物流园',
          rating: 4.5,
          isVerified: true
        },
        isRecommended: true,
        isUrgent: false,
        createTime: '2024-03-12 14:45:00',
        viewCount: 98,
        tags: ['恒温恒湿', '24小时监控', '交通便利']
      },
      {
        id: 5,
        title: '普洱茶厂整体转让',
        type: 'factory',
        typeName: '整厂转让',
        price: '面议',
        priceType: 'transfer',
        location: '云南西双版纳勐海县',
        area: 2000,
        areaUnit: '㎡',
        assetDetails: ['厂房', '设备', '品牌', '客户资源'],
        debtInfo: '无债务纠纷，手续齐全',
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=茶厂1',
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=茶厂2'
        ],
        merchant: {
          name: '勐海茶厂',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶厂',
          rating: 4.9,
          isVerified: true
        },
        isRecommended: false,
        isUrgent: true,
        createTime: '2024-03-11 11:30:00',
        viewCount: 345,
        tags: ['品牌价值高', '客户稳定', '利润可观']
      }
    ],
    
    // 筛选选项
    filterOptions: [
      { value: 'all', label: '全部类型' },
      { value: 'market', label: '市场档口' },
      { value: 'warehouse', label: '仓库/厂房' },
      { value: 'garden', label: '茶园' },
      { value: 'equipment', label: '设备' },
      { value: 'factory', label: '整厂转让' }
    ],
    currentFilter: 'all',
    
    // 排序选项
    sortOptions: [
      { value: 'recommend', label: '智能推荐' },
      { value: 'urgent', label: '紧急优先' },
      { value: 'popular', label: '热门排序' },
      { value: 'price', label: '价格排序' },
      { value: 'time', label: '发布时间' }
    ],
    currentSort: 'recommend',
    
    // 价格类型筛选
    priceTypeOptions: [
      { value: 'all', label: '全部' },
      { value: 'transfer', label: '转让' },
      { value: 'rent', label: '出租' }
    ],
    currentPriceType: 'all',
    
    // 加载状态
    loading: false,
    hasMore: true,
    
    // 搜索关键词
    searchKeyword: '',
    
    // 推荐列表
    recommendedList: []
  },

  onLoad() {
    console.log('出租转让页面加载完成')
    this.loadUserPreferences()
    this.generateRecommendations()
    this.sortList()
  },

  // 加载用户偏好
  loadUserPreferences() {
    // 模拟从本地存储或服务器获取用户偏好
    const preferences = this.data.currentUser.preferences
    if (preferences.length > 0) {
      // 根据用户偏好调整推荐权重
      this.setData({
        'currentUser.preferences': preferences
      })
    }
  },

  // 生成推荐列表
  generateRecommendations() {
    const { rentalList, currentUser } = this.data
    const preferences = currentUser.preferences
    
    // 根据用户偏好和位置生成推荐
    let recommended = rentalList.filter(item => {
      // 用户偏好匹配
      const preferenceMatch = preferences.includes(item.typeName)
      // 同城优先
      const locationMatch = item.location.includes(currentUser.location)
      // 推荐标识
      const isRecommended = item.isRecommended
      
      return preferenceMatch || locationMatch || isRecommended
    })
    
    // 按推荐度排序
    recommended.sort((a, b) => {
      let scoreA = 0, scoreB = 0
      
      // 偏好匹配加分
      if (preferences.includes(a.typeName)) scoreA += 10
      if (preferences.includes(b.typeName)) scoreB += 10
      
      // 同城加分
      if (a.location.includes(currentUser.location)) scoreA += 5
      if (b.location.includes(currentUser.location)) scoreB += 5
      
      // 推荐标识加分
      if (a.isRecommended) scoreA += 3
      if (b.isRecommended) scoreB += 3
      
      // 紧急标识加分
      if (a.isUrgent) scoreA += 2
      if (b.isUrgent) scoreB += 2
      
      return scoreB - scoreA
    })
    
    this.setData({ recommendedList: recommended.slice(0, 3) })
  },

  // 切换分类筛选
  onCategoryTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ currentFilter: id })
    this.filterAndSortList()
    wx.showToast({
      title: `已筛选${this.data.categories.find(item => item.id === id).name}`,
      icon: 'none'
    })
  },

  // 切换筛选
  onFilterChange(e) {
    const { value } = e.currentTarget.dataset
    this.setData({ currentFilter: value })
    this.filterAndSortList()
    wx.showToast({
      title: `已筛选${this.data.filterOptions.find(item => item.value === value).label}`,
      icon: 'none'
    })
  },

  // 切换排序
  onSortChange(e) {
    const { value } = e.currentTarget.dataset
    this.setData({ currentSort: value })
    this.filterAndSortList()
    wx.showToast({
      title: `已按${this.data.sortOptions.find(item => item.value === value).label}排序`,
      icon: 'none'
    })
  },

  // 切换价格类型
  onPriceTypeChange(e) {
    const { value } = e.currentTarget.dataset
    this.setData({ currentPriceType: value })
    this.filterAndSortList()
    wx.showToast({
      title: `已筛选${this.data.priceTypeOptions.find(item => item.value === value).label}`,
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
    if (keyword.includes('普洱')) {
      suggestions.push('普洱茶厂设备转让')
      suggestions.push('普洱茶仓库出租')
    }
    if (keyword.includes('龙井')) {
      suggestions.push('西湖龙井档口转让')
      suggestions.push('龙井茶设备')
    }
    if (keyword.includes('仓库')) {
      suggestions.push('茶叶仓储仓库')
      suggestions.push('恒温仓库出租')
    }
    
    // 这里可以显示搜索建议弹窗
    console.log('搜索建议:', suggestions)
  },

  // 筛选和排序列表
  filterAndSortList() {
    let filteredList = [...this.data.rentalList]
    
    // 分类筛选
    if (this.data.currentFilter !== 'all') {
      filteredList = filteredList.filter(item => item.type === this.data.currentFilter)
    }
    
    // 价格类型筛选
    if (this.data.currentPriceType !== 'all') {
      filteredList = filteredList.filter(item => item.priceType === this.data.currentPriceType)
    }
    
    // 关键词搜索
    if (this.data.searchKeyword.trim()) {
      const keyword = this.data.searchKeyword.toLowerCase()
      filteredList = filteredList.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }
    
    // 排序
    switch (this.data.currentSort) {
      case 'recommend':
        // 智能推荐排序
        filteredList.sort((a, b) => {
          let scoreA = 0, scoreB = 0
          
          // 推荐标识加分
          if (a.isRecommended) scoreA += 10
          if (b.isRecommended) scoreB += 10
          
          // 同城加分
          if (a.location.includes(this.data.currentUser.location)) scoreA += 5
          if (b.location.includes(this.data.currentUser.location)) scoreB += 5
          
          // 紧急标识加分
          if (a.isUrgent) scoreA += 3
          if (b.isUrgent) scoreB += 3
          
          // 浏览量加分
          scoreA += a.viewCount / 100
          scoreB += b.viewCount / 100
          
          return scoreB - scoreA
        })
        break
        
      case 'urgent':
        // 紧急优先
        filteredList.sort((a, b) => {
          if (a.isUrgent && !b.isUrgent) return -1
          if (!a.isUrgent && b.isUrgent) return 1
          return b.viewCount - a.viewCount
        })
        break
        
      case 'popular':
        // 按浏览量排序
        filteredList.sort((a, b) => b.viewCount - a.viewCount)
        break
        
      case 'price':
        // 按价格排序（需要解析价格）
        filteredList.sort((a, b) => {
          const priceA = this.parsePrice(a.price)
          const priceB = this.parsePrice(b.price)
          return priceA - priceB
        })
        break
        
      case 'time':
        // 按发布时间排序
        filteredList.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
        break
    }
    
    this.setData({ rentalList: filteredList })
  },

  // 解析价格
  parsePrice(priceStr) {
    if (priceStr === '面议') return 0
    const match = priceStr.match(/(\d+(?:\.\d+)?)/)
    return match ? parseFloat(match[1]) : 0
  },

  // 排序列表（初始）
  sortList() {
    this.filterAndSortList()
  },

  // 点击出租转让项
  onItemTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/rental-detail/rental-detail?id=${id}`
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

  // 发布出租转让
  publishRental() {
    console.log('=== 发布出租转让 ===')
    
    // 检查用户登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '需要登录',
        content: '发布信息需要先登录，是否前往登录？',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }
    
    // 检查用户认证状态
    if (!userInfo.isVerified) {
      wx.showModal({
        title: '需要认证',
        content: '发布信息需要先完成商户认证，是否前往认证？',
        confirmText: '去认证',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/merchant-register/merchant-register'
            })
          }
        }
      })
      return
    }
    
    // 跳转到发布页面
    wx.navigateTo({
      url: '/pages/publish-rental/publish-rental',
      success: () => {
        console.log('✅ 成功跳转到发布页面')
      },
      fail: (error) => {
        console.error('❌ 跳转失败:', error)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 查看分类详情
  viewCategoryDetail(e) {
    const { id } = e.currentTarget.dataset
    this.setData({ currentFilter: id })
    this.filterAndSortList()
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshList()
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMore()
    }
  },

  // 刷新列表
  refreshList() {
    this.setData({ loading: true })
    
    // 模拟刷新
    setTimeout(() => {
      this.generateRecommendations()
      this.filterAndSortList()
      this.setData({ loading: false })
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 加载更多
  loadMore() {
    this.setData({ loading: true })
    
    // 模拟加载更多数据
    setTimeout(() => {
      const newItems = [
        {
          id: 6,
          title: '茶叶包装设备转让',
          type: 'equipment',
          typeName: '设备',
          price: '8万元',
          priceType: 'transfer',
          location: '浙江杭州滨江区',
          equipmentList: ['包装机', '封口机', '贴标机'],
          useYears: 2,
          canTest: true,
          images: [
            'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=包装设备1'
          ],
          merchant: {
            name: '滨江茶厂',
            avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶厂',
            rating: 4.4,
            isVerified: true
          },
          isRecommended: false,
          isUrgent: false,
          createTime: '2024-03-10 16:20:00',
          viewCount: 87,
          tags: ['自动化程度高', '效率提升', '维护简单']
        }
      ]
      
      const updatedList = [...this.data.rentalList, ...newItems]
      this.setData({ 
        rentalList: updatedList,
        loading: false,
        hasMore: false // 模拟没有更多数据
      })
    }, 1000)
  }
}) 