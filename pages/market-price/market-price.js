Page({
  data: {
    // 页面状态
    loading: false,
    
    // 用户位置
    userLocation: null,
    locationAuthorized: false,
    
    // 筛选条件
    filters: {
      city: '全部城市',
      category: '全部茶类',
      subCategory: '全部品类'
    },
    
    // 排序方式
    sortType: 'recommend', // recommend, price, rating, distance
    sortDirection: 'desc', // asc, desc
    
    // 城市列表
    cities: [
      '全部城市', '杭州市', '苏州市', '南京市', '上海市', '广州市', 
      '深圳市', '成都市', '昆明市', '福州市', '厦门市', '黄山市', 
      '泉州市', '福鼎市', '普洱市', '信阳市', '安溪县', '武夷山市'
    ],
    
    // 茶类分类
    teaCategories: {
      '全部茶类': ['全部品类'],
      '绿茶': ['全部品类', '都匀毛尖', '庐山云雾', '恩施玉露', '蒙顶甘露', '竹叶青', '峨眉毛峰', '顾渚紫笋', '径山茶',
        '千岛玉叶', '开化龙顶', '大佛龙井', '松阳银猴', '武阳春雨', '雪水云绿', '望海茶', '绿剑茶',
        '羊岩勾青', '临海蟠毫', '天台山云雾茶', '磐安云峰', '江山绿牡丹', '仙居碧绿', '遂昌银猴',
        '缙云毛峰', '龙泉金观音', '景宁惠明茶', '泰顺三杯香', '苍南翠龙', '平阳黄汤', '永嘉乌牛早',
        '乐清雁荡毛峰', '瑞安清明早', '文成刘基贡茶', '泰顺香菇寮白毫', '苍南五凤香茗', '平阳早香茶'],
      '白茶': ['全部品类', '白毫银针', '白牡丹', '贡眉', '寿眉', '新工艺白茶', '月光白', '政和白茶', '建阳白茶',
        '松溪白茶', '浦城白茶', '武夷白茶', '建瓯白茶', '顺昌白茶', '光泽白茶', '邵武白茶', '泰宁白茶',
        '将乐白茶', '明溪白茶', '清流白茶', '宁化白茶', '大田白茶', '尤溪白茶', '沙县白茶', '永安白茶',
        '三元白茶', '梅列白茶', '福鼎白茶', '柘荣白茶', '霞浦白茶', '寿宁白茶', '周宁白茶', '屏南白茶'],
      '黄茶': ['全部品类', '君山银针', '蒙顶黄芽', '霍山黄芽', '北港毛尖', '沩山毛尖', '平阳黄汤', '远安鹿苑', '皖西黄大茶',
        '广东大叶青', '海马宫茶', '温州黄汤', '莫干黄芽', '德清黄芽', '长兴黄芽', '安吉黄芽', '临安黄芽',
        '淳安黄芽', '建德黄芽', '桐庐黄芽', '富阳黄芽', '萧山黄芽', '余杭黄芽', '临平黄芽', '钱塘黄芽',
        '西湖黄芽', '滨江黄芽', '上城黄芽', '下城黄芽', '江干黄芽', '拱墅黄芽', '余杭黄芽', '富阳黄芽'],
      '青茶（乌龙茶）': ['全部品类', '铁观音', '大红袍', '肉桂', '水仙', '凤凰单丛', '冻顶乌龙', '东方美人', '文山包种',
        '金萱', '翠玉', '四季春', '青心乌龙', '青心大冇', '硬枝红心', '台茶12号', '台茶13号',
        '台茶14号', '台茶15号', '台茶16号', '台茶17号', '台茶18号', '台茶19号', '台茶20号', '台茶21号',
        '台茶22号', '台茶23号', '台茶24号', '台茶25号', '台茶26号', '台茶27号', '台茶28号', '台茶29号',
        '台茶30号', '台茶31号', '台茶32号', '台茶33号', '台茶34号', '台茶35号', '台茶36号', '台茶37号',
        '台茶38号', '台茶39号', '台茶40号', '台茶41号', '台茶42号', '台茶43号', '台茶44号', '台茶45号'],
      '红茶': ['全部品类', '正山小种', '祁门红茶', '滇红', '宁红', '宜红', '川红', '闽红', '湖红',
        '金骏眉', '银骏眉', '坦洋工夫', '白琳工夫', '政和工夫', '英德红茶', '九曲红梅', '越红工夫',
        '苏红工夫', '黔红工夫', '桂红工夫', '湘红工夫', '粤红工夫', '台红工夫', '海南红茶', '日照红茶',
        '信阳红', '汉中红', '安康红茶', '商洛红茶', '宝鸡红茶', '咸阳红茶', '渭南红茶', '延安红茶',
        '榆林红茶', '汉中红茶', '安康红茶', '商洛红茶', '宝鸡红茶', '咸阳红茶', '渭南红茶', '延安红茶'],
      '黑茶': ['全部品类', '普洱茶', '安化黑茶', '六堡茶', '茯砖茶', '青砖茶', '康砖茶', '花砖茶', '黑砖茶',
        '千两茶', '百两茶', '十两茶', '天尖茶', '贡尖茶', '生尖茶', '金尖茶', '芽尖茶',
        '毛尖茶', '芽茶', '饼茶', '沱茶', '砖茶', '散茶', '紧压茶', '散装茶',
        '生茶', '熟茶', '老茶', '新茶', '陈茶', '古茶', '野生茶', '台地茶',
        '冰岛', '班章', '易武', '景迈', '南糯', '布朗', '勐海', '勐腊', '景洪', '思茅',
        '临沧', '保山', '德宏', '西双版纳', '老班章', '新班章', '老曼峨', '新曼峨',
        '老曼撒', '新曼撒', '老曼松', '新曼松', '老曼糯', '新曼糯', '老曼卡', '新曼卡'],
      '花茶': ['全部品类', '茉莉花茶', '玫瑰花茶', '桂花茶', '菊花茶', '金银花茶', '薰衣草茶', '薄荷茶', '柠檬茶',
        '橙花茶', '栀子花茶', '玉兰花茶', '珠兰花茶', '白兰花茶', '玳玳花茶', '柚花茶', '米兰花茶',
        '树兰花茶', '木兰花茶', '月季花茶', '蔷薇花茶', '芙蓉花茶', '荷花茶', '莲花茶', '睡莲茶',
        '水仙花茶', '风信子茶', '郁金香茶', '百合花茶', '兰花茶', '蝴蝶兰茶', '石斛兰茶', '春兰茶']
    },
    
    // 价格数据
    priceData: [], // 清空示例数据，等待真实数据
    
    // 筛选后的数据
    filteredData: [],
    
    // 显示筛选面板
    showFilterPanel: false,
    
    // 显示排序选项
    showSortOptions: false
  },

  onLoad() {
    console.log('品类行情页面加载')
    this.loadPriceData()
    this.initLocation()
    
    console.log('页面初始化完成，筛选数据数量:', this.data.filteredData.length)
  },

  // 加载价格数据
  loadPriceData() {
    console.log('开始加载价格数据...')
    this.setData({ loading: true })
    
    // 尝试从API加载数据
    const { API } = require('../../utils/api-manager')
    
    API.getMarketPrice()
      .then(data => {
        console.log('API数据加载成功:', data)
        this.setData({
          priceData: data || [],
          loading: false
        })
        this.filterData()
      })
      .catch(error => {
        console.error('API数据加载失败:', error)
        // 使用本地数据作为备选
        this.loadLocalPriceData()
      })
  },

  // 加载本地价格数据
  loadLocalPriceData() {
    console.log('使用本地价格数据')
    // 从API管理器获取本地数据
    const { apiManager } = require('../../utils/api-manager')
    const localData = apiManager.getLocalMarketPrice ? apiManager.getLocalMarketPrice() : []
    
    this.setData({
      priceData: localData,
      loading: false
    })
    this.filterData()
  },

  onShow() {
    console.log('品类行情页面显示')
  },

  // 初始化位置信息
  initLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          userLocation: res,
          locationAuthorized: true
        })
        console.log('获取位置成功:', res)
      },
      fail: (err) => {
        console.log('获取位置失败:', err)
        this.setData({
          locationAuthorized: false
        })
      }
    })
  },

  // 筛选数据
  filterData() {
    console.log('开始筛选数据...')
    let filtered = this.data.priceData
    console.log('原始数据数量:', filtered.length)
    
    // 按城市筛选
    if (this.data.filters.city !== '全部城市') {
      filtered = filtered.filter(item => item.city === this.data.filters.city)
      console.log('城市筛选后数量:', filtered.length)
    }
    
    // 按茶类筛选
    if (this.data.filters.category !== '全部茶类') {
      filtered = filtered.filter(item => item.category === this.data.filters.category)
      console.log('茶类筛选后数量:', filtered.length)
    }
    
    // 按具体品类筛选
    if (this.data.filters.subCategory !== '全部品类') {
      filtered = filtered.filter(item => item.subCategory === this.data.filters.subCategory)
      console.log('品类筛选后数量:', filtered.length)
    }
    
    // 排序
    filtered = this.sortData(filtered)
    
    this.setData({
      filteredData: filtered
    })
    
    console.log('筛选完成，最终数据数量:', filtered.length)
  },

  // 排序数据
  sortData(data) {
    const { sortType, sortDirection } = this.data
    
    return data.sort((a, b) => {
      let comparison = 0
      
      switch (sortType) {
        case 'price':
          const aPrice = parseInt(a.priceRange.split('-')[0])
          const bPrice = parseInt(b.priceRange.split('-')[0])
          comparison = aPrice - bPrice
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'distance':
          comparison = a.distance - b.distance
          break
        case 'recommend':
        default:
          // 推荐排序：综合评分（评分 + 咨询量权重 + 更新状态权重）
          const aScore = a.rating * 0.4 + (a.inquiryCount / 100) * 0.3 + (a.updateStatus === 'updated' ? 0.3 : 0)
          const bScore = b.rating * 0.4 + (b.inquiryCount / 100) * 0.3 + (b.updateStatus === 'updated' ? 0.3 : 0)
          comparison = bScore - aScore
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })
  },

  // 切换筛选面板
  toggleFilterPanel() {
    this.setData({
      showFilterPanel: !this.data.showFilterPanel,
      showSortOptions: false
    })
  },

  // 切换排序选项
  toggleSortOptions() {
    this.setData({
      showSortOptions: !this.data.showSortOptions,
      showFilterPanel: false
    })
  },

  // 选择城市
  selectCity(e) {
    const city = e.currentTarget.dataset.city
    this.setData({
      'filters.city': city,
      showFilterPanel: false
    })
    this.filterData()
  },

  // 选择茶类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      'filters.category': category,
      'filters.subCategory': '全部品类',
      showFilterPanel: false
    })
    this.filterData()
  },

  // 选择具体品类
  selectSubCategory(e) {
    const subCategory = e.currentTarget.dataset.subcategory
    this.setData({
      'filters.subCategory': subCategory,
      showFilterPanel: false
    })
    this.filterData()
  },

  // 选择排序方式
  selectSort(e) {
    const { sort, direction } = e.currentTarget.dataset
    this.setData({
      sortType: sort,
      sortDirection: direction || 'desc',
      showSortOptions: false
    })
    this.filterData()
  },

  // 查看价格详情
  viewPriceDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/market-price-detail/market-price-detail?id=${id}`
    })
  },

  // 发布价格
  publishPrice() {
    wx.navigateTo({
      url: '/pages/publish-price/publish-price'
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '茶叶品类行情 - 实时价格查询',
      path: '/pages/market-price/market-price',
      imageUrl: '/images/share-market-price.jpg'
    }
  },

  // 重置筛选
  resetFilters() {
    console.log('重置筛选条件')
    this.setData({
      filters: {
        city: '全部城市',
        category: '全部茶类',
        subCategory: '全部品类'
      },
      sortType: 'recommend',
      sortDirection: 'desc',
      filteredData: this.data.priceData
    })
    console.log('重置完成，数据数量:', this.data.priceData.length)
  }
}) 