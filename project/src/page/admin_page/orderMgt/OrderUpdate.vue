<template>
  <div id='ordersearch-container'>
    <div class="content">
      <h3>节点信息查询</h3>
      <hr>
      <!-- 条件查询的条件选择部分 -->
      <div class="select">
            <!--  <div class="sels">
                    <el-input placeholder="请输入省份名称" v-model="orderObj.province" clearable></el-input>
                  </div>
                  <div class="sels">
                    <el-input placeholder="请输入城市名称" v-model="orderObj.city" clearable></el-input>
                  </div>
                  <div class="sels">
                    <el-input placeholder="请输入地区名称" v-model="orderObj.district" clearable></el-input>
                  </div>
                  <div class="sels">
                    <el-input placeholder="请输入机房名称" v-model="orderObj.dc_address" clearable></el-input>
                  </div>-->
        <el-select v-model="orderObj.province" @change="choseProvince" placeholder="省级地区">
          <el-option v-for="(item,$index) in province" :key="$index" :label="item.value" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="orderObj.city" @change="choseCity" placeholder="市级地区">
          <el-option v-for="(item,$index) in city" :key="$index" :label="item.value" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="orderObj.district" @change="choseBlock" placeholder="区级地区">
          <el-option v-for="(item,$index) in block" :key="$index" :label="item.value" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="orderObj.dc_address" @change="choseJF" placeholder="机房地址">
          <el-option v-for="(item,$index) in jf" :key="$index" :label="item.value" :value="item.value"></el-option>
        </el-select>
        <div>
        </div>
      </div>
      <!-- 查询 重置 按钮 -->
      <div class="button">
        <el-button type="primary" @click='getIndexData'>查询</el-button>
        <el-button @click='resetData'>重置</el-button>
      </div>
      <hr>
      <!-- 添加 批量删除按钮 -->
      <div class="button">
        <el-button type="primary" icon="el-icon-edit" style='font-size:8px;' @click='beginAdd'>添加</el-button>
        <el-button type="primary" icon="el-icon-edit" style='font-size:8px;' @click='beginDelete'>批量删除</el-button>
      </div>
      <hr>
      <!-- 数据表格区域 -->
      <div class="table">
        <el-table @row-click="handleEdit" :data="tableData" border style="width: 100%">
          <el-table-column prop="dc_ADDR_ID" label="序号" width="100"> </el-table-column>
          <el-table-column prop="province" label="省" width="100"> </el-table-column>
          <el-table-column prop="city" label="市" width="100"> </el-table-column>
          <el-table-column prop="district" label="区" width="100"> </el-table-column>
          <el-table-column prop="dc_ADDRESS" label="机房地址" width="280"> </el-table-column>
          <el-table-column prop="dc_NAME" label="机房名称" width="150"> </el-table-column>
             <el-table-column label="操作">
              <el-button type="text" size="small" @click='beginModify'>修改</el-button>
              <el-button type="text" size="small" @click='beginDelete' class='hahaha'>删除</el-button>
          </el-table-column>
        </el-table>
      </div>
      <!-- 底部分页部分 -->
      <div class="footer" v-if='flag'>
        <span>第{{pageNum}}页&nbsp;&nbsp;第{{pageSize*(pageNum-1)+1}}~{{pageSize*(pageNum-1)+tableData.length}}条，共{{totalNum}}条&nbsp;&nbsp;共{{totalPage}}页</span>

        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"       :page-sizes="[1, 2, 3, 4, 5]" :page-size="3" layout="total, sizes, prev, pager, next, jumper" :total="8">
    </el-pagination> -->
      <el-pagination @size-change="handleSizeChange" @current-change="current_change" :current-page.sync="currentPage" :page-sizes="[2, 3, 4, 5, 6, 8, 10]" :page-size="3" layout="sizes, prev, pager, next" :total="(totalNum)" @click='IndextheData'>
      </el-pagination>

        <!-- 原来自己写的分页，只有上下页 -->
<!--         <span>
          <i class='el-icon-arrow-left'  @click='getPrevOrderSearchData'></i>
          <i class='el-icon-arrow-right'  @click='getNextOrderSearchData'></i>
        </span>
        <el-pagination layout="prev, pager, next" :total="totalPage*10" @current-change="current_change" @click='IndextheData'></el-pagination> -->

      </div>
      <!-- 增改删时需要出现三个遮罩层 -->
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
              <!-- <div class="opes">
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
              </div> -->
              您将删除以下数据：XXX
              确认删除？
            </div>
          <div class="btns">
            <el-button type="primary" @click='saveDelete'>确定删除</el-button>
            <el-button @click='cancelDelete'>取消删除</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="modify" v-if='ismodify'>
        <div class="addbox" v-if='ismodify'>
            <el-button type="primary" @click='saveModify'>查询</el-button>
        </div>
      </div> -->
      <!-- <div class="delete" v-if='isdelete'>
        <div class="addbox" v-if='isdelete'>
            <el-button type="primary" @click='saveDelete'>查询</el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {getJieDianData, addJieDianData, modifyJieDianData, deleteJieDianData} from '../../../api/orderMgt/jiedian.js'
export default {
    data() {
      return {
        currentPage:1,
        select: '',
        select1:'',
        tableData: [],
        multipleSelection: [],
        orderObj: {
          province:"",
          city:"",
          district:"",
          dc_address:""
        },
        pageNum: 1,
        pageSize: 3,
        totalNum:0,
        totalPage:0,

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

        flag:true,
        isopen:false,
        isadd:false,
        ismodify:false,
        isdelete:false
      }
  },
  created(){
    this.getCityData()
    this.getOrderSearchData()
    // this.current_change()
  },
  methods: {

    //改变每页显示的条数
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getOrderSearchData()
      },

    // 分页时点击之后当前数字变化时，获取当前的页码，请求对应页码的数据
    current_change:function(currentPage){
        this.currentPage = currentPage;
        console.log(111111111)
        console.log(this.currentPage)
        // obj = Object.assign({ pageSize: this.pageSize, pageNum: this.currentPage},this.orderObj)
        this.IndextheData();
      },
      // 请求指定页码的数据，主要用于分页点击
    IndextheData(obj){
      this.pageNum = this.currentPage;
      this.getOrderSearchData(obj);
    },

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

    // 使用axios和响应参数获取数据，参数为空获取全部数据，参数不空获取对应数据
    getOrderSearchData(obj){
        obj = Object.assign({ pageSize: this.pageSize, pageNum: this.pageNum},this.orderObj)
        // console.log(obj)
        // console.log('order--data')
        getJieDianData(obj).then(res=>{
          // console.log('登录响应成功')
          // console.log(res)
          let result = res.data;
          // console.log(result)
          if(result.retCode == '200'){
            // console.log(1)
            this.tableData = result.data[0].list;
            this.totalNum = result.data[0].totalRecord;
            this.totalPage = result.data[0].totalPage;
            // this.pageNum = result.data[0].currentPage ? result.data[0].currentPage : 0;
            // this.pageSize = result.data[0].currentPage ? result.data[0].currentPage : 0;
            this.flag = this.totalNum ? true : false;
            this.pageNum = result.data[0].currentPage;
          }
        })
    },
/*     // 原来自己写的点击上一页请求数据
    getNextOrderSearchData(obj){
      if(this.pageNum <2)
      {
        this.pageNum++;
        this.getOrderSearchData(obj);
      }
      else{
        alert('没有数据了')
      }
    },
    // 原来自己写的点击下一页请求数据
    getPrevOrderSearchData(obj){
      if(this.pageNum>1){
        this.pageNum--;
        this.getOrderSearchData(obj);
      }
      else{
        alert('这是第一页数据')
      }
    }, */
    // 点击查询按钮时获取条件查询的数据
    getIndexData(obj){
        console.log('this is index data')
        obj = Object.assign(this.orderObj)
        this.getOrderSearchData(obj);
    },
    // 点击重置按钮时，将条件选择框中的值置为空，并重新获取全部数据
    resetData(obj){
        this.orderObj = {province:"",city:"",district:"",dc_address:""};
        this.pageNum = 1, this.pageSize = 3;
        obj = Object.assign({ pageSize: this.pageSize, pageNum: this.pageNum},this.orderObj)
        this.getOrderSearchData(obj);
    },



    // 点击新增按钮，开遮罩
    beginAdd(){
      this.isopen = true;
      this.isadd = true;
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

    // 对表格进行操作时，先显示对应表格的信息
    handleEdit(row) {
      console.log(row)
      this.modifyObj.PROVINCE = row.province;
      this.modifyObj.CITY = row.city;
      this.modifyObj.DISTRICT = row.district;
      this.modifyObj.DC_NAME = row.dc_NAME;
      this.modifyObj.DC_ADDRESS = row.dc_ADDRESS;
      this.modifyObj.ADDR_ID_YLW = row.addr_ID_YLW;
      this.modifyObj.DC_ADDR_ID = row.dc_ADDR_ID;
      // this.deleteObj[0].DC_ADDR_ID = row.dc_ADDR_ID;
      this.deleteObj.push(
        {DC_ADDR_ID:row.dc_ADDR_ID}
      )
    },

    // 点击修改按钮，开遮罩
    beginModify(){
      this.isopen = true;
      this.ismodify = true;
    },
    // 修改的数据，点击保存
    saveModify(){
      // 点击确认保存修改时，需要先判断内容是否完整，如果没有填完整数据，否则需要进行提示，且保存按钮点击失败
      if(Object.keys(this.modifyObj).every(key => this.modifyObj[key] != "")){
            // console.log(this.newObj)
            return ((obj)=>{
              console.log('修改的数据参数')
            console.log(this.modifyObj)
            obj = Object.assign(this.modifyObj)
            modifyJieDianData(obj).then(res=>{
              console.log('修改数据响应成功')
              console.log(res)
              let result = res.data;
              if(result.retCode == '200'){
                // alert('修改成功')
                console.log('ok')
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
            this.ismodify = false;
            //请求完数据后需要将本次新增的数据置为空，否则下次点击新增时仍然会保留上次的数据
            // Object.keys(this.newObj).map(key => this.newObj[key] = "")
          })()
      }
      else{
        alert('还有内容没写')
      }
      this.isopen = false;
      this.ismodify = false;
      console.log('修改试试')
      // console.log(this.newObj)
    },
    cancelModify(){
      this.isopen = false;
      this.ismodify = false;
      // 取消修改时，点击之后应该还是原来的数据
    },


    // 删除的数据，开遮罩
    beginDelete:function(){
      this.isopen = true;
      this.isdelete = true;
    },
    // 确认删除，点击确定
    saveDelete(){
      return ((obj)=>{
        console.log('要发送的数据参数')
        obj = Object.assign(JSON.parse(JSON.stringify(this.deleteObj)));
        console.log('删除的数据1:',obj)
        deleteJieDianData(obj).then(res=>{
          console.log('删除数据响应成功');
          console.log(res);
          let result = res.data;
          if(result.retCode == '200'){
            // alert('删除成功')
            console.log('ok')
            this.orderObj = {province:"",city:"",district:"",dc_address:""};
            var obj1 = Object.assign({ pageSize: this.pageSize, pageNum: this.pageNum},this.orderObj)
            this.getOrderSearchData(obj1);
            console.log('删除完重新获取了数据')
            // this.currentPage = 1;
            // this.resetData()
          }
      })
      .catch(err=>{
        console.log(err);
      })
      this.isopen = false;
      this.isdelete = false;
      this.deleteObj = [];
      })()


    },

    cancelDelete(){
      this.isopen = false;
      this.isdelete = false;
    }
  },
}
</script>

<style lang="scss" scoped>
#ordersearch-container{
  width:100%;
  background-color: #eee;
  padding: 20px;
  position: relative;
  .content{
    background-color: #fff;
    h3{
      font-size:16px;
      padding-top: 10px;
      padding-left: 20px;
    }
    .select{
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      // .sels{
      //   display: flex;
      //   margin-right: 5px;
      //   margin-bottom: 20px;
      //   span{
      //     margin-right: 10px;
      //     line-height: 35px;
      //     display: block;
      //     width: 100px;
      //     text-align: center;
      //   }
      //   .el-select{
      //     height: 35px;
      //     width: 204px;
      //   }
      // }
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
        // height: 200px;
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
}
.el-select{
  padding-right: 10px;
}
.el-table .cell{
  display: flex;
}
</style>
