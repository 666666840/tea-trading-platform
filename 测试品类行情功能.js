// 测试品类行情功能
console.log('=== 测试品类行情功能 ===')

// 模拟Page对象
const mockPage = {
  data: {
    loading: false,
    hasMore: true,
    activeCategory: 'all',
    categoryNames: {
      'all': '全部茶类',
      'green': '绿茶',
      'white': '白茶', 
      'yellow': '黄茶',
      'oolong': '青茶（乌龙茶）',
      'black': '红茶',
      'dark': '黑茶',
      'flower': '花茶'
    },
    overview: {
      totalVarieties: 156,
      risingCount: 89,
      fallingCount: 45
    },
    priceList: [],
    page: 1,
    pageSize: 10
  },
  
  setData(data) {
    Object.assign(this.data, data)
    console.log('setData调用:', data)
  },
  
  getMockPriceData(params) {
    console.log('生成模拟数据，参数:', params)
    
    const mockData = {
      green: [
        {
          id: 1,
          name: '西湖龙井',
          minPrice: 800,
          maxPrice: 1200,
          avgPrice: 1000,
          unit: '斤',
          changeType: 'up',
          changePercent: 5.2,
          origin: '浙江杭州',
          updateTime: '2小时前',
          sourceCount: 15,
          isHot: true,
          isNew: false,
          isRecommended: true
        },
        {
          id: 2,
          name: '碧螺春',
          minPrice: 600,
          maxPrice: 900,
          avgPrice: 750,
          unit: '斤',
          changeType: 'down',
          changePercent: 2.1,
          origin: '江苏苏州',
          updateTime: '1小时前',
          sourceCount: 12,
          isHot: false,
          isNew: true,
          isRecommended: false
        }
      ],
      black: [
        {
          id: 4,
          name: '正山小种',
          minPrice: 300,
          maxPrice: 600,
          avgPrice: 450,
          unit: '斤',
          changeType: 'up',
          changePercent: 3.8,
          origin: '福建武夷山',
          updateTime: '30分钟前',
          sourceCount: 20,
          isHot: true,
          isNew: false,
          isRecommended: true
        }
      ]
    }

    // 根据分类返回对应数据
    let list = []
    if (params.category === 'all') {
      // 合并所有分类的数据
      Object.values(mockData).forEach(categoryData => {
        list = list.concat(categoryData)
      })
      console.log('全部茶类数据，总长度:', list.length)
    } else {
      list = mockData[params.category] || []
      console.log(`${params.category}分类数据，长度:`, list.length)
    }

    // 模拟分页
    const start = (params.page - 1) * params.pageSize
    const end = start + params.pageSize
    const pageData = list.slice(start, end)
    
    console.log(`分页数据: 第${params.page}页，${start}-${end}，返回${pageData.length}条`)
    
    return {
      list: pageData,
      hasMore: end < list.length
    }
  },
  
  async loadCategoryData() {
    if (this.data.loading) {
      console.log('正在加载中，跳过重复请求')
      return
    }
    
    console.log('开始加载分类数据，当前分类:', this.data.activeCategory)
    this.setData({ loading: true })
    
    try {
      const params = {
        category: this.data.activeCategory,
        page: this.data.page,
        pageSize: this.data.pageSize
      }
      
      console.log('请求参数:', params)
      
      // 模拟API调用
      const mockData = this.getMockPriceData(params)
      
      console.log('获取到模拟数据:', mockData)
      
      if (this.data.page === 1) {
        this.setData({
          priceList: mockData.list,
          hasMore: mockData.hasMore
        })
        console.log('设置第一页数据，长度:', mockData.list.length)
      } else {
        this.setData({
          priceList: [...this.data.priceList, ...mockData.list],
          hasMore: mockData.hasMore
        })
        console.log('追加数据，总长度:', this.data.priceList.length + mockData.list.length)
      }
      
    } catch (error) {
      console.error('加载分类数据失败:', error)
    } finally {
      this.setData({ loading: false })
      console.log('数据加载完成，当前列表长度:', this.data.priceList.length)
    }
  }
}

// 测试数据加载
console.log('开始测试数据加载...')
mockPage.loadCategoryData().then(() => {
  console.log('测试完成！')
  console.log('最终数据状态:', mockPage.data)
  console.log('价格列表:', mockPage.data.priceList)
})
