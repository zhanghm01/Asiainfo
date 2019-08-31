<template>
  <div id='layout-container'>
    <myslider></myslider>
    <div class="content">
      <myheader></myheader>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '../../components/Header/index.vue';
import myslider from '../../components/Sidebar/index.vue';
import bread from '../../components/Bread.vue'
export default {
  data(){
    return {}
  },
  methods:{

  },
  components:{
    myheader,myslider,bread
  }
}
</script>

<style lang="scss" scoped>
#layout-container[data-v-d7ebeb70] {
  height:100vh;
    // border:1px dashed red;
  display: flex;
  .content{
    width:100%;
    myheader{
      width:100%;
    }
  }
}
</style>
