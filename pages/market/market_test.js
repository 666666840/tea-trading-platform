Page({
  data: {
    // 当前选中的分类类型
    currentType: 'geographic', // 'geographic' | 'famous'
    
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
    ],
    
    // 地理大区数据 - 简化版本
    geographicData: {
      provinces: [
        {
          id: 'beijing',
          name: '北京市',
          cities: [
            {
              id: 'beijing_city',
              name: '北京市',
              districts: [
                {
                  id: 'xicheng',
                  name: '西城区',
                  markets: [
                    {
                      id: 'maliandao_tea_street',
                      name: '马连道茶叶街',
                      location: '北京市西城区',
                      merchantCount: 800,
                      address: '北京市西城区马连道路',
                      description: '北京地区最大的茶叶交易中心，全国知名的茶叶批发集散地'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    
    // 知名市场数据
    famousMarkets: [
      {
        id: 'maliandao',
        name: '马连道茶叶街',
        location: '北京市西城区',
        merchantCount: 800,
        description: '北京地区最大的茶叶交易中心，全国知名的茶叶批发集散地'
      }
    ],
    
    // 当前选中的省份、城市、区县
    selectedProvince: null,
    selectedCity: null,
    selectedDistrict: null,
    currentMarkets: []
  },

  onLoad() {
    console.log('市场页面加载完成')
  },

  // 切换分类类型
  switchType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type
    })
  },

  // 选择省份
  selectProvince(e) {
    const index = e.currentTarget.dataset.index
    const province = this.data.geographicData.provinces[index]
    
    this.setData({
      selectedProvince: province,
      selectedCity: null,
      selectedDistrict: null,
      currentMarkets: []
    })
  },

  // 选择城市
  selectCity(e) {
    const index = e.currentTarget.dataset.index
    const city = this.data.selectedProvince.cities[index]
    
    this.setData({
      selectedCity: city,
      selectedDistrict: null,
      currentMarkets: []
    })
  },

  // 选择区县
  selectDistrict(e) {
    const index = e.currentTarget.dataset.index
    const district = this.data.selectedCity.districts[index]
    
    this.setData({
      selectedDistrict: district,
      currentMarkets: district.markets
    })
  },

  // 选择市场
  selectMarket(e) {
    const index = e.currentTarget.dataset.index
    const market = this.data.currentMarkets[index]
    
    // 跳转到市场详情页
    wx.navigateTo({
      url: `/pages/market-detail/market-detail?id=${market.id}&name=${market.name}`
    })
  },

  // 返回上级
  goBack() {
    if (this.data.selectedDistrict) {
      this.setData({
        selectedDistrict: null,
        currentMarkets: []
      })
    } else if (this.data.selectedCity) {
      this.setData({
        selectedCity: null,
        selectedDistrict: null,
        currentMarkets: []
      })
    } else if (this.data.selectedProvince) {
      this.setData({
        selectedProvince: null,
        selectedCity: null,
        selectedDistrict: null,
        currentMarkets: []
      })
    }
  },

  // 显示入驻申请表单
  showJoinGuide() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }
}) 