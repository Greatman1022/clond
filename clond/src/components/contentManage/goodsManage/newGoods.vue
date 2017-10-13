<template>
  <div class='newgoods'>
    <div class='bc_block'>
      <h2>新增商品<button @click='toIndex'>返回上层</button></h2>
      <div class='ng_item'>
        <span class='item_l'><i class='dredColor'>*</i>商品名称：</span>
        <label>
          <input type='text' name='goodname' v-model='goodsform.name' placeholder='请输入商品名称'/>
        </label>
      </div>
      <div class='ng_item'>
        <span class='item_l'><i class='dredColor'>*</i>商品类别：</span>
        <label>
          <el-select v-model='catalog' class='cm_select' placeholder='请选择' @change='changeCatalog'>
            <el-option
              v-for='(item, index) in catalogList'
              :key='item.id'
              :label='item.name'
              :value='item'>
            </el-option>
          </el-select>
        </label>
      </div>
      <div class='ng_item'>
        <span class='item_l pic_l'><i class='dredColor'>*</i>商品图片：</span>
        <div class='item_r picload'>
          <p class='ptip'>建议上传尺寸为640*640像素，最小尺寸不能低于320*320像素，上传图片标准规格为正方形。</p>
          <el-upload
            action='https://jsonplaceholder.typicode.com/posts/'
            list-type='picture-card'
            :on-preview='handlePictureCardPreview'
            :on-remove='handleRemove'>
            <i></i>
            <span>添加图片</span>   
          </el-upload>
          <el-dialog v-model='dialogVisible' size='tiny'>
            <img width='100%' :src='dialogImageUrl' alt=''>
          </el-dialog>
        </div>
      </div>
      <div class='ng_item'>
        <span class='item_l'><i class='dredColor'>*</i>添加规格：</span>
        <div class='item_r'>
          <el-radio-group v-model='goodsform.enbleSpec'>
            <el-radio :label='false'>不启用规格</el-radio>
            <el-radio :label='true'>启用规格</el-radio>
          </el-radio-group>
          <div class='' v-if='goodsform.enbleSpec'>
            <p class='ptip'>若商品没有规格，请直接添加库存及价格即可。统一价格单位：元</p>
            <table class='spec-table'>
              <tbody>
                <tr class='t-comon'>
                  <td colspan='2' style='width:406px;'> 
                    <label class='checklab'>
                      <i class='icon_choose' :class='{"icon_choosed" : checkus}'></i>
                      <input type='checkbox' @click='checkus = !checkus' />
                      统一售价:
                    </label>
                    <span class='yuan'>￥</span><input type='text' class='ipt-uniform' v-model='goodsform.uniformPrice' :input="onlyNum('uniformPrice', 'price', goodsform.uniformPrice)">
                  </td>
                  <td colspan='2' style='width:406px;'>
                    <label class='checklab'>
                      <i class='icon_choose' :class='{"icon_choosed" : checkui}'></i>
                      <input type='checkbox' @click='checkui = !checkui' />
                      统一库存:
                    </label>
                    <input type='text' class='ipt-uniform' v-model='goodsform.uniformStockNum' :input="onlyNum('uniformStockNum', 'num', goodsform.uniformStockNum)">
                  </td> 
                </tr>
                <tr class='t-header'>
                  <td style='width:238px;'>规格</td>
                  <td style='width:238px;'>售价</td>
                  <td style='width:238px;'>库存</td>
                  <td style='width:98px;'>操作</td>
                </tr>
                <tr class='nothing' v-if='goodsform.productSkus.length == 0'>
                  <td colspan='4'>您还没有添加商品规格数据</td>
                </tr>
                <tr v-for='(item, index) in goodsform.productSkus' v-else>
                  <td class='cell' style='width:238px;'> <input type='text' v-model='item.skuSpec' @blur="modifyProductSkus(index, item.id)"> </td>
                  <td class='cell' style='width:238px;'> <input type='text' v-model='item.salePrice' @blur="modifyProductSkus(index, item.id)"> </td>
                  <td class='cell' style='width:238px;'> <input type='text' v-model='item.stockNum' @blur="modifyProductSkus(index, item.id)"> </td>
                  <td style='width:98px;' @click='delProductSkus(index, item.id)' class='del-product-skus'>  </td>
                </tr>
                <tr>
                  <td colspan='4'> <span @click='addProductSkus' class='add-product-skus'> 添加规格 </span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class='spec_write' v-else>
            <label>
              <span><i class='dredColor'>*</i>价格(元)：</span>
              <input type='text' v-model="goodsform.salePrice" placeholder='请输入商品价格' :input="onlyNum('salePrice', 'price', goodsform.salePrice)"/>
            </label>
            <label>
              <span><i class='dredColor'>*</i>总数量(件)：</span>
              <input type='text' v-model="goodsform.stockNum" placeholder='请输入商品总数量'/>
            </label>
          </div>
        </div>
      </div>
      <div class='ng_item'>
        <span class='item_l'><i class='dredColor'>*</i>其他信息：</span>
        <div class='item_r'>
          <div class='other_item'>
            <span>设定显示原价</span>
            <el-radio-group v-model='goodsform.isShowMarkerPrice'>
              <el-radio :label='true'>是</el-radio>
              <el-radio :label='false'>否</el-radio>
            </el-radio-group>
            <div class='item-info' v-if='goodsform.isShowMarkerPrice'>
              <label class='lab require'>原有价格</label>
              <input type='text' v-model='goodsform.marketPrice' placeholder='请输入原有价格' 
                :input="onlyNum('marketPrice', 'price', goodsform.marketPrice)">
            </div>
          </div>
          <div class='other_item'>
            <span>是否显示销量</span>
            <el-radio-group v-model='goodsform.isRealSaleNum'>
              <el-radio :label='true'>是</el-radio>
              <el-radio :label='false'>否</el-radio>
            </el-radio-group>
            <div class='item-info' v-if='goodsform.isRealSaleNum'>
              <label class='lab'>虚拟销量</label>
              <input type='text' v-model='goodsform.virtualSaleNum' placeholder='请输入虚拟销量' 
                :input="onlyNum('virtualSaleNum', 'num', goodsform.virtualSaleNum)">
            </div>
          </div>
          <div class='other_item'>
            <span>是否显示库存</span>
            <el-radio-group v-model='goodsform.isRealStockNum'>
              <el-radio :label='true'>是</el-radio>
              <el-radio :label='false'>否</el-radio>
            </el-radio-group>
            <div class='item-info' v-if='goodsform.isRealStockNum'>
              <label class='lab'>虚拟库存</label>
              <input type='text' v-model='goodsform.virtualStockNum' placeholder='请输入虚拟库存'
                :input="onlyNum('virtualStockNum', 'num', goodsform.virtualStockNum)">
            </div>
          </div>
          <div class='other_item'>
            <span>设定购买时限</span>
            <el-radio-group v-model='goodsform.isBuyTimeLimit'>
              <el-radio :label='true'>是</el-radio>
              <el-radio :label='false'>否</el-radio>
            </el-radio-group>
            <div class='item-info' v-if='goodsform.isBuyTimeLimit'>
              <label class='lab'></label>
              <el-date-picker
                v-model='goodsform.buyLimitTime'
                type='datetime'
                placeholder='选择日期时间'
                popper-class='goods-datetime'
                size='goods'>
              </el-date-picker>
            </div>
          </div>
          <div class='other_item'>
            <span>设定限购数量</span>
            <el-radio-group v-model='goodsform.isBuyNumLimit'>
              <el-radio :label='true'>是</el-radio>
              <el-radio :label='false'>否</el-radio>
            </el-radio-group>
            <div class='item-info' v-if='goodsform.isBuyNumLimit'>
              <label class='lab require'>限购数量</label>
              <input type='text' v-model='goodsform.buyLimitNum' placeholder='请输入限购数量'
              :input="onlyNum('buyLimitNum', 'num', goodsform.buyLimitNum)">
            </div>
          </div>
          <div class='other_item'>
            <span>物流费用</span>
            <el-radio-group v-model='gogisticsCost'>
              <el-radio :label='true'>包邮</el-radio>
            </el-radio-group>
          </div>
          <div class='other_item'>
            <span>商品描述</span>
            <el-input
              type='textarea'
              class='goods-detail'
              :autosize='{ minRows: 5, maxRows: 8}'
              resize='none'
              placeholder='请输入商品描述内容'
              v-model='goodsform.detail'>
            </el-input>
          </div>
        </div>
      </div>
      <div class='ng_item'>
        <span class='item_l'>&nbsp;</span>
        <button class='save_btn' @click='addProduct'>保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../fetch/api'
import util from '../../../assets/js/utils'
export default {
  name: 'newgoods',
  components: {
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      checkus: false,
      checkui: false,
      gogisticsCost: true,
      catalog: '',
      catalogList: [],
      goodsform: {}
    }
  },
  created: function () {
    this.getGoodsInfo()
  },
  methods: {
    // 获取商品信息
    getGoodsInfo: function () {
      let _uuid = this.$store.state.goodsmanage.goodsId
      if (_uuid) {
        api.uuid({uuid: _uuid}).then(res => {
          if (res.code === 100) {
            this.goodsform = res.data
            api.getCatalogs().then(res => {
              if (res.code === 100) {
                this.catalogList = res.data
                let _catalog = this.catalogList.filter(item => { return item.id === this.goodsform.catalogId })
                this.catalog = _catalog[0]
              }
            })
          }
        })
      } else {
        this.goodsform = {
          productSkus: [],
          name: '',
          detail: '',
          enbleSpec: false,
          buyLimitTime: '',
          buyLimitNum: 0,
          virtualSaleNum: 0,
          virtualStockNum: 0,
          marketPrice: 0,
          salePrice: 0,
          stockNum: 0,
          uniformPrice: '',
          uniformStockNum: '',
          isBuyNumLimit: false,
          isBuyTimeLimit: false,
          isShowStockNum: false,
          isShowSaleNum: false,
          isShowMarkerPrice: false,
          isRealSaleNum: false,
          isRealStockNum: false,
          catalogId: '',
          catalogName: '',
          thumbnail: '',
          bannerImgs: []
        }
      }
    },

    toIndex: function () {
      this.$store.dispatch('setContextUserType', 'goods')
    },
    handleRemove: function (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview: function (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 添加 & 修改商品
    addProduct: function () {
      let params = this.goodsform
      console.log(params)
      if (params.id) {
        api.modifyProduct(params).then(res => {
          if (res.code === 100) {
            console.log('修改商品成功')
          } else {
            console.error('修改商品失败', res.msg)
          }
        })
      } else {
        api.addProduct(params).then(res => {
          if (res.code === 100) {
            console.log('添加商品成功')
          } else {
            console.error('添加商品失败', res.msg)
          }
        })
      }
    },

    // 删除商品规格
    delProductSkus: function (index, id) {
      if (this.goodsform.id && id) {
        let productData = {
          id: this.goodsform.id,
          productSku: {
            id: id
          }
        }
        console.log(productData)
        api.deleteProductSku(productData).then(res => {
          if (res.code !== 100) {
            console.error('删除规格失败', res.msg)
          }
        })
      }
      this.goodsform.productSkus.splice(index, 1)
    },

    // 新增规格
    addProductSkus: function () {
      let productSku = {
        skuSpec: '',
        salePrice: '',
        marketPrice: '',
        stockNum: '',
        thumbnail: {
          url: ''
        }
      }
      this.goodsform.productSkus.push(productSku)
    },

    // 修改 & 新增商品规格
    modifyProductSkus: function (index, id) {
      let _sku = this.goodsform.productSkus[index]
      let productData = {
        id: this.goodsform.id,
        productSku: {
          skuSpec: _sku.skuSpec,
          salePrice: _sku.salePrice,
          marketPrice: this.goodsform.marketPrice,
          stockNum: _sku.stockNum,
          thumbnail: {
            url: ''
          }
        }
      }

      if (this.goodsform.id && id) {
        productData.productSku.id = id
        api.modifyProductSku(productData).then(res => {
          if (res.code !== 100) {
            console.error('修改商品规格失败', res.msg)
          }
        })
      } else if (this.goodsform.id) {
        api.addProductSku(productData).then(res => {
          if (res.code !== 100) {
            console.error('新增商品规格失败', res.msg)
          }
        })
      }
    },
    onlyNum: function (key, type, val) {
      if (val && type === 'price') {
        this.goodsform[key] = util.onlyPrice(this.goodsform[key].toString())
      } if (type === 'price') {
        this.goodsform[key] = '0.00'
      } else if (val && type === 'num') {
        this.goodsform[key] = util.onlyNum(this.goodsform[key].toString())
      } else if (type === 'num') {
        this.goodsform[key] = 0
      }
    },

    changeCatalog: function (catalogObj) {
      this.goodsform.catalogId = catalogObj.id
      this.goodsform.catalogName = catalogObj.name
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style scoped>
.newgoods{
  padding: 0 20px;
}
.bc_block{
  margin-top: 20px;
}
.bc_block h2{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 24px;
  overflow: hidden;
  line-height: 30px;
}
.bc_block h2 button{
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  text-align: center;background-color: #fff;
  float: right;
  display: inline-block;
  width: 90px;
  line-height: 30px;
  color: #666;
}
.ng_item{
  display: block;
  margin-bottom: 20px;
  overflow: hidden;
}
.ng_item span.item_l{
  width: 167px;
  float: left;
  display: inline-block;
  text-align: right;
  line-height: 40px;
  margin-right: 8px;
}
.ng_item span.pic_l{
  line-height: 34px;
}
.ng_item input{
  line-height: 36px;
  border: 1px solid #ddd;
  padding: 0 10px;
  border-radius: 3px;
  width: 248px;
}
.ng_item .item_r{
  float: left;
  width: 813px;
  display: inline-block;
}
.ng_item .ptip{
  line-height: 34px;
  padding:0 10px;
  margin-bottom: 10px;
  color: #666;
  background-color: #f5f5f5;
}
.el-upload--picture-card i{
  display: block;
  width: 100%;
  height: 38px;
  margin-top: 22px;
  background: url(~assets/images/icon/icon_plus.png) no-repeat center;
}
.el-upload--picture-card:hover i{
  background: url(~assets/images/icon/icon_plus_hover.png) no-repeat center;
}
.el-upload--picture-card span{
  display: inline-block;
  line-height: 35px;
  color: #999;
}
.el-upload--picture-card:hover span{
  color: #18ccc0;
}
.el-radio{
  line-height: 40px;
}
.spec_write{
  background-color: #f5f5f5;
  padding: 20px 30px;
  width: 753px;
}
.spec_write label{
  display: block;
}
.spec_write label span{
  width: 125px;
  display: inline-block;
  text-align: right;
}
.spec_write label+label{
  margin-top: 10px;
}
.other_item{
  line-height: 40px;
  overflow: hidden;
}
.other_item+.other_item{
  margin-top: 10px;
}
.other_item span{
  width: 85px;
  float: left;
  margin-right: 20px;
  text-align: right;
  display: inline-block;
}
.save_btn{
  background-color: #18ccc0;
  color: #fff;
  text-align: center;
  width: 198px;
  line-height: 43px;
  border-radius: 3px;
  font-size: 16px;
}
.item-info{
  display: inline-block;
}
.item-info .lab{
  width: 80px;
  margin-left: 20px;
  position: relative;
  line-height: 40px;
  display: inline-block;
  box-sizing: border-box;
}
.item-info .lab.require{
  padding-left: 8px;
}
.item-info .lab.require:before{
  content: '*';
  color: #f00;
  position: absolute;
  left: 0;
  top:0;
  line-height: 45px;
}
.el-input--goods{
  width: 270px !important;
}
.goods-detail{
  height: 108px;
}
.spec-table .t-header td{
  background-color: #eef1f6;
  color: #000;
  font-weight: 600;
}
.spec-table td{
  padding: 5px 10px;
  text-align: center;
  white-space: normal;
  word-break: break-all;
  line-height: 30px;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  word-wrap: normal;
  text-overflow: ellipsis;
  display: inline-block;
  border-left:1px solid #dfe6ec;
  border-top:1px solid #dfe6ec;
  height: 40px;
}
.spec-table td:focus{
  outline-color: #18ccc0;
}
.spec-table{
  border-right:1px solid #dfe6ec;
  border-bottom:1px solid #dfe6ec;
}
.spec-table .nothing td{
  color:#999;
}
.spec-table .cell{
  padding: 0;
  border:none;
}
.spec-table .cell input{
  width: 100%;
  height: 40px;
  border-radius: 0;
  box-sizing: border-box;
  text-align: center;
  border-bottom: none;
  border-right: none;
}
.spec-table .cell input:focus{
  border:1px solid #18ccc0;
}
.checklab{
  display: inline-block;
  cursor: pointer;
  position: relative;
  vertical-align: middle;
  color: #000;
  font-weight: 600;
  margin-right: 5px
}
.checklab .icon_choose{
  border: 1px solid #d6d6d6;
  height: 11px;
  width: 11px;
  display: inline-block;
  margin-top: 8px;
  margin-right: 5px;
}
.checklab .icon_choosed{
  background: url(~assets/images/icon/icon_choose.png);
}
.checklab input{
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  height: 0px;
}
.ng_item .ipt-uniform{
  width: 60px;
  line-height: 20px;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #999;
  padding: 0;
  font-size: 16px;
  vertical-align: middle;
}
.ng_item .yuan {
  color: #999;
  font-size: 16px;
  line-height: 34px;
  vertical-align: middle;
}
.del-product-skus{
  cursor: pointer;
}
.del-product-skus:before{
  content: '';
  width: 15px;
  height: 3px;
  border-radius: 1px;
  position: absolute;
  left: 50%;
  top:50%;
  background-color: #333;
  margin-left: -7.5px
}
.add-product-skus{
  color: #18ccc0;
  cursor: pointer;
  position: relative;
  padding-left: 20px;
}
.add-product-skus:before{
  content: '';
  width: 15px;
  height: 15px;
  background: url(~assets/images/icon/icon_plus_hover.png) no-repeat center center;
  background-size: contain;
  position: absolute;
  left: 0;
  top: 2px;
}
</style>
