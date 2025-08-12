# ECharts微信小程序集成使用指南

## 📋 目录
- [概述](#概述)
- [文件结构](#文件结构)
- [快速开始](#快速开始)
- [图表类型](#图表类型)
- [配置选项](#配置选项)
- [数据更新](#数据更新)
- [交互功能](#交互功能)
- [性能优化](#性能优化)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

## 📊 概述

本项目已成功集成ECharts微信小程序组件，为性能仪表盘提供了完整的图表可视化功能。支持折线图、柱状图、饼图等多种图表类型，具备丰富的配置选项和交互功能。

### 主要特性
- ✅ 轻量级ECharts实现，专为小程序优化
- ✅ 支持多种图表类型（折线图、柱状图、饼图）
- ✅ 响应式设计，适配不同屏幕尺寸
- ✅ 丰富的配置选项和自定义样式
- ✅ 实时数据更新和动画效果
- ✅ 触摸交互和事件处理
- ✅ 性能优化，内存占用低

## 📁 文件结构

```
ec-canvas/
├── ec-canvas.js          # ECharts组件主文件
├── ec-canvas.wxml        # 组件模板
├── ec-canvas.wxss        # 组件样式
├── ec-canvas.json        # 组件配置
└── echarts.js           # 简化版ECharts库

pages/performance-dashboard/
├── performance-dashboard.js    # 页面逻辑（已集成ECharts）
├── performance-dashboard.wxml  # 页面模板（已集成图表组件）
├── performance-dashboard.wxss  # 页面样式（已优化图表显示）
└── performance-dashboard.json  # 页面配置（已引入组件）

test-echarts-integration.js     # ECharts集成测试脚本
```

## 🚀 快速开始

### 1. 在页面中引入组件

```json
// pages/your-page/your-page.json
{
  "usingComponents": {
    "ec-canvas": "../../ec-canvas/ec-canvas"
  }
}
```

### 2. 在页面中使用组件

```xml
<!-- pages/your-page/your-page.wxml -->
<ec-canvas 
  id="my-chart" 
  canvas-id="my-chart" 
  ec="{{ ec }}" 
  bindinit="onChartInit"
  class="chart-canvas">
</ec-canvas>
```

### 3. 在页面逻辑中配置

```javascript
// pages/your-page/your-page.js
const echarts = require('../../ec-canvas/echarts')

Page({
  data: {
    ec: {
      onInit: function (canvas, width, height) {
        const chart = echarts.init(canvas, width, height);
        canvas.setChart(chart);
        return chart;
      }
    }
  },

  onChartInit(e) {
    const { chart } = e.detail;
    
    // 设置图表配置
    const option = {
      title: { text: '我的图表' },
      xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: { type: 'value' },
      series: [{ data: [10, 20, 30, 40, 50], type: 'line' }]
    };
    
    chart.setOption(option);
  }
});
```

### 4. 添加样式

```css
/* pages/your-page/your-page.wxss */
.chart-canvas {
  width: 100%;
  height: 400rpx;
}
```

## 📈 图表类型

### 1. 折线图 (Line Chart)

```javascript
const option = {
  title: { text: '折线图示例' },
  xAxis: { 
    type: 'category', 
    data: ['1月', '2月', '3月', '4月', '5月'] 
  },
  yAxis: { type: 'value' },
  series: [{
    data: [10, 20, 30, 40, 50],
    type: 'line',
    smooth: true,
    itemStyle: { color: '#4CAF50' }
  }]
};
```

### 2. 柱状图 (Bar Chart)

```javascript
const option = {
  title: { text: '柱状图示例' },
  xAxis: { 
    type: 'category', 
    data: ['A', 'B', 'C', 'D', 'E'] 
  },
  yAxis: { type: 'value' },
  series: [{
    data: [100, 200, 150, 300, 250],
    type: 'bar',
    itemStyle: { color: '#2196F3' }
  }]
};
```

### 3. 饼图 (Pie Chart)

```javascript
const option = {
  title: { text: '饼图示例' },
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
};
```

## ⚙️ 配置选项

### 基础配置

```javascript
const option = {
  // 标题
  title: {
    text: '图表标题',
    left: 'center',
    textStyle: {
      fontSize: 14,
      color: '#333'
    }
  },
  
  // 提示框
  tooltip: {
    trigger: 'axis',
    formatter: '{b}<br/>数值: {c}'
  },
  
  // 图例
  legend: {
    data: ['系列1', '系列2'],
    top: 30
  },
  
  // 网格
  grid: {
    left: '10%',
    right: '10%',
    top: '15%',
    bottom: '15%'
  }
};
```

### 坐标轴配置

```javascript
// X轴
xAxis: {
  type: 'category',
  data: ['A', 'B', 'C', 'D', 'E'],
  axisLabel: {
    fontSize: 10,
    rotate: 45
  },
  axisLine: {
    lineStyle: { color: '#ccc' }
  }
},

// Y轴
yAxis: {
  type: 'value',
  name: '数值',
  min: 0,
  max: 100,
  axisLabel: {
    fontSize: 10
  },
  splitLine: {
    lineStyle: { color: '#eee' }
  }
}
```

### 系列配置

```javascript
series: [{
  name: '数据系列',
  type: 'line',
  data: [10, 20, 30, 40, 50],
  
  // 样式配置
  itemStyle: {
    color: '#4CAF50',
    borderColor: '#4CAF50',
    borderWidth: 2
  },
  
  // 线条样式
  lineStyle: {
    width: 3,
    color: '#4CAF50'
  },
  
  // 区域填充
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
  },
  
  // 平滑曲线
  smooth: true,
  
  // 数据点样式
  symbol: 'circle',
  symbolSize: 6
}]
```

## 📊 数据更新

### 实时数据更新

```javascript
Page({
  data: {
    chartData: [10, 20, 30, 40, 50]
  },

  // 更新数据
  updateChartData(newData) {
    this.setData({
      chartData: newData
    });
    
    // 更新图表
    if (this.chart) {
      this.chart.setOption({
        series: [{
          data: newData
        }]
      });
    }
  },

  // 定时更新
  startAutoUpdate() {
    this.updateTimer = setInterval(() => {
      const newData = this.generateRandomData();
      this.updateChartData(newData);
    }, 5000); // 每5秒更新一次
  },

  stopAutoUpdate() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
      this.updateTimer = null;
    }
  }
});
```

### 动态添加数据

```javascript
// 添加新数据点
addDataPoint(value) {
  const currentData = this.data.chartData;
  const newData = [...currentData, value];
  
  // 保持最多20个数据点
  if (newData.length > 20) {
    newData.shift();
  }
  
  this.updateChartData(newData);
}
```

## 🎯 交互功能

### 点击事件

```javascript
onChartInit(e) {
  const { chart } = e.detail;
  
  // 监听点击事件
  chart.on('click', (params) => {
    console.log('点击了数据点:', params);
    wx.showToast({
      title: `点击了: ${params.name}`,
      icon: 'none'
    });
  });
}
```

### 触摸事件

```javascript
// 组件已自动处理触摸事件
// 支持缩放、拖拽等交互
```

### 自定义交互

```javascript
// 高亮显示
highlightDataPoint(index) {
  if (this.chart) {
    this.chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: index
    });
  }
}
```

## ⚡ 性能优化

### 1. 数据量控制

```javascript
// 限制数据点数量
const MAX_DATA_POINTS = 100;

function addDataPoint(value) {
  const data = this.data.chartData;
  if (data.length >= MAX_DATA_POINTS) {
    data.shift(); // 移除最旧的数据点
  }
  data.push(value);
  this.updateChartData(data);
}
```

### 2. 更新频率控制

```javascript
// 使用节流控制更新频率
let updateTimer = null;

function throttledUpdate(newData) {
  if (updateTimer) return;
  
  updateTimer = setTimeout(() => {
    this.updateChartData(newData);
    updateTimer = null;
  }, 100); // 100ms内只更新一次
}
```

### 3. 内存管理

```javascript
onUnload() {
  // 清理定时器
  this.stopAutoUpdate();
  
  // 销毁图表实例
  if (this.chart) {
    this.chart.dispose();
    this.chart = null;
  }
}
```

## ❓ 常见问题

### Q1: 图表不显示怎么办？

**A:** 检查以下几点：
1. 确保组件已正确引入
2. 检查canvas-id是否唯一
3. 确保容器有足够的高度
4. 检查数据格式是否正确

### Q2: 图表显示异常怎么办？

**A:** 常见解决方案：
1. 检查数据是否为空或格式错误
2. 确保坐标轴配置正确
3. 检查颜色配置是否有效
4. 尝试重新初始化图表

### Q3: 性能问题如何解决？

**A:** 优化建议：
1. 限制数据点数量
2. 控制更新频率
3. 使用节流函数
4. 及时清理资源

### Q4: 如何自定义样式？

**A:** 可以通过以下方式：
1. 修改itemStyle配置
2. 自定义颜色主题
3. 调整字体和大小
4. 修改布局和间距

## 🎨 最佳实践

### 1. 数据格式规范

```javascript
// 推荐的数据格式
const data = {
  xAxis: ['1月', '2月', '3月', '4月', '5月'],
  series: [{
    name: '销售额',
    data: [100, 200, 150, 300, 250],
    type: 'line'
  }]
};
```

### 2. 配置模板化

```javascript
// 创建配置模板
const chartTemplates = {
  line: {
    title: { text: '', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    series: [{ type: 'line', smooth: true }]
  },
  bar: {
    title: { text: '', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    series: [{ type: 'bar' }]
  }
};

// 使用模板
function createChart(type, data) {
  const template = chartTemplates[type];
  return {
    ...template,
    title: { ...template.title, text: data.title },
    xAxis: { ...template.xAxis, data: data.xAxis },
    series: [{ ...template.series[0], data: data.series }]
  };
}
```

### 3. 错误处理

```javascript
function safeUpdateChart(option) {
  try {
    if (this.chart && option) {
      this.chart.setOption(option);
    }
  } catch (error) {
    console.error('图表更新失败:', error);
    wx.showToast({
      title: '图表更新失败',
      icon: 'error'
    });
  }
}
```

### 4. 响应式设计

```javascript
// 监听屏幕尺寸变化
onResize() {
  if (this.chart) {
    this.chart.resize();
  }
}

// 自适应容器大小
function resizeChart() {
  const query = wx.createSelectorQuery();
  query.select('.chart-container').boundingClientRect((res) => {
    if (res && this.chart) {
      this.chart.resize({
        width: res.width,
        height: res.height
      });
    }
  }).exec();
}
```

## 📝 总结

ECharts微信小程序组件已成功集成到性能仪表盘中，提供了完整的图表可视化功能。通过本指南，您可以：

1. ✅ 快速上手使用图表组件
2. ✅ 配置各种图表类型和样式
3. ✅ 实现实时数据更新
4. ✅ 添加交互功能
5. ✅ 优化性能和用户体验

如有任何问题，请参考常见问题部分或查看测试脚本进行验证。

---

**🎉 恭喜！您的茶叶批发平台现在拥有了专业的图表可视化功能！** 