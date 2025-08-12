const { API } = require('../../utils/api-manager')

Page({
  data: {
    clearanceList: [],
    // apiBase字段已废弃，统一用API.getClearance()
    
    // 排序选项
    sortOptions: [
      { value: 'time', label: '最新发布' },
      { value: 'price', label: '价格最低' },
      { value: 'stock', label: '库存紧张' },
      { value: 'discount', label: '折扣最大' }
    ],
    currentSort: 'time',
    
    // 加载状态
    loading: false,
    hasMore: true
  },

  onLoad() {
    console.log('特价尾货页面加载完成')
    this.loadClearanceData()
  },

  // 加载尾货数据
  async loadClearanceData(append = false) {
    this.setData({ loading: true })
    try {
      const res = await API.getClearance()
      if (res.status === 'success') {
        const list = res.data || []
        if (append) {
          this.setData({
            clearanceList: this.data.clearanceList.concat(list),
            loading: false,
            hasMore: list.length > 0
          })
        } else {
          this.setData({
            clearanceList: list,
            loading: false,
            hasMore: list.length > 0
          })
        }
        this.sortList()
      } else {
        this.loadDefaultClearanceData()
      }
    } catch (err) {
      console.log('API加载失败，使用默认数据:', err)
      this.loadDefaultClearanceData()
    }
  },

  // 加载默认尾货数据（备用）
  loadDefaultClearanceData() {
    const defaultData = [
      {
        id: 1,
        title: '白茶特价清仓',
        originalPrice: 298,
        currentPrice: 188,
        description: '2022年白牡丹，数量有限',
        quantity: '仅剩20饼',
        merchant: '福鼎茶庄'
      }
    ]
    
    this.setData({
      clearanceList: defaultData,
      loading: false
    })
    this.sortList()
  },

  // 切换排序
  onSortChange(e) {
    const { value } = e.currentTarget.dataset
    this.setData({ currentSort: value })
    this.sortList()
    wx.showToast({
      title: `已按${this.data.sortOptions.find(item => item.value === value).label}排序`,
      icon: 'none'
    })
  },

  // 排序列表
  sortList() {
    const { clearanceList, currentSort } = this.data
    let sortedList = [...clearanceList]

    switch (currentSort) {
      case 'time':
        // 基础规则：按上架时间倒序，VIP商户优先
        sortedList.sort((a, b) => {
          // VIP商户优先
          if (a.isVip && !b.isVip) return -1
          if (!a.isVip && b.isVip) return 1
          
          // 然后按时间倒序
          return new Date(b.createTime) - new Date(a.createTime)
        })
        break
        
      case 'price':
        // 按清仓价从低到高
        sortedList.sort((a, b) => a.clearancePrice - b.clearancePrice)
        break
        
      case 'stock':
        // 库存紧张优先（库存低于30%的商品权重提升）
        sortedList.sort((a, b) => {
          const aScore = this.calculateStockScore(a)
          const bScore = this.calculateStockScore(b)
          return bScore - aScore
        })
        break
        
      case 'discount':
        // 折扣最大优先
        sortedList.sort((a, b) => b.discount - a.discount)
        break
    }

    // 双保险规则：库存低于30%的商品权重提升，倒计时<24小时的商品置顶
    sortedList = this.applyDoubleInsurance(sortedList)

    this.setData({ clearanceList: sortedList })
  },

  // 计算库存紧张度分数
  calculateStockScore(item) {
    let score = 0
    
    // 库存百分比越低，分数越高
    score += (100 - item.stockPercent) * 2
    
    // 倒计时越短，分数越高
    if (item.hoursLeft <= 24) {
      score += 100
    } else if (item.hoursLeft <= 48) {
      score += 50
    }
    
    // VIP商户加分
    if (item.isVip) {
      score += 30
    }
    
    return score
  },

  // 应用双保险规则
  applyDoubleInsurance(list) {
    const urgentItems = []
    const normalItems = []
    
    list.forEach(item => {
      // 库存低于30%且倒计时<24小时的商品置顶
      if (item.stockPercent <= 30 && item.hoursLeft < 24) {
        urgentItems.push(item)
      } else {
        normalItems.push(item)
      }
    })
    
    return [...urgentItems, ...normalItems]
  },

  // 点击商品
  onItemTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/clearance-detail/clearance-detail?id=${id}`
    })
  },

  // 导航到发布页面
  navigateToPublish() {
    wx.navigateTo({
      url: '/pages/publish-clearance/publish-clearance'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadClearanceData()
    wx.stopPullDownRefresh()
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadClearanceData(true)
    }
  },

  // 刷新和加载更多已合并到loadClearanceData
}) 