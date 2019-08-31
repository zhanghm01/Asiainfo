<template>
  <div>
              <div class="modifybox" v-if='ismodify'>
          <div class="content">
            <div class="opes">
                <span>省:</span>
                <el-select v-model="modifyObj.PROVINCE" @change="choseProvince" placeholder="选择省级地区">
                  <el-option v-for="(item,$index) in province" :key="$index" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="opes">
                <span>市:</span>
                <el-select v-model="modifyObj.CITY" @change="choseCity" placeholder="请选择市级地区">
                  <el-option v-for="(item,$index) in city" :key="$index" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="opes">
                <span>区:</span>
                <el-select v-model="modifyObj.DISTRICT" @change="choseBlock" placeholder="请选择区级地区">
                  <el-option v-for="(item,$index) in block" :key="$index" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="opes">
                <span>名称:</span>
                <el-input placeholder="请输入机房名称" v-model="modifyObj.DC_NAME" clearable style='width:290px;'></el-input>
            </div>
            <div class="opes">
                <span>地址:</span>
                <el-input placeholder="请输入机房地址" v-model="modifyObj.DC_ADDRESS" clearable style='width:290px;'></el-input>
            </div>
            <div class="opes">
                <span>ID:</span>
                <el-input placeholder="请输入云联网ID" v-model="modifyObj.ADDR_ID_YLW" clearable style='width:290px;'></el-input>
            </div>
          </div>
          <div class="btns">
            <el-button type="primary" @click='saveModify'>确定修改</el-button>
            <el-button @click='cancelModify'>取消修改</el-button>
          </div>
        </div>
  </div>
</template>

<script>
import {modifyJieDianData} from '../../../api/orderMgt/jiedian.js'
export default {
  data(){
      return {
        // modifyObj:{
        //   PROVINCE:"",
        //   CITY:"",
        //   DISTRICT:"",
        //   DC_NAME:"",
        //   DC_ADDRESS:"",
        //   ADDR_ID_YLW:"",
        //   DC_ADDR_ID:""
        // },
        // ismodify:false,
    }
  },
  methods:{
    saveModify(){
      // 点击确认保存修改时，需要先判断内容是否完整，如果没有填完整数据，否则需要进行提示，且保存按钮点击失败
      if(Object.keys(this.modifyope.modifyObj).every(key => this.modifyope.modifyObj[key] != "")){
            // console.log(this.newObj)
            return ((obj)=>{
              console.log('修改的数据参数')
            console.log(this.modifyope.modifyObj)
            obj = Object.assign(this.modifyope.modifyObj)
            modifyJieDianData(obj).then(res=>{
              console.log('修改数据响应成功')
              console.log(res)
              let result = res.data;
              if(result.retCode == '200'){
                // alert('修改成功')
                console.log('ok')
                // this.resetData();
                this.modifyope.orderObj = {province:"",city:"",district:"",dc_address:""};
                var obj1 = Object.assign({ pageSize: this.modifyope.target.pageSize, pageNum: this.modifyope.target.pageNum},this.modifyope.orderObj)
                this.$parent.getOrderSearchData(obj1);

              }
            })
            .catch(err=>{
                console.log(err);
              })
            this.modifyope.isopen = false;
            this.modifyope.ismodify = false;
            //请求完数据后需要将本次新增的数据置为空，否则下次点击新增时仍然会保留上次的数据
            // Object.keys(this.newObj).map(key => this.newObj[key] = "")
          })()
      }
      else{
        alert('还有内容没写')
      }
      this.modifyope.isopen = false;
      this.modifyope.ismodify = false;
      console.log('修改试试')
      // console.log(this.newObj)
    },
    //取消修改数据
    cancelModify(){
      this.modifyope.isopen = false;
      this.modifyope.ismodify = false;
      // 取消修改时，点击之后应该还是原来的数据
    },
  },
  props:['modifyope']
}
</script>

<style lang="scss" scoped>

</style>
