// RSS解析工具
class RSSParser {
  constructor() {
    this.parser = null
    this.initParser()
  }

  // 初始化解析器
  async initParser() {
    try {
      // 这里可以引入第三方RSS解析库
      // 由于小程序限制，我们使用简化的解析方法
      console.log('RSS解析器初始化完成')
    } catch (error) {
      console.error('RSS解析器初始化失败:', error)
    }
  }

  // 解析RSS源
  async parseRSSFeed(feedUrl) {
    try {
      // 使用小程序网络请求获取RSS内容
      const response = await wx.request({
        url: feedUrl,
        method: 'GET',
        header: {
          'Content-Type': 'application/xml'
        },
        timeout: 10000
      })

      if (response.statusCode === 200) {
        return this.parseXMLContent(response.data)
      } else {
        throw new Error(`RSS请求失败: ${response.statusCode}`)
      }
    } catch (error) {
      console.error('解析RSS源失败:', error)
      return []
    }
  }

  // 解析XML内容
  parseXMLContent(xmlString) {
    try {
      const articles = []
      
      // 简化的XML解析（实际项目中建议使用专门的XML解析库）
      const itemMatches = xmlString.match(/<item>([\s\S]*?)<\/item>/g)
      
      if (itemMatches) {
        itemMatches.forEach(itemXml => {
          const article = this.extractArticleFromXML(itemXml)
          if (article) {
            articles.push(article)
          }
        })
      }
      
      return articles
    } catch (error) {
      console.error('XML解析失败:', error)
      return []
    }
  }

  // 从XML中提取文章信息
  extractArticleFromXML(itemXml) {
    try {
      const title = this.extractTagContent(itemXml, 'title')
      const description = this.extractTagContent(itemXml, 'description')
      const link = this.extractTagContent(itemXml, 'link')
      const pubDate = this.extractTagContent(itemXml, 'pubDate')
      const author = this.extractTagContent(itemXml, 'author') || 
                    this.extractTagContent(itemXml, 'dc:creator')
      
      if (!title || !link) {
        return null
      }

      return {
        title: this.cleanText(title),
        description: this.cleanText(description),
        url: link,
        publishTime: pubDate,
        author: this.cleanText(author),
        source: 'RSS订阅'
      }
    } catch (error) {
      console.error('提取文章信息失败:', error)
      return null
    }
  }

  // 提取标签内容
  extractTagContent(xml, tagName) {
    const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
    const match = xml.match(regex)
    return match ? match[1].trim() : null
  }

  // 清理文本内容
  cleanText(text) {
    if (!text) return ''
    
    // 移除HTML标签
    text = text.replace(/<[^>]*>/g, '')
    
    // 移除多余空白
    text = text.replace(/\s+/g, ' ').trim()
    
    // 解码HTML实体
    text = this.decodeHTMLEntities(text)
    
    return text
  }

  // 解码HTML实体
  decodeHTMLEntities(text) {
    const entities = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&nbsp;': ' '
    }
    
    return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, match => entities[match])
  }

  // 批量解析多个RSS源
  async parseMultipleFeeds(feedUrls) {
    const promises = feedUrls.map(url => this.parseRSSFeed(url))
    const results = await Promise.allSettled(promises)
    
    const allArticles = []
    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        allArticles.push(...result.value)
      }
    })
    
    return this.deduplicateAndSort(allArticles)
  }

  // 去重和排序
  deduplicateAndSort(articles) {
    const seen = new Set()
    const unique = articles.filter(article => {
      const key = article.title + article.url
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
    
    // 按发布时间排序
    return unique.sort((a, b) => {
      const dateA = new Date(a.publishTime)
      const dateB = new Date(b.publishTime)
      return dateB - dateA
    })
  }

  // 获取RSS源列表
  getRSSFeedList() {
    return [
      {
        name: '中国茶叶网',
        url: 'https://www.chinatea.com/rss.xml',
        category: 'news',
        description: '茶叶行业最新资讯'
      },
      {
        name: '茶艺网',
        url: 'https://www.tea-art.com/rss.xml',
        category: 'art',
        description: '茶艺文化知识'
      },
      {
        name: '茶叶市场网',
        url: 'https://www.tea-market.com/rss.xml',
        category: 'market',
        description: '茶叶市场行情'
      },
      {
        name: '茶文化网',
        url: 'https://www.tea-culture.com/rss.xml',
        category: 'culture',
        description: '茶文化深度文章'
      },
      {
        name: '茶叶科技网',
        url: 'https://www.tea-tech.com/rss.xml',
        category: 'tech',
        description: '茶叶科技资讯'
      }
    ]
  }

  // 根据分类获取RSS源
  getRSSFeedsByCategory(category) {
    const allFeeds = this.getRSSFeedList()
    return allFeeds.filter(feed => feed.category === category)
  }

  // 测试RSS源连接
  async testRSSFeed(feedUrl) {
    try {
      const startTime = Date.now()
      const articles = await this.parseRSSFeed(feedUrl)
      const endTime = Date.now()
      
      return {
        success: true,
        responseTime: endTime - startTime,
        articleCount: articles.length,
        sampleArticle: articles[0] || null
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

// 创建全局实例
const rssParser = new RSSParser()

module.exports = {
  rssParser,
  RSSParser
} 