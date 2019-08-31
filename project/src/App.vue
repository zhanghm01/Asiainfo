<template>
  <div id='#app'>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'App',
  // created(){
  //   //全局监听：页面刷新时将store中state的值存到sessionStorage中，然后从sessionStorage中获取，再赋值给store；然后再把session里面存的删除即可，相当于中间件的作用
  //   if(sessionStorage.getItem('store')){
  //     this.$store.replaceState(Object.assign(
  //       {},
  //       this.$route.state,
  //       JSON.parse(sessionStorage.getItem('store'))
  //     ))
  //   };
  //   //页面刷新时将vuex中的信息保存到sessionStorage里面
  //   window.addEventListener('beforeunload',()=>{
  //     sessionStorage.setItem('store',JSON.stringify(this.$store.state))
  //   })
  // },
  // //监听，当路由发生变化的时候执行
  // watch:{
  //   $route(to,from){
  //     if(from.path == '/user/layout/home' && to.path == '/userlayout/prodintro'){
  //       this.$store.state.isAgree = 0;
  //     }
  //   }
  // }
}
</script>

<style>
  /*  */
</style>
