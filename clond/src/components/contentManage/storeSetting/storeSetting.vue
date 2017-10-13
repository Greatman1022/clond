<template>
  <div class='storesetting'>
    <div class='bc_block'>
      <h2>店铺设置</h2>
      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span class='first'>发货地址设置</span>
        </p>
        <div class='ng_item'>
          <span class='item_l'>联系地址: </span>
          <label>
            <el-select class="select-bg-grey" v-model="province" placeholder="请选择省">
              <el-option
                v-for="item in provinceList"
                :label="item.label"
                :value="item.value"
                :key="item.id">
              </el-option>
            </el-select>
            <el-select class="select-bg-grey" v-model="city" placeholder="请选择市">
              <el-option
                v-for="item in cityList"
                :label="item.label"
                :value="item.value"
                :key="item.id">
              </el-option>
            </el-select>
            <el-select class="select-bg-grey" v-model="district" placeholder="请选择区">
              <el-option
                v-for="item in districtList"
                :label="item.label"
                :value="item.value"
                :key="item.id">
              </el-option>
            </el-select>
          </label>
        </div>
        <div class='ng_item'>
          <span class='item_l'> </span>
          <label>
            <input type='text' name='address' placeholder="详细地址" />
          </label>
        </div>
        <div class='ng_item'>
          <span class='item_l'> </span>
          <label>
            <input type='button' value='确定' />
          </label>
        </div>
      </div>
      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span class='first'>发货地址设置</span>
        </p>
        <div class='ng_item'>
          <span class='item_l'>选择物流公司: </span>
          <label>
            <el-checkbox-group v-model="checkList" class="checkbox-group">
              <el-checkbox label="韵达快递"></el-checkbox>
              <el-checkbox label="中通快递"></el-checkbox>
              <el-checkbox label="申通快递"></el-checkbox>
              <el-checkbox label="天天快递"></el-checkbox>
              <el-checkbox label="百世快递"></el-checkbox>
            </el-checkbox-group>
          </label>
        </div>
        <div class='ng_item'>
          <span class='item_l'> </span>
          <label>
            <input type='button' value='确定' />
          </label>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'storesetting',
  components: {
  },
  data () {
    return {
      checkList: [],
      provinceList: [],
      cityList: [],
      districtList: [],
      province: '',
      city: '',
      district: ''
    }
  },
  methods: {
  },
  comnputed: {
  },
  watch: {
  }
}
</script>

<style scoped>
.storesetting{
  padding: 0 20px 45px;
}
.bc_block{
  margin-top: 30px;
}
.bc_block h2{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}
.bc_block h2 span{
  font-size: 14px;
  font-weight: normal;
}
.bc_item{
  border-bottom: 1px dashed #e2e2e2;
  padding-top: 12px;
  line-height: 32px;
}
.bc_item p.p_line{
  clear: both;
  padding-bottom: 12px;
  overflow: hidden;
}
.bc_item p.p_line i.icon{
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 6px solid transparent;
  border-left: 10px solid #ddd;
  border-bottom: 6px solid transparent;
  margin: 1px 10px 0 0;
}
.bc_item p.p_line span.first{
  width: 280px;
  display: inline-block;
}
.bc_item p.p_line a{
  color: #0088cc;
  float: right;
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
  height: 40px;
  line-height: 40px;
  margin-right: 8px;
}
.ng_item span.pic_l{
  line-height: 34px;
}
.ng_item input{
  line-height: 38px;
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
.ng_item .picload p{
  line-height: 34px;
  padding:0 10px;
  margin-bottom: 10px;
  color: #666;
  background-color: #f5f5f5;
}
input[type='button']{
  background-color: #18ccc0;
  border-radius: 3px;
  border: none;
  width: 94px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
}

input[type='text']{
  width: 310px;
  box-sizing: border-box;
}
</style>
