<template>
<!-- 还没写完数据请求 -->
  <div id='ordersearch-container'>
    <div class="content">
      <h3>订单查询</h3>
      <hr>
      <div class="select">
        <div class="sels">
          <span>订单状态</span>
          <el-select v-model="orderObj.order_status" slot="prepend" placeholder="请选择">
            <el-option label="处理中" value="1"></el-option>
            <el-option label="待审核" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </div>
        <div class="sels">
          <span>订单编号</span>
            <el-input placeholder="请输入订单编号" v-model="orderObj.order_id" clearable></el-input>
        </div>
        <div class="sels">
          <span>企业名称</span>
            <el-input placeholder="请输入企业名称" v-model="orderObj.cust_name" clearable></el-input>
        </div>
        <div class="sels">
          <span>订单来源</span>
          <el-select v-model="orderObj.order_source" slot="prepend" placeholder="请选择">
            <el-option label="云联网" value="1"></el-option>
            <el-option label="自营平台" value="2"></el-option>
          </el-select>
        </div>
        <div class="sels">
          <span>订购日期范围</span>
          <t-form :model="orderObj.formItem" style='width:204px;'>
            <t-form-item>
              <t-date-picker v-model="orderObj.formItem.rangeDateVal[0]" type="dateTimeRange" placeholder="请选择开始日期">
              </t-date-picker>
            </t-form-item>
          </t-form>
          <span style='width:20px;height:35px;border:1px solid #DBDFE6;margin:0'>至</span>
          <t-form :model="orderObj.formItem" style='width:204px'>
            <t-form-item>
              <t-date-picker v-model="orderObj.formItem.rangeDateVal[1]" type="dateTimeRange" placeholder="请选择结束日期">
              </t-date-picker>
            </t-form-item>
          </t-form>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" @click='getIndexData'>查询</el-button>
        <el-button @click='resetData'>重置</el-button>
      </div>
      <hr>
      <div class="button">
        <el-button type="primary" icon="el-icon-edit" style='font-size:8px;'>添加</el-button>
        <el-button type="primary" icon="el-icon-edit" style='font-size:8px;'>批量删除</el-button>
      </div>
      <hr>
      <div class="table">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"  style="width: 100%;" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="xuhao" label="序号" width="100" style='background:#fff;'></el-table-column>
          <el-table-column prop="bianhao" label="订单编号" width="100"></el-table-column>
          <el-table-column prop="xinxi" label="订单信息" width="100"></el-table-column>
          <el-table-column prop="xiadan" label="下单时间" width="100"></el-table-column>
          <el-table-column prop="laiyuan" label="订单来源" width="100"></el-table-column>
          <el-table-column prop="shouji" label="客户手机" width="100"></el-table-column>
          <el-table-column prop="jingban" label="经办人" width="100"></el-table-column>
          <el-table-column prop="zhuangtai" label="订单状态" width="100"></el-table-column>
          <el-table-column prop="caozuo" label="操作" width="100"></el-table-column>
        </el-table>
      </div>
      <div class="footer" v-if='!flag'>
        <span>第{{pageNum}}页&nbsp;&nbsp;第{{(pageSize?pageSize*(pageNum-1)+1:0)}}~{{pageSize*(pageNum-1)+(tableData?tableData.length:0)}}条，共{{totalNum}}条&nbsp;&nbsp;共{{totalPage}}页</span>
        <el-pagination layout="prev, pager, next" :total="totalPage*10" @current-change="current_change" @click='IndextheData'></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getOrderData} from '../../../api/orderMgt/ordersearch.js'
export default {
    data() {
      return {
        // select_zt: '',
        // select_qy:'',
        // select_ly:'',
        // input_bh:'',
        // input_qy: '',
        // formItem: {
        //   rangeDate: []
        // },
        tableData: [],
        multipleSelection: [],
        orderObj: {
          cust_id: "1",
          order_id: "",
          order_source: "",
          order_status: "",
          cust_name: "",
          formItem:{
            rangeDateVal: []
          }
        },
        pageNum: 1,
        pageSize: 3,
        totalNum:0,
        totalPage:0,

        flag:false
      }
  },
  created(){
    this.getOrderSearchData()
  },
  methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },


    current_change:function(currentPage){
        this.currentPage = currentPage;
        console.log(111111111)
        console.log(this.currentPage)
        // obj = Object.assign({ pageSize: this.pageSize, pageNum: this.currentPage},this.orderObj)
        this.IndextheData();
      },
    IndextheData(obj){
      this.pageNum = this.currentPage;
      this.getOrderSearchData(obj);
    },


    getOrderSearchData(obj){
        obj = Object.assign({ pageSize: this.pageSize, pageNum: this.pageNum },this.orderObj)
        getOrderData(obj).then(res=>{
          console.log('登录响应成功')
          console.log(res);
          let result = res.data;
          // console.log(result)
          if(result.retCode == '200'){
            // console.log(1)
            this.tableData = result.data[0].list;
            this.totalNum = result.data[0].totalRecord;
            this.totalPage = result.data[0].totalPage;
            // this.pageNum = result.data[0].currentPage ? result.data[0].currentPage : 0;
            // this.pageSize = result.data[0].currentPage ? result.data[0].currentPage : 0;
            this.flag = this.totalNum ? false : true;
          }
        })
    },

    getIndexData(obj){
      console.log('this is index data')
      obj = Object.assign(this.orderObj)
      this.getOrderSearchData(obj);
    },

    resetData(obj){
      this.orderObj = {order_id:"",order_source:"",order_status:"",cust_name:"",formItem:{rangeDateVal:[]}};
      this.pageNum = 1, this.pageSize = 3;
      obj = Object.assign({ pageSize: this.pageSize, pageNum: this.pageNum},this.orderObj)
      this.getOrderSearchData(obj);
    }

  },
}
</script>

<style lang="scss" scoped>
#ordersearch-container{
  width:100%;
  // height:calc(100vh-54px);
  // height:100%;
  background-color: #eee;
  padding: 20px;
  .content{
    background-color: #fff;
    h3{
      font-size:16px;
      padding-top: 10px;
      // line-height:34px;
      padding-left: 20px;
    }
    .select{
      display: flex;
      flex-wrap: wrap;
      .sels{
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
          width: 204px;
        }
        .el-input{
          width: 204px;
          height: 35px;
        }
      }
    }
    .button{
      padding-left: 20px;
      // padding-bottom: 10px;
    }
    .footer{
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 20px;
      span{
        i{
          font-size:20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
