const app = getApp()
const { API } = require('../../utils/api-manager.js')

// 导入完整茶叶市场数据作为降级数据
const { 
  teaMarketCompleteData, 
  generateStats, 
  getMarketsByProvince, 
  getProvincesByRegion, 
  searchMarkets, 
  getFamousMarkets, 
  getMarketsByTeaType, 
  getProvinceStats 
} = require('../../tea-market-complete-data.js')

Page({
  data: {
    // 页面状态
    loading: true,
    searchKeyword: '',
    showSearchResult: false,
    showRegionResult: false,
    connectionStatus: 'checking', // 连接状态
    
    // 省份数据
    provinces: [],
    selectedProvince: null,
    
    // 地理大区
    selectedRegion: null,
    regionMarkets: [],
    groupedMarkets: [],
    
    // 市场数据
    markets: [],
    
    // 统计数据
    totalProvinceCount: 0,
    totalMarketCount: 0,
    provinceStats: null,
    
    // 使用外部完整数据作为降级
    geographicData: teaMarketCompleteData,
    
    // 入驻相关
    showJoinModal: false,
    joinForm: {
      merchantName: '',
      contactName: '',
      phone: '',
      wechat: '',
      businessType: '',
      mainCategory: '',
      description: '',
      license: '',
      // 市场选择相关
      provinceList: [],
      cityList: [],
      districtList: [],
      marketList: [],
      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null,
      selectedMarket: null
    },
    
    // 经营类型选项
    businessTypes: [
      '茶厂',
      '茶园', 
      '一级批发商',
      '品牌总代',
      '区域分销商',
      '源头供应商',
      '零售商'
    ],
    
    // 主营品类选项
    mainCategories: [
      '绿茶类',
      '白茶类', 
      '黄茶类',
      '青茶（乌龙茶）类',
      '红茶类',
      '黑茶类',
      '花茶类'
    ]
  },

  onLoad(options) {
    console.log('🏪 [市场] 页面加载');
    this.loadMarketData();
    
    // 检查是否需要显示入驻表单
    if (options.showJoin === 'true') {
      console.log('🔗 [市场] 检测到showJoin参数，准备显示入驻表单');
      // 延迟显示，确保页面加载完成
      setTimeout(() => {
        this.showJoinGuide();
      }, 1000);
    }
  },

  // 加载市场数据
  async loadMarketData() {
    try {
      this.setData({ loading: true });
      
      // 尝试从API加载数据
      const apiData = await this.loadFromAPI();
      if (apiData) {
        this.setData({
          provinces: apiData.provinces,
          totalProvinceCount: apiData.totalProvinceCount,
          totalMarketCount: apiData.totalMarketCount,
          loading: false,
          connectionStatus: 'online'
        });
        console.log('✅ [市场] API数据加载成功');
        return;
      }
    } catch (error) {
      console.warn('⚠️ [市场] API加载失败，使用本地数据:', error.message);
    }
    
    // 使用本地降级数据
    this.loadLocalData();
  },

  // 从API加载数据
  async loadFromAPI() {
    try {
      const response = await API.getMarkets();
      if (response.status === 'success' && response.data) {
        // 处理API返回的市场数据
        const markets = response.data;
        const provinces = this.processAPIMarkets(markets);
        
        return {
          provinces: provinces,
          totalProvinceCount: provinces.length,
          totalMarketCount: markets.length
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // 处理API返回的市场数据
  processAPIMarkets(markets) {
    // 按省份分组
    const provinceMap = {};
    
    markets.forEach(market => {
      const province = market.province;
      if (!provinceMap[province]) {
        provinceMap[province] = {
          id: province,
          name: province,
          marketCount: 0,
          markets: []
        };
      }
      provinceMap[province].marketCount++;
      provinceMap[province].markets.push(market);
    });
    
    return Object.values(provinceMap);
  },

  // 加载本地降级数据
  loadLocalData() {
    try {
      // 使用外部函数生成统计数据
      const stats = generateStats();
      const provinceStatsList = getProvinceStats();
      
      this.setData({
        provinces: provinceStatsList,
        totalProvinceCount: stats.totalProvinceCount,
        totalMarketCount: stats.totalMarkets,
        loading: false,
        connectionStatus: 'offline'
      });
      
      console.log('✅ [市场] 本地数据加载完成', { 
        provinces: provinceStatsList.length, 
        totalMarkets: stats.totalMarkets 
      });
    } catch (error) {
      console.error('❌ [市场] 本地数据加载失败:', error);
      this.setData({ 
        loading: false,
        connectionStatus: 'offline'
      });
    }
  },

  // 选择省份
  async selectProvince(e) {
    const provinceId = e.currentTarget.dataset.id;
    const province = this.data.provinces.find(p => p.id === provinceId);
    
    if (!province) {
      wx.showToast({
        title: '省份数据未找到',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    try {
      let markets = [];
      
      if (this.data.connectionStatus === 'online') {
        // 从API获取省份市场数据
        const response = await API.getMarkets(province.name);
        if (response.status === 'success' && response.data) {
          markets = response.data;
        }
      } else {
        // 使用本地数据
        markets = getMarketsByProvince(province.name);
      }
      
      const groupedMarkets = this.groupMarketsByCity(markets);
      const provinceStats = this.calculateProvinceStats(markets);

      this.setData({
        selectedProvince: province,
        markets: markets,
        groupedMarkets: groupedMarkets,
        provinceStats: provinceStats,
        showSearchResult: false,
        showRegionResult: false,
        loading: false
      });
      
      console.log(`✅ [市场] ${province.name}市场数据加载完成:`, markets.length, '个市场');
    } catch (error) {
      console.error('❌ [市场] 省份数据加载失败:', error);
      this.setData({ loading: false });
      wx.showToast({
        title: '数据加载失败',
        icon: 'none'
      });
    }
  },

  // 按城市分组市场
  groupMarketsByCity(markets) {
    const grouped = {};
    
    markets.forEach(market => {
      const city = market.city;
      const district = market.district || '其他';
      
      if (!grouped[city]) {
        grouped[city] = {};
      }
      
      if (!grouped[city][district]) {
        grouped[city][district] = [];
      }
      
      grouped[city][district].push(market);
    });
    
    return Object.keys(grouped).map(city => ({
      city: city,
      districts: Object.keys(grouped[city]).map(district => ({
        district: district,
        markets: grouped[city][district]
      }))
    }));
  },

  // 计算省份统计数据
  calculateProvinceStats(markets) {
    const cities = new Set(markets.map(m => m.city));
    const districts = new Set(markets.map(m => m.district).filter(d => d));
    const totalMerchants = markets.reduce((sum, m) => sum + (m.merchantCount || 0), 0);
    
    return {
      totalCities: cities.size,
      totalDistricts: districts.size,
      totalMarkets: markets.length,
      totalMerchants: totalMerchants
    };
  },

  // 返回省份列表
  backToProvinces() {
    this.setData({
      selectedProvince: null,
      markets: [],
      groupedMarkets: [],
      provinceStats: null,
      showSearchResult: false,
      showRegionResult: false
    });
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 执行搜索
  async onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    try {
      let searchResults = [];
      
      if (this.data.connectionStatus === 'online') {
        // 从API搜索
        const response = await API.getMarkets();
        if (response.status === 'success' && response.data) {
          searchResults = this.searchInMarkets(response.data, keyword);
        }
      } else {
        // 使用本地搜索
        searchResults = searchMarkets(keyword);
      }

      this.setData({
        markets: searchResults,
        showSearchResult: true,
        showRegionResult: false,
        loading: false
      });

      console.log(`🔍 [市场] 搜索"${keyword}"完成:`, searchResults.length, '个结果');
    } catch (error) {
      console.error('❌ [市场] 搜索失败:', error);
      this.setData({ loading: false });
      wx.showToast({
        title: '搜索失败',
        icon: 'none'
      });
    }
  },

  // 在市场中搜索
  searchInMarkets(markets, keyword) {
    return markets.filter(market => 
      market.name.includes(keyword) ||
      market.province.includes(keyword) ||
      market.city.includes(keyword) ||
      market.address.includes(keyword)
    );
  },

  // 清除搜索
  clearSearch() {
    this.setData({
      searchKeyword: '',
      showSearchResult: false,
      markets: [],
      groupedMarkets: []
    });
  },

  // 查看市场详情
  viewMarketDetail(e) {
    const market = e.currentTarget.dataset.market;
    console.log('📖 [市场] 查看详情:', market.name);
    
    wx.navigateTo({
      url: `/pages/market-detail/market-detail?id=${market.id}&name=${market.name}`
    });
  },

  // 显示连接状态
  showConnectionStatus() {
    const status = this.data.connectionStatus;
    const messages = {
      'checking': '正在检查连接...',
      'online': '已连接到服务器',
      'offline': '当前为离线模式'
    };
    
    wx.showToast({
      title: messages[status] || '连接状态未知',
      icon: 'none',
      duration: 2000
    });
  },

  // 重新连接
  async reconnect() {
    this.setData({ connectionStatus: 'checking' });
    await this.loadMarketData();
    
    if (this.data.connectionStatus === 'online') {
      wx.showToast({
        title: '连接成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '连接失败，继续使用离线模式',
        icon: 'none'
      });
    }
  },

  // 快速导航方法
  goToFamous() {
    console.log('🔗 [市场] 跳转到知名市场');
    wx.showToast({
      title: '知名市场功能开发中',
      icon: 'none'
    });
  },

  goToArea() {
    console.log('🔗 [市场] 跳转到地理大区');
    wx.showToast({
      title: '地理大区功能开发中',
      icon: 'none'
    });
  },

  goToJoin() {
    console.log('🔗 [市场] 显示入驻表单');
    this.showJoinGuide();
  },

  // 显示入驻申请表单
  showJoinGuide() {
    console.log('🔗 [市场] 显示入驻申请表单');
    // 初始化市场选择数据
    const provinceList = this.data.geographicData.provinces
    this.setData({
      showJoinModal: true,
      'joinForm.provinceList': provinceList
    })
  },

  // 关闭入驻申请表单
  closeJoinForm() {
    this.setData({
      showJoinModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止事件冒泡
  },

  // 表单输入处理
  inputJoinForm(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`joinForm.${field}`]: value
    })
  },

  // 选择经营类型
  onBusinessTypeChange(e) {
    const index = e.detail.value
    this.setData({
      'joinForm.businessType': this.data.businessTypes[index]
    })
  },

  // 选择主营品类
  onCategoryChange(e) {
    const index = e.detail.value
    this.setData({
      'joinForm.mainCategory': this.data.mainCategories[index]
    })
  },

  // 选择省份
  onProvinceChange(e) {
    const index = e.detail.value
    const province = this.data.joinForm.provinceList[index]
    const cityList = province.cities
    
    this.setData({
      'joinForm.selectedProvince': province,
      'joinForm.cityList': cityList,
      'joinForm.selectedCity': null,
      'joinForm.districtList': [],
      'joinForm.selectedDistrict': null,
      'joinForm.marketList': [],
      'joinForm.selectedMarket': null
    })
  },

  // 选择城市
  onCityChange(e) {
    const index = e.detail.value
    const city = this.data.joinForm.cityList[index]
    const districtList = city.districts
    
    this.setData({
      'joinForm.selectedCity': city,
      'joinForm.districtList': districtList,
      'joinForm.selectedDistrict': null,
      'joinForm.marketList': [],
      'joinForm.selectedMarket': null
    })
  },

  // 选择区县
  onDistrictChange(e) {
    const index = e.detail.value
    const district = this.data.joinForm.districtList[index]
    
    this.setData({
      'joinForm.selectedDistrict': district,
      'joinForm.marketList': district.markets,
      'joinForm.selectedMarket': null
    })
  },

  // 选择市场
  onMarketChange(e) {
    const index = e.detail.value
    const market = this.data.joinForm.marketList[index]
    
    this.setData({
      'joinForm.selectedMarket': market
    })
  },

  // 上传营业执照
  uploadLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          'joinForm.license': tempFilePath
        })
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
      }
    })
  },

  // 提交入驻申请
  submitJoinForm() {
    const form = this.data.joinForm
    
    // 验证必填字段
    if (!form.merchantName || !form.contactName || !form.phone || !form.businessType || !form.mainCategory) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    // 显示提交中状态
    wx.showLoading({
      title: '提交中...'
    })
    
    // 模拟提交
    setTimeout(() => {
      wx.hideLoading()
      
      // 显示提交成功信息
      const marketInfo = form.selectedMarket ? form.selectedMarket.name : '待选择市场'
      
      wx.showModal({
        title: '申请提交成功',
        content: `您的入驻申请已提交，申请入驻市场：${marketInfo}`,
        showCancel: false,
        confirmText: '确定',
        success: () => {
          // 关闭弹窗并重置表单
          this.setData({
            showJoinModal: false,
            joinForm: {
              merchantName: '',
              contactName: '',
              phone: '',
              wechat: '',
              businessType: '',
              mainCategory: '',
              description: '',
              license: '',
              // 市场选择相关
              provinceList: [],
              cityList: [],
              districtList: [],
              marketList: [],
              selectedProvince: null,
              selectedCity: null,
              selectedDistrict: null,
              selectedMarket: null
            }
          })
          
          // 跳转到入驻指南页面
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/market-join-guide/market-join-guide'
            })
          }, 500)
        }
      })
    }, 2000)
  },

  onShareAppMessage() {
    return {
      title: '全国茶叶市场信息',
      path: '/pages/market/market'
    };
  }
});