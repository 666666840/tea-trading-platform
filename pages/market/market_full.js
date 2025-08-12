Page({
  data: {
    // 当前选中的分类类型
    currentType: 'geographic', // 'geographic' | 'famous'
    
    // 入驻相关
    showJoinModal: false,
    joinForm: {
      merchantName: '',
      contactName: '',
      phone: '',
      wechat: '',
      businessType: '',
      mainCategory: '',
      description: '',
      license: '',
      // 市场选择相关
      provinceList: [],
      cityList: [],
      districtList: [],
      marketList: [],
      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null,
      selectedMarket: null
    },
    
    // 经营类型选项
    businessTypes: [
      '茶厂',
      '茶园', 
      '一级批发商',
      '品牌总代',
      '区域分销商',
      '源头供应商',
      '零售商'
    ],
    
    // 主营品类选项
    mainCategories: [
      '绿茶类',
      '白茶类', 
      '黄茶类',
      '青茶（乌龙茶）类',
      '红茶类',
      '黑茶类',
      '花茶类'
    ],
    
    // 地理大区数据
    geographicData: {
      provinces: [
        {
          id: 'beijing',
          name: '北京市',
          cities: [
            {
              id: 'beijing_city',
              name: '北京市',
              districts: [
                {
                  id: 'xicheng',
                  name: '西城区',
                  markets: [
                    {
                      id: 'maliandao_tea_street',
                      name: '马连道茶叶街',
                      location: '北京市西城区',
                      merchantCount: 800,
                      address: '北京市西城区马连道路',
                      description: '北京地区最大的茶叶交易中心，全国知名的茶叶批发集散地'
                    },
                    {
                      id: 'tea_market_street',
                      name: '茶市街',
                      location: '北京市西城区',
                      merchantCount: 150,
                      address: '北京市西城区茶市街',
                      description: '西城区传统茶叶交易街'
                    },
                    {
                      id: 'zhuangshengfeng_tea_city',
                      name: '庄胜峰茶城',
                      location: '北京市西城区',
                      merchantCount: 120,
                      address: '北京市西城区庄胜峰',
                      description: '庄胜峰地区茶叶交易中心'
                    },
                    {
                      id: 'fuchengmen_market',
                      name: '阜成门市场',
                      location: '北京市西城区',
                      merchantCount: 200,
                      address: '北京市西城区阜成门',
                      description: '阜成门地区综合性市场，包含茶叶交易区'
                    }
                  ]
                },
                {
                  id: 'chaoyang',
                  name: '朝阳区',
                  markets: [
                    {
                      id: 'sijichun_tea_city',
                      name: '四季春茶城',
                      location: '北京市朝阳区',
                      merchantCount: 180,
                      address: '北京市朝阳区四季春',
                      description: '朝阳区主要茶叶交易中心'
                    },
                    {
                      id: 'chaoyang_tea_city',
                      name: '朝阳茶叶城',
                      location: '北京市朝阳区',
                      merchantCount: 160,
                      address: '北京市朝阳区',
                      description: '朝阳区综合性茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'fengtai',
                  name: '丰台区',
                  markets: [
                    {
                      id: 'beijing_agricultural_central',
                      name: '北京农产品中央批发市场（茶叶交易区）',
                      location: '北京市丰台区',
                      merchantCount: 250,
                      address: '北京市丰台区农产品中央批发市场',
                      description: '北京市规模最大的农产品批发市场，包含专业茶叶交易区'
                    },
                    {
                      id: 'xinfadi_agricultural',
                      name: '新发地农产品批发市场（茶叶区）',
                      location: '北京市丰台区',
                      merchantCount: 180,
                      address: '北京市丰台区新发地农产品批发市场',
                      description: '新发地市场茶叶交易专区'
                    }
                  ]
                },
                {
                  id: 'shunyi',
                  name: '顺义区',
                  markets: [
                    {
                      id: 'shunyi_maliandao_tea_field',
                      name: '顺义马连道茶叶场',
                      location: '北京市顺义区',
                      merchantCount: 100,
                      address: '北京市顺义区马连道',
                      description: '顺义区马连道茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'dongcheng',
                  name: '东城区',
                  markets: [
                    {
                      id: 'wangfujing_commercial',
                      name: '王府井商业街（含吴裕泰、张一元店铺）',
                      location: '北京市东城区',
                      merchantCount: 300,
                      address: '北京市东城区王府井大街',
                      description: '王府井商业街知名茶叶品牌店铺集中地，包括吴裕泰、张一元等老字号'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'fujian',
          name: '福建省',
          cities: [
            {
              id: 'fuzhou',
              name: '福州市',
              districts: [
                {
                  id: 'jinan',
                  name: '晋安区',
                  markets: [
                    {
                      id: 'wuliting_tea_market',
                      name: '五里亭茶叶市场（新茶城）',
                      location: '福建省福州市晋安区',
                      merchantCount: 200,
                      address: '福州市晋安区五里亭',
                      description: '福州市主要茶叶批发市场，新茶城'
                    },
                    {
                      id: 'haixia_tea_city',
                      name: '海峡茶叶城',
                      location: '福建省福州市晋安区',
                      merchantCount: 180,
                      address: '福州市晋安区',
                      description: '海峡茶叶交易中心'
                    },
                    {
                      id: 'guangminggang_tea_field',
                      name: '光明港茶叶场',
                      location: '福建省福州市晋安区',
                      merchantCount: 150,
                      address: '福州市晋安区光明港',
                      description: '光明港地区茶叶交易市场'
                    },
                    {
                      id: 'mindu_tea_city',
                      name: '闽都茶叶城',
                      location: '福建省福州市晋安区福新路',
                      merchantCount: 120,
                      address: '福州市晋安区福新路',
                      description: '闽都茶叶城，福新路茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'cangshan',
                  name: '仓山区',
                  markets: [
                    {
                      id: 'jinshan_tea_city',
                      name: '金山茶叶城',
                      location: '福建省福州市仓山区',
                      merchantCount: 160,
                      address: '福州市仓山区金山',
                      description: '金山地区茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'gulou',
                  name: '鼓楼区',
                  markets: [
                    {
                      id: 'gulou_tea_market',
                      name: '鼓楼茶叶市场',
                      location: '福建省福州市鼓楼区',
                      merchantCount: 140,
                      address: '福州市鼓楼区',
                      description: '鼓楼区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'taijiang',
                  name: '台江区',
                  markets: [
                    {
                      id: 'taijiang_tea_market',
                      name: '台江茶叶市场',
                      location: '福建省福州市台江区',
                      merchantCount: 130,
                      address: '福州市台江区',
                      description: '台江区茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'xiamen',
              name: '厦门市',
              districts: [
                {
                  id: 'huli',
                  name: '湖里区',
                  markets: [
                    {
                      id: 'tiancheng_tea_market',
                      name: '天成茶叶市场',
                      location: '福建省厦门市湖里区',
                      merchantCount: 180,
                      address: '厦门市湖里区',
                      description: '湖里区主要茶叶交易市场'
                    },
                    {
                      id: 'huli_tea_field',
                      name: '湖里茶叶场',
                      location: '福建省厦门市湖里区',
                      merchantCount: 150,
                      address: '厦门市湖里区',
                      description: '湖里区茶叶交易场'
                    },
                    {
                      id: 'huangyan_international_tea_city',
                      name: '黄岩国际茶城',
                      location: '福建省厦门市湖里区',
                      merchantCount: 200,
                      address: '厦门市湖里区',
                      description: '黄岩国际茶城，国际化茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'siming',
                  name: '思明区',
                  markets: [
                    {
                      id: 'siming_tea_market',
                      name: '思明茶叶市场',
                      location: '福建省厦门市思明区',
                      merchantCount: 160,
                      address: '厦门市思明区',
                      description: '思明区茶叶交易市场'
                    },
                    {
                      id: 'haixia_tea_capital',
                      name: '海峡茶都',
                      location: '福建省厦门市思明区',
                      merchantCount: 220,
                      address: '厦门市思明区',
                      description: '海峡茶都，综合性茶叶交易中心'
                    },
                    {
                      id: 'nanputuo_tea_city',
                      name: '南普陀茶叶城',
                      location: '福建省厦门市思明区',
                      merchantCount: 140,
                      address: '厦门市思明区南普陀',
                      description: '南普陀茶叶城，茶文化主题市场'
                    }
                  ]
                },
                {
                  id: 'jimei',
                  name: '集美区',
                  markets: [
                    {
                      id: 'xiamen_north_station_international_tea_port',
                      name: '厦门北站国际茶港城',
                      location: '福建省厦门市集美区',
                      merchantCount: 0,
                      address: '厦门市集美区厦门北站',
                      description: '厦门北站国际茶港城（在建）',
                      isUnderConstruction: true
                    }
                  ]
                }
              ]
            },
            {
              id: 'quanzhou',
              name: '泉州市',
              districts: [
                {
                  id: 'fengze',
                  name: '丰泽区',
                  markets: [
                    {
                      id: 'quanzhou_tea_market',
                      name: '泉州茶叶市场（泉秀路）',
                      location: '福建省泉州市丰泽区',
                      merchantCount: 250,
                      address: '泉州市丰泽区泉秀路',
                      description: '泉州市主要茶叶交易市场'
                    },
                    {
                      id: 'donghai_tea_market',
                      name: '东海茶叶市场',
                      location: '福建省泉州市丰泽区',
                      merchantCount: 180,
                      address: '泉州市丰泽区东海',
                      description: '东海地区茶叶交易市场'
                    },
                    {
                      id: 'wucuo_tea_field',
                      name: '乌厝茶叶场',
                      location: '福建省泉州市丰泽区',
                      merchantCount: 120,
                      address: '泉州市丰泽区乌厝',
                      description: '乌厝地区茶叶交易场'
                    }
                  ]
                },
                {
                  id: 'licheng',
                  name: '鲤城区',
                  markets: [
                    {
                      id: 'donghu_street_tea_wholesale',
                      name: '东湖街茶叶批发一条街',
                      location: '福建省泉州市鲤城区',
                      merchantCount: 160,
                      address: '泉州市鲤城区东湖街',
                      description: '东湖街茶叶批发一条街'
                    },
                    {
                      id: 'puer_tea_direct_market',
                      name: '普洱茶直销市场（中山路）',
                      location: '福建省泉州市鲤城区',
                      merchantCount: 140,
                      address: '泉州市鲤城区中山路',
                      description: '普洱茶直销市场'
                    }
                  ]
                },
                {
                  id: 'anxi',
                  name: '安溪县',
                  markets: [
                    {
                      id: 'anxi_tea_field',
                      name: '安溪县茶叶场（中国茶都）',
                      location: '福建省泉州市安溪县',
                      merchantCount: 300,
                      address: '泉州市安溪县',
                      description: '中国茶都，安溪铁观音主要交易中心'
                    },
                    {
                      id: 'gande_tea_field',
                      name: '感德茶叶场',
                      location: '福建省泉州市安溪县',
                      merchantCount: 120,
                      address: '泉州市安溪县感德镇',
                      description: '感德镇茶叶交易场'
                    }
                  ]
                },
                {
                  id: 'huian',
                  name: '惠安县',
                  markets: [
                    {
                      id: 'huian_tea_city',
                      name: '惠安茶城',
                      location: '福建省泉州市惠安县',
                      merchantCount: 100,
                      address: '泉州市惠安县',
                      description: '惠安县茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'luojiang',
                  name: '洛江区',
                  markets: [
                    {
                      id: 'changkeng_tea_market',
                      name: '长坑茶叶市场',
                      location: '福建省泉州市洛江区',
                      merchantCount: 80,
                      address: '泉州市洛江区长坑',
                      description: '长坑地区茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'zhangzhou',
              name: '漳州市',
              districts: [
                {
                  id: 'xiangcheng',
                  name: '芗城区',
                  markets: [
                    {
                      id: 'minnan_new_city_tea_market',
                      name: '闽南新城茶叶大市场',
                      location: '福建省漳州市芗城区',
                      merchantCount: 200,
                      address: '漳州市芗城区',
                      description: '闽南新城茶叶大市场'
                    },
                    {
                      id: 'zhangzhou_tea_field',
                      name: '漳州茶叶场（新址）',
                      location: '福建省漳州市芗城区',
                      merchantCount: 180,
                      address: '漳州市芗城区',
                      description: '漳州茶叶场新址'
                    },
                    {
                      id: 'puer_tea_cluster',
                      name: '普洱茶专营集群（胜利东路、荷花中路）',
                      location: '福建省漳州市芗城区',
                      merchantCount: 150,
                      address: '漳州市芗城区胜利东路、荷花中路',
                      description: '普洱茶专营集群'
                    }
                  ]
                },
                {
                  id: 'yunxiao',
                  name: '云霄县',
                  markets: [
                    {
                      id: 'yunxiao_wushan_tea_field',
                      name: '云霄乌山茶叶场',
                      location: '福建省漳州市云霄县',
                      merchantCount: 90,
                      address: '漳州市云霄县乌山',
                      description: '云霄乌山茶叶交易场'
                    }
                  ]
                },
                {
                  id: 'huaan',
                  name: '华安县',
                  markets: [
                    {
                      id: 'huaan_tea_capital',
                      name: '华安茶都',
                      location: '福建省漳州市华安县',
                      merchantCount: 120,
                      address: '漳州市华安县',
                      description: '华安县茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'nanjing',
                  name: '南靖县',
                  markets: [
                    {
                      id: 'nanjing_fengxiang_tea_capital',
                      name: '南靖凤翔茶都',
                      location: '福建省漳州市南靖县',
                      merchantCount: 110,
                      address: '漳州市南靖县凤翔',
                      description: '南靖凤翔茶都'
                    }
                  ]
                }
              ]
            },
            {
              id: 'putian',
              name: '莆田市',
              districts: [
                {
                  id: 'hanjiang',
                  name: '涵江区',
                  markets: [
                    {
                      id: 'hanjiang_international_trade_tea_market',
                      name: '涵江国际商贸城茶叶市场',
                      location: '福建省莆田市涵江区',
                      merchantCount: 140,
                      address: '莆田市涵江区国际商贸城',
                      description: '涵江国际商贸城茶叶市场'
                    }
                  ]
                },
                {
                  id: 'licheng_putian',
                  name: '荔城区',
                  markets: [
                    {
                      id: 'licheng_shoe_material_tea_wholesale',
                      name: '荔城区鞋材市场茶叶批发店',
                      location: '福建省莆田市荔城区',
                      merchantCount: 60,
                      address: '莆田市荔城区鞋材市场',
                      description: '荔城区鞋材市场茶叶批发店'
                    }
                  ]
                },
                {
                  id: 'chengxiang',
                  name: '城厢区',
                  markets: [
                    {
                      id: 'chengxiang_heyuntang_tea_wholesale',
                      name: '城厢区和韵堂茶叶批发商行',
                      location: '福建省莆田市城厢区',
                      merchantCount: 40,
                      address: '莆田市城厢区',
                      description: '城厢区和韵堂茶叶批发商行'
                    }
                  ]
                },
                {
                  id: 'pingyang',
                  name: '平阳镇',
                  markets: [
                    {
                      id: 'pingyang_tea_market',
                      name: '平阳镇茶叶市场',
                      location: '福建省莆田市平阳镇',
                      merchantCount: 80,
                      address: '莆田市平阳镇',
                      description: '平阳镇茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'ningde',
              name: '宁德市',
              districts: [
                {
                  id: 'jiaocheng',
                  name: '蕉城区',
                  markets: [
                    {
                      id: 'ningde_tea_field',
                      name: '宁德茶叶场（阳光大道）',
                      location: '福建省宁德市蕉城区',
                      merchantCount: 160,
                      address: '宁德市蕉城区阳光大道',
                      description: '宁德市主要茶叶交易场'
                    },
                    {
                      id: 'jiaocheng_tea_market',
                      name: '蕉城茶叶市场（蕉城南路）',
                      location: '福建省宁德市蕉城区',
                      merchantCount: 120,
                      address: '宁德市蕉城区蕉城南路',
                      description: '蕉城区茶叶交易市场'
                    },
                    {
                      id: 'chengbei_tea_market',
                      name: '城北茶叶市场（富春北路）',
                      location: '福建省宁德市蕉城区',
                      merchantCount: 100,
                      address: '宁德市蕉城区富春北路',
                      description: '城北茶叶交易市场'
                    },
                    {
                      id: 'jinshan_tea_city_ningde',
                      name: '金山茶叶城',
                      location: '福建省宁德市蕉城区',
                      merchantCount: 90,
                      address: '宁德市蕉城区金山',
                      description: '宁德金山茶叶城'
                    }
                  ]
                },
                {
                  id: 'fuding',
                  name: '福鼎市',
                  markets: [
                    {
                      id: 'fuding_white_tea_market',
                      name: '福鼎白茶交易市场（点头镇）',
                      location: '福建省宁德市福鼎市',
                      merchantCount: 200,
                      address: '宁德市福鼎市点头镇',
                      description: '福鼎白茶主要交易市场'
                    },
                    {
                      id: 'guanyang_tea_green_market',
                      name: '管阳镇茶青交易市场',
                      location: '福建省宁德市福鼎市',
                      merchantCount: 0,
                      address: '宁德市福鼎市管阳镇',
                      description: '管阳镇茶青交易市场（在建）',
                      isUnderConstruction: true
                    }
                  ]
                },
                {
                  id: 'fuan',
                  name: '福安市',
                  markets: [
                    {
                      id: 'fuan_haixia_tea_capital',
                      name: '福安海峡大茶都',
                      location: '福建省宁德市福安市',
                      merchantCount: 150,
                      address: '宁德市福安市',
                      description: '福安海峡大茶都'
                    }
                  ]
                }
              ]
            },
            {
              id: 'longyan',
              name: '龙岩市',
              districts: [
                {
                  id: 'xinluo',
                  name: '新罗区',
                  markets: [
                    {
                      id: 'minxi_trade_tea_cluster',
                      name: '闽西交易城茶叶集群（C4、C5栋）',
                      location: '福建省龙岩市新罗区',
                      merchantCount: 180,
                      address: '龙岩市新罗区闽西交易城C4、C5栋',
                      description: '闽西交易城茶叶集群'
                    },
                    {
                      id: 'longyan_tea_market',
                      name: '龙岩茶叶市场（东肖镇）',
                      location: '福建省龙岩市新罗区',
                      merchantCount: 120,
                      address: '龙岩市新罗区东肖镇',
                      description: '龙岩茶叶市场'
                    },
                    {
                      id: 'longyan_zhongnongpi_trade',
                      name: '龙岩中农批交易城',
                      location: '福建省龙岩市新罗区',
                      merchantCount: 100,
                      address: '龙岩市新罗区',
                      description: '龙岩中农批交易城'
                    }
                  ]
                },
                {
                  id: 'wuping',
                  name: '武平县',
                  markets: [
                    {
                      id: 'qiaoqiao_tea_wholesale',
                      name: '桥桥茶叶批发',
                      location: '福建省龙岩市武平县',
                      merchantCount: 60,
                      address: '龙岩市武平县',
                      description: '武平县桥桥茶叶批发'
                    }
                  ]
                },
                {
                  id: 'shanghang',
                  name: '上杭县',
                  markets: [
                    {
                      id: 'shanghang_tea_wholesale_market',
                      name: '上杭县茶叶批发市场',
                      location: '福建省龙岩市上杭县',
                      merchantCount: 80,
                      address: '龙岩市上杭县',
                      description: '上杭县茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'zhangping_yongfu',
                  name: '漳平市永福镇',
                  markets: [
                    {
                      id: 'cross_strait_tea_culture_exhibition',
                      name: '两岸茶文化展（台品樱花茶园）',
                      location: '福建省龙岩市漳平市永福镇',
                      merchantCount: 40,
                      address: '龙岩市漳平市永福镇台品樱花茶园',
                      description: '两岸茶文化展示中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'sanming',
              name: '三明市',
              districts: [
                {
                  id: 'meilie',
                  name: '梅列区',
                  markets: [
                    {
                      id: 'sanming_tea_field',
                      name: '三明茶叶场（黄梅路）',
                      location: '福建省三明市梅列区',
                      merchantCount: 120,
                      address: '三明市梅列区黄梅路',
                      description: '三明市主要茶叶交易场'
                    }
                  ]
                },
                {
                  id: 'sanyuan',
                  name: '三元区',
                  markets: [
                    {
                      id: 'huiyi_tea_wholesale',
                      name: '汇益茶叶批发部',
                      location: '福建省三明市三元区',
                      merchantCount: 50,
                      address: '三明市三元区',
                      description: '汇益茶叶批发部'
                    },
                    {
                      id: 'haiquan_tea_shop',
                      name: '海泉茗茶行',
                      location: '福建省三明市三元区',
                      merchantCount: 40,
                      address: '三明市三元区',
                      description: '海泉茗茶行'
                    }
                  ]
                },
                {
                  id: 'youxi',
                  name: '尤溪县',
                  markets: [
                    {
                      id: 'youxi_minzhong_tea_wholesale',
                      name: '尤溪闽中茶叶批发市场',
                      location: '福建省三明市尤溪县',
                      merchantCount: 90,
                      address: '三明市尤溪县',
                      description: '尤溪闽中茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'datian',
                  name: '大田县',
                  markets: [
                    {
                      id: 'datian_tieguanyin_trading',
                      name: '大田县铁观音交易点（屏山乡等）',
                      location: '福建省三明市大田县',
                      merchantCount: 70,
                      address: '三明市大田县屏山乡等',
                      description: '大田县铁观音交易点'
                    }
                  ]
                },
                {
                  id: 'yongan',
                  name: '永安市',
                  markets: [
                    {
                      id: 'yongan_tea_field',
                      name: '永安茶叶场',
                      location: '福建省三明市永安市',
                      merchantCount: 0,
                      address: '三明市永安市',
                      description: '永安茶叶场（在建）',
                      isUnderConstruction: true
                    }
                  ]
                }
              ]
            },
            {
              id: 'nanping',
              name: '南平市',
              districts: [
                {
                  id: 'jianyang',
                  name: '建阳区',
                  markets: [
                    {
                      id: 'jianyang_tea_wholesale_market',
                      name: '建阳茶叶批发市场（西门街）',
                      location: '福建省南平市建阳区',
                      merchantCount: 110,
                      address: '南平市建阳区西门街',
                      description: '建阳茶叶批发市场'
                    },
                    {
                      id: 'dawuyi_tea_trade_market',
                      name: '大武夷茶叶交易市场（建阳体验中心）',
                      location: '福建省南平市建阳区',
                      merchantCount: 140,
                      address: '南平市建阳区',
                      description: '大武夷茶叶交易市场建阳体验中心'
                    }
                  ]
                },
                {
                  id: 'wuyishan',
                  name: '武夷山市',
                  markets: [
                    {
                      id: 'dawuyi_tea_trade_market_wuyishan',
                      name: '大武夷茶叶交易市场（大王峰北路）',
                      location: '福建省南平市武夷山市',
                      merchantCount: 200,
                      address: '南平市武夷山市大王峰北路',
                      description: '大武夷茶叶交易市场'
                    },
                    {
                      id: 'wenyan_tea_wholesale_city',
                      name: '问岩茶叶批发城（玉女峰路）',
                      location: '福建省南平市武夷山市',
                      merchantCount: 160,
                      address: '南平市武夷山市玉女峰路',
                      description: '问岩茶叶批发城'
                    }
                  ]
                },
                {
                  id: 'zhenghe',
                  name: '政和县',
                  markets: [
                    {
                      id: 'zhenghe_minzhe_tea_trade_market',
                      name: '政和县闽浙茶叶交易市场（铁山镇）',
                      location: '福建省南平市政和县',
                      merchantCount: 100,
                      address: '南平市政和县铁山镇',
                      description: '政和县闽浙茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'shaowu',
                  name: '邵武市',
                  markets: [
                    {
                      id: 'shaowu_lingyu_walking_street_tea_market',
                      name: '邵武领域步行街新天地茶业市场',
                      location: '福建省南平市邵武市',
                      merchantCount: 80,
                      address: '南平市邵武市领域步行街新天地',
                      description: '邵武领域步行街新天地茶业市场'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'shandong',
          name: '山东省',
          cities: [
            {
              id: 'qingdao',
              name: '青岛市',
              districts: [
                {
                  id: 'licang',
                  name: '李沧区',
                  markets: [
                    {
                      id: 'qingdao_international',
                      name: '青岛国际茶城（兴邦茶城）',
                      location: '山东省青岛市李沧区',
                      merchantCount: 180,
                      address: '青岛市李沧区',
                      description: '青岛市规模最大的茶叶批发市场之一'
                    },
                    {
                      id: 'tiandujin',
                      name: '天都锦茶文化城',
                      location: '山东省青岛市李沧区',
                      merchantCount: 120,
                      address: '青岛市李沧区',
                      description: '以茶文化为主题的综合性茶叶市场'
                    },
                    {
                      id: 'licun',
                      name: '李村茶叶批发市场',
                      location: '山东省青岛市李沧区',
                      merchantCount: 95,
                      address: '青岛市李沧区李村街道',
                      description: '李沧区主要茶叶批发集散地'
                    },
                    {
                      id: 'dongli',
                      name: '东李茶城',
                      location: '山东省青岛市李沧区',
                      merchantCount: 85,
                      address: '青岛市李沧区东李街道',
                      description: '东李地区茶叶交易中心'
                    },
                    {
                      id: 'like_lai',
                      name: '利客来茶叶市场',
                      location: '山东省青岛市李沧区',
                      merchantCount: 75,
                      address: '青岛市李沧区',
                      description: '综合性茶叶批发零售市场'
                    },
                    {
                      id: 'licang_other',
                      name: '其他',
                      location: '山东省青岛市李沧区',
                      merchantCount: 0,
                      address: '青岛市李沧区',
                      description: '李沧区其他茶叶市场',
                      isOther: true
                    }
                  ]
                },
                {
                  id: 'laoshan',
                  name: '崂山区',
                  markets: [
                    {
                      id: 'laoshan_tea',
                      name: '崂山茶叶批发市场',
                      location: '山东省青岛市崂山区',
                      merchantCount: 110,
                      address: '青岛市崂山区',
                      description: '崂山茶主要交易市场'
                    },
                    {
                      id: 'laoshan_other',
                      name: '其他',
                      location: '山东省青岛市崂山区',
                      merchantCount: 0,
                      address: '青岛市崂山区',
                      description: '崂山区其他茶叶市场',
                      isOther: true
                    }
                  ]
                },
                {
                  id: 'chengyang',
                  name: '城阳区',
                  markets: [
                    {
                      id: 'qingmin',
                      name: '青闽茶叶市场（峄阳文化茶叶市场）',
                      location: '山东省青岛市城阳区',
                      merchantCount: 65,
                      address: '青岛市城阳区',
                      description: '福建茶叶在青岛的主要集散地'
                    }
                  ]
                },
                {
                  id: 'huangdao',
                  name: '黄岛区',
                  markets: [
                    {
                      id: 'chamagudao',
                      name: '茶马古道茶叶市场',
                      location: '山东省青岛市黄岛区',
                      merchantCount: 80,
                      address: '青岛市黄岛区',
                      description: '以茶马古道文化为主题的茶叶市场'
                    }
                  ]
                },
                {
                  id: 'shibei',
                  name: '市北区',
                  markets: [
                    {
                      id: 'qingdao_international_shibei',
                      name: '青岛国际茶城（市北区分支）',
                      location: '山东省青岛市市北区',
                      merchantCount: 150,
                      address: '青岛市市北区',
                      description: '青岛国际茶城市北区分支机构'
                    }
                  ]
                }
              ]
            },
            {
              id: 'weifang',
              name: '潍坊市',
              districts: [
                {
                  id: 'weicheng',
                  name: '潍城区',
                  markets: [
                    {
                      id: 'beifang_tea_capital',
                      name: '北方茶都茶叶场',
                      location: '山东省潍坊市潍城区',
                      merchantCount: 150,
                      address: '潍坊市潍城区',
                      description: '潍坊市规模最大的茶叶批发市场'
                    },
                    {
                      id: 'weifang_tea_market',
                      name: '潍坊市茶叶批发交易市场',
                      location: '山东省潍坊市潍城区',
                      merchantCount: 120,
                      address: '潍坊市潍城区',
                      description: '潍坊市主要茶叶交易中心'
                    },
                    {
                      id: 'yuandu_lake',
                      name: '鸢都湖茶城',
                      location: '山东省潍坊市潍城区',
                      merchantCount: 90,
                      address: '潍坊市潍城区',
                      description: '鸢都湖周边茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'kuiwen',
                  name: '奎文区',
                  markets: [
                    {
                      id: 'bei_wang',
                      name: '北王茶城广场',
                      location: '山东省潍坊市奎文区',
                      merchantCount: 85,
                      address: '潍坊市奎文区',
                      description: '北王地区茶叶交易广场'
                    },
                    {
                      id: 'zhonghua_bocheng',
                      name: '潍坊中华博城',
                      location: '山东省潍坊市奎文区',
                      merchantCount: 100,
                      address: '潍坊市奎文区',
                      description: '综合性茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'hanting',
                  name: '寒亭区',
                  markets: [
                    {
                      id: 'tea_bocheng_branch',
                      name: '潍坊茶博城分店',
                      location: '山东省潍坊市寒亭区',
                      merchantCount: 60,
                      address: '潍坊市寒亭区',
                      description: '茶博城连锁分店'
                    }
                  ]
                },
                {
                  id: 'linqu',
                  name: '临朐县',
                  markets: [
                    {
                      id: 'haoda',
                      name: '豪达茶叶批发商城',
                      location: '山东省潍坊市临朐县',
                      merchantCount: 75,
                      address: '潍坊市临朐县',
                      description: '临朐县主要茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jinan',
              name: '济南市',
              districts: [
                {
                  id: 'lixia',
                  name: '历下区',
                  markets: [
                    {
                      id: 'jinan_tea_city',
                      name: '济南茶叶批发市场',
                      location: '山东省济南市历下区',
                      merchantCount: 200,
                      address: '济南市历下区',
                      description: '济南市最大的茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'shizhong',
                  name: '市中区',
                  markets: [
                    {
                      id: 'jinan_international_tea',
                      name: '济南国际茶城',
                      location: '山东省济南市市中区',
                      merchantCount: 180,
                      address: '济南市市中区',
                      description: '国际化茶叶交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'yantai',
              name: '烟台市',
              districts: [
                {
                  id: 'zhifu',
                  name: '芝罘区',
                  markets: [
                    {
                      id: 'yantai_tea_market',
                      name: '烟台茶叶批发市场',
                      location: '山东省烟台市芝罘区',
                      merchantCount: 120,
                      address: '烟台市芝罘区',
                      description: '烟台市主要茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'heze',
              name: '菏泽市',
              districts: [
                {
                  id: 'mudan',
                  name: '牡丹区',
                  markets: [
                    {
                      id: 'luxinan_tea',
                      name: '鲁西南茶叶大市场',
                      location: '山东省菏泽市牡丹区',
                      merchantCount: 130,
                      address: '菏泽市牡丹区',
                      description: '鲁西南地区最大的茶叶批发市场'
                    },
                    {
                      id: 'guangjin',
                      name: '广进茶城',
                      location: '山东省菏泽市牡丹区',
                      merchantCount: 90,
                      address: '菏泽市牡丹区',
                      description: '菏泽市主要茶叶交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'zibo',
              name: '淄博市',
              districts: [
                {
                  id: 'zhangdian',
                  name: '张店区',
                  markets: [
                    {
                      id: 'luzhong_tea',
                      name: '鲁中茶叶市场',
                      location: '山东省淄博市张店区',
                      merchantCount: 140,
                      address: '淄博市张店区',
                      description: '鲁中地区茶叶交易中心'
                    },
                    {
                      id: 'wangshe',
                      name: '王舍茶城',
                      location: '山东省淄博市张店区',
                      merchantCount: 100,
                      address: '淄博市张店区',
                      description: '王舍地区茶叶交易市场'
                    },
                    {
                      id: 'nanfang_tea',
                      name: '南方茶城',
                      location: '山东省淄博市张店区',
                      merchantCount: 85,
                      address: '淄博市张店区',
                      description: '南方茶叶在淄博的主要集散地'
                    },
                    {
                      id: 'jiangnan_tea',
                      name: '江南茶城',
                      location: '山东省淄博市张店区',
                      merchantCount: 75,
                      address: '淄博市张店区',
                      description: '江南茶叶交易市场'
                    },
                    {
                      id: 'yufeng_tea',
                      name: '玉峰茶城',
                      location: '山东省淄博市张店区',
                      merchantCount: 65,
                      address: '淄博市张店区',
                      description: '玉峰地区茶叶交易中心'
                    },
                    {
                      id: 'hongxing_tea',
                      name: '红星茶城',
                      location: '山东省淄博市张店区',
                      merchantCount: 80,
                      address: '淄博市张店区',
                      description: '红星地区茶叶交易市场'
                    },
                    {
                      id: 'honggou_road',
                      name: '洪沟路茶业带',
                      location: '山东省淄博市张店区',
                      merchantCount: 120,
                      address: '淄博市张店区洪沟路',
                      description: '洪沟路茶叶批发一条街'
                    }
                  ]
                },
                {
                  id: 'zhoucun',
                  name: '周村区',
                  markets: [
                    {
                      id: 'zibo_tea_field',
                      name: '淄博茶叶场',
                      location: '山东省淄博市周村区',
                      merchantCount: 95,
                      address: '淄博市周村区',
                      description: '淄博市主要茶叶批发市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'zaozhuang',
              name: '枣庄市',
              districts: [
                {
                  id: 'shizhong',
                  name: '市中区',
                  markets: [
                    {
                      id: 'huapai_tea',
                      name: '华派茶博城',
                      location: '山东省枣庄市市中区',
                      merchantCount: 110,
                      address: '枣庄市市中区',
                      description: '枣庄市主要茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'xuecheng',
                  name: '薛城区',
                  markets: [
                    {
                      id: 'zaozhuang_tea_field',
                      name: '山东枣庄茶叶场',
                      location: '山东省枣庄市薛城区',
                      merchantCount: 95,
                      address: '枣庄市薛城区',
                      description: '枣庄市茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'tengzhou',
                  name: '滕州市',
                  markets: [
                    {
                      id: 'tengzhou_tea',
                      name: '滕州市茶叶场',
                      location: '山东省枣庄市滕州市',
                      merchantCount: 85,
                      address: '枣庄市滕州市',
                      description: '滕州市茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'shanting',
                  name: '山亭区',
                  markets: [
                    {
                      id: 'shanting_tea',
                      name: '山亭区茶叶场',
                      location: '山东省枣庄市山亭区',
                      merchantCount: 70,
                      address: '枣庄市山亭区',
                      description: '山亭区茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'taierzhuang',
                  name: '台儿庄区',
                  markets: [
                    {
                      id: 'taierzhuang_new',
                      name: '台儿庄新农联合市场',
                      location: '山东省枣庄市台儿庄区',
                      merchantCount: 65,
                      address: '枣庄市台儿庄区',
                      description: '台儿庄区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'yicheng',
                  name: '峄城区',
                  markets: [
                    {
                      id: 'yicheng_chengshui',
                      name: '峄城区承水路市场',
                      location: '山东省枣庄市峄城区',
                      merchantCount: 60,
                      address: '枣庄市峄城区承水路',
                      description: '峄城区承水路茶叶市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jining',
              name: '济宁市',
              districts: [
                {
                  id: 'rencheng',
                  name: '任城区',
                  markets: [
                    {
                      id: 'jiuzhou_tea',
                      name: '九州茶都',
                      location: '山东省济宁市任城区',
                      merchantCount: 160,
                      address: '济宁市任城区',
                      description: '济宁市规模最大的茶叶交易中心'
                    },
                    {
                      id: 'jinyu_tea',
                      name: '金宇茶叶批发大市场',
                      location: '山东省济宁市任城区',
                      merchantCount: 130,
                      address: '济宁市任城区',
                      description: '金宇茶叶批发大市场'
                    },
                    {
                      id: 'caoqiaokou',
                      name: '草桥口茶叶场',
                      location: '山东省济宁市任城区',
                      merchantCount: 95,
                      address: '济宁市任城区',
                      description: '草桥口地区茶叶交易市场'
                    },
                    {
                      id: 'yifeng_cluster',
                      name: '亿丰茶叶市场集群',
                      location: '山东省济宁市任城区',
                      merchantCount: 120,
                      address: '济宁市任城区',
                      description: '亿丰茶叶市场集群'
                    },
                    {
                      id: 'haode_tea',
                      name: '豪德茶叶食品商贸城',
                      location: '山东省济宁市任城区',
                      merchantCount: 100,
                      address: '济宁市任城区',
                      description: '豪德茶叶食品商贸城'
                    },
                    {
                      id: 'jixiang_tea',
                      name: '吉祥茶城',
                      location: '山东省济宁市任城区',
                      merchantCount: 85,
                      address: '济宁市任城区',
                      description: '吉祥茶城茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'yanzhou',
                  name: '兖州区',
                  markets: [
                    {
                      id: 'jinghang_tea',
                      name: '京杭茶叶批发中心',
                      location: '山东省济宁市兖州区',
                      merchantCount: 110,
                      address: '济宁市兖州区',
                      description: '京杭茶叶批发中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'taian',
              name: '泰安市',
              districts: [
                {
                  id: 'taishan',
                  name: '泰山区',
                  markets: [
                    {
                      id: 'taishan_tea',
                      name: '泰山茶叶场',
                      location: '山东省泰安市泰山区',
                      merchantCount: 100,
                      address: '泰安市泰山区',
                      description: '泰山茶叶交易市场'
                    },
                    {
                      id: 'taian_tea_field',
                      name: '泰安茶叶场',
                      location: '山东省泰安市泰山区',
                      merchantCount: 85,
                      address: '泰安市泰山区',
                      description: '泰安市主要茶叶批发市场'
                    },
                    {
                      id: 'jiangnan_wholesale',
                      name: '江南茶叶批发中心',
                      location: '山东省泰安市泰山区',
                      merchantCount: 95,
                      address: '泰安市泰山区',
                      description: '江南茶叶在泰安的主要集散地'
                    },
                    {
                      id: 'huanghedong_xiancha',
                      name: '黄河东路仙茶市场',
                      location: '山东省泰安市泰山区',
                      merchantCount: 75,
                      address: '泰安市泰山区黄河东路',
                      description: '黄河东路仙茶交易市场'
                    },
                    {
                      id: 'baolong_tea',
                      name: '宝龙茶城',
                      location: '山东省泰安市泰山区',
                      merchantCount: 80,
                      address: '泰安市泰山区',
                      description: '宝龙茶城茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'daiyue',
                  name: '岱岳区',
                  markets: [
                    {
                      id: 'dawenkou_huangshan',
                      name: '大汶口镇黄山茶叶批发部',
                      location: '山东省泰安市岱岳区',
                      merchantCount: 60,
                      address: '泰安市岱岳区大汶口镇',
                      description: '大汶口镇黄山茶叶批发部'
                    }
                  ]
                }
              ]
            },
            {
              id: 'weihai',
              name: '威海市',
              districts: [
                {
                  id: 'huancui',
                  name: '环翠区',
                  markets: [
                    {
                      id: 'changfeng_tea',
                      name: '长峰茶叶场',
                      location: '山东省威海市环翠区',
                      merchantCount: 90,
                      address: '威海市环翠区',
                      description: '长峰地区茶叶交易市场'
                    },
                    {
                      id: 'weihai_international',
                      name: '威海国际茶叶城',
                      location: '山东省威海市环翠区',
                      merchantCount: 120,
                      address: '威海市环翠区',
                      description: '威海市规模最大的茶叶交易中心'
                    },
                    {
                      id: 'huancui_tea',
                      name: '环翠区茶叶场',
                      location: '山东省威海市环翠区',
                      merchantCount: 75,
                      address: '威海市环翠区',
                      description: '环翠区茶叶批发市场'
                    },
                    {
                      id: 'wenquan_distribution',
                      name: '温泉镇茶叶集散中心',
                      location: '山东省威海市环翠区',
                      merchantCount: 65,
                      address: '威海市环翠区温泉镇',
                      description: '温泉镇茶叶集散中心'
                    }
                  ]
                },
                {
                  id: 'wendeng',
                  name: '文登区',
                  markets: [
                    {
                      id: 'wendeng_tea',
                      name: '文登区茶叶场',
                      location: '山东省威海市文登区',
                      merchantCount: 80,
                      address: '威海市文登区',
                      description: '文登区茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'rizhao',
              name: '日照市',
              districts: [
                {
                  id: 'donggang',
                  name: '东港区',
                  markets: [
                    {
                      id: 'rizhao_international',
                      name: '日照国际茶叶城',
                      location: '山东省日照市东港区',
                      merchantCount: 140,
                      address: '日照市东港区',
                      description: '日照市规模最大的茶叶交易中心'
                    },
                    {
                      id: 'shijiu_tea',
                      name: '石臼茶叶场',
                      location: '山东省日照市东港区',
                      merchantCount: 95,
                      address: '日照市东港区',
                      description: '石臼地区茶叶交易市场'
                    },
                    {
                      id: 'jufeng_tea',
                      name: '巨峰镇茶叶场',
                      location: '山东省日照市东港区',
                      merchantCount: 85,
                      address: '日照市东港区巨峰镇',
                      description: '巨峰镇茶叶交易市场'
                    },
                    {
                      id: 'wangfu_tea',
                      name: '王府茶叶场',
                      location: '山东省日照市东港区',
                      merchantCount: 70,
                      address: '日照市东港区',
                      description: '王府地区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'lanshan',
                  name: '岚山区',
                  markets: [
                    {
                      id: 'lanshan_international',
                      name: '岚山国际茶叶交易中心',
                      location: '山东省日照市岚山区',
                      merchantCount: 110,
                      address: '日照市岚山区',
                      description: '岚山区国际茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'wulian',
                  name: '五莲县',
                  markets: [
                    {
                      id: 'wulian_tea',
                      name: '五莲县茶叶场',
                      location: '山东省日照市五莲县',
                      merchantCount: 75,
                      address: '日照市五莲县',
                      description: '五莲县茶叶批发市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'linyi',
              name: '临沂市',
              districts: [
                {
                  id: 'lanshan_linyi',
                  name: '兰山区',
                  markets: [
                    {
                      id: 'linyi_tea_market',
                      name: '临沂茶叶批发市场',
                      location: '山东省临沂市兰山区',
                      merchantCount: 150,
                      address: '临沂市兰山区',
                      description: '临沂市主要茶叶批发市场'
                    },
                    {
                      id: 'jinlonghu',
                      name: '金龙湖茶叶集散中心',
                      location: '山东省临沂市兰山区',
                      merchantCount: 120,
                      address: '临沂市兰山区',
                      description: '金龙湖茶叶集散中心'
                    },
                    {
                      id: 'xin_tea_market',
                      name: '新茶叶市场',
                      location: '山东省临沂市兰山区',
                      merchantCount: 100,
                      address: '临沂市兰山区',
                      description: '临沂市新茶叶交易市场'
                    },
                    {
                      id: 'xijie_tea',
                      name: '西街茶城',
                      location: '山东省临沂市兰山区',
                      merchantCount: 95,
                      address: '临沂市兰山区',
                      description: '西街茶城茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'luozhuang',
                  name: '罗庄区',
                  markets: [
                    {
                      id: 'doufu_gong',
                      name: '豆腐宫茶叶市场',
                      location: '山东省临沂市罗庄区',
                      merchantCount: 85,
                      address: '临沂市罗庄区',
                      description: '豆腐宫地区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'hedong',
                  name: '河东区',
                  markets: [
                    {
                      id: 'baoyin_tea',
                      name: '宝印茶城',
                      location: '山东省临沂市河东区',
                      merchantCount: 80,
                      address: '临沂市河东区',
                      description: '宝印茶城茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'dezhou',
              name: '德州市',
              districts: [
                {
                  id: 'decheng',
                  name: '德城区',
                  markets: [
                    {
                      id: 'dezhou_tea_market',
                      name: '德州茶叶批发市场',
                      location: '山东省德州市德城区',
                      merchantCount: 95,
                      address: '德州市德城区',
                      description: '德州茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'jingji_kaifa',
                  name: '经济开发区',
                  markets: [
                    {
                      id: 'dezhou_logistics',
                      name: '德百物流批发城·鲁北茶都',
                      location: '山东省德州市经济开发区',
                      merchantCount: 130,
                      address: '德州市经济开发区',
                      description: '德百物流批发城茶叶交易中心'
                    },
                    {
                      id: 'dezhou_international',
                      name: '德州国际茶业博览中心',
                      location: '山东省德州市经济开发区',
                      merchantCount: 140,
                      address: '德州市经济开发区',
                      description: '德州国际茶业博览中心'
                    },
                    {
                      id: 'jinhua_tea',
                      name: '金华茶城',
                      location: '山东省德州市经济开发区',
                      merchantCount: 85,
                      address: '德州市经济开发区',
                      description: '金华茶城茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'qihe',
                  name: '齐河县',
                  markets: [
                    {
                      id: 'qihe_tea',
                      name: '齐河县茶叶市场',
                      location: '山东省德州市齐河县',
                      merchantCount: 75,
                      address: '德州市齐河县',
                      description: '齐河县茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'liaocheng',
              name: '聊城市',
              districts: [
                {
                  id: 'dongchangfu',
                  name: '东昌府区',
                  markets: [
                    {
                      id: 'xiangjiang_cluster',
                      name: '香江大市场茶叶批发集群',
                      location: '山东省聊城市东昌府区',
                      merchantCount: 120,
                      address: '聊城市东昌府区',
                      description: '香江大市场茶叶批发集群'
                    }
                  ]
                },
                {
                  id: 'jingji_jishu',
                  name: '经济技术开发区',
                  markets: [
                    {
                      id: 'zhougonghe',
                      name: '周公河农贸城茶市场',
                      location: '山东省聊城市经济技术开发区',
                      merchantCount: 100,
                      address: '聊城市经济技术开发区',
                      description: '周公河农贸城茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'binzhou',
              name: '滨州市',
              districts: [
                {
                  id: 'bincheng',
                  name: '滨城区',
                  markets: [
                    {
                      id: 'gaodu_tea',
                      name: '高杜茶叶市场',
                      location: '山东省滨州市滨城区',
                      merchantCount: 90,
                      address: '滨州市滨城区',
                      description: '高杜地区茶叶交易市场'
                    },
                    {
                      id: 'zhanqian_tea',
                      name: '站前茶叶批发市场',
                      location: '山东省滨州市滨城区',
                      merchantCount: 85,
                      address: '滨州市滨城区',
                      description: '站前茶叶批发市场'
                    },
                    {
                      id: 'binzhou_tea_city',
                      name: '滨州茶城',
                      location: '山东省滨州市滨城区',
                      merchantCount: 110,
                      address: '滨州市滨城区',
                      description: '滨州茶城茶叶交易中心'
                    },
                    {
                      id: 'puer_special',
                      name: '普洱茶专项市场',
                      location: '山东省滨州市滨城区',
                      merchantCount: 75,
                      address: '滨州市滨城区',
                      description: '普洱茶专项交易市场'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'jiangxi',
          name: '江西省',
          cities: [
            {
              id: 'nanchang',
              name: '南昌市',
              districts: [
                {
                  id: 'qingshanhu',
                  name: '青山湖区',
                  markets: [
                    {
                      id: 'nanchang_tea_trading_market',
                      name: '南昌茶叶交易市场',
                      location: '江西省南昌市青山湖区',
                      merchantCount: 120,
                      address: '南昌市青山湖区',
                      description: '南昌市主要茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'qingyunpu',
                  name: '青云谱区',
                  markets: [
                    {
                      id: 'hongcheng_tea_wholesale_market',
                      name: '洪城大市场茶叶批发市场',
                      location: '江西省南昌市青云谱区',
                      merchantCount: 150,
                      address: '南昌市青云谱区洪城大市场',
                      description: '洪城大市场茶叶批发专区'
                    }
                  ]
                },
                {
                  id: 'xihu',
                  name: '西湖区',
                  markets: [
                    {
                      id: 'nanchang_tea_field',
                      name: '南昌茶叶场',
                      location: '江西省南昌市西湖区',
                      merchantCount: 100,
                      address: '南昌市西湖区',
                      description: '西湖区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'honggutan',
                  name: '红谷滩新区',
                  markets: [
                    {
                      id: 'honggutan_tea_wholesale_market',
                      name: '红谷滩茶叶批发市场',
                      location: '江西省南昌市红谷滩新区',
                      merchantCount: 80,
                      address: '南昌市红谷滩新区',
                      description: '红谷滩新区茶叶批发市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jiujiang',
              name: '九江市',
              districts: [
                {
                  id: 'lianxi',
                  name: '濂溪区',
                  markets: [
                    {
                      id: 'jiujiang_tea_market',
                      name: '九江茶市',
                      location: '江西省九江市濂溪区',
                      merchantCount: 90,
                      address: '九江市濂溪区',
                      description: '濂溪区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'xunyang',
                  name: '浔阳区',
                  markets: [
                    {
                      id: 'jiujiang_tea_grand_market',
                      name: '九江茶叶大市场',
                      location: '江西省九江市浔阳区',
                      merchantCount: 120,
                      address: '九江市浔阳区',
                      description: '九江市主要茶叶交易市场'
                    },
                    {
                      id: 'xinxueyu_jiujiang_tea_trading_area',
                      name: '新雪域九江茶市交易区',
                      location: '江西省九江市浔阳区',
                      merchantCount: 80,
                      address: '九江市浔阳区新雪域',
                      description: '新雪域茶市交易区'
                    },
                    {
                      id: 'ganquanlu_tea_field',
                      name: '甘泉路茶叶场',
                      location: '江西省九江市浔阳区',
                      merchantCount: 60,
                      address: '九江市浔阳区甘泉路',
                      description: '甘泉路茶叶交易场'
                    },
                    {
                      id: 'jiujiang_tea_city_ximenlu',
                      name: '九江茶叶城（西门路）',
                      location: '江西省九江市浔阳区',
                      merchantCount: 100,
                      address: '九江市浔阳区西门路',
                      description: '西门路茶叶城'
                    }
                  ]
                },
                {
                  id: 'lushan',
                  name: '庐山区',
                  markets: [
                    {
                      id: 'lushan_tea_market',
                      name: '庐山茶叶市场',
                      location: '江西省九江市庐山区',
                      merchantCount: 70,
                      address: '九江市庐山区',
                      description: '庐山地区茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jingdezhen',
              name: '景德镇市',
              districts: [
                {
                  id: 'fuliang',
                  name: '浮梁县',
                  markets: [
                    {
                      id: 'legong_open_air_tea_trading_market',
                      name: '勒功乡露天茶叶交易市场',
                      location: '江西省景德镇市浮梁县',
                      merchantCount: 50,
                      address: '浮梁县勒功乡',
                      description: '勒功乡露天茶叶交易市场'
                    },
                    {
                      id: 'fudong_tea_production_trading_market',
                      name: '浮东茶叶产地交易市场',
                      location: '江西省景德镇市浮梁县',
                      merchantCount: 60,
                      address: '浮梁县浮东',
                      description: '浮东茶叶产地交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'shangrao',
              name: '上饶市',
              districts: [
                {
                  id: 'xinzhou',
                  name: '信州区',
                  markets: [
                    {
                      id: 'xinnong_tea_wholesale_market',
                      name: '信农茶批发市场',
                      location: '江西省上饶市信州区',
                      merchantCount: 85,
                      address: '上饶市信州区',
                      description: '信州区茶叶批发市场'
                    },
                    {
                      id: 'shangrao_tea_market',
                      name: '上饶茶叶市场',
                      location: '江西省上饶市信州区',
                      merchantCount: 95,
                      address: '上饶市信州区',
                      description: '上饶市主要茶叶交易市场'
                    },
                    {
                      id: 'puer_tea_wholesale_area',
                      name: '普洱茶批发专区',
                      location: '江西省上饶市信州区',
                      merchantCount: 70,
                      address: '上饶市信州区',
                      description: '普洱茶批发专区'
                    }
                  ]
                },
                {
                  id: 'wuyuan',
                  name: '婺源县',
                  markets: [
                    {
                      id: 'wuyuan_tea_field',
                      name: '婺源茶叶场',
                      location: '江西省上饶市婺源县',
                      merchantCount: 80,
                      address: '上饶市婺源县',
                      description: '婺源县茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'yingtan',
              name: '鹰潭市',
              districts: [
                {
                  id: 'yuehu',
                  name: '月湖区',
                  markets: [
                    {
                      id: 'yingtan_tea_field',
                      name: '鹰潭茶叶场',
                      location: '江西省鹰潭市月湖区',
                      merchantCount: 75,
                      address: '鹰潭市月湖区',
                      description: '月湖区茶叶交易市场'
                    },
                    {
                      id: 'yingtan_tea_city',
                      name: '鹰潭茶叶城',
                      location: '江西省鹰潭市月湖区',
                      merchantCount: 90,
                      address: '鹰潭市月湖区',
                      description: '鹰潭市主要茶叶交易中心'
                    },
                    {
                      id: 'xiangyuan_tea_market',
                      name: '香源茶市',
                      location: '江西省鹰潭市月湖区',
                      merchantCount: 65,
                      address: '鹰潭市月湖区',
                      description: '香源茶市交易中心'
                    },
                    {
                      id: 'tiedao_tea_market',
                      name: '铁道茶叶市场',
                      location: '江西省鹰潭市月湖区',
                      merchantCount: 55,
                      address: '鹰潭市月湖区',
                      description: '铁道茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'guixi',
                  name: '贵溪市',
                  markets: [
                    {
                      id: 'guixi_tea_city_tea_market',
                      name: '贵溪茶城茶叶市场',
                      location: '江西省鹰潭市贵溪市',
                      merchantCount: 70,
                      address: '鹰潭市贵溪市',
                      description: '贵溪市茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'special_industry_park',
                  name: '特色产业园区',
                  markets: [
                    {
                      id: 'yingtan_tea_culture_industry_park',
                      name: '鹰潭茶文化产业园',
                      location: '江西省鹰潭市特色产业园区',
                      merchantCount: 40,
                      address: '鹰潭市特色产业园区',
                      description: '鹰潭茶文化产业园'
                    }
                  ]
                }
              ]
            },
            {
              id: 'fuzhou',
              name: '抚州市',
              districts: [
                {
                  id: 'linchuan',
                  name: '临川区',
                  markets: [
                    {
                      id: 'fuzhou_tea_city',
                      name: '抚州茶城',
                      location: '江西省抚州市临川区',
                      merchantCount: 100,
                      address: '抚州市临川区',
                      description: '抚州市主要茶叶交易中心'
                    },
                    {
                      id: 'fuzhou_tea_expo_city',
                      name: '抚州茶叶博览城',
                      location: '江西省抚州市临川区',
                      merchantCount: 85,
                      address: '抚州市临川区',
                      description: '抚州茶叶博览城'
                    },
                    {
                      id: 'nanchang_tea_trading_market_fuzhou_branch',
                      name: '南昌茶叶交易市场（抚州分部）',
                      location: '江西省抚州市临川区',
                      merchantCount: 60,
                      address: '抚州市临川区',
                      description: '南昌茶叶交易市场抚州分部'
                    },
                    {
                      id: 'xiyuan_tea_market',
                      name: '西园茶叶市场',
                      location: '江西省抚州市临川区',
                      merchantCount: 70,
                      address: '抚州市临川区西园',
                      description: '西园茶叶交易市场'
                    },
                    {
                      id: 'fuzhou_agricultural_products_market_tea_area',
                      name: '抚州农副产品市场（茶叶专区）',
                      location: '江西省抚州市临川区',
                      merchantCount: 80,
                      address: '抚州市临川区',
                      description: '抚州农副产品市场茶叶专区'
                    }
                  ]
                },
                {
                  id: 'dongxiang',
                  name: '东乡区',
                  markets: [
                    {
                      id: 'chagandong_tea_market',
                      name: '差干洞茶叶市场',
                      location: '江西省抚州市东乡区',
                      merchantCount: 50,
                      address: '抚州市东乡区差干洞',
                      description: '差干洞茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'pingxiang',
              name: '萍乡市',
              districts: [
                {
                  id: 'anyuan',
                  name: '安源区',
                  markets: [
                    {
                      id: 'pingxiang_tea_market',
                      name: '萍乡茶叶市场',
                      location: '江西省萍乡市安源区',
                      merchantCount: 75,
                      address: '萍乡市安源区',
                      description: '安源区茶叶交易市场'
                    },
                    {
                      id: 'pingxiang_tea_city',
                      name: '萍乡茶叶城',
                      location: '江西省萍乡市安源区',
                      merchantCount: 90,
                      address: '萍乡市安源区',
                      description: '萍乡市主要茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'xiangdong',
                  name: '湘东区',
                  markets: [
                    {
                      id: 'pingxiang_international_tea_packaging_city',
                      name: '萍乡国际茶叶包装城',
                      location: '江西省萍乡市湘东区',
                      merchantCount: 60,
                      address: '萍乡市湘东区',
                      description: '萍乡国际茶叶包装城'
                    }
                  ]
                }
              ]
            },
            {
              id: 'yichun',
              name: '宜春市',
              districts: [
                {
                  id: 'zhouqu',
                  name: '州区',
                  markets: [
                    {
                      id: 'xinyichun_quality_tea_professional_wholesale_center',
                      name: '新宜春市优质茶叶专业批发中心',
                      location: '江西省宜春市州区',
                      merchantCount: 85,
                      address: '宜春市州区',
                      description: '新宜春市优质茶叶专业批发中心'
                    },
                    {
                      id: 'yichun_tea_field',
                      name: '宜春市茶叶场',
                      location: '江西省宜春市州区',
                      merchantCount: 70,
                      address: '宜春市州区',
                      description: '宜春市茶叶交易场'
                    }
                  ]
                },
                {
                  id: 'yuanzhou',
                  name: '袁州区',
                  markets: [
                    {
                      id: 'yuanzhou_tea_trading_center',
                      name: '袁州区茶叶交易中心',
                      location: '江西省宜春市袁州区',
                      merchantCount: 80,
                      address: '宜春市袁州区',
                      description: '袁州区茶叶交易中心'
                    }
                  ]
                },
                {
                  id: 'suichuan',
                  name: '遂川县',
                  markets: [
                    {
                      id: 'suichuan_tea_field',
                      name: '遂川茶叶场',
                      location: '江西省宜春市遂川县',
                      merchantCount: 65,
                      address: '宜春市遂川县',
                      description: '遂川县茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'fengcheng',
                  name: '丰城市',
                  markets: [
                    {
                      id: 'fengcheng_tea_retail_distribution_point',
                      name: '丰城市茶叶零售集散点',
                      location: '江西省宜春市丰城市',
                      merchantCount: 55,
                      address: '宜春市丰城市',
                      description: '丰城市茶叶零售集散点'
                    }
                  ]
                }
              ]
            },
            {
              id: 'xinyu',
              name: '新余市',
              districts: [
                {
                  id: 'yushui',
                  name: '渝水区',
                  markets: [
                    {
                      id: 'xinyu_tea_field',
                      name: '新余市茶叶场',
                      location: '江西省新余市渝水区',
                      merchantCount: 70,
                      address: '新余市渝水区',
                      description: '渝水区茶叶交易市场'
                    },
                    {
                      id: 'xinyu_tea_wholesale_market_chengbei',
                      name: '新余茶叶批发市场（城北街道）',
                      location: '江西省新余市渝水区',
                      merchantCount: 85,
                      address: '新余市渝水区城北街道',
                      description: '城北街道茶叶批发市场'
                    },
                    {
                      id: 'kaimingxuan',
                      name: '楷茗轩',
                      location: '江西省新余市渝水区',
                      merchantCount: 30,
                      address: '新余市渝水区',
                      description: '楷茗轩茶叶店'
                    },
                    {
                      id: 'shengshi_tea_house',
                      name: '盛世茶行',
                      location: '江西省新余市渝水区',
                      merchantCount: 25,
                      address: '新余市渝水区',
                      description: '盛世茶行'
                    },
                    {
                      id: 'huaxiangyuan_mingcha_xinyu',
                      name: '华祥苑茗茶（新余店）',
                      location: '江西省新余市渝水区',
                      merchantCount: 20,
                      address: '新余市渝水区',
                      description: '华祥苑茗茶新余店'
                    }
                  ]
                },
                {
                  id: 'gaoxin',
                  name: '高新区',
                  markets: [
                    {
                      id: 'gaoxin_yumei_tea_shop',
                      name: '高新区宇美茶叶店',
                      location: '江西省新余市高新区',
                      merchantCount: 15,
                      address: '新余市高新区',
                      description: '高新区宇美茶叶店'
                    }
                  ]
                },
                {
                  id: 'xiannvhu',
                  name: '仙女湖风景名胜区',
                  markets: [
                    {
                      id: 'xiannvhu_tea_field',
                      name: '仙女湖茶叶场',
                      location: '江西省新余市仙女湖风景名胜区',
                      merchantCount: 40,
                      address: '新余市仙女湖风景名胜区',
                      description: '仙女湖茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jian',
              name: '吉安市',
              districts: [
                {
                  id: 'qingyuan',
                  name: '青原区',
                  markets: [
                    {
                      id: 'wanshanghui_tea_field',
                      name: '万商汇茶叶场',
                      location: '江西省吉安市青原区',
                      merchantCount: 60,
                      address: '吉安市青原区',
                      description: '万商汇茶叶交易市场'
                    },
                    {
                      id: 'laobanzhang_tea_field',
                      name: '老班章茶叶场',
                      location: '江西省吉安市青原区',
                      merchantCount: 45,
                      address: '吉安市青原区',
                      description: '老班章茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'jizhou',
                  name: '吉州区',
                  markets: [
                    {
                      id: 'jizhou_tea_market',
                      name: '吉州区茶叶市场',
                      location: '江西省吉安市吉州区',
                      merchantCount: 75,
                      address: '吉安市吉州区',
                      description: '吉州区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'suichuan_jian',
                  name: '遂川县',
                  markets: [
                    {
                      id: 'suichuan_tanghu_tea_comprehensive_market',
                      name: '遂川县汤湖茶叶综合市场',
                      location: '江西省吉安市遂川县',
                      merchantCount: 55,
                      address: '吉安市遂川县汤湖',
                      description: '遂川县汤湖茶叶综合市场'
                    }
                  ]
                },
                {
                  id: 'jinggangshan',
                  name: '井冈山市',
                  markets: [
                    {
                      id: 'jinggangshan_ciping_tea_field',
                      name: '井冈山市茨坪镇茶叶场',
                      location: '江西省吉安市井冈山市',
                      merchantCount: 50,
                      address: '吉安市井冈山市茨坪镇',
                      description: '井冈山市茨坪镇茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'ganzhou',
              name: '赣州市',
              districts: [
                {
                  id: 'zhanggong',
                  name: '章贡区',
                  markets: [
                    {
                      id: 'ganzhou_tea_trading_market_zhangjiang',
                      name: '赣州茶叶交易市场（章江茶城）',
                      location: '江西省赣州市章贡区',
                      merchantCount: 110,
                      address: '赣州市章贡区章江茶城',
                      description: '赣州市主要茶叶交易中心'
                    },
                    {
                      id: 'ganzhou_tea_city',
                      name: '赣州市茶叶城',
                      location: '江西省赣州市章贡区',
                      merchantCount: 95,
                      address: '赣州市章贡区',
                      description: '赣州市茶叶城'
                    },
                    {
                      id: 'qianzhou_grain_oil_tea_field',
                      name: '虔州粮油茶叶场',
                      location: '江西省赣州市章贡区',
                      merchantCount: 80,
                      address: '赣州市章贡区',
                      description: '虔州粮油茶叶交易市场'
                    },
                    {
                      id: 'ganzhou_dancong_tea_wholesale_center',
                      name: '赣州市单丛茶批发中心',
                      location: '江西省赣州市章贡区',
                      merchantCount: 70,
                      address: '赣州市章贡区',
                      description: '赣州市单丛茶批发中心'
                    }
                  ]
                },
                {
                  id: 'ganxian',
                  name: '赣县区',
                  markets: [
                    {
                      id: 'ganzhou_tea_market_trading_center_main',
                      name: '赣州茶叶市场交易中心（主中心）',
                      location: '江西省赣州市赣县区',
                      merchantCount: 120,
                      address: '赣州市赣县区',
                      description: '赣州茶叶市场交易主中心'
                    }
                  ]
                },
                {
                  id: 'nankang',
                  name: '南康区',
                  markets: [
                    {
                      id: 'nankang_tea_base',
                      name: '南康茶叶基地',
                      location: '江西省赣州市南康区',
                      merchantCount: 65,
                      address: '赣州市南康区',
                      description: '南康茶叶生产基地'
                    }
                  ]
                },
                {
                  id: 'longnan',
                  name: '龙南市',
                  markets: [
                    {
                      id: 'jianping_tea_wholesale_shop',
                      name: '剑平茶叶批发店',
                      location: '江西省赣州市龙南市',
                      merchantCount: 40,
                      address: '赣州市龙南市',
                      description: '剑平茶叶批发店'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'zhejiang',
          name: '浙江省',
          cities: [
            // 杭州市
            {
              id: 'hangzhou',
              name: '杭州市',
              districts: [
                {
                  id: 'yuhang',
                  name: '余杭区',
                  markets: [
                    { id: 'hangzhou_jiangnan_tea_market', name: '杭州江南茶叶市场', location: '浙江省杭州市余杭区', address: '余杭区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'xihu',
                  name: '西湖区',
                  markets: [
                    { id: 'hangzhou_sijiqing_market', name: '杭州四季青市场', location: '浙江省杭州市西湖区', address: '西湖区', description: '核心综合市场' },
                    { id: 'hangzhou_xihu_tea_market', name: '杭州西湖茶叶市场', location: '浙江省杭州市西湖区转塘', address: '转塘', description: '核心综合市场' },
                    { id: 'wuliting_tea_market', name: '五里亭茶业批发市场', location: '浙江省杭州市西湖区留下镇', address: '留下镇', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'shangcheng',
                  name: '上城区',
                  markets: [
                    { id: 'hangzhou_jiefang_tea_market', name: '杭州解放路茶叶市场', location: '浙江省杭州市上城区', address: '上城区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'xiaoshan',
                  name: '萧山区',
                  markets: [
                    { id: 'xiaoshan_shangcheng_tea_field', name: '萧山商城中路茶叶场', location: '浙江省杭州市萧山区', address: '萧山区', description: '特色专项市场' }
                  ]
                }
              ]
            },
            // 宁波市
            {
              id: 'ningbo',
              name: '宁波市',
              districts: [
                {
                  id: 'haishu',
                  name: '海曙区',
                  markets: [
                    { id: 'ningbo_tea_market', name: '宁波茶叶批发市场', location: '浙江省宁波市海曙区', address: '海曙区', description: '核心综合市场' },
                    { id: 'hengshi_tea_market', name: '横石桥茶叶市场', location: '浙江省宁波市海曙区', address: '海曙区', description: '特色专项市场' },
                    { id: 'ningbo_puer_tea_field', name: '宁波普洱茶叶场', location: '浙江省宁波市海曙区', address: '海曙区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'jiangdong',
                  name: '江东区',
                  markets: [
                    { id: 'jinzhong_tea_city', name: '金钟茶城', location: '浙江省宁波市江东区', address: '江东区', description: '核心综合市场（新址迁至江东区）' }
                  ]
                },
                {
                  id: 'beilun',
                  name: '北仑区',
                  markets: [
                    { id: 'ningbo_international_tea_city', name: '宁波国际茶叶城', location: '浙江省宁波市北仑区', address: '北仑区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'xiangshan',
                  name: '象山县',
                  markets: [
                    { id: 'xiangshan_tea_market', name: '象山茶叶市场', location: '浙江省宁波市象山县', address: '象山县', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'yinzhou',
                  name: '鄞州区',
                  markets: [
                    { id: 'dongqianhu_tea_market', name: '东钱湖茶叶市场', location: '浙江省宁波市鄞州区', address: '鄞州区', description: '特色专项市场' }
                  ]
                }
              ]
            },
            // 温州市
            {
              id: 'wenzhou',
              name: '温州市',
              districts: [
                {
                  id: 'longwan',
                  name: '龙湾区',
                  markets: [
                    { id: 'wenzhou_tea_city', name: '温州茶城', location: '浙江省温州市龙湾区', address: '龙湾区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'ouhai',
                  name: '瓯海区',
                  markets: [
                    { id: 'zhejiang_south_tea_market', name: '浙南茶叶市场', location: '浙江省温州市瓯海区', address: '瓯海区', description: '核心综合市场' },
                    { id: 'panqiao_international_tea_city', name: '潘桥国际茶博城', location: '浙江省温州市瓯海区', address: '瓯海区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'ruian',
                  name: '瑞安市',
                  markets: [
                    { id: 'gaolou_tea_market', name: '高楼茶寮茶叶交易市场', location: '浙江省温州市瑞安市', address: '瑞安市', description: '产地特色市场' }
                  ]
                },
                {
                  id: 'yongjia',
                  name: '永嘉县',
                  markets: [
                    { id: 'yongjia_sanjiang_tea_city', name: '永嘉三江综合茶城', location: '浙江省温州市永嘉县', address: '永嘉县', description: '产地特色市场（建设中）' }
                  ]
                }
              ]
            },
            // 嘉兴市
            {
              id: 'jiaxing',
              name: '嘉兴市',
              districts: [
                {
                  id: 'nanhu',
                  name: '南湖区',
                  markets: [
                    { id: 'jiaxing_tea_field', name: '嘉兴市茶叶场', location: '浙江省嘉兴市南湖区', address: '南湖区', description: '核心综合市场' },
                    { id: 'jiaxing_international_tea_city', name: '嘉兴国际茶叶城', location: '浙江省嘉兴市南湖区', address: '南湖区', description: '核心综合市场' },
                    { id: 'laobanzhang_tea_center', name: '老班章茶叶批发中心', location: '浙江省嘉兴市南湖区', address: '南湖区', description: '特色专项市场' },
                    { id: 'nanhu_tea_market', name: '南湖茶叶市场', location: '浙江省嘉兴市南湖区纺工路', address: '纺工路', description: '特色专项市场' },
                    { id: 'puer_tea_special_market', name: '普洱茶专项市场', location: '浙江省嘉兴市南湖区南塘东路', address: '南塘东路', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'xiuzhou',
                  name: '秀洲区',
                  markets: [
                    { id: 'xiuzhou_xincheng_tea_market', name: '秀洲区新塍镇茶叶市场', location: '浙江省嘉兴市秀洲区', address: '秀洲区', description: '核心综合市场' }
                  ]
                }
              ]
            },
            // 湖州市
            {
              id: 'huzhou',
              name: '湖州市',
              districts: [
                {
                  id: 'wuxing',
                  name: '吴兴区',
                  markets: [
                    { id: 'huzhou_tea_field', name: '湖州茶叶场', location: '浙江省湖州市吴兴区', address: '吴兴区', description: '核心综合市场' },
                    { id: 'luoshui_puer_tea_field', name: '落水洞普洱茶场', location: '浙江省湖州市吴兴区', address: '吴兴区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'nanxun',
                  name: '南浔区',
                  markets: [
                    { id: 'nanxun_tea_market', name: '南浔茶叶市场', location: '浙江省湖州市南浔区', address: '南浔区', description: '区域特色市场' }
                  ]
                },
                {
                  id: 'anji',
                  name: '安吉县',
                  markets: [
                    { id: 'anji_white_tea_market', name: '安吉白茶产地市场', location: '浙江省湖州市安吉县', address: '安吉县', description: '区域特色市场' }
                  ]
                }
              ]
            },
            // 绍兴市
            {
              id: 'shaoxing',
              name: '绍兴市',
              districts: [
                {
                  id: 'yuecheng',
                  name: '越城区',
                  markets: [
                    { id: 'shaoxing_tea_market', name: '绍兴茶叶市场', location: '浙江省绍兴市越城区', address: '越城区', description: '核心综合市场' },
                    { id: 'yucha_cun_mocha', name: '御茶村抹茶基地', location: '浙江省绍兴市越城区', address: '越城区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'xinchang',
                  name: '新昌县',
                  markets: [
                    { id: 'xinchang_dafo_longjing', name: '新昌大佛龙井茶叶市场', location: '浙江省绍兴市新昌县', address: '新昌县', description: '核心综合市场' },
                    { id: 'jiangnan_mingcha_market', name: '江南名茶市场', location: '浙江省绍兴市新昌县', address: '新昌县', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'keqiao',
                  name: '柯桥区',
                  markets: [
                    { id: 'keqiao_tea_cluster', name: '桥区茶叶集群', location: '浙江省绍兴市柯桥区', address: '柯桥区', description: '特色专项市场（含华舍一叶茶香批发部等）' }
                  ]
                },
                {
                  id: 'downtown',
                  name: '市中心',
                  markets: [
                    { id: 'shaoxing_international_moore', name: '绍兴国际摩尔城世纪联华', location: '浙江省绍兴市市中心', address: '市中心', description: '特色专项市场' }
              ]
            }
          ]
        },
            // 金华市
            {
              id: 'jinhua',
              name: '金华市',
              districts: [
                {
                  id: 'jindong',
                  name: '金东区',
                  markets: [
                    { id: 'zhezhong_tea_market', name: '浙中茶叶市场', location: '浙江省金华市金东区', address: '金东区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'wucheng',
                  name: '婺城区',
                  markets: [
                    { id: 'jinhua_agricultural_tea_zone', name: '金华农产品批发市场茶叶交易区', location: '浙江省金华市婺城区', address: '婺城区', description: '核心综合市场' },
                    { id: 'yiwu_chunjiang_tea_street', name: '义乌春江路茶叶街', location: '浙江省金华市婺城区', address: '婺城区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'dongyang',
                  name: '东阳市',
                  markets: [
                    { id: 'dongyang_fukun_tea_market', name: '东阳富坤茶叶市场', location: '浙江省金华市东阳市', address: '东阳市', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'panan',
                  name: '磐安县',
                  markets: [
                    { id: 'panan_fresh_tea_trading', name: '磐安鲜叶交易点', location: '浙江省金华市磐安县', address: '磐安县', description: '特色专项市场（浙中市场内）' }
                  ]
                }
              ]
            },
            // 衢州市
            {
              id: 'quzhou',
              name: '衢州市',
              districts: [
                {
                  id: 'kecheng',
                  name: '柯城区',
                  markets: [
                    { id: 'quzhou_international_tea_city', name: '衢州国际茶叶城', location: '浙江省衢州市柯城区', address: '柯城区', description: '核心综合市场' },
                    { id: 'hehua_zhonglu_tea_cluster', name: '荷花中路茶叶集群', location: '浙江省衢州市柯城区', address: '柯城区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'longyou',
                  name: '龙游县',
                  markets: [
                    { id: 'zhexi_agricultural_tea_zone', name: '浙西农副产品中心市场黄茶交易区', location: '浙江省衢州市龙游县', address: '龙游县', description: '核心综合市场' },
                    { id: 'longyou_tea_market', name: '龙游县茶叶市场', location: '浙江省衢州市龙游县', address: '龙游县', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'jiangshan',
                  name: '江山市',
                  markets: [
                    { id: 'jiangshan_tea_market', name: '江山市茶叶市场', location: '浙江省衢州市江山市', address: '江山市', description: '特色专项市场' }
                  ]
                }
              ]
            },
            // 舟山市
            {
              id: 'zhoushan',
              name: '舟山市',
              districts: [
                {
                  id: 'dinghai',
                  name: '定海区',
                  markets: [
                    { id: 'zhoushan_tea_field', name: '舟山茶叶场', location: '浙江省舟山市定海区', address: '定海区', description: '核心综合市场' },
                    { id: 'fenghuangwo_puer_tea_field', name: '凤凰窝普洱茶场', location: '浙江省舟山市定海区', address: '定海区', description: '核心综合市场' },
                    { id: 'tianmuhu_white_tea_field', name: '天目湖白茶场', location: '浙江省舟山市定海区', address: '定海区', description: '特色专项市场' },
                    { id: 'xincheng_xuange_tea', name: '新城轩阁茶叶商行', location: '浙江省舟山市定海区', address: '定海区', description: '特色专项市场' },
                    { id: 'bihai_ge_tea', name: '碧海阁茶行', location: '浙江省舟山市定海区', address: '定海区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'putuo',
                  name: '普陀区',
                  markets: [
                    { id: 'shenjiamen_yangshan_puer', name: '沈家门洋山普洱茶场', location: '浙江省舟山市普陀区', address: '普陀区', description: '核心综合市场' },
                    { id: 'putuoshan_tea_market', name: '普陀山茶叶市场', location: '浙江省舟山市普陀山景区', address: '普陀山景区', description: '核心综合市场' }
                  ]
                }
              ]
            },
            // 台州市
            {
              id: 'taizhou',
              name: '台州市',
              districts: [
                {
                  id: 'jiaojiang',
                  name: '椒江区',
                  markets: [
                    { id: 'taizhou_tea_city', name: '台州茶城', location: '浙江省台州市椒江区', address: '椒江区', description: '核心综合市场' },
                    { id: 'jiaojiang_center_tea_market', name: '椒江中心茶叶市场', location: '浙江省台州市椒江区', address: '椒江区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'huangyan',
                  name: '黄岩区',
                  markets: [
                    { id: 'huangyan_international_tea_city', name: '黄岩国际茶城', location: '浙江省台州市黄岩区', address: '黄岩区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'luqiao',
                  name: '路桥区',
                  markets: [
                    { id: 'luqiao_tea_field', name: '路桥茶叶场', location: '浙江省台州市路桥区', address: '路桥区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'tiantai',
                  name: '天台县',
                  markets: [
                    { id: 'tiantai_mountain_tea_market', name: '天台山茶市', location: '浙江省台州市天台县', address: '天台县', description: '核心综合市场' },
                    { id: 'tiantai_leifeng_tea_market', name: '天台雷峰茶叶市场', location: '浙江省台州市天台县', address: '天台县', description: '特色专项市场' }
                  ]
                }
              ]
            },
            // 丽水市
            {
              id: 'lishui',
              name: '丽水市',
              districts: [
                {
                  id: 'songyang',
                  name: '松阳县',
                  markets: [
                    { id: 'zhejiang_south_tea_market_lishui', name: '浙南茶叶市场', location: '浙江省丽水市松阳县', address: '松阳县', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'suichang',
                  name: '遂昌县',
                  markets: [
                    { id: 'suichang_tea_market', name: '遂昌茶叶交易市场', location: '浙江省丽水市遂昌县', address: '遂昌县', description: '县域特色市场' }
                  ]
                },
                {
                  id: 'qingyuan',
                  name: '庆元县',
                  markets: [
                    { id: 'qingyuan_byproduct_field', name: '庆元县副产品场', location: '浙江省丽水市庆元县', address: '庆元县', description: '县域特色市场' }
                  ]
                },
                {
                  id: 'yunhe',
                  name: '云和县',
                  markets: [
                    { id: 'yunhe_jingning_tea_distribution', name: '云和/景宁茶青集散点', location: '浙江省丽水市云和县', address: '云和县', description: '县域特色市场' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'guangdong',
          name: '广东省',
          cities: [
            // 广州市
            {
              id: 'guangzhou',
              name: '广州市',
              districts: [
                {
                  id: 'liwan',
                  name: '荔湾区',
                  markets: [
                    { id: 'fangcun_south_tea_market', name: '芳村南方茶叶市场', location: '广东省广州市荔湾区', address: '荔湾区', description: '核心茶叶批发市场' },
                    { id: 'fangcun_tea_market_jingui', name: '芳村茶叶市场（锦桂市场）', location: '广东省广州市荔湾区', address: '荔湾区', description: '锦桂市场茶叶交易区' }
                  ]
                },
                {
                  id: 'baiyun',
                  name: '白云区',
                  markets: [
                    { id: 'guangzhou_international_tea_center', name: '广州茶叶国际交易中心', location: '广东省广州市白云区', address: '白云区', description: '国际茶叶交易中心' }
                  ]
                },
                {
                  id: 'nansha',
                  name: '南沙区',
                  markets: [
                    { id: 'nansha_tea_market', name: '南沙茶叶市场', location: '广东省广州市南沙区', address: '南沙区', description: '南沙区茶叶交易市场' }
                  ]
                },
                {
                  id: 'panyu',
                  name: '番禺区',
                  markets: [
                    { id: 'panyu_tea_field', name: '番禺茶叶场', location: '广东省广州市番禺区', address: '番禺区', description: '番禺区茶叶交易场' }
                  ]
                }
              ]
            },
            // 深圳市
            {
              id: 'shenzhen',
              name: '深圳市',
              districts: [
                {
                  id: 'longgang',
                  name: '龙岗区',
                  markets: [
                    { id: 'wanjiang_tea_market', name: '万江茶叶市场', location: '广东省深圳市龙岗区', address: '龙岗区', description: '龙岗区茶叶交易市场' },
                    { id: 'new_shenzhen_tea_field', name: '新深圳茶叶场', location: '广东省深圳市龙岗区', address: '龙岗区', description: '新深圳茶叶交易场' },
                    { id: 'dongfang_international_tea_city', name: '东方国际茶都', location: '广东省深圳市龙岗区', address: '龙岗区', description: '国际茶都交易中心' }
                  ]
                },
                {
                  id: 'baoan',
                  name: '宝安区',
                  markets: [
                    { id: 'baoan_tea_market', name: '宝安茶叶批发市场', location: '广东省深圳市宝安区', address: '宝安区', description: '宝安区茶叶批发市场' },
                    { id: 'xixiang_tea_market', name: '西乡茶叶批发市场', location: '广东省深圳市宝安区', address: '宝安区', description: '西乡茶叶批发市场' }
                  ]
                },
                {
                  id: 'nanshan',
                  name: '南山区',
                  markets: [
                    { id: 'qianhai_tea_city', name: '前海茶城', location: '广东省深圳市南山区', address: '南山区', description: '前海茶城交易中心' },
                    { id: 'nanshan_puer_tea_market', name: '南山普洱茶批发市场', location: '广东省深圳市南山区', address: '南山区', description: '普洱茶专营批发市场' }
                  ]
                },
                {
                  id: 'futian',
                  name: '福田区',
                  markets: [
                    { id: 'meilin_agricultural_market', name: '梅林农批市场', location: '广东省深圳市福田区', address: '福田区', description: '梅林农产品批发市场' }
                  ]
                },
                {
                  id: 'luohu',
                  name: '罗湖区',
                  markets: [
                    { id: 'buji_agricultural_market', name: '布吉农批市场', location: '广东省深圳市罗湖区', address: '罗湖区', description: '布吉农产品批发市场' }
                  ]
                }
              ]
            },
            // 珠海市
            {
              id: 'zhuhai',
              name: '珠海市',
              districts: [
                {
                  id: 'xiangzhou',
                  name: '香洲区',
                  markets: [
                    { id: 'zhuhai_tea_city_qianshan', name: '珠海茶城（前山市场）', location: '广东省珠海市香洲区', address: '香洲区', description: '前山茶叶交易市场' },
                    { id: 'mingzhu_tea_field', name: '明珠茶叶场', location: '广东省珠海市香洲区', address: '香洲区', description: '明珠茶叶交易场' },
                    { id: 'taijia_tea_field', name: '泰嘉茶叶场', location: '广东省珠海市香洲区', address: '香洲区', description: '泰嘉茶叶交易场' },
                    { id: 'yunding_lanshan_tea_city', name: '云顶澜山茶叶城', location: '广东省珠海市香洲区', address: '香洲区', description: '云顶澜山茶叶城（在建）' },
                    { id: 'lanpu_huandao_tea_city', name: '兰埔环岛茗茶城', location: '广东省珠海市香洲区', address: '香洲区', description: '环岛茗茶交易城' },
                    { id: 'nanping_tech_tea_field', name: '南屏科技园茶叶场', location: '广东省珠海市香洲区', address: '香洲区', description: '南屏科技园茶叶交易场' },
                    { id: 'jiawan_jinfeng_wholesale', name: '家湾镇金凤路批发中心', location: '广东省珠海市香洲区', address: '香洲区', description: '金凤路茶叶批发中心' }
                  ]
                }
              ]
            },
            // 汕头市
            {
              id: 'shantou',
              name: '汕头市',
              districts: [
                {
                  id: 'longhu',
                  name: '龙湖区',
                  markets: [
                    { id: 'shantou_tea_field', name: '汕头市茶叶场', location: '广东省汕头市龙湖区', address: '龙湖区', description: '汕头市茶叶交易场' },
                    { id: 'guanghua_tea_market', name: '光华路茶叶市场', location: '广东省汕头市龙湖区', address: '龙湖区', description: '光华路茶叶交易市场' },
                    { id: 'shantou_tea_city', name: '汕头茶叶城', location: '广东省汕头市龙湖区', address: '龙湖区', description: '汕头茶叶城交易中心' }
                  ]
                },
                {
                  id: 'jinping',
                  name: '金平区',
                  markets: [
                    { id: 'shantou_supply_tea_city', name: '汕头供销社光华茶博园', location: '广东省汕头市金平区', address: '金平区', description: '供销社茶博园' }
                  ]
                }
              ]
            },
            // 佛山市
            {
              id: 'foshan',
              name: '佛山市',
              districts: [
                {
                  id: 'nanhai',
                  name: '南海区',
                  markets: [
                    { id: 'kaimin_tea_city', name: '凯民茶博城', location: '广东省佛山市南海区', address: '南海区', description: '凯民茶博城交易中心' },
                    { id: 'south_tea_wholesale_city', name: '南方茶叶批发城', location: '广东省佛山市南海区', address: '南海区', description: '南方茶叶批发城' },
                    { id: 'foshan_tea_wholesale_city', name: '佛山茶叶批发城', location: '广东省佛山市南海区', address: '南海区', description: '佛山茶叶批发城' }
                  ]
                },
                {
                  id: 'chancheng',
                  name: '禅城区',
                  markets: [
                    { id: 'nanhai_red_tea_city', name: '南海红茶城', location: '广东省佛山市禅城区', address: '禅城区', description: '南海红茶专营城' },
                    { id: 'chancheng_tea_field', name: '禅城茶叶场', location: '广东省佛山市禅城区', address: '禅城区', description: '禅城茶叶交易场' }
                  ]
                },
                {
                  id: 'shunde',
                  name: '顺德区',
                  markets: [
                    { id: 'shunde_tea_market_lunjiao', name: '顺德茶叶市场（伦教）', location: '广东省佛山市顺德区', address: '顺德区', description: '伦教茶叶交易市场' },
                    { id: 'ronggui_tea_market', name: '容桂茶叶市场', location: '广东省佛山市顺德区', address: '顺德区', description: '容桂茶叶交易市场' },
                    { id: 'sanqiao_tea_wholesale_city', name: '三桥茶叶批发城', location: '广东省佛山市顺德区', address: '顺德区', description: '三桥茶叶批发城' }
                  ]
                }
              ]
            },
            // 韶关市
            {
              id: 'shaoguan',
              name: '韶关市',
              districts: [
                {
                  id: 'zhenjiang',
                  name: '浈江区',
                  markets: [
                    { id: 'shaoguan_tea_stone_field', name: '韶关市茶叶奇石场', location: '广东省韶关市浈江区', address: '浈江区', description: '茶叶奇石交易场' },
                    { id: 'zhanan_tea_wholesale_cluster', name: '站南路茶叶批发集群', location: '广东省韶关市浈江区', address: '浈江区', description: '站南路茶叶批发集群' },
                    { id: 'shaoguan_specialty_field', name: '韶关土特产场', location: '广东省韶关市浈江区', address: '浈江区', description: '土特产交易场' }
                  ]
                },
                {
                  id: 'wujiang',
                  name: '武江区',
                  markets: [
                    { id: 'nanjiao_tea_market', name: '南郊茶叶市场', location: '广东省韶关市武江区', address: '武江区', description: '南郊茶叶交易市场' },
                    { id: 'beijiao_tea_market', name: '北郊茶叶市场', location: '广东省韶关市武江区', address: '武江区', description: '北郊茶叶交易市场' }
                  ]
                },
                {
                  id: 'under_construction',
                  name: '在建',
                  markets: [
                    { id: 'huangnan_agricultural_center', name: '华南农产品交易中心', location: '广东省韶关市', address: '韶关市', description: '华南农产品交易中心（在建）' }
                  ]
                }
              ]
            },
            // 河源市
            {
              id: 'heyuan',
              name: '河源市',
              districts: [
                {
                  id: 'zijin',
                  name: '紫金县',
                  markets: [
                    { id: 'china_cicada_tea_center', name: '中国蝉茶交易中心', location: '广东省河源市紫金县', address: '紫金县', description: '蝉茶专业交易中心' }
                  ]
                },
                {
                  id: 'yuancheng',
                  name: '源城区',
                  markets: [
                    { id: 'heyuan_tea_wholesale_center', name: '河源市茗茶批发中心', location: '广东省河源市源城区', address: '源城区', description: '茗茶批发中心' },
                    { id: 'qiancun_market', name: '千村集市（巴伐利亚庄园）', location: '广东省河源市源城区', address: '源城区', description: '千村集市茶叶交易' }
                  ]
                }
              ]
            },
            // 梅州市
            {
              id: 'meizhou',
              name: '梅州市',
              districts: [
                {
                  id: 'wuhua',
                  name: '五华县',
                  markets: [
                    { id: 'yuedong_wuhua_tea_city', name: '粤东五华茶博汇', location: '广东省梅州市五华县', address: '五华县', description: '粤东茶博汇交易中心' }
                  ]
                },
                {
                  id: 'meijiang',
                  name: '梅江区',
                  markets: [
                    { id: 'yunxing_wholesale_cluster', name: '运兴批发市场集群', location: '广东省梅州市梅江区', address: '梅江区', description: '运兴批发市场集群' },
                    { id: 'huiyuanchun_tea_city', name: '汇源春茶城', location: '广东省梅州市梅江区', address: '梅江区', description: '汇源春茶城交易中心' }
                  ]
                },
                {
                  id: 'meixian',
                  name: '梅县区',
                  markets: [
                    { id: 'xiyan_tea_wholesale', name: '西岩茶叶集团批发部', location: '广东省梅州市梅县区', address: '梅县区', description: '西岩茶叶集团批发部' }
                  ]
                },
                {
                  id: 'dapu',
                  name: '大埔县',
                  markets: [
                    { id: 'dapu_xiyan_tea_field', name: '大埔西岩山茶场（枫朗镇）', location: '广东省梅州市大埔县', address: '大埔县', description: '西岩山茶场交易中心' }
              ]
            }
          ]
        },
            // 惠州市
            {
              id: 'huizhou',
              name: '惠州市',
              districts: [
                {
                  id: 'huicheng',
                  name: '惠城区',
                  markets: [
                    { id: 'huizhou_tea_city', name: '惠州茶都', location: '广东省惠州市惠城区', address: '惠城区', description: '惠州茶都交易中心' },
                    { id: 'huizhou_tea_market', name: '惠州茶叶城', location: '广东省惠州市惠城区', address: '惠城区', description: '惠州茶叶城交易中心' },
                    { id: 'xihu_tea_market', name: '西湖茶叶市场', location: '广东省惠州市惠城区', address: '惠城区', description: '西湖茶叶交易市场' }
                  ]
                },
                {
                  id: 'huiyang',
                  name: '惠阳区',
                  markets: [
                    { id: 'dongjiang_tea_market', name: '东江茶叶市场', location: '广东省惠州市惠阳区', address: '惠阳区', description: '东江茶叶交易市场' }
                  ]
                },
                {
                  id: 'huidong',
                  name: '惠东县',
                  markets: [
                    { id: 'huidong_tea_city', name: '惠东茶叶城', location: '广东省惠州市惠东县', address: '惠东县', description: '惠东茶叶城交易中心' }
                  ]
                },
                {
                  id: 'boluo',
                  name: '博罗县',
                  markets: [
                    { id: 'boluo_tea_market', name: '博罗茶叶市场', location: '广东省惠州市博罗县', address: '博罗县', description: '博罗茶叶交易市场' }
                  ]
                }
              ]
            },
            // 汕尾市
            {
              id: 'shanwei',
              name: '汕尾市',
              districts: [
                {
                  id: 'chengqu',
                  name: '城区',
                  markets: [
                    { id: 'chengqu_donghui_market_cluster', name: '城区东辉市场集群', location: '广东省汕尾市城区', address: '城区', description: '东辉市场集群' },
                    { id: 'baoxiang_tea', name: '宝香茶业', location: '广东省汕尾市城区', address: '城区', description: '宝香茶业交易中心' }
                  ]
                },
                {
                  id: 'haifeng',
                  name: '海丰县',
                  markets: [
                    { id: 'shanwei_yanggan_tea_city', name: '汕尾养肝茶茶城', location: '广东省汕尾市海丰县', address: '海丰县', description: '养肝茶专营茶城' },
                    { id: 'taoming_tea_company', name: '淘茗汇茶业有限公司', location: '广东省汕尾市海丰县', address: '海丰县', description: '淘茗汇茶业交易中心' }
                  ]
                }
              ]
            },
            // 东莞市
            {
              id: 'dongguan',
              name: '东莞市',
              districts: [
                {
                  id: 'wanjiang',
                  name: '万江区',
                  markets: [
                    { id: 'wanjiang_tea_city', name: '万江茶城', location: '广东省东莞市万江区', address: '万江区', description: '万江茶城交易中心' },
                    { id: 'wanjiang_shimei_tea_market', name: '万江石美茶叶交易市场', location: '广东省东莞市万江区', address: '万江区', description: '石美茶叶交易市场' }
                  ]
                },
                {
                  id: 'nancheng',
                  name: '南城区',
                  markets: [
                    { id: 'dongguan_international_tea_center', name: '东莞国际茶叶交易中心', location: '广东省东莞市南城区', address: '南城区', description: '国际茶叶交易中心' }
                  ]
                },
                {
                  id: 'chashan',
                  name: '茶山镇',
                  markets: [
                    { id: 'dongguan_tea_market', name: '东莞市茶叶交易市场', location: '广东省东莞市茶山镇', address: '茶山镇', description: '东莞市茶叶交易市场' }
                  ]
                },
                {
                  id: 'fenggang',
                  name: '凤岗镇',
                  markets: [
                    { id: 'fenggang_tianfeng_puer_market', name: '凤岗天峰山普洱茶市场', location: '广东省东莞市凤岗镇', address: '凤岗镇', description: '天峰山普洱茶专营市场' }
                  ]
                },
                {
                  id: 'dongcheng',
                  name: '东城区',
                  markets: [
                    { id: 'chaxiang_international_tea_city', name: '茶香国际茶叶城', location: '广东省东莞市东城区', address: '东城区', description: '茶香国际茶叶城' }
                  ]
                }
              ]
            },
            // 中山市
            {
              id: 'zhongshan',
              name: '中山市',
              districts: [
                {
                  id: 'nanqu',
                  name: '南区',
                  markets: [
                    { id: 'huatongxing_tea_market', name: '华通行茶叶市场', location: '广东省中山市南区', address: '南区', description: '华通行茶叶交易市场' },
                    { id: 'longhuan_tea_wholesale_city', name: '龙环茶叶批发城', location: '广东省中山市南区', address: '南区', description: '龙环茶叶批发城' }
                  ]
                },
                {
                  id: 'guzhen',
                  name: '古镇镇',
                  markets: [
                    { id: 'guzhen_fuquan_tea', name: '古镇福泉茶业（八方茶园）', location: '广东省中山市古镇镇', address: '古镇镇', description: '福泉茶业交易中心' }
                  ]
                }
              ]
            },
            // 江门市
            {
              id: 'jiangmen',
              name: '江门市',
              districts: [
                {
                  id: 'pengjiang',
                  name: '蓬江区',
                  markets: [
                    { id: 'yuanyang_tea_market', name: '远洋茶叶市场', location: '广东省江门市蓬江区', address: '蓬江区', description: '远洋茶叶交易市场' }
                  ]
                },
                {
                  id: 'jianghai',
                  name: '江海区',
                  markets: [
                    { id: 'qiaoxiang_international_tea_city', name: '侨乡国际茶叶批发城', location: '广东省江门市江海区', address: '江海区', description: '侨乡国际茶叶批发城' },
                    { id: 'taiyi_tea_wholesale_city', name: '泰益茶叶批发城', location: '广东省江门市江海区', address: '江海区', description: '泰益茶叶批发城' }
                  ]
                },
                {
                  id: 'xinhui',
                  name: '新会区',
                  markets: [
                    { id: 'xinhui_tea_city', name: '新会茶城（新会茶叶场）', location: '广东省江门市新会区', address: '新会区', description: '新会茶城交易中心' },
                    { id: 'chenpi_tea_market', name: '陈皮村茶业市场', location: '广东省江门市新会区', address: '新会区', description: '陈皮村茶业交易市场' },
                    { id: 'gangzhou_tea_market', name: '冈州茶叶市场', location: '广东省江门市新会区', address: '新会区', description: '冈州茶叶交易市场' }
                  ]
                },
                {
                  id: 'heshan',
                  name: '鹤山市',
                  markets: [
                    { id: 'heshan_shaping_tea_street', name: '鹤山沙坪茶叶批发街', location: '广东省江门市鹤山市', address: '鹤山市', description: '沙坪茶叶批发街' }
                  ]
                },
                {
                  id: 'kaiping',
                  name: '开平市',
                  markets: [
                    { id: 'kaiping_dasha_tea_field', name: '开平大沙镇茶叶场', location: '广东省江门市开平市', address: '开平市', description: '大沙镇茶叶交易场' }
                  ]
                }
              ]
            },
            // 阳江市
            {
              id: 'yangjiang',
              name: '阳江市',
              districts: [
                {
                  id: 'jiangcheng',
                  name: '江城区',
                  markets: [
                    { id: 'minghao_mayan_tea_market', name: '名濠麻演新联茶叶批发市场', location: '广东省阳江市江城区', address: '江城区', description: '麻演新联茶叶批发市场' },
                    { id: 'zhonglian_tea_city', name: '中联茶叶城', location: '广东省阳江市江城区', address: '江城区', description: '中联茶叶城交易中心' },
                    { id: 'jinshan_tea_market', name: '金山路茶叶市场', location: '广东省阳江市江城区', address: '江城区', description: '金山路茶叶交易市场' }
                  ]
                },
                {
                  id: 'yangchun',
                  name: '阳春市',
                  markets: [
                    { id: 'yangchun_tea_market', name: '阳春市茶批发市场', location: '广东省阳江市阳春市', address: '阳春市', description: '阳春市茶叶批发市场' }
                  ]
                },
                {
                  id: 'yangxi',
                  name: '阳西县',
                  markets: [
                    { id: 'yangxi_ehuangfeng_tea_factory', name: '阳西县峨凰峰茶叶厂', location: '广东省阳江市阳西县', address: '阳西县', description: '峨凰峰茶叶厂交易中心' }
              ]
            }
          ]
        },
            // 湛江市
            {
              id: 'zhanjiang',
              name: '湛江市',
              districts: [
                {
                  id: 'xiashan',
                  name: '霞山区',
                  markets: [
                    { id: 'zhanjiang_tea_market', name: '湛江茶叶批发市场', location: '广东省湛江市霞山区', address: '霞山区', description: '湛江茶叶批发市场' },
                    { id: 'hengfengyuan_tea_wholesale', name: '恒丰源茶叶批发部', location: '广东省湛江市霞山区', address: '霞山区', description: '恒丰源茶叶批发部' },
                    { id: 'fenghuangshan_tea_market', name: '凤凰山茶叶市场', location: '广东省湛江市霞山区', address: '霞山区', description: '凤凰山茶叶交易市场' }
                  ]
                },
                {
                  id: 'chikan',
                  name: '赤坎区',
                  markets: [
                    { id: 'haitian_tea_city', name: '海田茶叶城', location: '广东省湛江市赤坎区', address: '赤坎区', description: '海田茶叶城交易中心' },
                    { id: 'zhanjiang_tea_ware_market', name: '湛江茶具批发市场', location: '广东省湛江市赤坎区', address: '赤坎区', description: '湛江茶具批发市场' },
                    { id: 'donghe_tea_city', name: '东和茶城', location: '广东省湛江市赤坎区', address: '赤坎区', description: '东和茶城交易中心' }
                  ]
                },
                {
                  id: 'mazhang',
                  name: '麻章区',
                  markets: [
                    { id: 'mingyuan_tea_wholesale', name: '茗苑茶叶批发部', location: '广东省湛江市麻章区', address: '麻章区', description: '茗苑茶叶批发部' },
                    { id: 'jiucun_tea_market', name: '九村茶市', location: '广东省湛江市麻章区', address: '麻章区', description: '九村茶叶交易市场' }
                  ]
                }
              ]
            },
            // 茂名市
            {
              id: 'maoming',
              name: '茂名市',
              districts: [
                {
                  id: 'maonan',
                  name: '茂南区',
                  markets: [
                    { id: 'maonan_tea_city', name: '茂南茶叶城（站前路市场）', location: '广东省茂名市茂南区', address: '茂南区', description: '站前路茶叶交易市场' },
                    { id: 'maoming_international_tea_market', name: '茂名国际茶市', location: '广东省茂名市茂南区', address: '茂南区', description: '茂名国际茶叶交易市场' }
                  ]
                },
                {
                  id: 'gaozhou',
                  name: '高州市',
                  markets: [
                    { id: 'gaozhou_tea_market', name: '高州茶叶市场', location: '广东省茂名市高州市', address: '高州市', description: '高州茶叶交易市场' }
                  ]
                },
                {
                  id: 'dianbai',
                  name: '电白区',
                  markets: [
                    { id: 'haitangxuan_tea_wholesale', name: '海棠轩茶叶批发部', location: '广东省茂名市电白区', address: '电白区', description: '海棠轩茶叶批发部' }
                  ]
                },
                {
                  id: 'xinyi',
                  name: '信宜市',
                  markets: [
                    { id: 'xinyi_dayingao_tea_field', name: '信宜大营坳茶场', location: '广东省茂名市信宜市', address: '信宜市', description: '大营坳茶场交易中心' }
                  ]
                }
              ]
            },
            // 肇庆市
            {
              id: 'zhaoqing',
              name: '肇庆市',
              districts: [
                {
                  id: 'duanzhou',
                  name: '端州区',
                  markets: [
                    { id: 'zhaoqing_huaying_tea_market', name: '肇庆华英茶叶交易市场', location: '广东省肇庆市端州区', address: '端州区', description: '华英茶叶交易市场' },
                    { id: 'zhaoqing_tea_city', name: '肇庆茶叶城', location: '广东省肇庆市端州区', address: '端州区', description: '肇庆茶叶城交易中心' },
                    { id: 'huanggang_tea_field', name: '黄岗镇茶叶场', location: '广东省肇庆市端州区', address: '端州区', description: '黄岗镇茶叶交易场' },
                    { id: 'luoxi_tea_city', name: '洛溪茶城', location: '广东省肇庆市端州区', address: '端州区', description: '洛溪茶城交易中心' }
                  ]
                },
                {
                  id: 'dinghu',
                  name: '鼎湖区',
                  markets: [
                    { id: 'qingsheng_tea_city', name: '清升茶城', location: '广东省肇庆市鼎湖区', address: '鼎湖区', description: '清升茶城交易中心' },
                    { id: 'oufei_tea_city', name: '欧菲茶城', location: '广东省肇庆市鼎湖区', address: '鼎湖区', description: '欧菲茶城交易中心' }
                  ]
                }
              ]
            },
            // 清远市
            {
              id: 'qingyuan',
              name: '清远市',
              districts: [
                {
                  id: 'qingcheng',
                  name: '清城区',
                  markets: [
                    { id: 'qingfeng_tea_specialty_market', name: '清凤茶叶特产批发市场', location: '广东省清远市清城区', address: '清城区', description: '清凤茶叶特产批发市场' },
                    { id: 'qingcheng_xiaoshi_tea_wholesale', name: '清城区小市协兴茶叶批发部', location: '广东省清远市清城区', address: '清城区', description: '小市协兴茶叶批发部' },
                    { id: 'qingyuan_agricultural_market', name: '清远农批市场', location: '广东省清远市清城区', address: '清城区', description: '清远农产品批发市场' },
                    { id: 'shatian_specialty_market', name: '沙田土特产市场', location: '广东省清远市清城区', address: '清城区', description: '沙田土特产交易市场' }
                  ]
                },
                {
                  id: 'yingde',
                  name: '英德市',
                  markets: [
                    { id: 'yingde_tea_world', name: '英德茶叶世界（利民路店）', location: '广东省清远市英德市', address: '英德市', description: '英德茶叶世界交易中心' },
                    { id: 'yingcheng_junyu_tea_wholesale', name: '英城君玉茶叶批发部', location: '广东省清远市英德市', address: '英德市', description: '英城君玉茶叶批发部' },
                    { id: 'ruizhi_tea_specialty_wholesale', name: '睿智茶叶特产批发', location: '广东省清远市英德市', address: '英德市', description: '睿智茶叶特产批发中心' }
                  ]
                }
              ]
            },
            // 潮州市
            {
              id: 'chaozhou',
              name: '潮州市',
              districts: [
                {
                  id: 'xiangqiao',
                  name: '湘桥区',
                  markets: [
                    { id: 'chaozhou_tea_city', name: '潮州茶叶城', location: '广东省潮州市湘桥区', address: '湘桥区', description: '潮州茶叶城交易中心' },
                    { id: 'old_city_tea_street', name: '老城区茶叶街', location: '广东省潮州市湘桥区', address: '湘桥区', description: '老城区茶叶交易街' }
                  ]
                },
                {
                  id: 'chaoan',
                  name: '潮安区',
                  markets: [
                    { id: 'anbu_tea_field', name: '庵埠镇茶叶场', location: '广东省潮州市潮安区', address: '潮安区', description: '庵埠镇茶叶交易场' },
                    { id: 'fengxi_tea_market', name: '枫溪茶叶市场', location: '广东省潮州市潮安区', address: '潮安区', description: '枫溪茶叶交易市场' },
                    { id: 'fenghuang_tea_market', name: '凤凰镇茶叶市场', location: '广东省潮州市潮安区', address: '潮安区', description: '凤凰镇茶叶交易市场' },
                    { id: 'rongchuang_tea_market', name: '融创茶叶市场', location: '广东省潮州市潮安区', address: '潮安区', description: '融创茶叶交易市场' }
                  ]
                },
                {
                  id: 'raoping',
                  name: '饶平县',
                  markets: [
                    { id: 'raoping_tea_market', name: '饶平茶叶市场', location: '广东省潮州市饶平县', address: '饶平县', description: '饶平茶叶交易市场' }
                  ]
                }
              ]
            },
            // 揭阳市
            {
              id: 'jieyang',
              name: '揭阳市',
              districts: [
                {
                  id: 'rongcheng',
                  name: '榕城区',
                  markets: [
                    { id: 'jieyang_lingnan_tea_street', name: '揭阳岭南茶文化街', location: '广东省揭阳市榕城区', address: '榕城区', description: '岭南茶文化街交易中心' },
                    { id: 'guoxiang_tea_market', name: '国香茶叶市场', location: '广东省揭阳市榕城区', address: '榕城区', description: '国香茶叶交易市场' },
                    { id: 'jiefang_tea_field', name: '解放路茶叶场', location: '广东省揭阳市榕城区', address: '榕城区', description: '解放路茶叶交易场' },
                    { id: 'flower_tea_specialty_market', name: '花茶专业市场', location: '广东省揭阳市榕城区', address: '榕城区', description: '花茶专业交易市场' }
                  ]
                },
                {
                  id: 'puning',
                  name: '普宁市',
                  markets: [
                    { id: 'puning_lihu_tea_market', name: '普宁里湖茶叶市场', location: '广东省揭阳市普宁市', address: '普宁市', description: '里湖茶叶交易市场' }
                  ]
                },
                {
                  id: 'jiedong',
                  name: '揭东区',
                  markets: [
                    { id: 'pingshang_green_tea_base', name: '坪上绿茶基地', location: '广东省揭阳市揭东区', address: '揭东区', description: '坪上绿茶基地交易中心' }
                  ]
                }
              ]
            },
            // 云浮市
            {
              id: 'yunfu',
              name: '云浮市',
              districts: [
                {
                  id: 'xinxing',
                  name: '新兴县',
                  markets: [
                    { id: 'yunfu_tea_field', name: '云浮茶叶场', location: '广东省云浮市新兴县', address: '新兴县', description: '云浮茶叶交易场' }
                  ]
                },
                {
                  id: 'yuncheng',
                  name: '云城区',
                  markets: [
                    { id: 'yuncheng_tea_market', name: '云城区茶叶市场', location: '广东省云浮市云城区', address: '云城区', description: '云城区茶叶交易市场' },
                    { id: 'old_city_tea_house', name: '老城区茶艺馆', location: '广东省云浮市云城区', address: '云城区', description: '老城区茶艺馆交易中心' },
                    { id: 'lingnan_tea_culture_street', name: '岭南茶文化街电商创业园', location: '广东省云浮市云城区', address: '云城区', description: '岭南茶文化街电商创业园' }
                  ]
                },
                {
                  id: 'luoding',
                  name: '罗定市',
                  markets: [
                    { id: 'tangzhen_lvquan_tea_coop', name: '塘镇绿泉茶叶合作社', location: '广东省云浮市罗定市', address: '罗定市', description: '塘镇绿泉茶叶合作社' },
                    { id: 'jinhu_tourism_tea_culture', name: '金湖旅游茶文化区', location: '广东省云浮市罗定市', address: '罗定市', description: '金湖旅游茶文化区' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'jiangsu',
          name: '江苏省',
          cities: [
            {
              id: 'nanjing',
              name: '南京市',
              districts: [
                {
                  id: 'gulou',
                  name: '鼓楼区',
                  markets: [
                    { id: 'xiaguan_tea_market', name: '下关茶叶市场', location: '江苏省南京市鼓楼区', address: '鼓楼区', description: '下关地区茶叶交易市场' },
                    { id: 'hesheng_tea_field', name: '禾盛茶叶场', location: '江苏省南京市鼓楼区', address: '鼓楼区', description: '禾盛茶叶交易场' }
                  ]
                },
                {
                  id: 'jianye',
                  name: '建邺区',
                  markets: [
                    { id: 'jiangsu_zhengda_tea_city', name: '江苏正大茶城', location: '江苏省南京市建邺区', address: '建邺区', description: '江苏正大茶城交易中心' },
                    { id: 'nanjing_puer_tea_center', name: '南京普洱茶交易中心', location: '江苏省南京市建邺区', address: '建邺区', description: '南京普洱茶专营交易中心' }
                  ]
                },
                {
                  id: 'pukou',
                  name: '浦口区（江北）',
                  markets: [
                    { id: 'nanjing_south_station_tea_city', name: '南京南站茶城', location: '江苏省南京市浦口区', address: '浦口区', description: '南京南站茶城交易中心' }
                  ]
                },
                {
                  id: 'jiangning',
                  name: '江宁区',
                  markets: [
                    { id: 'lulang_tea_wholesale', name: '陆朗茶叶批发', location: '江苏省南京市江宁区', address: '江宁区', description: '陆朗茶叶批发市场' }
                  ]
                },
                {
                  id: 'qinhuai',
                  name: '秦淮区',
                  markets: [
                    { id: 'fuzimiao_tea_market', name: '夫子庙茶叶市场', location: '江苏省南京市秦淮区', address: '秦淮区', description: '夫子庙茶叶交易市场' },
                    { id: 'xinyu_lianghang', name: '信誉粮行', location: '江苏省南京市秦淮区', address: '秦淮区', description: '信誉粮行茶叶交易' }
                  ]
                }
              ]
            },
            {
              id: 'wuxi',
              name: '无锡市',
              districts: [
                {
                  id: 'liangxi',
                  name: '梁溪区',
                  markets: [
                    { id: 'hongxing_tea_wholesale_market', name: '红星茶叶批发市场', location: '江苏省无锡市梁溪区', address: '梁溪区', description: '红星茶叶批发市场' },
                    { id: 'chaoyang_tea_market', name: '朝阳茶叶市场', location: '江苏省无锡市梁溪区', address: '梁溪区', description: '朝阳茶叶交易市场' },
                    { id: 'dajiangnan_tea_field', name: '大江南茶叶场', location: '江苏省无锡市梁溪区', address: '梁溪区', description: '大江南茶叶交易场' }
                  ]
                },
                {
                  id: 'nanchang',
                  name: '南长区',
                  markets: [
                    { id: 'taihu_tea_market', name: '太湖茶叶市场', location: '江苏省无锡市南长区', address: '南长区', description: '太湖茶叶交易市场' }
                  ]
                },
                {
                  id: 'xinqu',
                  name: '新区',
                  markets: [
                    { id: 'wuxi_international_tea_city', name: '无锡国际茶叶城', location: '江苏省无锡市新区', address: '新区', description: '无锡国际茶叶城交易中心' }
                  ]
                },
                {
                  id: 'specialty_wholesale',
                  name: '特色批发',
                  markets: [
                    { id: 'hongtaiyang_tea_city', name: '红太阳茶叶城', location: '江苏省无锡市', address: '无锡市', description: '红太阳茶叶城交易中心' },
                    { id: 'qianhong_zaochun_tea', name: '乾红·早春茶', location: '江苏省无锡市', address: '无锡市', description: '乾红早春茶专营店' },
                    { id: 'zhaoshang_tea_city', name: '招商城茶城', location: '江苏省无锡市', address: '无锡市', description: '招商城茶城交易中心' }
                  ]
                }
              ]
            },
            {
              id: 'xuzhou',
              name: '徐州市',
              districts: [
                {
                  id: 'yunlong',
                  name: '云龙区',
                  markets: [
                    { id: 'yumao_tea_market', name: '裕茂茶叶市场', location: '江苏省徐州市云龙区', address: '云龙区', description: '裕茂茶叶交易市场' },
                    { id: 'xuzhou_tea_field', name: '徐州茶叶场', location: '江苏省徐州市云龙区', address: '云龙区', description: '徐州茶叶交易场' }
                  ]
                },
                {
                  id: 'gulou_xuzhou',
                  name: '鼓楼区',
                  markets: [
                    { id: 'minnan_tea_market', name: '闽南茶叶市场', location: '江苏省徐州市鼓楼区', address: '鼓楼区', description: '闽南茶叶交易市场' },
                    { id: 'laotongchang_tea_market', name: '老同昌茶叶市场', location: '江苏省徐州市鼓楼区', address: '鼓楼区', description: '老同昌茶叶交易市场' }
                  ]
                },
                {
                  id: 'quanshan',
                  name: '泉山区',
                  markets: [
                    { id: 'quanshan_tea_distribution', name: '泉山茶叶集散区', location: '江苏省徐州市泉山区', address: '泉山区', description: '泉山茶叶集散交易区' },
                    { id: 'hubushan_tea_market', name: '户部山茶叶市场', location: '江苏省徐州市泉山区', address: '泉山区', description: '户部山茶叶交易市场' }
                  ]
                }
              ]
            },
            {
              id: 'changzhou',
              name: '常州市',
              districts: [
                {
                  id: 'main_city',
                  name: '主城区',
                  markets: [
                    { id: 'yipin_tea_market', name: '一品茶叶交易市场', location: '江苏省常州市主城区', address: '主城区', description: '一品茶叶交易市场' },
                    { id: 'yinqiao_tea_market', name: '银桥茶叶市场（马坝古镇）', location: '江苏省常州市主城区', address: '主城区', description: '马坝古镇银桥茶叶市场' },
                    { id: 'bazu_kaigu_international', name: '霸祖开古国际兰陵茶城（常州普洱茶场）', location: '江苏省常州市主城区', address: '主城区', description: '霸祖开古国际兰陵茶城' },
                    { id: 'buyecheng_tea_field', name: '不夜城茶叶场', location: '江苏省常州市主城区', address: '主城区', description: '不夜城茶叶交易场' }
                  ]
                },
                {
                  id: 'jintan',
                  name: '金坛区',
                  markets: [
                    { id: 'huashan_tea_market', name: '花山茶叶市场', location: '江苏省常州市金坛区', address: '金坛区', description: '花山茶叶交易市场' },
                    { id: 'maolu_tea_market', name: '茅麓茶叶市场', location: '江苏省常州市金坛区', address: '金坛区', description: '茅麓茶叶交易市场' }
                  ]
                }
              ]
            },
            {
              id: 'suzhou',
              name: '苏州市',
              districts: [
                {
                  id: 'gusong',
                  name: '姑苏区',
                  markets: [
                    { id: 'dalonggang_tea_wholesale', name: '大龙港茶叶批发市场', location: '江苏省苏州市姑苏区', address: '姑苏区', description: '大龙港茶叶批发市场' },
                    { id: 'huilin_xinshi', name: '汇邻·新市（原苏州茶叶市场）', location: '江苏省苏州市姑苏区', address: '姑苏区', description: '汇邻新市茶叶交易中心' },
                    { id: 'anhejin_meidi_park', name: '安和锦·美地PARK茶人街', location: '江苏省苏州市姑苏区', address: '姑苏区', description: '安和锦美地PARK茶人街' }
                  ]
                },
                {
                  id: 'wuzhong',
                  name: '吴中区',
                  markets: [
                    { id: 'nanmen_tea_wholesale', name: '南门茶叶批发市场', location: '江苏省苏州市吴中区', address: '吴中区', description: '南门茶叶批发市场' },
                    { id: 'tiantu_tea_city', name: '天荼茶城（木渎凯马广场）', location: '江苏省苏州市吴中区', address: '吴中区', description: '木渎凯马广场天荼茶城' }
                  ]
                }
              ]
            },
            {
              id: 'nantong',
              name: '南通市',
              districts: [
                {
                  id: 'nantong_city',
                  name: '南通市',
                  markets: [
                    { id: 'nantong_international_tea_city', name: '南通国际茶城', location: '江苏省南通市', address: '南通市', description: '南通国际茶城交易中心' },
                    { id: 'nantong_tea_city', name: '南通茶叶城', location: '江苏省南通市', address: '南通市', description: '南通茶叶城交易中心' },
                    { id: 'wenfeng_tea_market', name: '文峰茶叶市场', location: '江苏省南通市', address: '南通市', description: '文峰茶叶交易市场' },
                    { id: 'lvyuan_tea_market', name: '绿源茶叶市场', location: '江苏省南通市', address: '南通市', description: '绿源茶叶交易市场' }
                  ]
                }
              ]
            },
            {
              id: 'lianyungang',
              name: '连云港市',
              districts: [
                {
                  id: 'haizhou',
                  name: '海州区',
                  markets: [
                    { id: 'siji_agricultural_tea_section', name: '四季农副产品场茶叶专区', location: '江苏省连云港市海州区', address: '海州区', description: '四季农副产品场茶叶专区' },
                    { id: 'baihushan_wholesale_market', name: '白虎山批发市场', location: '江苏省连云港市海州区', address: '海州区', description: '白虎山批发市场茶叶区' }
                  ]
                },
                {
                  id: 'lianyun',
                  name: '连云区',
                  markets: [
                    { id: 'huadong_tea_market', name: '华东城茶叶市场', location: '江苏省连云港市连云区', address: '连云区', description: '华东城茶叶交易市场' }
                  ]
                }
              ]
            },
            {
              id: 'huaian',
              name: '淮安市',
              districts: [
                {
                  id: 'qingjiangpu',
                  name: '清江浦区',
                  markets: [
                    { id: 'fulin_tea_wholesale', name: '福林茶叶批发市场', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '福林茶叶批发市场' },
                    { id: 'qingjiangpu_tea_market', name: '清江浦区茶叶市场（圩北路市场）', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '圩北路茶叶交易市场' },
                    { id: 'huaian_tea_wholesale_center', name: '淮安市茶叶批发中心', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '淮安市茶叶批发中心' },
                    { id: 'huaian_ancient_tea_street', name: '淮安古茶街', location: '江苏省淮安市清江浦区', address: '清江浦区', description: '淮安古茶街交易中心' }
                  ]
                },
                {
                  id: 'huaiyin_qinghe',
                  name: '淮阴区/清河新区',
                  markets: [
                    { id: 'huaian_tea_market', name: '淮安茶叶大市场', location: '江苏省淮安市淮阴区', address: '淮阴区', description: '淮安茶叶大市场交易中心' },
                    { id: 'huaian_international_tea_city', name: '淮安国际茶城', location: '江苏省淮安市淮阴区', address: '淮阴区', description: '淮安国际茶城交易中心' }
                  ]
                }
              ]
            },
            {
              id: 'yancheng',
              name: '盐城市',
              districts: [
                {
                  id: 'yancheng_city',
                  name: '盐城市',
                  markets: [
                    { id: 'baima_tea_market', name: '白马茶叶市场', location: '江苏省盐城市', address: '盐城市', description: '白马茶叶交易市场' },
                    { id: 'jiangsu_zhengda_tea_city_yancheng', name: '江苏正大茶叶城', location: '江苏省盐城市', address: '盐城市', description: '江苏正大茶叶城交易中心' },
                    { id: 'jiuding_tea_field', name: '九鼎茶叶场', location: '江苏省盐城市', address: '盐城市', description: '九鼎茶叶交易场' },
                    { id: 'tea_market_new_location', name: '茶叶大市场（新址）', location: '江苏省盐城市', address: '盐城市', description: '茶叶大市场新址交易中心' },
                    { id: 'ziwei_tea_city', name: '紫薇茶城', location: '江苏省盐城市', address: '盐城市', description: '紫薇茶城交易中心' }
                  ]
                }
              ]
            },
            {
              id: 'yangzhou',
              name: '扬州市',
              districts: [
                {
                  id: 'guangling',
                  name: '广陵区',
                  markets: [
                    { id: 'yangzhou_agricultural_tea_field', name: '扬州农业茶叶场', location: '江苏省扬州市广陵区', address: '广陵区', description: '扬州农业茶叶交易场' },
                    { id: 'hehuachi_walking_tea_field', name: '荷花池步行街茶叶场', location: '江苏省扬州市广陵区', address: '广陵区', description: '荷花池步行街茶叶交易场' },
                    { id: 'tianmuchun_tea_wholesale', name: '天目春茶业批发部', location: '江苏省扬州市广陵区', address: '广陵区', description: '天目春茶业批发部' }
                  ]
                },
                {
                  id: 'hanjiang',
                  name: '邗江区',
                  markets: [
                    { id: 'yangzhou_tea_field', name: '扬州茶叶场（原南门市场）', location: '江苏省扬州市邗江区', address: '邗江区', description: '原南门市场茶叶交易场' },
                    { id: 'yongshang_tea_wholesale', name: '永尚茶叶批发部', location: '江苏省扬州市邗江区', address: '邗江区', description: '永尚茶叶批发部' },
                    { id: 'runyang_tea_field', name: '润扬茶叶场', location: '江苏省扬州市邗江区', address: '邗江区', description: '润扬茶叶交易场' }
                  ]
                },
                {
                  id: 'jiangdu',
                  name: '江都区',
                  markets: [
                    { id: 'eqiao_tea_wholesale_market', name: '峨桥镇茶叶批发市场', location: '江苏省扬州市江都区', address: '江都区', description: '峨桥镇茶叶批发市场' }
                  ]
                }
              ]
            },
            {
              id: 'zhenjiang',
              name: '镇江市',
              districts: [
                {
                  id: 'zhenjiang_city',
                  name: '镇江市',
                  markets: [
                    { id: 'jingkou_tea_market', name: '京口路茶叶市场（京口路茶叶城）', location: '江苏省镇江市', address: '镇江市', description: '京口路茶叶城交易中心' },
                    { id: 'zhenjiang_yiwu_tea_wholesale', name: '镇江义乌小商品城茶叶批发市场', location: '江苏省镇江市', address: '镇江市', description: '义乌小商品城茶叶批发市场' },
                    { id: 'xinba_tea_city', name: '新坝茶叶城', location: '江苏省镇江市', address: '镇江市', description: '新坝茶叶城交易中心' }
                  ]
                }
              ]
            },
            {
              id: 'taizhou',
              name: '泰州市',
              districts: [
                {
                  id: 'hailing',
                  name: '海陵区',
                  markets: [
                    { id: 'taizhou_tea_city', name: '泰州市茶叶城', location: '江苏省泰州市海陵区', address: '海陵区', description: '泰州市茶叶城交易中心' },
                    { id: 'jiulong_food_market', name: '九龙副食品市场（茶叶专区）', location: '江苏省泰州市海陵区', address: '海陵区', description: '九龙副食品市场茶叶专区' },
                    { id: 'taizhou_agricultural_center', name: '泰州市农副产品中心场', location: '江苏省泰州市海陵区', address: '海陵区', description: '泰州市农副产品中心场' },
                    { id: 'sixiang_tea_city', name: '寺巷茶叶城', location: '江苏省泰州市海陵区', address: '海陵区', description: '寺巷茶叶城交易中心' },
                    { id: 'lvsexinqing_tea_ware', name: '绿色心情茶叶茶具批发商行', location: '江苏省泰州市海陵区', address: '海陵区', description: '绿色心情茶叶茶具批发商行' }
                  ]
                },
                {
                  id: 'gaogang_jiangyan',
                  name: '高港区/姜堰区',
                  markets: [
                    { id: 'lishan_tea_shop', name: '历山茶行', location: '江苏省泰州市高港区', address: '高港区', description: '历山茶行交易中心' },
                    { id: 'xiaoye_tea_wholesale', name: '小叶茶叶批发', location: '江苏省泰州市姜堰区', address: '姜堰区', description: '小叶茶叶批发市场' }
                  ]
                }
              ]
            },
            {
              id: 'suqian',
              name: '宿迁市',
              districts: [
                {
                  id: 'suqian_city',
                  name: '宿迁市',
                  markets: [
                    { id: 'eqiao_tea_trading_market', name: '峨桥茶叶交易市场', location: '江苏省宿迁市', address: '宿迁市', description: '峨桥茶叶交易市场' },
                    { id: 'hongxing_kaisheng_tea_city', name: '红星凯盛茶叶城', location: '江苏省宿迁市', address: '宿迁市', description: '红星凯盛茶叶城交易中心' },
                    { id: 'suqian_shoumei_white_tea_field', name: '宿迁寿眉白茶场', location: '江苏省宿迁市', address: '宿迁市', description: '宿迁寿眉白茶交易场' },
                    { id: 'suqian_puer_tea_field', name: '宿迁市普洱茶场', location: '江苏省宿迁市', address: '宿迁市', description: '宿迁市普洱茶交易场' }
                  ]
                }
              ]
            },
            {
              id: 'kunshan',
              name: '昆山市',
              districts: [
                {
                  id: 'kunshan_city',
                  name: '昆山市',
                  markets: [
                    { id: 'chunhui_tea_wholesale_market', name: '春晖茶叶批发市场', location: '江苏省昆山市', address: '昆山市', description: '春晖茶叶批发市场' },
                    { id: 'kunshan_tea_city', name: '昆山茶叶城', location: '江苏省昆山市', address: '昆山市', description: '昆山茶叶城交易中心' },
                    { id: 'yushan_tea_market', name: '玉山茶叶市场', location: '江苏省昆山市', address: '昆山市', description: '玉山茶叶交易市场' },
                    { id: 'huayuan_tea_street', name: '花园路茶叶街', location: '江苏省昆山市', address: '昆山市', description: '花园路茶叶交易街' },
                    { id: 'yushan_comprehensive_wholesale', name: '玉山镇综合批发市场（含兴灿茶叶批发部、宝法茶叶南北货批发总汇）', location: '江苏省昆山市', address: '昆山市', description: '玉山镇综合批发市场茶叶区' }
                  ]
                }
              ]
            },
            {
              id: 'taixing',
              name: '泰兴市',
              districts: [
                {
                  id: 'taixing_city',
                  name: '泰兴市',
                  markets: [
                    { id: 'taizhou_mei_dealer_field', name: '泰州眉经销场', location: '江苏省泰兴市', address: '泰兴市', description: '泰州眉经销场交易中心' },
                    { id: 'yintai_shopping_tea_cluster', name: '银泰购物中心茶业集群（含大世界茶叶批发部、东进茶业）', location: '江苏省泰兴市', address: '泰兴市', description: '银泰购物中心茶业集群' }
                  ]
                }
              ]
            },
            {
              id: 'shuyang',
              name: '沭阳县',
              districts: [
                {
                  id: 'shuyang_county',
                  name: '沭阳县',
                  markets: [
                    { id: 'baimeng_logistics_tea_city', name: '百盟物流产业园茶城区', location: '江苏省沭阳县', address: '沭阳县', description: '百盟物流产业园茶城区' },
                    { id: 'lantian_international_trade_city', name: '蓝天国际商贸城（茶叶专区）', location: '江苏省沭阳县', address: '沭阳县', description: '蓝天国际商贸城茶叶专区' },
                    { id: 'wanhao_international_hotel_tea_city', name: '万豪国际大酒店附属茶城', location: '江苏省沭阳县', address: '沭阳县', description: '万豪国际大酒店附属茶城' },
                    { id: 'darunfa_supermarket_tea_street', name: '大润发超市商店街（茶叶商户）', location: '江苏省沭阳县', address: '沭阳县', description: '大润发超市商店街茶叶商户' },
                    { id: 'dongfang_plaza_tea_merchants', name: '东方广场（茶叶商户）', location: '江苏省沭阳县', address: '沭阳县', description: '东方广场茶叶商户区' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'hubei',
          name: '湖北省',
          cities: [
            {
              id: 'wuhan',
              name: '武汉市',
              districts: [
                {
                  id: 'huangpi',
                  name: '黄陂区',
                  markets: [
                    {
                      id: 'hankoubei_tea_field',
                      name: '汉口北茶叶场',
                      location: '湖北省武汉市黄陂区',
                      merchantCount: 150,
                      address: '武汉市黄陂区汉口北',
                      description: '汉口北地区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'jiangan',
                  name: '江岸区',
                  markets: [
                    {
                      id: 'zhongchu_tea_field',
                      name: '中储茶叶场',
                      location: '湖北省武汉市江岸区',
                      merchantCount: 120,
                      address: '武汉市江岸区',
                      description: '中储地区茶叶交易市场'
                    },
                    {
                      id: 'chongrenlu_tea_market',
                      name: '崇仁路茶叶市场',
                      location: '湖北省武汉市江岸区',
                      merchantCount: 100,
                      address: '武汉市江岸区崇仁路',
                      description: '崇仁路茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'hanyang',
                  name: '汉阳区',
                  markets: [
                    {
                      id: 'xibeihu_tea_market',
                      name: '西北湖茶叶市场',
                      location: '湖北省武汉市汉阳区',
                      merchantCount: 90,
                      address: '武汉市汉阳区西北湖',
                      description: '西北湖地区茶叶交易市场'
                    },
                    {
                      id: 'zhiyin_international_tea_city',
                      name: '知音国际茶城',
                      location: '湖北省武汉市汉阳区',
                      merchantCount: 110,
                      address: '武汉市汉阳区',
                      description: '知音国际茶城交易中心'
                    }
                  ]
                },
                {
                  id: 'qiaokou',
                  name: '硚口区',
                  markets: [
                    {
                      id: 'yudaimingdu_tea_market',
                      name: '玉带茗都茶叶市场',
                      location: '湖北省武汉市硚口区',
                      merchantCount: 85,
                      address: '武汉市硚口区',
                      description: '玉带茗都茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'hongshan',
                  name: '洪山区',
                  markets: [
                    {
                      id: 'xudong_tea_market',
                      name: '徐东茶市',
                      location: '湖北省武汉市洪山区',
                      merchantCount: 95,
                      address: '武汉市洪山区徐东',
                      description: '徐东地区茶叶交易市场'
                    },
                    {
                      id: 'shuiguohu_tea_market',
                      name: '水果湖茶叶市场',
                      location: '湖北省武汉市洪山区',
                      merchantCount: 80,
                      address: '武汉市洪山区水果湖',
                      description: '水果湖地区茶叶交易市场'
                    },
                    {
                      id: 'hongshan_luoyu_wholesale_market',
                      name: '洪山珞喻路批发市场',
                      location: '湖北省武汉市洪山区',
                      merchantCount: 130,
                      address: '武汉市洪山区珞喻路',
                      description: '珞喻路茶叶批发市场'
                    }
                  ]
                },
                {
                  id: 'wuchang',
                  name: '武昌区',
                  markets: [
                    {
                      id: 'luyu_tea_capital',
                      name: '陆羽茶都',
                      location: '湖北省武汉市武昌区',
                      merchantCount: 140,
                      address: '武汉市武昌区',
                      description: '陆羽茶都交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'huangshi',
              name: '黄石市',
              districts: [
                {
                  id: 'huangshigang',
                  name: '黄石港区',
                  markets: [
                    {
                      id: 'huangshi_tea_city',
                      name: '黄石茶城',
                      location: '湖北省黄石市黄石港区',
                      merchantCount: 100,
                      address: '黄石市黄石港区',
                      description: '黄石市主要茶叶交易中心'
                    },
                    {
                      id: 'huazhong_tea_city',
                      name: '华中茶叶城',
                      location: '湖北省黄石市黄石港区',
                      merchantCount: 85,
                      address: '黄石市黄石港区',
                      description: '华中茶叶城交易中心'
                    }
                  ]
                },
                {
                  id: 'xisaishan',
                  name: '西塞山区',
                  markets: [
                    {
                      id: 'dahankou_tea_market',
                      name: '大汉口茶市',
                      location: '湖北省黄石市西塞山区',
                      merchantCount: 75,
                      address: '黄石市西塞山区',
                      description: '大汉口茶市交易中心'
                    },
                    {
                      id: 'jingpin_yinpin_market',
                      name: '精品饮品市场',
                      location: '湖北省黄石市西塞山区',
                      merchantCount: 60,
                      address: '黄石市西塞山区',
                      description: '精品饮品市场茶叶专区'
                    }
                  ]
                },
                {
                  id: 'xingang',
                  name: '新港园区',
                  markets: [
                    {
                      id: 'jinhai_white_tea_trading_center',
                      name: '金海白茶交易中心',
                      location: '湖北省黄石市新港园区',
                      merchantCount: 0,
                      address: '黄石市新港园区',
                      description: '金海白茶交易中心（建设中）',
                      isUnderConstruction: true
                    }
                  ]
                }
              ]
            },
            {
              id: 'shiyan',
              name: '十堰市',
              districts: [
                {
                  id: 'maojian',
                  name: '茅箭区',
                  markets: [
                    {
                      id: 'liulinlu_chutian_tea_wholesale',
                      name: '柳林路楚天名茶批发部',
                      location: '湖北省十堰市茅箭区',
                      merchantCount: 40,
                      address: '十堰市茅箭区柳林路',
                      description: '楚天名茶批发部'
                    },
                    {
                      id: 'wudang_tea_city',
                      name: '武当茶城',
                      location: '湖北省十堰市茅箭区',
                      merchantCount: 90,
                      address: '十堰市茅箭区',
                      description: '武当茶城交易中心'
                    },
                    {
                      id: 'hubei_xianghui_tea_development',
                      name: '湖北祥辉茶业开发有限公司',
                      location: '湖北省十堰市茅箭区',
                      merchantCount: 25,
                      address: '十堰市茅箭区',
                      description: '湖北祥辉茶业开发有限公司'
                    }
                  ]
                },
                {
                  id: 'economic_development_zone',
                  name: '经济开发区',
                  markets: [
                    {
                      id: 'gaoshan_mingcha_tea_dealer',
                      name: '高山茗茶茶叶经销处',
                      location: '湖北省十堰市经济开发区',
                      merchantCount: 30,
                      address: '十堰市经济开发区',
                      description: '高山茗茶茶叶经销处'
                    },
                    {
                      id: 'lishijia_tea_wholesale',
                      name: '李氏家园茶业批发商行',
                      location: '湖北省十堰市经济开发区',
                      merchantCount: 35,
                      address: '十堰市经济开发区',
                      description: '李氏家园茶业批发商行'
                    },
                    {
                      id: 'tangtuo_commerce',
                      name: '堂拓商贸',
                      location: '湖北省十堰市经济开发区',
                      merchantCount: 20,
                      address: '十堰市经济开发区',
                      description: '堂拓商贸茶叶经销'
                    }
                  ]
                },
                {
                  id: 'zhushan',
                  name: '竹山县',
                  markets: [
                    {
                      id: 'zhushan_mingcha_tea_sales',
                      name: '竹山县茗茶汇茶叶销售门市部',
                      location: '湖北省十堰市竹山县',
                      merchantCount: 45,
                      address: '十堰市竹山县',
                      description: '竹山县茗茶汇茶叶销售门市部'
                    },
                    {
                      id: 'zhushan_tea_trading_market',
                      name: '竹山茶叶交易市场',
                      location: '湖北省十堰市竹山县',
                      merchantCount: 80,
                      address: '十堰市竹山县',
                      description: '竹山县茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'zhuxi',
                  name: '竹溪县',
                  markets: [
                    {
                      id: 'eyushan_zhuxi_tea_trading_market',
                      name: '鄂渝陕（竹溪）茶叶交易市场',
                      location: '湖北省十堰市竹溪县',
                      merchantCount: 70,
                      address: '十堰市竹溪县',
                      description: '鄂渝陕（竹溪）茶叶交易市场'
                    },
                    {
                      id: 'zengjiazhai_tea_industry',
                      name: '曾家寨茶业',
                      location: '湖北省十堰市竹溪县',
                      merchantCount: 50,
                      address: '十堰市竹溪县',
                      description: '曾家寨茶业'
                    }
                  ]
                },
                {
                  id: 'danjiangkou',
                  name: '丹江口市',
                  markets: [
                    {
                      id: 'danjiangkou_wudangshan_baxian_tea_field',
                      name: '丹江口市武当山八仙观茶叶总场',
                      location: '湖北省十堰市丹江口市',
                      merchantCount: 60,
                      address: '十堰市丹江口市武当山',
                      description: '武当山八仙观茶叶总场'
                    }
                  ]
                },
                {
                  id: 'shiqu',
                  name: '市区',
                  markets: [
                    {
                      id: 'baichang_quality_agricultural_logistics_park',
                      name: '佰昌优质农产品物流园',
                      location: '湖北省十堰市市区',
                      merchantCount: 55,
                      address: '十堰市市区',
                      description: '佰昌优质农产品物流园茶叶专区'
                    }
                  ]
                }
              ]
            },
            {
              id: 'yichang',
              name: '宜昌市',
              districts: [
                {
                  id: 'yiling',
                  name: '夷陵区',
                  markets: [
                    {
                      id: 'yichang_yiling_tea_city',
                      name: '宜昌夷陵茶城',
                      location: '湖北省宜昌市夷陵区',
                      merchantCount: 110,
                      address: '宜昌市夷陵区',
                      description: '宜昌夷陵茶城交易中心'
                    },
                    {
                      id: 'sanxia_tea_city',
                      name: '三峡茶城',
                      location: '湖北省宜昌市夷陵区',
                      merchantCount: 95,
                      address: '宜昌市夷陵区',
                      description: '三峡茶城交易中心'
                    },
                    {
                      id: 'dengcun_fresh_leaf_trading_market',
                      name: '邓村乡鲜叶交易市场',
                      location: '湖北省宜昌市夷陵区',
                      merchantCount: 70,
                      address: '宜昌市夷陵区邓村乡',
                      description: '邓村乡鲜叶交易市场'
                    }
                  ]
                },
                {
                  id: 'xiling',
                  name: '西陵区',
                  markets: [
                    {
                      id: 'xiling_tea_market',
                      name: '西陵区茶叶市场',
                      location: '湖北省宜昌市西陵区',
                      merchantCount: 85,
                      address: '宜昌市西陵区',
                      description: '西陵区茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'wujiagang',
                  name: '伍家岗区',
                  markets: [
                    {
                      id: 'hankoulu_tea_market',
                      name: '汉口路茶叶市场',
                      location: '湖北省宜昌市伍家岗区',
                      merchantCount: 75,
                      address: '宜昌市伍家岗区汉口路',
                      description: '汉口路茶叶交易市场'
                    },
                    {
                      id: 'guoyuan_yilu_tea_field',
                      name: '果园一路茶叶场',
                      location: '湖北省宜昌市伍家岗区',
                      merchantCount: 65,
                      address: '宜昌市伍家岗区果园一路',
                      description: '果园一路茶叶交易场'
                    }
                  ]
                },
                {
                  id: 'wufeng',
                  name: '五峰县',
                  markets: [
                    {
                      id: 'hubei_southwest_tea_market',
                      name: '湖北西南茶叶市场',
                      location: '湖北省宜昌市五峰县',
                      merchantCount: 80,
                      address: '宜昌市五峰县',
                      description: '湖北西南茶叶市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'xiangyang',
              name: '襄阳市',
              districts: [
                {
                  id: 'fancheng',
                  name: '樊城区',
                  markets: [
                    {
                      id: 'xiangyang_international_tourism_tea_city',
                      name: '襄阳国际旅游茶城',
                      location: '湖北省襄阳市樊城区',
                      merchantCount: 100,
                      address: '襄阳市樊城区',
                      description: '襄阳国际旅游茶城交易中心'
                    },
                    {
                      id: 'xiangyang_tea_wholesale_market',
                      name: '襄阳茶叶批发市场',
                      location: '湖北省襄阳市樊城区',
                      merchantCount: 90,
                      address: '襄阳市樊城区',
                      description: '襄阳茶叶批发市场'
                    },
                    {
                      id: 'caihongmen_tea_market',
                      name: '彩虹门茶叶市场',
                      location: '湖北省襄阳市樊城区',
                      merchantCount: 70,
                      address: '襄阳市樊城区',
                      description: '彩虹门茶叶交易市场'
                    }
                  ]
                },
                {
                  id: 'zhuxi_xiangyang',
                  name: '竹溪县',
                  markets: [
                    {
                      id: 'zhuxi_tea_trading_market_xiangyang',
                      name: '竹溪茶叶交易市场',
                      location: '湖北省襄阳市竹溪县',
                      merchantCount: 60,
                      address: '襄阳市竹溪县',
                      description: '竹溪茶叶交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'ezhou',
              name: '鄂州市',
              districts: [
                {
                  id: 'echeng',
                  name: '鄂城区',
                  markets: [
                    {
                      id: 'ezhou_puer_tea_field',
                      name: '鄂州普洱茶场',
                      location: '湖北省鄂州市鄂城区',
                      merchantCount: 80,
                      address: '鄂州市鄂城区',
                      description: '鄂州普洱茶交易市场'
                    },
                    {
                      id: 'wuchang_dadao_dongshan_tea_market',
                      name: '武昌大道东山茶市',
                      location: '湖北省鄂州市鄂城区',
                      merchantCount: 65,
                      address: '鄂州市鄂城区武昌大道',
                      description: '东山茶市交易中心'
                    }
                  ]
                },
                {
                  id: 'liangzihu',
                  name: '梁子湖区',
                  markets: [
                    {
                      id: 'liangzihu_baohong_tea_wholesale',
                      name: '梁子湖宝洪茶批发配送',
                      location: '湖北省鄂州市梁子湖区',
                      merchantCount: 50,
                      address: '鄂州市梁子湖区',
                      description: '梁子湖宝洪茶批发配送中心'
                    }
                  ]
                },
                {
                  id: 'chengqu',
                  name: '城区',
                  markets: [
                    {
                      id: 'binhunanlu_yingshan_wuzhen_tea_shop',
                      name: '滨湖南路英山雾珍茶叶店',
                      location: '湖北省鄂州市城区',
                      merchantCount: 30,
                      address: '鄂州市城区滨湖南路',
                      description: '英山雾珍茶叶店'
                    },
                    {
                      id: 'shouchang_dadao_wenhui_tea_operation',
                      name: '寿昌大道文辉茶叶经营部',
                      location: '湖北省鄂州市城区',
                      merchantCount: 25,
                      address: '鄂州市城区寿昌大道',
                      description: '文辉茶叶经营部'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jingmen',
              name: '荆门市',
              districts: [
                {
                  id: 'dongbao',
                  name: '东宝区',
                  markets: [
                    {
                      id: 'jingmen_tea_city',
                      name: '荆门茶叶城',
                      location: '湖北省荆门市东宝区',
                      merchantCount: 85,
                      address: '荆门市东宝区',
                      description: '荆门茶叶城交易中心'
                    }
                  ]
                },
                {
                  id: 'duodao',
                  name: '掇刀区',
                  markets: [
                    {
                      id: 'tongyuan_agricultural_tea_zone',
                      name: '通源农贸大市场茶叶专区',
                      location: '湖北省荆门市掇刀区',
                      merchantCount: 70,
                      address: '荆门市掇刀区',
                      description: '通源农贸大市场茶叶专区'
                    }
                  ]
                },
                {
                  id: 'shayang',
                  name: '沙洋县',
                  markets: [
                    {
                      id: 'shayang_tea_ware_market',
                      name: '沙洋县茶具市场',
                      location: '湖北省荆门市沙洋县',
                      merchantCount: 45,
                      address: '荆门市沙洋县',
                      description: '沙洋县茶具交易市场'
                    }
                  ]
                }
              ]
            },
            {
              id: 'xiaogan',
              name: '孝感市',
              districts: [
                {
                  id: 'xiaonan',
                  name: '孝南区',
                  markets: [
                    {
                      id: 'xiaogan_tea_field',
                      name: '孝感茶叶场',
                      location: '湖北省孝感市孝南区',
                      merchantCount: 75,
                      address: '孝感市孝南区',
                      description: '孝感茶叶交易市场'
                    },
                    {
                      id: 'shouheng_cheng_taohuayi_agricultural_exhibition',
                      name: '首衡城·桃花驿农特产品展销中心',
                      location: '湖北省孝感市孝南区',
                      merchantCount: 60,
                      address: '孝感市孝南区',
                      description: '桃花驿农特产品展销中心茶叶专区'
                    },
                    {
                      id: 'hubei_yuanguang_commerce',
                      name: '湖北元广商贸有限公司',
                      location: '湖北省孝感市孝南区',
                      merchantCount: 35,
                      address: '孝感市孝南区',
                      description: '湖北元广商贸有限公司茶叶经销'
                    },
                    {
                      id: 'huping_tea_ware_supermarket',
                      name: '胡平茶叶茶具超市',
                      location: '湖北省孝感市孝南区',
                      merchantCount: 40,
                      address: '孝感市孝南区',
                      description: '胡平茶叶茶具超市'
                    }
                  ]
                }
              ]
            },
            {
              id: 'jingzhou',
              name: '荆州市',
              districts: [
                {
                  id: 'jingzhou',
                  name: '荆州区',
                  markets: [
                    {
                      id: 'jiefanglu_tea_market',
                      name: '解放路茶叶市场',
                      location: '湖北省荆州市荆州区',
                      merchantCount: 80,
                      address: '荆州市荆州区解放路',
                      description: '解放路茶叶交易市场'
                    },
                    {
                      id: 'baling_tea_field',
                      name: '八岭山茶场',
                      location: '湖北省荆州市荆州区',
                      merchantCount: 55,
                      address: '荆州市荆州区八岭山',
                      description: '八岭山茶场交易中心'
                    }
                  ]
                },
                {
                  id: 'shashi',
                  name: '沙市区',
                  markets: [
                    {
                      id: 'hehuashan_agricultural_tea_zone',
                      name: '荷花山农贸市场茶叶专区',
                      location: '湖北省荆州市沙市区',
                      merchantCount: 65,
                      address: '荆州市沙市区荷花山',
                      description: '荷花山农贸市场茶叶专区'
                    },
                    {
                      id: 'danfengjie_small_commodity_wholesale',
                      name: '丹凤街小商品批发市场',
                      location: '湖北省荆州市沙市区',
                      merchantCount: 50,
                      address: '荆州市沙市区丹凤街',
                      description: '丹凤街小商品批发市场茶叶专区'
                    }
                  ]
                }
              ]
            },
            {
              id: 'huanggang',
              name: '黄冈市',
              districts: [
                {
                  id: 'yingshan',
                  name: '英山县',
                  markets: [
                    {
                      id: 'yingshan_dabieshan_tea_square',
                      name: '英山县大别山茶叶广场',
                      location: '湖北省黄冈市英山县',
                      merchantCount: 90,
                      address: '黄冈市英山县大别山',
                      description: '大别山茶叶广场交易中心'
                    }
                  ]
                },
                {
                  id: 'huangzhou',
                  name: '黄州区',
                  markets: [
                    {
                      id: 'huanggang_tea_field',
                      name: '黄冈茶叶场',
                      location: '湖北省黄冈市黄州区',
                      merchantCount: 85,
                      address: '黄冈市黄州区',
                      description: '黄冈茶叶交易市场'
                    },
                    {
                      id: 'huangzhou_quanxin_tea_operation',
                      name: '黄州区全鑫茶叶经营部',
                      location: '湖北省黄冈市黄州区',
                      merchantCount: 30,
                      address: '黄冈市黄州区',
                      description: '全鑫茶叶经营部'
                    },
                    {
                      id: 'yixiangyuan_tea_house',
                      name: '一香源茶庄',
                      location: '湖北省黄冈市黄州区',
                      merchantCount: 25,
                      address: '黄冈市黄州区',
                      description: '一香源茶庄'
                    }
                  ]
                },
                {
                  id: 'hongan',
                  name: '红安县',
                  markets: [
                    {
                      id: 'hongan_laojunmei_tea_field',
                      name: '红安县老君眉茶场',
                      location: '湖北省黄冈市红安县',
                      merchantCount: 70,
                      address: '黄冈市红安县',
                      description: '红安县老君眉茶场交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'xianning',
              name: '咸宁市',
              districts: [
                {
                  id: 'xianan',
                  name: '咸安区',
                  markets: [
                    {
                      id: 'xianning_tea_market',
                      name: '咸宁市茶叶市场',
                      location: '湖北省咸宁市咸安区',
                      merchantCount: 95,
                      address: '咸宁市咸安区',
                      description: '咸宁市主要茶叶交易市场'
                    },
                    {
                      id: 'china_sanyi_tea_capital',
                      name: '中国三亿茶都',
                      location: '湖北省咸宁市咸安区',
                      merchantCount: 110,
                      address: '咸宁市咸安区',
                      description: '中国三亿茶都交易中心'
                    },
                    {
                      id: 'xianning_tea_field',
                      name: '咸宁茶叶场',
                      location: '湖北省咸宁市咸安区',
                      merchantCount: 80,
                      address: '咸宁市咸安区',
                      description: '咸宁茶叶交易市场'
                    },
                    {
                      id: 'hesheng_tea_grand_market',
                      name: '贺胜茶叶大市场',
                      location: '湖北省咸宁市咸安区',
                      merchantCount: 75,
                      address: '咸宁市咸安区',
                      description: '贺胜茶叶大市场'
                    }
                  ]
                },
                {
                  id: 'chibi',
                  name: '赤壁市',
                  markets: [
                    {
                      id: 'yangloudong_ancient_town_tea_market',
                      name: '羊楼洞古镇茶市',
                      location: '湖北省咸宁市赤壁市',
                      merchantCount: 85,
                      address: '咸宁市赤壁市羊楼洞古镇',
                      description: '羊楼洞古镇茶市交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'suizhou',
              name: '随州市',
              districts: [
                {
                  id: 'shiqu_suizhou',
                  name: '市区',
                  markets: [
                    {
                      id: 'suizhou_tea_city',
                      name: '随州茶叶城',
                      location: '湖北省随州市市区',
                      merchantCount: 90,
                      address: '随州市市区',
                      description: '随州茶叶城交易中心'
                    },
                    {
                      id: 'suizhou_market',
                      name: '随州市场',
                      location: '湖北省随州市市区',
                      merchantCount: 70,
                      address: '随州市市区',
                      description: '随州市场茶叶专区'
                    },
                    {
                      id: 'shennong_tea_culture_street',
                      name: '神农茶文化街',
                      location: '湖北省随州市市区',
                      merchantCount: 60,
                      address: '随州市市区',
                      description: '神农茶文化街交易中心'
                    }
                  ]
                },
                {
                  id: 'zengdu',
                  name: '曾都区',
                  markets: [
                    {
                      id: 'yunfengshan_tea_field',
                      name: '云峰山茶场',
                      location: '湖北省随州市曾都区',
                      merchantCount: 55,
                      address: '随州市曾都区云峰山',
                      description: '云峰山茶场交易中心'
                    }
                  ]
                },
                {
                  id: 'suixian',
                  name: '随县',
                  markets: [
                    {
                      id: 'yunwushan_tea_field',
                      name: '云雾山茶场',
                      location: '湖北省随州市随县',
                      merchantCount: 65,
                      address: '随州市随县云雾山',
                      description: '云雾山茶场交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'enshi',
              name: '恩施州',
              districts: [
                {
                  id: 'enshi_city',
                  name: '恩施市',
                  markets: [
                    {
                      id: 'wulingshan_tea_trading_center',
                      name: '武陵山茶叶交易中心',
                      location: '湖北省恩施州恩施市',
                      merchantCount: 100,
                      address: '恩施州恩施市',
                      description: '武陵山茶叶交易中心'
                    },
                    {
                      id: 'enshi_tea_harbor',
                      name: '恩施茶港',
                      location: '湖北省恩施州恩施市',
                      merchantCount: 85,
                      address: '恩施州恩施市',
                      description: '恩施茶港交易中心'
                    }
                  ]
                },
                {
                  id: 'bajiao',
                  name: '芭蕉侗族乡',
                  markets: [
                    {
                      id: 'bajiao_fresh_leaf_temporary_trading_market',
                      name: '芭蕉茶叶鲜叶临时交易市场',
                      location: '湖北省恩施州芭蕉侗族乡',
                      merchantCount: 70,
                      address: '恩施州芭蕉侗族乡',
                      description: '芭蕉茶叶鲜叶临时交易市场'
                    },
                    {
                      id: 'xidu_tea_city',
                      name: '硒都茶城',
                      location: '湖北省恩施州芭蕉侗族乡',
                      merchantCount: 80,
                      address: '恩施州芭蕉侗族乡',
                      description: '硒都茶城交易中心'
                    }
                  ]
                },
                {
                  id: 'xianfeng',
                  name: '咸丰县',
                  markets: [
                    {
                      id: 'tangya_tea_market',
                      name: '唐崖茶市',
                      location: '湖北省恩施州咸丰县',
                      merchantCount: 75,
                      address: '恩施州咸丰县',
                      description: '唐崖茶市交易中心'
                    }
                  ]
                }
              ]
            },
            {
              id: 'shennongjia',
              name: '神农架林区',
              districts: [
                {
                  id: 'songbai',
                  name: '松柏镇',
                  markets: [
                    {
                      id: 'songbai_center_agricultural_tea_zone',
                      name: '松柏镇中心农贸市场茶叶专区',
                      location: '湖北省神农架林区松柏镇',
                      merchantCount: 50,
                      address: '神农架林区松柏镇',
                      description: '松柏镇中心农贸市场茶叶专区'
                    }
                  ]
                },
                {
                  id: 'cross_region_cooperation',
                  name: '跨区合作',
                  markets: [
                    {
                      id: 'xiangyang_international_tourism_tea_city_cooperation',
                      name: '襄阳国际旅游茶城（跨区合作）',
                      location: '湖北省神农架林区',
                      merchantCount: 0,
                      address: '神农架林区',
                      description: '襄阳国际旅游茶城跨区合作项目',
                      isCrossRegion: true
                    },
                    {
                      id: 'yichang_dengcun_fresh_leaf_trading_cooperation',
                      name: '宜昌邓村鲜叶交易市场（跨区合作）',
                      location: '湖北省神农架林区',
                      merchantCount: 0,
                      address: '神农架林区',
                      description: '宜昌邓村鲜叶交易市场跨区合作项目',
                      isCrossRegion: true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'zhejiang',
          name: '浙江省',
          cities: [
            // 杭州市
            {
              id: 'hangzhou',
              name: '杭州市',
              districts: [
                {
                  id: 'yuhang',
                  name: '余杭区',
                  markets: [
                    { id: 'hangzhou_jiangnan_tea_market', name: '杭州江南茶叶市场', location: '浙江省杭州市余杭区', address: '余杭区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'xihu',
                  name: '西湖区',
                  markets: [
                    { id: 'hangzhou_sijiqing_market', name: '杭州四季青市场', location: '浙江省杭州市西湖区', address: '西湖区', description: '核心综合市场' },
                    { id: 'hangzhou_xihu_tea_market', name: '杭州西湖茶叶市场', location: '浙江省杭州市西湖区转塘', address: '转塘', description: '核心综合市场' },
                    { id: 'wuliting_tea_market', name: '五里亭茶业批发市场', location: '浙江省杭州市西湖区留下镇', address: '留下镇', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'shangcheng',
                  name: '上城区',
                  markets: [
                    { id: 'hangzhou_jiefang_tea_market', name: '杭州解放路茶叶市场', location: '浙江省杭州市上城区', address: '上城区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'xiaoshan',
                  name: '萧山区',
                  markets: [
                    { id: 'xiaoshan_shangcheng_tea_field', name: '萧山商城中路茶叶场', location: '浙江省杭州市萧山区', address: '萧山区', description: '特色专项市场' }
                  ]
                }
              ]
            },
            // 宁波市
            {
              id: 'ningbo',
              name: '宁波市',
              districts: [
                {
                  id: 'haishu',
                  name: '海曙区',
                  markets: [
                    { id: 'ningbo_tea_market', name: '宁波茶叶批发市场', location: '浙江省宁波市海曙区', address: '海曙区', description: '核心综合市场' },
                    { id: 'hengshi_tea_market', name: '横石桥茶叶市场', location: '浙江省宁波市海曙区', address: '海曙区', description: '特色专项市场' },
                    { id: 'ningbo_puer_tea_field', name: '宁波普洱茶叶场', location: '浙江省宁波市海曙区', address: '海曙区', description: '特色专项市场' }
                  ]
                },
                {
                  id: 'jiangdong',
                  name: '江东区',
                  markets: [
                    { id: 'jinzhong_tea_city', name: '金钟茶城', location: '浙江省宁波市江东区', address: '江东区', description: '核心综合市场（新址迁至江东区）' }
                  ]
                },
                {
                  id: 'beilun',
                  name: '北仑区',
                  markets: [
                    { id: 'ningbo_international_tea_city', name: '宁波国际茶叶城', location: '浙江省宁波市北仑区', address: '北仑区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'xiangshan',
                  name: '象山县',
                  markets: [
                    { id: 'xiangshan_tea_market', name: '象山茶叶市场', location: '浙江省宁波市象山县', address: '象山县', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'yinzhou',
                  name: '鄞州区',
                  markets: [
                    { id: 'dongqianhu_tea_market', name: '东钱湖茶叶市场', location: '浙江省宁波市鄞州区', address: '鄞州区', description: '特色专项市场' }
                  ]
                }
              ]
            },
            // 温州市
            {
              id: 'wenzhou',
              name: '温州市',
              districts: [
                {
                  id: 'longwan',
                  name: '龙湾区',
                  markets: [
                    { id: 'wenzhou_tea_city', name: '温州茶城', location: '浙江省温州市龙湾区', address: '龙湾区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'ouhai',
                  name: '瓯海区',
                  markets: [
                    { id: 'zhejiang_south_tea_market', name: '浙南茶叶市场', location: '浙江省温州市瓯海区', address: '瓯海区', description: '核心综合市场' },
                    { id: 'panqiao_international_tea_city', name: '潘桥国际茶博城', location: '浙江省温州市瓯海区', address: '瓯海区', description: '核心综合市场' }
                  ]
                },
                {
                  id: 'ruian',
                  name: '瑞安市',
                  markets: [
                    { id: 'gaolou_tea_market', name: '高楼茶寮茶叶交易市场', location: '浙江省温州市瑞安市', address: '瑞安市', description: '产地特色市场' }
                  ]
                },
                {
                  id: 'yongjia',
                  name: '永嘉县',
                  markets: [
                    { id: 'yongjia_sanjiang_tea_city', name: '永嘉三江综合茶城', location: '浙江省温州市永嘉县', address: '永嘉县', description: '产地特色市场（建设中）' }
                  ]
                }
              ]
            },
            // 嘉兴市
            {
              id: 'jiaxing',
              name: '嘉兴市',
              districts: [
                {
                  id: 'nanhu',
        address: '上饶市婺源县',
        description: '婺源县茶叶交易市场，中国最美乡村茶叶集散地',
        level: '县级',
        specialties: ['绿茶', '婺源绿茶']
      }
    ],

    // 当前选中的层级
    selectedProvince: null,
    selectedCity: null,
    selectedDistrict: null,
    
    // 当前显示的市场列表
    currentMarkets: [],
    
    // 搜索关键词
    searchKeyword: '',
    
    // 排序方式
    sortType: 'comprehensive', // 'comprehensive' | 'newest' | 'activity'
    
    // 筛选条件
    activeFilter: 'all'
  },

  onLoad(options) {
    console.log('全国市场页面加载完成')
    this.initData()
    
    // 检查是否需要显示入驻表单
    if (options.showJoin === 'true') {
      this.setData({
        showJoinModal: true
      })
    }
  },

  // 初始化数据
  initData() {
    // 为所有区县添加"其他"选项
    this.addOtherMarketsToAllDistricts()
    
    // 默认显示知名市场
    this.setData({
      currentMarkets: this.data.famousMarkets
    })
  },

  // 为所有区县添加"其他"选项
  addOtherMarketsToAllDistricts() {
    const geographicData = { ...this.data.geographicData }
    
    geographicData.provinces.forEach(province => {
      province.cities.forEach(city => {
        city.districts.forEach(district => {
          // 检查是否已经有"其他"选项
          const hasOther = district.markets.some(market => market.isOther)
          if (!hasOther) {
            const otherMarket = {
              id: `${district.id}_other`,
              name: '其他',
              location: district.markets[0]?.location || '',
              merchantCount: 0,
              address: district.markets[0]?.address || '',
              description: `${district.name}其他茶叶市场`,
              isOther: true
            }
            district.markets.push(otherMarket)
          }
        })
      })
    })
    
    this.setData({
      geographicData: geographicData
    })
  },

  // 切换分类类型
  switchType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType: type,
      selectedProvince: null,
      selectedCity: null,
      selectedDistrict: null
    })
    
    if (type === 'famous') {
      this.setData({
        currentMarkets: this.data.famousMarkets
      })
    } else {
      this.setData({
        currentMarkets: []
      })
    }
  },

  // 选择省份
  selectProvince(e) {
    const provinceId = e.currentTarget.dataset.id
    const province = this.data.geographicData.provinces.find(p => p.id === provinceId)
    
    this.setData({
      selectedProvince: province,
      selectedCity: null,
      selectedDistrict: null,
      currentMarkets: []
    })
  },

  // 选择城市
  selectCity(e) {
    const cityId = e.currentTarget.dataset.id
    const city = this.data.selectedProvince.cities.find(c => c.id === cityId)
    
    this.setData({
      selectedCity: city,
      selectedDistrict: null,
      currentMarkets: []
    })
  },

  // 选择区县
  selectDistrict(e) {
    const districtId = e.currentTarget.dataset.id
    const district = this.data.selectedCity.districts.find(d => d.id === districtId)
    
    this.setData({
      selectedDistrict: district,
      currentMarkets: district.markets
    })
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this.filterMarkets()
  },

  // 筛选市场
  filterMarkets() {
    let markets = []
    
    if (this.data.currentType === 'famous') {
      markets = this.data.famousMarkets
    } else if (this.data.selectedDistrict) {
      markets = this.data.selectedDistrict.markets
    }
    
    if (this.data.searchKeyword) {
      markets = markets.filter(market => 
        market.name.includes(this.data.searchKeyword) ||
        market.location.includes(this.data.searchKeyword)
      )
    }
    
    this.setData({
      currentMarkets: markets
    })
  },

  // 设置排序方式
  setSortType(e) {
    const sortType = e.currentTarget.dataset.type
    this.setData({
      sortType: sortType
    })
    this.sortMarkets()
  },

  // 排序市场
  sortMarkets() {
    let markets = [...this.data.currentMarkets]
    
    switch (this.data.sortType) {
      case 'comprehensive':
        // 综合排序（按商户数量）
        markets.sort((a, b) => b.merchantCount - a.merchantCount)
        break
      case 'newest':
        // 最新入驻（这里用ID模拟）
        markets.sort((a, b) => b.id.localeCompare(a.id))
        break
      case 'activity':
        // 活跃度（这里用商户数量模拟）
        markets.sort((a, b) => b.merchantCount - a.merchantCount)
        break
    }
    
    this.setData({
      currentMarkets: markets
    })
  },

  // 查看市场详情
  viewMarketDetail(e) {
    const marketId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/market-detail/market-detail?id=${marketId}`,
      fail: () => {
        wx.showToast({
          title: '页面开发中',
          icon: 'none'
        })
      }
    })
  },

  // 返回上级
  goBack() {
    if (this.data.selectedDistrict) {
      this.setData({
        selectedDistrict: null,
        currentMarkets: []
      })
    } else if (this.data.selectedCity) {
      this.setData({
        selectedCity: null,
        selectedDistrict: null,
        currentMarkets: []
      })
    } else if (this.data.selectedProvince) {
      this.setData({
        selectedProvince: null,
        selectedCity: null,
        selectedDistrict: null,
        currentMarkets: []
      })
    }
  },

  // 显示入驻申请表单
  showJoinGuide() {
    // 初始化市场选择数据
    const provinceList = this.data.geographicData.provinces
    this.setData({
      showJoinModal: true,
      'joinForm.provinceList': provinceList
    })
  },

  // 关闭入驻申请表单
  closeJoinForm() {
    this.setData({
      showJoinModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止事件冒泡
  },

  // 表单输入处理
  inputJoinForm(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`joinForm.${field}`]: value
    })
  },

  // 选择经营类型
  onBusinessTypeChange(e) {
    const index = e.detail.value
    this.setData({
      'joinForm.businessType': this.data.businessTypes[index]
    })
  },

  // 选择主营品类
  onCategoryChange(e) {
    const index = e.detail.value
    this.setData({
      'joinForm.mainCategory': this.data.mainCategories[index]
    })
  },

  // 选择省份
  onProvinceChange(e) {
    const index = e.detail.value
    const province = this.data.joinForm.provinceList[index]
    const cityList = province.cities
    
    this.setData({
      'joinForm.selectedProvince': province,
      'joinForm.cityList': cityList,
      'joinForm.selectedCity': null,
      'joinForm.districtList': [],
      'joinForm.selectedDistrict': null,
      'joinForm.marketList': [],
      'joinForm.selectedMarket': null
    })
  },

  // 选择城市
  onCityChange(e) {
    const index = e.detail.value
    const city = this.data.joinForm.cityList[index]
    const districtList = city.districts
    
    this.setData({
      'joinForm.selectedCity': city,
      'joinForm.districtList': districtList,
      'joinForm.selectedDistrict': null,
      'joinForm.marketList': [],
      'joinForm.selectedMarket': null
    })
  },

  // 选择区县
  onDistrictChange(e) {
    const index = e.detail.value
    const district = this.data.joinForm.districtList[index]
    
    this.setData({
      'joinForm.selectedDistrict': district,
      'joinForm.marketList': district.markets,
      'joinForm.selectedMarket': null
    })
  },

  // 选择市场
  onMarketChange(e) {
    const index = e.detail.value
    const market = this.data.joinForm.marketList[index]
    
    this.setData({
      'joinForm.selectedMarket': market
    })
  },

  // 上传营业执照
  uploadLicense() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'joinForm.license': res.tempFilePaths[0]
        })
        wx.showToast({
          title: '营业执照上传成功',
          icon: 'success'
        })
      }
    })
  },

  // 提交入驻申请
  submitJoinForm() {
    const form = this.data.joinForm
    
    // 表单验证 - 只验证必填项
    if (!form.merchantName.trim()) {
      wx.showToast({
        title: '请输入商户名称',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedProvince) {
      wx.showToast({
        title: '请选择省份',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedCity) {
      wx.showToast({
        title: '请选择城市',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedDistrict) {
      wx.showToast({
        title: '请选择区县',
        icon: 'none'
      })
      return
    }
    
    if (!form.selectedMarket) {
      wx.showToast({
        title: '请选择市场',
        icon: 'none'
      })
      return
    }
    
    // 显示提交中状态
    wx.showLoading({
      title: '提交中...'
    })
    
    // 模拟提交
    setTimeout(() => {
      wx.hideLoading()
      
      // 显示提交成功信息
      const marketInfo = form.selectedMarket.isOther ? 
        `${form.selectedProvince.name}${form.selectedCity.name}${form.selectedDistrict.name}其他市场` :
        form.selectedMarket.name
      
      wx.showModal({
        title: '申请提交成功',
        content: `您的入驻申请已提交，申请入驻市场：${marketInfo}`,
        showCancel: false,
        confirmText: '确定',
        success: () => {
          // 关闭弹窗并重置表单
          this.setData({
            showJoinModal: false,
            joinForm: {
              merchantName: '',
              contactName: '',
              phone: '',
              wechat: '',
              businessType: '',
              mainCategory: '',
              description: '',
              license: '',
              // 市场选择相关
              provinceList: [],
              cityList: [],
              districtList: [],
              marketList: [],
              selectedProvince: null,
              selectedCity: null,
              selectedDistrict: null,
              selectedMarket: null
            }
          })
          
          // 跳转到入驻指南页面
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/market-join-guide/market-join-guide'
            })
          }, 500)
        }
      })
    }, 2000)
  }
}) 