// 湖南省茶叶市场数据
const hunanTeaMarkets = {
  // 省份信息
  province: {
    id: 15,
    name: '湖南省',
    marketCount: 67
  },

  // 市场数据
  markets: [
    // 长沙市
    { id: 1, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '神农茶都', address: '雨花区' },
    { id: 2, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '高桥大市场茶叶城', address: '雨花区' },
    { id: 3, provinceId: 15, province: '湖南省', city: '长沙市', district: '开福区', name: '长沙火车站茶城', address: '开福区' },
    { id: 4, provinceId: 15, province: '湖南省', city: '长沙市', district: '芙蓉区', name: '马王堆茶叶场', address: '芙蓉区' },
    { id: 5, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '南桥大市场茶叶食品城', address: '雨花区' },
    { id: 6, provinceId: 15, province: '湖南省', city: '长沙市', district: '天心区', name: '天心茶城', address: '天心区' },

    // 株洲市
    { id: 7, provinceId: 15, province: '湖南省', city: '株洲市', district: '河西区', name: '天同茶城', address: '河西区' },
    { id: 8, provinceId: 15, province: '湖南省', city: '株洲市', district: '荷塘区', name: '株洲茶叶市场', address: '荷塘区大坪路' },
    { id: 9, provinceId: 15, province: '湖南省', city: '株洲市', district: '市中心', name: '株洲市白市场', address: '市中心' },
    { id: 10, provinceId: 15, province: '湖南省', city: '株洲市', district: '芦淞区', name: '芦淞区株路茶叶市场', address: '芦淞区' },
    { id: 11, provinceId: 15, province: '湖南省', city: '株洲市', district: '天元区', name: '天元区茶叶市场', address: '天元区' },
    { id: 12, provinceId: 15, province: '湖南省', city: '株洲市', district: '荷塘区', name: '荷塘区新华西路八马茶业', address: '荷塘区' },

    // 湘潭市
    { id: 13, provinceId: 15, province: '湖南省', city: '湘潭市', district: '雨湖区', name: '湘潭茶叶批发交易市场', address: '雨湖区' },
    { id: 14, provinceId: 15, province: '湖南省', city: '湘潭市', district: '岳塘区', name: '湘潭工艺美术品市场茶叶专区', address: '岳塘区' },
    { id: 15, provinceId: 15, province: '湖南省', city: '韶山市', district: '韶山市', name: '韶山茶城', address: '韶山市' },
    { id: 16, provinceId: 15, province: '湖南省', city: '湘潭市', district: '湘潭县', name: '福茶叶场', address: '湘潭县' },
    { id: 17, provinceId: 15, province: '湖南省', city: '湘潭市', district: '湘潭市郊', name: '秀山茶叶场', address: '湘潭市郊' },

    // 衡阳市
    { id: 18, provinceId: 15, province: '湖南省', city: '衡阳市', district: '蒸湘区', name: '海通茶叶城', address: '蒸湘区' },
    { id: 19, provinceId: 15, province: '湖南省', city: '衡阳市', district: '石鼓区', name: '石鼓场茶叶区', address: '石鼓区' },
    { id: 20, provinceId: 15, province: '湖南省', city: '衡阳市', district: '蒸湘区', name: '蒸湘场茶叶区', address: '蒸湘区' },
    { id: 21, provinceId: 15, province: '湖南省', city: '衡阳市', district: '衡东县', name: '衡东县集贤滩', address: '衡东县' },

    // 邵阳市
    { id: 22, provinceId: 15, province: '湖南省', city: '邵阳市', district: '双清区', name: '金罗湾商贸城茶叶区', address: '双清区' },
    { id: 23, provinceId: 15, province: '湖南省', city: '邵阳市', district: '双清区', name: '得丰市场茶叶区', address: '双清区' },
    { id: 24, provinceId: 15, province: '湖南省', city: '邵阳市', district: '双清区', name: '湘西南大市场茶叶区', address: '双清区' },
    { id: 25, provinceId: 15, province: '湖南省', city: '邵阳市', district: '大祥区', name: '金家路茶叶集散点', address: '大祥区' },
    { id: 26, provinceId: 15, province: '湖南省', city: '邵阳市', district: '大祥区', name: '和茶馆', address: '大祥区' },

    // 岳阳市
    { id: 27, provinceId: 15, province: '湖南省', city: '岳阳市', district: '南湖新区', name: '岳阳茶博城', address: '南湖新区' },
    { id: 28, provinceId: 15, province: '湖南省', city: '岳阳市', district: '岳阳楼区', name: '梅溪桥茶叶市场', address: '岳阳楼区' },
    { id: 29, provinceId: 15, province: '湖南省', city: '岳阳市', district: '岳阳楼区', name: '君山区农产品场茶叶区', address: '岳阳楼区' },
    { id: 30, provinceId: 15, province: '湖南省', city: '岳阳市', district: '岳阳楼区', name: '建设路茶叶市场', address: '岳阳楼区' },

    // 常德市
    { id: 31, provinceId: 15, province: '湖南省', city: '常德市', district: '鼎城区', name: '桥南财富广场茶叶大市场', address: '鼎城区' },
    { id: 32, provinceId: 15, province: '湖南省', city: '常德市', district: '石门县', name: '石门茶叶场', address: '石门县' },
    { id: 33, provinceId: 15, province: '湖南省', city: '常德市', district: '汉寿县', name: '草铺茶叶市场', address: '汉寿县' },
    { id: 34, provinceId: 15, province: '湖南省', city: '常德市', district: '石门县', name: '湘北石门壶瓶山生态茶叶批发交易中心', address: '石门县' },
    { id: 35, provinceId: 15, province: '湖南省', city: '常德市', district: '古丈县', name: '古丈县"常德街"茶文化步行街', address: '古丈县' },
    { id: 36, provinceId: 15, province: '湖南省', city: '常德市', district: '武陵区', name: '武陵茶叶交易市场', address: '武陵区' },

    // 张家界市
    { id: 37, provinceId: 15, province: '湖南省', city: '张家界市', district: '永定区', name: '张家界市茶叶专业市场（大庸府城市场）', address: '永定区' },
    { id: 38, provinceId: 15, province: '湖南省', city: '张家界市', district: '永定区', name: '张家界市茶叶场（永定大道市场）', address: '永定区' },
    { id: 39, provinceId: 15, province: '湖南省', city: '张家界市', district: '武陵源区', name: '武陵源茶叶市场', address: '武陵源区' },
    { id: 40, provinceId: 15, province: '湖南省', city: '张家界市', district: '永定区', name: '奇峰市场茶叶批发区', address: '永定区' },
    { id: 41, provinceId: 15, province: '湖南省', city: '张家界市', district: '植县', name: '植县茶叶市场', address: '植县' },

    // 郴州市
    { id: 42, provinceId: 15, province: '湖南省', city: '郴州市', district: '北湖区', name: '郴州市茶叶场', address: '北湖区' },
    { id: 43, provinceId: 15, province: '湖南省', city: '郴州市', district: '北湖区', name: '北湖区恒隆茶叶批发部', address: '北湖区' },
    { id: 44, provinceId: 15, province: '湖南省', city: '郴州市', district: '桂东县', name: '清泉镇春茶交易市场', address: '桂东县' },

    // 益阳市
    { id: 45, provinceId: 15, province: '湖南省', city: '益阳市', district: '赫山区', name: '益阳茶业市场（中国黑茶文化城）', address: '赫山区' },
    { id: 46, provinceId: 15, province: '湖南省', city: '益阳市', district: '赫山区', name: '团洲蔬菜批发市场茶叶区', address: '赫山区' },
    { id: 47, provinceId: 15, province: '湖南省', city: '益阳市', district: '资阳区', name: '马良农副产品市场茶叶区', address: '资阳区' },

    // 永州市
    { id: 48, provinceId: 15, province: '湖南省', city: '永州市', district: '零陵区', name: '福田茶叶场', address: '零陵区' },

    // 怀化市
    { id: 49, provinceId: 15, province: '湖南省', city: '怀化市', district: '沅陵县', name: '沅陵茶叶交易市场', address: '沅陵县' },
    { id: 50, provinceId: 15, province: '湖南省', city: '怀化市', district: '鹤城区', name: '怀化市茶叶场', address: '鹤城区' },
    { id: 51, provinceId: 15, province: '湖南省', city: '怀化市', district: '荷塘区', name: '荷塘区茶叶市场', address: '荷塘区' },
    { id: 52, provinceId: 15, province: '湖南省', city: '怀化市', district: '芷江县', name: '侗乡茶城', address: '芷江县' },

    // 娄底市
    { id: 53, provinceId: 15, province: '湖南省', city: '娄底市', district: '娄星区', name: '娄底茶叶市场（长青街市场）', address: '娄星区' },
    { id: 54, provinceId: 15, province: '湖南省', city: '娄底市', district: '娄星区', name: '花泽大道茶叶场', address: '娄星区' },

    // 湘西土家族苗族自治州
    { id: 55, provinceId: 15, province: '湖南省', city: '湘西土家族苗族自治州', district: '沅陵县', name: '沅陵茶叶交易市场', address: '沅陵县' },
    { id: 56, provinceId: 15, province: '湖南省', city: '湘西土家族苗族自治州', district: '古丈县', name: '古丈春茶临时交易市场', address: '古丈县' },
    { id: 57, provinceId: 15, province: '湖南省', city: '湘西土家族苗族自治州', district: '保靖县', name: '保靖"马路茶市"', address: '保靖县' },
    { id: 58, provinceId: 15, province: '湖南省', city: '湘西土家族苗族自治州', district: '吉首市', name: '吉首隘口村鲜叶交易市场', address: '吉首市' },
    { id: 59, provinceId: 15, province: '湖南省', city: '湘西土家族苗族自治州', district: '芷江县', name: '侗乡茶城', address: '芷江县' }
  ],

  // 按城市分组的数据
  getMarketsByCity() {
    const grouped = {}
    
    this.markets.forEach(market => {
      const city = market.city
      if (!grouped[city]) {
        grouped[city] = []
      }
      grouped[city].push(market)
    })
    
    return grouped
  },

  // 按区县分组的数据
  getMarketsByDistrict() {
    const grouped = {}
    
    this.markets.forEach(market => {
      const city = market.city
      const district = market.district
      
      if (!grouped[city]) {
        grouped[city] = {}
      }
      
      if (!grouped[city][district]) {
        grouped[city][district] = []
      }
      
      grouped[city][district].push(market)
    })
    
    return grouped
  },

  // 获取统计信息
  getStats() {
    const cities = [...new Set(this.markets.map(market => market.city))]
    const districts = [...new Set(this.markets.map(market => market.district))]
    
    return {
      totalMarkets: this.markets.length,
      totalCities: cities.length,
      totalDistricts: districts.length,
      cities: cities,
      districts: districts
    }
  }
}

module.exports = hunanTeaMarkets 