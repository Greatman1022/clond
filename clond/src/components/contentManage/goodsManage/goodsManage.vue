<template>
  <div class='goodsmanage' :data-type='contentUserType'>
    <div class='gm_index' v-if='contentUserType == "goods"'>
      <div class='index_head'>
        <label class='checklab'>
          <i class='icon_choose' :class="{icon_choosed: checkAllType}"></i>
          <input type='checkbox' v-model='checkAllType' @click='checkAll' />
          全选
        </label>
        <div class='btn_group'>
          <button class='deletebtn' @click="openDelBatchProductPop" v-model='checkList'>删除</button>
          <button class='shelvebtn' @click="upBatchProduct">上架</button>
          <button class='offshelvebtn' @click="downBatchProduct">下架</button>
          <button class='getcodebtn' @click='togetcode'>二维码获取</button>
        </div>
        <button class='newibtn ml10' @click='openNewTypePop'><i class='icon_type'></i>新增类别</button>
        <button class='newibtn' @click='toNewgood("")'><i>+</i>新增商品</button>
      </div>
      <el-table :data="catalogList" class="goods-table index_table" style="width: 100%"  @expand="expandRow">
        <el-table-column type="expand" width="200">
          <template scope="props">
            <el-table :data="catalogList[props.$index].products" style="width: 100%" class="goods-list">
              <el-table-column label="图片" width="128" :data-check="props.row.catalogCheck">
                <template scope="scope">
                  <label class='checklab'>
                    <i class='icon_choose' :class="{icon_choosed: scope.row.checked}"></i>
                    <input type='checkbox' class='fan-checkbox' @click="checkProduct(props.$index, scope.$index)"/>
                  </label>
                  <img :src='scope.row.thumbUrl' />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" width="348" class-name="goods-name"> </el-table-column>
              <el-table-column prop="salePrice" width="146" label="价格" class-name="goods-price">  </el-table-column>
              <el-table-column prop="stockNumSummary" width="114" label="库存">  </el-table-column>
              <el-table-column prop="saleNumSummary" width="124" label="销量">  </el-table-column>
              <el-table-column label="操作" width="340" class-name ="lasttd">
                <template scope="option">
                  <a href='javascript:;' class='ieditbtn'
                    @click='toNewgood(option.row.uuid)'>编辑</a>
                  <a href='javascript:;' class='ioffshelvebtn'
                    @click='openoffGoodsPop(props.$index, option.$index, option.row.uuid)' v-if="option.row.status === 1">下架</a>
                  <a href='javascript:;' class='ioffshelvebtn'
                    @click='upGoods(props.$index, option.$index, option.row.uuid)' v-else>上架</a>
                  <a href='javascript:;' class='ideletebtn' 
                    @click='openDelGoodsPop(props.$index, option.$index, option.row)'>删除</a>
                  <a href='javascript:;' class='ideletebtn' 
                    @click='downloadQrcodeImg(props.$index, option.$index, option.row.uuid)'>下载二维码</a>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column width="860" class-name="catalog-name">
          <template scope="name">
            <i class="el-icon-caret-right i-right" :class="{'active': name.row.showdetail == true}"></i>
            <span>{{ name.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="catalog-option" width="140">
          <template scope="option">
            <a href="javascript:;" class="btn-co catalog-modify"
              @click="openModifyCatalog(option.$index, option.row.id, option.row.name)"><i class="icon i-edit"></i> 修改</a>
            <a href="javascript:;" class="btn-co catalog-del"
              @click="deleteCatalog(option.$index, option.row.id)"><i class="icon i-del"></i>删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <v-newgoods v-if='contentUserType == "newgoods"'></v-newgoods>
    <v-getcode v-if='contentUserType == "code"'></v-getcode>

    <!-- 新增类别弹窗 S -->
    <el-dialog :title='catalogTitle'
      v-model='newTypeVisible'
      size='xs'
      custom-class='dialog-theme2'
      @close='closeNewTypePop'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <el-input v-model='newTypeInput' class='umDepinput'
             @keyup.enter='saveNewTypeDialog' placeholder='请输入分组名称'></el-input>
            <p class='error' v-show='isNewError == true'>{{ newError }}</p>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='saveNewTypeDialog'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='closeNewTypePop'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 新增类别弹窗 E -->

    <!-- 批量删除弹窗 S -->
    <el-dialog
      title='商品批量删除'
      v-model='delBatchProductVisible'
      size='xs'
      custom-class='dialog-theme2'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <p>确定要删除选中的商品吗？</p>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='saveDelBatchProductDialog'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='delBatchProductVisible = false'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 删除分组弹窗 E -->

    <!-- 删除商品弹窗 S -->
    <el-dialog
      title='删除商品'
      v-model='delGoodsVisible'
      size='xs'
      custom-class='dialog-theme2'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <p>你确定删除此商品？</p>
            <p class='grbyColer'>(该行为将可能影响数据统计的最终结果)</p>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='saveDelGoodsDialog'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='delGoodsVisible = false'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 删除商品弹窗 E -->

    <!-- 下架弹窗 S -->
    <el-dialog
      title='下架'
      v-model='offGoodsVisible'
      size='xs'
      custom-class='dialog-theme2'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <p>确定把所选商品下架吗？</p>
            <el-checkbox class='gm_off' v-model='isChoosed'>不再提示此对话框</el-checkbox>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='saveOffGoodsDialog'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='offGoodsVisible = false'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 下架弹窗 E -->

    <!-- 删除分类提示弹窗 S -->
    <el-dialog
      title='删除分类'
      v-model='delCatalogVisible'
      size='xs'
      custom-class='dialog-theme2'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <p>该分类有商品，不能删除。</p>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='delCatalogVisible = false'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='delCatalogVisible = false'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 删除分类提示弹窗 E -->
  </div>
</template>

<script>
import vNewgoods from './newGoods'
import vGetcode from './getCode'
import { mapGetters } from 'vuex'
import api from '../../../fetch/api'
export default {
  name: 'goodsmanage',
  components: {
    vNewgoods,
    vGetcode
  },
  data () {
    return {
      activeNames: [''], /* 折叠面板 */
      checkAllType: false, /* 全选 */
      choosed: false, /* 被选状态 */
      goodsListApi: 'http://localhost:3000/goodsList',
      checkList: [], /* 获取选项框数据 */
      // contentUserType: 'goods',
      // goodsTypeList: [],
      catalogList: [],
      goodsList: [],
      checkAllGoods: false,
      page: 1,
      /* 新增类别弹窗 */
      newTypeVisible: false,
      isNewError: false,
      newError: '',
      newTypeInput: '',
      /* 批量删除弹窗 */
      delBatchProductVisible: false,
      /* 删除商品弹窗 */
      delGoodsVisible: false,
      goodsId: '',
      typeId: '',
      /* 下架弹窗 */
      offGoodsVisible: false,
      isChoosed: false,
      typeIndex: '',
      goodIndex: '',
      goodsUuid: '',
      delCatalogVisible: false,
      catalogId: '',
      catalogTitle: ''
    }
  },
  computed: {
    ...mapGetters({
      contentUserType: 'getContentUsertype'
    })
  },
  created: function () {
    this.$store.dispatch('setContextUserType', 'goods')
    this.getCatalogs()
  },
  methods: {
    // 获取商品分类
    getCatalogs: function () {
      api.getCatalogs().then(res => {
        if (res.code === 100) {
          this.catalogList = res.data
          this.getProducts()
        }
      })
    },

    // 获取商品分类下的商品
    getProducts: function () {
      this.catalogList.map((item, index) => {
        this.catalogList[index].showdetail = false
        api.productByCatalogId({catalogId: item.id, pageNum: 1, pageSize: 10}).then(res => {
          this.catalogList[index].products = res.data
        })
      })
    },

    // 获取商品分类下的商品
    expandRow: function (row, expanded) {
      let _index = this.catalogList.indexOf(row)
      if (!this.catalogList[_index].products) {
        api.productByCatalogId({catalogId: row.id, pageNum: 1, pageSize: 50}).then(res => {
          this.catalogList[_index].products = res.data
        })
      }
      row.showdetail = !row.showdetail
    },

    // 删除分类
    deleteCatalog: function (typeIndex, id) {
      api.productByCatalogId({catalogId: id, pageNum: 1, pageSize: 10}).then(res => {
        if (res.data && res.data.length > 0) {
          this.delCatalogVisible = true
        } else {
          this.catalogList[typeIndex].products = res.data
          api.deleteCatalog({id: id}).then(res => {
            if (res.code === 100) {
              this.catalogList.splice(typeIndex, 1)
            }
          })
        }
      })
    },

    // 删除商品
    removeGoods: function (typeIndex, uuid = null) {
      api.deleteProduct({uuid: uuid}).then(res => {
        if (res.code === 100) {
          this.goodsId = uuid
          this.catalogList[typeIndex].products = this.catalogList[typeIndex].products.filter(item => {
            return item.uuid !== uuid
          })
        }
      })
    },

    // 商品批量删除
    deleteBatchProduct: function () {
      api.deleteBatchProduct({uuids: this.checkList}).then(res => {
        if (res.code === 100) {
          this.catalogList = this.catalogList.map((catalog, cIndex) => {
            let _products = catalog.products.filter((producet, pIndex) => {
              let _index = this.checkList.indexOf(producet.uuid)
              return !(_index >= 0)
            })
            catalog.products = _products
            return catalog
          })
        }
      })
    },

    // 下架商品
    downProduct: function (typeIndex, goodIndex, uuid = null) {
      api.downProduct({uuid: uuid}).then(res => {
        if (res.code === 100) {
          this.goodsId = uuid
          this.catalogList[typeIndex].products[goodIndex].status = 0
        }
      })
    },

    // 批量下架商品
    downBatchProduct: function () {
      api.downBatchProduct({uuids: this.checkList}).then(res => {
        if (res.code === 100) {
          this.catalogList = this.catalogList.map((catalog, cIndex) => {
            let _products = catalog.products.map((producet, pIndex) => {
              let _index = this.checkList.indexOf(producet.uuid)
              if (_index >= 0) {
                producet.status = 1
              }
              return producet
            })
            catalog.products = _products
            return catalog
          })
        }
      })
    },

    // 上架商品
    upGoods: function (typeIndex, goodIndex, uuid = null) {
      api.upProduct({uuid: uuid}).then(res => {
        if (res.code === 100) {
          this.goodsId = uuid
          this.catalogList[typeIndex].products[goodIndex].status = 1
        }
      })
    },

    // 批量上架商品
    upBatchProduct: function () {
      api.upBatchProduct({uuids: this.checkList}).then(res => {
        if (res.code === 100) {
          this.catalogList = this.catalogList.map((catalog, cIndex) => {
            let _products = catalog.products.map((producet, pIndex) => {
              let _index = this.checkList.indexOf(producet.uuid)
              if (_index >= 0) {
                producet.status = 0
              }
              return producet
            })
            catalog.products = _products
            return catalog
          })
        }
      })
    },

    // 选择全部商品
    checkAll: function () {
      this.checkList = []
      this.catalogList.map((catalog, cIndex) => {
        catalog.products.map((producet, pIndex) => {
          if (!this.checkAllType) {
            producet.checked = false
            this.$set(this.catalogList[cIndex].products, pIndex, producet)
          } else {
            producet.checked = true
            this.$set(this.catalogList[cIndex].products, pIndex, producet)
            this.checkList.push(producet.uuid)
          }
        })
      })
    },

    // 选择商品
    checkProduct: function (catalogIndex, producetIndex) {
      let producet = this.catalogList[catalogIndex].products[producetIndex]
      if (producet.checked) {
        this.checkList.splice(this.checkList.indexOf(producet.uuid), 1)
        producet.checked = false
        this.$set(this.catalogList[catalogIndex].products, producetIndex, producet)
        this.checkAllType = false
      } else {
        this.checkList.push(producet.uuid)
        producet.checked = true
        this.$set(this.catalogList[catalogIndex].products, producetIndex, producet)

        let flag = true
        this.catalogList.map((catalog, cIndex) => {
          catalog.products.map((producet, pIndex) => {
            if (!producet.checked) {
              flag = false
            }
          })
        })
        if (flag) {
          this.checkAllType = true
        }
      }
    },

    // 新增 || 修改类别弹窗
    openModifyCatalog: function (typeIndex, id, name) {
      this.newTypeVisible = true
      this.catalogId = id
      this.typeIndex = typeIndex
      this.newTypeInput = name
      this.catalogTitle = '修改类别名称'
    },
    openNewTypePop: function () {
      this.newTypeVisible = true
      this.catalogId = ''
      this.catalogTitle = '新增类别'
    },
    closeNewTypePop: function () {
      this.newTypeInput = ''
      this.newError = ''
      this.isNewError = false
      this.newTypeVisible = false
    },
    saveNewTypeDialog: function () {
      // let testVal = /^[\u4e00-\u9fa5]{0,6}$/
      let newTypeVal = this.newTypeInput.trim()
      if (!newTypeVal) {
        this.newError = '请输入类别名称'
        this.isNewError = true
        return false
      } else if (newTypeVal.length > 12) {
        this.newError = '名称不得超过12个字符'
        this.isNewError = true
        return false
      }
      this.newError = ''
      this.isNewError = false
      this.newTypeVisible = false

      if (this.catalogId) {
        let data = {
          id: this.catalogId,
          name: newTypeVal
        }
        api.modifyCatalog(data).then(res => {
          if (res.code === 100) {
            this.catalogList[this.typeIndex].name = newTypeVal
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        api.addCatalog({name: newTypeVal}).then(res => {
          if (res.code !== 100) {
            this.$message.error('新增类别失败: ' + res.msg)
          }
        })
      }
    },
    // 下载二维码
    downloadQrcodeImg: function (typeIndex, goodIndex, uuid) {
      window.open('/api/mgt/product/downloadQrcodeImg?uuid=' + uuid)
    },

    // 删除分组弹窗
    openDelBatchProductPop: function () {
      this.delBatchProductVisible = true
    },
    saveDelBatchProductDialog: function () {
      this.delBatchProductVisible = false
      this.deleteBatchProduct()
      // this.removeGoods(this.typeId)
    },

    // 删除商品弹窗
    openDelGoodsPop: function (typeid, index, row) {
      this.delGoodsVisible = true
      this.typeId = typeid
      this.goodsId = row.uuid
    },
    saveDelGoodsDialog: function () {
      this.delGoodsVisible = false
      this.removeGoods(this.typeId, this.goodsId)
    },

    // 下架弹窗
    openoffGoodsPop: function (typeINdex, goodsIndex, uuid) {
      this.offGoodsVisible = true
      this.typeIndex = typeINdex
      this.goodIndex = goodsIndex
      this.goodsUuid = uuid
    },
    saveOffGoodsDialog: function () {
      this.offGoodsVisible = false
      this.downProduct(this.typeIndex, this.goodIndex, this.goodsUuid)
    },

    // 新增商品
    toNewgood: function (goodsId) {
      this.$store.dispatch('setContextUserType', 'newgoods')
      if (goodsId) {
        this.$store.dispatch('setGoodsId', goodsId)
      } else {
        this.$store.dispatch('setGoodsId', '')
      }
      this.getCatalogs()
    },
    togetcode: function () {
      this.$store.dispatch('setContextUserType', 'code')
      this.getCatalogs()
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.contentmanage{
  padding-bottom: 0 !important;
}
.ei_b_baocun,.ei_group{
  margin-left: 48px;
}
.ei_group p.error{
  line-height: 40px;
  margin-bottom: -20px;
  color: #cc0000;
}
.goodsmanage{
  padding-bottom: 10px;
}
.goodsmanage .index_head{
  padding: 14px 20px;
  overflow: hidden;
}
label.checklab{
  float: left;
  display: inline-block;
  cursor: pointer;
  margin: 6px 20px 0 0;
  position: relative;
}
label.checklab i.icon_choose{
  border: 1px solid #d6d6d6;
  height: 11px;
  width: 11px;
  display: inline-block;
  vertical-align: middle;
}
label.checklab i.icon_choosed{
  background: url(~assets/images/icon/icon_choose.png);
}
label.checklab input{
  position: absolute;
  top: 0;
  left: 0;
  width: 0px;
  height: 0px;
}
.btn_group{
  overflow: hidden;
  display: inline-block;
}
.btn_group button{
  border: 1px solid #d6d6d6;
  color: #666;
  background-color: #fff;
  border-radius: 3px;
}
.deletebtn,.shelvebtn,.offshelvebtn{
  width: 52px;
  line-height: 30px;
  border: 1px solid #d6d6d6;
  margin-right: 10px;
}
.getcodebtn{
  width: 90px;
  line-height: 30px;
  border: 1px solid #d6d6d6;
  margin-left: 11px;
  position: relative;
}
.getcodebtn:before{
  content: ' ';
  position: absolute;
  width: 1px;
  height: 18px;
  background-color: #d6d6d6;
  left: -12px;
  top: 7px;
}
.newibtn{
  float: right;
  background: none;
  color: #666666;
  width: 98px;
  height: 32px;
  line-height: 32px;
  border-radius: 3px;
  border: 1px solid #d6d6d6;
  position: relative;
}
.newibtn i{
  font-size: 20px;
  display: inline-block;
  vertical-align: -2px;
  margin-right: 5px;
}
.newibtn i.icon_type{
  background: url(~assets/images/icon/icon_type.png) no-repeat;
  width: 14px;
  height: 14px;
}
.listType{
  line-height: 49px;
  padding-left: 20px;
  border-top: 1px solid #ededed;
}
.listType i.sj{
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 6px solid transparent;
  border-left: 10px solid #666;
  border-bottom: 6px solid transparent;
  float: left;
  margin: 18px 9px 0 0;
}
.listType i.ideg{
  transform:rotate(90deg);
  -ms-transform:rotate(90deg);   /* IE 9 */
  -moz-transform:rotate(90deg);  /* Firefox */
  -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
  -o-transform:rotate(90deg);  /* Opera */
}
label.checkgm{
  margin-top: 18px;
}
.index_table{
  border-collapse:collapse;
  text-align: center;
}
.index_table tr{
  background-color: #f5f5f5;
  line-height: 40px;
}
.index_table input[type=checkbox]{
  margin-right: 15px;
}
.index_table img{
  border: 1px solid #999;
  width: 52px;
  height: 52px;
}
.index_table tbody td.lasttd{
  font-size: 0;
}
.index_table tbody td.lasttd a{
  font-size: 14px;
  padding-left: 26px;
  color: #0088cc;
}
.index_table tbody td.lasttd a:first-child{
  padding-left: 0;
}
td.tdpaging{
  border-bottom: none;
  padding-bottom: 0;
}
td.tdpaging .paging{
  padding:10px 21px 0;
}
.i-right{
  color: #666;
  font-size: 12px;
  transition: all .3s;
}
.i-right.active{
  transform:rotate(90deg);
}
.btn-co {
  margin-left: 12px;
}
.icon{
  width: 14px;
  height: 14px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 5px;
  vertical-align: -2px;
}
.i-edit{
  background-image: url(~assets/images/icon/icon_modify.png);
  margin-right: 1px;
}
.i-del{
  background-image: url(~assets/images/icon/icon_deleted.png);
}
.goods-list{
  border: none;
  border-top: 1px solid #dfe6ec;
}
</style>
