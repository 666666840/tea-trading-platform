// 收藏管理器 - 统一处理收藏功能
class FavoriteManager {
  constructor() {
    this.storageKey = 'userFavorites'
    this.maxFavorites = 200 // 最大收藏数量
  }

  // 获取所有收藏数据
  getAllFavorites() {
    try {
      return wx.getStorageSync(this.storageKey) || {
        markets: [],
        merchants: [],
        products: [],
        newarrivals: [],
        supplies: [],
        clearance: [],
        articles: []
      }
    } catch (error) {
      console.error('获取收藏数据失败:', error)
      return {
        markets: [],
        merchants: [],
        products: [],
        newarrivals: [],
        supplies: [],
        clearance: [],
        articles: []
      }
    }
  }

  // 保存收藏数据
  saveFavorites(favorites) {
    try {
      wx.setStorageSync(this.storageKey, favorites)
      return true
    } catch (error) {
      console.error('保存收藏数据失败:', error)
      return false
    }
  }

  // 添加收藏
  addFavorite(type, item) {
    const favorites = this.getAllFavorites()
    
    if (!favorites[type]) {
      favorites[type] = []
    }

    // 检查是否已收藏
    const isExist = favorites[type].some(fav => fav.id === item.id)
    if (isExist) {
      wx.showToast({
        title: '已经收藏过了',
        icon: 'none'
      })
      return false
    }

    // 检查收藏数量限制
    const totalCount = Object.values(favorites).reduce((sum, arr) => sum + arr.length, 0)
    if (totalCount >= this.maxFavorites) {
      wx.showModal({
        title: '收藏数量已满',
        content: `最多只能收藏${this.maxFavorites}个内容，请先删除一些收藏`,
        showCancel: false
      })
      return false
    }

    // 添加收藏项
    const favoriteItem = {
      id: item.id,
      name: item.name || item.title,
      type: type,
      data: item,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString()
    }

    favorites[type].unshift(favoriteItem) // 最新的在前面

    // 保存并提示
    const success = this.saveFavorites(favorites)
    if (success) {
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
      return true
    } else {
      wx.showToast({
        title: '收藏失败',
        icon: 'error'
      })
      return false
    }
  }

  // 移除收藏
  removeFavorite(type, itemId) {
    const favorites = this.getAllFavorites()
    
    if (!favorites[type]) {
      return false
    }

    const originalLength = favorites[type].length
    favorites[type] = favorites[type].filter(fav => fav.id !== itemId)

    if (favorites[type].length < originalLength) {
      const success = this.saveFavorites(favorites)
      if (success) {
        wx.showToast({
          title: '已取消收藏',
          icon: 'success'
        })
        return true
      }
    }

    return false
  }

  // 检查是否已收藏
  isFavorited(type, itemId) {
    const favorites = this.getAllFavorites()
    if (!favorites[type]) {
      return false
    }
    return favorites[type].some(fav => fav.id === itemId)
  }

  // 切换收藏状态
  toggleFavorite(type, item) {
    if (this.isFavorited(type, item.id)) {
      return this.removeFavorite(type, item.id)
    } else {
      return this.addFavorite(type, item)
    }
  }

  // 获取特定类型的收藏
  getFavoritesByType(type) {
    const favorites = this.getAllFavorites()
    return favorites[type] || []
  }

  // 获取收藏统计
  getFavoriteStats() {
    const favorites = this.getAllFavorites()
    return {
      markets: favorites.markets.length,
      merchants: favorites.merchants.length,
      products: favorites.products.length,
      newarrivals: favorites.newarrivals.length,
      supplies: favorites.supplies.length,
      clearance: favorites.clearance.length,
      articles: favorites.articles.length,
      total: Object.values(favorites).reduce((sum, arr) => sum + arr.length, 0)
    }
  }

  // 清空特定类型的收藏
  clearFavoritesByType(type) {
    wx.showModal({
      title: '确认清空',
      content: `确定要清空所有${this.getTypeDisplayName(type)}收藏吗？`,
      success: (res) => {
        if (res.confirm) {
          const favorites = this.getAllFavorites()
          favorites[type] = []
          const success = this.saveFavorites(favorites)
          if (success) {
            wx.showToast({
              title: '清空成功',
              icon: 'success'
            })
          }
        }
      }
    })
  }

  // 清空所有收藏
  clearAllFavorites() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有收藏吗？此操作不可恢复！',
      confirmColor: '#ff4757',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.removeStorageSync(this.storageKey)
            wx.showToast({
              title: '已清空所有收藏',
              icon: 'success'
            })
          } catch (error) {
            wx.showToast({
              title: '清空失败',
              icon: 'error'
            })
          }
        }
      }
    })
  }

  // 获取类型显示名称
  getTypeDisplayName(type) {
    const typeNames = {
      markets: '市场',
      merchants: '商户',
      products: '产品',
      newarrivals: '新品',
      supplies: '供求',
      clearance: '特价',
      articles: '文章'
    }
    return typeNames[type] || type
  }

  // 导出收藏数据
  exportFavorites() {
    const favorites = this.getAllFavorites()
    const stats = this.getFavoriteStats()
    
    const exportData = {
      exportTime: new Date().toISOString(),
      stats: stats,
      data: favorites
    }

    // 将数据转换为JSON字符串并复制到剪贴板
    const jsonString = JSON.stringify(exportData, null, 2)
    wx.setClipboardData({
      data: jsonString,
      success: () => {
        wx.showModal({
          title: '导出成功',
          content: '收藏数据已复制到剪贴板，您可以保存备份',
          showCancel: false
        })
      },
      fail: () => {
        wx.showToast({
          title: '导出失败',
          icon: 'error'
        })
      }
    })
  }

  // 导入收藏数据
  importFavorites(jsonData) {
    try {
      const importData = JSON.parse(jsonData)
      if (importData.data) {
        wx.showModal({
          title: '确认导入',
          content: '导入会覆盖现有收藏数据，确定继续吗？',
          success: (res) => {
            if (res.confirm) {
              const success = this.saveFavorites(importData.data)
              if (success) {
                wx.showToast({
                  title: '导入成功',
                  icon: 'success'
                })
              } else {
                wx.showToast({
                  title: '导入失败',
                  icon: 'error'
                })
              }
            }
          }
        })
      } else {
        throw new Error('数据格式错误')
      }
    } catch (error) {
      wx.showToast({
        title: '数据格式错误',
        icon: 'error'
      })
    }
  }
}

// 创建全局收藏管理器实例
const favoriteManager = new FavoriteManager()

// 导出便捷方法
const Favorite = {
  // 添加收藏
  add(type, item) {
    return favoriteManager.addFavorite(type, item)
  },

  // 移除收藏
  remove(type, itemId) {
    return favoriteManager.removeFavorite(type, itemId)
  },

  // 切换收藏状态
  toggle(type, item) {
    return favoriteManager.toggleFavorite(type, item)
  },

  // 检查是否已收藏
  check(type, itemId) {
    return favoriteManager.isFavorited(type, itemId)
  },

  // 获取收藏列表
  getList(type) {
    return favoriteManager.getFavoritesByType(type)
  },

  // 获取统计信息
  getStats() {
    return favoriteManager.getFavoriteStats()
  },

  // 清空收藏
  clear(type = null) {
    if (type) {
      return favoriteManager.clearFavoritesByType(type)
    } else {
      return favoriteManager.clearAllFavorites()
    }
  },

  // 导出数据
  export() {
    return favoriteManager.exportFavorites()
  },

  // 导入数据
  import(jsonData) {
    return favoriteManager.importFavorites(jsonData)
  }
}

module.exports = {
  FavoriteManager,
  Favorite,
  favoriteManager
} 