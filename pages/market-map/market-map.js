Page({
  data: {
    // 地图数据
    mapData: [],
    loading: true,
    
    // 用户位置
    userLocation: {
      latitude: 30.2741,
      longitude: 120.1551,
      city: '杭州市'
    },
    
    // 地图配置
    mapConfig: {
      latitude: 30.2741,
      longitude: 120.1551,
      scale: 10,
      markers: [],
      polyline: []
    },
    
    // 筛选条件
    filterCategory: '',
    filterSubCategory: '',
    
    // 茶叶分类
    teaCategories: {
      '绿茶': [
        '',
        '都匀毛尖', '庐山云雾', '恩施玉露', '蒙顶甘露', '竹叶青', '峨眉毛峰', '顾渚紫笋', '径山茶',
        '千岛玉叶', '开化龙顶', '大佛龙井', '松阳银猴', '武阳春雨', '雪水云绿', '望海茶', '绿剑茶',
        '羊岩勾青', '临海蟠毫', '天台山云雾茶', '磐安云峰', '江山绿牡丹', '仙居碧绿', '遂昌银猴',
        '缙云毛峰', '龙泉金观音', '景宁惠明茶', '泰顺三杯香', '苍南翠龙', '平阳黄汤', '永嘉乌牛早',
        '乐清雁荡毛峰', '瑞安清明早', '文成刘基贡茶', '泰顺香菇寮白毫', '苍南五凤香茗', '平阳早香茶'
      ],
      '白茶': [
        '白毫银针', '白牡丹', '贡眉', '寿眉', '新工艺白茶', '月光白', '政和白茶', '建阳白茶',
        '松溪白茶', '浦城白茶', '武夷白茶', '建瓯白茶', '顺昌白茶', '光泽白茶', '邵武白茶', '泰宁白茶',
        '将乐白茶', '明溪白茶', '清流白茶', '宁化白茶', '大田白茶', '尤溪白茶', '沙县白茶', '永安白茶',
        '三元白茶', '梅列白茶', '福鼎白茶', '柘荣白茶', '霞浦白茶', '寿宁白茶', '周宁白茶', '屏南白茶'
      ],
      '黄茶': [
        '君山银针', '蒙顶黄芽', '霍山黄芽', '北港毛尖', '沩山毛尖', '平阳黄汤', '远安鹿苑', '皖西黄大茶',
        '广东大叶青', '海马宫茶', '温州黄汤', '莫干黄芽', '德清黄芽', '长兴黄芽', '安吉黄芽', '临安黄芽',
        '淳安黄芽', '建德黄芽', '桐庐黄芽', '富阳黄芽', '萧山黄芽', '余杭黄芽', '临平黄芽', '钱塘黄芽',
        '西湖黄芽', '滨江黄芽', '上城黄芽', '下城黄芽', '江干黄芽', '拱墅黄芽', '余杭黄芽', '富阳黄芽'
      ],
      '青茶（乌龙茶）': [
        '铁观音', '大红袍', '肉桂', '水仙', '凤凰单丛', '冻顶乌龙', '东方美人', '文山包种',
        '金萱', '翠玉', '四季春', '青心乌龙', '青心大冇', '硬枝红心', '台茶12号', '台茶13号',
        '台茶14号', '台茶15号', '台茶16号', '台茶17号', '台茶18号', '台茶19号', '台茶20号', '台茶21号',
        '台茶22号', '台茶23号', '台茶24号', '台茶25号', '台茶26号', '台茶27号', '台茶28号', '台茶29号',
        '台茶30号', '台茶31号', '台茶32号', '台茶33号', '台茶34号', '台茶35号', '台茶36号', '台茶37号',
        '台茶38号', '台茶39号', '台茶40号', '台茶41号', '台茶42号', '台茶43号', '台茶44号', '台茶45号'
      ],
      '红茶': [
        '正山小种', '祁门红茶', '滇红', '宁红', '宜红', '川红', '闽红', '湖红',
        '金骏眉', '银骏眉', '坦洋工夫', '白琳工夫', '政和工夫', '英德红茶', '九曲红梅', '越红工夫',
        '苏红工夫', '黔红工夫', '桂红工夫', '湘红工夫', '粤红工夫', '台红工夫', '海南红茶', '日照红茶',
        '信阳红', '汉中红', '安康红茶', '商洛红茶', '宝鸡红茶', '咸阳红茶', '渭南红茶', '延安红茶',
        '榆林红茶', '汉中红茶', '安康红茶', '商洛红茶', '宝鸡红茶', '咸阳红茶', '渭南红茶', '延安红茶'
      ],
      '黑茶': [
        '普洱茶', '安化黑茶', '六堡茶', '茯砖茶', '青砖茶', '康砖茶', '花砖茶', '黑砖茶',
        '千两茶', '百两茶', '十两茶', '天尖茶', '贡尖茶', '生尖茶', '金尖茶', '芽尖茶',
        '毛尖茶', '芽茶', '饼茶', '沱茶', '砖茶', '散茶', '紧压茶', '散装茶',
        '生茶', '熟茶', '老茶', '新茶', '陈茶', '古茶', '野生茶', '台地茶',
        '冰岛', '班章', '易武', '景迈', '南糯', '布朗', '勐海', '勐腊', '景洪', '思茅',
        '临沧', '保山', '德宏', '西双版纳', '老班章', '新班章', '老曼峨', '新曼峨',
        '老曼撒', '新曼撒', '老曼松', '新曼松', '老曼糯', '新曼糯', '老曼卡', '新曼卡'
      ],
      '花茶': [
        '茉莉花茶', '玫瑰花茶', '桂花茶', '菊花茶', '金银花茶', '薰衣草茶', '薄荷茶', '柠檬茶',
        '橙花茶', '栀子花茶', '玉兰花茶', '珠兰花茶', '白兰花茶', '玳玳花茶', '柚花茶', '米兰花茶',
        '树兰花茶', '木兰花茶', '月季花茶', '蔷薇花茶', '芙蓉花茶', '荷花茶', '莲花茶', '睡莲茶',
        '水仙花茶', '风信子茶', '郁金香茶', '百合花茶', '兰花茶', '蝴蝶兰茶', '石斛兰茶', '春兰茶'
      ]
    },
    
    categoryList: ['绿茶', '白茶', '黄茶', '青茶（乌龙茶）', '红茶', '黑茶', '花茶'],
    subCategoryList: [],
    
    // 价格趋势数据
    priceTrends: {},
    
    // 显示模式
    displayMode: 'map', // map, list, trend
    
    // 选中的标记点
    selectedMarker: null,
    
    // 统计信息
    statistics: {
      totalCities: 0,
      totalMerchants: 0,
      avgPrice: 0,
      priceRange: ''
    }
  },

  onLoad() {
    console.log('市场地图页面加载')
    this.getUserLocation()
    this.loadMapData()
  },

  onShow() {
    console.log('市场地图页面显示')
  },

  // 获取用户位置
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          'userLocation.latitude': res.latitude,
          'userLocation.longitude': res.longitude,
          'mapConfig.latitude': res.latitude,
          'mapConfig.longitude': res.longitude
        })
        this.reverseGeocode(res.latitude, res.longitude)
      },
      fail: () => {
        console.log('获取位置失败，使用默认位置')
      }
    })
  },

  // 逆地理编码
  reverseGeocode(latitude, longitude) {
    // 这里应该调用地图API获取城市信息
    // 暂时使用模拟数据
    const mockCity = '杭州市'
    this.setData({
      'userLocation.city': mockCity
    })
  },

  // 加载地图数据
  loadMapData() {
    this.setData({
      loading: true
    })

    // 模拟API调用
    setTimeout(() => {
      const mockMapData = [
        {
          id: 1,
          city: '杭州市',
          latitude: 30.2741,
          longitude: 120.1551,
          category: '绿茶',
          subCategory: '',
          priceRange: '650-1480',
          unit: '元/斤',
          merchantCount: 25,
          avgPrice: 1065,
          updateTime: '今日更新',
          status: 'updated'
        },
        {
          id: 2,
          city: '苏州市',
          latitude: 31.2990,
          longitude: 120.5853,
          category: '绿茶',
          subCategory: '',
          priceRange: '580-1200',
          unit: '元/斤',
          merchantCount: 18,
          avgPrice: 890,
          updateTime: '1天前',
          status: 'recent'
        },
        {
          id: 3,
          city: '南京市',
          latitude: 32.0603,
          longitude: 118.7969,
          category: '绿茶',
          subCategory: '雨花茶',
          priceRange: '420-980',
          unit: '元/斤',
          merchantCount: 12,
          avgPrice: 700,
          updateTime: '2天前',
          status: 'recent'
        },
        {
          id: 4,
          city: '上海市',
          latitude: 31.2304,
          longitude: 121.4737,
          category: '红茶',
          subCategory: '正山小种',
          priceRange: '380-850',
          unit: '元/斤',
          merchantCount: 15,
          avgPrice: 615,
          updateTime: '今日更新',
          status: 'updated'
        },
        {
          id: 5,
          city: '广州市',
          latitude: 23.1291,
          longitude: 113.2644,
          category: '乌龙茶',
          subCategory: '铁观音',
          priceRange: '280-680',
          unit: '元/斤',
          merchantCount: 22,
          avgPrice: 480,
          updateTime: '3天前',
          status: 'outdated'
        }
      ]

      this.setData({
        mapData: mockMapData,
        loading: false
      })

      this.updateMapMarkers()
      this.calculateStatistics()
      this.loadPriceTrends()
    }, 1000)
  },

  // 更新地图标记
  updateMapMarkers() {
    const markers = this.data.mapData.map((item, index) => ({
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      title: `${item.city} ${item.subCategory}`,
      iconPath: this.getMarkerIcon(item.status),
      width: 30,
      height: 30,
      callout: {
        content: `${item.city}\n${item.subCategory}\n${item.priceRange}${item.unit}`,
        color: '#333',
        fontSize: 12,
        borderRadius: 4,
        bgColor: '#fff',
        padding: 8,
        display: 'BYCLICK'
      }
    }))

    this.setData({
      'mapConfig.markers': markers
    })
  },

  // 获取标记图标
  getMarkerIcon(status) {
    switch (status) {
      case 'updated':
        return '/images/marker-green.png' // 今日更新
      case 'recent':
        return '/images/marker-yellow.png' // 最近更新
      case 'outdated':
        return '/images/marker-red.png' // 过期数据
      default:
        return '/images/marker-gray.png'
    }
  },

  // 计算统计信息
  calculateStatistics() {
    const data = this.data.mapData
    const totalCities = data.length
    const totalMerchants = data.reduce((sum, item) => sum + item.merchantCount, 0)
    const avgPrice = Math.round(data.reduce((sum, item) => sum + item.avgPrice, 0) / totalCities)
    
    const prices = data.map(item => item.avgPrice).sort((a, b) => a - b)
    const priceRange = `${prices[0]}-${prices[prices.length - 1]}`

    this.setData({
      statistics: {
        totalCities,
        totalMerchants,
        avgPrice,
        priceRange
      }
    })
  },

  // 加载价格趋势
  loadPriceTrends() {
    // TODO: 从服务器获取真实的价格趋势数据
    const mockTrends = {}

    this.setData({
      priceTrends: mockTrends
    })
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      filterCategory: category,
      filterSubCategory: '',
      subCategoryList: this.data.teaCategories[category] || []
    })
    this.filterMapData()
  },

  // 选择子分类
  selectSubCategory(e) {
    const subCategory = e.currentTarget.dataset.subcategory
    this.setData({
      filterSubCategory: subCategory
    })
    this.filterMapData()
  },

  // 筛选地图数据
  filterMapData() {
    let filteredData = [...this.data.mapData]
    
    if (this.data.filterCategory) {
      filteredData = filteredData.filter(item => item.category === this.data.filterCategory)
    }
    
    if (this.data.filterSubCategory) {
      filteredData = filteredData.filter(item => item.subCategory === this.data.filterSubCategory)
    }
    
    this.setData({
      mapData: filteredData
    })
    
    this.updateMapMarkers()
    this.calculateStatistics()
  },

  // 切换显示模式
  switchDisplayMode(e) {
    const mode = e.currentTarget.dataset.mode
    this.setData({
      displayMode: mode
    })
  },

  // 标记点点击事件
  onMarkerTap(e) {
    const markerId = e.detail.markerId
    const marker = this.data.mapData.find(item => item.id === markerId)
    
    if (marker) {
      this.setData({
        selectedMarker: marker
      })
      
      // 显示详情弹窗
      this.showMarkerDetail(marker)
    }
  },

  // 显示标记点详情
  showMarkerDetail(marker) {
    wx.showModal({
      title: `${marker.city} ${marker.subCategory}`,
      content: `价格区间：${marker.priceRange}${marker.unit}\n商户数量：${marker.merchantCount}家\n平均价格：${marker.avgPrice}${marker.unit}\n更新时间：${marker.updateTime}`,
      confirmText: '查看详情',
      cancelText: '关闭',
      success: (res) => {
        if (res.confirm) {
          this.navigateToDetail(marker.id)
        }
      }
    })
  },

  // 跳转到详情页
  navigateToDetail(id) {
    wx.navigateTo({
      url: `/pages/market-price-detail/market-price-detail?id=${id}`
    })
  },

  // 地图区域变化
  onRegionChange(e) {
    if (e.type === 'end') {
      // 地图移动结束，可以加载新区域的数据
      console.log('地图区域变化', e.detail)
    }
  },

  // 返回用户位置
  moveToUserLocation() {
    this.setData({
      'mapConfig.latitude': this.data.userLocation.latitude,
      'mapConfig.longitude': this.data.userLocation.longitude,
      'mapConfig.scale': 10
    })
  },

  // 刷新数据
  refreshData() {
    this.loadMapData()
  },

  // 分享地图
  onShareAppMessage() {
    return {
      title: '茶叶行情地图',
      path: '/pages/market-map/market-map'
    }
  }
}) 