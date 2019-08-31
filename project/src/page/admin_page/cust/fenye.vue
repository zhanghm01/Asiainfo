<template>
  <div id='fenye-container'>
    <!-- 父组件通过一个target对象，把父组件的page属性和table数据传给子组件 -->
      <div class="footer" v-if='flag'>
        <span>第{{target.pageNum}}页&nbsp;&nbsp;第{{target.pageSize*(target.pageNum-1)+1}}~{{target.pageSize*(target.pageNum-1)+target.tableData.length}}条，共{{target.totalNum}}条&nbsp;&nbsp;共{{target.totalPage}}页</span>
        <el-pagination @size-change="handleSizeChange" @current-change="current_change" :current-page.sync="currentPage" :page-sizes="[2, 3, 4, 5, 6, 8, 10]" :page-size="target.pageSize" layout="sizes, prev, pager, next" :total="(target.totalNum)" @click='IndextheData'>
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentPage:1,
      flag:true,
    }
  },
  methods:{
    //当前页码变化时获得当前的页面
    handleSizeChange(val) {
        this.target.pageSize = val;
        this.$parent.getOrderSearchData()
      },

    // 分页时点击之后当前数字变化时，获取当前的页码，请求对应页码的数据
    current_change:function(currentPage){
        this.currentPage = currentPage;
        console.log(111111111)
        console.log(this.currentPage)
        this.IndextheData();
      },
    // 请求指定页码的数据，主要用于分页点击
    IndextheData(obj){
      this.target.pageNum = this.currentPage;
      this.$parent.getOrderSearchData(obj);
    },
  },
  props:['target']
}
</script>

<style lang="scss" scoped>
  .footer{
    display: flex;
    justify-content: space-between;
  }
</style>
