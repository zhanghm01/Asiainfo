import Vue from 'vue';
import ElementUI from 'element-ui';
import taurus from "aid-taurus-desktop";
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/index.js'
import "aid-taurus-desktop/lib/aid-taurus-desktop.css";
import "./assets/style/reset.scss";
import "./assets/style/ele_custom.scss";
import "./assets/style/icon.scss";
import "../static/css/vis.css"
import App from './App';
import router from './router'
import store from './store'



Vue.use(ElementUI);
Vue.use(taurus);

//开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。(摘于官网说明) 大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
Vue.config.productionTip = false;

new Vue({
  el:'#app',
  router,
  store,
  components:{App},
  template:"<App/>"
})

