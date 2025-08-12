// 河南省茶叶市场数据
const henanData = {
  id: 'henan',
  name: '河南省',
  cities: [
    {
      id: 'zhengzhou',
      name: '郑州市',
      districts: [
        {
          id: 'zhongyuan',
          name: '中原区',
          markets: [
            {
              id: 'zhengzhou_tea_city',
              name: '郑州茶城',
              location: '河南省郑州市中原区',
              merchantCount: 200,
              address: '郑州市中原区',
              description: '郑州市主要茶叶交易中心'
            },
            {
              id: 'zhongyuan_tea_market',
              name: '中原茶叶市场',
              location: '河南省郑州市中原区',
              merchantCount: 150,
              address: '郑州市中原区',
              description: '中原区茶叶交易市场'
            }
          ]
        },
        {
          id: 'erqi',
          name: '二七区',
          markets: [
            {
              id: 'erqi_tea_field',
              name: '二七茶叶场',
              location: '河南省郑州市二七区',
              merchantCount: 120,
              address: '郑州市二七区',
              description: '二七区茶叶交易场'
            }
          ]
        },
        {
          id: 'guancheng',
          name: '管城回族区',
          markets: [
            {
              id: 'guancheng_tea_market',
              name: '管城茶叶市场',
              location: '河南省郑州市管城回族区',
              merchantCount: 100,
              address: '郑州市管城回族区',
              description: '管城回族区茶叶交易市场'
            }
          ]
        },
        {
          id: 'jinshui',
          name: '金水区',
          markets: [
            {
              id: 'jinshui_tea_city',
              name: '金水茶城',
              location: '河南省郑州市金水区',
              merchantCount: 180,
              address: '郑州市金水区',
              description: '金水区茶叶交易中心'
            }
          ]
        },
        {
          id: 'shangjie',
          name: '上街区',
          markets: [
            {
              id: 'shangjie_tea_field',
              name: '上街茶叶场',
              location: '河南省郑州市上街区',
              merchantCount: 80,
              address: '郑州市上街区',
              description: '上街区茶叶交易场'
            }
          ]
        },
        {
          id: 'huiji',
          name: '惠济区',
          markets: [
            {
              id: 'huiji_tea_market',
              name: '惠济茶叶市场',
              location: '河南省郑州市惠济区',
              merchantCount: 90,
              address: '郑州市惠济区',
              description: '惠济区茶叶交易市场'
            }
          ]
        },
        {
          id: 'zhongmu',
          name: '中牟县',
          markets: [
            {
              id: 'zhongmu_tea_field',
              name: '中牟茶叶场',
              location: '河南省郑州市中牟县',
              merchantCount: 70,
              address: '郑州市中牟县',
              description: '中牟县茶叶交易场'
            }
          ]
        },
        {
          id: 'gongyi',
          name: '巩义市',
          markets: [
            {
              id: 'gongyi_tea_market',
              name: '巩义茶叶市场',
              location: '河南省郑州市巩义市',
              merchantCount: 85,
              address: '郑州市巩义市',
              description: '巩义市茶叶交易市场'
            }
          ]
        },
        {
          id: 'xingyang',
          name: '荥阳市',
          markets: [
            {
              id: 'xingyang_tea_field',
              name: '荥阳茶叶场',
              location: '河南省郑州市荥阳市',
              merchantCount: 75,
              address: '郑州市荥阳市',
              description: '荥阳市茶叶交易场'
            }
          ]
        },
        {
          id: 'xinmi',
          name: '新密市',
          markets: [
            {
              id: 'xinmi_tea_market',
              name: '新密茶叶市场',
              location: '河南省郑州市新密市',
              merchantCount: 65,
              address: '郑州市新密市',
              description: '新密市茶叶交易市场'
            }
          ]
        },
        {
          id: 'xinzheng',
          name: '新郑市',
          markets: [
            {
              id: 'xinzheng_tea_field',
              name: '新郑茶叶场',
              location: '河南省郑州市新郑市',
              merchantCount: 80,
              address: '郑州市新郑市',
              description: '新郑市茶叶交易场'
            }
          ]
        },
        {
          id: 'dengfeng',
          name: '登封市',
          markets: [
            {
              id: 'dengfeng_tea_market',
              name: '登封茶叶市场',
              location: '河南省郑州市登封市',
              merchantCount: 60,
              address: '郑州市登封市',
              description: '登封市茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'luoyang',
      name: '洛阳市',
      districts: [
        {
          id: 'xigong',
          name: '西工区',
          markets: [
            {
              id: 'baolong_tea_market',
              name: '宝龙茶叶市场',
              location: '河南省洛阳市西工区',
              merchantCount: 100,
              address: '西工区北京路宝龙城附近',
              description: '宝龙茶叶交易市场'
            },
            {
              id: 'shaxi_tea_field',
              name: '纱西茶叶场',
              location: '河南省洛阳市西工区',
              merchantCount: 80,
              address: '西工区纱厂西路87号',
              description: '纱西茶叶交易场'
            },
            {
              id: 'mudan_home_tea_market',
              name: '牡丹家居广场茶叶市场',
              location: '河南省洛阳市西工区',
              merchantCount: 90,
              address: '西工区宫隅路（近嘉豫门大街）',
              description: '牡丹家居广场茶叶市场'
            },
            {
              id: 'gongzhonglu_tea_market',
              name: '宫中路茶叶市场',
              location: '河南省洛阳市西工区',
              merchantCount: 75,
              address: '西工区宫中路45号A区17号',
              description: '宫中路茶叶交易市场'
            }
          ]
        },
        {
          id: 'laocheng',
          name: '老城区',
          markets: [
            {
              id: 'chundulu_tea_market',
              name: '春都路茶叶专卖总市场',
              location: '河南省洛阳市老城区',
              merchantCount: 85,
              address: '老城区春都路53号',
              description: '春都路茶叶专卖总市场'
            }
          ]
        },
        {
          id: 'wangcheng',
          name: '王城区',
          markets: [
            {
              id: 'luoyang_tea_capital',
              name: '洛阳茶都',
              location: '河南省洛阳市王城区',
              merchantCount: 140,
              address: '王城大道与健康西路交叉口',
              description: '洛阳茶都交易中心'
            }
          ]
        }
      ]
    },
    {
      id: 'kaifeng',
      name: '开封市',
      districts: [
        {
          id: 'shunhe',
          name: '顺河回族区',
          markets: [
            {
              id: 'kaifeng_tea_city',
              name: '开封茶城（中原第一茶市）',
              location: '河南省开封市顺河回族区',
              merchantCount: 160,
              address: '顺河回族区商都路70号',
              description: '开封茶城交易中心'
            }
          ]
        },
        {
          id: 'longting',
          name: '龙亭区',
          markets: [
            {
              id: 'kaifeng_puer_tea_market',
              name: '开封市普洱茶交易市场',
              location: '河南省开封市龙亭区',
              merchantCount: 120,
              address: '龙亭区明伦路特1号',
              description: '开封市普洱茶交易市场'
            }
          ]
        },
        {
          id: 'gulou',
          name: '鼓楼区',
          markets: [
            {
              id: 'bianjing_tea_market',
              name: '汴京茶叶市场',
              location: '河南省开封市鼓楼区',
              merchantCount: 100,
              address: '市中心鼓楼区',
              description: '汴京茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'pingdingshan',
      name: '平顶山市',
      districts: [
        {
          id: 'xinhua',
          name: '新华区',
          markets: [
            {
              id: 'xinhua_tea_trading_market',
              name: '新华区茶叶专业交易市场',
              location: '河南省平顶山市新华区',
              merchantCount: 110,
              address: '开源路与文化宫路交叉口',
              description: '新华区茶叶专业交易市场'
            },
            {
              id: 'pingdingshan_international_tea_city',
              name: '平顶山国际茶城',
              location: '河南省平顶山市新华区',
              merchantCount: 130,
              address: '新华区平博大道与泰山路交叉口',
              description: '平顶山国际茶城交易中心'
            },
            {
              id: 'yingcheng_tea_market',
              name: '鹰城茶叶市场',
              location: '河南省平顶山市新华区',
              merchantCount: 90,
              address: '新华区鹰城路',
              description: '鹰城茶叶交易市场'
            }
          ]
        },
        {
          id: 'weidong',
          name: '卫东区',
          markets: [
            {
              id: 'weidong_jianshelu_tea_market',
              name: '卫东区建设路茶叶市场',
              location: '河南省平顶山市卫东区',
              merchantCount: 85,
              address: '建设路东段（近花卉路）',
              description: '卫东区建设路茶叶市场'
            }
          ]
        },
        {
          id: 'dongqu',
          name: '东区',
          markets: [
            {
              id: 'kaiyuan_tea_market',
              name: '开源茶叶市场',
              location: '河南省平顶山市东区',
              merchantCount: 80,
              address: '东区开源路',
              description: '开源茶叶交易市场'
            }
          ]
        },
        {
          id: 'hubin',
          name: '湖滨区',
          markets: [
            {
              id: 'jintahua_trading_market',
              name: '金茶花交易市场',
              location: '河南省平顶山市湖滨区',
              merchantCount: 95,
              address: '湖滨区龙脊街与108国道交叉口',
              description: '金茶花茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'anyang',
      name: '安阳市',
      districts: [
        {
          id: 'gaoxin',
          name: '高新区',
          markets: [
            {
              id: 'gaoxin_qianhexiang_tea_market',
              name: '高新区乾和祥古玩茶叶市场',
              location: '河南省安阳市高新区',
              merchantCount: 100,
              address: '高新区文峰大道与东风路交叉口',
              description: '高新区乾和祥古玩茶叶市场'
            }
          ]
        },
        {
          id: 'wenfeng',
          name: '文峰区',
          markets: [
            {
              id: 'anyang_tea_ware_wholesale_city',
              name: '安阳茶业茶具批发城',
              location: '河南省安阳市文峰区',
              merchantCount: 120,
              address: '文峰大道与东工路交叉口西230米',
              description: '安阳茶业茶具批发城'
            },
            {
              id: 'yubei_tea_city',
              name: '豫北茶城',
              location: '河南省安阳市文峰区',
              merchantCount: 110,
              address: '文峰区灯塔路与东工路交叉口',
              description: '豫北茶城交易中心'
            }
          ]
        },
        {
          id: 'chengqu',
          name: '城区',
          markets: [
            {
              id: 'ding_tea_market',
              name: '丁茶叶市场',
              location: '河南省安阳市城区',
              merchantCount: 85,
              address: '安阳市城区中心',
              description: '丁茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'hebi',
      name: '鹤壁市',
      districts: [
        {
          id: 'heshan',
          name: '鹤山区',
          markets: [
            {
              id: 'hebi_tea_city',
              name: '鹤壁茶城',
              location: '河南省鹤壁市鹤山区',
              merchantCount: 90,
              address: '鹤山区富村路20号',
              description: '鹤壁茶城交易中心'
            }
          ]
        },
        {
          id: 'qibin',
          name: '淇滨区',
          markets: [
            {
              id: 'tea_capital',
              name: '茶都',
              location: '河南省鹤壁市淇滨区',
              merchantCount: 80,
              address: '淇滨区鹤山南路',
              description: '茶都交易市场'
            },
            {
              id: 'sijiqing_culture_tea_area',
              name: '四季青文化广场茶叶区',
              location: '河南省鹤壁市淇滨区',
              merchantCount: 70,
              address: '淇滨区九州路四季青文化广场',
              description: '四季青文化广场茶叶区'
            }
          ]
        }
      ]
    },
    {
      id: 'xinxiang',
      name: '新乡市',
      districts: [
        {
          id: 'jinshui',
          name: '金水区',
          markets: [
            {
              id: 'xinxiang_tea_market',
              name: '新乡茶叶市场',
              location: '河南省新乡市金水区',
              merchantCount: 100,
              address: '金水区文化路与文化宫路交叉口',
              description: '新乡茶叶交易市场'
            }
          ]
        },
        {
          id: 'shiqu',
          name: '市区',
          markets: [
            {
              id: 'tea_culture_walking_street',
              name: '茶文化步行街',
              location: '河南省新乡市市区',
              merchantCount: 85,
              address: '市区主干道沿线（文化路辐射范围）',
              description: '茶文化步行街交易区'
            }
          ]
        }
      ]
    },
    {
      id: 'jiaozuo',
      name: '焦作市',
      districts: [
        {
          id: 'jiefang',
          name: '解放区',
          markets: [
            {
              id: 'jiaozuo_tea_wholesale_market',
              name: '焦作茶叶批发市场（温州商贸城）',
              location: '河南省焦作市解放区',
              merchantCount: 95,
              address: '解放区丰收路与普济路交汇处',
              description: '焦作茶叶批发市场'
            }
          ]
        }
      ]
    },
    {
      id: 'puyang',
      name: '濮阳市',
      districts: [
        {
          id: 'hualong',
          name: '华龙区',
          markets: [
            {
              id: 'puyang_tea_field',
              name: '濮阳市茶叶场',
              location: '河南省濮阳市华龙区',
              merchantCount: 90,
              address: '华龙区黄河路与京开大道交叉口',
              description: '濮阳市茶叶交易场'
            },
            {
              id: 'shengli_donglu_tea_wholesale_city',
              name: '胜利东路中原茶叶批发城',
              location: '河南省濮阳市华龙区',
              merchantCount: 85,
              address: '京开路与胜利东路交叉口东100米',
              description: '胜利东路中原茶叶批发城'
            }
          ]
        }
      ]
    },
    {
      id: 'xuchang',
      name: '许昌市',
      districts: [
        {
          id: 'jianan',
          name: '建安区',
          markets: [
            {
              id: 'xuchang_tea_city',
              name: '许昌茶城',
              location: '河南省许昌市建安区',
              merchantCount: 120,
              address: '建安区邓庄乡（城南商贸物流园东侧）',
              description: '许昌茶城交易中心'
            }
          ]
        },
        {
          id: 'weidu',
          name: '魏都区',
          markets: [
            {
              id: 'luminghu_tea_market',
              name: '鹿鸣湖茶叶市场',
              location: '河南省许昌市魏都区',
              merchantCount: 95,
              address: '魏都区学院北路奥体花城',
              description: '鹿鸣湖茶叶交易市场'
            },
            {
              id: 'wuzhou_tea_city',
              name: '五洲茶城',
              location: '河南省许昌市魏都区',
              merchantCount: 80,
              address: '魏都区延安路33栋二楼',
              description: '五洲茶城交易中心'
            }
          ]
        },
        {
          id: 'dongcheng',
          name: '东城区',
          markets: [
            {
              id: 'huifeng_tea_market',
              name: '汇丰茶叶市场',
              location: '河南省许昌市东城区',
              merchantCount: 85,
              address: '东城区邓庄乡汇丰市场B区',
              description: '汇丰茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'sanmenxia',
      name: '三门峡市',
      districts: [
        {
          id: 'hubin',
          name: '湖滨区',
          markets: [
            {
              id: 'sanmenxia_yiwu_tea_area',
              name: '三门峡义乌商贸城茶叶区',
              location: '河南省三门峡市湖滨区',
              merchantCount: 90,
              address: '湖滨区B座一层西茶叶区',
              description: '三门峡义乌商贸城茶叶区'
            },
            {
              id: 'huanghelu_tea_gathering',
              name: '黄河路茶叶聚集带',
              location: '河南省三门峡市湖滨区',
              merchantCount: 75,
              address: '湖滨区黄河路与经一路交叉口',
              description: '黄河路茶叶聚集带'
            }
          ]
        }
      ]
    },
    {
      id: 'luohe',
      name: '漯河市',
      districts: [
        {
          id: 'yuanhui',
          name: '源汇区',
          markets: [
            {
              id: 'yuanhui_liujiangdong_tea_wholesale',
              name: '源汇区柳江东路茶叶批发市场',
              location: '河南省漯河市源汇区',
              merchantCount: 85,
              address: '源汇区柳江路（近五一路、文化路）',
              description: '源汇区柳江东路茶叶批发市场'
            }
          ]
        },
        {
          id: 'yancheng',
          name: '郾城区',
          markets: [
            {
              id: 'yancheng_food_wholesale_tea_market',
              name: '郾城区食品批发交易市场',
              location: '河南省漯河市郾城区',
              merchantCount: 70,
              address: '郾城区淞江路',
              description: '郾城区食品批发交易市场茶叶区'
            }
          ]
        }
      ]
    },
    {
      id: 'nanyang',
      name: '南阳市',
      districts: [
        {
          id: 'wolong',
          name: '卧龙区',
          markets: [
            {
              id: 'liuzhuang_tea_market',
              name: '刘庄农贸（茶叶）市场',
              location: '河南省南阳市卧龙区',
              merchantCount: 100,
              address: '卧龙区车站北路',
              description: '刘庄农贸茶叶交易市场'
            },
            {
              id: 'nanyang_tea_city',
              name: '南阳茶城',
              location: '河南省南阳市卧龙区',
              merchantCount: 120,
              address: '卧龙区文峰西路',
              description: '南阳茶城交易中心'
            },
            {
              id: 'wolong_tea_capital',
              name: '卧龙茶都',
              location: '河南省南阳市卧龙区',
              merchantCount: 110,
              address: '长江路高端专卖店集群',
              description: '卧龙茶都高端茶叶交易中心'
            }
          ]
        },
        {
          id: 'huashan',
          name: '华山区',
          markets: [
            {
              id: 'huashan_zaolin_tea_city',
              name: '华山路农贸市场（枣林茶城）',
              location: '河南省南阳市华山区',
              merchantCount: 95,
              address: '华山路与长江中路交叉口',
              description: '华山路农贸市场茶叶区'
            }
          ]
        },
        {
          id: 'shizhongxin',
          name: '市中心',
          markets: [
            {
              id: 'nandajie_tea_market',
              name: '南大街茶叶市场',
              location: '河南省南阳市市中心',
              merchantCount: 85,
              address: '市中心南大街',
              description: '南大街茶叶交易市场'
            },
            {
              id: 'wenhualu_tea_market',
              name: '文化路茶叶市场',
              location: '河南省南阳市市中心',
              merchantCount: 80,
              address: '文化路',
              description: '文化路茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'shangqiu',
      name: '商丘市',
      districts: [
        {
          id: 'liangyuan',
          name: '梁园区',
          markets: [
            {
              id: 'shangqiu_tea_wholesale_city',
              name: '商丘茶叶批发城',
              location: '河南省商丘市梁园区',
              merchantCount: 110,
              address: '长江路与凯旋路交叉口',
              description: '商丘茶叶批发城交易中心'
            },
            {
              id: 'yusen_tea_city',
              name: '玉森茶城',
              location: '河南省商丘市梁园区',
              merchantCount: 95,
              address: '梁园区长征路与八一西路交叉口',
              description: '玉森茶城交易中心'
            }
          ]
        }
      ]
    },
    {
      id: 'xinyang',
      name: '信阳市',
      districts: [
        {
          id: 'shihe',
          name: '浉河区',
          markets: [
            {
              id: 'shihegang_tea_trading_market',
              name: '浉河港茶叶交易市场',
              location: '河南省信阳市浉河区',
              merchantCount: 150,
              address: '浉河区浉河港镇',
              description: '浉河港茶叶交易市场'
            },
            {
              id: 'dongjiahe_tea_trading_market',
              name: '董家河茶叶交易市场',
              location: '河南省信阳市浉河区',
              merchantCount: 130,
              address: '浉河区董家河镇',
              description: '董家河茶叶交易市场'
            },
            {
              id: 'xinyang_tea_city',
              name: '信阳茶城',
              location: '河南省信阳市浉河区',
              merchantCount: 140,
              address: '浉河区茶韵大道',
              description: '信阳茶城交易中心'
            },
            {
              id: 'chenggong_garden_tea_market',
              name: '成功花园茶叶市场',
              location: '河南省信阳市浉河区',
              merchantCount: 100,
              address: '浉河区东关对面',
              description: '成功花园茶叶交易市场'
            },
            {
              id: 'dongshuanghe_tea_market',
              name: '东双河茶叶市场',
              location: '河南省信阳市浉河区',
              merchantCount: 90,
              address: '浉河区107国道旁',
              description: '东双河茶叶交易市场'
            },
            {
              id: 'tanjiahe_tea_market',
              name: '谭家河茶叶市场',
              location: '河南省信阳市浉河区',
              merchantCount: 85,
              address: '省道224沿线',
              description: '谭家河茶叶交易市场'
            }
          ]
        },
        {
          id: 'yangshan',
          name: '羊山新区',
          markets: [
            {
              id: 'xinyang_international_tea_city',
              name: '信阳国际茶城',
              location: '河南省信阳市羊山新区',
              merchantCount: 180,
              address: '羊山新区北环路中段',
              description: '信阳国际茶城交易中心'
            }
          ]
        },
        {
          id: 'pingqiao',
          name: '平桥区',
          markets: [
            {
              id: 'pingqiao_tea_market',
              name: '平桥路口茶叶市场',
              location: '河南省信阳市平桥区',
              merchantCount: 95,
              address: '平桥区中心',
              description: '平桥路口茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'zhoukou',
      name: '周口市',
      districts: [
        {
          id: 'chuanhui',
          name: '川汇区',
          markets: [
            {
              id: 'zhoukou_tea_field',
              name: '周口茶叶场',
              location: '河南省周口市川汇区',
              merchantCount: 100,
              address: '川汇区中原路与建设路交叉口',
              description: '周口茶叶交易场'
            }
          ]
        },
        {
          id: 'xihuanlu',
          name: '西环路',
          markets: [
            {
              id: 'xihuanlu_tea_trading_area',
              name: '西环路茶叶商贸区',
              location: '河南省周口市西环路',
              merchantCount: 85,
              address: '西环路商贸区',
              description: '西环路茶叶商贸区'
            }
          ]
        },
        {
          id: 'qiyilu',
          name: '七一路',
          markets: [
            {
              id: 'qiyilu_tea_street',
              name: '七一路茶叶街',
              location: '河南省周口市七一路',
              merchantCount: 90,
              address: '文明路北段（七一路与交通路之间）',
              description: '七一路茶叶街交易区'
            }
          ]
        }
      ]
    },
    {
      id: 'zhumadian',
      name: '驻马店市',
      districts: [
        {
          id: 'yicheng',
          name: '驿城区',
          markets: [
            {
              id: 'zhumadian_tea_market',
              name: '驻马店市茶叶市场（天中茶叶城）',
              location: '河南省驻马店市驿城区',
              merchantCount: 110,
              address: '驿城区泰山路与金山路交叉口',
              description: '驻马店市茶叶市场交易中心'
            },
            {
              id: 'tianzhongshan_tea_market',
              name: '天中山大道茶叶市场',
              location: '河南省驻马店市驿城区',
              merchantCount: 95,
              address: '驿城区天中山大道与天顺路交叉口',
              description: '天中山大道茶叶交易市场'
            }
          ]
        }
      ]
    },
    {
      id: 'jiyuan',
      name: '济源市',
      districts: [
        {
          id: 'beihuanlu',
          name: '北环路',
          markets: [
            {
              id: 'xihuan_agricultural_wholesale_market',
              name: '西环农贸批发市场（规划中）',
              location: '河南省济源市北环路',
              merchantCount: 0,
              address: '北环路与龙源路交叉口（预计2026年建成）',
              description: '西环农贸批发市场（规划建设中）'
            }
          ]
        }
      ]
    }
  ]
};

module.exports = henanData; 