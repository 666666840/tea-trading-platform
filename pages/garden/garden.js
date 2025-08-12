const { API } = require('../../utils/api-manager')

Page({
  data: {
    // apiBase字段已废弃，统一用API.getGardens()
    loading: false,
    // 当前季节
    currentSeason: 'spring',
    currentMonth: 4,
    
    // 产区数据
    provinces: [
      {
        id: 'zhejiang',
        name: '浙江省',
        regions: [
          { id: 'xihu', name: '西湖区', tea: '龙井', season: 'spring', isHot: true },
          { id: 'xinchang', name: '新昌县', tea: '龙井', season: 'spring', isHot: false }
        ]
      },
      {
        id: 'fujian',
        name: '福建省',
        regions: [
          { id: 'wuyi', name: '武夷山', tea: '大红袍', season: 'spring', isHot: true },
          { id: 'anxi', name: '安溪县', tea: '铁观音', season: 'autumn', isHot: true }
        ]
      },
      {
        id: 'yunnan',
        name: '云南省',
        regions: [
          { id: 'menghai', name: '勐海县', tea: '普洱茶', season: 'spring', isHot: true },
          { id: 'lincang', name: '临沧市', tea: '普洱茶', season: 'spring', isHot: false }
        ]
      }
    ],
    
    // 茶园列表
    gardenList: [
      {
        id: 1,
        name: '',
        location: '浙江杭州西湖区龙井村',
        area: 500,
        areaUnit: '亩',
        season: 'spring',
        harvestPeriod: '3.15-4.5',
        teaType: '龙井',
        province: 'zhejiang',
        region: 'xihu',
        features: ['明前采摘', '核心产区', '荒野老枞'],
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=西湖茶园1',
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=西湖茶园2'
        ],
        merchant: {
          name: '杭州龙井茶农',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶农',
          rating: 4.9,
          isVerified: true,
          brand: '八马茶业指定茶园'
        },
        isCertified: true,
        isSeasonal: true,
        createTime: '2024-03-15 10:30:00',
        viewCount: 234
      },
      {
        id: 2,
        name: '武夷山大红袍茶园',
        location: '福建武夷山市正岩产区',
        area: 300,
        areaUnit: '亩',
        season: 'spring',
        harvestPeriod: '4.1-4.20',
        teaType: '大红袍',
        province: 'fujian',
        region: 'wuyi',
        features: ['正岩产区', '传统工艺', '岩骨花香'],
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=武夷山茶园1'
        ],
        merchant: {
          name: '武夷山茶农',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶农',
          rating: 4.8,
          isVerified: true,
          brand: null
        },
        isCertified: true,
        isSeasonal: true,
        createTime: '2024-03-14 15:20:00',
        viewCount: 189
      },
      {
        id: 3,
        name: '勐海普洱茶园',
        location: '云南西双版纳勐海县',
        area: 1200,
        areaUnit: '亩',
        season: 'spring',
        harvestPeriod: '3.20-4.10',
        teaType: '普洱茶',
        province: 'yunnan',
        region: 'menghai',
        features: ['古树茶', '生态种植', '有机认证'],
        images: [
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=勐海茶园1',
          'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=勐海茶园2'
        ],
        merchant: {
          name: '勐海茶农合作社',
          avatar: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=茶农',
          rating: 4.7,
          isVerified: true,
          brand: '大益茶业合作茶园'
        },
        isCertified: true,
        isSeasonal: true,
        createTime: '2024-03-13 09:15:00',
        viewCount: 156
      }
    ],
    
    // 筛选选项
    filterOptions: [
      { value: 'all', label: '全部产区' },
      { value: 'zhejiang', label: '浙江' },
      { value: 'fujian', label: '福建' },
      { value: 'yunnan', label: '云南' }
    ],
    currentFilter: 'all',
    
    // 排序选项
    sortOptions: [
      { value: 'season', label: '当季推荐' },
      { value: 'certified', label: '认证优先' },
      { value: 'popular', label: '热门茶园' },
      { value: 'area', label: '面积排序' }
    ],
    currentSort: 'season',
    
    // 加载状态
    loading: false,
    hasMore: true
  },

  onLoad() {
    this.loadGardenData()
  },

  // 加载茶园数据
  async loadGardenData(append = false) {
    this.setData({ loading: true })
    
    try {
      const res = await API.getGardens()
      if (res.status === 'success') {
        const list = res.data || []
        if (append) {
          this.setData({
            gardenList: this.data.gardenList.concat(list),
            loading: false,
            hasMore: list.length > 0
          })
        } else {
          this.setData({
            gardenList: list,
            loading: false,
            hasMore: list.length > 0
          })
        }
      } else {
        this.setData({ loading: false })
      }
    } catch (err) {
      console.log('API加载失败:', err)
      this.setData({ loading: false })
    }
  },

  onShow() {
    console.log('茶园直通页面加载完成')
    this.getCurrentSeason()
    this.sortList()
  },

  // 获取当前季节
  getCurrentSeason() {
    const month = new Date().getMonth() + 1
    let season = 'spring'
    
    if (month >= 3 && month <= 5) {
      season = 'spring'
    } else if (month >= 6 && month <= 8) {
      season = 'summer'
    } else if (month >= 9 && month <= 11) {
      season = 'autumn'
    } else {
      season = 'winter'
    }
    
    this.setData({ 
      currentSeason: season,
      currentMonth: month
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

  // 筛选和排序列表
  filterAndSortList() {
    let filteredList = [...this.data.gardenList]
    
    // 筛选
    if (this.data.currentFilter !== 'all') {
      filteredList = filteredList.filter(item => item.province === this.data.currentFilter)
    }
    
    // 排序
    switch (this.data.currentSort) {
      case 'season':
        // 当季推荐优先
        filteredList.sort((a, b) => {
          if (a.isSeasonal && !b.isSeasonal) return -1
          if (!a.isSeasonal && b.isSeasonal) return 1
          if (a.isCertified && !b.isCertified) return -1
          if (!a.isCertified && b.isCertified) return 1
          return b.viewCount - a.viewCount
        })
        break
        
      case 'certified':
        // 认证优先
        filteredList.sort((a, b) => {
          if (a.isCertified && !b.isCertified) return -1
          if (!a.isCertified && b.isCertified) return 1
          return b.merchant.rating - a.merchant.rating
        })
        break
        
      case 'popular':
        // 按浏览量排序
        filteredList.sort((a, b) => b.viewCount - a.viewCount)
        break
        
      case 'area':
        // 按面积排序
        filteredList.sort((a, b) => b.area - a.area)
        break
    }
    
    this.setData({ gardenList: filteredList })
  },

  // 排序列表（初始）
  sortList() {
    const sortedList = [...this.data.gardenList].sort((a, b) => {
      if (a.isSeasonal && !b.isSeasonal) return -1
      if (!a.isSeasonal && b.isSeasonal) return 1
      if (a.isCertified && !b.isCertified) return -1
      if (!a.isCertified && b.isCertified) return 1
      return b.viewCount - a.viewCount
    })
    this.setData({ gardenList: sortedList })
  },

  // 点击茶园
  onItemTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/garden-detail/garden-detail?id=${id}`
    })
  },

  // 联系茶农
  contactFarmer(e) {
    const { wechat } = e.currentTarget.dataset
    
    wx.showModal({
      title: '联系茶农',
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

  // 查看产区地图
  viewRegionMap(e) {
    const { province } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/market-map/market-map?province=${province}`
    })
  },

  // 跳转到发布茶园页面
  navigateToPublish() {
    wx.navigateTo({
      url: '/pages/publish-garden/publish-garden'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadGardenData()
    wx.stopPullDownRefresh()
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadGardenData(true)
    }
  },

  // 刷新和加载更多已合并到loadGardenData
}) 