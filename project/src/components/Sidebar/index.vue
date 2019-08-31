<template>
  <div id='slider-container' :style="{width: `${this.$store.state.handleCollapse ? 50 : 250}px`}">
    <!-- <el-row class="tac"> -->
    <div class="logo" >
      <img class="vtm" width="44" height="40" src alt>
      <span v-if="!this.$store.state.handleCollapse" class="vtm ml5">DC-Bond 业务系统</span>
    </div>
    <div class="over">

    </div>
    <el-col>
    <!-- <el-col :span="6"> -->
      <el-menu
        router :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2b2c40"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/layout/rhome">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订购管理</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item @click="checkNav()" index="/layout/orderSearch">订单查询</el-menu-item>
            <el-menu-item index="/layout/orderUpdate">变更订购</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>业务管理</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="/layout/custManage">客户管理</el-menu-item>
            <el-menu-item index="/layout/orderManage">订单查询</el-menu-item>
            <el-menu-item index="/layout/prodManage">业务查询</el-menu-item>
            <el-menu-item index="/layout/oweManage">欠费管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>资源管理</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-submenu index="3-1">
              <template slot="title">网关资源管理</template>
                <el-menu-item index="/layout/preManage">前置网关信息管理</el-menu-item>
                <el-menu-item index="/layout/prepeManage">前置网关单元/PE管理</el-menu-item>
                <el-menu-item index="/layout/prevpnManage">前置网关单元VPN管理</el-menu-item>
                <el-menu-item index="/layout/conManage">汇聚网关信息管理</el-menu-item>
                <el-menu-item index="/layout/conpeManage">汇聚网关单元/PE管理</el-menu-item>
                <el-menu-item index="/layout/convpnManage">汇聚网关单元VPN管理</el-menu-item>
            </el-submenu>
                <el-menu-item index="/layout/areaManage">POP接入区域管理</el-menu-item>
                <el-menu-item index="/layout/vpnManage">VPN资源管理</el-menu-item>
                <el-menu-item index="/layout/vlanManage">VLAN ID管理</el-menu-item>
                <el-menu-item index="/layout/ipManage">汇聚/前置互联IP段管理</el-menu-item>
                <el-menu-item index="/layout/wgtypeManage">网关设备类型管理</el-menu-item>

                <el-menu-item index="/layout/boxtypeManage">盒子设备类型管理</el-menu-item>
                <el-menu-item index="/layout/boxManage">接入盒子信息管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/layout/deliverManage">
          <i class="el-icon-setting"></i>
          <span slot="title">发货管理</span>
          </el-menu-item>
          <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item-group>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="/layout/userManage">用户管理</el-menu-item>
            <el-menu-item index="/layout/roleManage">角色管理</el-menu-item>
            <el-menu-item index="/layout/authoManage">权限管理</el-menu-item>
            <el-menu-item index="/layout/cooManage">合作伙伴管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/layout/proManage">
          <i class="el-icon-setting"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/funManage">
          <i class="el-icon-setting"></i>
          <span slot="title">性能管理</span>
        </el-menu-item>
        <el-menu-item index="/layout/overView">
          <i class="el-icon-setting"></i>
          <span slot="title">全局可视化查询</span>
        </el-menu-item>
        <el-menu-item index="/layout/poto">
          <i class="el-icon-setting"></i>
          <span slot="title">组网拓扑查询</span>
        </el-menu-item>
        <el-menu-item index="/layout/vispoto">
          <i class="el-icon-setting"></i>
          <span slot="title">组网拓扑查询VIS</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!-- </el-row> -->
  </div>
</template>

<script>
export default {
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      checkNav(){
        // const path = this.$route.path;
        // this.$store.dispatch('changePath',path);
      }
    },
    name:'Sidebar',
    mounted(){
      const path = this.$route.path;
      this.$store.dispatch('changePath',path);
    }
}
</script>

<style lang="scss" scoped>
#slider-container{
  // overflow: hidden;
  // height:100%;
  display: table-cell;
  background-color: #2b2c40;
  .logo{
    height: 54px;
    padding-left: 58px;
    background-color: #2b2c40;
    width: 220px;
    line-height:54px;
    font-size:14px;
    color:#fff;
  }
  ul.el-menu-vertical-demo.el-menu{
    width: 220px;
    border:0;
    li.el-menu-item-group{
          div.el-menu-item-group__title{
      padding: 0;
    }
    }

  }
}
.el-menu-item-group__title{
  padding: 0;
}
// .el-submenu__icon-arrow{
//   right: 0;
//   left: 180px;
// }
</style>
