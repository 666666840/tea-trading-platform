const { Search } = require('../../utils/search-manager.js')
const { Favorite } = require('../../utils/favorite-manager.js')

Page({
  data: {
    searchKeyword: '',
    searchResults: [],
    searchHistory: [],
    searchSuggestions: [],
    hotSearches: [],
    isSearching: false,
    hasSearched: false,
    currentFilter: {
      type: 'all',
      province: null,
      category: null,
      priceRange: null,
      sortBy: 'relevance'
    },
    resultStats: {
      total: 0,
      page: 1,
      hasMore: false
    },
    showFilter: false,
    showHistory: true,
    filterOptions: {
      types: [
        { value: 'all', label: '全部' },
        { value: 'markets', label: '市场' },
        { value: 'supplies', label: '供求' },
        { value: 'newarrivals', label: '新品' },
        { value: 'clearance', label: '特价' }
      ],
      provinces: [
        '北京', '上海', '广东', '浙江', '福建', '江苏', 
        '河南', '湖南', '湖北', '四川', '云南', '安徽'
      ],
      categories: [
        '绿茶', '红茶', '乌龙茶', '白茶', '黑茶', '黄茶', '普洱茶'
      ],
      priceRanges: [
        { label: '不限', value: null },
        { label: '100元以下', value: [0, 100] },
        { label: '100-300元', value: [100, 300] },
        { label: '300-500元', value: [300, 500] },
        { label: '500-1000元', value: [500, 1000] },
        { label: '1000元以上', value: [1000, 999999] }
      ],
      sortOptions: [
        { value: 'relevance', label: '相关度' },
        { value: 'price', label: '价格' },
        { value: 'time', label: '时间' }
      ]
    }
  },

  onLoad(options) {
    // 如果从其他页面跳转过来带有搜索关键词
    if (options.keyword) {
      this.setData({
        searchKeyword: decodeURIComponent(options.keyword)
      })
      this.performSearch()
    }
    
    this.initSearchData()
  },

  onShow() {
    this.loadSearchHistory()
  },

  // 初始化搜索数据
  initSearchData() {
    const hotSearches = Search.getHotSearches()
    const suggestions = Search.getSuggestions()
    
    this.setData({
      hotSearches,
      searchSuggestions: suggestions
    })
  },

  // 加载搜索历史
  loadSearchHistory() {
    const history = Search.getHistory()
    this.setData({
      searchHistory: history
    })
  },

  // 搜索输入变化
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({
      searchKeyword: keyword
    })
    
    // 实时获取搜索建议
    if (keyword.trim()) {
      const suggestions = Search.getSuggestions(keyword)
      this.setData({
        searchSuggestions: suggestions,
        showHistory: false
      })
    } else {
      this.setData({
        showHistory: true
      })
    }
  },

  // 执行搜索
  async performSearch(loadMore = false) {
    const keyword = this.data.searchKeyword.trim()
    
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }

    try {
      this.setData({
        isSearching: true
      })

      const options = {
        ...this.data.currentFilter,
        page: loadMore ? this.data.resultStats.page + 1 : 1
      }

      const result = await Search.search(keyword, options)
      
      if (result.success) {
        const newResults = loadMore ? 
          [...this.data.searchResults, ...result.results] : 
          result.results

        this.setData({
          searchResults: newResults,
          hasSearched: true,
          showHistory: false,
          resultStats: {
            total: result.total,
            page: result.page,
            hasMore: result.hasMore
          }
        })

        // 刷新搜索历史
        this.loadSearchHistory()

        if (result.results.length === 0 && !loadMore) {
          wx.showToast({
            title: '未找到相关内容',
            icon: 'none'
          })
        }
      }

    } catch (error) {
      console.error('搜索失败:', error)
      wx.showToast({
        title: '搜索失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({
        isSearching: false
      })
    }
  },

  // 搜索确认
  onSearchConfirm() {
    this.performSearch()
  },

  // 点击搜索建议
  onSuggestionTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      searchKeyword: keyword
    })
    this.performSearch()
  },

  // 点击搜索历史
  onHistoryTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      searchKeyword: keyword
    })
    this.performSearch()
  },

  // 点击热门搜索
  onHotSearchTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      searchKeyword: keyword
    })
    this.performSearch()
  },

  // 删除搜索历史项
  onDeleteHistory(e) {
    e.stopPropagation()
    const keyword = e.currentTarget.dataset.keyword
    
    Search.deleteHistory(keyword)
    this.loadSearchHistory()
    
    wx.showToast({
      title: '已删除',
      icon: 'success'
    })
  },

  // 清除所有搜索历史
  onClearHistory() {
    wx.showModal({
      title: '清除历史记录',
      content: '确定要清除所有搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          Search.clearHistory()
          this.loadSearchHistory()
        }
      }
    })
  },

  // 显示筛选器
  showFilterPanel() {
    this.setData({
      showFilter: true
    })
  },

  // 隐藏筛选器
  hideFilterPanel() {
    this.setData({
      showFilter: false
    })
  },

  // 筛选器变化
  onFilterChange(e) {
    const { type, value } = e.currentTarget.dataset
    const currentFilter = { ...this.data.currentFilter }
    
    currentFilter[type] = value
    
    this.setData({
      currentFilter
    })
  },

  // 应用筛选
  applyFilter() {
    this.setData({
      showFilter: false
    })
    
    if (this.data.hasSearched) {
      this.performSearch()
    }
  },

  // 重置筛选
  resetFilter() {
    this.setData({
      currentFilter: {
        type: 'all',
        province: null,
        category: null,
        priceRange: null,
        sortBy: 'relevance'
      }
    })
  },

  // 加载更多
  loadMoreResults() {
    if (this.data.resultStats.hasMore && !this.data.isSearching) {
      this.performSearch(true)
    }
  },

  // 点击搜索结果项
  onResultTap(e) {
    const { item, type } = e.currentTarget.dataset
    
    // 根据类型跳转到对应详情页
    switch (type || item.type) {
      case 'market':
        wx.navigateTo({
          url: `/pages/market-detail/market-detail?id=${item.id}`
        })
        break
      case 'supply':
        wx.navigateTo({
          url: `/pages/supply-detail/supply-detail?id=${item.id}`
        })
        break
      case 'newarrival':
        wx.navigateTo({
          url: `/pages/newarrival-detail/newarrival-detail?id=${item.id}`
        })
        break
      case 'clearance':
        wx.navigateTo({
          url: `/pages/clearance-detail/clearance-detail?id=${item.id}`
        })
        break
      default:
        wx.showToast({
          title: '详情页开发中',
          icon: 'none'
        })
    }
  },

  // 收藏搜索结果
  onFavoriteTap(e) {
    e.stopPropagation()
    const { item, type } = e.currentTarget.dataset
    
    const favoriteType = type || item.type
    const isFavorited = Favorite.check(favoriteType, item.id)
    
    if (isFavorited) {
      Favorite.remove(favoriteType, item.id)
    } else {
      Favorite.add(favoriteType, item)
    }
    
    // 更新UI状态
    const searchResults = this.data.searchResults.map(result => {
      if (result.id === item.id) {
        return { ...result, isFavorited: !isFavorited }
      }
      return result
    })
    
    this.setData({
      searchResults
    })
  },

  // 分享搜索结果
  onShareTap(e) {
    e.stopPropagation()
    const { item } = e.currentTarget.dataset
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 返回首页
  goHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // 查看搜索统计
  viewSearchStats() {
    const stats = Search.getStats()
    
    const content = [
      `总搜索次数：${stats.totalSearches}次`,
      `热门关键词：${stats.topKeywords.map(k => k.keyword).join('、')}`,
      `最近搜索：${stats.lastSearchTime ? new Date(stats.lastSearchTime).toLocaleString() : '无'}`
    ].join('\n')
    
    wx.showModal({
      title: '搜索统计',
      content: content,
      showCancel: false
    })
  },

  // 语音搜索（如果支持）
  startVoiceSearch() {
    wx.showToast({
      title: '语音搜索功能开发中',
      icon: 'none'
    })
  },

  // 扫码搜索
  startScanSearch() {
    wx.scanCode({
      success: (res) => {
        this.setData({
          searchKeyword: res.result
        })
        this.performSearch()
      },
      fail: () => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      }
    })
  }
}) 