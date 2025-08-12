Page({
  data: {
    activeTab: 0, // 0: 我的求购, 1: 收藏的求购
    inquiryList: [],
    favoriteList: [],
    loading: false,
    
    // 筛选条件
    filterStatus: 'all', // all, active, expired, closed
    filterCategory: 'all',
    
    // 分页
    page: 1,
    hasMore: true
  },

  onLoad() {
    this.loadMyInquiries()
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshData()
  },

  // 切换标签页
  switchTab(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      activeTab: index
    })
    
    if (index === 0) {
      this.loadMyInquiries()
    } else {
      this.loadFavoriteInquiries()
    }
  },

  // 加载我的求购信息
  loadMyInquiries() {
    this.setData({ loading: true })
    
    // 清空示例数据，等待真实数据
    setTimeout(() => {
      this.setData({
        inquiryList: [],
        loading: false
      })
    }, 500)
  },

  // 加载收藏的求购信息
  loadFavoriteInquiries() {
    this.setData({ loading: true })
    
    // TODO: 从服务器获取真实的收藏求购信息数据
    const mockFavorites = []
    
    setTimeout(() => {
      this.setData({
        favoriteList: mockFavorites,
        loading: false
      })
    }, 500)
  },

  // 刷新数据
  refreshData() {
    if (this.data.activeTab === 0) {
      this.loadMyInquiries()
    } else {
      this.loadFavoriteInquiries()
    }
  },

  // 筛选状态
  filterByStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({
      filterStatus: status
    })
    this.applyFilters()
  },

  // 筛选分类
  filterByCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      filterCategory: category
    })
    this.applyFilters()
  },

  // 应用筛选条件
  applyFilters() {
    // 这里实现筛选逻辑
    wx.showToast({
      title: '筛选功能开发中',
      icon: 'none'
    })
  },

  // 查看求购详情
  viewInquiryDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/inquiry-detail/inquiry-detail?id=${id}`
    })
  },

  // 编辑求购信息
  editInquiry(e) {
    const inquiryId = e.currentTarget.dataset.id
    const inquiry = this.data.inquiryList.find(item => item.id === inquiryId)
    
    if (!inquiry) {
      wx.showToast({
        title: '询价信息不存在',
        icon: 'none'
      })
      return
    }

    // 跳转到编辑页面
    wx.navigateTo({
      url: `/pages/publish-inquiry/publish-inquiry?mode=edit&id=${inquiryId}&data=${encodeURIComponent(JSON.stringify(inquiry))}`
    })
  },

  // 关闭求购信息
  closeInquiry(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认关闭',
      content: '确定要关闭这条求购信息吗？关闭后将无法恢复。',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '求购信息已关闭',
            icon: 'success'
          })
          // 更新列表状态
          this.refreshData()
        }
      }
    })
  },

  // 删除求购信息
  deleteInquiry(e) {
    const inquiryId = e.currentTarget.dataset.id
    const inquiry = this.data.inquiryList.find(item => item.id === inquiryId)
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除询价"${inquiry.title}"吗？`,
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          const updatedInquiries = this.data.inquiryList.filter(item => item.id !== inquiryId)
          
          this.setData({
            inquiryList: updatedInquiries
          })

          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 取消收藏
  unfavoriteInquiry(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认取消收藏',
      content: '确定要取消收藏这条求购信息吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          })
          // 更新收藏列表
          this.loadFavoriteInquiries()
        }
      }
    })
  },

  // 发布新求购
  publishNewInquiry() {
    wx.navigateTo({
      url: '/pages/inquiry/inquiry'
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMore()
    }
  },

  // 加载更多
  loadMore() {
    wx.showToast({
      title: '加载更多功能开发中',
      icon: 'none'
    })
  },

  // 筛选功能 - 修复实现
  showFilter() {
    const filterOptions = [
      '全部状态',
      '待响应',
      '已响应', 
      '已完成',
      '已取消'
    ]

    wx.showActionSheet({
      itemList: filterOptions,
      success: (res) => {
        const selectedFilter = filterOptions[res.tapIndex]
        this.applyFilter(selectedFilter)
      }
    })
  },

  // 应用筛选
  applyFilter(filterType) {
    const allInquiries = this.data.inquiryList || this.data.inquiryList
    
    let filteredInquiries = []
    
    switch (filterType) {
      case '全部状态':
        filteredInquiries = allInquiries
        break
      case '待响应':
        filteredInquiries = allInquiries.filter(inquiry => 
          inquiry.status === 'pending' || inquiry.quoteCount === 0
        )
        break
      case '已响应':
        filteredInquiries = allInquiries.filter(inquiry => 
          inquiry.status === 'responded' || inquiry.quoteCount > 0
        )
        break
      case '已完成':
        filteredInquiries = allInquiries.filter(inquiry => 
          inquiry.status === 'completed'
        )
        break
      case '已取消':
        filteredInquiries = allInquiries.filter(inquiry => 
          inquiry.status === 'cancelled'
        )
        break
      default:
        filteredInquiries = allInquiries
    }

    this.setData({
      inquiryList: filteredInquiries,
      currentFilter: filterType,
      allInquiries: allInquiries // 保存原始数据
    })

    wx.showToast({
      title: `${filterType}: ${filteredInquiries.length}条`,
      icon: 'none'
    })
  },

  // 刷新询价状态
  refreshInquiries() {
    wx.showLoading({
      title: '刷新中...'
    })
    
    // 模拟API请求刷新数据
    setTimeout(() => {
      // 这里应该调用实际的API获取最新数据
      const updatedInquiries = this.data.inquiryList.map(inquiry => ({
        ...inquiry,
        updateTime: new Date().toISOString(),
        // 随机更新一些状态用于演示
        quoteCount: inquiry.quoteCount + Math.floor(Math.random() * 2)
      }))

      this.setData({
        inquiryList: updatedInquiries,
        allInquiries: updatedInquiries
      })

      wx.hideLoading()
      wx.showToast({
        title: '刷新完成',
        icon: 'success'
      })
    }, 1000)
  },

  // 批量操作
  startBatchOperation() {
    this.setData({
      batchMode: true,
      selectedInquiries: []
    })
    
    wx.showToast({
      title: '批量操作模式',
      icon: 'none'
    })
  },

  // 退出批量操作
  exitBatchMode() {
    this.setData({
      batchMode: false,
      selectedInquiries: []
    })
  },

  // 选择询价
  selectInquiry(e) {
    if (!this.data.batchMode) return
    
    const inquiryId = e.currentTarget.dataset.id
    const selectedInquiries = this.data.selectedInquiries || []
    
    const index = selectedInquiries.indexOf(inquiryId)
    if (index > -1) {
      selectedInquiries.splice(index, 1)
    } else {
      selectedInquiries.push(inquiryId)
    }
    
    this.setData({
      selectedInquiries: selectedInquiries
    })
  },

  // 批量删除
  batchDelete() {
    const selectedCount = this.data.selectedInquiries.length
    if (selectedCount === 0) {
      wx.showToast({
        title: '请选择要删除的询价',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '批量删除',
      content: `确定要删除选中的${selectedCount}条询价吗？`,
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          const selectedIds = this.data.selectedInquiries
          const updatedInquiries = this.data.inquiryList.filter(item => 
            !selectedIds.includes(item.id)
          )
          const updatedAllInquiries = this.data.allInquiries.filter(item => 
            !selectedIds.includes(item.id)
          )
          
          this.setData({
            inquiryList: updatedInquiries,
            allInquiries: updatedAllInquiries,
            batchMode: false,
            selectedInquiries: []
          })

          wx.showToast({
            title: `删除${selectedCount}条询价`,
            icon: 'success'
          })
        }
      }
    })
  }
}) 