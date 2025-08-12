// 茶叶市场数据处理工具
const teaMarketData = {
  // 省份列表
  provinces: [
    { id: 1, name: '山东省', marketCount: 83 },
    { id: 2, name: '北京市', marketCount: 10 },
    { id: 3, name: '福建省', marketCount: 61 },
    { id: 4, name: '云南省', marketCount: 198 },
    { id: 5, name: '浙江省', marketCount: 62 },
    { id: 6, name: '广东省', marketCount: 124 },
    { id: 7, name: '江苏省', marketCount: 84 },
    { id: 8, name: '江西省', marketCount: 55 },
    { id: 9, name: '湖北省', marketCount: 77 },
    { id: 10, name: '四川省', marketCount: 126 },
    { id: 11, name: '贵州省', marketCount: 41 },
    { id: 12, name: '安徽省', marketCount: 55 },
    { id: 13, name: '河南省', marketCount: 41 },
    { id: 14, name: '河北省', marketCount: 79 },
    { id: 15, name: '湖南省', marketCount: 67 },
    { id: 16, name: '山西省', marketCount: 25 },
    { id: 17, name: '重庆市', marketCount: 12 },
    { id: 18, name: '天津市', marketCount: 8 },
    { id: 19, name: '上海市', marketCount: 12 },
    { id: 20, name: '陕西省', marketCount: 29 },
    { id: 21, name: '辽宁省', marketCount: 22 },
    { id: 22, name: '黑龙江省', marketCount: 35 },
    { id: 23, name: '吉林省', marketCount: 12 }
  ],

  // 市场详情数据
  markets: [
    // 山东省
    { id: 1, provinceId: 1, province: '山东省', city: '青岛市', district: '李沧区', name: '青岛国际茶城（兴邦茶城）', address: '李沧区' },
    { id: 2, provinceId: 1, province: '山东省', city: '青岛市', district: '李沧区', name: '天都锦茶文化城', address: '李沧区' },
    { id: 3, provinceId: 1, province: '山东省', city: '青岛市', district: '李沧区', name: '李村茶叶批发市场', address: '李沧区' },
    { id: 4, provinceId: 1, province: '山东省', city: '青岛市', district: '李沧区', name: '东李茶城', address: '李沧区' },
    { id: 5, provinceId: 1, province: '山东省', city: '青岛市', district: '李沧区', name: '利客来茶叶市场', address: '李沧区' },
    { id: 6, provinceId: 1, province: '山东省', city: '青岛市', district: '崂山区', name: '崂山茶叶批发市场', address: '崂山区' },
    { id: 7, provinceId: 1, province: '山东省', city: '青岛市', district: '城阳区', name: '青闽茶叶市场（峄阳文化茶叶市场）', address: '城阳区' },
    { id: 8, provinceId: 1, province: '山东省', city: '青岛市', district: '黄岛区', name: '茶马古道茶叶市场', address: '黄岛区' },
    { id: 9, provinceId: 1, province: '山东省', city: '青岛市', district: '市北区', name: '青岛国际茶城（市北区分支）', address: '市北区' },
    
    { id: 10, provinceId: 1, province: '山东省', city: '潍坊市', district: '潍城区', name: '北方茶都茶叶场', address: '潍城区' },
    { id: 11, provinceId: 1, province: '山东省', city: '潍坊市', district: '潍城区', name: '潍坊市茶叶批发交易市场', address: '潍城区' },
    { id: 12, provinceId: 1, province: '山东省', city: '潍坊市', district: '潍城区', name: '鸢都湖茶城', address: '潍城区' },
    { id: 13, provinceId: 1, province: '山东省', city: '潍坊市', district: '奎文区', name: '北王茶城广场', address: '奎文区' },
    { id: 14, provinceId: 1, province: '山东省', city: '潍坊市', district: '奎文区', name: '潍坊中华博城', address: '奎文区' },
    { id: 15, provinceId: 1, province: '山东省', city: '潍坊市', district: '寒亭区', name: '潍坊茶博城分店', address: '寒亭区' },
    { id: 16, provinceId: 1, province: '山东省', city: '潍坊市', district: '临朐县', name: '豪达茶叶批发商城', address: '临朐县' },

    { id: 17, provinceId: 1, province: '山东省', city: '烟台市', district: '芝罘区', name: '三站茶叶批发市场', address: '芝罘区' },
    { id: 18, provinceId: 1, province: '山东省', city: '烟台市', district: '蓬莱区', name: '蓬莱矫格庄市场', address: '蓬莱区' },

    { id: 19, provinceId: 1, province: '山东省', city: '济南市', district: '槐荫区', name: '济南茶叶批发市场（第一茶市）', address: '槐荫区' },
    { id: 20, provinceId: 1, province: '山东省', city: '济南市', district: '槐荫区', name: '广友茶城', address: '槐荫区' },
    { id: 21, provinceId: 1, province: '山东省', city: '济南市', district: '天桥区', name: '老屯茶城', address: '天桥区' },
    { id: 22, provinceId: 1, province: '山东省', city: '济南市', district: '天桥区', name: '齐鲁茶城', address: '天桥区' },
    { id: 23, provinceId: 1, province: '山东省', city: '济南市', district: '天桥区', name: '黄台茶叶市场', address: '天桥区' },
    { id: 24, provinceId: 1, province: '山东省', city: '济南市', district: '天桥区', name: '北辛茶叶市场', address: '天桥区' },
    { id: 25, provinceId: 1, province: '山东省', city: '济南市', district: '历城区', name: '泉城茶庄市场', address: '历城区' },
    { id: 26, provinceId: 1, province: '山东省', city: '济南市', district: '历城区', name: '七里堡茶城', address: '历城区' },

    { id: 27, provinceId: 1, province: '山东省', city: '菏泽市', district: '牡丹区', name: '鲁西南茶叶大市场', address: '牡丹区' },
    { id: 28, provinceId: 1, province: '山东省', city: '菏泽市', district: '牡丹区', name: '广进茶城', address: '牡丹区' },

    { id: 29, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '鲁中茶叶市场', address: '张店区' },
    { id: 30, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '王舍茶城', address: '张店区' },
    { id: 31, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '南方茶城', address: '张店区' },
    { id: 32, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '江南茶城', address: '张店区' },
    { id: 33, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '玉峰茶城', address: '张店区' },
    { id: 34, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '红星茶城', address: '张店区' },
    { id: 35, provinceId: 1, province: '山东省', city: '淄博市', district: '张店区', name: '洪沟路茶业带', address: '张店区' },
    { id: 36, provinceId: 1, province: '山东省', city: '淄博市', district: '周村区', name: '淄博茶叶场', address: '周村区' },

    { id: 37, provinceId: 1, province: '山东省', city: '枣庄市', district: '市中区', name: '华派茶博城', address: '市中区' },
    { id: 38, provinceId: 1, province: '山东省', city: '枣庄市', district: '薛城区', name: '山东枣庄茶叶场', address: '薛城区' },
    { id: 39, provinceId: 1, province: '山东省', city: '枣庄市', district: '滕州市', name: '滕州市茶叶场', address: '滕州市' },
    { id: 40, provinceId: 1, province: '山东省', city: '枣庄市', district: '山亭区', name: '山亭区茶叶场', address: '山亭区' },
    { id: 41, provinceId: 1, province: '山东省', city: '枣庄市', district: '台儿庄区', name: '台儿庄新农联合市场', address: '台儿庄区' },
    { id: 42, provinceId: 1, province: '山东省', city: '枣庄市', district: '峄城区', name: '峄城区承水路市场', address: '峄城区' },

    { id: 43, provinceId: 1, province: '山东省', city: '济宁市', district: '任城区', name: '九州茶都', address: '任城区' },
    { id: 44, provinceId: 1, province: '山东省', city: '济宁市', district: '任城区', name: '金宇茶叶批发大市场', address: '任城区' },
    { id: 45, provinceId: 1, province: '山东省', city: '济宁市', district: '任城区', name: '草桥口茶叶场', address: '任城区' },
    { id: 46, provinceId: 1, province: '山东省', city: '济宁市', district: '任城区', name: '亿丰茶叶食品商贸城', address: '任城区' },
    { id: 47, provinceId: 1, province: '山东省', city: '济宁市', district: '任城区', name: '豪德茶叶食品商贸城', address: '任城区' },
    { id: 48, provinceId: 1, province: '山东省', city: '济宁市', district: '任城区', name: '吉祥茶城', address: '任城区' },
    { id: 49, provinceId: 1, province: '山东省', city: '济宁市', district: '兖州区', name: '京杭茶叶批发中心', address: '兖州区' },

    { id: 50, provinceId: 1, province: '山东省', city: '泰安市', district: '泰山区', name: '泰山茶叶场', address: '泰山区' },
    { id: 51, provinceId: 1, province: '山东省', city: '泰安市', district: '泰山区', name: '泰安茶叶场', address: '泰山区' },
    { id: 52, provinceId: 1, province: '山东省', city: '泰安市', district: '泰山区', name: '江南茶叶批发中心', address: '泰山区' },
    { id: 53, provinceId: 1, province: '山东省', city: '泰安市', district: '泰山区', name: '黄河东路仙茶市场', address: '泰山区' },
    { id: 54, provinceId: 1, province: '山东省', city: '泰安市', district: '泰山区', name: '宝龙茶城', address: '泰山区' },
    { id: 55, provinceId: 1, province: '山东省', city: '泰安市', district: '岱岳区', name: '大汶口镇黄山茶叶批发部', address: '岱岳区' },

    { id: 56, provinceId: 1, province: '山东省', city: '威海市', district: '环翠区', name: '长峰茶叶场', address: '环翠区' },
    { id: 57, provinceId: 1, province: '山东省', city: '威海市', district: '环翠区', name: '威海国际茶叶城', address: '环翠区' },
    { id: 58, provinceId: 1, province: '山东省', city: '威海市', district: '环翠区', name: '环翠区茶叶场', address: '环翠区' },
    { id: 59, provinceId: 1, province: '山东省', city: '威海市', district: '环翠区', name: '温泉镇茶叶集散中心', address: '环翠区' },
    { id: 60, provinceId: 1, province: '山东省', city: '威海市', district: '文登区', name: '文登区茶叶场', address: '文登区' },

    { id: 61, provinceId: 1, province: '山东省', city: '日照市', district: '东港区', name: '日照国际茶叶城', address: '东港区' },
    { id: 62, provinceId: 1, province: '山东省', city: '日照市', district: '东港区', name: '石臼茶叶场', address: '东港区' },
    { id: 63, provinceId: 1, province: '山东省', city: '日照市', district: '东港区', name: '巨峰镇茶叶场', address: '东港区' },
    { id: 64, provinceId: 1, province: '山东省', city: '日照市', district: '东港区', name: '王府茶叶场', address: '东港区' },
    { id: 65, provinceId: 1, province: '山东省', city: '日照市', district: '岚山区', name: '岚山国际茶叶交易中心', address: '岚山区' },
    { id: 66, provinceId: 1, province: '山东省', city: '日照市', district: '五莲县', name: '五莲县茶叶场', address: '五莲县' },

    { id: 67, provinceId: 1, province: '山东省', city: '临沂市', district: '兰山区', name: '临沂茶叶批发市场', address: '兰山区' },
    { id: 68, provinceId: 1, province: '山东省', city: '临沂市', district: '兰山区', name: '金龙湖茶叶集散中心', address: '兰山区' },
    { id: 69, provinceId: 1, province: '山东省', city: '临沂市', district: '兰山区', name: '新茶叶市场', address: '兰山区' },
    { id: 70, provinceId: 1, province: '山东省', city: '临沂市', district: '兰山区', name: '西街茶城', address: '兰山区' },
    { id: 71, provinceId: 1, province: '山东省', city: '临沂市', district: '罗庄区', name: '豆腐宫茶叶市场', address: '罗庄区' },
    { id: 72, provinceId: 1, province: '山东省', city: '临沂市', district: '河东区', name: '宝印茶城', address: '河东区' },

    { id: 73, provinceId: 1, province: '山东省', city: '德州市', district: '德城区', name: '德州茶叶批发市场', address: '德城区' },
    { id: 74, provinceId: 1, province: '山东省', city: '德州市', district: '经济开发区', name: '德百物流批发城·鲁北茶都', address: '经济开发区' },
    { id: 75, provinceId: 1, province: '山东省', city: '德州市', district: '经济开发区', name: '德州国际茶业博览中心', address: '经济开发区' },
    { id: 76, provinceId: 1, province: '山东省', city: '德州市', district: '经济开发区', name: '金华茶城', address: '经济开发区' },
    { id: 77, provinceId: 1, province: '山东省', city: '德州市', district: '齐河县', name: '齐河县茶叶市场', address: '齐河县' },

    { id: 78, provinceId: 1, province: '山东省', city: '聊城市', district: '东昌府区', name: '香江大市场茶叶批发集群', address: '东昌府区' },
    { id: 79, provinceId: 1, province: '山东省', city: '聊城市', district: '经济技术开发区', name: '周公河农贸城茶市场', address: '经济技术开发区' },

    { id: 80, provinceId: 1, province: '山东省', city: '滨州市', district: '滨城区', name: '高杜茶叶市场', address: '滨城区' },
    { id: 81, provinceId: 1, province: '山东省', city: '滨州市', district: '滨城区', name: '站前茶叶批发市场', address: '滨城区' },
    { id: 82, provinceId: 1, province: '山东省', city: '滨州市', district: '滨城区', name: '滨州茶城', address: '滨城区' },
    { id: 83, provinceId: 1, province: '山东省', city: '滨州市', district: '滨城区', name: '普洱茶专项市场', address: '滨城区' },

    // 北京市
    { id: 84, provinceId: 2, province: '北京市', city: '北京市', district: '西城区', name: '马连道茶叶街', address: '西城区' },
    { id: 85, provinceId: 2, province: '北京市', city: '北京市', district: '西城区', name: '茶市街', address: '西城区' },
    { id: 86, provinceId: 2, province: '北京市', city: '北京市', district: '西城区', name: '庄胜峰茶城', address: '西城区' },
    { id: 87, provinceId: 2, province: '北京市', city: '北京市', district: '西城区', name: '阜成门市场', address: '西城区' },
    { id: 88, provinceId: 2, province: '北京市', city: '北京市', district: '朝阳区', name: '四季春茶城', address: '朝阳区' },
    { id: 89, provinceId: 2, province: '北京市', city: '北京市', district: '朝阳区', name: '朝阳茶叶城', address: '朝阳区' },
    { id: 90, provinceId: 2, province: '北京市', city: '北京市', district: '丰台区', name: '北京农产品中央批发市场（茶叶交易区）', address: '丰台区' },
    { id: 91, provinceId: 2, province: '北京市', city: '北京市', district: '丰台区', name: '新发地农产品批发市场（茶叶区）', address: '丰台区' },
    { id: 92, provinceId: 2, province: '北京市', city: '北京市', district: '顺义区', name: '顺义马连道茶叶场', address: '顺义区' },
    { id: 93, provinceId: 2, province: '北京市', city: '北京市', district: '东城区', name: '王府井商业街（含吴裕泰、张一元店铺）', address: '东城区' },

    // 福建省
    { id: 94, provinceId: 3, province: '福建省', city: '福州市', district: '晋安区', name: '五里亭茶叶市场（新茶城）', address: '晋安区' },
    { id: 95, provinceId: 3, province: '福建省', city: '福州市', district: '晋安区', name: '海峡茶叶城', address: '晋安区' },
    { id: 96, provinceId: 3, province: '福建省', city: '福州市', district: '晋安区', name: '光明港茶叶场', address: '晋安区' },
    { id: 97, provinceId: 3, province: '福建省', city: '福州市', district: '晋安区', name: '闽都茶叶城', address: '晋安区福新路' },
    { id: 98, provinceId: 3, province: '福建省', city: '福州市', district: '仓山区', name: '金山茶叶城', address: '仓山区' },
    { id: 99, provinceId: 3, province: '福建省', city: '福州市', district: '鼓楼区', name: '鼓楼茶叶市场', address: '鼓楼区' },
    { id: 100, provinceId: 3, province: '福建省', city: '福州市', district: '台江区', name: '台江茶叶市场', address: '台江区' },

    { id: 101, provinceId: 3, province: '福建省', city: '厦门市', district: '湖里区', name: '天成茶叶市场', address: '湖里区' },
    { id: 102, provinceId: 3, province: '福建省', city: '厦门市', district: '湖里区', name: '湖里茶叶场', address: '湖里区' },
    { id: 103, provinceId: 3, province: '福建省', city: '厦门市', district: '湖里区', name: '黄岩国际茶城', address: '湖里区' },
    { id: 104, provinceId: 3, province: '福建省', city: '厦门市', district: '思明区', name: '思明茶叶市场', address: '思明区' },
    { id: 105, provinceId: 3, province: '福建省', city: '厦门市', district: '思明区', name: '海峡茶都', address: '思明区' },
    { id: 106, provinceId: 3, province: '福建省', city: '厦门市', district: '思明区', name: '南普陀茶叶城', address: '思明区' },
    { id: 107, provinceId: 3, province: '福建省', city: '厦门市', district: '集美区', name: '厦门北站国际茶港城', address: '集美区（在建）' },

    { id: 108, provinceId: 3, province: '福建省', city: '泉州市', district: '丰泽区', name: '泉州茶叶市场（泉秀路）', address: '丰泽区' },
    { id: 109, provinceId: 3, province: '福建省', city: '泉州市', district: '丰泽区', name: '东海茶叶市场', address: '丰泽区' },
    { id: 110, provinceId: 3, province: '福建省', city: '泉州市', district: '丰泽区', name: '乌厝茶叶场', address: '丰泽区' },
    { id: 111, provinceId: 3, province: '福建省', city: '泉州市', district: '鲤城区', name: '东湖街茶叶批发一条街', address: '鲤城区' },
    { id: 112, provinceId: 3, province: '福建省', city: '泉州市', district: '鲤城区', name: '普洱茶直销市场（中山路）', address: '鲤城区' },
    { id: 113, provinceId: 3, province: '福建省', city: '泉州市', district: '晋安区', name: '五里亭茶叶市场（新茶城）', address: '晋安区' },
    { id: 114, provinceId: 3, province: '福建省', city: '泉州市', district: '安溪县', name: '安溪县茶叶场（中国茶都）', address: '安溪县' },
    { id: 115, provinceId: 3, province: '福建省', city: '泉州市', district: '安溪县', name: '感德茶叶场', address: '安溪县' },
    { id: 116, provinceId: 3, province: '福建省', city: '泉州市', district: '惠安县', name: '惠安茶城', address: '惠安县' },
    { id: 117, provinceId: 3, province: '福建省', city: '泉州市', district: '洛江区', name: '长坑茶叶市场', address: '洛江区' },

    { id: 118, provinceId: 3, province: '福建省', city: '漳州市', district: '芗城区', name: '闽南新城茶叶大市场', address: '芗城区' },
    { id: 119, provinceId: 3, province: '福建省', city: '漳州市', district: '芗城区', name: '漳州茶叶场（新址）', address: '芗城区' },
    { id: 120, provinceId: 3, province: '福建省', city: '漳州市', district: '芗城区', name: '普洱茶专营集群（胜利东路、荷花中路）', address: '芗城区' },
    { id: 121, provinceId: 3, province: '福建省', city: '漳州市', district: '云霄县', name: '云霄乌山茶叶场', address: '云霄县' },
    { id: 122, provinceId: 3, province: '福建省', city: '漳州市', district: '华安县', name: '华安茶都', address: '华安县' },
    { id: 123, provinceId: 3, province: '福建省', city: '漳州市', district: '南靖县', name: '南靖凤翔茶都', address: '南靖县' },

    { id: 124, provinceId: 3, province: '福建省', city: '莆田市', district: '涵江区', name: '涵江国际商贸城茶叶市场', address: '涵江区' },
    { id: 125, provinceId: 3, province: '福建省', city: '莆田市', district: '荔城区', name: '荔城区鞋材市场茶叶批发店', address: '荔城区' },
    { id: 126, provinceId: 3, province: '福建省', city: '莆田市', district: '城厢区', name: '城厢区和韵堂茶叶批发商行', address: '城厢区' },
    { id: 127, provinceId: 3, province: '福建省', city: '莆田市', district: '平阳镇', name: '平阳镇茶叶市场', address: '平阳镇' },

    { id: 128, provinceId: 3, province: '福建省', city: '宁德市', district: '蕉城区', name: '宁德茶叶场（阳光大道）', address: '蕉城区' },
    { id: 129, provinceId: 3, province: '福建省', city: '宁德市', district: '蕉城区', name: '蕉城茶叶市场（蕉城南路）', address: '蕉城区' },
    { id: 130, provinceId: 3, province: '福建省', city: '宁德市', district: '蕉城区', name: '城北茶叶市场（富春北路）', address: '蕉城区' },
    { id: 131, provinceId: 3, province: '福建省', city: '宁德市', district: '蕉城区', name: '金山茶叶城', address: '蕉城区' },
    { id: 132, provinceId: 3, province: '福建省', city: '宁德市', district: '蕉城区', name: '黄岩国际茶城', address: '蕉城区' },
    { id: 133, provinceId: 3, province: '福建省', city: '宁德市', district: '蕉城区', name: '南靖凤翔茶都', address: '蕉城区' },
    { id: 134, provinceId: 3, province: '福建省', city: '宁德市', district: '福鼎市', name: '福鼎白茶交易市场（点头镇）', address: '福鼎市' },
    { id: 135, provinceId: 3, province: '福建省', city: '宁德市', district: '福鼎市', name: '管阳镇茶青交易市场（在建）', address: '福鼎市' },
    { id: 136, provinceId: 3, province: '福建省', city: '宁德市', district: '福安市', name: '福安海峡大茶都', address: '福安市' },

    { id: 137, provinceId: 3, province: '福建省', city: '龙岩市', district: '新罗区', name: '闽西交易城茶叶集群（C4、C5栋）', address: '新罗区' },
    { id: 138, provinceId: 3, province: '福建省', city: '龙岩市', district: '新罗区', name: '龙岩茶叶市场（东肖镇）', address: '新罗区' },
    { id: 139, provinceId: 3, province: '福建省', city: '龙岩市', district: '新罗区', name: '龙岩中农批交易城', address: '新罗区' },
    { id: 140, provinceId: 3, province: '福建省', city: '龙岩市', district: '武平县', name: '桥桥茶叶批发', address: '武平县' },
    { id: 141, provinceId: 3, province: '福建省', city: '龙岩市', district: '上杭县', name: '上杭县茶叶批发市场', address: '上杭县' },
    { id: 142, provinceId: 3, province: '福建省', city: '龙岩市', district: '漳平市永福镇', name: '两岸茶文化展（台品樱花茶园）', address: '漳平市永福镇' },

    { id: 154, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '华夏1号茶叶批发市场', address: '桥西区' },
    { id: 122, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '佳农茶叶市场', address: '桥西区' },
    { id: 123, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '金正茶叶市场', address: '桥西区' },
    { id: 124, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '友谊北大街茶叶批发市场', address: '桥西区' },
    { id: 125, provinceId: 14, province: '河北省', city: '石家庄市', district: '高邑县', name: '明阳茶叶批发中心', address: '高邑县' },
    { id: 126, provinceId: 14, province: '河北省', city: '石家庄市', district: '长安区', name: '财星茶业批发市场', address: '长安区' },

    { id: 127, provinceId: 14, province: '河北省', city: '唐山市', district: '路南区', name: '唐山天道茶城', address: '路南区' },
    { id: 128, provinceId: 14, province: '河北省', city: '唐山市', district: '路南区', name: '凤凰山茶叶市场', address: '路南区' },
    { id: 129, provinceId: 14, province: '河北省', city: '唐山市', district: '路南区', name: '南湖茶叶市场', address: '路南区' },
    { id: 130, provinceId: 14, province: '河北省', city: '唐山市', district: '路北区', name: '路北区茶叶批发市场', address: '路北区' },
    { id: 131, provinceId: 14, province: '河北省', city: '唐山市', district: '丰润区', name: '丰润区茶叶市场（茶文化街）', address: '丰润区' },
    { id: 132, provinceId: 14, province: '河北省', city: '唐山市', district: '高新区', name: '仙茗茶行', address: '高新区' },

    { id: 133, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '海港区', name: '秦皇岛农垦茶叶贸易有限公司', address: '海港区' },
    { id: 134, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '海港区', name: '解放路茶叶批发市场', address: '海港区' },
    { id: 135, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '海港区', name: '华亿茶叶场 & 世纪城茶叶场', address: '海港区' },
    { id: 136, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '北戴河区', name: '北戴河特产市场', address: '北戴河区' },
    { id: 137, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '山海关区', name: '长城茶社', address: '山海关区' },
    { id: 138, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '山海关区', name: '古道茶行', address: '山海关区' },
    { id: 139, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '开发区', name: '天翠天福茗茶经销部', address: '开发区' },
    { id: 140, provinceId: 14, province: '河北省', city: '秦皇岛市', district: '昌黎县', name: '新集农副产品市场（茶叶区）', address: '昌黎县' },

    { id: 141, provinceId: 14, province: '河北省', city: '邯郸市', district: '邯山区', name: '意蓝德市场', address: '邯山区' },
    { id: 142, provinceId: 14, province: '河北省', city: '邯郸市', district: '邯山区', name: '天明茶叶批发部', address: '邯山区' },
    { id: 143, provinceId: 14, province: '河北省', city: '邯郸市', district: '邯山区', name: '邯郸茶城', address: '邯山区' },
    { id: 144, provinceId: 14, province: '河北省', city: '邯郸市', district: '丛台区', name: '邯郸市茶叶批发城', address: '丛台区' },
    { id: 145, provinceId: 14, province: '河北省', city: '邯郸市', district: '丛台区', name: '云山茶叶批发部', address: '丛台区' },
    { id: 146, provinceId: 14, province: '河北省', city: '邯郸市', district: '复兴区', name: '邯郸茶叶批发城（复兴区）', address: '复兴区' },

    { id: 147, provinceId: 14, province: '河北省', city: '保定市', district: '莲池区', name: '华洲茶城', address: '莲池区' },
    { id: 148, provinceId: 14, province: '河北省', city: '保定市', district: '莲池区', name: '直隶茶叶市场', address: '莲池区' },
    { id: 149, provinceId: 14, province: '河北省', city: '保定市', district: '竞秀区', name: '五一茶叶市场', address: '竞秀区' },
    { id: 150, provinceId: 14, province: '河北省', city: '保定市', district: '满城区', name: '马茶城', address: '满城区' },
    { id: 151, provinceId: 14, province: '河北省', city: '保定市', district: '市中心', name: '古莲花市场', address: '市中心' },
    { id: 152, provinceId: 14, province: '河北省', city: '保定市', district: '安新县', name: '兴茗茶叶市场', address: '安新县' },

    { id: 153, provinceId: 14, province: '河北省', city: '邢台市', district: '信都区', name: '邢台茶城', address: '信都区' },
    { id: 154, provinceId: 14, province: '河北省', city: '邢台市', district: '信都区', name: '辰龙茶叶商贸公司', address: '信都区' },
    { id: 155, provinceId: 14, province: '河北省', city: '邢台市', district: '襄都区', name: '怀特古文化茶城', address: '襄都区' },
    { id: 156, provinceId: 14, province: '河北省', city: '邢台市', district: '襄都区', name: '供销福茶专卖店', address: '襄都区' },
    { id: 157, provinceId: 14, province: '河北省', city: '邢台市', district: '桥东区', name: '江南茶叶店', address: '桥东区' },
    { id: 158, provinceId: 14, province: '河北省', city: '邢台市', district: '桥东区', name: '天水茶叶门市', address: '桥东区' },
    { id: 159, provinceId: 14, province: '河北省', city: '邢台市', district: '桥东区', name: '竹叶青茶业商行', address: '桥东区' },
    { id: 160, provinceId: 14, province: '河北省', city: '邢台市', district: '桥西区', name: '清润茶叶经销处', address: '桥西区' },
    { id: 161, provinceId: 14, province: '河北省', city: '邢台市', district: '桥西区', name: '林璋茶叶贸易公司', address: '桥西区' },
    { id: 162, provinceId: 14, province: '河北省', city: '邢台市', district: '南宫市', name: '佰茗茶叶贸易公司', address: '南宫市' },
    { id: 163, provinceId: 14, province: '河北省', city: '邢台市', district: '南和区', name: '张燕茶庄', address: '南和区' },

    { id: 164, provinceId: 14, province: '河北省', city: '承德市', district: '双桥区', name: '承德市茶叶场', address: '双桥区' },
    { id: 165, provinceId: 14, province: '河北省', city: '承德市', district: '双桥区', name: '南大街与南市南街茶叶聚集带', address: '双桥区' },
    { id: 166, provinceId: 14, province: '河北省', city: '承德市', district: '双桥区', name: '承德茶城', address: '双桥区' },
    { id: 167, provinceId: 14, province: '河北省', city: '承德市', district: '双桥区', name: '轩茶苑茶叶商店', address: '双桥区' },
    { id: 168, provinceId: 14, province: '河北省', city: '承德市', district: '双滦区', name: '峻宇普洱茶批发城', address: '双滦区' },
    { id: 169, provinceId: 14, province: '河北省', city: '承德市', district: '兴隆县', name: '常山兴隆茶庄', address: '兴隆县' },
    { id: 170, provinceId: 14, province: '河北省', city: '承德市', district: '丰宁县', name: '丰宁县普洱茶专卖店', address: '丰宁县' },

    { id: 171, provinceId: 14, province: '河北省', city: '张家口市', district: '桥西区', name: '金鼎国贸茶叶市场', address: '桥西区' },
    { id: 172, provinceId: 14, province: '河北省', city: '张家口市', district: '桥东区', name: '胜利北路茶叶市场', address: '桥东区' },
    { id: 173, provinceId: 14, province: '河北省', city: '张家口市', district: '桥东区', name: '东鑫商城茶叶区', address: '桥东区' },
    { id: 174, provinceId: 14, province: '河北省', city: '张家口市', district: '宣化区', name: '宣化古城茶叶交易区', address: '宣化区' },
    { id: 175, provinceId: 14, province: '河北省', city: '张家口市', district: '经济开发区', name: '聚祥春茶叶经销部', address: '经济开发区' },
    { id: 176, provinceId: 14, province: '河北省', city: '张家口市', district: '下花园区', name: '蔬菜市场茶叶区', address: '下花园区' },
    { id: 177, provinceId: 14, province: '河北省', city: '张家口市', district: '市区近郊', name: '武阳茶叶场', address: '市区近郊' },

    { id: 178, provinceId: 14, province: '河北省', city: '廊坊市', district: '莲池区', name: '华洲茶城', address: '莲池区' },
    { id: 179, provinceId: 14, province: '河北省', city: '廊坊市', district: '广阳区', name: '运河茶城', address: '广阳区' },
    { id: 180, provinceId: 14, province: '河北省', city: '廊坊市', district: '广阳区', name: '新华路茶叶市场', address: '广阳区' },
    { id: 181, provinceId: 14, province: '河北省', city: '廊坊市', district: '安次区', name: '安次区西环路茶叶市场', address: '安次区' },
    { id: 182, provinceId: 14, province: '河北省', city: '廊坊市', district: '双滦区', name: '峻宇普洱茶城', address: '双滦区' },
    { id: 183, provinceId: 14, province: '河北省', city: '廊坊市', district: '三河市', name: '燕郊批发点', address: '三河市' },
    { id: 184, provinceId: 14, province: '河北省', city: '廊坊市', district: '满城区', name: '马茶城', address: '满城区' },
    { id: 185, provinceId: 14, province: '河北省', city: '廊坊市', district: '固安县', name: '固安茶叶市场', address: '固安县' },

    { id: 186, provinceId: 14, province: '河北省', city: '沧州市', district: '运河区', name: '东茶市', address: '运河区' },
    { id: 187, provinceId: 14, province: '河北省', city: '沧州市', district: '运河区', name: '小王茶叶场', address: '运河区' },
    { id: 188, provinceId: 14, province: '河北省', city: '沧州市', district: '运河区', name: '四合茶城', address: '运河区' },
    { id: 189, provinceId: 14, province: '河北省', city: '沧州市', district: '新华区', name: '明珠商贸城茶叶批发区', address: '新华区' },
    { id: 190, provinceId: 14, province: '河北省', city: '沧州市', district: '黄骅市', name: '黄骅茶叶市场（八马茶业专营店）', address: '黄骅市' },
    { id: 191, provinceId: 14, province: '河北省', city: '沧州市', district: '肃宁县', name: '新世商城（普洱茶专营）', address: '肃宁县' },

    { id: 192, provinceId: 14, province: '河北省', city: '衡水市', district: '桃城区', name: '京南茶叶场', address: '桃城区' },
    { id: 193, provinceId: 14, province: '河北省', city: '衡水市', district: '桃城区', name: '七一路茶叶市场', address: '桃城区' },
    { id: 194, provinceId: 14, province: '河北省', city: '衡水市', district: '桃城区', name: '玖洲茶叶批发馆', address: '桃城区' },
    { id: 195, provinceId: 14, province: '河北省', city: '衡水市', district: '桃城区', name: '德利名茶', address: '桃城区' },
    { id: 196, provinceId: 14, province: '河北省', city: '衡水市', district: '桃城区', name: '雨林古茶坊', address: '桃城区' },
    { id: 197, provinceId: 14, province: '河北省', city: '衡水市', district: '桃城区', name: '石雨茶具经营部', address: '桃城区' },
    { id: 198, provinceId: 14, province: '河北省', city: '衡水市', district: '永年区', name: '永年茶叶场', address: '永年区' },

    { id: 199, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '神农茶都', address: '雨花区' },
    { id: 200, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '高桥大市场茶叶城', address: '雨花区' },
    { id: 201, provinceId: 15, province: '湖南省', city: '长沙市', district: '开福区', name: '长沙火车站茶城', address: '开福区' },
    { id: 202, provinceId: 15, province: '湖南省', city: '长沙市', district: '芙蓉区', name: '马王堆茶叶场', address: '芙蓉区' },
    { id: 203, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '南桥大市场茶叶食品城', address: '雨花区' },
    { id: 204, provinceId: 15, province: '湖南省', city: '长沙市', district: '天心区', name: '天心茶城', address: '天心区' },

    { id: 205, provinceId: 15, province: '湖南省', city: '株洲市', district: '河西区', name: '天同茶城', address: '河西区' },
    { id: 206, provinceId: 15, province: '湖南省', city: '株洲市', district: '荷塘区', name: '株洲茶叶市场', address: '荷塘区大坪路' },
    { id: 207, provinceId: 15, province: '湖南省', city: '株洲市', district: '市中心', name: '株洲市白市场', address: '市中心' },
    { id: 208, provinceId: 15, province: '湖南省', city: '株洲市', district: '芦淞区', name: '株洲市芦淞区株路茶叶市场', address: '芦淞区' },
    { id: 209, provinceId: 15, province: '湖南省', city: '株洲市', district: '天元区', name: '天元区茶叶市场', address: '天元区' },
    { id: 210, provinceId: 15, province: '湖南省', city: '株洲市', district: '荷塘区', name: '荷塘区新华西路八马茶业', address: '荷塘区' },

    { id: 211, provinceId: 15, province: '湖南省', city: '湘潭市', district: '雨湖区', name: '湘潭茶叶批发交易市场', address: '雨湖区' },
    { id: 212, provinceId: 15, province: '湖南省', city: '湘潭市', district: '岳塘区', name: '湘潭工艺美术品市场茶叶专区', address: '岳塘区' },
    { id: 213, provinceId: 15, province: '湖南省', city: '湘潭市', district: '韶山市', name: '韶山茶城', address: '韶山市' },
    { id: 214, provinceId: 15, province: '湖南省', city: '湘潭市', district: '湘潭县', name: '福茶叶场', address: '湘潭县' },
    { id: 215, provinceId: 15, province: '湖南省', city: '湘潭市', district: '湘潭市郊', name: '秀山茶叶场', address: '湘潭市郊' },

    { id: 216, provinceId: 15, province: '湖南省', city: '衡阳市', district: '蒸湘区', name: '海通茶叶城', address: '蒸湘区' },
    { id: 217, provinceId: 15, province: '湖南省', city: '衡阳市', district: '石鼓区', name: '石鼓场茶叶区', address: '石鼓区' },
    { id: 218, provinceId: 15, province: '湖南省', city: '衡阳市', district: '蒸湘区', name: '蒸湘场茶叶区', address: '蒸湘区' },
    { id: 219, provinceId: 15, province: '湖南省', city: '衡阳市', district: '衡东县', name: '衡东县集贤滩', address: '衡东县' },

    { id: 220, provinceId: 15, province: '湖南省', city: '邵阳市', district: '双清区', name: '金罗湾商贸城茶叶区', address: '双清区' },
    { id: 221, provinceId: 15, province: '湖南省', city: '邵阳市', district: '双清区', name: '得丰市场茶叶区', address: '双清区' },
    { id: 222, provinceId: 15, province: '湖南省', city: '邵阳市', district: '双清区', name: '湘西南大市场茶叶区', address: '双清区' },
    { id: 223, provinceId: 15, province: '湖南省', city: '邵阳市', district: '大祥区', name: '金家路茶叶集散点', address: '大祥区' },
    { id: 224, provinceId: 15, province: '湖南省', city: '邵阳市', district: '大祥区', name: '和茶馆', address: '大祥区' },

    { id: 225, provinceId: 15, province: '湖南省', city: '岳阳市', district: '南湖新区', name: '岳阳茶博城', address: '南湖新区' },
    { id: 226, provinceId: 15, province: '湖南省', city: '岳阳市', district: '岳阳楼区', name: '梅溪桥茶叶市场', address: '岳阳楼区' },
    { id: 227, provinceId: 15, province: '湖南省', city: '岳阳市', district: '岳阳楼区', name: '君山区农产品场茶叶区', address: '岳阳楼区' },
    { id: 228, provinceId: 15, province: '湖南省', city: '岳阳市', district: '岳阳楼区', name: '建设路茶叶市场', address: '岳阳楼区' },

    { id: 229, provinceId: 15, province: '湖南省', city: '常德市', district: '鼎城区', name: '桥南财富广场茶叶大市场', address: '鼎城区' },
    { id: 230, provinceId: 15, province: '湖南省', city: '常德市', district: '石门县', name: '石门茶叶场', address: '石门县' },
    { id: 231, provinceId: 15, province: '湖南省', city: '常德市', district: '汉寿县', name: '草铺茶叶市场', address: '汉寿县' },
    { id: 232, provinceId: 15, province: '湖南省', city: '常德市', district: '石门县', name: '湘北石门壶瓶山生态茶叶批发交易中心', address: '石门县' },
    { id: 233, provinceId: 15, province: '湖南省', city: '常德市', district: '古丈县', name: '古丈县"常德街"茶文化步行街', address: '古丈县' },
    { id: 234, provinceId: 15, province: '湖南省', city: '常德市', district: '武陵区', name: '武陵茶叶交易市场', address: '武陵区' },

    { id: 235, provinceId: 15, province: '湖南省', city: '张家界市', district: '永定区', name: '张家界市茶叶专业市场', address: '永定区大庸府城市场' },
    { id: 236, provinceId: 15, province: '湖南省', city: '张家界市', district: '永定区', name: '张家界市茶叶场', address: '永定区永定大道市场' },
    { id: 237, provinceId: 15, province: '湖南省', city: '张家界市', district: '武陵源区', name: '武陵源茶叶市场', address: '武陵源区' },
    { id: 238, provinceId: 15, province: '湖南省', city: '张家界市', district: '永定区', name: '奇峰市场茶叶批发区', address: '永定区' },
    { id: 143, provinceId: 3, province: '福建省', city: '三明市', district: '梅列区', name: '三明茶叶场（黄梅路）', address: '梅列区' },
    { id: 144, provinceId: 3, province: '福建省', city: '三明市', district: '三元区', name: '汇益茶叶批发部', address: '三元区' },
    { id: 145, provinceId: 3, province: '福建省', city: '三明市', district: '三元区', name: '海泉茗茶行', address: '三元区' },
    { id: 146, provinceId: 3, province: '福建省', city: '三明市', district: '尤溪县', name: '尤溪闽中茶叶批发市场', address: '尤溪县' },
    { id: 147, provinceId: 3, province: '福建省', city: '三明市', district: '大田县', name: '大田县铁观音交易点（屏山乡等）', address: '大田县' },
    { id: 148, provinceId: 3, province: '福建省', city: '三明市', district: '永安市', name: '永安茶叶场', address: '永安市（在建）' },

    { id: 149, provinceId: 3, province: '福建省', city: '南平市', district: '建阳区', name: '建阳茶叶批发市场（西门街）', address: '建阳区' },
    { id: 150, provinceId: 3, province: '福建省', city: '南平市', district: '建阳区', name: '大武夷茶叶交易市场（建阳体验中心）', address: '建阳区' },
    { id: 151, provinceId: 3, province: '福建省', city: '南平市', district: '武夷山市', name: '大武夷茶叶交易市场（大王峰北路）', address: '武夷山市' },
    { id: 152, provinceId: 3, province: '福建省', city: '南平市', district: '武夷山市', name: '问岩茶叶批发城（玉女峰路）', address: '武夷山市' },
    { id: 153, provinceId: 3, province: '福建省', city: '南平市', district: '政和县', name: '政和县闽浙茶叶交易市场（铁山镇）', address: '政和县' },
    { id: 154, provinceId: 3, province: '福建省', city: '南平市', district: '邵武市', name: '邵武领域步行街新天地茶业市场', address: '邵武市' },

    // 云南省
    { id: 155, provinceId: 4, province: '云南省', city: '昆明市', district: '官渡区', name: '康乐茶文化城', address: '官渡区' },
    { id: 156, provinceId: 4, province: '云南省', city: '昆明市', district: '盘龙区', name: '雄达茶文化城', address: '盘龙区' },
    { id: 157, provinceId: 4, province: '云南省', city: '昆明市', district: '盘龙区', name: '云南茶叶批发市场（金实茶城）', address: '盘龙区' },
    { id: 158, provinceId: 4, province: '云南省', city: '昆明市', district: '官渡区', name: '邦盛国际茶城', address: '官渡区' },
    { id: 159, provinceId: 4, province: '云南省', city: '昆明市', district: '盘龙区', name: '茗熏轩批发中心（雄达茶城2期）', address: '盘龙区' },
    { id: 160, provinceId: 4, province: '云南省', city: '昆明市', district: '盘龙区', name: '廉享普洱茶批发部', address: '盘龙区' },
    { id: 161, provinceId: 4, province: '云南省', city: '昆明市', district: '五华区', name: '云南省茶叶批发市场', address: '五华区' },
    { id: 162, provinceId: 4, province: '云南省', city: '昆明市', district: '西山区', name: '金湖国际茶叶城', address: '西山区' },
    { id: 163, provinceId: 4, province: '云南省', city: '昆明市', district: '青秀区', name: '东盟茶城', address: '青秀区' },

    { id: 164, provinceId: 4, province: '云南省', city: '曲靖市', district: '麒麟区', name: '麒麟茶叶综合市场', address: '麒麟区' },
    { id: 165, provinceId: 4, province: '云南省', city: '曲靖市', district: '沾益区', name: '名茶总汇', address: '沾益区' },
    { id: 166, provinceId: 4, province: '云南省', city: '曲靖市', district: '宣威市', name: '宣威普洱茶市场', address: '宣威市' },

    { id: 167, provinceId: 4, province: '云南省', city: '玉溪市', district: '红塔区', name: '玉溪普洱茶场（凤凰路市场）', address: '红塔区' },
    { id: 168, provinceId: 4, province: '云南省', city: '玉溪市', district: '红塔区', name: '玉溪茶叶交易市场（星云路市场）', address: '红塔区' },
    { id: 169, provinceId: 4, province: '云南省', city: '玉溪市', district: '红塔区', name: '彩虹批发市场茶叶专区', address: '红塔区' },
    { id: 170, provinceId: 4, province: '云南省', city: '玉溪市', district: '高新区', name: '玉溪国际茶叶城', address: '高新区' },
    { id: 171, provinceId: 4, province: '云南省', city: '玉溪市', district: '北市区', name: '花涧里文旅市场', address: '北市区' },

    { id: 172, provinceId: 4, province: '云南省', city: '昭通市', district: '昭阳区', name: '乐茶叶市场', address: '昭阳区' },
    { id: 173, provinceId: 4, province: '云南省', city: '昭通市', district: '昭阳区', name: '昭通茶叶交易中心', address: '昭阳区' },
    { id: 174, provinceId: 4, province: '云南省', city: '昭通市', district: '昭阳区', name: '昭阳区农贸市场与尹家集市', address: '昭阳区' },

    { id: 175, provinceId: 4, province: '云南省', city: '保山市', district: '隆阳区', name: '云南保山茶叶批发交易市场', address: '隆阳区' },
    { id: 176, provinceId: 4, province: '云南省', city: '保山市', district: '昌宁县', name: '昌宁县茶叶交易市场（田园镇）', address: '昌宁县' },
    { id: 177, provinceId: 4, province: '云南省', city: '保山市', district: '昌宁县', name: '昌宁县柯街镇茶叶市场', address: '昌宁县柯街镇' },

    { id: 178, provinceId: 4, province: '云南省', city: '丽江市', district: '古城区', name: '丽江普洱茶批发市场（七河镇）', address: '古城区七河镇' },
    { id: 179, provinceId: 4, province: '云南省', city: '丽江市', district: '古城区', name: '丽江云隆茶叶批发城（七河镇）', address: '古城区七河镇' },
    { id: 180, provinceId: 4, province: '云南省', city: '丽江市', district: '古城区', name: '四方茶叶批发城', address: '古城区' },
    { id: 181, provinceId: 4, province: '云南省', city: '丽江市', district: '古城区', name: '忠义市场（大研古镇）', address: '古城区' },
    { id: 182, provinceId: 4, province: '云南省', city: '丽江市', district: '古城区', name: '古城茶叶场（古城中心）', address: '古城区' },
    { id: 183, provinceId: 4, province: '云南省', city: '丽江市', district: '束河古镇', name: '束河茶市', address: '束河古镇' },

    { id: 184, provinceId: 4, province: '云南省', city: '普洱市', district: '思茅区', name: '中国普洱茶叶交易市场（园丁路）', address: '思茅区' },
    { id: 185, provinceId: 4, province: '云南省', city: '普洱市', district: '思茅区', name: '普洱市茶叶场（永平路市场）', address: '思茅区' },
    { id: 186, provinceId: 4, province: '云南省', city: '普洱市', district: '思茅区', name: '云南康乐茶文化城', address: '思茅区' },
    { id: 187, provinceId: 4, province: '云南省', city: '普洱市', district: '墨江县', name: '墨江茶叶交易市场（联珠镇者铁村）', address: '墨江县' },
    { id: 188, provinceId: 4, province: '云南省', city: '普洱市', district: '墨江县', name: '墨江县城老街茶叶场', address: '墨江县城' },

    { id: 189, provinceId: 4, province: '云南省', city: '临沧市', district: '临翔区', name: '临沧茶叶场（南屏路）', address: '临翔区' },
    { id: 190, provinceId: 4, province: '云南省', city: '临沧市', district: '临翔区', name: '临沧国际茶叶交易中心', address: '临翔区' },
    { id: 191, provinceId: 4, province: '云南省', city: '临沧市', district: '临翔区', name: '万龙巷茶叶市场', address: '临翔区' },
    { id: 192, provinceId: 4, province: '云南省', city: '临沧市', district: '凤庆县', name: '凤庆滇红茶叶批发市场', address: '凤庆县' },
    { id: 193, provinceId: 4, province: '云南省', city: '临沧市', district: '昌宁县', name: '昌宁茶叶交易市场', address: '昌宁县' },

    { id: 194, provinceId: 4, province: '云南省', city: '大理白族自治州', district: '古城区', name: '大理茶城（文献路）', address: '古城区' },
    { id: 195, provinceId: 4, province: '云南省', city: '大理白族自治州', district: '古城区', name: '大理古城茶叶市场（茶马古道市场/洋人街）', address: '古城区' },
    { id: 196, provinceId: 4, province: '云南省', city: '大理白族自治州', district: '下关镇', name: '下关茶城（建设西路）', address: '下关镇' },
    { id: 197, provinceId: 4, province: '云南省', city: '大理白族自治州', district: '下关镇', name: '大理白族自治州茶叶市场（人民南路）', address: '下关镇' },
    { id: 198, provinceId: 4, province: '云南省', city: '大理白族自治州', district: '交通干线', name: 'S221大丽线批发零售店（大理丽江路段）', address: '大理丽江路段' },

    // 浙江省
    { id: 199, provinceId: 5, province: '浙江省', city: '杭州市', district: '余杭区', name: '杭州江南茶叶市场', address: '余杭区' },
    { id: 200, provinceId: 5, province: '浙江省', city: '杭州市', district: '西湖区', name: '杭州四季青市场', address: '西湖区' },
    { id: 201, provinceId: 5, province: '浙江省', city: '杭州市', district: '西湖区', name: '杭州西湖茶叶市场（转塘）', address: '西湖区转塘' },
    { id: 202, provinceId: 5, province: '浙江省', city: '杭州市', district: '西湖区', name: '五里亭茶业批发市场（留下镇）', address: '西湖区留下镇' },
    { id: 203, provinceId: 5, province: '浙江省', city: '杭州市', district: '上城区', name: '杭州解放路茶叶市场', address: '上城区' },
    { id: 204, provinceId: 5, province: '浙江省', city: '杭州市', district: '萧山区', name: '萧山商城中路茶叶场', address: '萧山区' },

    { id: 205, provinceId: 5, province: '浙江省', city: '宁波市', district: '海曙区', name: '宁波茶叶批发市场', address: '海曙区' },
    { id: 206, provinceId: 5, province: '浙江省', city: '宁波市', district: '江东区', name: '金钟茶城（新址）', address: '江东区' },
    { id: 207, provinceId: 5, province: '浙江省', city: '宁波市', district: '北仑区', name: '宁波国际茶叶城', address: '北仑区' },
    { id: 208, provinceId: 5, province: '浙江省', city: '宁波市', district: '象山县', name: '象山茶叶市场', address: '象山县' },
    { id: 209, provinceId: 5, province: '浙江省', city: '宁波市', district: '海曙区', name: '横石桥茶叶市场', address: '海曙区' },
    { id: 210, provinceId: 5, province: '浙江省', city: '宁波市', district: '海曙区', name: '宁波普洱茶叶场', address: '海曙区' },
    { id: 211, provinceId: 5, province: '浙江省', city: '宁波市', district: '鄞州区', name: '东钱湖茶叶市场', address: '鄞州区' },

    { id: 212, provinceId: 5, province: '浙江省', city: '温州市', district: '龙湾区', name: '温州茶城', address: '龙湾区' },
    { id: 213, provinceId: 5, province: '浙江省', city: '温州市', district: '瓯海区', name: '浙南茶叶市场', address: '瓯海区' },
    { id: 214, provinceId: 5, province: '浙江省', city: '温州市', district: '瓯海区', name: '潘桥国际茶博城', address: '瓯海区' },
    { id: 215, provinceId: 5, province: '浙江省', city: '温州市', district: '瑞安市', name: '高楼茶寮茶叶交易市场', address: '瑞安市' },
    { id: 216, provinceId: 5, province: '浙江省', city: '温州市', district: '永嘉县', name: '永嘉三江综合茶城', address: '永嘉县（建设中）' },

    { id: 217, provinceId: 5, province: '浙江省', city: '嘉兴市', district: '南湖区', name: '嘉兴市茶叶场', address: '南湖区' },
    { id: 218, provinceId: 5, province: '浙江省', city: '嘉兴市', district: '南湖区', name: '嘉兴国际茶叶城', address: '南湖区' },
    { id: 219, provinceId: 5, province: '浙江省', city: '嘉兴市', district: '秀洲区', name: '秀洲区新塍镇茶叶市场', address: '秀洲区' },
    { id: 220, provinceId: 5, province: '浙江省', city: '嘉兴市', district: '南湖区', name: '老班章茶叶批发中心', address: '南湖区' },
    { id: 221, provinceId: 5, province: '浙江省', city: '嘉兴市', district: '南湖区', name: '南湖茶叶市场（纺工路）', address: '南湖区纺工路' },
    { id: 222, provinceId: 5, province: '浙江省', city: '嘉兴市', district: '南湖区', name: '普洱茶专项市场（南塘东路）', address: '南湖区南塘东路' },

    { id: 223, provinceId: 5, province: '浙江省', city: '湖州市', district: '吴兴区', name: '湖州茶叶场', address: '吴兴区' },
    { id: 224, provinceId: 5, province: '浙江省', city: '湖州市', district: '吴兴区', name: '落水洞普洱茶场', address: '吴兴区' },
    { id: 225, provinceId: 5, province: '浙江省', city: '湖州市', district: '南浔区', name: '南浔茶叶市场', address: '南浔区' },
    { id: 226, provinceId: 5, province: '浙江省', city: '湖州市', district: '安吉县', name: '安吉白茶产地市场', address: '安吉县' },

    { id: 227, provinceId: 5, province: '浙江省', city: '绍兴市', district: '越城区', name: '绍兴茶叶市场', address: '越城区' },
    { id: 228, provinceId: 5, province: '浙江省', city: '绍兴市', district: '新昌县', name: '新昌大佛龙井茶叶市场', address: '新昌县' },
    { id: 229, provinceId: 5, province: '浙江省', city: '绍兴市', district: '新昌县', name: '江南名茶市场', address: '新昌县' },
    { id: 230, provinceId: 5, province: '浙江省', city: '绍兴市', district: '柯桥区', name: '桥区茶叶集群（华舍一叶茶香批发部等）', address: '柯桥区' },
    { id: 231, provinceId: 5, province: '浙江省', city: '绍兴市', district: '市中心', name: '绍兴国际摩尔城世纪联华', address: '市中心' },
    { id: 232, provinceId: 5, province: '浙江省', city: '绍兴市', district: '越城区', name: '御茶村抹茶基地', address: '越城区' },

    { id: 233, provinceId: 5, province: '浙江省', city: '金华市', district: '金东区', name: '浙中茶叶市场', address: '金东区' },
    { id: 234, provinceId: 5, province: '浙江省', city: '金华市', district: '婺城区', name: '金华农产品批发市场茶叶交易区', address: '婺城区' },
    { id: 235, provinceId: 5, province: '浙江省', city: '金华市', district: '东阳市', name: '东阳富坤茶叶市场', address: '东阳市' },
    { id: 236, provinceId: 5, province: '浙江省', city: '金华市', district: '磐安县', name: '磐安鲜叶交易点（浙中市场内）', address: '磐安县' },
    { id: 237, provinceId: 5, province: '浙江省', city: '金华市', district: '婺城区', name: '义乌春江路茶叶街', address: '婺城区' },

    { id: 238, provinceId: 5, province: '浙江省', city: '衢州市', district: '柯城区', name: '衢州国际茶叶城', address: '柯城区' },
    { id: 239, provinceId: 5, province: '浙江省', city: '衢州市', district: '龙游县', name: '浙西农副产品中心市场黄茶交易区', address: '龙游县' },
    { id: 240, provinceId: 5, province: '浙江省', city: '衢州市', district: '柯城区', name: '荷花中路茶叶集群', address: '柯城区' },
    { id: 241, provinceId: 5, province: '浙江省', city: '衢州市', district: '龙游县', name: '龙游县茶叶市场', address: '龙游县' },
    { id: 242, provinceId: 5, province: '浙江省', city: '衢州市', district: '江山市', name: '江山市茶叶市场', address: '江山市' },

    { id: 243, provinceId: 5, province: '浙江省', city: '舟山市', district: '定海区', name: '舟山茶叶场', address: '定海区' },
    { id: 244, provinceId: 5, province: '浙江省', city: '舟山市', district: '定海区', name: '凤凰窝普洱茶场', address: '定海区' },
    { id: 245, provinceId: 5, province: '浙江省', city: '舟山市', district: '普陀区', name: '沈家门洋山普洱茶场', address: '普陀区' },
    { id: 246, provinceId: 5, province: '浙江省', city: '舟山市', district: '普陀山景区', name: '普陀山茶叶市场', address: '普陀山景区' },
    { id: 247, provinceId: 5, province: '浙江省', city: '舟山市', district: '定海区', name: '天目湖白茶场', address: '定海区' },
    { id: 248, provinceId: 5, province: '浙江省', city: '舟山市', district: '定海区', name: '新城轩阁茶叶商行', address: '定海区' },
    { id: 249, provinceId: 5, province: '浙江省', city: '舟山市', district: '定海区', name: '碧海阁茶行', address: '定海区' },

    { id: 250, provinceId: 5, province: '浙江省', city: '台州市', district: '椒江区', name: '台州茶城', address: '椒江区' },
    { id: 251, provinceId: 5, province: '浙江省', city: '台州市', district: '天台县', name: '天台山茶市', address: '天台县' },
    { id: 252, provinceId: 5, province: '浙江省', city: '台州市', district: '椒江区', name: '椒江中心茶叶市场', address: '椒江区' },
    { id: 253, provinceId: 5, province: '浙江省', city: '台州市', district: '黄岩区', name: '黄岩国际茶城', address: '黄岩区' },
    { id: 254, provinceId: 5, province: '浙江省', city: '台州市', district: '路桥区', name: '路桥茶叶场', address: '路桥区' },
    { id: 255, provinceId: 5, province: '浙江省', city: '台州市', district: '天台县', name: '天台雷峰茶叶市场', address: '天台县' },

    { id: 256, provinceId: 5, province: '浙江省', city: '丽水市', district: '松阳县', name: '浙南茶叶市场', address: '松阳县' },
    { id: 257, provinceId: 5, province: '浙江省', city: '丽水市', district: '遂昌县', name: '遂昌茶叶交易市场', address: '遂昌县' },
    { id: 258, provinceId: 5, province: '浙江省', city: '丽水市', district: '庆元县', name: '庆元县副产品场', address: '庆元县' },
    { id: 259, provinceId: 5, province: '浙江省', city: '丽水市', district: '云和县', name: '云和茶青集散点', address: '云和县' },
    { id: 260, provinceId: 5, province: '浙江省', city: '丽水市', district: '景宁县', name: '景宁茶青集散点', address: '景宁县' },

    // 广东省
    { id: 261, provinceId: 6, province: '广东省', city: '广州市', district: '荔湾区', name: '芳村南方茶叶市场', address: '荔湾区' },
    { id: 262, provinceId: 6, province: '广东省', city: '广州市', district: '荔湾区', name: '芳村茶叶市场（锦桂市场）', address: '荔湾区' },
    { id: 263, provinceId: 6, province: '广东省', city: '广州市', district: '白云区', name: '广州茶叶国际交易中心', address: '白云区' },
    { id: 264, provinceId: 6, province: '广东省', city: '广州市', district: '南沙区', name: '南沙茶叶市场', address: '南沙区' },
    { id: 265, provinceId: 6, province: '广东省', city: '广州市', district: '番禺区', name: '番禺茶叶场', address: '番禺区' },

    { id: 266, provinceId: 6, province: '广东省', city: '深圳市', district: '龙岗区', name: '万江茶叶市场', address: '龙岗区' },
    { id: 267, provinceId: 6, province: '广东省', city: '深圳市', district: '龙岗区', name: '新深圳茶叶场', address: '龙岗区' },
    { id: 268, provinceId: 6, province: '广东省', city: '深圳市', district: '龙岗区', name: '东方国际茶都', address: '龙岗区' },
    { id: 269, provinceId: 6, province: '广东省', city: '深圳市', district: '宝安区', name: '宝安茶叶批发市场', address: '宝安区' },
    { id: 270, provinceId: 6, province: '广东省', city: '深圳市', district: '宝安区', name: '西乡茶叶批发市场', address: '宝安区' },
    { id: 271, provinceId: 6, province: '广东省', city: '深圳市', district: '南山区', name: '前海茶城', address: '南山区' },
    { id: 272, provinceId: 6, province: '广东省', city: '深圳市', district: '南山区', name: '南山普洱茶批发市场', address: '南山区' },
    { id: 273, provinceId: 6, province: '广东省', city: '深圳市', district: '福田区', name: '梅林农批市场', address: '福田区' },
    { id: 274, provinceId: 6, province: '广东省', city: '深圳市', district: '罗湖区', name: '布吉农批市场', address: '罗湖区' },

    { id: 275, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '珠海茶城（前山市场）', address: '香洲区' },
    { id: 276, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '明珠茶叶场', address: '香洲区' },
    { id: 277, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '泰嘉茶叶场', address: '香洲区' },
    { id: 278, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '云顶澜山茶叶城（在建）', address: '香洲区' },
    { id: 279, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '兰埔环岛茗茶城', address: '香洲区' },
    { id: 280, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '南屏科技园茶叶场', address: '香洲区' },
    { id: 281, provinceId: 6, province: '广东省', city: '珠海市', district: '香洲区', name: '家湾镇金凤路批发中心', address: '香洲区' },

    { id: 282, provinceId: 6, province: '广东省', city: '汕头市', district: '龙湖区', name: '汕头市茶叶场', address: '龙湖区' },
    { id: 283, provinceId: 6, province: '广东省', city: '汕头市', district: '龙湖区', name: '光华路茶叶市场', address: '龙湖区' },
    { id: 284, provinceId: 6, province: '广东省', city: '汕头市', district: '龙湖区', name: '汕头茶叶城', address: '龙湖区' },
    { id: 285, provinceId: 6, province: '广东省', city: '汕头市', district: '金平区', name: '汕头供销社光华茶博园', address: '金平区' },

    { id: 286, provinceId: 6, province: '广东省', city: '佛山市', district: '南海区', name: '凯民茶博城', address: '南海区' },
    { id: 287, provinceId: 6, province: '广东省', city: '佛山市', district: '南海区', name: '南方茶叶批发城', address: '南海区' },
    { id: 288, provinceId: 6, province: '广东省', city: '佛山市', district: '南海区', name: '佛山茶叶批发城', address: '南海区' },
    { id: 289, provinceId: 6, province: '广东省', city: '佛山市', district: '禅城区', name: '南海红茶城', address: '禅城区' },
    { id: 290, provinceId: 6, province: '广东省', city: '佛山市', district: '禅城区', name: '禅城茶叶场', address: '禅城区' },
    { id: 291, provinceId: 6, province: '广东省', city: '佛山市', district: '顺德区', name: '顺德茶叶市场（伦教）', address: '顺德区' },
    { id: 292, provinceId: 6, province: '广东省', city: '佛山市', district: '顺德区', name: '容桂茶叶市场', address: '顺德区' },
    { id: 293, provinceId: 6, province: '广东省', city: '佛山市', district: '顺德区', name: '三桥茶叶批发城', address: '顺德区' },

    { id: 294, provinceId: 6, province: '广东省', city: '韶关市', district: '浈江区', name: '韶关市茶叶奇石场', address: '浈江区' },
    { id: 295, provinceId: 6, province: '广东省', city: '韶关市', district: '浈江区', name: '站南路茶叶批发集群', address: '浈江区' },
    { id: 296, provinceId: 6, province: '广东省', city: '韶关市', district: '浈江区', name: '韶关土特产场', address: '浈江区' },
    { id: 297, provinceId: 6, province: '广东省', city: '韶关市', district: '武江区', name: '南郊茶叶市场', address: '武江区' },
    { id: 298, provinceId: 6, province: '广东省', city: '韶关市', district: '武江区', name: '北郊茶叶市场', address: '武江区' },
    { id: 299, provinceId: 6, province: '广东省', city: '韶关市', district: '在建', name: '华南农产品交易中心', address: '在建' },

    { id: 300, provinceId: 6, province: '广东省', city: '河源市', district: '紫金县', name: '中国蝉茶交易中心', address: '紫金县' },
    { id: 301, provinceId: 6, province: '广东省', city: '河源市', district: '源城区', name: '河源市茗茶批发中心', address: '源城区' },
    { id: 302, provinceId: 6, province: '广东省', city: '河源市', district: '源城区', name: '千村集市（巴伐利亚庄园）', address: '源城区' },

    { id: 303, provinceId: 6, province: '广东省', city: '梅州市', district: '五华县', name: '粤东五华茶博汇', address: '五华县' },
    { id: 304, provinceId: 6, province: '广东省', city: '梅州市', district: '梅江区', name: '运兴批发市场集群', address: '梅江区' },
    { id: 305, provinceId: 6, province: '广东省', city: '梅州市', district: '梅江区', name: '汇源春茶城', address: '梅江区' },
    { id: 306, provinceId: 6, province: '广东省', city: '梅州市', district: '梅县区', name: '西岩茶叶集团批发部', address: '梅县区' },
    { id: 307, provinceId: 6, province: '广东省', city: '梅州市', district: '大埔县', name: '大埔西岩山茶场（枫朗镇）', address: '大埔县' },

    { id: 308, provinceId: 6, province: '广东省', city: '惠州市', district: '惠城区', name: '惠州茶都', address: '惠城区' },
    { id: 309, provinceId: 6, province: '广东省', city: '惠州市', district: '惠城区', name: '惠州茶叶城', address: '惠城区' },
    { id: 310, provinceId: 6, province: '广东省', city: '惠州市', district: '惠城区', name: '西湖茶叶市场', address: '惠城区' },
    { id: 311, provinceId: 6, province: '广东省', city: '惠州市', district: '惠阳区', name: '东江茶叶市场', address: '惠阳区' },
    { id: 312, provinceId: 6, province: '广东省', city: '惠州市', district: '惠东县', name: '惠东茶叶城', address: '惠东县' },
    { id: 313, provinceId: 6, province: '广东省', city: '惠州市', district: '博罗县', name: '博罗茶叶市场', address: '博罗县' },

    { id: 314, provinceId: 6, province: '广东省', city: '汕尾市', district: '城区', name: '城区东辉市场集群', address: '城区' },
    { id: 315, provinceId: 6, province: '广东省', city: '汕尾市', district: '城区', name: '宝香茶业', address: '城区' },
    { id: 316, provinceId: 6, province: '广东省', city: '汕尾市', district: '海丰县', name: '汕尾养肝茶茶城', address: '海丰县' },
    { id: 317, provinceId: 6, province: '广东省', city: '汕尾市', district: '海丰县', name: '淘茗汇茶业有限公司', address: '海丰县' },

    { id: 318, provinceId: 6, province: '广东省', city: '东莞市', district: '万江区', name: '万江茶城', address: '万江区' },
    { id: 319, provinceId: 6, province: '广东省', city: '东莞市', district: '万江区', name: '万江石美茶叶交易市场', address: '万江区' },
    { id: 320, provinceId: 6, province: '广东省', city: '东莞市', district: '南城区', name: '东莞国际茶叶交易中心', address: '南城区' },
    { id: 321, provinceId: 6, province: '广东省', city: '东莞市', district: '茶山镇', name: '东莞市茶叶交易市场', address: '茶山镇' },
    { id: 322, provinceId: 6, province: '广东省', city: '东莞市', district: '凤岗镇', name: '凤岗天峰山普洱茶市场', address: '凤岗镇' },
    { id: 323, provinceId: 6, province: '广东省', city: '东莞市', district: '东城区', name: '茶香国际茶叶城', address: '东城区' },

    { id: 324, provinceId: 6, province: '广东省', city: '中山市', district: '南区', name: '华通行茶叶市场', address: '南区' },
    { id: 325, provinceId: 6, province: '广东省', city: '中山市', district: '南区', name: '龙环茶叶批发城', address: '南区' },
    { id: 326, provinceId: 6, province: '广东省', city: '中山市', district: '古镇镇', name: '古镇福泉茶业（八方茶园）', address: '古镇镇' },

    { id: 327, provinceId: 6, province: '广东省', city: '江门市', district: '蓬江区', name: '远洋茶叶市场', address: '蓬江区' },
    { id: 328, provinceId: 6, province: '广东省', city: '江门市', district: '江海区', name: '侨乡国际茶叶批发城', address: '江海区' },
    { id: 329, provinceId: 6, province: '广东省', city: '江门市', district: '江海区', name: '泰益茶叶批发城', address: '江海区' },
    { id: 330, provinceId: 6, province: '广东省', city: '江门市', district: '新会区', name: '新会茶城（新会茶叶场）', address: '新会区' },
    { id: 331, provinceId: 6, province: '广东省', city: '江门市', district: '新会区', name: '陈皮村茶业市场', address: '新会区' },
    { id: 332, provinceId: 6, province: '广东省', city: '江门市', district: '新会区', name: '冈州茶叶市场', address: '新会区' },
    { id: 333, provinceId: 6, province: '广东省', city: '江门市', district: '鹤山市', name: '鹤山沙坪茶叶批发街', address: '鹤山市' },
    { id: 334, provinceId: 6, province: '广东省', city: '江门市', district: '开平市', name: '开平大沙镇茶叶场', address: '开平市' },

    { id: 335, provinceId: 6, province: '广东省', city: '阳江市', district: '江城区', name: '名濠麻演新联茶叶批发市场', address: '江城区' },
    { id: 336, provinceId: 6, province: '广东省', city: '阳江市', district: '江城区', name: '中联茶叶城', address: '江城区' },
    { id: 337, provinceId: 6, province: '广东省', city: '阳江市', district: '江城区', name: '金山路茶叶市场', address: '江城区' },
    { id: 338, provinceId: 6, province: '广东省', city: '阳江市', district: '阳春市', name: '阳春市茶批发市场', address: '阳春市' },
    { id: 339, provinceId: 6, province: '广东省', city: '阳江市', district: '阳西县', name: '阳西县峨凰峰茶叶厂', address: '阳西县' },

    { id: 340, provinceId: 6, province: '广东省', city: '湛江市', district: '霞山区', name: '湛江茶叶批发市场', address: '霞山区' },
    { id: 341, provinceId: 6, province: '广东省', city: '湛江市', district: '霞山区', name: '恒丰源茶叶批发部', address: '霞山区' },
    { id: 342, provinceId: 6, province: '广东省', city: '湛江市', district: '霞山区', name: '凤凰山茶叶市场', address: '霞山区' },
    { id: 343, provinceId: 6, province: '广东省', city: '湛江市', district: '赤坎区', name: '海田茶叶城', address: '赤坎区' },
    { id: 344, provinceId: 6, province: '广东省', city: '湛江市', district: '赤坎区', name: '湛江茶具批发市场', address: '赤坎区' },
    { id: 345, provinceId: 6, province: '广东省', city: '湛江市', district: '赤坎区', name: '东和茶城', address: '赤坎区' },
    { id: 346, provinceId: 6, province: '广东省', city: '湛江市', district: '麻章区', name: '茗苑茶叶批发部', address: '麻章区' },
    { id: 347, provinceId: 6, province: '广东省', city: '湛江市', district: '麻章区', name: '九村茶市', address: '麻章区' },

    { id: 348, provinceId: 6, province: '广东省', city: '茂名市', district: '茂南区', name: '茂南茶叶城（站前路市场）', address: '茂南区' },
    { id: 349, provinceId: 6, province: '广东省', city: '茂名市', district: '茂南区', name: '茂名国际茶市', address: '茂南区' },
    { id: 350, provinceId: 6, province: '广东省', city: '茂名市', district: '高州市', name: '高州茶叶市场', address: '高州市' },
    { id: 351, provinceId: 6, province: '广东省', city: '茂名市', district: '电白区', name: '海棠轩茶叶批发部', address: '电白区' },
    { id: 352, provinceId: 6, province: '广东省', city: '茂名市', district: '信宜市', name: '信宜大营坳茶场', address: '信宜市' },

    { id: 353, provinceId: 6, province: '广东省', city: '肇庆市', district: '端州区', name: '肇庆华英茶叶交易市场', address: '端州区' },
    { id: 354, provinceId: 6, province: '广东省', city: '肇庆市', district: '端州区', name: '肇庆茶叶城', address: '端州区' },
    { id: 355, provinceId: 6, province: '广东省', city: '肇庆市', district: '端州区', name: '黄岗镇茶叶场', address: '端州区' },
    { id: 356, provinceId: 6, province: '广东省', city: '肇庆市', district: '端州区', name: '洛溪茶城', address: '端州区' },
    { id: 357, provinceId: 6, province: '广东省', city: '肇庆市', district: '鼎湖区', name: '清升茶城', address: '鼎湖区' },
    { id: 358, provinceId: 6, province: '广东省', city: '肇庆市', district: '鼎湖区', name: '欧菲茶城', address: '鼎湖区' },

    { id: 359, provinceId: 6, province: '广东省', city: '清远市', district: '清城区', name: '清凤茶叶特产批发市场', address: '清城区' },
    { id: 360, provinceId: 6, province: '广东省', city: '清远市', district: '清城区', name: '清城区小市协兴茶叶批发部', address: '清城区' },
    { id: 361, provinceId: 6, province: '广东省', city: '清远市', district: '清城区', name: '清远农批市场', address: '清城区' },
    { id: 362, provinceId: 6, province: '广东省', city: '清远市', district: '清城区', name: '沙田土特产市场', address: '清城区' },
    { id: 363, provinceId: 6, province: '广东省', city: '清远市', district: '英德市', name: '英德茶叶世界（利民路店）', address: '英德市' },
    { id: 364, provinceId: 6, province: '广东省', city: '清远市', district: '英德市', name: '英城君玉茶叶批发部', address: '英德市' },
    { id: 365, provinceId: 6, province: '广东省', city: '清远市', district: '英德市', name: '睿智茶叶特产批发', address: '英德市' },

    { id: 366, provinceId: 6, province: '广东省', city: '潮州市', district: '湘桥区', name: '潮州茶叶城', address: '湘桥区' },
    { id: 367, provinceId: 6, province: '广东省', city: '潮州市', district: '湘桥区', name: '老城区茶叶街', address: '湘桥区' },
    { id: 368, provinceId: 6, province: '广东省', city: '潮州市', district: '潮安区', name: '庵埠镇茶叶场', address: '潮安区' },
    { id: 369, provinceId: 6, province: '广东省', city: '潮州市', district: '潮安区', name: '枫溪茶叶市场', address: '潮安区' },
    { id: 370, provinceId: 6, province: '广东省', city: '潮州市', district: '潮安区', name: '凤凰镇茶叶市场', address: '潮安区' },
    { id: 371, provinceId: 6, province: '广东省', city: '潮州市', district: '潮安区', name: '融创茶叶市场', address: '潮安区' },
    { id: 372, provinceId: 6, province: '广东省', city: '潮州市', district: '饶平县', name: '饶平茶叶市场', address: '饶平县' },

    { id: 373, provinceId: 6, province: '广东省', city: '揭阳市', district: '榕城区', name: '揭阳岭南茶文化街', address: '榕城区' },
    { id: 374, provinceId: 6, province: '广东省', city: '揭阳市', district: '榕城区', name: '国香茶叶市场', address: '榕城区' },
    { id: 375, provinceId: 6, province: '广东省', city: '揭阳市', district: '榕城区', name: '解放路茶叶场', address: '榕城区' },
    { id: 376, provinceId: 6, province: '广东省', city: '揭阳市', district: '榕城区', name: '花茶专业市场', address: '榕城区' },
    { id: 377, provinceId: 6, province: '广东省', city: '揭阳市', district: '普宁市', name: '普宁里湖茶叶市场', address: '普宁市' },
    { id: 378, provinceId: 6, province: '广东省', city: '揭阳市', district: '揭东区', name: '坪上绿茶基地', address: '揭东区' },

    { id: 379, provinceId: 6, province: '广东省', city: '云浮市', district: '新兴县', name: '云浮茶叶场', address: '新兴县' },
    { id: 380, provinceId: 6, province: '广东省', city: '云浮市', district: '云城区', name: '云城区茶叶市场', address: '云城区' },
    { id: 381, provinceId: 6, province: '广东省', city: '云浮市', district: '云城区', name: '老城区茶艺馆', address: '云城区' },
    { id: 382, provinceId: 6, province: '广东省', city: '云浮市', district: '云城区', name: '岭南茶文化街电商创业园', address: '云城区' },
    { id: 383, provinceId: 6, province: '广东省', city: '云浮市', district: '罗定市', name: '塘镇绿泉茶叶合作社', address: '罗定市' },
    { id: 384, provinceId: 6, province: '广东省', city: '云浮市', district: '罗定市', name: '金湖旅游茶文化区', address: '罗定市' },

    // 江苏省
    { id: 385, provinceId: 7, province: '江苏省', city: '南京市', district: '鼓楼区', name: '下关茶叶市场', address: '鼓楼区' },
    { id: 386, provinceId: 7, province: '江苏省', city: '南京市', district: '鼓楼区', name: '禾盛茶叶场', address: '鼓楼区' },
    { id: 387, provinceId: 7, province: '江苏省', city: '南京市', district: '建邺区', name: '江苏正大茶城', address: '建邺区' },
    { id: 388, provinceId: 7, province: '江苏省', city: '南京市', district: '建邺区', name: '南京普洱茶交易中心', address: '建邺区' },
    { id: 389, provinceId: 7, province: '江苏省', city: '南京市', district: '浦口区', name: '南京南站茶城', address: '浦口区（江北）' },
    { id: 390, provinceId: 7, province: '江苏省', city: '南京市', district: '江宁区', name: '陆朗茶叶批发', address: '江宁区' },
    { id: 391, provinceId: 7, province: '江苏省', city: '南京市', district: '秦淮区', name: '夫子庙茶叶市场', address: '秦淮区' },
    { id: 392, provinceId: 7, province: '江苏省', city: '南京市', district: '秦淮区', name: '信誉粮行', address: '秦淮区' },

    { id: 393, provinceId: 7, province: '江苏省', city: '无锡市', district: '梁溪区', name: '红星茶叶批发市场', address: '梁溪区' },
    { id: 394, provinceId: 7, province: '江苏省', city: '无锡市', district: '梁溪区', name: '朝阳茶叶市场', address: '梁溪区' },
    { id: 395, provinceId: 7, province: '江苏省', city: '无锡市', district: '梁溪区', name: '大江南茶叶场', address: '梁溪区' },
    { id: 396, provinceId: 7, province: '江苏省', city: '无锡市', district: '南长区', name: '太湖茶叶市场', address: '南长区' },
    { id: 397, provinceId: 7, province: '江苏省', city: '无锡市', district: '新区', name: '无锡国际茶叶城', address: '新区' },
    { id: 398, provinceId: 7, province: '江苏省', city: '无锡市', district: '特色批发', name: '红太阳茶叶城', address: '特色批发' },
    { id: 399, provinceId: 7, province: '江苏省', city: '无锡市', district: '特色批发', name: '乾红·早春茶', address: '特色批发' },
    { id: 400, provinceId: 7, province: '江苏省', city: '无锡市', district: '特色批发', name: '招商城茶城', address: '特色批发' },

    { id: 401, provinceId: 7, province: '江苏省', city: '徐州市', district: '云龙区', name: '裕茂茶叶市场', address: '云龙区' },
    { id: 402, provinceId: 7, province: '江苏省', city: '徐州市', district: '云龙区', name: '徐州茶叶场', address: '云龙区' },
    { id: 403, provinceId: 7, province: '江苏省', city: '徐州市', district: '鼓楼区', name: '闽南茶叶市场', address: '鼓楼区' },
    { id: 404, provinceId: 7, province: '江苏省', city: '徐州市', district: '鼓楼区', name: '老同昌茶叶市场', address: '鼓楼区' },
    { id: 405, provinceId: 7, province: '江苏省', city: '徐州市', district: '泉山区', name: '泉山茶叶集散区', address: '泉山区' },
    { id: 406, provinceId: 7, province: '江苏省', city: '徐州市', district: '泉山区', name: '户部山茶叶市场', address: '泉山区' },

    { id: 407, provinceId: 7, province: '江苏省', city: '常州市', district: '主城区', name: '一品茶叶交易市场', address: '主城区' },
    { id: 408, provinceId: 7, province: '江苏省', city: '常州市', district: '主城区', name: '银桥茶叶市场（马坝古镇）', address: '主城区' },
    { id: 409, provinceId: 7, province: '江苏省', city: '常州市', district: '主城区', name: '霸祖开古国际兰陵茶城（常州普洱茶场）', address: '主城区' },
    { id: 410, provinceId: 7, province: '江苏省', city: '常州市', district: '主城区', name: '不夜城茶叶场', address: '主城区' },
    { id: 411, provinceId: 7, province: '江苏省', city: '常州市', district: '金坛区', name: '花山茶叶市场', address: '金坛区' },
    { id: 412, provinceId: 7, province: '江苏省', city: '常州市', district: '金坛区', name: '茅麓茶叶市场', address: '金坛区' },

    { id: 413, provinceId: 7, province: '江苏省', city: '苏州市', district: '姑苏区', name: '大龙港茶叶批发市场', address: '姑苏区' },
    { id: 414, provinceId: 7, province: '江苏省', city: '苏州市', district: '姑苏区', name: '汇邻·新市（原苏州茶叶市场）', address: '姑苏区' },
    { id: 415, provinceId: 7, province: '江苏省', city: '苏州市', district: '姑苏区', name: '安和锦·美地PARK茶人街', address: '姑苏区' },
    { id: 416, provinceId: 7, province: '江苏省', city: '苏州市', district: '吴中区', name: '南门茶叶批发市场', address: '吴中区' },
    { id: 417, provinceId: 7, province: '江苏省', city: '苏州市', district: '吴中区', name: '天荼茶城（木渎凯马广场）', address: '吴中区' },

    { id: 418, provinceId: 7, province: '江苏省', city: '南通市', district: '主城区', name: '南通国际茶城', address: '主城区' },
    { id: 419, provinceId: 7, province: '江苏省', city: '南通市', district: '主城区', name: '南通茶叶城', address: '主城区' },
    { id: 420, provinceId: 7, province: '江苏省', city: '南通市', district: '主城区', name: '文峰茶叶市场', address: '主城区' },
    { id: 421, provinceId: 7, province: '江苏省', city: '南通市', district: '主城区', name: '绿源茶叶市场', address: '主城区' },

    { id: 422, provinceId: 7, province: '江苏省', city: '连云港市', district: '海州区', name: '四季农副产品场茶叶专区', address: '海州区' },
    { id: 423, provinceId: 7, province: '江苏省', city: '连云港市', district: '海州区', name: '白虎山批发市场', address: '海州区' },
    { id: 424, provinceId: 7, province: '江苏省', city: '连云港市', district: '连云区', name: '华东城茶叶市场', address: '连云区' },

    { id: 425, provinceId: 7, province: '江苏省', city: '淮安市', district: '清江浦区', name: '福林茶叶批发市场', address: '清江浦区' },
    { id: 426, provinceId: 7, province: '江苏省', city: '淮安市', district: '清江浦区', name: '清江浦区茶叶市场（圩北路市场）', address: '清江浦区' },
    { id: 427, provinceId: 7, province: '江苏省', city: '淮安市', district: '清江浦区', name: '淮安市茶叶批发中心', address: '清江浦区' },
    { id: 428, provinceId: 7, province: '江苏省', city: '淮安市', district: '清江浦区', name: '淮安古茶街', address: '清江浦区' },
    { id: 429, provinceId: 7, province: '江苏省', city: '淮安市', district: '淮阴区', name: '淮安茶叶大市场', address: '淮阴区' },
    { id: 430, provinceId: 7, province: '江苏省', city: '淮安市', district: '清河新区', name: '淮安国际茶城', address: '清河新区' },

    { id: 431, provinceId: 7, province: '江苏省', city: '盐城市', district: '主城区', name: '白马茶叶市场', address: '主城区' },
    { id: 432, provinceId: 7, province: '江苏省', city: '盐城市', district: '主城区', name: '江苏正大茶叶城', address: '主城区' },
    { id: 433, provinceId: 7, province: '江苏省', city: '盐城市', district: '主城区', name: '九鼎茶叶场', address: '主城区' },
    { id: 434, provinceId: 7, province: '江苏省', city: '盐城市', district: '主城区', name: '茶叶大市场（新址）', address: '主城区' },
    { id: 435, provinceId: 7, province: '江苏省', city: '盐城市', district: '主城区', name: '紫薇茶城', address: '主城区' },

    { id: 436, provinceId: 7, province: '江苏省', city: '扬州市', district: '广陵区', name: '扬州农业茶叶场', address: '广陵区' },
    { id: 437, provinceId: 7, province: '江苏省', city: '扬州市', district: '广陵区', name: '荷花池步行街茶叶场', address: '广陵区' },
    { id: 438, provinceId: 7, province: '江苏省', city: '扬州市', district: '广陵区', name: '天目春茶业批发部', address: '广陵区' },
    { id: 439, provinceId: 7, province: '江苏省', city: '扬州市', district: '邗江区', name: '扬州茶叶场（原南门市场）', address: '邗江区' },
    { id: 440, provinceId: 7, province: '江苏省', city: '扬州市', district: '邗江区', name: '永尚茶叶批发部', address: '邗江区' },
    { id: 441, provinceId: 7, province: '江苏省', city: '扬州市', district: '邗江区', name: '润扬茶叶场', address: '邗江区' },
    { id: 442, provinceId: 7, province: '江苏省', city: '扬州市', district: '江都区', name: '峨桥镇茶叶批发市场', address: '江都区' },

    { id: 443, provinceId: 7, province: '江苏省', city: '镇江市', district: '主城区', name: '京口路茶叶市场（京口路茶叶城）', address: '主城区' },
    { id: 444, provinceId: 7, province: '江苏省', city: '镇江市', district: '主城区', name: '镇江义乌小商品城茶叶批发市场', address: '主城区' },
    { id: 445, provinceId: 7, province: '江苏省', city: '镇江市', district: '主城区', name: '新坝茶叶城', address: '主城区' },

    { id: 446, provinceId: 7, province: '江苏省', city: '泰州市', district: '海陵区', name: '泰州市茶叶城', address: '海陵区' },
    { id: 447, provinceId: 7, province: '江苏省', city: '泰州市', district: '海陵区', name: '九龙副食品市场（茶叶专区）', address: '海陵区' },
    { id: 448, provinceId: 7, province: '江苏省', city: '泰州市', district: '海陵区', name: '泰州市农副产品中心场', address: '海陵区' },
    { id: 449, provinceId: 7, province: '江苏省', city: '泰州市', district: '海陵区', name: '寺巷茶叶城', address: '海陵区' },
    { id: 450, provinceId: 7, province: '江苏省', city: '泰州市', district: '海陵区', name: '绿色心情茶叶茶具批发商行', address: '海陵区' },
    { id: 451, provinceId: 7, province: '江苏省', city: '泰州市', district: '高港区', name: '历山茶行', address: '高港区' },
    { id: 452, provinceId: 7, province: '江苏省', city: '泰州市', district: '姜堰区', name: '小叶茶叶批发', address: '姜堰区' },

    { id: 453, provinceId: 7, province: '江苏省', city: '宿迁市', district: '主城区', name: '峨桥茶叶交易市场', address: '主城区' },
    { id: 454, provinceId: 7, province: '江苏省', city: '宿迁市', district: '主城区', name: '红星凯盛茶叶城', address: '主城区' },
    { id: 455, provinceId: 7, province: '江苏省', city: '宿迁市', district: '主城区', name: '宿迁寿眉白茶场', address: '主城区' },
    { id: 456, provinceId: 7, province: '江苏省', city: '宿迁市', district: '主城区', name: '宿迁市普洱茶场', address: '主城区' },

    { id: 457, provinceId: 7, province: '江苏省', city: '昆山市', district: '主城区', name: '春晖茶叶批发市场', address: '主城区' },
    { id: 458, provinceId: 7, province: '江苏省', city: '昆山市', district: '主城区', name: '昆山茶叶城', address: '主城区' },
    { id: 459, provinceId: 7, province: '江苏省', city: '昆山市', district: '主城区', name: '玉山茶叶市场', address: '主城区' },
    { id: 460, provinceId: 7, province: '江苏省', city: '昆山市', district: '主城区', name: '花园路茶叶街', address: '主城区' },
    { id: 461, provinceId: 7, province: '江苏省', city: '昆山市', district: '玉山镇', name: '玉山镇综合批发市场（含兴灿茶叶批发部、宝法茶叶南北货批发总汇）', address: '玉山镇' },

    { id: 462, provinceId: 7, province: '江苏省', city: '泰兴市', district: '主城区', name: '泰州眉经销场', address: '主城区' },
    { id: 463, provinceId: 7, province: '江苏省', city: '泰兴市', district: '主城区', name: '银泰购物中心茶业集群（含大世界茶叶批发部、东进茶业）', address: '主城区' },

    { id: 464, provinceId: 7, province: '江苏省', city: '沭阳县', district: '主城区', name: '百盟物流产业园茶城区', address: '主城区' },
    { id: 465, provinceId: 7, province: '江苏省', city: '沭阳县', district: '主城区', name: '蓝天国际商贸城（茶叶专区）', address: '主城区' },
    { id: 466, provinceId: 7, province: '江苏省', city: '沭阳县', district: '主城区', name: '万豪国际大酒店附属茶城', address: '主城区' },
    { id: 467, provinceId: 7, province: '江苏省', city: '沭阳县', district: '主城区', name: '大润发超市商店街（茶叶商户）', address: '主城区' },
    { id: 468, provinceId: 7, province: '江苏省', city: '沭阳县', district: '主城区', name: '东方广场（茶叶商户）', address: '主城区' },

    // 江西省
    { id: 469, provinceId: 8, province: '江西省', city: '南昌市', district: '青山湖区', name: '南昌茶叶交易市场', address: '青山湖区' },
    { id: 470, provinceId: 8, province: '江西省', city: '南昌市', district: '青云谱区', name: '洪城大市场茶叶批发市场', address: '青云谱区' },
    { id: 471, provinceId: 8, province: '江西省', city: '南昌市', district: '西湖区', name: '南昌茶叶场', address: '西湖区' },
    { id: 472, provinceId: 8, province: '江西省', city: '南昌市', district: '红谷滩新区', name: '红谷滩茶叶批发市场', address: '红谷滩新区' },

    { id: 473, provinceId: 8, province: '江西省', city: '九江市', district: '濂溪区', name: '九江茶市', address: '濂溪区' },
    { id: 474, provinceId: 8, province: '江西省', city: '九江市', district: '浔阳区', name: '九江茶叶大市场', address: '浔阳区' },
    { id: 475, provinceId: 8, province: '江西省', city: '九江市', district: '浔阳区', name: '新雪域九江茶市交易区', address: '浔阳区' },
    { id: 476, provinceId: 8, province: '江西省', city: '九江市', district: '浔阳区', name: '甘泉路茶叶场', address: '浔阳区' },
    { id: 477, provinceId: 8, province: '江西省', city: '九江市', district: '浔阳区', name: '九江茶叶城（西门路）', address: '浔阳区' },

    { id: 479, provinceId: 8, province: '江西省', city: '景德镇市', district: '浮梁县', name: '勒功乡露天茶叶交易市场', address: '浮梁县' },
    { id: 480, provinceId: 8, province: '江西省', city: '景德镇市', district: '浮梁县', name: '浮东茶叶产地交易市场', address: '浮梁县' },

    { id: 481, provinceId: 8, province: '江西省', city: '上饶市', district: '信州区', name: '信农茶批发市场', address: '信州区' },
    { id: 482, provinceId: 8, province: '江西省', city: '上饶市', district: '信州区', name: '上饶茶叶市场', address: '信州区' },
    { id: 483, provinceId: 8, province: '江西省', city: '上饶市', district: '信州区', name: '普洱茶批发专区', address: '信州区' },
    { id: 484, provinceId: 8, province: '江西省', city: '上饶市', district: '婺源县', name: '婺源茶叶场', address: '婺源县' },

    { id: 485, provinceId: 8, province: '江西省', city: '鹰潭市', district: '月湖区', name: '鹰潭茶叶场', address: '月湖区' },
    { id: 486, provinceId: 8, province: '江西省', city: '鹰潭市', district: '月湖区', name: '鹰潭茶叶城', address: '月湖区' },
    { id: 487, provinceId: 8, province: '江西省', city: '鹰潭市', district: '月湖区', name: '香源茶市', address: '月湖区' },
    { id: 488, provinceId: 8, province: '江西省', city: '鹰潭市', district: '月湖区', name: '铁道茶叶市场', address: '月湖区' },
    { id: 489, provinceId: 8, province: '江西省', city: '鹰潭市', district: '贵溪市', name: '贵溪茶城茶叶市场', address: '贵溪市' },
    { id: 490, provinceId: 8, province: '江西省', city: '鹰潭市', district: '特色产业园区', name: '鹰潭茶文化产业园', address: '特色产业园区' },

    { id: 491, provinceId: 8, province: '江西省', city: '抚州市', district: '临川区', name: '抚州茶城', address: '临川区' },
    { id: 492, provinceId: 8, province: '江西省', city: '抚州市', district: '临川区', name: '抚州茶叶博览城', address: '临川区' },
    { id: 493, provinceId: 8, province: '江西省', city: '抚州市', district: '临川区', name: '南昌茶叶交易市场（抚州分部）', address: '临川区' },
    { id: 494, provinceId: 8, province: '江西省', city: '抚州市', district: '临川区', name: '西园茶叶市场', address: '临川区' },
    { id: 495, provinceId: 8, province: '江西省', city: '抚州市', district: '临川区', name: '抚州农副产品市场（茶叶专区）', address: '临川区' },
    { id: 496, provinceId: 8, province: '江西省', city: '抚州市', district: '东乡区', name: '差干洞茶叶市场', address: '东乡区' },

    { id: 497, provinceId: 8, province: '江西省', city: '萍乡市', district: '安源区', name: '萍乡茶叶市场', address: '安源区' },
    { id: 498, provinceId: 8, province: '江西省', city: '萍乡市', district: '安源区', name: '萍乡茶叶城', address: '安源区' },
    { id: 499, provinceId: 8, province: '江西省', city: '萍乡市', district: '湘东区', name: '萍乡国际茶叶包装城', address: '湘东区' },

    { id: 500, provinceId: 8, province: '江西省', city: '宜春市', district: '州区', name: '新宜春市优质茶叶专业批发中心', address: '州区' },
    { id: 501, provinceId: 8, province: '江西省', city: '宜春市', district: '州区', name: '宜春市茶叶场', address: '州区' },
    { id: 502, provinceId: 8, province: '江西省', city: '宜春市', district: '袁州区', name: '袁州区茶叶交易中心', address: '袁州区' },
    { id: 503, provinceId: 8, province: '江西省', city: '宜春市', district: '遂川县', name: '遂川茶叶场', address: '遂川县' },
    { id: 504, provinceId: 8, province: '江西省', city: '宜春市', district: '丰城市', name: '丰城市茶叶零售集散点', address: '丰城市' },

    { id: 505, provinceId: 8, province: '江西省', city: '新余市', district: '渝水区', name: '新余市茶叶场', address: '渝水区' },
    { id: 506, provinceId: 8, province: '江西省', city: '新余市', district: '渝水区', name: '新余茶叶批发市场（城北街道）', address: '渝水区' },
    { id: 507, provinceId: 8, province: '江西省', city: '新余市', district: '渝水区', name: '楷茗轩', address: '渝水区' },
    { id: 508, provinceId: 8, province: '江西省', city: '新余市', district: '渝水区', name: '盛世茶行', address: '渝水区' },
    { id: 509, provinceId: 8, province: '江西省', city: '新余市', district: '渝水区', name: '华祥苑茗茶（新余店）', address: '渝水区' },
    { id: 510, provinceId: 8, province: '江西省', city: '新余市', district: '高新区', name: '高新区宇美茶叶店', address: '高新区' },
    { id: 511, provinceId: 8, province: '江西省', city: '新余市', district: '仙女湖风景名胜区', name: '仙女湖茶叶场', address: '仙女湖风景名胜区' },

    { id: 512, provinceId: 8, province: '江西省', city: '吉安市', district: '青原区', name: '万商汇茶叶场', address: '青原区' },
    { id: 513, provinceId: 8, province: '江西省', city: '吉安市', district: '青原区', name: '老班章茶叶场', address: '青原区' },
    { id: 514, provinceId: 8, province: '江西省', city: '吉安市', district: '吉州区', name: '吉州区茶叶市场', address: '吉州区' },
    { id: 515, provinceId: 8, province: '江西省', city: '吉安市', district: '遂川县', name: '遂川县汤湖茶叶综合市场', address: '遂川县' },
    { id: 516, provinceId: 8, province: '江西省', city: '吉安市', district: '井冈山市', name: '井冈山市茨坪镇茶叶场', address: '井冈山市' },

    { id: 517, provinceId: 8, province: '江西省', city: '赣州市', district: '章贡区', name: '赣州茶叶交易市场（章江茶城）', address: '章贡区' },
    { id: 518, provinceId: 8, province: '江西省', city: '赣州市', district: '章贡区', name: '赣州市茶叶城', address: '章贡区' },
    { id: 519, provinceId: 8, province: '江西省', city: '赣州市', district: '章贡区', name: '虔州粮油茶叶场', address: '章贡区' },
    { id: 520, provinceId: 8, province: '江西省', city: '赣州市', district: '章贡区', name: '赣州市单丛茶批发中心', address: '章贡区' },
    { id: 521, provinceId: 8, province: '江西省', city: '赣州市', district: '赣县区', name: '赣州茶叶市场交易中心（主中心）', address: '赣县区' },
    { id: 522, provinceId: 8, province: '江西省', city: '赣州市', district: '南康区', name: '南康茶叶基地', address: '南康区' },
    { id: 523, provinceId: 8, province: '江西省', city: '赣州市', district: '龙南市', name: '剑平茶叶批发店', address: '龙南市' },

    // 湖北省
    { id: 524, provinceId: 9, province: '湖北省', city: '武汉市', district: '黄陂区', name: '汉口北茶叶场', address: '黄陂区' },
    { id: 525, provinceId: 9, province: '湖北省', city: '武汉市', district: '江岸区', name: '中储茶叶场', address: '江岸区' },
    { id: 526, provinceId: 9, province: '湖北省', city: '武汉市', district: '汉阳区', name: '西北湖茶叶市场', address: '汉阳区' },
    { id: 527, provinceId: 9, province: '湖北省', city: '武汉市', district: '硚口区', name: '玉带茗都茶叶市场', address: '硚口区' },
    { id: 528, provinceId: 9, province: '湖北省', city: '武汉市', district: '江岸区', name: '崇仁路茶叶市场', address: '江岸区' },
    { id: 529, provinceId: 9, province: '湖北省', city: '武汉市', district: '洪山区', name: '徐东茶市', address: '洪山区' },
    { id: 530, provinceId: 9, province: '湖北省', city: '武汉市', district: '洪山区', name: '水果湖茶叶市场', address: '洪山区' },
    { id: 531, provinceId: 9, province: '湖北省', city: '武汉市', district: '汉阳区', name: '知音国际茶城', address: '汉阳区' },
    { id: 532, provinceId: 9, province: '湖北省', city: '武汉市', district: '武昌区', name: '陆羽茶都', address: '武昌区' },
    { id: 533, provinceId: 9, province: '湖北省', city: '武汉市', district: '洪山区', name: '洪山珞喻路批发市场', address: '洪山区' },

    { id: 534, provinceId: 9, province: '湖北省', city: '黄石市', district: '黄石港区', name: '黄石茶城', address: '黄石港区' },
    { id: 535, provinceId: 9, province: '湖北省', city: '黄石市', district: '黄石港区', name: '华中茶叶城', address: '黄石港区' },
    { id: 536, provinceId: 9, province: '湖北省', city: '黄石市', district: '西塞山区', name: '大汉口茶市', address: '西塞山区' },
    { id: 537, provinceId: 9, province: '湖北省', city: '黄石市', district: '西塞山区', name: '精品饮品市场', address: '西塞山区' },
    { id: 538, provinceId: 9, province: '湖北省', city: '黄石市', district: '新港园区', name: '金海白茶交易中心（建设中）', address: '新港园区' },

    { id: 539, provinceId: 9, province: '湖北省', city: '十堰市', district: '茅箭区', name: '柳林路楚天名茶批发部', address: '茅箭区' },
    { id: 540, provinceId: 9, province: '湖北省', city: '十堰市', district: '茅箭区', name: '武当茶城', address: '茅箭区' },
    { id: 541, provinceId: 9, province: '湖北省', city: '十堰市', district: '茅箭区', name: '湖北祥辉茶业开发有限公司', address: '茅箭区' },
    { id: 542, provinceId: 9, province: '湖北省', city: '十堰市', district: '经济开发区', name: '高山茗茶茶叶经销处', address: '经济开发区' },
    { id: 543, provinceId: 9, province: '湖北省', city: '十堰市', district: '经济开发区', name: '李氏家园茶业批发商行', address: '经济开发区' },
    { id: 544, provinceId: 9, province: '湖北省', city: '十堰市', district: '经济开发区', name: '堂拓商贸', address: '经济开发区' },
    { id: 545, provinceId: 9, province: '湖北省', city: '十堰市', district: '竹山县', name: '竹山县茗茶汇茶叶销售门市部', address: '竹山县' },
    { id: 546, provinceId: 9, province: '湖北省', city: '十堰市', district: '竹溪县', name: '鄂渝陕（竹溪）茶叶交易市场', address: '竹溪县' },
    { id: 547, provinceId: 9, province: '湖北省', city: '十堰市', district: '竹山县', name: '竹山茶叶交易市场', address: '竹山县' },
    { id: 548, provinceId: 9, province: '湖北省', city: '十堰市', district: '武当山区域', name: '丹江口市武当山八仙观茶叶总场', address: '武当山区域' },
    { id: 549, provinceId: 9, province: '湖北省', city: '十堰市', district: '市区', name: '佰昌优质农产品物流园', address: '市区' },
    { id: 550, provinceId: 9, province: '湖北省', city: '十堰市', district: '竹溪县', name: '曾家寨茶业', address: '竹溪县' },

    { id: 551, provinceId: 9, province: '湖北省', city: '宜昌市', district: '夷陵区', name: '宜昌夷陵茶城', address: '夷陵区' },
    { id: 552, provinceId: 9, province: '湖北省', city: '宜昌市', district: '夷陵区', name: '三峡茶城', address: '夷陵区' },
    { id: 553, provinceId: 9, province: '湖北省', city: '宜昌市', district: '夷陵区', name: '邓村乡鲜叶交易市场', address: '夷陵区' },
    { id: 554, provinceId: 9, province: '湖北省', city: '宜昌市', district: '西陵区', name: '西陵区茶叶市场', address: '西陵区' },
    { id: 555, provinceId: 9, province: '湖北省', city: '宜昌市', district: '伍家岗区', name: '汉口路茶叶市场', address: '伍家岗区' },
    { id: 556, provinceId: 9, province: '湖北省', city: '宜昌市', district: '伍家岗区', name: '果园一路茶叶场', address: '伍家岗区' },
    { id: 557, provinceId: 9, province: '湖北省', city: '宜昌市', district: '五峰县', name: '湖北西南茶叶市场', address: '五峰县' },

    { id: 558, provinceId: 9, province: '湖北省', city: '襄阳市', district: '樊城区', name: '襄阳国际旅游茶城', address: '樊城区' },
    { id: 559, provinceId: 9, province: '湖北省', city: '襄阳市', district: '樊城区', name: '襄阳茶叶批发市场', address: '樊城区' },
    { id: 560, provinceId: 9, province: '湖北省', city: '襄阳市', district: '樊城区', name: '彩虹门茶叶市场', address: '樊城区' },
    { id: 561, provinceId: 9, province: '湖北省', city: '襄阳市', district: '竹溪县', name: '竹溪茶叶交易市场', address: '竹溪县' },

    { id: 562, provinceId: 9, province: '湖北省', city: '鄂州市', district: '鄂城区', name: '鄂州普洱茶场', address: '鄂城区' },
    { id: 563, provinceId: 9, province: '湖北省', city: '鄂州市', district: '鄂城区', name: '武昌大道东山茶市', address: '鄂城区' },
    { id: 564, provinceId: 9, province: '湖北省', city: '鄂州市', district: '梁子湖区', name: '梁子湖宝洪茶批发配送', address: '梁子湖区' },
    { id: 565, provinceId: 9, province: '湖北省', city: '鄂州市', district: '城区', name: '滨湖南路英山雾珍茶叶店', address: '城区' },
    { id: 566, provinceId: 9, province: '湖北省', city: '鄂州市', district: '城区', name: '寿昌大道文辉茶叶经营部', address: '城区' },

    { id: 567, provinceId: 9, province: '湖北省', city: '荆门市', district: '东宝区', name: '荆门茶叶城', address: '东宝区' },
    { id: 568, provinceId: 9, province: '湖北省', city: '荆门市', district: '掇刀区', name: '通源农贸大市场茶叶专区', address: '掇刀区' },
    { id: 569, provinceId: 9, province: '湖北省', city: '荆门市', district: '沙洋县', name: '沙洋县茶具市场', address: '沙洋县' },

    { id: 570, provinceId: 9, province: '湖北省', city: '孝感市', district: '孝南区', name: '孝感茶叶场', address: '孝南区' },
    { id: 571, provinceId: 9, province: '湖北省', city: '孝感市', district: '孝南区', name: '首衡城·桃花驿农特产品展销中心', address: '孝南区' },
    { id: 572, provinceId: 9, province: '湖北省', city: '孝感市', district: '孝南区', name: '湖北元广商贸有限公司', address: '孝南区' },
    { id: 573, provinceId: 9, province: '湖北省', city: '孝感市', district: '孝南区', name: '胡平茶叶茶具超市', address: '孝南区' },

    { id: 574, provinceId: 9, province: '湖北省', city: '荆州市', district: '荆州区', name: '解放路茶叶市场', address: '荆州区' },
    { id: 575, provinceId: 9, province: '湖北省', city: '荆州市', district: '沙市区', name: '荷花山农贸市场茶叶专区', address: '沙市区' },
    { id: 576, provinceId: 9, province: '湖北省', city: '荆州市', district: '沙市区', name: '丹凤街小商品批发市场', address: '沙市区' },
    { id: 577, provinceId: 9, province: '湖北省', city: '荆州市', district: '荆州区', name: '八岭山茶场', address: '荆州区' },

    { id: 578, provinceId: 9, province: '湖北省', city: '黄冈市', district: '英山县', name: '英山县大别山茶叶广场', address: '英山县' },
    { id: 579, provinceId: 9, province: '湖北省', city: '黄冈市', district: '黄州区', name: '黄冈茶叶场', address: '黄州区' },
    { id: 580, provinceId: 9, province: '湖北省', city: '黄冈市', district: '红安县', name: '红安县老君眉茶场', address: '红安县' },
    { id: 581, provinceId: 9, province: '湖北省', city: '黄冈市', district: '黄州区', name: '黄州区全鑫茶叶经营部', address: '黄州区' },
    { id: 582, provinceId: 9, province: '湖北省', city: '黄冈市', district: '黄州区', name: '一香源茶庄', address: '黄州区' },

    { id: 583, provinceId: 9, province: '湖北省', city: '咸宁市', district: '咸安区', name: '咸宁市茶叶市场', address: '咸安区' },
    { id: 584, provinceId: 9, province: '湖北省', city: '咸宁市', district: '咸安区', name: '中国三亿茶都', address: '咸安区' },
    { id: 585, provinceId: 9, province: '湖北省', city: '咸宁市', district: '咸安区', name: '咸宁茶叶场', address: '咸安区' },
    { id: 586, provinceId: 9, province: '湖北省', city: '咸宁市', district: '赤壁市', name: '羊楼洞古镇茶市', address: '赤壁市' },
    { id: 587, provinceId: 9, province: '湖北省', city: '咸宁市', district: '咸安区', name: '贺胜茶叶大市场', address: '咸安区' },

    { id: 588, provinceId: 9, province: '湖北省', city: '随州市', district: '市区', name: '随州茶叶城', address: '市区' },
    { id: 589, provinceId: 9, province: '湖北省', city: '随州市', district: '曾都区', name: '云峰山茶场', address: '曾都区' },
    { id: 590, provinceId: 9, province: '湖北省', city: '随州市', district: '市区', name: '随州市场', address: '市区' },
    { id: 591, provinceId: 9, province: '湖北省', city: '随州市', district: '随县', name: '云雾山茶场', address: '随县' },
    { id: 592, provinceId: 9, province: '湖北省', city: '随州市', district: '市区', name: '神农茶文化街', address: '市区' },

    { id: 593, provinceId: 9, province: '湖北省', city: '恩施州', district: '恩施市', name: '武陵山茶叶交易中心', address: '恩施市' },
    { id: 594, provinceId: 9, province: '湖北省', city: '恩施州', district: '恩施市', name: '恩施茶港', address: '恩施市' },
    { id: 595, provinceId: 9, province: '湖北省', city: '恩施州', district: '芭蕉侗族乡', name: '芭蕉茶叶鲜叶临时交易市场', address: '芭蕉侗族乡' },
    { id: 596, provinceId: 9, province: '湖北省', city: '恩施州', district: '芭蕉侗族乡', name: '硒都茶城', address: '芭蕉侗族乡' },
    { id: 597, provinceId: 9, province: '湖北省', city: '恩施州', district: '咸丰县', name: '唐崖茶市', address: '咸丰县' },

    { id: 598, provinceId: 9, province: '湖北省', city: '神农架林区', district: '松柏镇', name: '松柏镇中心农贸市场茶叶专区', address: '松柏镇' },
    { id: 599, provinceId: 9, province: '湖北省', city: '神农架林区', district: '跨区合作', name: '襄阳国际旅游茶城（跨区合作）', address: '跨区合作' },
    { id: 600, provinceId: 9, province: '湖北省', city: '神农架林区', district: '跨区合作', name: '宜昌邓村鲜叶交易市场（跨区合作）', address: '跨区合作' },

    // 四川省
    { id: 601, provinceId: 10, province: '四川省', city: '成都市', district: '锦江区', name: '大西南茶城', address: '锦江区' },
    { id: 602, provinceId: 10, province: '四川省', city: '成都市', district: '锦江区', name: '海峡茶城', address: '锦江区' },
    { id: 603, provinceId: 10, province: '四川省', city: '成都市', district: '金牛区', name: '荷花池茶叶批发市场', address: '金牛区' },
    { id: 604, provinceId: 10, province: '四川省', city: '成都市', district: '成华区', name: '二仙桥茶叶市场', address: '成华区' },
    { id: 605, provinceId: 10, province: '四川省', city: '成都市', district: '金牛区', name: '五块石茶叶批发城', address: '金牛区' },
    { id: 606, provinceId: 10, province: '四川省', city: '成都市', district: '锦江区', name: '九眼桥茶叶市场', address: '锦江区' },
    { id: 607, provinceId: 10, province: '四川省', city: '成都市', district: '武侯区', name: '武侯茶博城', address: '武侯区' },

    { id: 608, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '四川绵阳丝绸城茶业场', address: '涪城区' },
    { id: 609, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '四川绵阳国茶城', address: '涪城区' },
    { id: 610, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '西部国际茶城', address: '涪城区' },
    { id: 611, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '四川绵阳翠屿商贸城', address: '涪城区' },
    { id: 612, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '四川绵阳南较场综合市场（茶叶专区）', address: '涪城区' },
    { id: 613, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '剑南批发市场茶叶区', address: '涪城区' },
    { id: 614, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '芭蕉茶叶鲜叶临时交易市场', address: '涪城区' },
    { id: 615, provinceId: 10, province: '四川省', city: '绵阳市', district: '涪城区', name: '硒都茶城（建设中）', address: '涪城区' },

    { id: 616, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '双古镇茶叶交易市场', address: '自流井区' },
    { id: 617, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '四川叙府茶业有限公司（批发点）', address: '自流井区' },
    { id: 618, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '万宝东郊茶厂（专卖店）', address: '自流井区' },
    { id: 619, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '天福茗茶（泰丰店）', address: '自流井区' },
    { id: 620, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '字记普洱茶庄', address: '自流井区' },
    { id: 621, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '聚茗轩茶叶商贸部', address: '自流井区' },
    { id: 622, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '雅安茶叶批发', address: '自流井区' },
    { id: 623, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '天天茶坊茶叶批发铺', address: '自流井区' },
    { id: 624, provinceId: 10, province: '四川省', city: '自贡市', district: '自流井区', name: '沁园春茶行', address: '自流井区' },

    { id: 625, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '五十四批发城', address: '东区' },
    { id: 626, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '百灵山茶叶市场', address: '东区' },
    { id: 627, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '攀枝花普洱茶场', address: '东区' },
    { id: 628, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '展宏茶叶批发商行', address: '东区' },
    { id: 629, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '笮茗润茶叶店', address: '东区' },
    { id: 630, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '四春茶堂', address: '东区' },
    { id: 631, provinceId: 10, province: '四川省', city: '攀枝花市', district: '东区', name: '华山场零散茶区', address: '东区' },
    { id: 632, provinceId: 10, province: '四川省', city: '攀枝花市', district: '仁和区', name: '仁和区同德镇留香茶叶经营部', address: '仁和区' },

    { id: 633, provinceId: 10, province: '四川省', city: '泸州市', district: '江阳区', name: '泸州商贸城茶叶交易区', address: '江阳区' },
    { id: 634, provinceId: 10, province: '四川省', city: '泸州市', district: '江阳区', name: '王氏商城茶叶集群', address: '江阳区' },
    { id: 635, provinceId: 10, province: '四川省', city: '泸州市', district: '江阳区', name: '绍坝茶叶交易市场', address: '江阳区' },
    { id: 636, provinceId: 10, province: '四川省', city: '泸州市', district: '江阳区', name: '规划中茶叶交易市场（一期，在建）', address: '江阳区' },
    { id: 637, provinceId: 10, province: '四川省', city: '泸州市', district: '江阳区', name: '解放东路茶叶场', address: '江阳区' },
    { id: 638, provinceId: 10, province: '四川省', city: '泸州市', district: '泸县', name: '泸县茶叶批发部', address: '泸县' },
    { id: 639, provinceId: 10, province: '四川省', city: '泸州市', district: '合江县', name: '合江临港茶市', address: '合江县' },

    { id: 651, provinceId: 10, province: '四川省', city: '广元市', district: '旺苍县', name: '旺苍黄茶交易区', address: '旺苍县' },
    { id: 652, provinceId: 10, province: '四川省', city: '广元市', district: '利州区', name: '西部大市场（茶叶专区）', address: '利州区' },

    { id: 653, provinceId: 10, province: '四川省', city: '遂宁市', district: '船山区', name: '船山区茶叶批发市场', address: '船山区' },
    { id: 654, provinceId: 10, province: '四川省', city: '遂宁市', district: '船山区', name: '遂宁茶叶批发市场（南河路市场）', address: '船山区' },
    { id: 655, provinceId: 10, province: '四川省', city: '遂宁市', district: '安居区', name: '安居区茶叶批发市场', address: '安居区' },
    { id: 656, provinceId: 10, province: '四川省', city: '遂宁市', district: '船山区', name: '川北茶叶批发市场', address: '船山区' },
    { id: 657, provinceId: 10, province: '四川省', city: '遂宁市', district: '船山区', name: '每晨茶行', address: '船山区' },
    { id: 658, provinceId: 10, province: '四川省', city: '遂宁市', district: '船山区', name: '船山区幽香茶叶经营部', address: '船山区' },
    { id: 659, provinceId: 10, province: '四川省', city: '遂宁市', district: '河东新区', name: '河东新区茶企集群（青衿茶叶经营部、开园茶叶经营部）', address: '河东新区' },
    { id: 660, provinceId: 10, province: '四川省', city: '遂宁市', district: '射洪县', name: '射洪县谢林茶叶批发部', address: '射洪县' },

    { id: 661, provinceId: 10, province: '四川省', city: '内江市', district: '市中区', name: '内江茶城', address: '市中区' },
    { id: 662, provinceId: 10, province: '四川省', city: '内江市', district: '市中区', name: '成才茶叶场', address: '市中区' },
    { id: 663, provinceId: 10, province: '四川省', city: '内江市', district: '市中区', name: '宏兴茶城', address: '市中区' },
    { id: 664, provinceId: 10, province: '四川省', city: '内江市', district: '资中县', name: '资中县闵大海茶叶经营部', address: '资中县' },
    { id: 665, provinceId: 10, province: '四川省', city: '内江市', district: '威远县', name: '威远高山云雾茶业城区经营部', address: '威远县' },
    { id: 666, provinceId: 10, province: '四川省', city: '内江市', district: '市中区', name: '市中区顶心坝茶叶经营部', address: '市中区' },
    { id: 667, provinceId: 10, province: '四川省', city: '内江市', district: '市中区', name: '可口茶行', address: '市中区' },
    { id: 668, provinceId: 10, province: '四川省', city: '内江市', district: '市中区', name: '茶博园', address: '市中区' },
    { id: 669, provinceId: 10, province: '四川省', city: '内江市', district: '东兴区', name: '东兴茶业', address: '东兴区' },

    { id: 670, provinceId: 10, province: '四川省', city: '乐山市', district: '市中区', name: '乐山茶叶市场（屏山路）', address: '市中区' },
    { id: 671, provinceId: 10, province: '四川省', city: '乐山市', district: '峨眉山市', name: '峨眉山大西南茶叶市场（双福镇）', address: '峨眉山市' },
    { id: 672, provinceId: 10, province: '四川省', city: '乐山市', district: '市中区', name: '乐山大佛茶叶市场', address: '市中区' },
    { id: 673, provinceId: 10, province: '四川省', city: '乐山市', district: '市中区', name: '安居区龙达电子商务产业园（茶叶批发）', address: '市中区' },
    { id: 674, provinceId: 10, province: '四川省', city: '乐山市', district: '峨眉山市', name: '峨眉山茶文化博览园', address: '峨眉山市' },
    { id: 675, provinceId: 10, province: '四川省', city: '乐山市', district: '犍为县', name: '犍为茉莉花茶直供点', address: '犍为县' },

    { id: 676, provinceId: 10, province: '四川省', city: '资阳市', district: '雁江区', name: '城北批发市场（茶叶专区）', address: '雁江区' },
    { id: 677, provinceId: 10, province: '四川省', city: '资阳市', district: '雁江区', name: '资阳农副产品场（茶叶交易区）', address: '雁江区' },
    { id: 678, provinceId: 10, province: '四川省', city: '资阳市', district: '乐至县', name: '乐至县茶叶经营部', address: '乐至县' },
    { id: 679, provinceId: 10, province: '四川省', city: '资阳市', district: '安岳县', name: '安岳县茶叶集散点', address: '安岳县' },

    { id: 680, provinceId: 10, province: '四川省', city: '宜宾市', district: '翠屏区', name: '翠屏区茶产业交易市场（金秋湖镇）', address: '翠屏区' },
    { id: 681, provinceId: 10, province: '四川省', city: '宜宾市', district: '高县', name: '高县长江源国际茶贸城', address: '高县' },
    { id: 682, provinceId: 10, province: '四川省', city: '宜宾市', district: '南溪区', name: '宜宾茶市场（南溪区）', address: '南溪区' },
    { id: 683, provinceId: 10, province: '四川省', city: '宜宾市', district: '翠屏区', name: '翠屏区观音茶厂西郊市场经营部', address: '翠屏区' },
    { id: 684, provinceId: 10, province: '四川省', city: '宜宾市', district: '筠连县', name: '筠连县红茶产业带（巡司镇鲜叶市场）', address: '筠连县' },
    { id: 685, provinceId: 10, province: '四川省', city: '宜宾市', district: '翠屏区', name: '金秋湖镇鲜叶交易中心', address: '翠屏区' },

    { id: 686, provinceId: 10, province: '四川省', city: '南充市', district: '顺庆区', name: '南充商贸城茶叶交易区', address: '顺庆区' },
    { id: 687, provinceId: 10, province: '四川省', city: '南充市', district: '顺庆区', name: '果城路茶叶市场', address: '顺庆区' },
    { id: 688, provinceId: 10, province: '四川省', city: '南充市', district: '高坪区', name: '高坪区茶叶场', address: '高坪区' },
    { id: 689, provinceId: 10, province: '四川省', city: '南充市', district: '嘉陵区', name: '嘉陵区茶叶市场（清心阁茶叶店、嘉陵茶叶批发部）', address: '嘉陵区' },
    { id: 690, provinceId: 10, province: '四川省', city: '南充市', district: '顺庆区', name: '顺庆区茶叶贸易中心（茶叶大世界）', address: '顺庆区' },

    { id: 691, provinceId: 10, province: '四川省', city: '达州市', district: '通川区', name: '开州龙珠茶叶批发市场', address: '通川区' },
    { id: 692, provinceId: 10, province: '四川省', city: '达州市', district: '通川区', name: '达州市茶叶场（朝阳路市场）', address: '通川区' },
    { id: 693, provinceId: 10, province: '四川省', city: '达州市', district: '通川区', name: '达州市西外茶叶市场', address: '通川区' },
    { id: 694, provinceId: 10, province: '四川省', city: '达州市', district: '通川区', name: '姑区茶数码场', address: '通川区' },
    { id: 695, provinceId: 10, province: '四川省', city: '达州市', district: '万源市', name: '万源大巴山茶叶交易市场（在建）', address: '万源市' },

    { id: 696, provinceId: 10, province: '四川省', city: '雅安市', district: '名山区', name: '蒙顶山茶叶批发市场（世界茶都）', address: '名山区' },
    { id: 697, provinceId: 10, province: '四川省', city: '雅安市', district: '雨城区', name: '川西茶叶市场', address: '雨城区' },
    { id: 698, provinceId: 10, province: '四川省', city: '雅安市', district: '名山区', name: '红星镇双河茶叶鲜叶交易市场', address: '名山区' },
    { id: 699, provinceId: 10, province: '四川省', city: '雅安市', district: '雨城区', name: '雨城区雅安茶叶场', address: '雨城区' },

    { id: 700, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '广安茶叶场', address: '广安区' },
    { id: 701, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '广安市广安区茶叶大世界', address: '广安区' },
    { id: 702, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '梵鑫茶业发展有限公司（批发点）', address: '广安区' },
    { id: 703, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '城南万家购物知止茶叶商行', address: '广安区' },
    { id: 704, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '友谊茶叶经营部', address: '广安区' },
    { id: 705, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '恒远茶叶经营部', address: '广安区' },
    { id: 706, provinceId: 10, province: '四川省', city: '广安市', district: '广安区', name: '洪川茶叶店', address: '广安区' },

    { id: 707, provinceId: 10, province: '四川省', city: '巴中市', district: '巴州区', name: '光明路茶叶市场', address: '巴州区' },
    { id: 708, provinceId: 10, province: '四川省', city: '巴中市', district: '巴州区', name: '盘兴茶叶交易集散中心（在建）', address: '巴州区' },
    { id: 709, provinceId: 10, province: '四川省', city: '巴中市', district: '巴州区', name: '南池河路茶叶一条街', address: '巴州区' },
    { id: 710, provinceId: 10, province: '四川省', city: '巴中市', district: '巴州区', name: '茗燕茶叶交易中心', address: '巴州区' },
    { id: 711, provinceId: 10, province: '四川省', city: '巴中市', district: '恩阳区', name: '恩阳茶产业三产融合项目（在建）', address: '恩阳区' },
    { id: 712, provinceId: 10, province: '四川省', city: '巴中市', district: '巴州区', name: '鼎山镇光雾村茶叶店', address: '巴州区' },
    { id: 713, provinceId: 10, province: '四川省', city: '巴中市', district: '通江县', name: '通江县蜀珍特产店', address: '通江县' },

    { id: 714, provinceId: 10, province: '四川省', city: '眉山市', district: '洪雅县', name: '中山镇茶叶交易市场（洪雅县）', address: '洪雅县' },

    { id: 715, provinceId: 10, province: '四川省', city: '甘孜藏族自治州', district: '康定市', name: '川西茶叶市场', address: '康定市' },
    { id: 716, provinceId: 10, province: '四川省', city: '甘孜藏族自治州', district: '康定市', name: '康定茶叶批发市场', address: '康定市' },
    { id: 717, provinceId: 10, province: '四川省', city: '甘孜藏族自治州', district: '色达县', name: '色达茶叶批发市场', address: '色达县' },
    { id: 718, provinceId: 10, province: '四川省', city: '甘孜藏族自治州', district: '理塘县', name: '理塘茶叶批发市场', address: '理塘县' },
    { id: 719, provinceId: 10, province: '四川省', city: '甘孜藏族自治州', district: '丹巴县', name: '丹巴红茶专区', address: '丹巴县' },

    { id: 720, provinceId: 10, province: '四川省', city: '阿坝藏族羌族自治州', district: '小金县', name: '岷山茶场茶叶场（小金县）', address: '小金县' },
    { id: 721, provinceId: 10, province: '四川省', city: '阿坝藏族羌族自治州', district: '汶川县', name: '阿坝州漩口茶厂', address: '汶川县' },

    { id: 722, provinceId: 10, province: '四川省', city: '凉山彝族自治州', district: '马边县', name: '马边茶叶交易市场', address: '马边县' },
    { id: 723, provinceId: 10, province: '四川省', city: '凉山彝族自治州', district: '西昌市', name: '黄河商贸（藏茶专卖，西昌市）', address: '西昌市' },
    { id: 724, provinceId: 10, province: '四川省', city: '凉山彝族自治州', district: '西昌市', name: '安河谷茶叶场（规划中）', address: '西昌市' },
    { id: 725, provinceId: 10, province: '四川省', city: '凉山彝族自治州', district: '西昌市', name: '西市茶叶市场', address: '西昌市' },
    { id: 726, provinceId: 10, province: '四川省', city: '凉山彝族自治州', district: '普格县', name: '普格县茶叶摊群', address: '普格县' },

    // 贵州省
    { id: 727, provinceId: 11, province: '贵州省', city: '贵阳市', district: '南明区', name: '太升茶叶专营批发市场', address: '南明区沙坡路' },
    { id: 728, provinceId: 11, province: '贵州省', city: '贵阳市', district: '南明区', name: '花果园金融街普洱茶现货交易所', address: '南明区解放路' },
    { id: 729, provinceId: 11, province: '贵州省', city: '贵阳市', district: '观山湖区', name: '东兴茶叶市场', address: '观山湖区核心商圈' },
    { id: 730, provinceId: 11, province: '贵州省', city: '贵阳市', district: '观山湖区', name: '金阳茶叶交易中心', address: '观山湖区诚信南路' },
    { id: 731, provinceId: 11, province: '贵州省', city: '贵阳市', district: '云岩区', name: '文殊山茶叶市场', address: '云岩区北京路' },
    { id: 732, provinceId: 11, province: '贵州省', city: '贵阳市', district: '云岩区', name: '贵阳茶城', address: '云岩区友爱北路' },
    { id: 733, provinceId: 11, province: '贵州省', city: '贵阳市', district: '跨区', name: '贵州华夏生态交易中心', address: '线上平台+线下支持' },

    { id: 734, provinceId: 11, province: '贵州省', city: '遵义市', district: '湄潭县', name: '中国贵州茶叶交易中心', address: '湄潭县黄家坝' },
    { id: 735, provinceId: 11, province: '贵州省', city: '遵义市', district: '湄潭县', name: '贵州遵义茶叶交易中心（中国茶城）', address: '湄潭县茶城大道' },
    { id: 736, provinceId: 11, province: '贵州省', city: '遵义市', district: '湄潭县', name: '湄潭茶叶交易市场', address: '湄潭县湄江镇' },
    { id: 737, provinceId: 11, province: '贵州省', city: '遵义市', district: '汇川区', name: '遵义国际茶叶城', address: '汇川区人民路' },
    { id: 738, provinceId: 11, province: '贵州省', city: '遵义市', district: '红花岗区', name: '红花岗区茶叶市场', address: '红花岗区' },

    { id: 739, provinceId: 11, province: '贵州省', city: '六盘水市', district: '钟山区', name: '六盘水市茶叶场', address: '钟山区钟山西路' },
    { id: 740, provinceId: 11, province: '贵州省', city: '六盘水市', district: '钟山区', name: '茶叶林综合批发市场', address: '钟山区茶叶林路' },
    { id: 741, provinceId: 11, province: '贵州省', city: '六盘水市', district: '六枝特区', name: '易道茶叶批发销售中心', address: '六枝特区南环路' },

    { id: 742, provinceId: 11, province: '贵州省', city: '安顺市', district: '西秀区', name: '安顺茶城', address: '西秀区北路' },
    { id: 743, provinceId: 11, province: '贵州省', city: '安顺市', district: '西秀区', name: '安顺茶叶场（黄果树大街批发中心）', address: '西秀区黄果树大街' },
    { id: 744, provinceId: 11, province: '贵州省', city: '安顺市', district: '西秀区', name: '银山茶场', address: '西秀区双堡镇' },
    { id: 745, provinceId: 11, province: '贵州省', city: '安顺市', district: '平坝区', name: '平坝区茶叶集散中心', address: '平坝区坝羊镇' },
    { id: 746, provinceId: 11, province: '贵州省', city: '安顺市', district: '西秀区', name: '十二茅坡茶园', address: '西秀区鸡场乡' },
    { id: 747, provinceId: 11, province: '贵州省', city: '安顺市', district: '西秀区', name: '品茗香茶叶批发部', address: '华西街道黑石头村' },

    { id: 748, provinceId: 11, province: '贵州省', city: '铜仁市', district: '石阡县', name: '石阡县茶叶交易中心', address: '石阡县汤山镇' },
    { id: 749, provinceId: 11, province: '贵州省', city: '铜仁市', district: '印江县', name: '印江梵净山茶叶市场', address: '印江县峨岭街道' },
    { id: 750, provinceId: 11, province: '贵州省', city: '铜仁市', district: '碧江区', name: '铜仁国际农商城茶叶专区', address: '碧江区武陵山大道' },
    { id: 751, provinceId: 11, province: '贵州省', city: '铜仁市', district: '碧江区', name: '金滩副食茶叶批发城', address: '碧江区金滩路' },

    { id: 752, provinceId: 11, province: '贵州省', city: '毕节市', district: '纳雍县', name: '贵州雾翠茗香生态农业开发有限公司', address: '纳雍县' },
    { id: 753, provinceId: 11, province: '贵州省', city: '毕节市', district: '纳雍县', name: '贵州纳雍古高红茶业有限公司', address: '纳雍县' },
    { id: 754, provinceId: 11, province: '贵州省', city: '毕节市', district: '纳雍县', name: '沁园春茶场', address: '纳雍县' },
    { id: 755, provinceId: 11, province: '贵州省', city: '毕节市', district: '金沙县', name: '贵州金沙贡茶茶业有限公司', address: '金沙县' },

    { id: 756, provinceId: 11, province: '贵州省', city: '黔西南州', district: '普安县', name: '中国早茶交易中心', address: '普安县茶源街道' },
    { id: 757, provinceId: 11, province: '贵州省', city: '黔西南州', district: '贞丰县', name: '贵州早春扁形绿茶交易市场', address: '贞丰县' },
    { id: 758, provinceId: 11, province: '贵州省', city: '黔西南州', district: '贞丰县', name: '甬黔茶叶交易市场', address: '贞丰县长田镇' },
    { id: 759, provinceId: 11, province: '贵州省', city: '黔西南州', district: '普安县', name: '江西坡镇茶青市场', address: '普安县江西坡镇' },

    { id: 760, provinceId: 11, province: '贵州省', city: '黔东南州', district: '黎平县', name: '城南曙光大道茶叶综合市场', address: '黎平县' },
    { id: 761, provinceId: 11, province: '贵州省', city: '黔东南州', district: '黎平县', name: '侗乡茶城', address: '黎平县德凤街道' },
    { id: 762, provinceId: 11, province: '贵州省', city: '黔东南州', district: '凯里市', name: '州土产公司茶叶门市部', address: '凯里市韶山北路' },
    { id: 763, provinceId: 11, province: '贵州省', city: '黔东南州', district: '凯里市', name: '国际农商城茶叶专区', address: '碧江区武陵山大道' },
    { id: 764, provinceId: 11, province: '贵州省', city: '黔东南州', district: '岑巩县', name: '岑巩县龙兴路茶叶专卖市场', address: '岑巩县' },

    { id: 765, provinceId: 11, province: '贵州省', city: '黔南州', district: '贵定县', name: '云雾镇茶青交易市场', address: '贵定县平伐村' },
    { id: 766, provinceId: 11, province: '贵州省', city: '黔南州', district: '贵定县', name: '摆城村茶青交易市场', address: '贵定县摆城村' },
    { id: 767, provinceId: 11, province: '贵州省', city: '黔南州', district: '贵定县', name: '鸟王村茶青交易市场', address: '贵定县鸟王村' },

    // 安徽省
    { id: 768, provinceId: 12, province: '安徽省', city: '合肥市', district: '包河区', name: '裕丰茶城', address: '包河区' },
    { id: 769, provinceId: 12, province: '安徽省', city: '合肥市', district: '瑶海区', name: '安徽茶城/茶叶场', address: '瑶海区' },
    { id: 770, provinceId: 12, province: '安徽省', city: '合肥市', district: '包河区', name: '巢湖南路茶叶场', address: '包河区' },
    { id: 771, provinceId: 12, province: '安徽省', city: '合肥市', district: '蜀山区', name: '合肥茶叶大世界', address: '蜀山区' },
    { id: 772, provinceId: 12, province: '安徽省', city: '合肥市', district: '庐阳区', name: '庐州茶城', address: '庐阳区' },

    { id: 773, provinceId: 12, province: '安徽省', city: '淮北市', district: '相山区', name: '淮北茶叶场', address: '相山区' },
    { id: 774, provinceId: 12, province: '安徽省', city: '淮北市', district: '相山区', name: '淮北古商城茶叶专区', address: '相山区' },
    { id: 775, provinceId: 12, province: '安徽省', city: '淮北市', district: '相山区', name: '中国供销·淮北农产品批发市场', address: '凤凰山食品工业园' },

    { id: 776, provinceId: 12, province: '安徽省', city: '亳州市', district: '谯城区', name: '亳州茶叶城', address: '谯城区' },
    { id: 777, provinceId: 12, province: '安徽省', city: '亳州市', district: '谯城区', name: '康美城南侧茶叶集散区', address: '谯城区' },
    { id: 778, provinceId: 12, province: '安徽省', city: '亳州市', district: '谯城区', name: '泰昌花茶批发中心', address: '谯城区' },
    { id: 779, provinceId: 12, province: '安徽省', city: '亳州市', district: '谯城区', name: '三联家私广场东侧市场', address: '谯城区' },

    { id: 780, provinceId: 12, province: '安徽省', city: '宿州市', district: '埇桥区', name: '宿州市茶叶专业批发交易中心', address: '埇桥区' },
    { id: 781, provinceId: 12, province: '安徽省', city: '宿州市', district: '埇桥区', name: '宿州茶叶场', address: '埇桥区' },

    { id: 782, provinceId: 12, province: '安徽省', city: '蚌埠市', district: '龙子湖区', name: '凤阳路茶叶批发市场', address: '龙子湖区' },
    { id: 783, provinceId: 12, province: '安徽省', city: '蚌埠市', district: '市区', name: '解放南路茶叶场', address: '市区' },
    { id: 784, provinceId: 12, province: '安徽省', city: '蚌埠市', district: '市区', name: '淮河东路茶叶场', address: '市区东南' },
    { id: 785, provinceId: 12, province: '安徽省', city: '蚌埠市', district: '市区', name: '南皋茶叶市场', address: '公园路' },
    { id: 786, provinceId: 12, province: '安徽省', city: '蚌埠市', district: '市区', name: '魅力国际茶城 & 市民路茶叶市场', address: '市区' },

    { id: 787, provinceId: 12, province: '安徽省', city: '阜阳市', district: '颍泉区', name: '阜阳茶叶市场', address: '颍泉区' },
    { id: 788, provinceId: 12, province: '安徽省', city: '阜阳市', district: '颍泉区', name: '阜阳国际茶城', address: '颍泉区' },
    { id: 789, provinceId: 12, province: '安徽省', city: '阜阳市', district: '颍东区', name: '颍东区茶叶市场集群', address: '插花镇、新乌江镇等' },

    { id: 790, provinceId: 12, province: '安徽省', city: '淮南市', district: '田家庵区', name: '淮南东城市场批发市场', address: '田家庵区' },
    { id: 791, provinceId: 12, province: '安徽省', city: '淮南市', district: '经济开发区', name: '淮南茶叶场', address: '经济开发区' },
    { id: 792, provinceId: 12, province: '安徽省', city: '淮南市', district: '市区', name: '淮南市茶城', address: '市区' },

    { id: 793, provinceId: 12, province: '安徽省', city: '滁州市', district: '南谯区', name: '滁州茶叶批发市场', address: '南谯区' },
    { id: 794, provinceId: 12, province: '安徽省', city: '滁州市', district: '琅琊区', name: '滁州茶叶城', address: '琅琊区' },
    { id: 795, provinceId: 12, province: '安徽省', city: '滁州市', district: '凤阳县', name: '江南第一茶市', address: '凤阳县' },

    { id: 796, provinceId: 12, province: '安徽省', city: '六安市', district: '裕安区', name: '六安国际光彩茶叶大市场', address: '裕安区' },
    { id: 797, provinceId: 12, province: '安徽省', city: '六安市', district: '裕安区', name: '裕安区苏埠茶叶市场', address: '苏埠镇' },
    { id: 798, provinceId: 12, province: '安徽省', city: '六安市', district: '市区', name: '健康路茶叶市场', address: '市区' },

    { id: 799, provinceId: 12, province: '安徽省', city: '马鞍山市', district: '市区', name: '香山茶叶市场', address: '香山路' },
    { id: 800, provinceId: 12, province: '安徽省', city: '马鞍山市', district: '市区', name: '马尾茶叶市场', address: '马尾镇' },
    { id: 801, provinceId: 12, province: '安徽省', city: '马鞍山市', district: '市区', name: '福州茶叶市场', address: '福州街道' },

    { id: 802, provinceId: 12, province: '安徽省', city: '芜湖市', district: '三山区', name: '峨桥茶叶批发市场/江南第一茶市', address: '三山区' },
    { id: 803, provinceId: 12, province: '安徽省', city: '芜湖市', district: '弋江区', name: '芜湖瑞丰国际茶博城', address: '弋江区' },
    { id: 804, provinceId: 12, province: '安徽省', city: '芜湖市', district: '鸠江区', name: '鸠江区茶叶集散区', address: '鸠江区' },

    { id: 805, provinceId: 12, province: '安徽省', city: '铜陵市', district: '市区', name: '天山茶叶市场', address: '狮子山风景区' },
    { id: 806, provinceId: 12, province: '安徽省', city: '铜陵市', district: '市区', name: '铜陵茶城', address: '运河北路' },
    { id: 807, provinceId: 12, province: '安徽省', city: '铜陵市', district: '市区', name: '南市茶叶市场', address: '市区南门' },

    { id: 815, provinceId: 12, province: '安徽省', city: '安庆市', district: '岳西县', name: '金翠兰广场茶叶一条街', address: '岳西县' },
    { id: 816, provinceId: 12, province: '安徽省', city: '安庆市', district: '迎江区', name: '安庆茶叶大市场', address: '迎江区' },
    { id: 817, provinceId: 12, province: '安徽省', city: '安庆市', district: '迎江区', name: '光彩大市场茶叶专区', address: '迎江区' },
    { id: 818, provinceId: 12, province: '安徽省', city: '安庆市', district: '市区', name: '安徽茶城茶叶场', address: '庐阳镇' },

    { id: 819, provinceId: 12, province: '安徽省', city: '黄山市', district: '屯溪区', name: '黄山茶城', address: '屯溪区' },
    { id: 820, provinceId: 12, province: '安徽省', city: '黄山市', district: '歙县', name: '歙县大华农贸城茶叶交易市场', address: '歙县' },
    { id: 821, provinceId: 12, province: '安徽省', city: '黄山市', district: '屯溪区', name: '屯溪茶叶市场', address: '屯溪区' },
    { id: 822, provinceId: 12, province: '安徽省', city: '黄山市', district: '黄山区', name: '黄山太平土特产市场', address: '黄山区' },

    // 河南省
    { id: 114, provinceId: 13, province: '河南省', city: '郑州市', district: '惠济区', name: '郑州北环茶叶交易中心（中原茶都）', address: '惠济区南阳路与北四环交叉口' },
    { id: 115, provinceId: 13, province: '河南省', city: '郑州市', district: '管城区', name: '航海路茶叶批发市场（南茶城）', address: '管城区航海路107号' },
    { id: 116, provinceId: 13, province: '河南省', city: '郑州市', district: '郑东新区', name: '郑州国际茶城', address: '郑东新区（近多条高速出入口）' },
    { id: 117, provinceId: 13, province: '河南省', city: '郑州市', district: '管城区', name: '国香茶城', address: '管城区文德路与鼎盛街交会处' },
    { id: 118, provinceId: 13, province: '河南省', city: '郑州市', district: '中原区', name: '陇海茶城', address: '中原区陇海路与康复路交叉口' },
    { id: 119, provinceId: 13, province: '河南省', city: '郑州市', district: '中原区', name: '亚星茶城', address: '中原区中原西路' },

    { id: 120, provinceId: 13, province: '河南省', city: '洛阳市', district: '王城区', name: '洛阳茶都', address: '王城大道与健康西路交叉口' },
    { id: 155, provinceId: 13, province: '河南省', city: '洛阳市', district: '西工区', name: '宝龙茶叶市场', address: '西工区北京路宝龙城附近' },
    { id: 122, provinceId: 13, province: '河南省', city: '洛阳市', district: '老城区', name: '春都路茶叶专卖总市场', address: '老城区春都路53号' },
    { id: 123, provinceId: 13, province: '河南省', city: '洛阳市', district: '西工区', name: '纱西茶叶场', address: '西工区纱厂西路87号' },
    { id: 124, provinceId: 13, province: '河南省', city: '洛阳市', district: '西工区', name: '牡丹家居广场茶叶市场', address: '西工区宫隅路（近嘉豫门大街）' },
    { id: 125, provinceId: 13, province: '河南省', city: '洛阳市', district: '西工区', name: '宫中路茶叶市场', address: '西工区宫中路45号A区17号' },

    { id: 126, provinceId: 13, province: '河南省', city: '开封市', district: '顺河回族区', name: '开封茶城（中原第一茶市）', address: '顺河回族区商都路70号' },
    { id: 127, provinceId: 13, province: '河南省', city: '开封市', district: '龙亭区', name: '开封市普洱茶交易市场', address: '龙亭区明伦路特1号' },
    { id: 128, provinceId: 13, province: '河南省', city: '开封市', district: '鼓楼区', name: '汴京茶叶市场', address: '市中心鼓楼区' },

    { id: 129, provinceId: 13, province: '河南省', city: '平顶山市', district: '新华区', name: '新华区茶叶专业交易市场', address: '开源路与文化宫路交叉口' },
    { id: 130, provinceId: 13, province: '河南省', city: '平顶山市', district: '新华区', name: '平顶山国际茶城', address: '新华区平博大道与泰山路交叉口' },
    { id: 131, provinceId: 13, province: '河南省', city: '平顶山市', district: '卫东区', name: '卫东区建设路茶叶市场', address: '建设路东段（近花卉路）' },
    { id: 132, provinceId: 13, province: '河南省', city: '平顶山市', district: '新华区', name: '鹰城茶叶市场', address: '新华区鹰城路' },
    { id: 133, provinceId: 13, province: '河南省', city: '平顶山市', district: '东区', name: '开源茶叶市场', address: '东区开源路' },
    { id: 134, provinceId: 13, province: '河南省', city: '平顶山市', district: '湖滨区', name: '金茶花交易市场', address: '湖滨区龙脊街与108国道交叉口' },

    { id: 135, provinceId: 13, province: '河南省', city: '安阳市', district: '高新区', name: '高新区乾和祥古玩茶叶市场', address: '高新区文峰大道与东风路交叉口' },
    { id: 136, provinceId: 13, province: '河南省', city: '安阳市', district: '文峰区', name: '安阳茶业茶具批发城', address: '文峰大道与东工路交叉口西230米' },
    { id: 137, provinceId: 13, province: '河南省', city: '安阳市', district: '文峰区', name: '豫北茶城', address: '文峰区灯塔路与东工路交叉口' },
    { id: 138, provinceId: 13, province: '河南省', city: '安阳市', district: '城区', name: '丁茶叶市场', address: '安阳市城区中心' },

    { id: 139, provinceId: 13, province: '河南省', city: '鹤壁市', district: '鹤山区', name: '鹤壁茶城', address: '鹤山区富村路20号' },
    { id: 140, provinceId: 13, province: '河南省', city: '鹤壁市', district: '淇滨区', name: '茶都', address: '淇滨区鹤山南路' },
    { id: 141, provinceId: 13, province: '河南省', city: '鹤壁市', district: '淇滨区', name: '四季青文化广场茶叶区', address: '淇滨区九州路四季青文化广场' },

    { id: 142, provinceId: 13, province: '河南省', city: '新乡市', district: '金水区', name: '新乡茶叶市场', address: '金水区文化路与文化宫路交叉口' },
    { id: 143, provinceId: 13, province: '河南省', city: '新乡市', district: '市区', name: '茶文化步行街', address: '市区主干道沿线（文化路辐射范围）' },

    { id: 144, provinceId: 13, province: '河南省', city: '焦作市', district: '解放区', name: '焦作茶叶批发市场（温州商贸城）', address: '解放区丰收路与普济路交汇处' },

    { id: 145, provinceId: 13, province: '河南省', city: '濮阳市', district: '华龙区', name: '濮阳市茶叶场', address: '华龙区黄河路与京开大道交叉口' },
    { id: 146, provinceId: 13, province: '河南省', city: '濮阳市', district: '华龙区', name: '胜利东路中原茶叶批发城', address: '京开路与胜利东路交叉口东100米' },

    { id: 147, provinceId: 13, province: '河南省', city: '许昌市', district: '建安区', name: '许昌茶城', address: '建安区邓庄乡（城南商贸物流园东侧）' },
    { id: 148, provinceId: 13, province: '河南省', city: '许昌市', district: '魏都区', name: '鹿鸣湖茶叶市场', address: '魏都区学院北路奥体花城' },
    { id: 149, provinceId: 13, province: '河南省', city: '许昌市', district: '魏都区', name: '五洲茶城', address: '魏都区延安路33栋二楼' },
    { id: 150, provinceId: 13, province: '河南省', city: '许昌市', district: '东城区', name: '汇丰茶叶市场', address: '东城区邓庄乡汇丰市场B区' },

    { id: 151, provinceId: 13, province: '河南省', city: '三门峡市', district: '湖滨区', name: '三门峡义乌商贸城茶叶区', address: '湖滨区B座一层西茶叶区' },
    { id: 152, provinceId: 13, province: '河南省', city: '三门峡市', district: '湖滨区', name: '黄河路茶叶聚集带', address: '湖滨区黄河路与经一路交叉口' },

    { id: 153, provinceId: 13, province: '河南省', city: '漯河市', district: '源汇区', name: '源汇区柳江东路茶叶批发市场', address: '源汇区柳江路（近五一路、文化路）' },
    { id: 154, provinceId: 13, province: '河南省', city: '漯河市', district: '郾城区', name: '郾城区食品批发交易市场', address: '郾城区淞江路' },

    { id: 155, provinceId: 13, province: '河南省', city: '南阳市', district: '卧龙区', name: '刘庄农贸（茶叶）市场', address: '卧龙区车站北路' },
    { id: 156, provinceId: 13, province: '河南省', city: '南阳市', district: '卧龙区', name: '南阳茶城', address: '卧龙区文峰西路' },
    { id: 157, provinceId: 13, province: '河南省', city: '南阳市', district: '华山区', name: '华山路农贸市场（枣林茶城）', address: '华山路与长江中路交叉口' },
    { id: 158, provinceId: 13, province: '河南省', city: '南阳市', district: '市中心', name: '南大街茶叶市场', address: '市中心南大街' },
    { id: 159, provinceId: 13, province: '河南省', city: '南阳市', district: '市中心', name: '文化路茶叶市场', address: '文化路' },
    { id: 160, provinceId: 13, province: '河南省', city: '南阳市', district: '卧龙区', name: '卧龙茶都', address: '长江路高端专卖店集群' },

    { id: 161, provinceId: 13, province: '河南省', city: '商丘市', district: '梁园区', name: '商丘茶叶批发城', address: '长江路与凯旋路交叉口' },
    { id: 162, provinceId: 13, province: '河南省', city: '商丘市', district: '梁园区', name: '玉森茶城', address: '梁园区长征路与八一西路交叉口' },

    { id: 163, provinceId: 13, province: '河南省', city: '信阳市', district: '浉河区', name: '浉河港茶叶交易市场', address: '浉河区浉河港镇' },
    { id: 164, provinceId: 13, province: '河南省', city: '信阳市', district: '浉河区', name: '董家河茶叶交易市场', address: '浉河区董家河镇' },
    { id: 165, provinceId: 13, province: '河南省', city: '信阳市', district: '羊山新区', name: '信阳国际茶城', address: '羊山新区北环路中段' },
    { id: 166, provinceId: 13, province: '河南省', city: '信阳市', district: '浉河区', name: '信阳茶城', address: '浉河区茶韵大道' },
    { id: 167, provinceId: 13, province: '河南省', city: '信阳市', district: '平桥区', name: '平桥路口茶叶市场', address: '平桥区中心' },
    { id: 168, provinceId: 13, province: '河南省', city: '信阳市', district: '浉河区', name: '成功花园茶叶市场', address: '浉河区东关对面' },
    { id: 169, provinceId: 13, province: '河南省', city: '信阳市', district: '浉河区', name: '东双河茶叶市场', address: '浉河区107国道旁' },
    { id: 170, provinceId: 13, province: '河南省', city: '信阳市', district: '浉河区', name: '谭家河茶叶市场', address: '省道224沿线' },

    { id: 171, provinceId: 13, province: '河南省', city: '周口市', district: '川汇区', name: '周口茶叶场', address: '川汇区中原路与建设路交叉口' },
    { id: 172, provinceId: 13, province: '河南省', city: '周口市', district: '西环路', name: '西环路茶叶商贸区', address: '西环路商贸区' },
    { id: 173, provinceId: 13, province: '河南省', city: '周口市', district: '七一路', name: '七一路茶叶街', address: '文明路北段（七一路与交通路之间）' },

    { id: 174, provinceId: 13, province: '河南省', city: '驻马店市', district: '驿城区', name: '驻马店市茶叶市场（天中茶叶城）', address: '驿城区泰山路与金山路交叉口' },
    { id: 175, provinceId: 13, province: '河南省', city: '驻马店市', district: '驿城区', name: '天中山大道茶叶市场', address: '驿城区天中山大道与天顺路交叉口' },

    { id: 176, provinceId: 13, province: '河南省', city: '济源市', district: '北环路', name: '西环农贸批发市场（规划中）', address: '北环路与龙源路交叉口（预计2026年建成）' },

    // 河北省
    { id: 156, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '华夏1号茶叶批发市场', address: '桥西区' },
    { id: 122, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '佳农茶叶市场', address: '桥西区' },
    { id: 123, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '金正茶叶市场', address: '桥西区' },
    { id: 124, provinceId: 14, province: '河北省', city: '石家庄市', district: '桥西区', name: '友谊北大街茶叶批发市场', address: '桥西区' },

    { id: 125, provinceId: 14, province: '河北省', city: '唐山市', district: '路南区', name: '唐山天道茶城', address: '路南区' },
    { id: 126, provinceId: 14, province: '河北省', city: '唐山市', district: '路南区', name: '凤凰山茶叶市场', address: '路南区' },
    { id: 127, provinceId: 14, province: '河北省', city: '唐山市', district: '路南区', name: '南湖茶叶市场', address: '路南区' },

    // 湖南省
    { id: 128, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '神农茶都', address: '雨花区' },
    { id: 129, provinceId: 15, province: '湖南省', city: '长沙市', district: '雨花区', name: '高桥大市场茶叶城', address: '雨花区' },
    { id: 130, provinceId: 15, province: '湖南省', city: '长沙市', district: '开福区', name: '长沙火车站茶城', address: '开福区' },
    { id: 131, provinceId: 15, province: '湖南省', city: '长沙市', district: '芙蓉区', name: '马王堆茶叶场', address: '芙蓉区' },
    { id: 132, provinceId: 15, province: '湖南省', city: '长沙市', district: '天心区', name: '天心茶城', address: '天心区' },

    { id: 133, provinceId: 15, province: '湖南省', city: '株洲市', district: '河西区', name: '天同茶城', address: '河西区' },
    { id: 134, provinceId: 15, province: '湖南省', city: '株洲市', district: '荷塘区', name: '株洲茶叶市场', address: '荷塘区大坪路' },
    { id: 135, provinceId: 15, province: '湖南省', city: '株洲市', district: '市中心', name: '株洲市白市场', address: '市中心' },

    // 山西省
    { id: 136, provinceId: 16, province: '山西省', city: '太原市', district: '小店区', name: '山西马连道茶城', address: '小店区' },
    { id: 137, provinceId: 16, province: '山西省', city: '太原市', district: '小店区', name: '太原茶叶场（南宫市场）', address: '小店区' },
    { id: 138, provinceId: 16, province: '山西省', city: '太原市', district: '小店区', name: '太原茶叶茶具场', address: '小店区' },
    { id: 139, provinceId: 16, province: '山西省', city: '太原市', district: '万柏林区', name: '和平茶城', address: '万柏林区' },
    { id: 140, provinceId: 16, province: '山西省', city: '太原市', district: '万柏林区', name: '太原中奥茶城', address: '万柏林区' },

    { id: 141, provinceId: 16, province: '山西省', city: '大同市', district: '平城区', name: '东信广场茶叶一条街（东信茶叶批零市场）', address: '平城区' },
    { id: 142, provinceId: 16, province: '山西省', city: '大同市', district: '平城区', name: '南方茶城', address: '平城区' },
    { id: 143, provinceId: 16, province: '山西省', city: '大同市', district: '平城区', name: '云中商城茶业集群', address: '平城区' },

    // 重庆市
    { id: 144, provinceId: 17, province: '重庆市', city: '重庆市', district: '江北区', name: '盘溪茶叶批发市场', address: '江北区' },
    { id: 145, provinceId: 17, province: '重庆市', city: '重庆市', district: '江北区', name: '重庆市茶叶专业批发市场', address: '江北区' },
    { id: 146, provinceId: 17, province: '重庆市', city: '重庆市', district: '江北区', name: '绿地寸滩茶叶市场', address: '江北区' },
    { id: 147, provinceId: 17, province: '重庆市', city: '重庆市', district: '南岸区', name: '茶博城', address: '南岸区' },
    { id: 148, provinceId: 17, province: '重庆市', city: '重庆市', district: '南岸区', name: '南滨茶叶市场', address: '南岸区' },

    // 天津市
    { id: 149, provinceId: 18, province: '天津市', city: '天津市', district: '河西区', name: '珠江道茶叶交易批发市场', address: '河西区珠江道64号' },
    { id: 150, provinceId: 18, province: '天津市', city: '天津市', district: '河西区', name: '河西茶城', address: '河西区解放南路珠江道58号' },
    { id: 151, provinceId: 18, province: '天津市', city: '天津市', district: '河西区', name: '茗都茶城', address: '河西区珠江道商圈' },
    { id: 152, provinceId: 18, province: '天津市', city: '天津市', district: '河东区', name: '天津一商茶叶交易中心（河东店）', address: '河东区津塘路23号' },

    // 上海市
    { id: 153, provinceId: 19, province: '上海市', city: '上海市', district: '静安区', name: '帝芙特国际茶文化广场', address: '静安区' },
    { id: 154, provinceId: 19, province: '上海市', city: '上海市', district: '静安区', name: '大宁国际茶城', address: '静安区' },
    { id: 155, provinceId: 19, province: '上海市', city: '上海市', district: '静安区', name: '大统路茶叶批发市场', address: '静安区' },
    { id: 156, provinceId: 19, province: '上海市', city: '上海市', district: '浦东新区', name: '恒大茶叶市场', address: '浦东新区' },
    { id: 157, provinceId: 19, province: '上海市', city: '上海市', district: '浦东新区', name: '金桥国际茶城', address: '浦东新区' },

    // 陕西省
    { id: 158, provinceId: 20, province: '陕西省', city: '西安市', district: '新城区', name: '西安茶叶场（西北茶城）', address: '新城区' },
    { id: 159, provinceId: 20, province: '陕西省', city: '西安市', district: '新城区', name: '金康路茶叶一条街', address: '新城区' },
    { id: 160, provinceId: 20, province: '陕西省', city: '西安市', district: '雁塔区', name: '西安轻工茶叶批发市场（西部茶城）', address: '雁塔区' },
    { id: 161, provinceId: 20, province: '陕西省', city: '西安市', district: '未央区', name: '西北茶城（西郊茶叶场）', address: '未央区' },
    { id: 162, provinceId: 20, province: '陕西省', city: '西安市', district: '曲江新区', name: '大唐茶城', address: '曲江新区' },

    { id: 163, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '陈仓区', name: '宝鸡茶叶场', address: '陈仓区' },
    { id: 164, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '金台区', name: '宝鸡茶叶交易市场', address: '金台区' },
    { id: 165, provinceId: 20, province: '陕西省', city: '宝鸡市', district: '渭滨区', name: '宝鸡茶叶城', address: '渭滨区' },

    // 辽宁省
    { id: 166, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '沈河区', name: '沈阳茶城', address: '沈河区' },
    { id: 167, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '沈河区', name: '中街茶城', address: '沈河区' },
    { id: 168, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '沈河区', name: '沈阳北站茶叶市场', address: '沈河区' },
    { id: 169, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '大东区', name: '北方茶城', address: '大东区' },
    { id: 170, provinceId: 21, province: '辽宁省', city: '沈阳市', district: '铁西区', name: '沈阳茶叶城', address: '铁西区' },

    { id: 171, provinceId: 21, province: '辽宁省', city: '大连市', district: '中山区', name: '大连金玛茶城', address: '中山区' },
    { id: 172, provinceId: 21, province: '辽宁省', city: '大连市', district: '中山区', name: '大连茶叶场', address: '中山区' },
    { id: 173, provinceId: 21, province: '辽宁省', city: '大连市', district: '中山区', name: '万茶叶市场', address: '中山区' },
    { id: 174, provinceId: 21, province: '辽宁省', city: '大连市', district: '沙河口区', name: '大连金三角茶城', address: '沙河口区' },

    // 黑龙江省
    { id: 175, provinceId: 22, province: '黑龙江省', city: '哈尔滨市', district: '哈西新区', name: '壹品茶城', address: '哈西新区' },
    { id: 176, provinceId: 22, province: '黑龙江省', city: '哈尔滨市', district: '南岗区', name: '福顺茶叶场', address: '南岗区' },
    { id: 177, provinceId: 22, province: '黑龙江省', city: '哈尔滨市', district: '道里区', name: '博发茶叶场', address: '道里区' },
    { id: 178, provinceId: 22, province: '黑龙江省', city: '哈尔滨市', district: '道外区', name: '南极街68号食品批发集散地', address: '道外区' },
    { id: 179, provinceId: 22, province: '黑龙江省', city: '哈尔滨市', district: '松北区', name: '松北区茶叶市场', address: '松北区' },

    { id: 180, provinceId: 22, province: '黑龙江省', city: '齐齐哈尔市', district: '龙沙区', name: '老卜奎茶城', address: '龙沙区' },
    { id: 181, provinceId: 22, province: '黑龙江省', city: '齐齐哈尔市', district: '龙沙区', name: '龙沙茶叶市场（商贸广场）', address: '龙沙区' },
    { id: 182, provinceId: 22, province: '黑龙江省', city: '齐齐哈尔市', district: '铁锋区', name: '龙沙茶叶市场（中东小区）', address: '铁锋区' },

    // 吉林省
    { id: 183, provinceId: 23, province: '吉林省', city: '长春市', district: '南关区', name: '东北亚茶叶场', address: '南关区' },
    { id: 184, provinceId: 23, province: '吉林省', city: '长春市', district: '朝阳区', name: '长春茶叶大世界', address: '朝阳区' },
    { id: 185, provinceId: 23, province: '吉林省', city: '长春市', district: '朝阳区', name: '吉福国际茶城', address: '朝阳区' },
    { id: 186, provinceId: 23, province: '吉林省', city: '长春市', district: '宽城区', name: '鲁班路茶叶场', address: '宽城区' },
    { id: 187, provinceId: 23, province: '吉林省', city: '长春市', district: '宽城区', name: '动力城茶城', address: '宽城区' },

    { id: 188, provinceId: 23, province: '吉林省', city: '吉林市', district: '船营区', name: '吉林市茶叶场', address: '船营区' },
    { id: 189, provinceId: 23, province: '吉林省', city: '吉林市', district: '船营区', name: '吉东北地区茶叶交易中心', address: '船营区' },
    { id: 190, provinceId: 23, province: '吉林省', city: '吉林市', district: '昌邑区', name: '天津街批发市场', address: '昌邑区' }
  ],

  // 获取所有省份
  getProvinces() {
    return this.provinces
  },

  // 根据省份ID获取市场列表
  getMarketsByProvince(provinceId) {
    return this.markets.filter(market => market.provinceId === provinceId)
  },

  // 根据城市名称获取市场列表
  getMarketsByCity(cityName) {
    return this.markets.filter(market => market.city === cityName)
  },

  // 搜索市场
  searchMarkets(keyword) {
    return this.markets.filter(market => 
      market.name.includes(keyword) || 
      market.city.includes(keyword) || 
      market.district.includes(keyword)
    )
  },

  // 获取市场总数
  getTotalMarketCount() {
    return this.markets.length
  },

  // 获取省份总数
  getTotalProvinceCount() {
    return this.provinces.length
  },

  // 按区县分组获取市场数据
  getMarketsByProvinceGrouped(provinceId) {
    const markets = this.markets.filter(market => market.provinceId === provinceId)
    
    // 按城市和区县分组
    const grouped = {}
    
    markets.forEach(market => {
      const cityKey = market.city
      if (!grouped[cityKey]) {
        grouped[cityKey] = {}
      }
      
      const districtKey = market.district
      if (!grouped[cityKey][districtKey]) {
        grouped[cityKey][districtKey] = []
      }
      
      grouped[cityKey][districtKey].push(market)
    })
    
    // 转换为数组格式，便于前端渲染
    const result = []
    Object.keys(grouped).forEach(city => {
      const cityData = {
        city: city,
        districts: []
      }
      
      Object.keys(grouped[city]).forEach(district => {
        cityData.districts.push({
          district: district,
          markets: grouped[city][district]
        })
      })
      
      result.push(cityData)
    })
    
    return result
  },

  // 获取省份统计信息
  getProvinceStats(provinceId) {
    const markets = this.markets.filter(market => market.provinceId === provinceId)
    const cities = [...new Set(markets.map(market => market.city))]
    const districts = [...new Set(markets.map(market => market.district))]
    
    return {
      totalMarkets: markets.length,
      totalCities: cities.length,
      totalDistricts: districts.length,
      cities: cities,
      districts: districts
    }
  }
}

module.exports = teaMarketData 