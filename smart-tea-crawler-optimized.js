const RSSParser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const schedule = require('node-schedule');

class OptimizedTeaCrawler {
  constructor() {
    this.parser = new RSSParser();
    this.config = {
      outputDir: '/usr/share/nginx/html',
      outputFile: '/usr/share/nginx/html/content.json',
      logFile: './crawler.log',
      maxRetries: 2, // 减少重试次数
      timeout: 5000, // 减少超时时间
      maxArticlesPerCategory: 15, // 限制每类文章数量
      batchSize: 5 // 分批处理
    };
    
    // 简化数据源，减少内存占用
    this.sources = {
      rss: {
        recommend: [
          { name: '中国茶叶网', url: 'http://www.tea.cn/rss.xml' }
        ],
        news: [
          { name: '茶叶流通协会', url: 'http://www.ctma.com.cn/rss.xml' }
        ],
        art: [
          { name: '茶艺网', url: 'https://www.tea-art.com/rss.xml' }
        ],
        hot: [
          { name: '茶叶热点', url: 'https://www.tea-trend.com/rss.xml' }
        ]
      }
    };
  }

  // 轻量级日志记录
  log(message, level = 'INFO') {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    console.log(logMessage);
    
    // 限制日志文件大小
    try {
      const logStats = fs.statSync(this.config.logFile);
      if (logStats.size > 1024 * 1024) { // 1MB限制
        fs.writeFileSync(this.config.logFile, logMessage);
      } else {
        fs.appendFileSync(this.config.logFile, logMessage);
      }
    } catch (error) {
      // 忽略日志错误，避免影响主程序
    }
  }

  // 生成简单ID
  generateId() {
    return Date.now().toString(36);
  }

  // 简化文本清理
  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .substring(0, 200) // 限制长度
      .trim();
  }

  // 简化关键词提取
  extractKeywords(text) {
    const keywords = ['茶叶', '茶艺', '绿茶', '红茶', '乌龙茶', '普洱茶'];
    return keywords.filter(keyword => 
      text.includes(keyword)
    ).slice(0, 3); // 限制关键词数量
  }

  // 简化图片处理
  getDefaultImage(category) {
    const images = {
      recommend: 'https://via.placeholder.com/200x140/4CAF50/FFFFFF?text=推荐',
      news: 'https://via.placeholder.com/200x140/2196F3/FFFFFF?text=茶讯',
      art: 'https://via.placeholder.com/200x140/FF9800/FFFFFF?text=茶艺',
      hot: 'https://via.placeholder.com/200x140/F44336/FFFFFF?text=热点'
    };
    return images[category] || images.recommend;
  }

  // 分批处理RSS源
  async fetchRssSourceBatch(sources, category) {
    const articles = [];
    
    for (let i = 0; i < sources.length; i += this.config.batchSize) {
      const batch = sources.slice(i, i + this.config.batchSize);
      const promises = batch.map(source => this.fetchSingleRssSource(source, category));
      
      const results = await Promise.allSettled(promises);
      
      for (const result of results) {
        if (result.status === 'fulfilled' && result.value) {
          articles.push(...result.value);
        }
      }
      
      // 强制垃圾回收
      if (global.gc) {
        global.gc();
      }
      
      // 等待一小段时间，避免内存峰值
      await this.sleep(1000);
    }
    
    return articles.slice(0, this.config.maxArticlesPerCategory);
  }

  // 单个RSS源处理
  async fetchSingleRssSource(source, category) {
    for (let i = 0; i < this.config.maxRetries; i++) {
      try {
        this.log(`采集RSS: ${source.name}`);
        
        const feed = await this.parser.parseURL(source.url);
        const articles = [];
        
        // 只处理前5篇文章，减少内存占用
        for (const item of feed.items.slice(0, 5)) {
          const article = {
            id: this.generateId(),
            title: this.cleanText(item.title),
            description: this.cleanText(item.contentSnippet || item.content),
            link: item.link,
            pubDate: item.pubDate || new Date().toISOString(),
            image: this.getDefaultImage(category),
            source: source.name,
            category: category,
            tags: this.extractKeywords(item.title + ' ' + item.contentSnippet),
            views: Math.floor(Math.random() * 500) + 100,
            likes: Math.floor(Math.random() * 50) + 10,
            isLocal: false,
            quality: this.calculateSimpleQuality(item)
          };
          
          if (article.title && article.link) {
            articles.push(article);
          }
        }
        
        this.log(`RSS采集成功: ${source.name}, ${articles.length}条`);
        return articles;
        
      } catch (error) {
        this.log(`RSS采集失败: ${source.name}, 错误: ${error.message}`, 'ERROR');
        if (i === this.config.maxRetries - 1) {
          return [];
        }
        await this.sleep(1000);
      }
    }
  }

  // 简化质量计算
  calculateSimpleQuality(article) {
    let score = 50; // 基础分数
    
    if (article.title && article.title.length > 10) score += 20;
    if (article.contentSnippet && article.contentSnippet.length > 30) score += 20;
    if (article.pubDate) score += 10;
    
    return Math.min(score, 100);
  }

  // 简化去重
  deduplicateSimple(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const key = article.title.substring(0, 50); // 只比较标题前50字符
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // 简化本地内容
  getLocalContent() {
    return {
      recommend: [
        {
          id: this.generateId(),
          title: '2024年春季茶叶市场分析',
          description: '基于数据分析，解读2024年春季茶叶市场走势。',
          image: 'https://via.placeholder.com/200x140/4CAF50/FFFFFF?text=市场分析',
          pubDate: new Date().toISOString(),
          source: '茶叶一点通',
          category: 'recommend',
          tags: ['市场分析', '春季茶叶'],
          views: 1500,
          likes: 120,
          isLocal: true,
          quality: 95
        }
      ],
      news: [
        {
          id: this.generateId(),
          title: '茶叶行业政策解读',
          description: '解读最新茶叶行业政策，分析对行业的影响。',
          image: 'https://via.placeholder.com/200x140/2196F3/FFFFFF?text=政策解读',
          pubDate: new Date().toISOString(),
          source: '茶叶一点通',
          category: 'news',
          tags: ['政策解读', '行业影响'],
          views: 2000,
          likes: 180,
          isLocal: true,
          quality: 90
        }
      ]
    };
  }

  // 主采集函数（优化版）
  async mainCrawler() {
    try {
      this.log('开始优化版茶叶内容采集...');
      
      const allArticles = {};
      
      // 分批处理RSS内容
      for (const [category, sources] of Object.entries(this.sources.rss)) {
        this.log(`采集RSS栏目: ${category}`);
        const articles = await this.fetchRssSourceBatch(sources, category);
        allArticles[category] = this.deduplicateSimple(articles);
        this.log(`RSS栏目完成: ${category}, ${allArticles[category].length}条`);
        
        // 强制垃圾回收
        if (global.gc) {
          global.gc();
        }
      }
      
      // 混合本地内容
      const localContent = this.getLocalContent();
      const finalContent = {};
      
      for (const category of ['recommend', 'news', 'art', 'hot']) {
        const local = localContent[category] || [];
        const external = allArticles[category] || [];
        finalContent[category] = [...local, ...external].slice(0, 20); // 限制总数
      }
      
      // 确保输出目录存在
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(this.config.outputFile, JSON.stringify(finalContent, null, 2), 'utf-8');
      
      // 简化统计
      const totalArticles = Object.values(finalContent).reduce((sum, articles) => sum + articles.length, 0);
      this.log(`采集完成! 总文章数: ${totalArticles}`);
      
    } catch (error) {
      this.log(`采集失败: ${error.message}`, 'ERROR');
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 创建优化版采集器实例
const crawler = new OptimizedTeaCrawler();

// 定时任务：每天凌晨2点执行（错开高峰）
schedule.scheduleJob('0 2 * * *', () => crawler.mainCrawler());

// 启动时立即执行一次
crawler.mainCrawler();

// 优雅退出
process.on('SIGINT', () => {
  crawler.log('正在停止优化版采集服务...');
  process.exit(0);
});

crawler.log('优化版茶叶内容采集服务已启动'); 