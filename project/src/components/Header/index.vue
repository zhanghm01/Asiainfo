<template>
  <div id='header-container'>
    <header>
      <div class="colla">
        <i class="vtm" :class="[isCollapse ? 'i-collapsed' : 'i-collapse']" @click='toggleCollapse()'></i>
      </div>
      <div class="user-options">
        <section>
          <t-dropdown>
            <a href="javascript:void(0)">
              {{this.$store.state.username}}
              <t-icon type="arrow-down-drop"></t-icon>
            </a>
            <t-dropdown-menu slot='list'>
              <t-dropdown-item>修改密码</t-dropdown-item>
              <t-dropdown-item>退出</t-dropdown-item>
            </t-dropdown-menu>
          </t-dropdown>
        </section>
      </div>
    </header>

  </div>
</template>

<script>
export default {
  data(){
    return {
      'isCollapse':false
      // 'isCollapse':this.$store.state.handleCollapse
    }
  },
  methods:{
    toggleCollapse(){
      this.isCollapse = !this.isCollapse;
      this.$store.commit('toggleCollapse',this.isCollapse)
      // console.log('header'+this.isCollapse+'222222')
    }
  }
}
</script>

<style lang="scss" scoped>
#header-container{
  width:100%;
  height: 54px;
  border:1px solid red;
  header{
    width:100%;
    height: 54px;
    // background-color: pink;
    // background-color: #fff;
    padding: 0 22px;
    display: flex;
    justify-content: space-between;
    .colla{
      line-height: 54px;
      i{
        cursor: pointer;
      }
    }
    section{
      vertical-align: middle;
      line-height: 54px;
    }
  }
}

</style>
