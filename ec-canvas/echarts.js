// 简化版ECharts库
// 这是一个轻量级的ECharts实现，用于微信小程序

// 基础工具函数
const util = {
  extend: function(target, source) {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
    return target;
  },
  
  isArray: function(arr) {
    return Array.isArray(arr);
  },
  
  isNumber: function(num) {
    return typeof num === 'number' && !isNaN(num);
  },
  
  isString: function(str) {
    return typeof str === 'string';
  }
};

// 颜色配置
const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];

// 图表基类
class Chart {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.option = {};
    this.data = [];
  }

  setOption(option) {
    this.option = util.extend({}, option);
    this.render();
  }

  render() {
    // 清空画布
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // 绘制标题
    if (this.option.title) {
      this.drawTitle();
    }
    
    // 绘制图表
    this.drawChart();
  }

  drawTitle() {
    const title = this.option.title;
    if (title && title.text) {
      this.ctx.fillStyle = title.textStyle ? title.textStyle.color || '#333' : '#333';
      this.ctx.font = title.textStyle ? title.textStyle.fontSize || '16px' : '16px';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(title.text, this.width / 2, 30);
    }
  }

  drawChart() {
    // 子类实现具体绘制逻辑
  }

  // 获取数据
  getData() {
    return this.data;
  }

  // 设置数据
  setData(data) {
    this.data = data;
    this.render();
  }
}

// 折线图
class LineChart extends Chart {
  drawChart() {
    const series = this.option.series[0];
    const xAxis = this.option.xAxis;
    const yAxis = this.option.yAxis;
    
    if (!series || !series.data || !xAxis || !yAxis) return;

    const data = series.data;
    const xData = xAxis.data || [];
    
    // 计算坐标轴范围
    const padding = 60;
    const chartWidth = this.width - padding * 2;
    const chartHeight = this.height - padding * 2;
    
    // 计算Y轴范围
    const minY = Math.min(...data);
    const maxY = Math.max(...data);
    const yRange = maxY - minY;
    
    // 绘制坐标轴
    this.drawAxis(padding, chartWidth, chartHeight, xData, minY, maxY);
    
    // 绘制折线
    this.drawLine(data, padding, chartWidth, chartHeight, minY, yRange);
  }

  drawAxis(padding, chartWidth, chartHeight, xData, minY, maxY) {
    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 1;
    
    // X轴
    this.ctx.beginPath();
    this.ctx.moveTo(padding, this.height - padding);
    this.ctx.lineTo(padding + chartWidth, this.height - padding);
    this.ctx.stroke();
    
    // Y轴
    this.ctx.beginPath();
    this.ctx.moveTo(padding, padding);
    this.ctx.lineTo(padding, this.height - padding);
    this.ctx.stroke();
    
    // X轴标签
    this.ctx.fillStyle = '#666';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    
    xData.forEach((label, index) => {
      const x = padding + (index / (xData.length - 1)) * chartWidth;
      this.ctx.fillText(label, x, this.height - padding + 20);
    });
    
    // Y轴标签
    this.ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      const value = maxY - (i / 5) * (maxY - minY);
      this.ctx.fillText(value.toFixed(1), padding - 10, y + 4);
    }
  }

  drawLine(data, padding, chartWidth, chartHeight, minY, yRange) {
    const series = this.option.series[0];
    const color = series.itemStyle ? series.itemStyle.color : colors[0];
    
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - minY) / yRange) * chartHeight;
      
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    
    this.ctx.stroke();
    
    // 绘制数据点
    this.ctx.fillStyle = color;
    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - minY) / yRange) * chartHeight;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }
}

// 柱状图
class BarChart extends Chart {
  drawChart() {
    const series = this.option.series[0];
    const xAxis = this.option.xAxis;
    const yAxis = this.option.yAxis;
    
    if (!series || !series.data || !xAxis || !yAxis) return;

    const data = series.data;
    const xData = xAxis.data || [];
    
    // 计算坐标轴范围
    const padding = 60;
    const chartWidth = this.width - padding * 2;
    const chartHeight = this.height - padding * 2;
    
    // 计算Y轴范围
    const maxY = Math.max(...data);
    
    // 绘制坐标轴
    this.drawAxis(padding, chartWidth, chartHeight, xData, maxY);
    
    // 绘制柱状图
    this.drawBars(data, padding, chartWidth, chartHeight, maxY);
  }

  drawAxis(padding, chartWidth, chartHeight, xData, maxY) {
    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 1;
    
    // X轴
    this.ctx.beginPath();
    this.ctx.moveTo(padding, this.height - padding);
    this.ctx.lineTo(padding + chartWidth, this.height - padding);
    this.ctx.stroke();
    
    // Y轴
    this.ctx.beginPath();
    this.ctx.moveTo(padding, padding);
    this.ctx.lineTo(padding, this.height - padding);
    this.ctx.stroke();
    
    // X轴标签
    this.ctx.fillStyle = '#666';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    
    xData.forEach((label, index) => {
      const x = padding + (index + 0.5) / xData.length * chartWidth;
      this.ctx.fillText(label, x, this.height - padding + 20);
    });
    
    // Y轴标签
    this.ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      const value = (i / 5) * maxY;
      this.ctx.fillText(value.toFixed(0), padding - 10, y + 4);
    }
  }

  drawBars(data, padding, chartWidth, chartHeight, maxY) {
    const series = this.option.series[0];
    const color = series.itemStyle ? series.itemStyle.color : colors[0];
    
    this.ctx.fillStyle = color;
    
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    
    data.forEach((value, index) => {
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const height = (value / maxY) * chartHeight;
      const y = this.height - padding - height;
      
      this.ctx.fillRect(x, y, barWidth, height);
    });
  }
}

// 饼图
class PieChart extends Chart {
  drawChart() {
    const series = this.option.series[0];
    
    if (!series || !series.data) return;

    const data = series.data;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    // 计算总和
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // 绘制饼图
    let startAngle = -Math.PI / 2;
    
    data.forEach((item, index) => {
      const angle = (item.value / total) * 2 * Math.PI;
      const color = item.itemStyle ? item.itemStyle.color : colors[index % colors.length];
      
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
      this.ctx.closePath();
      this.ctx.fill();
      
      // 绘制标签
      const labelAngle = startAngle + angle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
      
      this.ctx.fillStyle = '#333';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(item.name, labelX, labelY);
      
      startAngle += angle;
    });
  }
}

// 图表工厂
const echarts = {
  init: function(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    return this;
  },

  setCanvasCreator: function(creator) {
    this.canvasCreator = creator;
  },

  // 创建图表实例
  createChart: function(type, canvas, width, height) {
    let chart;
    
    switch (type) {
      case 'line':
        chart = new LineChart(canvas, width, height);
        break;
      case 'bar':
        chart = new BarChart(canvas, width, height);
        break;
      case 'pie':
        chart = new PieChart(canvas, width, height);
        break;
      default:
        chart = new Chart(canvas, width, height);
    }
    
    return chart;
  },

  // 工具函数
  util: util,
  
  // 颜色配置
  colors: colors
};

// 导出
export default echarts; 