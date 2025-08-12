Page({
  data: {
    id: null,
    clearanceInfo: null,
    countdownTimer: null,
    countdownText: '',
    isUnlocked: false,
    merchantInfo: {
      name: '杭州茶叶批发商',
      phone: '138****8888',
      avatar: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=商户',
      rating: 4.8,
      clearanceCount: 15,
      joinTime: '2023-01-15'
    },
    historyClearance: [] // 清空示例数据，等待真实数据
  },

  onLoad(options) {
    const { id } = options
    this.setData({ id })
    this.loadClearanceDetail(id)
    this.startCountdown()
  },

  onUnload() {
    // 清除定时器
    if (this.data.countdownTimer) {
      clearInterval(this.data.countdownTimer)
    }
  },

  // 加载商品详情
  loadClearanceDetail(id) {
    // 清空示例数据，等待真实数据
    this.setData({ clearanceInfo: null })
  },

  // 开始倒计时
  startCountdown() {
    const timer = setInterval(() => {
      this.updateCountdown()
    }, 1000)
    
    this.setData({ countdownTimer: timer })
    this.updateCountdown()
  },

  // 更新倒计时
  updateCountdown() {
    const { clearanceInfo } = this.data
    if (!clearanceInfo) return

    const now = new Date().getTime()
    const endTime = new Date(clearanceInfo.endTime).getTime()
    const diff = endTime - now

    if (diff <= 0) {
      this.setData({ countdownText: '已结束' })
      clearInterval(this.data.countdownTimer)
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    let countdownText = ''
    if (days > 0) {
      countdownText = `${days}天${hours}小时${minutes}分`
    } else if (hours > 0) {
      countdownText = `${hours}小时${minutes}分${seconds}秒`
    } else {
      countdownText = `${minutes}分${seconds}秒`
    }

    this.setData({ countdownText })
  },

  // 预览图片
  previewImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data.clearanceInfo
    
    wx.previewImage({
      current: images[index],
      urls: images
    })
  },

  // 解锁联系方式
  unlockContact() {
    if (this.data.isUnlocked) return

    wx.showModal({
      title: '解锁联系方式',
      content: '确定要解锁商户联系方式吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ isUnlocked: true })
          wx.showToast({
            title: '解锁成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 拨打电话
  callMerchant() {
    if (!this.data.isUnlocked) {
      this.unlockContact()
      return
    }

    wx.makePhoneCall({
      phoneNumber: '13888888888',
      success: () => {
        console.log('拨打电话成功')
      },
      fail: () => {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'none'
        })
      }
    })
  },

  // 复制微信号
  copyWechat() {
    if (!this.data.isUnlocked) {
      this.unlockContact()
      return
    }

    wx.setClipboardData({
      data: 'tea_merchant_888',
      success: () => {
        wx.showToast({
          title: '微信号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 分享商品
  onShareAppMessage() {
    const { clearanceInfo } = this.data
    return {
      title: `${clearanceInfo.name} - 特价清仓中！`,
      path: `/pages/clearance-detail/clearance-detail?id=${this.data.id}`,
      imageUrl: clearanceInfo.images[0]
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { clearanceInfo } = this.data
    return {
      title: `${clearanceInfo.name} - 特价清仓中！`,
      imageUrl: clearanceInfo.images[0]
    }
  }
}) 