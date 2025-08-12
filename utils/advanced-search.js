// 高级搜索组件
const AdvancedSearch = {
  // 搜索配置
  config: {
    // 市场搜索配置
    markets: {
      filters: ['keyword', 'province', 'dateRange'],
      labels: {
        keyword: '关键词',
        province: '省份',
        dateRange: '时间范围'
      },
      placeholders: {
        keyword: '搜索市场名称、城市、描述',
        province: '选择省份',
        dateRange: '选择时间范围'
      }
    },
    
    // 新品搜索配置
    newarrivals: {
      filters: ['keyword', 'category', 'priceRange', 'dateRange'],
      labels: {
        keyword: '关键词',
        category: '分类',
        priceRange: '价格范围',
        dateRange: '时间范围'
      },
      placeholders: {
        keyword: '搜索商品名称、描述、商家',
        category: '选择分类',
        priceRange: '如：100-500',
        dateRange: '选择时间范围'
      }
    },
    
    // 供求搜索配置
    supplies: {
      filters: ['keyword', 'type', 'priceRange', 'dateRange', 'status'],
      labels: {
        keyword: '关键词',
        type: '类型',
        priceRange: '价格范围',
        dateRange: '时间范围',
        status: '状态'
      },
      placeholders: {
        keyword: '搜索标题、描述、联系方式',
        type: '选择类型',
        priceRange: '如：100-500',
        dateRange: '选择时间范围',
        status: '选择状态'
      }
    },
    
    // 清仓搜索配置
    clearance: {
      filters: ['keyword', 'category', 'priceRange', 'dateRange'],
      labels: {
        keyword: '关键词',
        category: '分类',
        priceRange: '价格范围',
        dateRange: '时间范围'
      },
      placeholders: {
        keyword: '搜索商品名称、描述、商家',
        category: '选择分类',
        priceRange: '如：100-500',
        dateRange: '选择时间范围'
      }
    },
    
    // 内容搜索配置
    content: {
      filters: ['keyword', 'type', 'tag', 'dateRange'],
      labels: {
        keyword: '关键词',
        type: '类型',
        tag: '标签',
        dateRange: '时间范围'
      },
      placeholders: {
        keyword: '搜索标题、内容、作者',
        type: '选择类型',
        tag: '选择标签',
        dateRange: '选择时间范围'
      }
    }
  },

  // 初始化搜索组件
  init(pageContext, dataType = 'markets') {
    this.pageContext = pageContext
    this.dataType = dataType
    this.currentFilters = {}
    this.filterOptions = {}
    
    // 加载筛选选项
    this.loadFilterOptions()
    
    // 绑定事件
    this.bindEvents()
    
    console.log(`🔍 [高级搜索] 初始化 ${dataType} 搜索组件`)
  },

  // 加载筛选选项
  async loadFilterOptions() {
    try {
      const response = await API.getFilterOptions(this.dataType)
      if (response.status === 'success') {
        this.filterOptions = response.data
        console.log('✅ [高级搜索] 筛选选项加载完成:', this.filterOptions)
      }
    } catch (error) {
      console.warn('⚠️ [高级搜索] 筛选选项加载失败:', error)
    }
  },

  // 绑定事件
  bindEvents() {
    // 搜索按钮点击事件
    if (this.pageContext.searchBtn) {
      this.pageContext.searchBtn.onTap(() => {
        this.performSearch()
      })
    }
    
    // 重置按钮点击事件
    if (this.pageContext.resetBtn) {
      this.pageContext.resetBtn.onTap(() => {
        this.resetFilters()
      })
    }
    
    // 筛选器变化事件
    this.bindFilterEvents()
  },

  // 绑定筛选器事件
  bindFilterEvents() {
    const config = this.config[this.dataType]
    if (!config) return
    
    config.filters.forEach(filterName => {
      const filterElement = this.pageContext[`${filterName}Filter`]
      if (filterElement) {
        if (filterName === 'keyword') {
          // 关键词输入框
          filterElement.onInput((e) => {
            this.currentFilters.keyword = e.detail.value
          })
        } else if (filterName === 'priceRange') {
          // 价格范围输入框
          filterElement.onInput((e) => {
            this.currentFilters.priceRange = e.detail.value
          })
        } else if (filterName === 'dateRange') {
          // 日期范围选择器
          filterElement.onChange((e) => {
            this.currentFilters.dateRange = e.detail.value
          })
        } else {
          // 下拉选择器
          filterElement.onChange((e) => {
            this.currentFilters[filterName] = e.detail.value
          })
        }
      }
    })
  },

  // 执行搜索
  async performSearch() {
    try {
      wx.showLoading({ title: '搜索中...' })
      
      // 构建搜索参数
      const filters = API.buildAdvancedFilters(this.currentFilters)
      
      // 调用对应的搜索API
      let response
      switch (this.dataType) {
        case 'markets':
          response = await API.advancedSearchMarkets(filters)
          break
        case 'newarrivals':
          response = await API.advancedSearchNewarrivals(filters)
          break
        case 'supplies':
          response = await API.advancedSearchSupplies(filters)
          break
        case 'clearance':
          response = await API.advancedSearchClearance(filters)
          break
        case 'content':
          response = await API.advancedSearchContent(filters)
          break
        default:
          throw new Error('不支持的数据类型')
      }
      
      if (response.status === 'success') {
        // 更新页面数据
        this.updatePageData(response.data)
        
        // 显示搜索结果统计
        this.showSearchResult(response)
        
        console.log('✅ [高级搜索] 搜索完成:', response)
      } else {
        throw new Error(response.message || '搜索失败')
      }
    } catch (error) {
      console.error('❌ [高级搜索] 搜索失败:', error)
      wx.showToast({
        title: error.message || '搜索失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 更新页面数据
  updatePageData(data) {
    if (this.pageContext.setData) {
      this.pageContext.setData({
        list: data,
        hasMore: data.length > 0
      })
    }
    
    // 触发页面刷新
    if (this.pageContext.refreshList) {
      this.pageContext.refreshList()
    }
  },

  // 显示搜索结果
  showSearchResult(response) {
    const total = response.pagination?.total || response.data.length
    const filters = response.filters || {}
    
    let message = `找到 ${total} 条结果`
    if (Object.keys(filters).length > 0) {
      const filterText = this.formatFilters(filters)
      message += ` (筛选条件: ${filterText})`
    }
    
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  },

  // 格式化筛选条件
  formatFilters(filters) {
    const config = this.config[this.dataType]
    if (!config) return ''
    
    const filterTexts = []
    
    Object.keys(filters).forEach(key => {
      if (key === 'page' || key === 'per_page') return
      
      const value = filters[key]
      if (value) {
        const label = config.labels[key] || key
        filterTexts.push(`${label}: ${value}`)
      }
    })
    
    return filterTexts.join(', ')
  },

  // 重置筛选器
  resetFilters() {
    this.currentFilters = {}
    
    // 重置UI
    const config = this.config[this.dataType]
    if (!config) return
    
    config.filters.forEach(filterName => {
      const filterElement = this.pageContext[`${filterName}Filter`]
      if (filterElement) {
        if (filterName === 'keyword' || filterName === 'priceRange') {
          filterElement.setData({ value: '' })
        } else {
          filterElement.setData({ value: '' })
        }
      }
    })
    
    // 重新加载数据
    this.performSearch()
    
    wx.showToast({
      title: '筛选条件已重置',
      icon: 'success'
    })
  },

  // 获取当前筛选条件
  getCurrentFilters() {
    return { ...this.currentFilters }
  },

  // 设置筛选条件
  setFilters(filters) {
    this.currentFilters = { ...filters }
    
    // 更新UI
    this.updateFilterUI()
  },

  // 更新筛选器UI
  updateFilterUI() {
    const config = this.config[this.dataType]
    if (!config) return
    
    config.filters.forEach(filterName => {
      const filterElement = this.pageContext[`${filterName}Filter`]
      if (filterElement && this.currentFilters[filterName]) {
        filterElement.setData({ value: this.currentFilters[filterName] })
      }
    })
  },

  // 显示高级搜索面板
  showAdvancedSearchPanel() {
    // 这里可以实现显示高级搜索面板的逻辑
    // 比如显示一个模态框或者展开搜索区域
    console.log('🔍 [高级搜索] 显示高级搜索面板')
  },

  // 隐藏高级搜索面板
  hideAdvancedSearchPanel() {
    console.log('🔍 [高级搜索] 隐藏高级搜索面板')
  },

  // 验证搜索参数
  validateFilters(filters) {
    const errors = []
    
    // 验证价格范围格式
    if (filters.priceRange) {
      const pricePattern = /^\d+(-\d+)?$/
      if (!pricePattern.test(filters.priceRange)) {
        errors.push('价格范围格式错误，请使用如：100-500 或 300 的格式')
      }
    }
    
    // 验证日期范围格式
    if (filters.dateRange) {
      const datePattern = /^\d{4}-\d{2}-\d{2}(-\d{4}-\d{2}-\d{2})?$/
      if (!datePattern.test(filters.dateRange)) {
        errors.push('日期范围格式错误，请使用如：2024-01-01-2024-12-31 的格式')
      }
    }
    
    return errors
  }
}

module.exports = AdvancedSearch 