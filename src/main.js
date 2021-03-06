// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

Vue.prototype.$axios=axios; // 把 axios 做成全局变量 通过  this.$axios  调用

// 直接引入 vant 库 和 vant 样式
/*
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(Vant)
*/

// 使用 babel-plugin-import 按需求 引入 vant 中对应的组件（不需要专门引入样式）
import {Button, Col, Row, Swipe, SwipeItem, Lazyload, Cell, Field, NavBar,Tabs,Tab,List,PullRefresh,Stepper,Tabbar, TabbarItem  } from 'vant' 

Vue.use(Button).use(Col).use(Row).use(Swipe).use(SwipeItem).use(Lazyload).use(Cell).use(Field).use(NavBar).use(Tabs).use(Tab)
.use(List).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


