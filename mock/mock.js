import Mock from 'mockjs';

export default {
  mockData () {
    Mock.mock('/api/clist', {
      "code": "000",
      "datas": {
        "hits": [
          {
          "id": "@increment",
          "imgs": "@image"
          }
        ],
        "size":10,
        "page": 1,
        "pages": 5,
        "total": 3
      }
    });
    Mock.mock('/api/getTable', {
      "code": "000",
      "datas|5-20": [
        {
          "date": '@date("yyyy-MM-dd")',
          "name": "@cname",
          "address": "@county(true)",
          "image": "@image"
        }
      ]
    });
    Mock.mock('/api/getOptions', {
      "code": "000",
      "datas|5-7": [
        {
          "label": '广东省',
          "value": "@natural(10, 100)",
          "children|5-8": [
            {
              "label": '深圳市',
              "value": "@natural(10, 100)",
              "children|5-5": [
                {
                  "label": '南山区',
                  "value": "@natural(10, 100)"
                }
              ]
            }
          ]
        }
      ],
      "places|9-18": [
        {
          "label": '广东省',
          "value": "@natural(10, 100)"
        }
      ]
    });
  }
};