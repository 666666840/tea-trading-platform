// 内容管理页面
const { contentAPIManager } = require('../../utils/content-api.js')

Page({
  data: {
    // 页面状态
    loading: false,
    activeTab: 'list', // list, create, stats, settings
    editingContent: null, // 当前编辑的内容ID
    
    // 内容列表
    contents: [],
    selectedContents: [],
    filters: {
      type: 'all',
      status: 'all',
      priority: 'all',
      keyword: ''
    },
    
    // 分页
    pagination: {
      page: 1,
      per_page: 20,
      total: 0,
      pages: 0
    },
    
    // 内容表单
    contentForm: {
      title: '',
      content: '',
      summary: '',
      type: 'recommend',
      typeIndex: 0,
      priority: 'normal',
      priorityIndex: 1,
      author: '',
      tags: [],
      category: '',
      image_url: '',
      video_url: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      is_featured: false,
      is_top: false
    },
    
    // 新标签输入
    newTag: '',
    
    // 枚举选项
    contentTypes: [],
    contentStatuses: [],
    contentPriorities: [],
    
    // 统计信息
    statistics: {
      total_count: 0,
      published_count: 0,
      pending_count: 0,
      rejected_count: 0,
      type_statistics: {},
      average_quality_score: 0
    },
    
    // 类型统计列表
    typeStatsList: [],
    
    // 系统设置
    settings: {
      auto_audit: true,
      quality_threshold: 70,
      max_content_per_day: 10,
      enable_auto_publish: false
    }
  },

  onLoad() {
    console.log('内容管理页面加载')
    this.loadEnums()
    this.loadContents()
    this.loadStatistics()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadContents()
  },

  // ==================== 页面导航 ====================
  
  goBack() {
    wx.navigateBack()
  },

  // ==================== 标签页切换 ====================
  
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    
    // 根据标签页加载相应数据
    if (tab === 'stats') {
      this.loadStatistics()
    } else if (tab === 'create' && this.data.editingContent) {
      // 如果正在编辑内容，切换到创建标签页时重置表单
      this.resetForm()
    }
  },

  // ==================== 内容列表管理 ====================
  
  async loadContents() {
    this.setData({ loading: true })
    
    try {
      const { page, per_page } = this.data.pagination
      const { filters } = this.data
      
      // 构建查询参数
      const params = {
        page,
        per_page,
        ...filters
      }
      
      // 移除 'all' 值的参数
      Object.keys(params).forEach(key => {
        if (params[key] === 'all') {
          delete params[key]
        }
      })
      
      const response = await this.requestAPI('/api/content-management/contents', 'GET', params)
      
      if (response.status === 'success') {
        this.setData({
          contents: response.data,
          'pagination.total': response.pagination.total,
          'pagination.pages': response.pagination.pages,
          loading: false
        })
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        })
        this.setData({ loading: false })
      }
    } catch (error) {
      console.error('加载内容失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'error'
      })
      this.setData({ loading: false })
    }
  },

  // 筛选内容
  onFilterChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`filters.${field}`]: value,
      'pagination.page': 1 // 重置页码
    })
    
    this.loadContents()
  },

  // 搜索内容
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({
      'filters.keyword': keyword,
      'pagination.page': 1
    })
  },

  onSearchConfirm() {
    this.loadContents()
  },

  // 分页
  onPageChange(e) {
    const page = e.currentTarget.dataset.page
    this.setData({
      'pagination.page': page
    })
    this.loadContents()
  },

  // 选择内容
  onContentSelect(e) {
    const { id } = e.currentTarget.dataset
    const { selectedContents } = this.data
    
    const index = selectedContents.indexOf(id)
    if (index > -1) {
      selectedContents.splice(index, 1)
    } else {
      selectedContents.push(id)
    }
    
    this.setData({ selectedContents })
  },

  // 全选/取消全选
  onSelectAll() {
    const { contents, selectedContents } = this.data
    
    if (selectedContents.length === contents.length) {
      // 取消全选
      this.setData({ selectedContents: [] })
    } else {
      // 全选
      const allIds = contents.map(item => item.id)
      this.setData({ selectedContents: allIds })
    }
  },

  // 查看内容
  viewContent(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/content-detail/content-detail?id=${id}`
    })
  },

  // 编辑内容
  editContent(e) {
    const { id } = e.currentTarget.dataset
    const content = this.data.contents.find(item => item.id === id)
    
    if (content) {
      // 填充表单数据
      const contentForm = {
        title: content.title,
        content: content.content,
        summary: content.summary,
        type: content.type,
        typeIndex: this.data.contentTypes.findIndex(t => t.value === content.type),
        priority: content.priority,
        priorityIndex: this.data.contentPriorities.findIndex(p => p.value === content.priority),
        author: content.author,
        tags: content.tags || [],
        category: content.category,
        image_url: content.image_url,
        video_url: content.video_url,
        seo_title: content.seo_title,
        seo_description: content.seo_description,
        seo_keywords: content.seo_keywords,
        is_featured: content.is_featured,
        is_top: content.is_top
      }
      
      this.setData({
        contentForm,
        editingContent: id,
        activeTab: 'create'
      })
    }
  },

  // 发布内容
  async publishContent(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认发布',
      content: '确定要发布这条内容吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const response = await this.requestAPI(`/api/content-management/contents/${id}/publish`, 'POST')
            
            if (response.status === 'success') {
              wx.showToast({
                title: '发布成功',
                icon: 'success'
              })
              this.loadContents()
            } else {
              wx.showToast({
                title: response.message || '发布失败',
                icon: 'error'
              })
            }
          } catch (error) {
            console.error('发布失败:', error)
            wx.showToast({
              title: '发布失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 审核通过内容
  async approveContent(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认审核',
      content: '确定要通过这条内容的审核吗？',
      success: async (res) => {
        if (res.confirm) {
          try {
            const response = await this.requestAPI(`/api/content-management/contents/${id}/approve`, 'POST', {
              auditor: '管理员',
              notes: '审核通过'
            })
            
            if (response.status === 'success') {
              wx.showToast({
                title: '审核通过',
                icon: 'success'
              })
              this.loadContents()
            } else {
              wx.showToast({
                title: response.message || '审核失败',
                icon: 'error'
              })
            }
          } catch (error) {
            console.error('审核失败:', error)
            wx.showToast({
              title: '审核失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 审核拒绝内容
  async rejectContent(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认拒绝',
      content: '确定要拒绝这条内容吗？',
      editable: true,
      placeholderText: '请输入拒绝原因',
      success: async (res) => {
        if (res.confirm) {
          try {
            const response = await this.requestAPI(`/api/content-management/contents/${id}/reject`, 'POST', {
              auditor: '管理员',
              notes: res.content || '内容不符合要求'
            })
            
            if (response.status === 'success') {
              wx.showToast({
                title: '已拒绝',
                icon: 'success'
              })
              this.loadContents()
            } else {
              wx.showToast({
                title: response.message || '操作失败',
                icon: 'error'
              })
            }
          } catch (error) {
            console.error('拒绝失败:', error)
            wx.showToast({
              title: '操作失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 删除内容
  deleteContent(e) {
    const { id } = e.currentTarget.dataset
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条内容吗？删除后无法恢复。',
      success: async (res) => {
        if (res.confirm) {
          try {
            const response = await this.requestAPI(`/api/content-management/contents/${id}`, 'DELETE')
            
            if (response.status === 'success') {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              this.loadContents()
            } else {
              wx.showToast({
                title: response.message || '删除失败',
                icon: 'error'
              })
            }
          } catch (error) {
            console.error('删除失败:', error)
            wx.showToast({
              title: '删除失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 切换推荐状态
  async toggleFeatured(e) {
    const { id } = e.currentTarget.dataset
    
    try {
      const response = await this.requestAPI(`/api/content-management/contents/${id}/toggle-featured`, 'POST')
      
      if (response.status === 'success') {
        wx.showToast({
          title: response.data.is_featured ? '已设为推荐' : '已取消推荐',
          icon: 'success'
        })
        this.loadContents()
      } else {
        wx.showToast({
          title: response.message || '操作失败',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('切换推荐状态失败:', error)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  },

  // 切换置顶状态
  async toggleTop(e) {
    const { id } = e.currentTarget.dataset
    
    try {
      const response = await this.requestAPI(`/api/content-management/contents/${id}/toggle-top`, 'POST')
      
      if (response.status === 'success') {
        wx.showToast({
          title: response.data.is_top ? '已设为置顶' : '已取消置顶',
          icon: 'success'
        })
        this.loadContents()
      } else {
        wx.showToast({
          title: response.message || '操作失败',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('切换置顶状态失败:', error)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  },

  // 批量发布
  async batchPublish() {
    const { selectedContents } = this.data
    
    if (selectedContents.length === 0) {
      wx.showToast({
        title: '请选择要发布的内容',
        icon: 'none'
      })
      return
    }
    
    wx.showModal({
      title: '批量发布',
      content: `确定要发布选中的 ${selectedContents.length} 条内容吗？`,
      success: async (res) => {
        if (res.confirm) {
          try {
            const response = await this.requestAPI('/api/content-management/contents/batch-publish', 'POST', {
              content_ids: selectedContents
            })
            
            if (response.status === 'success') {
              wx.showToast({
                title: `批量发布完成，成功: ${response.data.success_count}，失败: ${response.data.failed_count}`,
                icon: 'success',
                duration: 3000
              })
              this.setData({ selectedContents: [] })
              this.loadContents()
            } else {
              wx.showToast({
                title: response.message || '批量发布失败',
                icon: 'error'
              })
            }
          } catch (error) {
            console.error('批量发布失败:', error)
            wx.showToast({
              title: '批量发布失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // 批量删除
  batchDelete() {
    const { selectedContents } = this.data
    
    if (selectedContents.length === 0) {
      wx.showToast({
        title: '请选择要删除的内容',
        icon: 'none'
      })
      return
    }
    
    wx.showModal({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedContents.length} 条内容吗？删除后无法恢复。`,
      success: async (res) => {
        if (res.confirm) {
          try {
            const response = await this.requestAPI('/api/content-management/contents/batch-delete', 'POST', {
              content_ids: selectedContents
            })
            
            if (response.status === 'success') {
              wx.showToast({
                title: `批量删除完成，成功: ${response.data.success_count}，失败: ${response.data.failed_count}`,
                icon: 'success',
                duration: 3000
              })
              this.setData({ selectedContents: [] })
              this.loadContents()
            } else {
              wx.showToast({
                title: response.message || '批量删除失败',
                icon: 'error'
              })
            }
          } catch (error) {
            console.error('批量删除失败:', error)
            wx.showToast({
              title: '批量删除失败',
              icon: 'error'
            })
          }
        }
      }
    })
  },

  // ==================== 表单管理 ====================
  
  // 重置表单
  resetForm() {
    const defaultForm = {
      title: '',
      content: '',
      summary: '',
      type: 'recommend',
      typeIndex: 0,
      priority: 'normal',
      priorityIndex: 1,
      author: '',
      tags: [],
      category: '',
      image_url: '',
      video_url: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      is_featured: false,
      is_top: false
    }
    
    this.setData({
      contentForm: defaultForm,
      editingContent: null,
      newTag: ''
    })
  },

  // 表单输入
  onFormInput(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`contentForm.${field}`]: value
    })
  },

  // 表单选择器
  onFormPicker(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    if (field === 'type') {
      this.setData({
        'contentForm.typeIndex': value,
        'contentForm.type': this.data.contentTypes[value].value
      })
    } else if (field === 'priority') {
      this.setData({
        'contentForm.priorityIndex': value,
        'contentForm.priority': this.data.contentPriorities[value].value
      })
    }
  },

  // 表单开关
  onFormSwitch(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`contentForm.${field}`]: value
    })
  },

  // 添加标签
  addTag(e) {
    const tag = e.detail.value || this.data.newTag
    if (tag && tag.trim()) {
      const tags = [...this.data.contentForm.tags]
      if (!tags.includes(tag.trim())) {
        tags.push(tag.trim())
        this.setData({
          'contentForm.tags': tags,
          newTag: ''
        })
      }
    }
  },

  // 移除标签
  removeTag(e) {
    const { index } = e.currentTarget.dataset
    const tags = [...this.data.contentForm.tags]
    tags.splice(index, 1)
    this.setData({
      'contentForm.tags': tags
    })
  },

  // 提交表单
  async submitForm() {
    const { contentForm, editingContent } = this.data
    
    // 验证必填字段
    if (!contentForm.title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }
    
    if (!contentForm.content.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    
    try {
      let response
      
      if (editingContent) {
        // 更新内容
        response = await this.requestAPI(`/api/content-management/contents/${editingContent}`, 'PUT', contentForm)
      } else {
        // 创建内容
        response = await this.requestAPI('/api/content-management/contents', 'POST', contentForm)
      }
      
      if (response.status === 'success') {
        wx.showToast({
          title: editingContent ? '更新成功' : '创建成功',
          icon: 'success'
        })
        
        this.resetForm()
        this.setData({ activeTab: 'list' })
        this.loadContents()
      } else {
        wx.showToast({
          title: response.message || '操作失败',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('提交失败:', error)
      wx.showToast({
        title: '操作失败',
        icon: 'error'
      })
    }
  },

  // ==================== 统计信息 ====================
  
  async loadStatistics() {
    try {
      const response = await this.requestAPI('/api/content-management/statistics', 'GET')
      
      if (response.status === 'success') {
        const statistics = response.data
        
        // 处理类型统计列表
        const typeStatsList = Object.keys(statistics.type_statistics).map(type => ({
          type,
          label: this.getTypeLabel(type),
          count: statistics.type_statistics[type]
        }))
        
        this.setData({
          statistics,
          typeStatsList
        })
      }
    } catch (error) {
      console.error('加载统计信息失败:', error)
    }
  },

  // ==================== 系统设置 ====================
  
  // 设置变更
  onSettingChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    this.setData({
      [`settings.${field}`]: value
    })
  },

  // 保存设置
  async saveSettings() {
    try {
      const response = await this.requestAPI('/api/content-management/settings', 'PUT', this.data.settings)
      
      if (response.status === 'success') {
        wx.showToast({
          title: '设置保存成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: response.message || '保存失败',
          icon: 'error'
        })
      }
    } catch (error) {
      console.error('保存设置失败:', error)
      wx.showToast({
        title: '保存失败',
        icon: 'error'
      })
    }
  },

  // ==================== 工具方法 ====================
  
  // 加载枚举值
  async loadEnums() {
    try {
      const [typesRes, statusesRes, prioritiesRes] = await Promise.all([
        this.requestAPI('/api/content-management/enums/content-types', 'GET'),
        this.requestAPI('/api/content-management/enums/content-statuses', 'GET'),
        this.requestAPI('/api/content-management/enums/content-priorities', 'GET')
      ])
      
      if (typesRes.status === 'success') {
        this.setData({ contentTypes: typesRes.data })
      }
      
      if (statusesRes.status === 'success') {
        this.setData({ contentStatuses: statusesRes.data })
      }
      
      if (prioritiesRes.status === 'success') {
        this.setData({ contentPriorities: prioritiesRes.data })
      }
    } catch (error) {
      console.error('加载枚举值失败:', error)
    }
  },

  // API请求封装
  async requestAPI(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `http://localhost:3000${url}`,
        method,
        data,
        header: {
          'Content-Type': 'application/json'
        },
        success: (res) => {
          resolve(res.data)
        },
        fail: (error) => {
          console.error('API请求失败:', error)
          reject(error)
        }
      })
    })
  },

  // 格式化时间
  formatTime(timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  },

  // 获取类型标签
  getTypeLabel(type) {
    const typeMap = {
      'recommend': '推荐',
      'news': '资讯',
      'art': '茶艺',
      'hot': '热点',
      'guide': '指南',
      'review': '评测'
    }
    return typeMap[type] || type
  },

  // 获取状态样式类
  getStatusClass(status) {
    const statusMap = {
      'draft': 'status-draft',
      'pending': 'status-pending',
      'approved': 'status-approved',
      'published': 'status-published',
      'rejected': 'status-rejected',
      'archived': 'status-archived'
    }
    return statusMap[status] || 'status-default'
  },

  // 获取类型样式类
  getTypeClass(type) {
    const typeMap = {
      'recommend': 'type-recommend',
      'news': 'type-news',
      'art': 'type-art',
      'hot': 'type-hot',
      'guide': 'type-guide',
      'review': 'type-review'
    }
    return typeMap[type] || 'type-default'
  },

  // 获取优先级样式类
  getPriorityClass(priority) {
    const priorityMap = {
      'low': 'priority-low',
      'normal': 'priority-normal',
      'high': 'priority-high',
      'urgent': 'priority-urgent'
    }
    return priorityMap[priority] || 'priority-default'
  },

  // 手动添加内容（转载功能）
  addManualContent: function() {
    const that = this;
    wx.showModal({
      title: '添加转载内容',
      content: '请输入要转载的内容信息',
      showCancel: true,
      cancelText: '取消',
      confirmText: '添加',
      success: function(res) {
        if (res.confirm) {
          that.showAddContentForm();
        }
      }
    });
  },

  // 显示添加内容表单
  showAddContentForm: function() {
    const that = this;
    wx.showActionSheet({
      itemList: ['推荐内容', '茶讯新闻', '茶艺教程', '热点话题'],
      success: function(res) {
        const types = ['recommend', 'news', 'art', 'hot'];
        const typeNames = ['推荐内容', '茶讯新闻', '茶艺教程', '热点话题'];
        const selectedType = types[res.tapIndex];
        const selectedTypeName = typeNames[res.tapIndex];
        
        that.showContentInputForm(selectedType, selectedTypeName);
      }
    });
  },

  // 显示内容输入表单
  showContentInputForm: function(type, typeName) {
    const that = this;
    wx.showModal({
      title: `添加${typeName}`,
      content: '请输入内容标题',
      editable: true,
      placeholderText: '请输入标题',
      success: function(res) {
        if (res.confirm && res.content) {
          const title = res.content;
          that.showContentDetailInput(title, type, typeName);
        }
      }
    });
  },

  // 显示内容详情输入
  showContentDetailInput: function(title, type, typeName) {
    const that = this;
    wx.showModal({
      title: `添加${typeName}详情`,
      content: '请输入内容详情',
      editable: true,
      placeholderText: '请输入详细内容描述',
      success: function(res) {
        if (res.confirm && res.content) {
          const content = res.content;
          that.showSourceInput(title, content, type, typeName);
        }
      }
    });
  },

  // 显示来源输入
  showSourceInput: function(title, content, type, typeName) {
    const that = this;
    wx.showModal({
      title: '添加来源信息',
      content: '请输入转载来源',
      editable: true,
      placeholderText: '例如：中茶官网、茶叶协会等',
      success: function(res) {
        if (res.confirm) {
          const source = res.content || '转载内容';
          that.saveManualContent(title, content, type, source);
        }
      }
    });
  },

  // 保存手动添加的内容
  saveManualContent: function(title, content, type, source) {
    const that = this;
    const contentData = {
      title: title,
      content: content,
      type: type,
      author: source,
      tag: '转载内容',
      created_at: new Date().toISOString()
    };

    // 保存到本地存储
    let localContents = wx.getStorageSync('localContents') || [];
    localContents.push(contentData);
    wx.setStorageSync('localContents', JSON.stringify(localContents));

    wx.showToast({
      title: '内容添加成功',
      icon: 'success',
      duration: 2000
    });

    // 刷新内容列表
    that.loadContent();
  },

  // 加载本地内容
  loadLocalContent: function() {
    const localContents = wx.getStorageSync('localContents');
    if (localContents) {
      try {
        const contents = JSON.parse(localContents);
        return contents;
      } catch (e) {
        console.error('解析本地内容失败:', e);
        return [];
      }
    }
    return [];
  },

  // 获取推荐转载来源
  getRecommendedSources: function() {
    return {
      recommend: [
        '中茶官网 - https://www.chinatea.com',
        '大益茶官网 - https://www.dayitea.com',
        '八马茶业官网 - https://www.bamatea.com',
        '天福茗茶官网 - https://www.tenfu.com'
      ],
      news: [
        '中国茶叶流通协会 - http://www.ctma.com.cn',
        '中华全国供销合作总社 - http://www.chinacoop.gov.cn',
        '农业农村部 - http://www.moa.gov.cn'
      ],
      art: [
        '中国茶艺网 - http://www.chayiwang.com',
        '茶艺师联盟 - http://www.chayishilianmeng.com',
        '茶文化网 - http://www.chawenhua.com'
      ],
      hot: [
        '茶叶行业资讯 - http://www.chaye.com',
        '茶友网 - http://www.chayou.com',
        '茶叶网 - http://www.chaye.com.cn'
      ]
    };
  },

  // 显示推荐来源
  showRecommendedSources: function() {
    const sources = this.getRecommendedSources();
    const that = this;
    
    wx.showActionSheet({
      itemList: ['推荐内容来源', '茶讯新闻来源', '茶艺教程来源', '热点话题来源'],
      success: function(res) {
        const sourceTypes = ['recommend', 'news', 'art', 'hot'];
        const selectedType = sourceTypes[res.tapIndex];
        const sourceList = sources[selectedType];
        
        let sourceText = '推荐转载来源：\n\n';
        sourceList.forEach((source, index) => {
          sourceText += `${index + 1}. ${source}\n`;
        });
        
        wx.showModal({
          title: '推荐转载来源',
          content: sourceText,
          showCancel: false,
          confirmText: '知道了'
        });
      }
    });
  },

  // 查看本地内容
  viewLocalContent: function() {
    const localContents = this.loadLocalContent();
    const that = this;
    
    if (localContents.length === 0) {
      wx.showModal({
        title: '本地内容',
        content: '暂无本地转载内容',
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }
    
    let contentList = '本地转载内容：\n\n';
    localContents.forEach((content, index) => {
      const date = new Date(content.created_at).toLocaleDateString();
      contentList += `${index + 1}. ${content.title}\n`;
      contentList += `   类型: ${content.type}\n`;
      contentList += `   来源: ${content.author}\n`;
      contentList += `   日期: ${date}\n\n`;
    });
    
    wx.showModal({
      title: '本地转载内容',
      content: contentList,
      showCancel: true,
      cancelText: '关闭',
      confirmText: '管理内容',
      success: function(res) {
        if (res.confirm) {
          that.manageLocalContent();
        }
      }
    });
  },

  // 管理本地内容
  manageLocalContent: function() {
    const that = this;
    wx.showActionSheet({
      itemList: ['导出内容', '清空所有内容', '编辑内容'],
      success: function(res) {
        switch(res.tapIndex) {
          case 0:
            that.exportLocalContent();
            break;
          case 1:
            that.clearLocalContent();
            break;
          case 2:
            that.editLocalContent();
            break;
        }
      }
    });
  },

  // 导出本地内容
  exportLocalContent: function() {
    const localContents = this.loadLocalContent();
    if (localContents.length === 0) {
      wx.showToast({
        title: '暂无内容可导出',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '导出成功',
      content: `已导出 ${localContents.length} 条本地内容`,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 清空本地内容
  clearLocalContent: function() {
    const that = this;
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有本地转载内容吗？此操作不可恢复。',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('localContents');
          wx.showToast({
            title: '已清空本地内容',
            icon: 'success'
          });
        }
      }
    });
  },

  // 编辑本地内容
  editLocalContent: function() {
    const localContents = this.loadLocalContent();
    if (localContents.length === 0) {
      wx.showToast({
        title: '暂无内容可编辑',
        icon: 'none'
      });
      return;
    }
    
    const contentTitles = localContents.map(content => content.title);
    const that = this;
    
    wx.showActionSheet({
      itemList: contentTitles,
      success: function(res) {
        const selectedContent = localContents[res.tapIndex];
        that.editSelectedLocalContent(selectedContent, res.tapIndex);
      }
    });
  },

  // 编辑选中的本地内容
  editSelectedLocalContent: function(content, index) {
    const that = this;
    wx.showActionSheet({
      itemList: ['编辑标题', '编辑内容', '编辑来源', '删除内容'],
      success: function(res) {
        switch(res.tapIndex) {
          case 0:
            that.editLocalContentTitle(content, index);
            break;
          case 1:
            that.editLocalContentDetail(content, index);
            break;
          case 2:
            that.editLocalContentSource(content, index);
            break;
          case 3:
            that.deleteLocalContent(index);
            break;
        }
      }
    });
  },

  // 编辑本地内容标题
  editLocalContentTitle: function(content, index) {
    const that = this;
    wx.showModal({
      title: '编辑标题',
      content: '请输入新标题',
      editable: true,
      placeholderText: content.title,
      success: function(res) {
        if (res.confirm && res.content) {
          that.updateLocalContent(index, 'title', res.content);
        }
      }
    });
  },

  // 编辑本地内容详情
  editLocalContentDetail: function(content, index) {
    const that = this;
    wx.showModal({
      title: '编辑内容',
      content: '请输入新内容',
      editable: true,
      placeholderText: content.content,
      success: function(res) {
        if (res.confirm && res.content) {
          that.updateLocalContent(index, 'content', res.content);
        }
      }
    });
  },

  // 编辑本地内容来源
  editLocalContentSource: function(content, index) {
    const that = this;
    wx.showModal({
      title: '编辑来源',
      content: '请输入新来源',
      editable: true,
      placeholderText: content.author,
      success: function(res) {
        if (res.confirm && res.content) {
          that.updateLocalContent(index, 'author', res.content);
        }
      }
    });
  },

  // 更新本地内容
  updateLocalContent: function(index, field, value) {
    let localContents = this.loadLocalContent();
    if (localContents[index]) {
      localContents[index][field] = value;
      wx.setStorageSync('localContents', JSON.stringify(localContents));
      wx.showToast({
        title: '更新成功',
        icon: 'success'
      });
    }
  },

  // 删除本地内容
  deleteLocalContent: function(index) {
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条内容吗？',
      success: function(res) {
        if (res.confirm) {
          let localContents = that.loadLocalContent();
          localContents.splice(index, 1);
          wx.setStorageSync('localContents', JSON.stringify(localContents));
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
}) 