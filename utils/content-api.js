/**
 * 内容管理API工具
 * 提供统一的内容管理API调用接口
 */

const BASE_URL = 'http://localhost:3000'

// 内容API管理器
const contentAPIManager = {
  /**
   * 通用请求方法
   * @param {string} url - API路径
   * @param {string} method - 请求方法
   * @param {object} data - 请求数据
   * @returns {Promise} 请求结果
   */
  async request(url, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}${url}`,
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

  // ==================== 内容CRUD API ====================

  /**
   * 获取内容列表
   * @param {object} params - 查询参数
   * @returns {Promise} 内容列表
   */
  async getContents(params = {}) {
    return this.request('/api/content-management/contents', 'GET', params)
  },

  /**
   * 获取内容详情
   * @param {number} contentId - 内容ID
   * @returns {Promise} 内容详情
   */
  async getContentDetail(contentId) {
    return this.request(`/api/content-management/contents/${contentId}`, 'GET')
  },

  /**
   * 创建内容
   * @param {object} contentData - 内容数据
   * @returns {Promise} 创建结果
   */
  async createContent(contentData) {
    return this.request('/api/content-management/contents', 'POST', contentData)
  },

  /**
   * 更新内容
   * @param {number} contentId - 内容ID
   * @param {object} updateData - 更新数据
   * @returns {Promise} 更新结果
   */
  async updateContent(contentId, updateData) {
    return this.request(`/api/content-management/contents/${contentId}`, 'PUT', updateData)
  },

  /**
   * 删除内容
   * @param {number} contentId - 内容ID
   * @returns {Promise} 删除结果
   */
  async deleteContent(contentId) {
    return this.request(`/api/content-management/contents/${contentId}`, 'DELETE')
  },

  // ==================== 内容操作 API ====================

  /**
   * 发布内容
   * @param {number} contentId - 内容ID
   * @returns {Promise} 发布结果
   */
  async publishContent(contentId) {
    return this.request(`/api/content-management/contents/${contentId}/publish`, 'POST')
  },

  /**
   * 审核通过内容
   * @param {number} contentId - 内容ID
   * @param {object} auditData - 审核数据
   * @returns {Promise} 审核结果
   */
  async approveContent(contentId, auditData = {}) {
    return this.request(`/api/content-management/contents/${contentId}/approve`, 'POST', auditData)
  },

  /**
   * 审核拒绝内容
   * @param {number} contentId - 内容ID
   * @param {object} auditData - 审核数据
   * @returns {Promise} 审核结果
   */
  async rejectContent(contentId, auditData = {}) {
    return this.request(`/api/content-management/contents/${contentId}/reject`, 'POST', auditData)
  },

  /**
   * 切换推荐状态
   * @param {number} contentId - 内容ID
   * @returns {Promise} 切换结果
   */
  async toggleFeatured(contentId) {
    return this.request(`/api/content-management/contents/${contentId}/toggle-featured`, 'POST')
  },

  /**
   * 切换置顶状态
   * @param {number} contentId - 内容ID
   * @returns {Promise} 切换结果
   */
  async toggleTop(contentId) {
    return this.request(`/api/content-management/contents/${contentId}/toggle-top`, 'POST')
  },

  // ==================== 批量操作 API ====================

  /**
   * 批量发布内容
   * @param {Array} contentIds - 内容ID数组
   * @returns {Promise} 批量发布结果
   */
  async batchPublish(contentIds) {
    return this.request('/api/content-management/contents/batch-publish', 'POST', {
      content_ids: contentIds
    })
  },

  /**
   * 批量删除内容
   * @param {Array} contentIds - 内容ID数组
   * @returns {Promise} 批量删除结果
   */
  async batchDelete(contentIds) {
    return this.request('/api/content-management/contents/batch-delete', 'POST', {
      content_ids: contentIds
    })
  },

  // ==================== 内容分析 API ====================

  /**
   * 分析内容质量
   * @param {number} contentId - 内容ID
   * @returns {Promise} 分析结果
   */
  async analyzeContent(contentId) {
    return this.request(`/api/content-management/contents/${contentId}/analyze`, 'GET')
  },

  // ==================== 统计信息 API ====================

  /**
   * 获取内容统计信息
   * @returns {Promise} 统计信息
   */
  async getStatistics() {
    return this.request('/api/content-management/statistics', 'GET')
  },

  // ==================== 枚举值 API ====================

  /**
   * 获取内容类型枚举
   * @returns {Promise} 内容类型列表
   */
  async getContentTypes() {
    return this.request('/api/content-management/enums/content-types', 'GET')
  },

  /**
   * 获取内容状态枚举
   * @returns {Promise} 内容状态列表
   */
  async getContentStatuses() {
    return this.request('/api/content-management/enums/content-statuses', 'GET')
  },

  /**
   * 获取内容优先级枚举
   * @returns {Promise} 内容优先级列表
   */
  async getContentPriorities() {
    return this.request('/api/content-management/enums/content-priorities', 'GET')
  },

  // ==================== 系统健康检查 API ====================

  /**
   * 系统健康检查
   * @returns {Promise} 健康状态
   */
  async healthCheck() {
    return this.request('/api/content-management/health', 'GET')
  },

  // ==================== 工具方法 ====================

  /**
   * 格式化时间
   * @param {string} timestamp - 时间戳
   * @returns {string} 格式化后的时间
   */
  formatTime(timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  },

  /**
   * 获取状态标签样式
   * @param {string} status - 状态
   * @returns {string} 样式类名
   */
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

  /**
   * 获取类型标签样式
   * @param {string} type - 类型
   * @returns {string} 样式类名
   */
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

  /**
   * 获取优先级标签样式
   * @param {string} priority - 优先级
   * @returns {string} 样式类名
   */
  getPriorityClass(priority) {
    const priorityMap = {
      'low': 'priority-low',
      'normal': 'priority-normal',
      'high': 'priority-high',
      'urgent': 'priority-urgent'
    }
    return priorityMap[priority] || 'priority-default'
  },

  /**
   * 验证内容数据
   * @param {object} contentData - 内容数据
   * @returns {object} 验证结果
   */
  validateContentData(contentData) {
    const errors = []

    if (!contentData.title || !contentData.title.trim()) {
      errors.push('标题不能为空')
    }

    if (!contentData.content || !contentData.content.trim()) {
      errors.push('内容不能为空')
    }

    if (!contentData.type) {
      errors.push('请选择内容类型')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  /**
   * 构建筛选参数
   * @param {object} filters - 筛选条件
   * @returns {object} 处理后的筛选参数
   */
  buildFilterParams(filters) {
    const params = {}
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        params[key] = filters[key]
      }
    })
    
    return params
  },

  /**
   * 处理API错误
   * @param {object} error - 错误对象
   * @returns {string} 错误消息
   */
  handleError(error) {
    console.error('API错误:', error)
    
    if (error.status === 404) {
      return '请求的资源不存在'
    } else if (error.status === 500) {
      return '服务器内部错误'
    } else if (error.message) {
      return error.message
    } else {
      return '网络请求失败'
    }
  }
}

// 导出内容API管理器
module.exports = {
  contentAPIManager
} 