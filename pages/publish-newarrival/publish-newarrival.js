Page({
  data: {
    // 表单数据
    formData: {
      name: '', // 新品名称
      category: '', // 茶类
      subCategory: '', // 具体品类
      arrivalTime: '', // 到货时间
      priceRange: '', // 价格范围
      stock: '', // 库存数量
      description: '', // 商品描述
      images: [], // 商品图片
      process: '', // 工艺说明
      origin: '' // 产地
    },

    // 完整的茶叶分类数据
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
    units: ['斤', '公斤', '饼', '件', '箱', '包', '克', '两'],

    // 当前选中的分类
    selectedCategory: '',
    selectedSubCategory: '',

    // 表单验证状态
    formErrors: {},

    // 提交状态
    submitting: false,

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
    }
  },

  onLoad() {
    console.log('发布新品页面加载')
    this.updateIncentives()
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 选择茶类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategory: category,
      selectedSubCategory: '',
      'formData.category': category,
      'formData.subCategory': ''
    })
  },

  // 选择具体品类
  selectSubCategory(e) {
    const subCategory = e.currentTarget.dataset.subcategory
    this.setData({
      selectedSubCategory: subCategory,
      'formData.subCategory': subCategory
    })
  },

  // 输入新品名称
  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
  },

  // 输入到货时间
  onArrivalTimeInput(e) {
    this.setData({
      'formData.arrivalTime': e.detail.value
    })
  },

  // 输入价格范围
  onPriceRangeInput(e) {
    this.setData({
      'formData.priceRange': e.detail.value
    })
  },

  // 输入库存数量
  onStockInput(e) {
    this.setData({
      'formData.stock': e.detail.value
    })
  },

  // 输入商品描述
  onDescriptionInput(e) {
    this.setData({
      'formData.description': e.detail.value
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

  // 更新激励提示
  updateIncentives() {
    const incentives = { ...this.data.incentives }
    
    // 检查图片上传
    incentives.images.completed = this.data.formData.images.length > 0
    
    // 检查产地信息
    incentives.origin.completed = this.data.formData.origin.trim() !== ''
    
    // 检查工艺说明
    incentives.process.completed = this.data.formData.process.trim() !== ''
    
    this.setData({ incentives })
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9 - this.data.formData.images.length,
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
    wx.previewImage({
      current: this.data.formData.images[index],
      urls: this.data.formData.images
    })
  },

  // 表单验证
  validateForm() {
    const errors = {}
    const { formData } = this.data

    if (!formData.name.trim()) {
      errors.name = '请输入新品名称'
    }

    if (!formData.category) {
      errors.category = '请选择茶类'
    }

    if (!formData.subCategory) {
      errors.subCategory = '请选择具体品类'
    }

    if (!formData.arrivalTime) {
      errors.arrivalTime = '请选择到货时间'
    }

    if (!formData.priceRange.trim()) {
      errors.priceRange = '请输入价格范围'
    }

    // 库存数量改为可选字段
    // if (!formData.stock.trim()) {
    //   errors.stock = '请输入库存数量'
    // }

    // 商品描述改为可选字段
    // if (!formData.description.trim()) {
    //   errors.description = '请输入商品描述'
    // }

    this.setData({ formErrors: errors })
    return Object.keys(errors).length === 0
  },

  // 提交表单
  async submitForm() {
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }

    this.setData({ submitting: true })

    try {
      // 准备提交数据
      const submitData = {
        ...this.data.formData,
        create_time: new Date().toISOString()
      }

      // 尝试提交到API
      const { API } = require('../../utils/api-manager.js')
      const response = await API.createNewarrival(submitData)
      
      if (response.status === 'success') {
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        })
        
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        throw new Error(response.message || '发布失败')
      }
    } catch (error) {
      console.error('发布新品失败:', error)
      wx.showToast({
        title: error.message || '发布失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ submitting: false })
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
              name: '',
              category: '',
              subCategory: '',
              arrivalTime: '',
              priceRange: '',
              stock: '',
              description: '',
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
  }
}) 