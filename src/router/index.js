import Vue from 'vue'
import Router from 'vue-router'

import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import GoodDetail from '@/components/pages/GoodDetail'
// import CategoryList from '@/components/pages/CategoryListTest' // 多级联动 菜单
import CategoryList from '@/components/pages/CategoryListOriginal' // 多次操作数据库 保证翻页无误

Vue.use(Router)

export default new Router({
  routes: [
    
    {path:'/', name:'ShoppingMall', component:ShoppingMall},

    {path:'/register', name:'Register', component:Register},
    {path:'/login', name:'Login', component:Login},
    {path:'/good', name:'GoodDetail', component:GoodDetail}, // 商品详情
    {path:'/categoryList', name:'CategoryList', component:CategoryList}, // 商品详情

  ]
})
