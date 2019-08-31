import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    loginId:'',
    roleId:'',
    username:'',
    handleCollapse: false,
    routePath:'',


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


  },
  mutations:{
    toggleCollapse(state,isCollapse){
      state.handleCollapse = isCollapse;
      // console.log('store'+state.handleCollapse+'111111')
    },
    changePath(state,routePath){
      state.routePath = routePath;
    },



    // 加载china地点数据，三级
    getCityData(state){
      // let that = this;
      // that.state.ChineseDistricts.forEach(function(item){
      state.ChineseDistricts.forEach(function(item){
        //省级数据
        // that.state.province.push({id: item.code, value: item.name, children: item.cityList})
        state.province.push({id: item.code, value: item.name, children: item.cityList})
      })
    },
    // 选省
    choseProvince(state,e) {
      // let that = this;
      state.city = [];
      // that.city = [];
      // that.block = [];
      state.block = [];

      for (var index2 in state.province) {
        if (e === state.province[index2].id) {
          state.shi1 = state.province[index2].children
          state.orderObj.province = state.province[index2].value
          state.newObj.PROVINCE = state.province[index2].value
          state.shi1.forEach(function(citem){
            state.city.push({id:citem.code,value: citem.name, children: citem.areaList})
          })
        }
      }
      console.log(state.orderObj.province)
    },
    // 选市
    choseCity(state,e) {
      // let that = this;
      // that.block = [];
      state.block = [];
      for (var index3 in state.city) {
        if (e === state.city[index3].id) {
          state.qu1 = state.city[index3].children
          state.orderObj.city = state.city[index3].value
          state.newObj.CITY = state.city[index3].value
          state.E = state.qu1[0].id
          state.qu1.forEach(function(bitem){
            state.block.push({id:bitem.code,value: bitem.name, children: bitem.jifangList})
          })
        }
      }
      console.log(state.orderObj.city)
    },
    //选区
    choseBlock(state,e) {
      // let that = this;
      for (var index4 in state.block) {
        if (e === state.block[index4].id) {
          state.jf1 = state.block[index4].children
          state.orderObj.district = state.block[index4].value
          state.newObj.DISTRICT = state.block[index4].value
          state.E = state.jf1[0].id
          state.jf1.forEach(function(jitem){
            state.jf.push({id:jitem.code,value: jitem.name, children: []})
          })
        }
      }
      console.log(state.orderObj.district)
    },
    //选机房
    choseJF:function(e) {
      this.orderObj.dc_address=e;
      console.log(this.orderObj.dc_address)
    },



  },
  actions:{
    changePath(ctx,routePath){
      ctx.commit('changePath',routePath)
    }
  },
  getters:{

  }
})
