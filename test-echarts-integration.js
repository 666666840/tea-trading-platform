// ECharts集成测试脚本
const echarts = require('./ec-canvas/echarts')

// 模拟Canvas环境
class MockCanvas {
  constructor() {
    this.width = 300
    this.height = 200
  }

  getContext(type) {
    if (type === '2d') {
      return {
        clearRect: () => {},
        fillText: () => {},
        stroke: () => {},
        fill: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        arc: () => {},
        closePath: () => {},
        fillRect: () => {},
        setFillStyle: () => {},
        setStrokeStyle: () => {},
        setLineWidth: () => {},
        setFontSize: () => {},
        setTextAlign: () => {},
        setTextBaseline: () => {}
      }
    }
  }
}

// 测试数据
const testData = {
  memoryTrend: [65, 68, 72, 70, 75, 73, 78, 76, 74, 71, 69, 67, 70, 72, 75, 73, 71, 68, 66, 64, 67, 69, 72, 70],
  apiTrend: [250, 280, 320, 290, 350, 310, 380, 340, 300, 270, 290, 320, 350, 330, 360, 340, 310, 280, 260, 290, 320, 350, 330, 300],
  errorTrend: [1.2, 1.5, 1.8, 1.3, 2.1, 1.7, 2.3, 1.9, 1.4, 1.6, 1.9, 2.2, 1.8, 1.5, 1.7, 2.0, 1.6, 1.3, 1.1, 1.4, 1.7, 2.0, 1.8, 1.5]
}

// 测试函数
class EChartsIntegrationTest {
  constructor() {
    this.testResults = []
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🚀 开始ECharts集成测试...\n')
    
    await this.testEChartsLibrary()
    await this.testLineChart()
    await this.testBarChart()
    await this.testPieChart()
    await this.testChartOptions()
    
    this.printTestResults()
  }

  // 测试ECharts库
  async testEChartsLibrary() {
    console.log('📊 测试ECharts库...')
    
    try {
      // 测试库初始化
      this.assert(echarts, 'ECharts库加载成功')
      this.assert(echarts.init, 'ECharts初始化函数存在')
      this.assert(echarts.createChart, 'ECharts创建图表函数存在')
      
      // 测试工具函数
      this.assert(echarts.util, '工具函数存在')
      this.assert(echarts.util.extend, 'extend函数存在')
      this.assert(echarts.util.isArray, 'isArray函数存在')
      
      // 测试颜色配置
      this.assert(echarts.colors, '颜色配置存在')
      this.assert(Array.isArray(echarts.colors), '颜色配置是数组')
      
      console.log('✅ ECharts库测试通过\n')
    } catch (error) {
      this.assert(false, `ECharts库测试失败: ${error.message}`)
    }
  }

  // 测试折线图
  async testLineChart() {
    console.log('📈 测试折线图...')
    
    try {
      const canvas = new MockCanvas()
      const chart = echarts.createChart('line', canvas, canvas.width, canvas.height)
      
      this.assert(chart, '折线图创建成功')
      this.assert(chart.setOption, 'setOption方法存在')
      this.assert(chart.render, 'render方法存在')
      
      // 测试设置数据
      const option = {
        title: { text: '测试折线图' },
        xAxis: { type: 'category', data: ['1', '2', '3', '4', '5'] },
        yAxis: { type: 'value' },
        series: [{ data: [10, 20, 30, 40, 50], type: 'line' }]
      }
      
      chart.setOption(option)
      this.assert(chart.option, '图表配置设置成功')
      
      console.log('✅ 折线图测试通过\n')
    } catch (error) {
      this.assert(false, `折线图测试失败: ${error.message}`)
    }
  }

  // 测试柱状图
  async testBarChart() {
    console.log('📊 测试柱状图...')
    
    try {
      const canvas = new MockCanvas()
      const chart = echarts.createChart('bar', canvas, canvas.width, canvas.height)
      
      this.assert(chart, '柱状图创建成功')
      
      // 测试设置数据
      const option = {
        title: { text: '测试柱状图' },
        xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
        yAxis: { type: 'value' },
        series: [{ data: [100, 200, 150, 300, 250], type: 'bar' }]
      }
      
      chart.setOption(option)
      this.assert(chart.option, '图表配置设置成功')
      
      console.log('✅ 柱状图测试通过\n')
    } catch (error) {
      this.assert(false, `柱状图测试失败: ${error.message}`)
    }
  }

  // 测试饼图
  async testPieChart() {
    console.log('🥧 测试饼图...')
    
    try {
      const canvas = new MockCanvas()
      const chart = echarts.createChart('pie', canvas, canvas.width, canvas.height)
      
      this.assert(chart, '饼图创建成功')
      
      // 测试设置数据
      const option = {
        title: { text: '测试饼图' },
        series: [{
          type: 'pie',
          data: [
            { name: 'A', value: 30 },
            { name: 'B', value: 25 },
            { name: 'C', value: 20 },
            { name: 'D', value: 15 },
            { name: 'E', value: 10 }
          ]
        }]
      }
      
      chart.setOption(option)
      this.assert(chart.option, '图表配置设置成功')
      
      console.log('✅ 饼图测试通过\n')
    } catch (error) {
      this.assert(false, `饼图测试失败: ${error.message}`)
    }
  }

  // 测试图表配置
  async testChartOptions() {
    console.log('⚙️ 测试图表配置...')
    
    try {
      // 测试内存使用率图表配置
      const memoryOption = this.generateMemoryChartOption()
      this.assert(memoryOption.title, '内存图表标题配置成功')
      this.assert(memoryOption.series, '内存图表系列配置成功')
      this.assert(memoryOption.xAxis, '内存图表X轴配置成功')
      this.assert(memoryOption.yAxis, '内存图表Y轴配置成功')
      
      // 测试API响应时间图表配置
      const apiOption = this.generateAPIChartOption()
      this.assert(apiOption.title, 'API图表标题配置成功')
      this.assert(apiOption.series, 'API图表系列配置成功')
      
      // 测试错误率图表配置
      const errorOption = this.generateErrorChartOption()
      this.assert(errorOption.title, '错误率图表标题配置成功')
      this.assert(errorOption.series, '错误率图表系列配置成功')
      
      console.log('✅ 图表配置测试通过\n')
    } catch (error) {
      this.assert(false, `图表配置测试失败: ${error.message}`)
    }
  }

  // 生成内存图表配置
  generateMemoryChartOption() {
    const timePoints = []
    for (let i = 23; i >= 0; i--) {
      timePoints.push(`${i}:00`)
    }
    
    return {
      title: {
        text: '内存使用率趋势',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>内存使用率: {c}%'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '使用率(%)',
        min: 0,
        max: 100,
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: testData.memoryTrend,
        type: 'line',
        smooth: true,
        name: '内存使用率',
        itemStyle: { 
          color: '#4CAF50',
          borderColor: '#4CAF50'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(76, 175, 80, 0.3)'
            }, {
              offset: 1, color: 'rgba(76, 175, 80, 0.1)'
            }]
          }
        }
      }]
    }
  }

  // 生成API图表配置
  generateAPIChartOption() {
    const timePoints = []
    for (let i = 23; i >= 0; i--) {
      timePoints.push(`${i}:00`)
    }
    
    return {
      title: {
        text: 'API响应时间趋势',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>响应时间: {c}ms'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '响应时间(ms)',
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: testData.apiTrend,
        type: 'line',
        smooth: true,
        name: 'API响应时间',
        itemStyle: { 
          color: '#2196F3',
          borderColor: '#2196F3'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(33, 150, 243, 0.3)'
            }, {
              offset: 1, color: 'rgba(33, 150, 243, 0.1)'
            }]
          }
        }
      }]
    }
  }

  // 生成错误率图表配置
  generateErrorChartOption() {
    const timePoints = []
    for (let i = 23; i >= 0; i--) {
      timePoints.push(`${i}:00`)
    }
    
    return {
      title: {
        text: '错误率趋势',
        left: 'center',
        textStyle: {
          fontSize: 14,
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>错误率: {c}%'
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '错误率(%)',
        min: 0,
        max: 10,
        axisLabel: {
          fontSize: 10
        }
      },
      series: [{
        data: testData.errorTrend,
        type: 'line',
        smooth: true,
        name: '错误率',
        itemStyle: { 
          color: '#F44336',
          borderColor: '#F44336'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(244, 67, 54, 0.3)'
            }, {
              offset: 1, color: 'rgba(244, 67, 54, 0.1)'
            }]
          }
        }
      }]
    }
  }

  // 断言函数
  assert(condition, message) {
    const result = {
      success: !!condition,
      message: message,
      timestamp: new Date().toISOString()
    }
    
    this.testResults.push(result)
    
    if (!condition) {
      console.log(`❌ ${message}`)
    } else {
      console.log(`✅ ${message}`)
    }
  }

  // 打印测试结果
  printTestResults() {
    console.log('\n📋 ECharts集成测试结果汇总:')
    console.log('=' * 50)
    
    const total = this.testResults.length
    const passed = this.testResults.filter(r => r.success).length
    const failed = total - passed
    
    console.log(`总测试数: ${total}`)
    console.log(`通过: ${passed}`)
    console.log(`失败: ${failed}`)
    console.log(`成功率: ${((passed / total) * 100).toFixed(1)}%`)
    
    if (failed > 0) {
      console.log('\n❌ 失败的测试:')
      this.testResults
        .filter(r => !r.success)
        .forEach(r => console.log(`- ${r.message}`))
    }
    
    console.log('\n🎉 ECharts集成测试完成!')
  }

  // 生成测试报告
  generateTestReport() {
    const report = {
      timestamp: new Date().toISOString(),
      total: this.testResults.length,
      passed: this.testResults.filter(r => r.success).length,
      failed: this.testResults.filter(r => !r.success).length,
      results: this.testResults
    }
    
    return report
  }
}

// 运行测试
if (typeof module !== 'undefined' && module.exports) {
  // Node.js环境
  const test = new EChartsIntegrationTest()
  test.runAllTests().then(() => {
    const report = test.generateTestReport()
    console.log('\n📄 ECharts集成测试报告:', JSON.stringify(report, null, 2))
  })
} else {
  // 小程序环境
  const test = new EChartsIntegrationTest()
  test.runAllTests()
}

module.exports = EChartsIntegrationTest 