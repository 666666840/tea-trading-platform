Page({
  data: {
    // 当前步骤
    currentStep: 1,
    totalSteps: 3,
    
    // 表单数据
    formData: {
      // 基本信息
      title: '',
      type: '',
      priceType: '', // transfer: 转让, rent: 出租
      price: '',
      location: '',
      area: '',
      areaUnit: '',
      description: '',
      
      // 分类特定信息
      marketInfo: {
        boothNumber: '',
        floor: '',
        direction: '',
        businessHours: '',
        parking: '',
        security: '',
        facilities: []
      },
      
      warehouseInfo: {
        height: '',
        loadCapacity: '',
        truckWidth: '',
        facilities: []
      },
      
      gardenInfo: {
        landType: '', // 租赁/所有权
        remainingYears: '',
        soilQuality: '',
        waterSource: ''
      },
      
      equipmentInfo: {
        equipmentList: [],
        useYears: '',
        canTest: false,
        maintenance: ''
      },
      
      factoryInfo: {
        assetDetails: [],
        debtInfo: '',
        employeeCount: '',
        annualRevenue: ''
      },
      
      // 转让条件
      transferConditions: {
        transferFee: '',
        deposit: '',
        contractTerm: '',
        requirements: []
      },
      
      // 联系信息
      contactInfo: {
        name: '',
        phone: '',
        wechat: '',
        address: ''
      },
      
      // 图片
      images: []
    },
    
    // 分类选项
    typeOptions: [
      { value: 'market', label: '市场档口', icon: '🏪' },
      { value: 'warehouse', label: '仓库/厂房', icon: '🏭' },
      { value: 'garden', label: '茶园', icon: '🌱' },
      { value: 'equipment', label: '设备', icon: '⚙️' },
      { value: 'factory', label: '整厂转让', icon: '🏢' }
    ],
    
    // 价格类型选项
    priceTypeOptions: [
      { value: 'transfer', label: '转让' },
      { value: 'rent', label: '出租' }
    ],
    
    // 面积单位选项
    areaUnitOptions: [
      { value: '㎡', label: '平方米' },
      { value: '亩', label: '亩' },
      { value: '套', label: '套' }
    ],
    
    // 面积单位索引（用于picker）
    areaUnitIndex: 0,
    
    // 设施选中状态（用于WXML）
    facilityStatus: {
      market: {},
      warehouse: {},
      factory: {}
    },
    
    // 设施选项
    facilityOptions: {
      market: ['空调', '水电', '网络', '监控', '消防', '电梯'],
      warehouse: ['恒温', '恒湿', '监控', '消防', '装卸平台', '停车场'],
      garden: ['灌溉系统', '道路', '电力', '水源', '防护设施'],
      equipment: ['说明书', '保修卡', '发票', '检测报告'],
      factory: ['厂房', '设备', '品牌', '客户资源', '员工', '技术']
    },
    
    // 表单验证错误
    errors: {},
    
    // 加载状态
    loading: false,
    
    // 草稿数据
    draftData: null
  },

  onLoad(options) {
    console.log('=== 出租转让发布页面加载 ===')
    console.log('页面参数:', options)
    
    // 检查是否有模板数据
    if (options.template === 'true') {
      this.loadTemplateData()
    }
    
    // 加载草稿
    this.loadDraft()
  },

  // 加载草稿
  loadDraft() {
    const draft = wx.getStorageSync('rental_draft')
    if (draft) {
      this.setData({
        draftData: draft,
        formData: draft
      })
      
      // 更新面积单位索引
      this.updateAreaUnitIndex()
      
      // 更新设施选中状态
      this.updateFacilityStatus()
      
      wx.showModal({
        title: '发现草稿',
        content: '是否恢复上次未完成的发布？',
        confirmText: '恢复',
        cancelText: '重新开始',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              formData: draft
            })
            this.updateAreaUnitIndex()
            this.updateFacilityStatus()
          } else {
            wx.removeStorageSync('rental_draft')
          }
        }
      })
    }
  },

  // 加载模板数据
  loadTemplateData() {
    console.log('📋 加载模板数据')
    
    const templateData = wx.getStorageSync('rental_template')
    if (templateData) {
      // 更新表单数据
      this.setData({
        'formData.type': templateData.type || '',
        'formData.priceType': templateData.priceType || '',
        'formData.location': templateData.location || '',
        'formData.area': templateData.area || '',
        'formData.areaUnit': templateData.areaUnit || ''
      })
      
      // 更新面积单位索引
      this.updateAreaUnitIndex()
      
      // 清除模板数据
      wx.removeStorageSync('rental_template')
      
      wx.showToast({
        title: '已加载模板数据',
        icon: 'success'
      })
    }
  },

  // 更新面积单位索引
  updateAreaUnitIndex() {
    const { formData, areaUnitOptions } = this.data
    const index = areaUnitOptions.findIndex(item => item.value === formData.areaUnit)
    this.setData({
      areaUnitIndex: index >= 0 ? index : 0
    })
  },

  // 更新设施选中状态
  updateFacilityStatus() {
    const { formData, facilityOptions } = this.data
    const facilityStatus = {
      market: {},
      warehouse: {},
      factory: {}
    }
    
    // 更新市场设施状态
    facilityOptions.market.forEach(item => {
      facilityStatus.market[item] = formData.marketInfo.facilities.includes(item)
    })
    
    // 更新仓库设施状态
    facilityOptions.warehouse.forEach(item => {
      facilityStatus.warehouse[item] = formData.warehouseInfo.facilities.includes(item)
    })
    
    // 更新工厂资产状态
    facilityOptions.factory.forEach(item => {
      facilityStatus.factory[item] = formData.factoryInfo.assetDetails.includes(item)
    })
    
    this.setData({ facilityStatus })
  },

  // 保存草稿
  saveDraft() {
    wx.setStorageSync('rental_draft', this.data.formData)
    wx.showToast({
      title: '草稿已保存',
      icon: 'success'
    })
  },

  // 清空草稿
  clearDraft() {
    wx.removeStorageSync('rental_draft')
    this.setData({
      formData: {
        title: '',
        type: '',
        priceType: '',
        price: '',
        location: '',
        area: '',
        areaUnit: '',
        description: '',
        marketInfo: { boothNumber: '', floor: '', direction: '', businessHours: '', parking: '', security: '', facilities: [] },
        warehouseInfo: { height: '', loadCapacity: '', truckWidth: '', facilities: [] },
        gardenInfo: { landType: '', remainingYears: '', soilQuality: '', waterSource: '' },
        equipmentInfo: { equipmentList: [], useYears: '', canTest: false, maintenance: '' },
        factoryInfo: { assetDetails: [], debtInfo: '', employeeCount: '', annualRevenue: '' },
        transferConditions: { transferFee: '', deposit: '', contractTerm: '', requirements: [] },
        contactInfo: { name: '', phone: '', wechat: '', address: '' },
        images: []
      },
      errors: {},
      areaUnitIndex: 0,
      facilityStatus: {
        market: {},
        warehouse: {},
        factory: {}
      }
    })
    wx.showToast({
      title: '草稿已清空',
      icon: 'success'
    })
  },

  // 下一步
  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.data.currentStep < this.data.totalSteps) {
        this.setData({
          currentStep: this.data.currentStep + 1
        })
      } else {
        this.submitForm()
      }
    }
  },

  // 上一步
  prevStep() {
    if (this.data.currentStep > 1) {
      this.setData({
        currentStep: this.data.currentStep - 1
      })
    }
  },

  // 跳转到指定步骤
  goToStep(e) {
    const { step } = e.currentTarget.dataset
    if (step <= this.data.currentStep) {
      this.setData({
        currentStep: step
      })
    }
  },

  // 验证当前步骤
  validateCurrentStep() {
    const { currentStep, formData } = this.data
    const errors = {}
    
    switch (currentStep) {
      case 1:
        // 验证基本信息
        if (!formData.title.trim()) {
          errors.title = '请输入标题'
        }
        if (!formData.type) {
          errors.type = '请选择类型'
        }
        if (!formData.priceType) {
          errors.priceType = '请选择转让方式'
        }
        if (!formData.price.trim()) {
          errors.price = '请输入价格'
        }
        if (!formData.location.trim()) {
          errors.location = '请输入位置'
        }
        if (!formData.area.trim()) {
          errors.area = '请输入面积'
        }
        break
        
      case 2:
        // 验证详细信息
        if (!formData.description.trim()) {
          errors.description = '请输入详细描述'
        }
        
        // 根据类型验证特定信息
        if (formData.type === 'market') {
          if (!formData.marketInfo.boothNumber.trim()) {
            errors.boothNumber = '请输入档口号'
          }
        } else if (formData.type === 'warehouse') {
          if (!formData.warehouseInfo.height.trim()) {
            errors.height = '请输入层高'
          }
        } else if (formData.type === 'garden') {
          if (!formData.gardenInfo.landType) {
            errors.landType = '请选择土地性质'
          }
        } else if (formData.type === 'equipment') {
          if (formData.equipmentInfo.equipmentList.length === 0) {
            errors.equipmentList = '请添加设备清单'
          }
        } else if (formData.type === 'factory') {
          if (formData.factoryInfo.assetDetails.length === 0) {
            errors.assetDetails = '请添加资产包详情'
          }
        }
        break
        
      case 3:
        // 验证联系信息
        if (!formData.contactInfo.name.trim()) {
          errors.contactName = '请输入联系人姓名'
        }
        if (!formData.contactInfo.phone.trim()) {
          errors.contactPhone = '请输入联系电话'
        }
        if (!formData.contactInfo.wechat.trim()) {
          errors.contactWechat = '请输入微信号'
        }
        break
    }
    
    this.setData({ errors })
    
    if (Object.keys(errors).length > 0) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return false
    }
    
    return true
  },

  // 输入框变化
  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`formData.${field}`]: value,
      [`errors.${field}`]: ''
    })
  },

  // 选择类型
  onTypeSelect(e) {
    const { value } = e.currentTarget.dataset
    this.setData({
      'formData.type': value,
      'errors.type': ''
    })
  },

  // 选择价格类型
  onPriceTypeSelect(e) {
    const { value } = e.currentTarget.dataset
    this.setData({
      'formData.priceType': value,
      'errors.priceType': ''
    })
  },

  // 选择面积单位
  onAreaUnitSelect(e) {
    const { value } = e.detail
    const { areaUnitOptions } = this.data
    const selectedUnit = areaUnitOptions[value]
    
    this.setData({
      'formData.areaUnit': selectedUnit.value,
      areaUnitIndex: value
    })
  },

  // 选择设施
  onFacilitySelect(e) {
    const { facility, type } = e.currentTarget.dataset
    const { formData } = this.data
    
    let facilities = []
    if (type === 'market') {
      facilities = [...formData.marketInfo.facilities]
    } else if (type === 'warehouse') {
      facilities = [...formData.warehouseInfo.facilities]
    } else if (type === 'garden') {
      facilities = [...formData.gardenInfo.facilities]
    } else if (type === 'equipment') {
      facilities = [...formData.equipmentInfo.equipmentList]
    } else if (type === 'factory') {
      facilities = [...formData.factoryInfo.assetDetails]
    }
    
    const index = facilities.indexOf(facility)
    if (index > -1) {
      facilities.splice(index, 1)
    } else {
      facilities.push(facility)
    }
    
    if (type === 'market') {
      this.setData({
        'formData.marketInfo.facilities': facilities
      }, () => {
        this.updateFacilityStatus()
      })
    } else if (type === 'warehouse') {
      this.setData({
        'formData.warehouseInfo.facilities': facilities
      }, () => {
        this.updateFacilityStatus()
      })
    } else if (type === 'garden') {
      this.setData({
        'formData.gardenInfo.facilities': facilities
      })
    } else if (type === 'equipment') {
      this.setData({
        'formData.equipmentInfo.equipmentList': facilities
      })
    } else if (type === 'factory') {
      this.setData({
        'formData.factoryInfo.assetDetails': facilities
      }, () => {
        this.updateFacilityStatus()
      })
    }
  },

  // 添加设备
  addEquipment() {
    wx.showModal({
      title: '添加设备',
      editable: true,
      placeholderText: '请输入设备名称',
      success: (res) => {
        if (res.confirm && res.content.trim()) {
          const equipmentList = [...this.data.formData.equipmentInfo.equipmentList]
          equipmentList.push(res.content.trim())
          this.setData({
            'formData.equipmentInfo.equipmentList': equipmentList
          })
        }
      }
    })
  },

  // 删除设备
  removeEquipment(e) {
    const { index } = e.currentTarget.dataset
    const equipmentList = [...this.data.formData.equipmentInfo.equipmentList]
    equipmentList.splice(index, 1)
    this.setData({
      'formData.equipmentInfo.equipmentList': equipmentList
    })
  },

  // 选择土地性质
  onLandTypeSelect(e) {
    const { value } = e.currentTarget.dataset
    this.setData({
      'formData.gardenInfo.landType': value,
      'errors.landType': ''
    })
  },

  // 选择是否支持试机
  onTestToggle(e) {
    const { value } = e.detail
    this.setData({
      'formData.equipmentInfo.canTest': value
    })
  },

  // 上传图片
  chooseImage() {
    const { images } = this.data.formData
    const remaining = 9 - images.length
    
    if (remaining <= 0) {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none'
      })
      return
    }
    
    wx.chooseImage({
      count: remaining,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = [...images, ...res.tempFilePaths]
        this.setData({
          'formData.images': newImages
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const { index } = e.currentTarget.dataset
    const images = [...this.data.formData.images]
    images.splice(index, 1)
    this.setData({
      'formData.images': images
    })
  },

  // 预览图片
  previewImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data.formData
    
    wx.previewImage({
      current: images[index],
      urls: images
    })
  },

  // 提交表单
  submitForm() {
    console.log('=== 提交出租转让表单 ===')
    
    if (!this.validateCurrentStep()) {
      wx.showToast({
        title: '请完善必填信息',
        icon: 'none'
      })
      return
    }
    
    // 检查用户登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '登录已过期',
        content: '请重新登录后发布信息',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return
    }
    
    this.setData({ loading: true })
    
    // 显示加载提示
    wx.showLoading({
      title: '正在发布...',
      mask: true
    })
    
    // 模拟提交到服务器
    setTimeout(() => {
      this.setData({ loading: false })
      wx.hideLoading()
      
      // 清除草稿
      wx.removeStorageSync('rental_draft')
      
      // 显示成功提示
      wx.showModal({
        title: '发布成功',
        content: '您的出租转让信息已成功发布，是否查看详情？',
        confirmText: '查看详情',
        cancelText: '返回列表',
        success: (res) => {
          if (res.confirm) {
            // 跳转到详情页面（模拟）
            wx.showToast({
              title: '功能开发中',
              icon: 'none'
            })
            // 实际应该跳转到刚发布的详情页
            // wx.navigateTo({
            //   url: `/pages/rental-detail/rental-detail?id=${newId}`
            // })
          } else {
            // 返回出租转让列表页
            wx.navigateBack({
              success: () => {
                // 通知列表页刷新数据
                const pages = getCurrentPages()
                const prevPage = pages[pages.length - 2]
                if (prevPage && prevPage.refreshList) {
                  prevPage.refreshList()
                }
              }
            })
          }
        }
      })
    }, 2000)
  },

  // 保存草稿
  onSaveDraft() {
    this.saveDraft()
  },

  // 清空草稿
  onClearDraft() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空草稿吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          this.clearDraft()
        }
      }
    })
  }
}) 