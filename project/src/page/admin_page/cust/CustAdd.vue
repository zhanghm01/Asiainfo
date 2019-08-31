<template>
  <div>
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
  </div>
</template>

<script>
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
        isadd:false,
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>
