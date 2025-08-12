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
                    },
                    {
                      id: 'tea_market_street',
                      name: '茶市街',
                      location: '北京市西城区',
                      merchantCount: 150,
                      address: '北京市西城区茶市街',
                      description: '西城区传统茶叶交易街'
                    }
                  ]
                },
                {
                  id: 'chaoyang',
                  name: '朝阳区',
                  markets: [
                    {
                      id: 'sijichun_tea_city',
                      name: '四季春茶城',
                      location: '北京市朝阳区',
                      merchantCount: 180,
                      address: '北京市朝阳区四季春',
                      description: '朝阳区主要茶叶交易中心'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'fujian',
          name: '福建省',
          cities: [
            {
              id: 'fuzhou',
              name: '福州市',
              districts: [
                {
                  id: 'jinan',
                  name: '晋安区',
                  markets: [
                    {
                      id: 'wuliting_tea_market',
                      name: '五里亭茶叶市场（新茶城）',
                      location: '福建省福州市晋安区',
                      merchantCount: 200,
                      address: '福州市晋安区五里亭',
                      description: '福州市主要茶叶批发市场，新茶城'
                    }
                  ]
                }
              ]
            },
            {
              id: 'xiamen',
              name: '厦门市',
              districts: [
                {
                  id: 'huli',
                  name: '湖里区',
                  markets: [
                    {
                      id: 'tiancheng_tea_market',
                      name: '天成茶叶市场',
                      location: '福建省厦门市湖里区',
                      merchantCount: 180,
                      address: '厦门市湖里区',
                      description: '湖里区主要茶叶交易市场'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'shandong',
          name: '山东省',
          cities: [
            {
              id: 'qingdao',
              name: '青岛市',
              districts: [
                {
                  id: 'licang',
                  name: '李沧区',
                  markets: [
                    {
                      id: 'qingdao_international',
                      name: '青岛国际茶城（兴邦茶城）',
                      location: '山东省青岛市李沧区',
                      merchantCount: 180,
                      address: '青岛市李沧区',
                      description: '青岛市规模最大的茶叶批发市场之一'
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
      },
      {
        id: 'wuliting',
        name: '五里亭茶叶市场',
        location: '福建省福州市',
        merchantCount: 200,
        description: '福州市主要茶叶批发市场'
      },
      {
        id: 'qingdao_international',
        name: '青岛国际茶城',
        location: '山东省青岛市',
        merchantCount: 180,
        description: '青岛市规模最大的茶叶批发市场'
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
        this.setData({
          'joinForm.license': res.tempFilePaths[0]
        })
        wx.showToast({
          title: '营业执照上传成功',
          icon: 'success'
        })
      }
    })
  },

  // 提交入驻申请
  submitJoinForm() {
    const form = this.data.joinForm
    
    // 表单验证 - 只验证必填项
    if (!form.merchantName.trim()) {
      wx.showToast({
        title: '请输入商户名称',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedProvince) {
      wx.showToast({
        title: '请选择省份',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedCity) {
      wx.showToast({
        title: '请选择城市',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedDistrict) {
      wx.showToast({
        title: '请选择区县',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedMarket) {
      wx.showToast({
        title: '请选择市场',
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
      const marketInfo = form.selectedMarket.isOther ? 
        `${form.selectedProvince.name}${form.selectedCity.name}${form.selectedDistrict.name}其他市场` :
        form.selectedMarket.name
      
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
  }
}) 