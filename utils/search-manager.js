// 智能搜索管理器 - 升级版
class SearchManager {
  constructor() {
    this.historyKey = 'searchHistory'
    this.suggestionKey = 'searchSuggestions'
    this.analyticsKey = 'searchAnalytics'
    this.maxHistoryCount = 50
    this.maxSuggestionCount = 20
    this.searchCache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5分钟缓存
    
    // 语义搜索权重配置
    this.semanticWeights = {
      exact: 10,        // 精确匹配
      prefix: 8,        // 前缀匹配
      fuzzy: 6,         // 模糊匹配
      semantic: 4,      // 语义匹配
      pinyin: 3,        // 拼音匹配
      category: 2       // 分类匹配
    }
    
    // 拼音索引
    this.pinyinIndex = new Map()
    this.initPinyinIndex()
  }

  // 初始化拼音索引
  initPinyinIndex() {
    const pinyinMap = {
      '茶': 'cha',
      '叶': 'ye',
      '绿': 'lv',
      '红': 'hong',
      '乌': 'wu',
      '龙': 'long',
      '白': 'bai',
      '黄': 'huang',
      '黑': 'hei',
      '普': 'pu',
      '洱': 'er',
      '铁': 'tie',
      '观': 'guan',
      '音': 'yin',
      '龙': 'long',
      '井': 'jing',
      '碧': 'bi',
      '螺': 'luo',
      '春': 'chun',
      '毛': 'mao',
      '峰': 'feng',
      '大': 'da',
      '袍': 'pao',
      '银': 'yin',
      '针': 'zhen',
      '君': 'jun',
      '山': 'shan',
      '牡': 'mu',
      '丹': 'dan',
      '寿': 'shou',
      '眉': 'mei',
      '贡': 'gong',
      '眉': 'mei',
      '金': 'jin',
      '骏': 'jun',
      '眉': 'mei',
      '正': 'zheng',
      '山': 'shan',
      '小': 'xiao',
      '种': 'zhong',
      '祁': 'qi',
      '门': 'men',
      '滇': 'dian',
      '英': 'ying',
      '德': 'de',
      '坦': 'tan',
      '洋': 'yang',
      '工': 'gong',
      '夫': 'fu',
      '安': 'an',
      '化': 'hua',
      '六': 'liu',
      '堡': 'bao',
      '藏': 'cang',
      '砖': 'zhuan',
      '沱': 'tuo',
      '饼': 'bing',
      '散': 'san',
      '生': 'sheng',
      '熟': 'shu',
      '老': 'lao',
      '新': 'xin',
      '嫩': 'nen',
      '浓': 'nong',
      '淡': 'dan',
      '香': 'xiang',
      '甜': 'tian',
      '苦': 'ku',
      '涩': 'se',
      '回': 'hui',
      '甘': 'gan',
      '清': 'qing',
      '雅': 'ya',
      '醇': 'chun',
      '厚': 'hou',
      '滑': 'hua',
      '润': 'run',
      '爽': 'shuang',
      '鲜': 'xian',
      '活': 'huo',
      '韵': 'yun',
      '味': 'wei',
      '气': 'qi',
      '香': 'xiang',
      '型': 'xing',
      '条': 'tiao',
      '索': 'suo',
      '紧': 'jin',
      '结': 'jie',
      '匀': 'yun',
      '整': 'zheng',
      '净': 'jing',
      '色': 'se',
      '泽': 'ze',
      '油': 'you',
      '润': 'run',
      '显': 'xian',
      '毫': 'hao',
      '汤': 'tang',
      '明': 'ming',
      '亮': 'liang',
      '透': 'tou',
      '澈': 'che',
      '叶': 'ye',
      '底': 'di',
      '嫩': 'nen',
      '匀': 'yun',
      '亮': 'liang',
      '活': 'huo',
      '性': 'xing',
      '好': 'hao',
      '差': 'cha',
      '优': 'you',
      '劣': 'lie',
      '上': 'shang',
      '中': 'zhong',
      '下': 'xia',
      '特': 'te',
      '级': 'ji',
      '一': 'yi',
      '二': 'er',
      '三': 'san',
      '四': 'si',
      '五': 'wu',
      '六': 'liu',
      '七': 'qi',
      '八': 'ba',
      '九': 'jiu',
      '十': 'shi'
    }
    
    this.pinyinIndex = new Map(Object.entries(pinyinMap))
  }

  // 高级搜索执行
  async performSearch(keyword, options = {}) {
    if (!keyword || keyword.trim().length === 0) {
      throw new Error('搜索关键词不能为空')
    }

    const searchKeyword = keyword.trim()
    const searchId = this.generateSearchId(searchKeyword, options)
    
    try {
      // 检查缓存
      const cachedResult = this.getSearchCache(searchId)
      if (cachedResult) {
        console.log('🚀 使用搜索缓存:', searchKeyword)
        return cachedResult
      }

      // 记录搜索开始时间
      const startTime = Date.now()
      
      // 执行多维度搜索
      const results = await this.multiDimensionalSearch(searchKeyword, options)
      
      // 智能排序
      const sortedResults = this.intelligentSort(results, searchKeyword, options)
      
      // 搜索结果优化
      const optimizedResults = this.optimizeSearchResults(sortedResults, options)
      
      // 计算搜索耗时
      const searchTime = Date.now() - startTime
      
      // 构建搜索结果
      const searchResult = {
        success: true,
        keyword: searchKeyword,
        options: options,
        results: optimizedResults,
        total: optimizedResults.length,
        page: options.page || 1,
        pageSize: options.pageSize || 20,
        hasMore: optimizedResults.length >= (options.pageSize || 20),
        searchTime: searchTime,
        searchId: searchId,
        timestamp: Date.now()
      }
      
      // 缓存搜索结果
      this.setSearchCache(searchId, searchResult)
      
      // 记录搜索历史和分析
      this.recordSearchHistory(searchKeyword, options.type)
      this.recordSearchAnalytics(searchKeyword, optimizedResults.length, searchTime)
      
      // 更新搜索建议
      this.updateSearchSuggestions(searchKeyword)
      
      return searchResult

    } catch (error) {
      console.error('搜索执行失败:', error)
      throw error
    }
  }

  // 多维度搜索
  async multiDimensionalSearch(keyword, options) {
    const searchResults = []
    const searchMethods = [
      { method: 'exactSearch', weight: this.semanticWeights.exact },
      { method: 'prefixSearch', weight: this.semanticWeights.prefix },
      { method: 'fuzzySearch', weight: this.semanticWeights.fuzzy },
      { method: 'semanticSearch', weight: this.semanticWeights.semantic },
      { method: 'pinyinSearch', weight: this.semanticWeights.pinyin },
      { method: 'categorySearch', weight: this.semanticWeights.category }
    ]

    for (const { method, weight } of searchMethods) {
      try {
        const results = await this[method](keyword, options)
        results.forEach(result => {
          result.searchScore = (result.searchScore || 0) + weight
          result.searchMethod = method
        })
        searchResults.push(...results)
      } catch (error) {
        console.warn(`搜索方法 ${method} 失败:`, error)
      }
    }

    // 去重和合并结果
    return this.deduplicateResults(searchResults)
  }

  // 精确匹配搜索
  async exactSearch(keyword, options) {
    const results = []
    const lowerKeyword = keyword.toLowerCase()
    
    // 搜索各类数据
    const searchTargets = await this.getSearchTargets(options)
    
    searchTargets.forEach(target => {
      target.items.forEach(item => {
        const score = this.calculateExactMatchScore(item, lowerKeyword)
        if (score > 0) {
          results.push({
            ...item,
            type: target.type,
            searchScore: score,
            matchType: 'exact'
          })
        }
      })
    })
    
    return results
  }

  // 前缀匹配搜索
  async prefixSearch(keyword, options) {
    const results = []
    const lowerKeyword = keyword.toLowerCase()
    
    const searchTargets = await this.getSearchTargets(options)
    
    searchTargets.forEach(target => {
      target.items.forEach(item => {
        const score = this.calculatePrefixMatchScore(item, lowerKeyword)
        if (score > 0) {
          results.push({
            ...item,
            type: target.type,
            searchScore: score,
            matchType: 'prefix'
          })
        }
      })
    })
    
    return results
  }

  // 模糊匹配搜索
  async fuzzySearch(keyword, options) {
    const results = []
    const lowerKeyword = keyword.toLowerCase()
    
    const searchTargets = await this.getSearchTargets(options)
    
    searchTargets.forEach(target => {
      target.items.forEach(item => {
        const score = this.calculateFuzzyMatchScore(item, lowerKeyword)
        if (score > 0) {
          results.push({
            ...item,
            type: target.type,
            searchScore: score,
            matchType: 'fuzzy'
          })
        }
      })
    })
    
    return results
  }

  // 语义搜索
  async semanticSearch(keyword, options) {
    const results = []
    const semanticKeywords = this.expandSemanticKeywords(keyword)
    
    const searchTargets = await this.getSearchTargets(options)
    
    searchTargets.forEach(target => {
      target.items.forEach(item => {
        const score = this.calculateSemanticMatchScore(item, semanticKeywords)
        if (score > 0) {
          results.push({
            ...item,
            type: target.type,
            searchScore: score,
            matchType: 'semantic'
          })
        }
      })
    })
    
    return results
  }

  // 拼音搜索
  async pinyinSearch(keyword, options) {
    const results = []
    const pinyinKeyword = this.convertToPinyin(keyword)
    
    const searchTargets = await this.getSearchTargets(options)
    
    searchTargets.forEach(target => {
      target.items.forEach(item => {
        const score = this.calculatePinyinMatchScore(item, pinyinKeyword)
        if (score > 0) {
          results.push({
            ...item,
            type: target.type,
            searchScore: score,
            matchType: 'pinyin'
          })
        }
      })
    })
    
    return results
  }

  // 分类搜索
  async categorySearch(keyword, options) {
    const results = []
    const categoryKeywords = this.expandCategoryKeywords(keyword)
    
    const searchTargets = await this.getSearchTargets(options)
    
    searchTargets.forEach(target => {
      target.items.forEach(item => {
        const score = this.calculateCategoryMatchScore(item, categoryKeywords)
        if (score > 0) {
          results.push({
            ...item,
            type: target.type,
            searchScore: score,
            matchType: 'category'
          })
        }
      })
    })
    
    return results
  }

  // 获取搜索目标数据
  async getSearchTargets(options) {
    const targets = []
    const app = getApp()
    
    // 根据搜索类型确定搜索范围
    if (!options.type || options.type === 'all' || options.type === 'markets') {
      targets.push({
        type: 'markets',
        items: app.globalData.marketsData || []
      })
    }
    
    if (!options.type || options.type === 'all' || options.type === 'supplies') {
      targets.push({
        type: 'supplies',
        items: app.globalData.suppliesData || []
      })
    }
    
    if (!options.type || options.type === 'all' || options.type === 'newarrivals') {
      targets.push({
        type: 'newarrivals',
        items: app.globalData.newarrivalsData || []
      })
    }
    
    if (!options.type || options.type === 'all' || options.type === 'clearance') {
      targets.push({
        type: 'clearance',
        items: app.globalData.clearanceData || []
      })
    }
    
    return targets
  }

  // 计算精确匹配分数
  calculateExactMatchScore(item, keyword) {
    const searchableFields = this.getSearchableFields(item)
    let maxScore = 0
    
    searchableFields.forEach(field => {
      if (field && field.toLowerCase() === keyword) {
        maxScore = Math.max(maxScore, 100)
      } else if (field && field.toLowerCase().includes(keyword)) {
        maxScore = Math.max(maxScore, 80)
      }
    })
    
    return maxScore
  }

  // 计算前缀匹配分数
  calculatePrefixMatchScore(item, keyword) {
    const searchableFields = this.getSearchableFields(item)
    let maxScore = 0
    
    searchableFields.forEach(field => {
      if (field && field.toLowerCase().startsWith(keyword)) {
        maxScore = Math.max(maxScore, 90)
      }
    })
    
    return maxScore
  }

  // 计算模糊匹配分数
  calculateFuzzyMatchScore(item, keyword) {
    const searchableFields = this.getSearchableFields(item)
    let maxScore = 0
    
    searchableFields.forEach(field => {
      if (field) {
        const similarity = this.calculateStringSimilarity(field.toLowerCase(), keyword)
        if (similarity > 0.6) {
          maxScore = Math.max(maxScore, Math.floor(similarity * 70))
        }
      }
    })
    
    return maxScore
  }

  // 计算语义匹配分数
  calculateSemanticMatchScore(item, semanticKeywords) {
    const searchableFields = this.getSearchableFields(item)
    let maxScore = 0
    
    searchableFields.forEach(field => {
      if (field) {
        const lowerField = field.toLowerCase()
        semanticKeywords.forEach(keyword => {
          if (lowerField.includes(keyword)) {
            maxScore = Math.max(maxScore, 60)
          }
        })
      }
    })
    
    return maxScore
  }

  // 计算拼音匹配分数
  calculatePinyinMatchScore(item, pinyinKeyword) {
    const searchableFields = this.getSearchableFields(item)
    let maxScore = 0
    
    searchableFields.forEach(field => {
      if (field) {
        const fieldPinyin = this.convertToPinyin(field)
        if (fieldPinyin.includes(pinyinKeyword)) {
          maxScore = Math.max(maxScore, 50)
        }
      }
    })
    
    return maxScore
  }

  // 计算分类匹配分数
  calculateCategoryMatchScore(item, categoryKeywords) {
    const category = item.category || item.type || ''
    let maxScore = 0
    
    categoryKeywords.forEach(keyword => {
      if (category.toLowerCase().includes(keyword)) {
        maxScore = Math.max(maxScore, 40)
      }
    })
    
    return maxScore
  }

  // 获取可搜索字段
  getSearchableFields(item) {
    const fields = []
    
    // 通用字段
    if (item.name) fields.push(item.name)
    if (item.title) fields.push(item.title)
    if (item.description) fields.push(item.description)
    if (item.category) fields.push(item.category)
    if (item.tags) fields.push(...item.tags)
    
    // 特殊字段
    if (item.address) fields.push(item.address)
    if (item.city) fields.push(item.city)
    if (item.province) fields.push(item.province)
    if (item.district) fields.push(item.district)
    if (item.contact) fields.push(item.contact)
    if (item.brand) fields.push(item.brand)
    if (item.origin) fields.push(item.origin)
    if (item.specification) fields.push(item.specification)
    
    return fields.filter(field => field && typeof field === 'string')
  }

  // 扩展语义关键词
  expandSemanticKeywords(keyword) {
    const semanticMap = {
      '茶': ['茶叶', '茶品', '茶类'],
      '绿茶': ['绿茶'],
      '红茶': ['红茶', '祁门', '滇红', '金骏眉', '正山小种', '工夫茶'],
      '乌龙茶': ['乌龙茶', '铁观音', '大红袍', '肉桂', '水仙', '单丛'],
      '白茶': ['白茶', '白毫银针', '白牡丹', '寿眉', '贡眉'],
      '黑茶': ['黑茶', '普洱', '安化黑茶', '六堡茶', '藏茶'],
      '黄茶': ['黄茶', '君山银针', '蒙顶黄芽', '霍山黄芽'],
      '花茶': ['花茶', '茉莉花茶', '玫瑰花茶', '桂花茶'],
      '便宜': ['低价', '特价', '优惠', '打折', '清仓'],
      '贵': ['高价', '精品', '高档', '奢侈'],
      '新': ['新品', '新茶', '今年', '当季'],
      '老': ['老茶', '陈茶', '年份茶', 'vintage']
    }
    
    const keywords = [keyword.toLowerCase()]
    
    // 添加语义相关词
    Object.entries(semanticMap).forEach(([key, values]) => {
      if (keyword.includes(key)) {
        keywords.push(...values.map(v => v.toLowerCase()))
      }
    })
    
    return [...new Set(keywords)]
  }

  // 扩展分类关键词
  expandCategoryKeywords(keyword) {
    const categoryMap = {
      '茶叶': ['绿茶', '红茶', '乌龙茶', '白茶', '黑茶', '黄茶'],
      '茶具': ['茶壶', '茶杯', '茶盘', '茶道具'],
      '茶食': ['茶点', '茶食品', '茶配菜'],
      '茶园': ['茶山', '茶基地', '茶场'],
      '市场': ['批发市场', '茶叶市场', '交易市场']
    }
    
    const keywords = [keyword.toLowerCase()]
    
    Object.entries(categoryMap).forEach(([key, values]) => {
      if (keyword.includes(key)) {
        keywords.push(...values.map(v => v.toLowerCase()))
      }
    })
    
    return [...new Set(keywords)]
  }

  // 转换为拼音
  convertToPinyin(text) {
    if (!text) return ''
    
    let pinyin = ''
    for (let char of text) {
      if (this.pinyinIndex.has(char)) {
        pinyin += this.pinyinIndex.get(char)
      } else {
        pinyin += char.toLowerCase()
      }
    }
    
    return pinyin
  }

  // 计算字符串相似度
  calculateStringSimilarity(str1, str2) {
    const len1 = str1.length
    const len2 = str2.length
    
    if (len1 === 0) return len2 === 0 ? 1 : 0
    if (len2 === 0) return 0
    
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null))
    
    for (let i = 0; i <= len1; i++) {
      matrix[i][0] = i
    }
    
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j
    }
    
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,        // deletion
          matrix[i][j - 1] + 1,        // insertion
          matrix[i - 1][j - 1] + indicator  // substitution
        )
      }
    }
    
    const distance = matrix[len1][len2]
    return 1 - distance / Math.max(len1, len2)
  }

  // 智能排序
  intelligentSort(results, keyword, options) {
    return results.sort((a, b) => {
      // 按搜索分数排序
      if (a.searchScore !== b.searchScore) {
        return b.searchScore - a.searchScore
      }
      
      // 按匹配类型排序
      const matchTypeOrder = ['exact', 'prefix', 'fuzzy', 'semantic', 'pinyin', 'category']
      const aIndex = matchTypeOrder.indexOf(a.matchType)
      const bIndex = matchTypeOrder.indexOf(b.matchType)
      if (aIndex !== bIndex) {
        return aIndex - bIndex
      }
      
      // 按其他因素排序
      return this.calculateRelevanceScore(b, keyword, options) - 
             this.calculateRelevanceScore(a, keyword, options)
    })
  }

  // 计算相关性分数
  calculateRelevanceScore(item, keyword, options) {
    let score = 0
    
    // 时间因素
    if (item.createTime || item.publishTime) {
      const time = new Date(item.createTime || item.publishTime)
      const now = new Date()
      const daysDiff = (now - time) / (1000 * 60 * 60 * 24)
      score += Math.max(0, 30 - daysDiff) // 新内容优先
    }
    
    // 热度因素
    if (item.views) {
      score += Math.min(item.views / 100, 20)
    }
    
    // 评分因素
    if (item.rating) {
      score += item.rating * 2
    }
    
    // 收藏因素
    if (item.favorites) {
      score += Math.min(item.favorites / 10, 10)
    }
    
    // 价格因素（价格区间匹配）
    if (options.priceRange && item.price) {
      const [min, max] = options.priceRange
      if (item.price >= min && item.price <= max) {
        score += 15
      }
    }
    
    // 地理因素
    if (options.province && item.province === options.province) {
      score += 10
    }
    
    return score
  }

  // 优化搜索结果
  optimizeSearchResults(results, options) {
    const page = options.page || 1
    const pageSize = options.pageSize || 20
    const startIndex = (page - 1) * pageSize
    
    // 分页
    const paginatedResults = results.slice(startIndex, startIndex + pageSize)
    
    // 结果增强
    return paginatedResults.map(result => ({
      ...result,
      searchHighlight: this.generateSearchHighlight(result, options.keyword),
      relevanceScore: this.calculateRelevanceScore(result, options.keyword, options)
    }))
  }

  // 生成搜索高亮
  generateSearchHighlight(item, keyword) {
    const highlights = []
    const fields = this.getSearchableFields(item)
    
    fields.forEach(field => {
      if (field && field.toLowerCase().includes(keyword.toLowerCase())) {
        const regex = new RegExp(`(${keyword})`, 'gi')
        const highlighted = field.replace(regex, '<mark>$1</mark>')
        highlights.push(highlighted)
      }
    })
    
    return highlights.slice(0, 3) // 只返回前3个高亮
  }

  // 去重结果
  deduplicateResults(results) {
    const seen = new Set()
    const deduped = []
    
    results.forEach(result => {
      const key = `${result.type}_${result.id || result.name}`
      if (!seen.has(key)) {
        seen.add(key)
        deduped.push(result)
      } else {
        // 合并搜索分数
        const existing = deduped.find(item => 
          `${item.type}_${item.id || item.name}` === key
        )
        if (existing) {
          existing.searchScore = Math.max(existing.searchScore, result.searchScore)
        }
      }
    })
    
    return deduped
  }

  // 生成搜索ID
  generateSearchId(keyword, options) {
    const optionsStr = JSON.stringify(options)
    return `search_${keyword}_${optionsStr}`.replace(/[^a-zA-Z0-9_]/g, '_')
  }

  // 搜索缓存管理
  getSearchCache(searchId) {
    const cached = this.searchCache.get(searchId)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }
    return null
  }

  setSearchCache(searchId, data) {
    this.searchCache.set(searchId, {
      data,
      timestamp: Date.now()
    })
    
    // 清理过期缓存
    if (this.searchCache.size > 100) {
      this.cleanupSearchCache()
    }
  }

  cleanupSearchCache() {
    const now = Date.now()
    for (const [key, value] of this.searchCache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.searchCache.delete(key)
      }
    }
  }

  // 记录搜索分析
  recordSearchAnalytics(keyword, resultCount, searchTime) {
    try {
      const analytics = wx.getStorageSync(this.analyticsKey) || []
      analytics.push({
        keyword,
        resultCount,
        searchTime,
        timestamp: new Date().toISOString()
      })
      
      // 只保留最近1000条记录
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000)
      }
      
      wx.setStorageSync(this.analyticsKey, analytics)
    } catch (error) {
      console.error('记录搜索分析失败:', error)
    }
  }

  // 获取搜索分析
  getSearchAnalytics() {
    try {
      const analytics = wx.getStorageSync(this.analyticsKey) || []
      
      // 计算统计信息
      const totalSearches = analytics.length
      const avgSearchTime = analytics.reduce((sum, item) => sum + item.searchTime, 0) / totalSearches
      const avgResults = analytics.reduce((sum, item) => sum + item.resultCount, 0) / totalSearches
      
      // 热门搜索词
      const keywordCount = {}
      analytics.forEach(item => {
        keywordCount[item.keyword] = (keywordCount[item.keyword] || 0) + 1
      })
      
      const hotKeywords = Object.entries(keywordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([keyword, count]) => ({ keyword, count }))
      
      return {
        totalSearches,
        avgSearchTime: Math.round(avgSearchTime),
        avgResults: Math.round(avgResults),
        hotKeywords,
        recentSearches: analytics.slice(-20)
      }
    } catch (error) {
      console.error('获取搜索分析失败:', error)
      return {
        totalSearches: 0,
        avgSearchTime: 0,
        avgResults: 0,
        hotKeywords: [],
        recentSearches: []
      }
    }
  }

  // 智能搜索建议
  getSmartSuggestions(context = {}) {
    try {
      const suggestions = wx.getStorageSync(this.suggestionKey) || []
      const history = this.getSearchHistory()
      const analytics = this.getSearchAnalytics()
      
      // 基于历史的建议
      const historySuggestions = history.slice(0, 5).map(h => ({
        text: h.keyword,
        type: 'history',
        icon: '🕒',
        description: `${h.resultCount || 0}个结果`
      }))
      
      // 基于热门的建议
      const hotSuggestions = analytics.hotKeywords.slice(0, 5).map(h => ({
        text: h.keyword,
        type: 'hot',
        icon: '🔥',
        description: `${h.count}次搜索`
      }))
      
      // 基于上下文的建议
      const contextSuggestions = this.getContextualSuggestions(context)
      
      // 合并和去重
      const allSuggestions = [
        ...contextSuggestions,
        ...historySuggestions,
        ...hotSuggestions
      ]
      
      const uniqueSuggestions = allSuggestions.filter((item, index, self) => 
        index === self.findIndex(t => t.text === item.text)
      )
      
      return uniqueSuggestions.slice(0, 8)
    } catch (error) {
      console.error('获取智能建议失败:', error)
      return []
    }
  }

  // 获取上下文建议
  getContextualSuggestions(context) {
    const suggestions = []
    
    // 基于页面类型的建议
    if (context.page === 'market') {
      suggestions.push(
        { text: '茶叶批发市场', type: 'context', icon: '🏪', description: '市场搜索' },
        { text: '绿茶', type: 'context', icon: '🍃', description: '热门品类' },
        { text: '红茶', type: 'context', icon: '🍵', description: '热门品类' }
      )
    }
    
    // 基于地理位置的建议
    if (context.province) {
      suggestions.push({
        text: `${context.province}茶叶`,
        type: 'location',
        icon: '📍',
        description: '本地茶叶'
      })
    }
    
    // 基于时间的建议
    const now = new Date()
    const season = this.getCurrentSeason(now)
    const seasonalTeas = this.getSeasonalTeas(season)
    
    seasonalTeas.forEach(tea => {
      suggestions.push({
        text: tea,
        type: 'seasonal',
        icon: '🌿',
        description: `${season}季推荐`
      })
    })
    
    return suggestions
  }

  // 获取当前季节
  getCurrentSeason(date) {
    const month = date.getMonth() + 1
    if (month >= 3 && month <= 5) return '春'
    if (month >= 6 && month <= 8) return '夏'
    if (month >= 9 && month <= 11) return '秋'
    return '冬'
  }

  // 获取季节性茶叶
  getSeasonalTeas(season) {
    const seasonalMap = {
      '春': ['明前茶'],
      '夏': ['绿茶', '白茶', '花茶', '冷泡茶'],
      '秋': ['乌龙茶', '铁观音', '大红袍', '岩茶'],
      '冬': ['红茶', '普洱', '黑茶', '暖胃茶']
    }
    
    return seasonalMap[season] || []
  }

  // 获取搜索建议
  getSearchSuggestions(partial = '') {
    try {
      const suggestions = wx.getStorageSync(this.suggestionKey) || []
      const history = this.getSearchHistory()
      
      // 合并建议和历史记录
      const combined = [...suggestions, ...history.map(h => h.keyword)]
      
      // 去重
      const unique = [...new Set(combined)]
      
      // 根据输入过滤
      if (partial.trim()) {
        const filtered = unique.filter(suggestion => 
          suggestion.toLowerCase().includes(partial.toLowerCase())
        )
        return filtered.slice(0, this.maxSuggestionCount)
      }
      
      return unique.slice(0, this.maxSuggestionCount)
      
    } catch (error) {
      console.error('获取搜索建议失败:', error)
      return []
    }
  }

  // 获取热门搜索
  getHotSearches() {
    return [
      '铁观音', '普洱茶', '大红袍',
      '白毫银针', '金骏眉', '六安瓜片', '祁门红茶', '安吉白茶'
    ]
  }

  // 添加搜索历史
  addSearchHistory(keyword, type = 'all') {
    try {
      const history = this.getSearchHistory()
      
      // 移除重复项
      const filteredHistory = history.filter(item => item.keyword !== keyword)
      
      // 添加新记录到开头
      filteredHistory.unshift({
        keyword,
        type,
        timestamp: new Date().toISOString(),
        count: 1
      })
      
      // 限制记录数量
      if (filteredHistory.length > this.maxHistoryCount) {
        filteredHistory.splice(this.maxHistoryCount)
      }
      
      wx.setStorageSync(this.historyKey, filteredHistory)
      
    } catch (error) {
      console.error('添加搜索历史失败:', error)
    }
  }

  // 获取搜索历史
  getSearchHistory() {
    try {
      return wx.getStorageSync(this.historyKey) || []
    } catch (error) {
      console.error('获取搜索历史失败:', error)
      return []
    }
  }

  // 清除搜索历史
  clearSearchHistory() {
    try {
      wx.removeStorageSync(this.historyKey)
      wx.showToast({
        title: '历史记录已清除',
        icon: 'success'
      })
    } catch (error) {
      console.error('清除搜索历史失败:', error)
      wx.showToast({
        title: '清除失败',
        icon: 'error'
      })
    }
  }

  // 删除单条历史记录
  deleteSearchHistory(keyword) {
    try {
      const history = this.getSearchHistory()
      const filteredHistory = history.filter(item => item.keyword !== keyword)
      wx.setStorageSync(this.historyKey, filteredHistory)
    } catch (error) {
      console.error('删除搜索历史失败:', error)
    }
  }

  // 更新搜索建议
  updateSearchSuggestions(keyword) {
    try {
      const suggestions = wx.getStorageSync(this.suggestionKey) || []
      
      if (!suggestions.includes(keyword)) {
        suggestions.unshift(keyword)
        
        // 限制数量
        if (suggestions.length > this.maxSuggestionCount) {
          suggestions.splice(this.maxSuggestionCount)
        }
        
        wx.setStorageSync(this.suggestionKey, suggestions)
      }
    } catch (error) {
      console.error('更新搜索建议失败:', error)
    }
  }
}

// 创建全局搜索管理器实例
const searchManager = new SearchManager()

// 导出便捷方法
const Search = {
  // 高级搜索
  async search(keyword, options = {}) {
    return searchManager.performSearch(keyword, options)
  },

  // 获取智能建议
  getSmartSuggestions(context = {}) {
    return searchManager.getSmartSuggestions(context)
  },

  // 获取搜索建议
  getSuggestions(partial = '') {
    return searchManager.getSearchSuggestions(partial)
  },

  // 获取热门搜索
  getHotSearches() {
    return searchManager.getHotSearches()
  },

  // 获取搜索历史
  getHistory() {
    return searchManager.getSearchHistory()
  },

  // 清除历史
  clearHistory() {
    return searchManager.clearSearchHistory()
  },

  // 删除单条历史
  deleteHistory(keyword) {
    return searchManager.deleteSearchHistory(keyword)
  },

  // 获取搜索统计
  getAnalytics() {
    return searchManager.getSearchAnalytics()
  },

  // 清理缓存
  clearCache() {
    return searchManager.cleanupSearchCache()
  }
}

module.exports = {
  SearchManager,
  Search,
  searchManager
} 