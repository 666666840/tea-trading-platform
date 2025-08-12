Page({
  data: {
    // 表单数据
    formData: {
      city: '', // 地级市
      category: '', // 茶类
      subCategory: '', // 具体品类
      priceMin: '', // 最低价
      priceMax: '', // 最高价
      unit: '元/斤', // 单位
      images: [], // 茶叶实拍图
      process: '', // 工艺说明
      origin: '' // 产地
    },

    // 茶叶分类数据
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

    // 分类列表
    categoryList: ['绿茶', '白茶', '黄茶', '青茶（乌龙茶）', '红茶', '黑茶', '花茶'],

    // 单位选项
    units: ['元/斤', '元/公斤', '元/饼', '元/件', '元/箱', '元/包', '元/克', '元/两'],

    // 当前选中的分类
    selectedCategory: '',
    selectedSubCategory: '',

    // 表单验证状态
    formErrors: {},

    // 提交状态
    submitting: false,

    // 用户位置
    userLocation: {
      province: '',
      city: '',
      district: ''
    },

    // 页面模式（新增/更新）
    pageMode: 'create',

    // 激励提示
    incentives: {
      images: {
        title: '上传实拍图',
        desc: '买家咨询量提升2倍',
        icon: '📷',
        completed: false,
        reward: '获得「实拍」标'
      },
      origin: {
        title: '填写产地信息',
        desc: '获得「产地齐全」标',
        icon: '📍',
        completed: false,
        reward: '获得「齐全」标'
      },
      process: {
        title: '工艺说明',
        desc: '提升产品可信度',
        icon: '⚙️',
        completed: false,
        reward: '提升曝光权重'
      }
    },

    // 热门城市
    hotCities: ['杭州市', '苏州市', '南京市', '上海市', '广州市', '深圳市', '成都市', '昆明市', '福州市', '厦门市'],

    // 数据更新提醒
    updateReminders: [],

    // 快速更新模式
    quickUpdateMode: false
  },

  onLoad(options) {
    console.log('发布价格页面加载', options)
    
    // 检查是否为更新模式
    if (options.id && options.mode === 'update') {
      this.setData({
        pageMode: 'update'
      })
      this.loadExistingData(options.id)
    }
    
    // 检查是否为快速更新模式
    if (options.quickUpdate === 'true') {
      this.setData({
        quickUpdateMode: true
      })
      this.loadQuickUpdateData(options.id)
    }
    
    this.getUserLocation()
    this.updateIncentives()
    this.loadUpdateReminders()
  },

  // 加载现有数据（更新模式）
  loadExistingData(id) {
    // TODO: 从服务器获取真实的现有数据
    const mockData = {
      id: id,
      city: '',
      category: '',
      subCategory: '',
      priceMin: '',
      priceMax: '',
      unit: '元/斤',
      images: [],
      process: '',
      origin: ''
    }
    
    this.setData({
      formData: mockData,
      selectedCategory: mockData.category,
      selectedSubCategory: mockData.subCategory
    })
    
    this.updateIncentives()
  },

  // 加载快速更新数据
  loadQuickUpdateData(id) {
    // TODO: 从服务器获取真实的现有数据用于快速更新
    const mockData = {
      id: id,
      city: '',
      category: '',
      subCategory: '',
      priceMin: '',
      priceMax: '',
      unit: '元/斤',
      images: [],
      process: '',
      origin: ''
    }
    
    this.setData({
      formData: mockData,
      selectedCategory: mockData.category,
      selectedSubCategory: mockData.subCategory
    })
    
    this.updateIncentives()
  },

  // 加载数据更新提醒
  loadUpdateReminders() {
    // 从服务器获取真实的更新提醒数据
    // TODO: 替换为真实的API调用
    const updateReminders = []
    
    this.setData({
      updateReminders: updateReminders
    })
  },

  // 获取用户位置
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        // 根据经纬度获取城市信息
        this.reverseGeocode(res.latitude, res.longitude)
      },
      fail: () => {
        // 定位失败，使用默认城市
        this.setData({
          'formData.city': '杭州市'
        })
      }
    })
  },

  // 逆地理编码
  reverseGeocode(latitude, longitude) {
    // 这里应该调用地图API获取城市信息
    // 暂时使用模拟数据
    const mockCity = '杭州市'
    this.setData({
      'formData.city': mockCity,
      userLocation: {
        province: '浙江省',
        city: mockCity,
        district: '西湖区'
      }
    })
  },

  // 选择城市
  selectCity(e) {
    const city = e.currentTarget.dataset.city
    this.setData({
      'formData.city': city
    })
  },

  // 选择茶叶分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategory: category,
      selectedSubCategory: '',
      'formData.category': category,
      'formData.subCategory': ''
    })
  },

  // 选择子分类
  selectSubCategory(e) {
    const subCategory = e.currentTarget.dataset.subcategory
    this.setData({
      selectedSubCategory: subCategory,
      'formData.subCategory': subCategory
    })
  },

  // 输入最低价格
  onPriceMinInput(e) {
    this.setData({
      'formData.priceMin': e.detail.value
    })
  },

  // 输入最高价格
  onPriceMaxInput(e) {
    this.setData({
      'formData.priceMax': e.detail.value
    })
  },

  // 选择单位
  onUnitChange(e) {
    this.setData({
      'formData.unit': this.data.units[e.detail.value]
    })
  },

  // 输入工艺说明
  onProcessInput(e) {
    this.setData({
      'formData.process': e.detail.value
    })
    this.updateIncentives()
  },

  // 输入产地
  onOriginInput(e) {
    this.setData({
      'formData.origin': e.detail.value
    })
    this.updateIncentives()
  },

  // 更新激励状态
  updateIncentives() {
    const { formData } = this.data
    const incentives = { ...this.data.incentives }
    
    incentives.images.completed = formData.images.length > 0
    incentives.origin.completed = formData.origin.trim() !== ''
    incentives.process.completed = formData.process.trim() !== ''
    
    this.setData({ incentives })
  },

  // 上传图片
  chooseImage() {
    const remainingCount = 3 - this.data.formData.images.length
    if (remainingCount <= 0) {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none'
      })
      return
    }

    wx.chooseImage({
      count: remainingCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...this.data.formData.images, ...res.tempFilePaths]
        this.setData({
          'formData.images': newImages
        })
        this.updateIncentives()
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = [...this.data.formData.images]
    images.splice(index, 1)
    this.setData({
      'formData.images': images
    })
    this.updateIncentives()
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    const url = this.data.formData.images[index]
    wx.previewImage({
      current: url,
      urls: this.data.formData.images
    })
  },

  // 表单验证
  validateForm() {
    const errors = {}
    const { formData } = this.data

    if (!formData.city) {
      errors.city = '请选择地级市'
    }

    if (!formData.category) {
      errors.category = '请选择茶类'
    }

    if (!formData.subCategory) {
      errors.subCategory = '请选择具体品类'
    }

    if (!formData.priceMin) {
      errors.priceMin = '请输入最低价格'
    } else if (isNaN(formData.priceMin) || parseFloat(formData.priceMin) <= 0) {
      errors.priceMin = '请输入有效的价格'
    }

    if (!formData.priceMax) {
      errors.priceMax = '请输入最高价格'
    } else if (isNaN(formData.priceMax) || parseFloat(formData.priceMax) <= 0) {
      errors.priceMax = '请输入有效的价格'
    }

    if (formData.priceMin && formData.priceMax) {
      const minPrice = parseFloat(formData.priceMin)
      const maxPrice = parseFloat(formData.priceMax)
      if (minPrice >= maxPrice) {
        errors.priceMax = '最高价格必须大于最低价格'
      }
    }

    this.setData({ formErrors: errors })
    return Object.keys(errors).length === 0
  },

  // 提交价格
  submitPrice() {
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }

    if (this.data.submitting) {
      return
    }

    this.setData({ submitting: true })

    wx.showLoading({
      title: this.data.pageMode === 'update' ? '更新中...' : '发布中...'
    })

    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: this.data.pageMode === 'update' ? '更新成功' : '发布成功',
        icon: 'success'
      })

      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

      this.setData({ submitting: false })
    }, 2000)
  },

  // 重置表单
  resetForm() {
    wx.showModal({
      title: '确认重置',
      content: '确定要清空所有已填写的信息吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            formData: {
              city: this.data.formData.city, // 保留城市信息
              category: '',
              subCategory: '',
              priceMin: '',
              priceMax: '',
              unit: '元/斤',
              images: [],
              process: '',
              origin: ''
            },
            selectedCategory: '',
            selectedSubCategory: '',
            formErrors: {}
          })
          this.updateIncentives()
        }
      }
    })
  },

  // 快速更新（价格未变）
  quickUpdate() {
    if (!this.data.formData.id) {
      wx.showToast({
        title: '请先选择要更新的产品',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认更新',
      content: '价格未变，确认更新？',
      success: (res) => {
        if (res.confirm) {
          this.submitQuickUpdate()
        }
      }
    })
  },

  // 提交快速更新
  submitQuickUpdate() {
    this.setData({
      submitting: true
    })

    // 模拟API调用
    setTimeout(() => {
      this.setData({
        submitting: false
      })
      
      wx.showToast({
        title: '更新成功',
        icon: 'success'
      })
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  }
}) 