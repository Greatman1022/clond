module.exports = function () {
  var faker = require("faker")
  faker.locale = "zh_CN"
  var _ = require("lodash")
  return {
    people: _.times(100, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar()
      }
    }),
    commerce: _.times(100, function (n) {
      return {
        id: n,
        department: faker.commerce.department(),
        productName: faker.commerce.productName(),
        price: faker.commerce.price(),
        productAdjective: faker.commerce.productAdjective(),
        productMaterial: faker.commerce.productMaterial()
      }
    }),
    protype: _.merge({
      scene: ['全部', '促销活动', '企业介绍', '数据报告', '电商商城', '产品推广', '通用'],
      industry: ['全部', '政府/机构', '教育/培训', '餐饮/美食', '旅游/健身', '金融证券', '文化/艺术', '丽人/珠宝', '酒店/娱乐', '其他']
    }),
    prolist: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          imgs: faker.image.avatar(),
          tit: faker.name.title(),
          price: faker.commerce.price()
        }
      })
    }),
    goodsTypeList: _.times(3, function (n) {
      return {
        id: n,
        name: faker.name.jobType()
      }
    }),
    goodsList: _.times(18, function (n) {
      return {
        id: n,
        pid: n % 3,
        imgsrc: faker.image.avatar(),
        gname: faker.name.title(),
        price: faker.commerce.price(),
        stock: faker.random.number(),
        salevol: faker.random.number()
      }
    }),
    userOptions: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          value: '',
          isDisabled: false,
          nikename: faker.internet.userName(),
          name: faker.name.findName(),
          tel: faker.phone.phoneNumber(),
          address: faker.address.streetName(),
          time: faker.date.past(),
          total: faker.random.number(),
          /* groups: _.times(5, function (m) {
            return {
              value: "选项"+m,
              label: faker.name.jobArea
            }
          }) */
          groups: faker.random.arrayElement(['未分组', '分组一', '分组二', '分组三', '分组四'])
        }
      })
    }),
    miniList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          img: faker.image.fashion(),
          url: faker.internet.url(),
          editUrl: faker.internet.url(),
          endTime: faker.date.past(),
          type: faker.random.number({
            'min': 1,
            'max': 2
          })
        }
      })
    }),
    acDetailList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          adate: faker.date.past(),
          binding: faker.random.arrayElement(['', '一键购']),
          tit: faker.name.findName(),
          dealstatus: faker.random.number({
            'min': 1,
            'max': 3
          }),
          monetary: faker.finance.amount()
        }
      })
    }),
    acManageList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          companyname: faker.random.arrayElement(['', '宁波微动天下信息科技有限公司', '宁波微动天下', '微动']),
          appletname: faker.random.arrayElement(['小程序-教育版', '小程序-基础版', '小程序-发布版']),
          duetime: faker.date.past(),
          telephone: faker.phone.phoneNumberFormat(),
          remark: faker.random.arrayElement(['', '宁波电商公司', '北京电商公司', '南京电商公司']),
          isSet: faker.random.number({
            'min': 0,
            'max': 1
          }),
        }
      })
    }),
    acResourceList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          tel: faker.phone.phoneNumberFormat(),
          date: faker.date.past(),
          area: faker.address.state() + ' - ' + faker.address.city(),
          appletname: '小程序-教育版'
        }
      })
    }),
    agentList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          tel: faker.phone.phoneNumberFormat(),
          date: faker.date.past(),
          address: faker.address.state() + ' - ' + faker.address.city(),
          name: faker.name.findName(),
          price: faker.commerce.price(),
          discount: faker.random.number({
            'min': 1,
            'max': 10
          }),
          telephone: faker.phone.phoneNumber(),
          state: faker.random.number({
            'min': 0,
            'max': 1
          }),
        }
      })
    }),
    financialFlowList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: n,
          code: faker.finance.account(),
          date: faker.date.past(),
          type: '代理商',
          record: '购买小程序教育版',
          deal: -5800,
          balance: faker.commerce.price(),
        }
      })
    }),
    orderList: _.merge({
      page: '',
      pages: 5,
      data: _.times(10, function (n) {
        return {
          id: faker.finance.account(),
          number: faker.random.number({
            'min': 10,
            'max': 100
          }),
          orderedtime: faker.date.past(),
          deliverytime: faker.date.past(),
          express: '顺丰',
          tracking: faker.finance.account(),
          orderstatus: '已发货',
          orderamount: faker.finance.account(),
          showdetail: false,
        }
      })
    }),
    provinceList: _.merge({
      page: '',
      pages: 5,
      data: _.times(20, function (n) {
        return {
          id: n,
          value: n,
          label: faker.address.state()
        }
      })
    }),
    cityList: _.merge({
      page: '',
      pages: 5,
      data: _.times(20, function (n) {
        return {
          id: n,
          value: n,
          label: faker.address.city()
        }
      })
    }),
    districtList: _.merge({
      page: '',
      pages: 5,
      data: _.times(20, function (n) {
        return {
          id: n,
          value: n,
          label: faker.address.citySuffix()
        }
      })
    }),
    codeList: _.merge({
      page: '',
      pages: 5,
      data: _.times(12, function (n) {
        return {
          id: n,
          title: '商品详情一',
          desc: '绑定商品：日本代购速抢洗购速抢洗购速抢洗...',
          goodsimg: 'assets/images/test/cm_img1.jpg',
          qrimg: 'assets/images/test/qrcode.jpg'
        }
      })
    }),
  }
}