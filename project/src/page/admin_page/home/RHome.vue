<template>
  <div id='rhome-container'>
    <el-container style='background:#ffa673;width:320px;flex: 0 1 auto;'>
      <el-header style='height:36px;'>待施工订单数</el-header>
      <el-main style='height:63px;'>
        <t-icon type='clipboard-alert'></t-icon>
        <span class='num'>{{daishigong}}</span>
      </el-main>
      <el-footer style='height:38px;'>
        <div class="box">
          <i class='el-icon-d-arrow-right'></i>
        </div>
      </el-footer>
    </el-container>
    <el-container  style='background:#FDF21B;width:320px;flex: 0 1 auto;'>
      <el-header style='height:36px;'>待审核订单数</el-header>
      <el-main>
        <t-icon type='clock-alert'></t-icon>
        <span class='num'>{{daishenhe}}</span>
      </el-main>
      <el-footer style='height:38px;'>
        <div class="box">
          <i class='el-icon-d-arrow-right'></i>
        </div>
      </el-footer>
    </el-container>
    <el-container  style='background:#1DCFAB;width:320px;flex: 0 1 auto;'>
      <el-header style='height:36px;'>逾期订单竣工数</el-header>
      <el-main>
        <t-icon type='baby-buggy'></t-icon>
        <span class="num">{{yuqi}}</span>
      </el-main>
      <el-footer style='height:38px;'>
        <div class="box">
          <i class='el-icon-d-arrow-right'></i>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {getDaiShiGong, DaiSHenHe, YuQi} from '../../../api/homePage/search.js'
export default {
  data(){
    return {
      daishigong:'',
      daishenhe:'',
      yuqi:''
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      getDaiShiGong().then(res=>{
        console.log(111);
        console.log(res);
        let data = res.data;
        if(data.retCode == '200'){
          if(data.data[0]){
            this.daishigong = data.data[0].StatisticsNum;
          }
          else{
            this.daishigong = '未知'
          }
        }
      })
      .catch(err=>{
        console.log(err);
      })

      DaiSHenHe().then(res=>{
        console.log(222);
        console.log(res);
        let data = res.data;
        if(data.retCode == '200'){
          console.log(data.data[0])
          if(data.data[0]){
            this.daishenhe = data.data[0].StatisticsNum;
          }
          else{
            this.daishenhe = '未知'
          }
        }
      })
      .catch(err=>{
        console.log(err);
      })

      YuQi().then(res=>{
        console.log(333);
        console.log(res);
        let data = res.data;
        if(data.retCode == '200'){
          if(data.data[0]){
            this.yuqi = data.data[0].StatisticsNum;
          }
          else{
            this.yuqi = '未知';
          }
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#rhome-container{
  // width:calc(100vw-250);
  width:100%;
  display: flex;
  flex-wrap: wrap;
  // flex: 0 1 auto;
  .el-container{
    border:1px solid #ccc;
    // width: 320px;
    margin-left: 20px;
    margin-top: 20px;
    .el-header{
      font-size:14px;
      color:green;
      line-height: 36px;
      background-color: rgba(0,0,0,.1);
    }
    .el-main {
      color: #fff;
      text-align: center;
      // height: 63px;
      font-size:50px;
      // line-height: 24px;
      display: flex;
      justify-content: space-between;
      padding: 0;
    }
    .el-footer{
      background-color: #fff;
      padding-left: 245px;
      line-height: 28px;
      .box{
        width: 60px;
        height: 26px;
        margin-top: 5px;
        background-color: skyblue;
        border-radius: 10%;
        margin-right: 20px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
