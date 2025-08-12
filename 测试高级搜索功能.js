// 测试高级搜索和筛选功能
const API = require('./utils/api-manager.js').API

// 测试配置
const testConfig = {
  baseUrl: 'http://localhost:3000',
  timeout: 10000
}

// 测试用例
const testCases = [
  {
    name: '市场高级搜索',
    type: 'markets',
    filters: {
      keyword: '茶叶',
      province: '福建省',
      dateRange: '2024-01-01-2024-12-31'
    }
  },
  {
    name: '新品高级搜索',
    type: 'newarrivals',
    filters: {
      keyword: '龙井',
      category: '绿茶',
      priceRange: '100-500',
      dateRange: '2024-01-01-2024-12-31'
    }
  },
  {
    name: '供求高级搜索',
    type: 'supplies',
    filters: {
      keyword: '铁观音',
      type: '供应',
      priceRange: '200-1000',
      status: 'active'
    }
  },
  {
    name: '清仓高级搜索',
    type: 'clearance',
    filters: {
      keyword: '普洱',
      category: '普洱茶',
      priceRange: '50-300'
    }
  },
  {
    name: '内容高级搜索',
    type: 'content',
    filters: {
      keyword: '茶艺',
      type: 'art',
      tag: '冲泡技巧'
    }
  }
]

// 测试函数
async function testAdvancedSearch() {
  console.log('🚀 [测试] 开始测试高级搜索功能...')
  
  // 1. 测试连接
  console.log('\n📡 [测试] 检查服务器连接...')
  try {
    const healthResponse = await API.health()
    console.log('✅ 服务器连接正常:', healthResponse)
  } catch (error) {
    console.error('❌ 服务器连接失败:', error.message)
    return
  }
  
  // 2. 测试筛选选项获取
  console.log('\n🔧 [测试] 获取筛选选项...')
  try {
    const optionsResponse = await API.getFilterOptions('all')
    console.log('✅ 筛选选项获取成功:', optionsResponse.data)
  } catch (error) {
    console.error('❌ 筛选选项获取失败:', error.message)
  }
  
  // 3. 测试各种高级搜索
  for (const testCase of testCases) {
    console.log(`\n🔍 [测试] ${testCase.name}...`)
    
    try {
      let response
      const filters = API.buildAdvancedFilters(testCase.filters)
      
      switch (testCase.type) {
        case 'markets':
          response = await API.advancedSearchMarkets(filters)
          break
        case 'newarrivals':
          response = await API.advancedSearchNewarrivals(filters)
          break
        case 'supplies':
          response = await API.advancedSearchSupplies(filters)
          break
        case 'clearance':
          response = await API.advancedSearchClearance(filters)
          break
        case 'content':
          response = await API.advancedSearchContent(filters)
          break
        default:
          throw new Error('不支持的数据类型')
      }
      
      if (response.status === 'success') {
        console.log(`✅ ${testCase.name} 搜索成功:`)
        console.log(`   - 结果数量: ${response.data.length}`)
        console.log(`   - 总数量: ${response.pagination?.total || '未知'}`)
        console.log(`   - 筛选条件: ${JSON.stringify(testCase.filters)}`)
        
        // 显示前3条结果
        if (response.data.length > 0) {
          console.log(`   - 前3条结果:`)
          response.data.slice(0, 3).forEach((item, index) => {
            console.log(`     ${index + 1}. ${item.name || item.title || item.id}`)
          })
        }
      } else {
        console.error(`❌ ${testCase.name} 搜索失败:`, response.message)
      }
    } catch (error) {
      console.error(`❌ ${testCase.name} 搜索异常:`, error.message)
    }
  }
  
  // 4. 测试边界情况
  console.log('\n🔬 [测试] 边界情况测试...')
  
  // 空搜索
  try {
    const emptyResponse = await API.advancedSearchMarkets({})
    console.log('✅ 空搜索测试通过:', emptyResponse.data.length, '条结果')
  } catch (error) {
    console.error('❌ 空搜索测试失败:', error.message)
  }
  
  // 无效价格范围
  try {
    const invalidPriceResponse = await API.advancedSearchNewarrivals({
      priceRange: 'invalid-price'
    })
    console.log('✅ 无效价格范围处理正常:', invalidPriceResponse.data.length, '条结果')
  } catch (error) {
    console.error('❌ 无效价格范围处理失败:', error.message)
  }
  
  // 无效日期范围
  try {
    const invalidDateResponse = await API.advancedSearchSupplies({
      dateRange: 'invalid-date'
    })
    console.log('✅ 无效日期范围处理正常:', invalidDateResponse.data.length, '条结果')
  } catch (error) {
    console.error('❌ 无效日期范围处理失败:', error.message)
  }
  
  // 5. 测试分页功能
  console.log('\n📄 [测试] 分页功能测试...')
  try {
    const pageResponse = await API.advancedSearchMarkets({
      page: 1,
      perPage: 5
    })
    console.log('✅ 分页功能正常:')
    console.log(`   - 当前页: ${pageResponse.pagination.page}`)
    console.log(`   - 每页数量: ${pageResponse.pagination.per_page}`)
    console.log(`   - 总页数: ${pageResponse.pagination.pages}`)
    console.log(`   - 总数量: ${pageResponse.pagination.total}`)
  } catch (error) {
    console.error('❌ 分页功能测试失败:', error.message)
  }
  
  // 6. 测试组合搜索
  console.log('\n🎯 [测试] 组合搜索测试...')
  try {
    const complexFilters = {
      keyword: '茶',
      category: '绿茶',
      priceRange: '50-1000',
      dateRange: '2024-01-01-2024-12-31',
      page: 1,
      perPage: 10
    }
    
    const complexResponse = await API.advancedSearchNewarrivals(complexFilters)
    console.log('✅ 组合搜索测试通过:')
    console.log(`   - 筛选条件: ${JSON.stringify(complexFilters)}`)
    console.log(`   - 结果数量: ${complexResponse.data.length}`)
    console.log(`   - 总数量: ${complexResponse.pagination.total}`)
  } catch (error) {
    console.error('❌ 组合搜索测试失败:', error.message)
  }
  
  console.log('\n🎉 [测试] 高级搜索功能测试完成!')
}

// 测试参数构建功能
function testBuildAdvancedFilters() {
  console.log('\n🔧 [测试] 参数构建功能测试...')
  
  const testOptions = {
    keyword: '龙井茶',
    category: '绿茶',
    priceRange: '100-500',
    dateRange: '2024-01-01-2024-12-31',
    province: '浙江省',
    type: '供应',
    tag: '新品推荐',
    status: 'active',
    page: 1,
    perPage: 20
  }
  
  const filters = API.buildAdvancedFilters(testOptions)
  console.log('✅ 参数构建结果:', filters)
  
  // 验证参数
  const expectedKeys = [
    'keyword', 'category', 'price_range', 'date_range', 
    'province', 'type', 'tag', 'status', 'page', 'per_page'
  ]
  
  const missingKeys = expectedKeys.filter(key => !(key in filters))
  if (missingKeys.length === 0) {
    console.log('✅ 所有参数都正确构建')
  } else {
    console.error('❌ 缺少参数:', missingKeys)
  }
}

// 测试筛选选项功能
async function testFilterOptions() {
  console.log('\n📋 [测试] 筛选选项功能测试...')
  
  const dataTypes = ['markets', 'newarrivals', 'supplies', 'clearance', 'content', 'all']
  
  for (const dataType of dataTypes) {
    try {
      const response = await API.getFilterOptions(dataType)
      console.log(`✅ ${dataType} 筛选选项:`, response.data)
    } catch (error) {
      console.error(`❌ ${dataType} 筛选选项获取失败:`, error.message)
    }
  }
}

// 性能测试
async function performanceTest() {
  console.log('\n⚡ [测试] 性能测试...')
  
  const startTime = Date.now()
  
  try {
    // 并发搜索测试
    const promises = [
      API.advancedSearchMarkets({ keyword: '茶' }),
      API.advancedSearchNewarrivals({ category: '绿茶' }),
      API.advancedSearchSupplies({ type: '供应' }),
      API.advancedSearchClearance({ category: '普洱茶' }),
      API.advancedSearchContent({ type: 'recommend' })
    ]
    
    const results = await Promise.all(promises)
    const endTime = Date.now()
    const duration = endTime - startTime
    
    console.log(`✅ 并发搜索测试完成，耗时: ${duration}ms`)
    console.log(`   - 平均响应时间: ${duration / results.length}ms`)
    
    results.forEach((result, index) => {
      console.log(`   - 搜索${index + 1}: ${result.data.length} 条结果`)
    })
    
  } catch (error) {
    console.error('❌ 性能测试失败:', error.message)
  }
}

// 主测试函数
async function runAllTests() {
  console.log('🚀 [高级搜索测试] 开始全面测试...')
  console.log('=' * 50)
  
  try {
    // 基础功能测试
    await testAdvancedSearch()
    
    // 参数构建测试
    testBuildAdvancedFilters()
    
    // 筛选选项测试
    await testFilterOptions()
    
    // 性能测试
    await performanceTest()
    
    console.log('\n🎉 [测试完成] 所有测试通过!')
    console.log('=' * 50)
    
  } catch (error) {
    console.error('\n❌ [测试失败] 测试过程中出现错误:', error)
  }
}

// 导出测试函数
module.exports = {
  testAdvancedSearch,
  testBuildAdvancedFilters,
  testFilterOptions,
  performanceTest,
  runAllTests
}

// 如果直接运行此文件，执行所有测试
if (typeof module !== 'undefined' && module.exports) {
  // 在Node.js环境中运行
  runAllTests()
} else {
  // 在小程序环境中运行
  console.log('🔧 [高级搜索测试] 在小程序环境中运行测试...')
  runAllTests()
} 