// 数据管理器 - 真实数据录入和管理
class DataManager {
  constructor() {
    this.merchantsKey = 'realMerchants'
    this.productsKey = 'realProducts'
    this.marketsKey = 'realMarkets'
    this.suppliesKey = 'realSupplies'
    this.maxDataSize = 10 * 1024 * 1024 // 10MB
  }

  // 商户数据管理
  async addMerchant(merchantData) {
    try {
      const merchants = this.getMerchants()
      
      // 数据验证
      const validation = this.validateMerchantData(merchantData)
      if (!validation.valid) {
        throw new Error(validation.message)
      }

      // 生成唯一ID
      const merchantId = this.generateId('merchant')
      
      const newMerchant = {
        id: merchantId,
        ...merchantData,
        status: 'pending', // pending, approved, rejected
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        views: 0,
        contacts: 0,
        rating: 0,
        reviewCount: 0
      }

      merchants.push(newMerchant)
      this.saveMerchants(merchants)
      
      return {
        success: true,
        merchantId: merchantId,
        merchant: newMerchant
      }

    } catch (error) {
      console.error('添加商户失败:', error)
      throw error
    }
  }

  // 验证商户数据
  validateMerchantData(data) {
    const required = ['name', 'category', 'contact', 'phone']
    
    for (const field of required) {
      if (!data[field] || data[field].trim() === '') {
        return {
          valid: false,
          message: `${this.getFieldName(field)}不能为空`
        }
      }
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(data.phone)) {
      return {
        valid: false,
        message: '请输入正确的手机号码'
      }
    }

    // 验证邮箱格式（如果提供）
    if (data.email && data.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        return {
          valid: false,
          message: '请输入正确的邮箱地址'
        }
      }
    }

    return { valid: true }
  }

  // 获取字段中文名
  getFieldName(field) {
    const fieldNames = {
      name: '商户名称',
      category: '经营类别',
      contact: '联系人',
      phone: '联系电话',
      email: '邮箱地址',
      address: '详细地址',
      description: '商户简介'
    }
    return fieldNames[field] || field
  }

  // 获取所有商户
  getMerchants() {
    try {
      return wx.getStorageSync(this.merchantsKey) || []
    } catch (error) {
      console.error('获取商户数据失败:', error)
      return []
    }
  }

  // 保存商户数据
  saveMerchants(merchants) {
    try {
      wx.setStorageSync(this.merchantsKey, merchants)
      return true
    } catch (error) {
      console.error('保存商户数据失败:', error)
      return false
    }
  }

  // 更新商户信息
  async updateMerchant(merchantId, updates) {
    try {
      const merchants = this.getMerchants()
      const index = merchants.findIndex(m => m.id === merchantId)
      
      if (index === -1) {
        throw new Error('商户不存在')
      }

      merchants[index] = {
        ...merchants[index],
        ...updates,
        updateTime: new Date().toISOString()
      }

      this.saveMerchants(merchants)
      
      return {
        success: true,
        merchant: merchants[index]
      }

    } catch (error) {
      console.error('更新商户失败:', error)
      throw error
    }
  }

  // 审核商户
  async approveMerchant(merchantId, status = 'approved', reason = '') {
    try {
      const updates = {
        status: status,
        approveTime: new Date().toISOString(),
        approveReason: reason
      }

      return await this.updateMerchant(merchantId, updates)

    } catch (error) {
      console.error('审核商户失败:', error)
      throw error
    }
  }

  // 删除商户
  async deleteMerchant(merchantId) {
    try {
      const merchants = this.getMerchants()
      const filteredMerchants = merchants.filter(m => m.id !== merchantId)
      
      this.saveMerchants(filteredMerchants)
      
      return {
        success: true,
        deletedCount: merchants.length - filteredMerchants.length
      }

    } catch (error) {
      console.error('删除商户失败:', error)
      throw error
    }
  }

  // 搜索商户
  searchMerchants(keyword, filters = {}) {
    const merchants = this.getMerchants()
    
    let filtered = merchants

    // 关键词搜索
    if (keyword && keyword.trim()) {
      const lowerKeyword = keyword.toLowerCase()
      filtered = filtered.filter(merchant => 
        merchant.name.toLowerCase().includes(lowerKeyword) ||
        merchant.contact.toLowerCase().includes(lowerKeyword) ||
        merchant.category.toLowerCase().includes(lowerKeyword) ||
        (merchant.description && merchant.description.toLowerCase().includes(lowerKeyword))
      )
    }

    // 状态筛选
    if (filters.status) {
      filtered = filtered.filter(merchant => merchant.status === filters.status)
    }

    // 类别筛选
    if (filters.category) {
      filtered = filtered.filter(merchant => merchant.category === filters.category)
    }

    // 地区筛选
    if (filters.province) {
      filtered = filtered.filter(merchant => 
        merchant.province === filters.province ||
        (merchant.address && merchant.address.includes(filters.province))
      )
    }

    return filtered
  }

  // 产品数据管理
  async addProduct(productData) {
    try {
      const products = this.getProducts()
      
      const validation = this.validateProductData(productData)
      if (!validation.valid) {
        throw new Error(validation.message)
      }

      const productId = this.generateId('product')
      
      const newProduct = {
        id: productId,
        ...productData,
        status: 'active',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        views: 0,
        favorites: 0,
        sales: 0
      }

      products.push(newProduct)
      this.saveProducts(products)
      
      return {
        success: true,
        productId: productId,
        product: newProduct
      }

    } catch (error) {
      console.error('添加产品失败:', error)
      throw error
    }
  }

  // 验证产品数据
  validateProductData(data) {
    const required = ['name', 'category', 'price', 'merchantId']
    
    for (const field of required) {
      if (!data[field]) {
        return {
          valid: false,
          message: `${this.getProductFieldName(field)}不能为空`
        }
      }
    }

    // 验证价格
    if (isNaN(data.price) || data.price <= 0) {
      return {
        valid: false,
        message: '请输入正确的价格'
      }
    }

    return { valid: true }
  }

  // 获取产品字段名
  getProductFieldName(field) {
    const fieldNames = {
      name: '产品名称',
      category: '产品类别',
      price: '产品价格',
      merchantId: '所属商户',
      stock: '库存数量',
      unit: '计量单位'
    }
    return fieldNames[field] || field
  }

  // 获取所有产品
  getProducts() {
    try {
      return wx.getStorageSync(this.productsKey) || []
    } catch (error) {
      console.error('获取产品数据失败:', error)
      return []
    }
  }

  // 保存产品数据
  saveProducts(products) {
    try {
      wx.setStorageSync(this.productsKey, products)
      return true
    } catch (error) {
      console.error('保存产品数据失败:', error)
      return false
    }
  }

  // 批量导入数据
  async importData(dataType, data) {
    try {
      if (!Array.isArray(data)) {
        throw new Error('导入数据必须是数组格式')
      }

      const results = {
        success: 0,
        failed: 0,
        errors: []
      }

      for (let i = 0; i < data.length; i++) {
        try {
          switch (dataType) {
            case 'merchants':
              await this.addMerchant(data[i])
              break
            case 'products':
              await this.addProduct(data[i])
              break
            default:
              throw new Error('不支持的数据类型')
          }
          results.success++
        } catch (error) {
          results.failed++
          results.errors.push({
            index: i,
            data: data[i],
            error: error.message
          })
        }
      }

      return results

    } catch (error) {
      console.error('批量导入失败:', error)
      throw error
    }
  }

  // 导出数据
  exportData(dataType) {
    try {
      let data = []
      
      switch (dataType) {
        case 'merchants':
          data = this.getMerchants()
          break
        case 'products':
          data = this.getProducts()
          break
        case 'all':
          data = {
            merchants: this.getMerchants(),
            products: this.getProducts(),
            exportTime: new Date().toISOString()
          }
          break
        default:
          throw new Error('不支持的导出类型')
      }

      const exportContent = JSON.stringify(data, null, 2)
      
      // 复制到剪贴板
      wx.setClipboardData({
        data: exportContent,
        success: () => {
          wx.showToast({
            title: '数据已复制到剪贴板',
            icon: 'success'
          })
        }
      })

      return {
        success: true,
        dataCount: Array.isArray(data) ? data.length : Object.keys(data).length,
        content: exportContent
      }

    } catch (error) {
      console.error('导出数据失败:', error)
      throw error
    }
  }

  // 生成唯一ID
  generateId(prefix = 'item') {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    return `${prefix}_${timestamp}_${random}`
  }

  // 获取数据统计
  getDataStats() {
    const merchants = this.getMerchants()
    const products = this.getProducts()
    
    // 商户统计
    const merchantsByStatus = {
      pending: merchants.filter(m => m.status === 'pending').length,
      approved: merchants.filter(m => m.status === 'approved').length,
      rejected: merchants.filter(m => m.status === 'rejected').length
    }

    const merchantsByCategory = {}
    merchants.forEach(merchant => {
      const category = merchant.category || '未分类'
      merchantsByCategory[category] = (merchantsByCategory[category] || 0) + 1
    })

    // 产品统计
    const productsByCategory = {}
    products.forEach(product => {
      const category = product.category || '未分类'
      productsByCategory[category] = (productsByCategory[category] || 0) + 1
    })

    return {
      merchants: {
        total: merchants.length,
        byStatus: merchantsByStatus,
        byCategory: merchantsByCategory
      },
      products: {
        total: products.length,
        byCategory: productsByCategory,
        averagePrice: products.length > 0 ? 
          products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length : 0
      },
      storage: {
        merchantsSize: JSON.stringify(merchants).length,
        productsSize: JSON.stringify(products).length,
        totalUsed: this.getTotalStorageUsed()
      }
    }
  }

  // 获取存储使用情况
  getTotalStorageUsed() {
    try {
      const info = wx.getStorageInfoSync()
      return {
        currentSize: info.currentSize,
        limitSize: info.limitSize,
        keys: info.keys
      }
    } catch (error) {
      return {
        currentSize: 0,
        limitSize: 0,
        keys: []
      }
    }
  }

  // 清理数据
  async cleanupData(options = {}) {
    try {
      const {
        removeRejected = false,
        removePending = false,
        daysOld = 30
      } = options

      let cleanedCount = 0
      
      // 清理商户数据
      if (removeRejected || removePending) {
        const merchants = this.getMerchants()
        const filteredMerchants = merchants.filter(merchant => {
          if (removeRejected && merchant.status === 'rejected') {
            cleanedCount++
            return false
          }
          if (removePending && merchant.status === 'pending') {
            const createDate = new Date(merchant.createTime)
            const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000)
            if (createDate < cutoffDate) {
              cleanedCount++
              return false
            }
          }
          return true
        })
        
        this.saveMerchants(filteredMerchants)
      }

      return {
        success: true,
        cleanedCount: cleanedCount
      }

    } catch (error) {
      console.error('清理数据失败:', error)
      throw error
    }
  }

  // 数据备份
  async backupData() {
    try {
      const backupData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        data: {
          merchants: this.getMerchants(),
          products: this.getProducts()
        },
        stats: this.getDataStats()
      }

      const backupKey = `backup_${Date.now()}`
      wx.setStorageSync(backupKey, backupData)
      
      return {
        success: true,
        backupKey: backupKey,
        dataSize: JSON.stringify(backupData).length
      }

    } catch (error) {
      console.error('数据备份失败:', error)
      throw error
    }
  }

  // 恢复数据
  async restoreData(backupKey) {
    try {
      const backupData = wx.getStorageSync(backupKey)
      
      if (!backupData || !backupData.data) {
        throw new Error('备份数据不存在或格式错误')
      }

      // 恢复商户数据
      if (backupData.data.merchants) {
        this.saveMerchants(backupData.data.merchants)
      }

      // 恢复产品数据
      if (backupData.data.products) {
        this.saveProducts(backupData.data.products)
      }

      return {
        success: true,
        restoredMerchants: backupData.data.merchants?.length || 0,
        restoredProducts: backupData.data.products?.length || 0
      }

    } catch (error) {
      console.error('数据恢复失败:', error)
      throw error
    }
  }
}

// 创建全局数据管理器实例
const dataManager = new DataManager()

// 导出便捷方法
const Data = {
  // 商户管理
  async addMerchant(merchantData) {
    return dataManager.addMerchant(merchantData)
  },

  getMerchants() {
    return dataManager.getMerchants()
  },

  async updateMerchant(id, updates) {
    return dataManager.updateMerchant(id, updates)
  },

  async approveMerchant(id, status, reason) {
    return dataManager.approveMerchant(id, status, reason)
  },

  async deleteMerchant(id) {
    return dataManager.deleteMerchant(id)
  },

  searchMerchants(keyword, filters) {
    return dataManager.searchMerchants(keyword, filters)
  },

  // 产品管理
  async addProduct(productData) {
    return dataManager.addProduct(productData)
  },

  getProducts() {
    return dataManager.getProducts()
  },

  // 数据导入导出
  async importData(type, data) {
    return dataManager.importData(type, data)
  },

  exportData(type) {
    return dataManager.exportData(type)
  },

  // 统计和管理
  getStats() {
    return dataManager.getDataStats()
  },

  async cleanup(options) {
    return dataManager.cleanupData(options)
  },

  async backup() {
    return dataManager.backupData()
  },

  async restore(backupKey) {
    return dataManager.restoreData(backupKey)
  }
}

module.exports = {
  DataManager,
  Data,
  dataManager
} 