const { API } = require('../../utils/api-manager')

Page({
  data: {
    inquiryList: [],
    hasMore: true,
    loading: false,
    // apiBase字段已废弃，统一用API.getInquiry()
    // 表单数据
    formData: {
      category: '', // 求购品类
      subCategory: '', // 子分类
      quantity: '', // 数量
      unit: '公斤', // 单位
      description: '', // 要求/规格描述
      budgetMin: '', // 最低预算
      budgetMax: '', // 最高预算
      province: '', // 收货省份
      city: '', // 收货城市
      district: '', // 收货区县
      contactTime: '工作时间', // 期望联系时间
      validDays: 15, // 有效期限
      attachments: [] // 附件
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

    // 分类列表（用于WXML渲染）
    categoryList: ['绿茶', '白茶', '黄茶', '青茶（乌龙茶）', '红茶', '黑茶', '花茶'],

    // 单位选项
    units: ['公斤', '斤', '饼', '件', '箱', '包', '克', '两'],

    // 联系时间选项
    contactTimes: ['工作时间', '全天', '上午', '下午', '晚上'],

    // 有效期选项
    validDaysOptions: [7, 15, 30],

    // 省份数据
    provinces: [
      { name: '北京市', cities: ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'] },
      { name: '上海市', cities: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'] },
      { name: '广东省', cities: ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'] },
      { name: '浙江省', cities: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'] },
      { name: '江苏省', cities: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'] },
      { name: '山东省', cities: ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '莱芜市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'] },
      { name: '福建省', cities: ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'] },
      { name: '四川省', cities: ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'] },
      { name: '云南省', cities: ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'] },
      { name: '安徽省', cities: ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'] }
    ],

    // 当前城市和区县数据
    currentCities: [],
    currentDistricts: [],

    // 当前选中的分类
    selectedCategory: '',
    selectedSubCategory: '',

    // 表单验证状态
    formErrors: {},

    // 提交状态
    submitting: false,

    // 预览模式
    previewMode: false
  },

  onLoad() {
    console.log('采购询价页面加载完成')
    this.loadInquiryList()
  },

  // 加载询价列表
  async loadInquiryList() {
    this.setData({ loading: true })
    try {
      const res = await API.getInquiry()
      if (res.status === 'success') {
        this.setData({
          inquiryList: res.data || [],
          loading: false
        })
      } else {
        this.loadDefaultData()
      }
    } catch (err) {
      console.log('API加载失败，使用默认数据:', err)
      this.loadDefaultData()
    }
  },

  // 加载默认数据（备用）
  loadDefaultData() {
    // 清空示例数据，等待真实数据
    this.setData({
      inquiryList: [],
      loading: false
    })
  },

  publishInquiry() {
    wx.navigateTo({
      url: '/pages/publish-inquiry/publish-inquiry',
      fail: () => {
        wx.showToast({
          title: '页面开发中',
          icon: 'none'
        })
      }
    })
  },

  viewInquiryDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/inquiry-detail/inquiry-detail?id=${id}`,
      fail: () => {
        wx.showToast({
          title: '页面开发中',
          icon: 'none'
        })
      }
    })
  },

  loadMore() {
    wx.showLoading({
      title: '加载中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '暂无更多数据',
        icon: 'none'
      })
    }, 1000)
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

  // 输入数量
  onQuantityInput(e) {
    this.setData({
      'formData.quantity': e.detail.value
    })
  },

  // 选择单位
  onUnitChange(e) {
    this.setData({
      'formData.unit': this.data.units[e.detail.value]
    })
  },

  // 输入描述
  onDescriptionInput(e) {
    this.setData({
      'formData.description': e.detail.value
    })
  },

  // 输入最低预算
  onBudgetMinInput(e) {
    this.setData({
      'formData.budgetMin': e.detail.value
    })
  },

  // 输入最高预算
  onBudgetMaxInput(e) {
    this.setData({
      'formData.budgetMax': e.detail.value
    })
  },

  // 选择省份
  onProvinceChange(e) {
    const provinceIndex = e.detail.value
    const province = this.data.provinces[provinceIndex]
    this.setData({
      'formData.province': province.name,
      'formData.city': '',
      'formData.district': '',
      currentCities: province.cities,
      currentDistricts: []
    })
  },

  // 选择城市
  onCityChange(e) {
    const cityIndex = e.detail.value
    const city = this.data.currentCities[cityIndex]
    this.setData({
      'formData.city': city,
      'formData.district': '',
      currentDistricts: [] // 这里可以添加区县数据，暂时为空
    })
  },

  // 选择区县
  onDistrictChange(e) {
    const districtIndex = e.detail.value
    const district = this.data.currentDistricts[districtIndex]
    this.setData({
      'formData.district': district
    })
  },

  // 选择联系时间
  onContactTimeChange(e) {
    this.setData({
      'formData.contactTime': this.data.contactTimes[e.detail.value]
    })
  },

  // 选择有效期
  onValidDaysChange(e) {
    this.setData({
      'formData.validDays': this.data.validDaysOptions[e.detail.value]
    })
  },

  // 上传附件
  chooseAttachment() {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const attachments = [...this.data.formData.attachments, ...res.tempFilePaths]
        this.setData({
          'formData.attachments': attachments
        })
      }
    })
  },

  // 删除附件
  deleteAttachment(e) {
    const index = e.currentTarget.dataset.index
    const attachments = [...this.data.formData.attachments]
    attachments.splice(index, 1)
    this.setData({
      'formData.attachments': attachments
    })
  },

  // 预览附件
  previewAttachment(e) {
    const index = e.currentTarget.dataset.index
    const url = this.data.formData.attachments[index]
    wx.previewImage({
      current: url,
      urls: this.data.formData.attachments
    })
  },

  // 表单验证
  validateForm() {
    const errors = {}
    const { formData } = this.data

    if (!formData.category) {
      errors.category = '请选择求购品类'
    }
    if (!formData.subCategory) {
      errors.subCategory = '请选择具体茶品'
    }
    if (!formData.quantity) {
      errors.quantity = '请输入求购数量'
    }
    if (!formData.description) {
      errors.description = '请填写要求/规格描述'
    }
    if (formData.description.length < 10) {
      errors.description = '描述至少需要10个字符'
    }
    if (formData.budgetMin && formData.budgetMax && parseFloat(formData.budgetMin) > parseFloat(formData.budgetMax)) {
      errors.budget = '最低预算不能大于最高预算'
    }

    this.setData({ formErrors: errors })
    return Object.keys(errors).length === 0
  },

  // 预览求购信息
  previewInquiry() {
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }

    this.setData({
      previewMode: true
    })
  },

  // 返回编辑
  backToEdit() {
    this.setData({
      previewMode: false
    })
  },

  // 提交求购信息
  async submitInquiry() {
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }

    this.setData({ submitting: true })

    try {
      const res = await API.publishInquiry(this.data.formData)
      this.setData({ submitting: false })
      
      if (res.status === 'success') {
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        })

        // 跳转到我的求购信息页面
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/my-inquiry/my-inquiry'
          })
        }, 1500)
      } else {
        wx.showToast({
          title: res.message || '发布失败',
          icon: 'none'
        })
      }
    } catch (error) {
      this.setData({ submitting: false })
      wx.showToast({
        title: '发布失败，请稍后重试',
        icon: 'none'
      })
    }
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
              category: '',
              subCategory: '',
              quantity: '',
              unit: '公斤',
              description: '',
              budgetMin: '',
              budgetMax: '',
              province: '',
              city: '',
              district: '',
              contactTime: '工作时间',
              validDays: 15,
              attachments: []
            },
            selectedCategory: '',
            selectedSubCategory: '',
            formErrors: {}
          })
        }
      }
    })
  }
}) 