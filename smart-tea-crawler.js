const RSSParser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const schedule = require('node-schedule');

class SmartTeaCrawler {
  constructor() {
    this.parser = new RSSParser();
    this.config = {
      outputDir: '/usr/share/nginx/html',
      outputFile: '/usr/share/nginx/html/content.json',
      logFile: './crawler.log',
      maxRetries: 3,
      timeout: 10000
    };
    
    this.sources = {
      rss: {
        recommend: [
          { name: '中国茶叶网', url: 'http://www.tea.cn/rss.xml' },
          { name: '茶叶中国', url: 'https://www.chinatea.com/rss.xml' }
        ],
        news: [
          { name: '茶叶流通协会', url: 'http://www.ctma.com.cn/rss.xml' },
          { name: '茶叶市场网', url: 'https://www.tea-market.com/rss.xml' }
        ],
        art: [
          { name: '茶艺网', url: 'https://www.tea-art.com/rss.xml' },
          { name: '茶文化网', url: 'https://www.tea-culture.com/rss.xml' }
        ],
        hot: [
          { name: '茶叶热点', url: 'https://www.tea-trend.com/rss.xml' },
          { name: '茶叶时尚', url: 'https://www.tea-fashion.com/rss.xml' }
        ]
      },
      api: {
        news: 'https://api.tea-news.com/articles',
        prices: 'https://api.tea-price.com/prices'
      },
      websites: [
        'https://www.tea.cn/news/',
        'https://www.chinatea.com/news/',
        'https://www.tea-market.com/news/'
      ]
    };
  }

  // 日志记录
  log(message, level = 'INFO') {
    const timestamp = new Date().toLocaleString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    console.log(logMessage);
    try {
      fs.appendFileSync(this.config.logFile, logMessage);
    } catch (error) {
      console.error('写入日志失败:', error);
    }
  }

  // 生成唯一ID
  generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

  // 清理文本
  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s，。！？；：""''（）【】]/g, '')
      .trim();
  }

  // 提取关键词
  extractKeywords(text) {
    const keywords = [
      '茶叶', '茶艺', '茶文化', '绿茶', '红茶', '乌龙茶', '普洱茶', 
      '白茶', '黄茶', '黑茶', '花茶', '龙井', '碧螺春', '铁观音',
      '大红袍', '正山小种', '祁门红茶', '滇红', '安吉白茶'
    ];
    
    const found = keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return found.slice(0, 5);
  }

  // 智能图片提取
  async extractImage(article) {
    // 优先使用RSS中的图片
    if (article.enclosure && article.enclosure.url) {
      return article.enclosure.url;
    }
    
    // 从内容中提取图片
    if (article.content) {
      const $ = cheerio.load(article.content);
      const img = $('img').first();
      if (img.length > 0) {
        return img.attr('src');
      }
    }
    
    // 使用默认图片
    return this.getDefaultImage(article.category);
  }

  // 获取默认图片
  getDefaultImage(category) {
    const images = {
      recommend: 'https://via.placeholder.com/200x140/4CAF50/FFFFFF?text=推荐',
      news: 'https://via.placeholder.com/200x140/2196F3/FFFFFF?text=茶讯',
      art: 'https://via.placeholder.com/200x140/FF9800/FFFFFF?text=茶艺',
      hot: 'https://via.placeholder.com/200x140/F44336/FFFFFF?text=热点'
    };
    return images[category] || images.recommend;
  }

  // 采集RSS源
  async fetchRssSource(source, category) {
    for (let i = 0; i < this.config.maxRetries; i++) {
      try {
        this.log(`采集RSS: ${source.name} (第${i + 1}次尝试)`);
        
        const feed = await this.parser.parseURL(source.url);
        const articles = [];
        
        for (const item of feed.items.slice(0, 10)) {
          const image = await this.extractImage(item);
          const keywords = this.extractKeywords(item.title + ' ' + item.contentSnippet);
          
          const article = {
            id: this.generateId(),
            title: this.cleanText(item.title),
            description: this.cleanText(item.contentSnippet || item.content),
            link: item.link,
            pubDate: item.pubDate || new Date().toISOString(),
            image: image,
            source: source.name,
            category: category,
            tags: keywords,
            views: Math.floor(Math.random() * 1000) + 100,
            likes: Math.floor(Math.random() * 100) + 10,
            isLocal: false,
            quality: this.calculateQuality(item)
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
        await this.sleep(2000); // 等待2秒后重试
      }
    }
  }

  // 计算内容质量分数
  calculateQuality(article) {
    let score = 0;
    
    // 标题长度
    if (article.title && article.title.length > 10) score += 20;
    
    // 内容长度
    if (article.contentSnippet && article.contentSnippet.length > 50) score += 30;
    
    // 是否有图片
    if (article.enclosure && article.enclosure.url) score += 20;
    
    // 发布时间
    if (article.pubDate) {
      const pubDate = new Date(article.pubDate);
      const now = new Date();
      const diffDays = (now - pubDate) / (1000 * 60 * 60 * 24);
      if (diffDays <= 7) score += 30;
      else if (diffDays <= 30) score += 20;
      else if (diffDays <= 90) score += 10;
    }
    
    return Math.min(score, 100);
  }

  // 采集API数据
  async fetchApiData(apiUrl, params = {}) {
    try {
      const response = await axios.get(apiUrl, {
        params: params,
        timeout: this.config.timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      return response.data;
    } catch (error) {
      this.log(`API采集失败: ${apiUrl}, 错误: ${error.message}`, 'ERROR');
      return [];
    }
  }

  // 采集网站内容
  async fetchWebsiteContent(url) {
    try {
      const response = await axios.get(url, {
        timeout: this.config.timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const articles = [];
      
      $('.article, .news-item, .content-item').each((i, element) => {
        const title = $(element).find('h1, h2, h3, .title').first().text();
        const description = $(element).find('.summary, .description, p').first().text();
        const link = $(element).find('a').first().attr('href');
        const image = $(element).find('img').first().attr('src');
        
        if (title && link) {
          articles.push({
            id: this.generateId(),
            title: this.cleanText(title),
            description: this.cleanText(description),
            link: link.startsWith('http') ? link : new URL(link, url).href,
            image: image || this.getDefaultImage('news'),
            source: new URL(url).hostname,
            category: 'news',
            tags: this.extractKeywords(title + ' ' + description),
            views: Math.floor(Math.random() * 500) + 50,
            likes: Math.floor(Math.random() * 50) + 5,
            isLocal: false,
            quality: this.calculateQuality({ title, contentSnippet: description })
          });
        }
      });
      
      return articles;
    } catch (error) {
      this.log(`网站采集失败: ${url}, 错误: ${error.message}`, 'ERROR');
      return [];
    }
  }

  // 去重和排序
  deduplicateAndSort(articles) {
    const seen = new Set();
    const unique = articles.filter(article => {
      const key = article.title + article.link;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    
    // 按质量分数和发布时间排序
    return unique.sort((a, b) => {
      if (b.quality !== a.quality) {
        return b.quality - a.quality;
      }
      return new Date(b.pubDate) - new Date(a.pubDate);
    });
  }

  // 混合本地内容
  mixWithLocalContent(externalContent) {
    const localContent = {
      recommend: [
        {
          id: this.generateId(),
          title: '2024年春季茶叶市场深度分析报告',
          description: '基于大数据分析，深入解读2024年春季茶叶市场走势，涵盖绿茶、红茶、乌龙茶等主要品类，为茶商和投资者提供专业参考。',
          image: 'https://via.placeholder.com/200x140/4CAF50/FFFFFF?text=市场分析',
          pubDate: new Date().toISOString(),
          source: '茶叶一点通',
          category: 'recommend',
          tags: ['市场分析', '春季茶叶', '投资参考'],
          views: 1500,
          likes: 120,
          isLocal: true,
          quality: 95
        }
      ],
      news: [
        {
          id: this.generateId(),
          title: '最新茶叶行业政策解读与影响分析',
          description: '详细解读最新发布的茶叶行业政策，分析对茶农、茶商、消费者的具体影响，提供应对建议和发展方向。',
          image: 'https://via.placeholder.com/200x140/2196F3/FFFFFF?text=政策解读',
          pubDate: new Date().toISOString(),
          source: '茶叶一点通',
          category: 'news',
          tags: ['政策解读', '行业影响', '发展方向'],
          views: 2000,
          likes: 180,
          isLocal: true,
          quality: 90
        }
      ],
      art: [
        {
          id: this.generateId(),
          title: '茶艺表演艺术：从入门到精通的完整指南',
          description: '专业茶艺师分享茶艺表演的核心技巧，从基础动作到高级表演，包含详细步骤和注意事项。',
          image: 'https://via.placeholder.com/200x140/FF9800/FFFFFF?text=茶艺指南',
          pubDate: new Date().toISOString(),
          source: '茶叶一点通',
          category: 'art',
          tags: ['茶艺表演', '技巧指南', '专业培训'],
          views: 800,
          likes: 60,
          isLocal: true,
          quality: 85
        }
      ],
      hot: [
        {
          id: this.generateId(),
          title: '2024年茶叶行业十大热点事件盘点',
          description: '盘点2024年茶叶行业最具影响力的十大事件，分析其背后的原因和未来发展趋势。',
          image: 'https://via.placeholder.com/200x140/F44336/FFFFFF?text=热点盘点',
          pubDate: new Date().toISOString(),
          source: '茶叶一点通',
          category: 'hot',
          tags: ['热点事件', '行业盘点', '发展趋势'],
          views: 3000,
          likes: 250,
          isLocal: true,
          quality: 88
        }
      ]
    };
    
    // 混合内容，本地内容优先
    const mixedContent = {};
    for (const category of ['recommend', 'news', 'art', 'hot']) {
      const local = localContent[category] || [];
      const external = externalContent[category] || [];
      mixedContent[category] = [...local, ...external].slice(0, 25);
    }
    
    return mixedContent;
  }

  // 主采集函数
  async mainCrawler() {
    try {
      this.log('开始智能茶叶内容采集...');
      
      const allArticles = {};
      
      // 采集RSS内容
      for (const [category, sources] of Object.entries(this.sources.rss)) {
        this.log(`采集RSS栏目: ${category}`);
        const promises = sources.map(source => this.fetchRssSource(source, category));
        const results = await Promise.allSettled(promises);
        
        const articles = [];
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value) {
            articles.push(...result.value);
          }
        });
        
        allArticles[category] = this.deduplicateAndSort(articles);
        this.log(`RSS栏目完成: ${category}, ${allArticles[category].length}条`);
      }
      
      // 采集API数据（跳过，因为API可能不可用）
      this.log('跳过API采集（API可能不可用）');
      
      // 采集网站内容（跳过，因为网站可能不可用）
      this.log('跳过网站采集（网站可能不可用）');
      
      // 混合本地内容
      const finalContent = this.mixWithLocalContent(allArticles);
      
      // 确保输出目录存在
      if (!fs.existsSync(this.config.outputDir)) {
        fs.mkdirSync(this.config.outputDir, { recursive: true });
      }
      
      // 写入文件
      fs.writeFileSync(this.config.outputFile, JSON.stringify(finalContent, null, 2), 'utf-8');
      
      // 统计信息
      const stats = {
        timestamp: new Date().toISOString(),
        totalArticles: Object.values(finalContent).reduce((sum, articles) => sum + articles.length, 0),
        byCategory: Object.fromEntries(
          Object.entries(finalContent).map(([category, articles]) => [category, articles.length])
        ),
        averageQuality: Object.values(finalContent)
          .flat()
          .reduce((sum, article) => sum + (article.quality || 0), 0) / 
          Object.values(finalContent).flat().length
      };
      
      this.log(`采集完成! 统计: ${JSON.stringify(stats)}`);
      
    } catch (error) {
      this.log(`采集失败: ${error.message}`, 'ERROR');
    }
  }

  // 工具函数
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 创建采集器实例
const crawler = new SmartTeaCrawler();

// 定时任务：每天凌晨1点执行
schedule.scheduleJob('0 1 * * *', () => crawler.mainCrawler());

// 启动时立即执行一次
crawler.mainCrawler();

// 保持进程运行
process.on('SIGINT', () => {
  crawler.log('正在停止智能采集服务...');
  process.exit(0);
});

crawler.log('智能茶叶内容采集服务已启动'); 