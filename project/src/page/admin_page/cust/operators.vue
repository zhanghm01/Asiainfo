<template>
  <div id='operatores-container'>

    <!-- <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column> -->
    <div class="operators" v-if='isopen'>
      <div class="addbox"  v-if='isadd'>
            <div class="content">
              <div class="opes">
                <span>省:</span>
                <el-select v-model="newObj.PROVINCE" @change="choseProvince" placeholder="选择省级地区">
                  <el-option v-for="(item,$index) in province" :key="$index" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="opes">
                <span>市:</span>
                <el-select v-model="newObj.CITY" @change="choseCity" placeholder="请选择市级地区">
                  <el-option v-for="(item,$index) in city" :key="$index" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="opes">
                <span>区:</span>
                <el-select v-model="newObj.DISTRICT" @change="choseBlock" placeholder="请选择区级地区">
                  <el-option v-for="(item,$index) in block" :key="$index" :label="item.value" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="opes">
                <span>名称:</span>
                <el-input placeholder="请输入机房名称" v-model="newObj.DC_NAME" clearable style='width:290px;'></el-input>
              </div>
              <div class="opes">
                <span>地址:</span>
                <el-input placeholder="请输入机房地址" v-model="newObj.DC_ADDRESS" clearable style='width:290px;'></el-input>
              </div>
              <div class="opes">
                <span>ID:</span>
                <el-input placeholder="请输入云联网ID" v-model="newObj.ADDR_ID_YLW" clearable style='width:290px;'></el-input>
              </div>

            </div>
            <div class="btns">
              <el-button type="primary" @click='saveAdd'>确定增加</el-button>
              <el-button @click='cancelAdd'>取消增加</el-button>
            </div>
      </div>
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
      <div class="deletebox" v-if='isdelete'>
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

  </div>
</template>

<script>
import {getJieDianData, addJieDianData } from '../../../api/orderMgt/jiedian.js'
export default {
  data(){
    return {
      newObj:{
          PROVINCE:"",
          CITY:"",
          DISTRICT:"",
          DC_NAME:"",
          DC_ADDRESS:"",
          ADDR_ID_YLW:"",
      },
        modifyObj:{
          PROVINCE:"",
          CITY:"",
          DISTRICT:"",
          DC_NAME:"",
          DC_ADDRESS:"",
          ADDR_ID_YLW:"",
          DC_ADDR_ID:""
        },
        deleteObj:[
          // {DC_ADDR_ID:""}
        ],

        ChineseDistricts:[
          {
              "code":"01",
              "name":"北京市",
              "cityList":[
                {
                  "code":"0101",
                  "name":"北京市",
                  "areaList":[
                    {
                      "code":"010101",
                      "name":"通州区",
                      "jifangList":[
                        {
                          "code":"01010101",
                          "name":"北京市通州区兴光2街中国数码科技港次渠IDC三层3003机房"
                        }
                      ]
                    }
                  ]
                }
              ]
          },
          {
              "code":"0201",
              "name":"上海",
              "cityList":[
                {
                  "code":"0201",
                  "name":"上海",
                  "areaList":[
                    {
                      "code":"020101",
                      "name":"浦东新区",
                      "jifangList":[
                        {
                          "code":"02010101",
                          "name":"上海市浦东新区宁桥路801号金桥二期IDC 4层H区"
                        }
                      ]
                    }
                  ]
                }
              ]
          },
          {
              "code":"03",
              "name":"浙江",
              "cityList":[
                {
                  "code":"0301",
                  "name":"杭州",
                  "areaList":[
                    {
                      "code":"030101",
                      "name":"杭州",
                      "jifangList":[
                        {
                          "code":"03010101",
                          "name":"滨江2号枢纽楼机房"
                        }
                      ]
                    }
                  ]
                }
              ]
          },
          {
              "code":"04",
              "name":"江苏省",
              "cityList":[
                {
                  "code":"0401",
                  "name":"南京市",
                  "areaList":[
                    {
                      "code":"040101",
                      "name":"鼓楼区",
                      "jifangList":[
                        {
                          "code":"04010101",
                          "name":"7777777"
                        }
                      ]
                    }
                  ]
                }
              ]
          },
          {
              "code":"05",
              "name":"吉林市",
              "cityList":[
                {
                  "code":"0501",
                  "name":"通化市",
                  "areaList":[
                    {
                      "code":"050101",
                      "name":"通化县",
                      "jifangList":[
                        {
                          "code":"05010101",
                          "name":"233333332"
                        }
                      ]
                    }
                  ]
                }
              ]
          },
        ],
        province:[],
        shi1: [],
        qu1: [],
        jf1:[],
        city:[],
        block:[],
        jf:[],

        isopen:true,
        isadd:true,
        ismodify:false,
        isdelete:false
    }
  },
  methods:{
       // 加载china地点数据，三级
    getCityData:function(){
      let that = this;
      that.ChineseDistricts.forEach(function(item){
        //省级数据
        that.province.push({id: item.code, value: item.name, children: item.cityList})
      })
    },
    // 选省
    choseProvince:function(e) {
      let that = this;
      that.city = [];
      that.block = [];

      for (var index2 in that.province) {
        if (e === that.province[index2].id) {
          that.shi1 = that.province[index2].children
          that.orderObj.province = that.province[index2].value
          that.newObj.PROVINCE = that.province[index2].value
          that.shi1.forEach(function(citem){
            that.city.push({id:citem.code,value: citem.name, children: citem.areaList})
          })
        }
      }
      console.log(that.orderObj.province)
    },
    // 选市
    choseCity:function(e) {
      let that = this;
      that.block = [];
      for (var index3 in that.city) {
        if (e === that.city[index3].id) {
          that.qu1 = that.city[index3].children
          that.orderObj.city = that.city[index3].value
          that.newObj.CITY = that.city[index3].value
          that.E = that.qu1[0].id
          that.qu1.forEach(function(bitem){
            that.block.push({id:bitem.code,value: bitem.name, children: bitem.jifangList})
          })
        }
      }
      console.log(that.orderObj.city)
    },
    //选区
    choseBlock:function(e) {
      let that = this;
      for (var index4 in that.block) {
        if (e === that.block[index4].id) {
          that.jf1 = that.block[index4].children
          that.orderObj.district = that.block[index4].value
          that.newObj.DISTRICT = that.block[index4].value
          that.E = that.jf1[0].id
          that.jf1.forEach(function(jitem){
            that.jf.push({id:jitem.code,value: jitem.name, children: []})
          })
        }
      }
      console.log(that.orderObj.district)
    },
    //选机房
    choseJF:function(e) {
      this.orderObj.dc_address=e;
      console.log(this.orderObj.dc_address)
    },

        // 新增的数据，点击保存
    saveAdd(){
      // 点击确认保存时，需要先判断内容是否完整，如果没有填完整数据，否则需要进行提示，且保存按钮点击失败
      if(Object.keys(this.newObj).every(key => this.newObj[key] != "")){
            // console.log(this.newObj)
            return ((obj)=>{
            // console.log(this.newObj)
            obj = Object.assign(this.newObj)
            addJieDianData(obj).then(res=>{
              // console.log('新增数据响应成功')
              // console.log(res)
              let result = res.data;
              if(result.retCode == '200'){
                // alert('添加成功')
                // console.log('ok')
                // this.resetData();
                this.orderObj = {province:"",city:"",district:"",dc_address:""};
                var obj1 = Object.assign({ pageSize: this.pageSize, pageNum: this.pageNum},this.orderObj)
                this.getOrderSearchData(obj1);

              }
            })
            .catch(err=>{
                console.log(err);
              })
            this.isopen = false;
            this.isadd = false;
            //请求完数据后需要将本次新增的数据置为空，否则下次点击新增时仍然会保留上次的数据
            Object.keys(this.newObj).map(key => this.newObj[key] = "")
          })()
      }
      else{
        alert('还有内容没写')
      }
    },
    cancelAdd(){
      this.isopen = false;
      this.isadd = false;
      //点击取消时，直接将数据置为空
      Object.keys(this.newObj).map(key => this.newObj[key] = "")
    },
  }
}
</script>

<style lang="scss" scoped>
#operatores-container{
    width:100%;
  background-color: #eee;
  padding: 20px;
  position: relative;
  height: 90vh;
  .operators{
      width:82vw;
      height:90vh;
      position: absolute;
      background-color: rgba(0,0,0,0.2);
      z-index:10;
      left: 0;
      top: 0;
      .addbox,.modifybox,.deletebox{
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
    }
}

</style>
