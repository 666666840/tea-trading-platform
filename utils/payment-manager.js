// 支付订单管理系统
class PaymentManager {
  constructor() {
    this.ordersKey = 'paymentOrders'
    this.paymentsKey = 'paymentRecords'
    this.walletKey = 'userWallet'
    this.settingsKey = 'paymentSettings'
    
    // 订单状态
    this.ORDER_STATUS = {
      PENDING: 'pending',           // 待支付
      PAID: 'paid',                // 已支付
      PROCESSING: 'processing',     // 处理中
      SHIPPING: 'shipping',         // 发货中
      DELIVERED: 'delivered',       // 已送达
      COMPLETED: 'completed',       // 已完成
      CANCELLED: 'cancelled',       // 已取消
      REFUNDED: 'refunded',         // 已退款
      FAILED: 'failed'              // 支付失败
    }
    
    // 支付方式
    this.PAYMENT_METHODS = {
      WECHAT: 'wechat',            // 微信支付
      ALIPAY: 'alipay',            // 支付宝
      BALANCE: 'balance',          // 余额支付
      BANK: 'bank',                // 银行卡
      CASH: 'cash',                // 现金
      CREDIT: 'credit'             // 信用支付
    }
    
    // 支付类型
    this.PAYMENT_TYPES = {
      MERCHANT_FEE: 'merchant_fee',     // 商户入驻费
      PRODUCT_PURCHASE: 'product_purchase', // 商品购买
      ADVERTISING: 'advertising',        // 广告费用
      PREMIUM: 'premium',               // 会员费用
      DEPOSIT: 'deposit',               // 保证金
      SERVICE: 'service'                // 服务费
    }
    
    // 初始化
    this.initPaymentSettings()
  }

  // 初始化支付设置
  initPaymentSettings() {
    try {
      // 检查是否已存在设置，如果存在则不重新创建
      const existingSettings = wx.getStorageSync(this.settingsKey)
      if (existingSettings) {
        this.settings = existingSettings
        return
      }
      
      // 只在首次使用时创建默认设置
      const settings = {
        defaultPaymentMethod: this.PAYMENT_METHODS.WECHAT,
        enabledMethods: [
          this.PAYMENT_METHODS.WECHAT,
          this.PAYMENT_METHODS.ALIPAY,
          this.PAYMENT_METHODS.BALANCE
        ],
        autoConfirmDelivery: true,
        confirmDeliveryDays: 7,
        enablePaymentProtection: true,
        maxSinglePayment: 50000,
        enableInstallment: true,
        installmentMinAmount: 1000
      }
      
      wx.setStorageSync(this.settingsKey, settings)
      this.settings = settings
    } catch (error) {
      console.error('初始化支付设置失败:', error)
    }
  }

  // 创建订单
  async createOrder(orderData) {
    try {
      const orderId = this.generateOrderId()
      const currentTime = new Date().toISOString()
      
      // 验证订单数据
      const validation = this.validateOrderData(orderData)
      if (!validation.valid) {
        throw new Error(validation.message)
      }
      
      // 创建订单对象
      const order = {
        id: orderId,
        ...orderData,
        status: this.ORDER_STATUS.PENDING,
        createTime: currentTime,
        updateTime: currentTime,
        expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分钟过期
        statusHistory: [{
          status: this.ORDER_STATUS.PENDING,
          timestamp: currentTime,
          note: '订单创建'
        }],
        paymentInfo: {
          totalAmount: orderData.amount,
          paidAmount: 0,
          refundAmount: 0,
          discountAmount: 0,
          currency: 'CNY'
        }
      }
      
      // 保存订单
      await this.saveOrder(order)
      
      // 发送订单创建通知
      this.sendOrderNotification(order, 'created')
      
      return {
        success: true,
        orderId: orderId,
        order: order
      }
      
    } catch (error) {
      console.error('创建订单失败:', error)
      throw error
    }
  }

  // 发起支付
  async initiatePayment(orderId, paymentMethod, paymentData = {}) {
    try {
      const order = await this.getOrder(orderId)
      if (!order) {
        throw new Error('订单不存在')
      }
      
      if (order.status !== this.ORDER_STATUS.PENDING) {
        throw new Error('订单状态不允许支付')
      }
      
      // 检查订单是否过期
      if (new Date() > new Date(order.expireTime)) {
        await this.updateOrderStatus(orderId, this.ORDER_STATUS.CANCELLED, '订单超时取消')
        throw new Error('订单已超时')
      }
      
      // 根据支付方式处理
      let paymentResult
      switch (paymentMethod) {
        case this.PAYMENT_METHODS.WECHAT:
          paymentResult = await this.processWechatPayment(order, paymentData)
          break
        case this.PAYMENT_METHODS.ALIPAY:
          paymentResult = await this.processAlipayPayment(order, paymentData)
          break
        case this.PAYMENT_METHODS.BALANCE:
          paymentResult = await this.processBalancePayment(order, paymentData)
          break
        case this.PAYMENT_METHODS.BANK:
          paymentResult = await this.processBankPayment(order, paymentData)
          break
        default:
          throw new Error('不支持的支付方式')
      }
      
      // 记录支付记录
      await this.recordPayment(order, paymentMethod, paymentResult)
      
      return paymentResult
      
    } catch (error) {
      console.error('发起支付失败:', error)
      throw error
    }
  }

  // 处理微信支付
  async processWechatPayment(order, paymentData) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: String(Date.now()),
        nonceStr: this.generateNonceStr(),
        package: `prepay_id=${order.id}`,
        signType: 'MD5',
        paySign: this.generatePaySign(order),
        success: async (res) => {
          console.log('微信支付成功:', res)
          
          // 更新订单状态
          await this.updateOrderStatus(order.id, this.ORDER_STATUS.PAID, '微信支付成功')
          
          resolve({
            success: true,
            paymentMethod: this.PAYMENT_METHODS.WECHAT,
            transactionId: res.transactionId || `wx_${Date.now()}`,
            amount: order.paymentInfo.totalAmount,
            timestamp: new Date().toISOString()
          })
        },
        fail: async (error) => {
          console.error('微信支付失败:', error)
          
          // 更新订单状态
          await this.updateOrderStatus(order.id, this.ORDER_STATUS.FAILED, '微信支付失败')
          
          reject(new Error('微信支付失败: ' + error.errMsg))
        }
      })
    })
  }

  // 处理支付宝支付
  async processAlipayPayment(order, paymentData) {
    // 模拟支付宝支付
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '支付宝支付',
        content: `支付金额：￥${order.paymentInfo.totalAmount}`,
        confirmText: '确认支付',
        success: async (res) => {
          if (res.confirm) {
            // 模拟支付成功
            await this.updateOrderStatus(order.id, this.ORDER_STATUS.PAID, '支付宝支付成功')
            
            resolve({
              success: true,
              paymentMethod: this.PAYMENT_METHODS.ALIPAY,
              transactionId: `alipay_${Date.now()}`,
              amount: order.paymentInfo.totalAmount,
              timestamp: new Date().toISOString()
            })
          } else {
            reject(new Error('用户取消支付'))
          }
        }
      })
    })
  }

  // 处理余额支付
  async processBalancePayment(order, paymentData) {
    try {
      const wallet = await this.getUserWallet()
      
      if (wallet.balance < order.paymentInfo.totalAmount) {
        throw new Error('余额不足')
      }
      
      // 扣除余额
      await this.updateWalletBalance(-order.paymentInfo.totalAmount, '订单支付')
      
      // 更新订单状态
      await this.updateOrderStatus(order.id, this.ORDER_STATUS.PAID, '余额支付成功')
      
      return {
        success: true,
        paymentMethod: this.PAYMENT_METHODS.BALANCE,
        transactionId: `balance_${Date.now()}`,
        amount: order.paymentInfo.totalAmount,
        timestamp: new Date().toISOString()
      }
      
    } catch (error) {
      console.error('余额支付失败:', error)
      throw error
    }
  }

  // 处理银行卡支付
  async processBankPayment(order, paymentData) {
    // 模拟银行卡支付
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '银行卡支付',
        content: `支付金额：￥${order.paymentInfo.totalAmount}\n银行卡：${paymentData.bankCard || '****1234'}`,
        confirmText: '确认支付',
        success: async (res) => {
          if (res.confirm) {
            // 模拟支付成功
            await this.updateOrderStatus(order.id, this.ORDER_STATUS.PAID, '银行卡支付成功')
            
            resolve({
              success: true,
              paymentMethod: this.PAYMENT_METHODS.BANK,
              transactionId: `bank_${Date.now()}`,
              amount: order.paymentInfo.totalAmount,
              timestamp: new Date().toISOString()
            })
          } else {
            reject(new Error('用户取消支付'))
          }
        }
      })
    })
  }

  // 更新订单状态
  async updateOrderStatus(orderId, newStatus, note = '') {
    try {
      const order = await this.getOrder(orderId)
      if (!order) {
        throw new Error('订单不存在')
      }
      
      const currentTime = new Date().toISOString()
      
      // 更新订单状态
      order.status = newStatus
      order.updateTime = currentTime
      order.statusHistory.push({
        status: newStatus,
        timestamp: currentTime,
        note: note
      })
      
      // 根据状态更新支付信息
      if (newStatus === this.ORDER_STATUS.PAID) {
        order.paymentInfo.paidAmount = order.paymentInfo.totalAmount
        order.paymentInfo.payTime = currentTime
      }
      
      // 保存订单
      await this.saveOrder(order)
      
      // 发送状态更新通知
      this.sendOrderNotification(order, 'status_updated')
      
      return {
        success: true,
        order: order
      }
      
    } catch (error) {
      console.error('更新订单状态失败:', error)
      throw error
    }
  }

  // 申请退款
  async requestRefund(orderId, refundAmount, reason = '') {
    try {
      const order = await this.getOrder(orderId)
      if (!order) {
        throw new Error('订单不存在')
      }
      
      if (order.status !== this.ORDER_STATUS.PAID && order.status !== this.ORDER_STATUS.COMPLETED) {
        throw new Error('订单状态不允许退款')
      }
      
      if (refundAmount > order.paymentInfo.paidAmount - order.paymentInfo.refundAmount) {
        throw new Error('退款金额超过可退款金额')
      }
      
      // 创建退款申请
      const refundId = this.generateRefundId()
      const refundData = {
        id: refundId,
        orderId: orderId,
        amount: refundAmount,
        reason: reason,
        status: 'pending',
        createTime: new Date().toISOString(),
        userId: order.userId
      }
      
      // 保存退款申请
      await this.saveRefund(refundData)
      
      // 更新订单状态
      await this.updateOrderStatus(orderId, this.ORDER_STATUS.REFUNDED, `申请退款：${reason}`)
      
      // 发送退款通知
      this.sendRefundNotification(refundData, 'requested')
      
      return {
        success: true,
        refundId: refundId,
        refund: refundData
      }
      
    } catch (error) {
      console.error('申请退款失败:', error)
      throw error
    }
  }

  // 处理退款
  async processRefund(refundId, approved = true, adminNote = '') {
    try {
      const refund = await this.getRefund(refundId)
      if (!refund) {
        throw new Error('退款申请不存在')
      }
      
      if (approved) {
        // 退款到用户钱包
        await this.updateWalletBalance(refund.amount, '订单退款')
        
        // 更新订单退款信息
        const order = await this.getOrder(refund.orderId)
        order.paymentInfo.refundAmount += refund.amount
        await this.saveOrder(order)
        
        refund.status = 'completed'
        refund.processTime = new Date().toISOString()
        refund.adminNote = adminNote
        
        // 发送退款成功通知
        this.sendRefundNotification(refund, 'completed')
        
      } else {
        refund.status = 'rejected'
        refund.processTime = new Date().toISOString()
        refund.adminNote = adminNote
        
        // 发送退款拒绝通知
        this.sendRefundNotification(refund, 'rejected')
      }
      
      await this.saveRefund(refund)
      
      return {
        success: true,
        refund: refund
      }
      
    } catch (error) {
      console.error('处理退款失败:', error)
      throw error
    }
  }

  // 获取用户钱包
  async getUserWallet() {
    try {
      const wallet = wx.getStorageSync(this.walletKey) || {
        balance: 0,
        frozenBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        transactions: []
      }
      
      return wallet
    } catch (error) {
      console.error('获取用户钱包失败:', error)
      return {
        balance: 0,
        frozenBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        transactions: []
      }
    }
  }

  // 更新钱包余额
  async updateWalletBalance(amount, description = '') {
    try {
      const wallet = await this.getUserWallet()
      
      wallet.balance += amount
      
      if (amount > 0) {
        wallet.totalIncome += amount
      } else {
        wallet.totalExpense += Math.abs(amount)
      }
      
      // 添加交易记录
      wallet.transactions.push({
        id: this.generateTransactionId(),
        amount: amount,
        description: description,
        timestamp: new Date().toISOString(),
        type: amount > 0 ? 'income' : 'expense'
      })
      
      // 只保留最近500条记录
      if (wallet.transactions.length > 500) {
        wallet.transactions = wallet.transactions.slice(-500)
      }
      
      wx.setStorageSync(this.walletKey, wallet)
      
      return wallet
    } catch (error) {
      console.error('更新钱包余额失败:', error)
      throw error
    }
  }

  // 获取订单
  async getOrder(orderId) {
    try {
      const orders = wx.getStorageSync(this.ordersKey) || []
      return orders.find(order => order.id === orderId)
    } catch (error) {
      console.error('获取订单失败:', error)
      return null
    }
  }

  // 获取用户订单列表
  async getUserOrders(userId, filters = {}) {
    try {
      const orders = wx.getStorageSync(this.ordersKey) || []
      let userOrders = orders.filter(order => order.userId === userId)
      
      // 状态筛选
      if (filters.status) {
        userOrders = userOrders.filter(order => order.status === filters.status)
      }
      
      // 时间筛选
      if (filters.startTime) {
        userOrders = userOrders.filter(order => order.createTime >= filters.startTime)
      }
      
      if (filters.endTime) {
        userOrders = userOrders.filter(order => order.createTime <= filters.endTime)
      }
      
      // 排序
      userOrders.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
      
      return userOrders
    } catch (error) {
      console.error('获取用户订单失败:', error)
      return []
    }
  }

  // 保存订单
  async saveOrder(order) {
    try {
      const orders = wx.getStorageSync(this.ordersKey) || []
      const index = orders.findIndex(o => o.id === order.id)
      
      if (index >= 0) {
        orders[index] = order
      } else {
        orders.push(order)
      }
      
      wx.setStorageSync(this.ordersKey, orders)
      return true
    } catch (error) {
      console.error('保存订单失败:', error)
      throw error
    }
  }

  // 记录支付记录
  async recordPayment(order, paymentMethod, paymentResult) {
    try {
      const payments = wx.getStorageSync(this.paymentsKey) || []
      
      const payment = {
        id: this.generatePaymentId(),
        orderId: order.id,
        userId: order.userId,
        amount: paymentResult.amount,
        paymentMethod: paymentMethod,
        transactionId: paymentResult.transactionId,
        status: paymentResult.success ? 'success' : 'failed',
        timestamp: paymentResult.timestamp
      }
      
      payments.push(payment)
      wx.setStorageSync(this.paymentsKey, payments)
      
      return payment
    } catch (error) {
      console.error('记录支付记录失败:', error)
      throw error
    }
  }

  // 发送订单通知
  sendOrderNotification(order, event) {
    try {
      const { notificationManager } = require('./notification-manager')
      
      let title, content
      
      switch (event) {
        case 'created':
          title = '订单创建成功'
          content = `订单 ${order.id} 已创建，请及时支付`
          break
        case 'status_updated':
          title = '订单状态更新'
          content = `订单 ${order.id} 状态更新为：${this.getStatusText(order.status)}`
          break
        default:
          return
      }
      
      notificationManager.createOrderNotification(title, content, {
        orderId: order.id,
        status: order.status
      })
      
    } catch (error) {
      console.error('发送订单通知失败:', error)
    }
  }

  // 发送退款通知
  sendRefundNotification(refund, event) {
    try {
      const { notificationManager } = require('./notification-manager')
      
      let title, content
      
      switch (event) {
        case 'requested':
          title = '退款申请已提交'
          content = `退款申请 ${refund.id} 已提交，等待处理`
          break
        case 'completed':
          title = '退款处理完成'
          content = `退款 ￥${refund.amount} 已到账`
          break
        case 'rejected':
          title = '退款申请被拒绝'
          content = `退款申请 ${refund.id} 被拒绝`
          break
        default:
          return
      }
      
      notificationManager.createOrderNotification(title, content, {
        refundId: refund.id,
        amount: refund.amount
      })
      
    } catch (error) {
      console.error('发送退款通知失败:', error)
    }
  }

  // 验证订单数据
  validateOrderData(orderData) {
    const required = ['userId', 'amount', 'productId', 'productName']
    
    for (const field of required) {
      if (!orderData[field]) {
        return { valid: false, message: `缺少必填字段：${field}` }
      }
    }
    
    if (orderData.amount <= 0) {
      return { valid: false, message: '订单金额必须大于0' }
    }
    
    if (orderData.amount > this.settings.maxSinglePayment) {
      return { valid: false, message: `单笔支付金额不能超过￥${this.settings.maxSinglePayment}` }
    }
    
    return { valid: true }
  }

  // 生成各种ID
  generateOrderId() {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generatePaymentId() {
    return `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateRefundId() {
    return `refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateTransactionId() {
    return `trans_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateNonceStr() {
    return Math.random().toString(36).substr(2, 15)
  }

  generatePaySign(order) {
    // 简化的签名生成
    return `sign_${order.id}_${Date.now()}`
  }

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      [this.ORDER_STATUS.PENDING]: '待支付',
      [this.ORDER_STATUS.PAID]: '已支付',
      [this.ORDER_STATUS.PROCESSING]: '处理中',
      [this.ORDER_STATUS.SHIPPING]: '发货中',
      [this.ORDER_STATUS.DELIVERED]: '已送达',
      [this.ORDER_STATUS.COMPLETED]: '已完成',
      [this.ORDER_STATUS.CANCELLED]: '已取消',
      [this.ORDER_STATUS.REFUNDED]: '已退款',
      [this.ORDER_STATUS.FAILED]: '支付失败'
    }
    
    return statusMap[status] || '未知状态'
  }

  // 获取支付方式文本
  getPaymentMethodText(method) {
    const methodMap = {
      [this.PAYMENT_METHODS.WECHAT]: '微信支付',
      [this.PAYMENT_METHODS.ALIPAY]: '支付宝',
      [this.PAYMENT_METHODS.BALANCE]: '余额支付',
      [this.PAYMENT_METHODS.BANK]: '银行卡',
      [this.PAYMENT_METHODS.CASH]: '现金',
      [this.PAYMENT_METHODS.CREDIT]: '信用支付'
    }
    
    return methodMap[method] || '未知支付方式'
  }

  // 获取支付统计
  getPaymentStats() {
    try {
      const orders = wx.getStorageSync(this.ordersKey) || []
      const payments = wx.getStorageSync(this.paymentsKey) || []
      
      const stats = {
        totalOrders: orders.length,
        totalAmount: 0,
        paidOrders: 0,
        paidAmount: 0,
        refundAmount: 0,
        byStatus: {},
        byPaymentMethod: {},
        recentOrders: []
      }
      
      // 按状态统计
      Object.values(this.ORDER_STATUS).forEach(status => {
        stats.byStatus[status] = orders.filter(order => order.status === status).length
      })
      
      // 计算金额
      orders.forEach(order => {
        stats.totalAmount += order.paymentInfo.totalAmount
        if (order.status === this.ORDER_STATUS.PAID || order.status === this.ORDER_STATUS.COMPLETED) {
          stats.paidOrders++
          stats.paidAmount += order.paymentInfo.paidAmount
        }
        stats.refundAmount += order.paymentInfo.refundAmount
      })
      
      // 按支付方式统计
      payments.forEach(payment => {
        stats.byPaymentMethod[payment.paymentMethod] = 
          (stats.byPaymentMethod[payment.paymentMethod] || 0) + 1
      })
      
      // 最近订单
      stats.recentOrders = orders
        .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
        .slice(0, 10)
      
      return stats
    } catch (error) {
      console.error('获取支付统计失败:', error)
      return {
        totalOrders: 0,
        totalAmount: 0,
        paidOrders: 0,
        paidAmount: 0,
        refundAmount: 0,
        byStatus: {},
        byPaymentMethod: {},
        recentOrders: []
      }
    }
  }

  // 清理过期订单
  async cleanupExpiredOrders() {
    try {
      const orders = wx.getStorageSync(this.ordersKey) || []
      const now = new Date()
      
      let cleanedCount = 0
      
      for (const order of orders) {
        if (order.status === this.ORDER_STATUS.PENDING && 
            now > new Date(order.expireTime)) {
          await this.updateOrderStatus(order.id, this.ORDER_STATUS.CANCELLED, '订单超时自动取消')
          cleanedCount++
        }
      }
      
      console.log(`清理过期订单: ${cleanedCount}个`)
      return cleanedCount
    } catch (error) {
      console.error('清理过期订单失败:', error)
      return 0
    }
  }

  // 保存退款记录
  async saveRefund(refund) {
    try {
      const refunds = wx.getStorageSync('refunds') || []
      const index = refunds.findIndex(r => r.id === refund.id)
      
      if (index >= 0) {
        refunds[index] = refund
      } else {
        refunds.push(refund)
      }
      
      wx.setStorageSync('refunds', refunds)
      return true
    } catch (error) {
      console.error('保存退款记录失败:', error)
      throw error
    }
  }

  // 获取退款记录
  async getRefund(refundId) {
    try {
      const refunds = wx.getStorageSync('refunds') || []
      return refunds.find(refund => refund.id === refundId)
    } catch (error) {
      console.error('获取退款记录失败:', error)
      return null
    }
  }
}

// 创建全局支付管理器实例
const paymentManager = new PaymentManager()

// 导出便捷方法
const Payment = {
  // 订单管理
  async createOrder(orderData) {
    return paymentManager.createOrder(orderData)
  },

  async getOrder(orderId) {
    return paymentManager.getOrder(orderId)
  },

  async getUserOrders(userId, filters = {}) {
    return paymentManager.getUserOrders(userId, filters)
  },

  async updateOrderStatus(orderId, status, note) {
    return paymentManager.updateOrderStatus(orderId, status, note)
  },

  // 支付处理
  async pay(orderId, paymentMethod, paymentData = {}) {
    return paymentManager.initiatePayment(orderId, paymentMethod, paymentData)
  },

  // 退款处理
  async requestRefund(orderId, amount, reason) {
    return paymentManager.requestRefund(orderId, amount, reason)
  },

  async processRefund(refundId, approved, note) {
    return paymentManager.processRefund(refundId, approved, note)
  },

  // 钱包管理
  async getWallet() {
    return paymentManager.getUserWallet()
  },

  async updateBalance(amount, description) {
    return paymentManager.updateWalletBalance(amount, description)
  },

  // 统计信息
  getStats() {
    return paymentManager.getPaymentStats()
  },

  // 工具方法
  getStatusText(status) {
    return paymentManager.getStatusText(status)
  },

  getPaymentMethodText(method) {
    return paymentManager.getPaymentMethodText(method)
  },

  // 常量
  ORDER_STATUS: paymentManager.ORDER_STATUS,
  PAYMENT_METHODS: paymentManager.PAYMENT_METHODS,
  PAYMENT_TYPES: paymentManager.PAYMENT_TYPES,

  // 清理维护
  async cleanup() {
    return paymentManager.cleanupExpiredOrders()
  }
}

module.exports = {
  PaymentManager,
  Payment,
  paymentManager
} 