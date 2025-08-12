const { Data } = require('../../utils/data-manager.js')
const { Auth } = require('../../utils/auth-manager.js')

Page({
  data: {
    merchantId: '',
    merchant: null,
    loading: true,
    
    // 状态信息
    statusConfig: {
      pending: {
        title: '审核中',
        color: '#ff9800',
        icon: '⏳',
        description: '您的申请已提交，我们正在审核中'
      },
      approved: {
        title: '审核通过',
        color: '#4caf50',
        icon: '✅',
        description: '恭喜！您的申请已通过审核'
      },
      rejected: {
        title: '审核未通过',
        color: '#f44336',
        icon: '❌',
        description: '很抱歉，您的申请未通过审核'
      }
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ merchantId: options.id })
      this.loadMerchantStatus()
    } else {
      this.loadMyApplications()
    }
  },

  // 加载商户状态
  async loadMerchantStatus() {
    try {
      const merchants = Data.getMerchants()
      const merchant = merchants.find(m => m.id === this.data.merchantId)
      
      if (merchant) {
        this.setData({
          merchant: merchant,
          loading: false
        })
      } else {
        wx.showModal({
          title: '未找到申请',
          content: '未找到该申请记录，可能已被删除',
          showCancel: false,
          success: () => {
            wx.navigateBack()
          }
        })
      }

    } catch (error) {
      console.error('加载商户状态失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
    }
  },

  // 加载我的申请
  async loadMyApplications() {
    try {
      const user = Auth.getCurrentUser()
      if (!user.isLoggedIn) {
        wx.showModal({
          title: '需要登录',
          content: '请先登录查看申请状态',
          success: (res) => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/profile/profile'
              })
            } else {
              wx.navigateBack()
            }
          }
        })
        return
      }

      const merchants = Data.getMerchants()
      const myApplications = merchants.filter(m => 
        m.applicant && m.applicant.nickName === user.userInfo.nickName
      )

      if (myApplications.length > 0) {
        // 显示最新的申请
        const latestApplication = myApplications.sort((a, b) => 
          new Date(b.createTime) - new Date(a.createTime)
        )[0]
        
        this.setData({
          merchant: latestApplication,
          merchantId: latestApplication.id,
          loading: false
        })
      } else {
        wx.showModal({
          title: '暂无申请',
          content: '您还没有提交过商户入驻申请，是否前往申请？',
          confirmText: '去申请',
          success: (res) => {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/merchant-register/merchant-register'
              })
            } else {
              wx.navigateBack()
            }
          }
        })
      }

    } catch (error) {
      console.error('加载我的申请失败:', error)
      this.setData({ loading: false })
    }
  },

  // 复制申请编号
  copyMerchantId() {
    wx.setClipboardData({
      data: this.data.merchantId,
      success: () => {
        wx.showToast({
          title: '申请编号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 联系客服
  contactService() {
    wx.showActionSheet({
      itemList: ['拨打客服电话', '复制客服微信'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({
            phoneNumber: '400-888-8888'
          })
        } else if (res.tapIndex === 1) {
          wx.setClipboardData({
            data: 'tea-service-001',
            success: () => {
              wx.showToast({
                title: '客服微信已复制',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },

  // 重新申请
  reapply() {
    wx.showModal({
      title: '重新申请',
      content: '是否重新提交商户入驻申请？之前的申请信息可以保留。',
      confirmText: '重新申请',
      success: (res) => {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/merchant-register/merchant-register'
          })
        }
      }
    })
  },

  // 查看详情
  viewDetails() {
    if (!this.data.merchant) return
    
    const merchant = this.data.merchant
    let content = `商户名称：${merchant.name}\n`
    content += `经营类别：${merchant.category}\n`
    content += `联系人：${merchant.contact}\n`
    content += `联系电话：${merchant.phone}\n`
    content += `所在地区：${merchant.province} ${merchant.city || ''}\n`
    content += `详细地址：${merchant.address}\n`
    
    if (merchant.approveReason) {
      content += `\n审核说明：${merchant.approveReason}`
    }

    wx.showModal({
      title: '申请详情',
      content: content,
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 预览图片
  previewImages(e) {
    const { type } = e.currentTarget.dataset
    const merchant = this.data.merchant
    
    let urls = []
    
    switch (type) {
      case 'logo':
        if (merchant.images.logo) {
          urls = [merchant.images.logo]
        }
        break
      case 'storefront':
        urls = merchant.images.storefront || []
        break
      case 'license':
        if (merchant.images.license) {
          urls = [merchant.images.license]
        }
        break
    }

    if (urls.length > 0) {
      wx.previewImage({
        urls: urls,
        current: urls[0]
      })
    }
  },

  // 分享申请
  onShareAppMessage() {
    return {
      title: '我正在申请入驻茶叶批发平台',
      path: `/pages/merchant-status/merchant-status?id=${this.data.merchantId}`,
      imageUrl: this.data.merchant?.images?.logo || '/images/share-merchant.png'
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadMerchantStatus()
    wx.stopPullDownRefresh()
  }
}) 