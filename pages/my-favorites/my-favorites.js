const { Favorite } = require('../../utils/favorite-manager')
const { setupPageAnimations } = require('../../utils/animation-manager')

Page({
  data: {
    activeTab: 0,
    tabList: [
      { id: 'all', name: '全部', icon: '📋' },
      { id: 'markets', name: '市场', icon: '🏪' },
      { id: 'merchants', name: '商户', icon: '👥' },
      { id: 'supplies', name: '供求', icon: '🤝' },
      { id: 'newarrivals', name: '新品', icon: '🆕' },
      { id: 'clearance', name: '特价', icon: '💰' },
      { id: 'articles', name: '文章', icon: '📰' }
    ],
    favoriteData: {
      all: [],
      markets: [],
      merchants: [],
      supplies: [],
      newarrivals: [],
      clearance: [],
      articles: []
    },
    loading: false,
    searchKeyword: '',
    showSearch: false,
    selectedItems: [],
    isEditMode: false,
    stats: {
      total: 0,
      markets: 0,
      merchants: 0,
      supplies: 0,
      newarrivals: 0,
      clearance: 0,
      articles: 0
    }
  },

  onLoad() {
    this.loadFavoriteData()
    setupPageAnimations(this)
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadFavoriteData()
  },

  /**
   * 加载收藏数据
   */
  loadFavoriteData() {
    this.setData({ loading: true })

    try {
      // 获取所有收藏数据
      const allFavorites = Favorite.getList('all')
      const markets = Favorite.getList('markets')
      const merchants = Favorite.getList('merchants')
      const supplies = Favorite.getList('supplies')
      const newarrivals = Favorite.getList('newarrivals')
      const clearance = Favorite.getList('clearance')
      const articles = Favorite.getList('articles')

      // 合并所有收藏作为全部标签的数据
      const allData = [
        ...markets.map(item => ({ ...item, categoryType: 'markets' })),
        ...merchants.map(item => ({ ...item, categoryType: 'merchants' })),
        ...supplies.map(item => ({ ...item, categoryType: 'supplies' })),
        ...newarrivals.map(item => ({ ...item, categoryType: 'newarrivals' })),
        ...clearance.map(item => ({ ...item, categoryType: 'clearance' })),
        ...articles.map(item => ({ ...item, categoryType: 'articles' }))
      ].sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

      // 获取统计信息
      const stats = Favorite.getStats()

      this.setData({
        favoriteData: {
          all: allData,
          markets,
          merchants,
          supplies,
          newarrivals,
          clearance,
          articles
        },
        stats,
        loading: false
      })

      // 添加进入动画
      this.fadeIn('.favorite-container', { duration: 300 })

    } catch (error) {
      console.error('加载收藏数据失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
      this.setData({ loading: false })
    }
  },

  /**
   * 切换标签
   */
  onTabChange(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activeTab: index,
      selectedItems: [],
      isEditMode: false
    })

    // 标签切换动画
    this.slideIn('.favorite-list', 'left', { duration: 250 })
  },

  /**
   * 搜索功能
   */
  onSearchToggle() {
    const showSearch = !this.data.showSearch
    this.setData({ 
      showSearch,
      searchKeyword: showSearch ? this.data.searchKeyword : ''
    })

    if (showSearch) {
      this.slideDown('.search-bar', { duration: 200 })
    } else {
      this.slideUp('.search-bar', { duration: 200 })
    }
  },

  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    
    // 实时搜索
    this.filterFavorites(keyword)
  },

  onSearchClear() {
    this.setData({ searchKeyword: '' })
    this.filterFavorites('')
  },

  /**
   * 筛选收藏项
   */
  filterFavorites(keyword) {
    if (!keyword.trim()) {
      this.loadFavoriteData()
      return
    }

    const { activeTab, tabList, favoriteData } = this.data
    const currentType = tabList[activeTab].id
    const originalData = favoriteData[currentType]

    const filteredData = originalData.filter(item => {
      const searchText = `${item.name} ${item.data.description || ''} ${item.data.address || ''}`.toLowerCase()
      return searchText.includes(keyword.toLowerCase())
    })

    this.setData({
      [`favoriteData.${currentType}`]: filteredData
    })
  },

  /**
   * 编辑模式
   */
  toggleEditMode() {
    const isEditMode = !this.data.isEditMode
    this.setData({
      isEditMode,
      selectedItems: []
    })

    if (isEditMode) {
      this.shake('.edit-btn', { duration: 300 })
    }
  },

  /**
   * 选择收藏项
   */
  onItemSelect(e) {
    const { id } = e.currentTarget.dataset
    const { selectedItems } = this.data
    
    if (selectedItems.includes(id)) {
      // 取消选择
      this.setData({
        selectedItems: selectedItems.filter(item => item !== id)
      })
    } else {
      // 添加选择
      this.setData({
        selectedItems: [...selectedItems, id]
      })
    }
  },

  /**
   * 全选/取消全选
   */
  onSelectAll() {
    const { activeTab, tabList, favoriteData, selectedItems } = this.data
    const currentType = tabList[activeTab].id
    const currentData = favoriteData[currentType]
    
    if (selectedItems.length === currentData.length) {
      // 取消全选
      this.setData({ selectedItems: [] })
    } else {
      // 全选
      this.setData({ 
        selectedItems: currentData.map(item => item.id) 
      })
    }
  },

  /**
   * 批量删除
   */
  onBatchDelete() {
    const { selectedItems, activeTab, tabList } = this.data
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请先选择要删除的项目',
        icon: 'none'
      })
      return
    }

    const currentType = tabList[activeTab].id

    wx.showModal({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedItems.length} 个收藏吗？`,
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          // 执行批量删除
          selectedItems.forEach(itemId => {
            if (currentType === 'all') {
              // 从所有类型中查找并删除
              Object.keys(this.data.favoriteData).forEach(type => {
                if (type !== 'all') {
                  Favorite.remove(type, itemId)
                }
              })
            } else {
              Favorite.remove(currentType, itemId)
            }
          })

          // 重新加载数据
          this.loadFavoriteData()
          
          // 退出编辑模式
          this.setData({
            isEditMode: false,
            selectedItems: []
          })

          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  /**
   * 单个收藏项操作
   */
  onItemTap(e) {
    const { item } = e.currentTarget.dataset
    
    if (this.data.isEditMode) {
      this.onItemSelect(e)
      return
    }

    // 跳转到详情页面
    this.navigateToDetail(item)
  },

  /**
   * 跳转到详情页面
   */
  navigateToDetail(item) {
    const routeMap = {
      markets: '/pages/market-detail/market-detail',
      merchants: '/pages/merchant-detail/merchant-detail',
      supplies: '/pages/supply-detail/supply-detail',
      newarrivals: '/pages/newarrival-detail/newarrival-detail',
      clearance: '/pages/clearance-detail/clearance-detail',
      articles: '/pages/content-detail/content-detail'
    }

    const route = routeMap[item.type] || routeMap[item.categoryType]
    
    if (route) {
      wx.navigateTo({
        url: `${route}?id=${item.id}`
      })
    } else {
      wx.showToast({
        title: '页面开发中',
        icon: 'none'
      })
    }
  },

  /**
   * 删除单个收藏
   */
  onItemDelete(e) {
    e.stopPropagation()
    const { item } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除收藏"${item.name}"吗？`,
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          const type = item.type || item.categoryType
          const success = Favorite.remove(type, item.id)
          
          if (success) {
            this.loadFavoriteData()
            
            // 删除动画
            this.slideOut(`[data-id="${item.id}"]`, 'right', { duration: 200 })
          }
        }
      }
    })
  },

  /**
   * 分享收藏项
   */
  onItemShare(e) {
    e.stopPropagation()
    const { item } = e.currentTarget.dataset
    
    // 这里实现分享逻辑
    wx.showShareMenu({
      withShareTicket: true,
      success: () => {
        console.log('分享菜单显示成功')
      }
    })
  },

  /**
   * 页面分享
   */
  onShareAppMessage() {
    const { stats } = this.data
    return {
      title: `我在茶叶一点通收藏了${stats.total}个内容`,
      path: '/pages/my-favorites/my-favorites',
      imageUrl: '/images/share-favorites.jpg'
    }
  },

  /**
   * 清空当前分类收藏
   */
  onClearCategory() {
    const { activeTab, tabList } = this.data
    const currentType = tabList[activeTab].id
    
    if (currentType === 'all') {
      Favorite.clear()
    } else {
      Favorite.clear(currentType)
    }
    
    this.loadFavoriteData()
  },

  /**
   * 导出收藏数据
   */
  onExportFavorites() {
    Favorite.export()
  },

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
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.loadFavoriteData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
}) 