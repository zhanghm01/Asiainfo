<template>
  <div>
    <div class="deletebox" v-if='deleteope.isdelete'>
           <div class="content">
              您将删除以下数据：XXX
              确认删除？
            </div>
          <div class="btns">
            <el-button type="primary" @click='saveDelete'>确定删除</el-button>
            <el-button @click='cancelDelete'>取消删除</el-button>
          </div>
        </div>
  </div>
</template>

<script>
import {deleteJieDianData} from '../../../api/orderMgt/jiedian.js'

export default {
  data(){
    return { }
  },
  methods:{
    saveDelete:function(){
      return ((obj)=>{
        obj = Object.assign(JSON.parse(JSON.stringify(this.deleteope.deleteObj)));
        console.log('删除的数据ID:',obj)
        deleteJieDianData(obj).then(res=>{
          console.log('删除数据响应成功');
          console.log(res);
          console.log(obj);
          let result = res.data;
          if(result.retCode == '200'){
            console.log('ok,删除成功')
            this.$parent.getOrderSearchData()
            console.log('删除完重新获取了数据')
          }
      })
      .catch(err=>{
        console.log(err);
      })
      this.deleteope.isopen = false;
      this.deleteope.isdelete = false;
      this.deleteope.deleteObj = [];
      })()
    },
    //取消删除，需要把deleteObj中的数据置为空,以免下次点击删除时会删除上次选中的数据
    cancelDelete(){
      this.deleteope.isopen = false;
      this.deleteope.isdelete = false;
      this.deleteope.deleteObj = [];
    }
  },
  props:['deleteope']
}
</script>

<style lang="scss" scoped>
      .deletebox{
        width: 60vw;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 20px;
        .content{
          padding: 20px;
          margin-right: 10px;
        }
        .opes{
          padding-bottom: 20px;
          display: flex;
          margin-right: 5px;
          margin-bottom: 20px;
          span{
            margin-right: 10px;
            line-height: 35px;
            display: block;
            width: 100px;
            text-align: center;
          }
          .el-select{
            height: 35px;
            width: 300px;
          }
        }
        .btns{
          padding-left: 80px;
          padding-bottom: 20px;
        }
      }
</style>
