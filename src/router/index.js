import Vue from 'vue'
import Router from 'vue-router'

import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import GoodDetail from '@/components/pages/GoodDetail'
// import CategoryList from '@/components/pages/CategoryListTest' // 多级联动 菜单
import CategoryList from '@/components/pages/CategoryListOriginal' // 多次操作数据库 保证翻页无误
import Cart from '@/components/pages/Cart' // 购物车
import Main from '@/components/pages/Main' // 底部标签

Vue.use(Router)

export default new Router({
  routes: [

    {path:'/register', name:'Register', component:Register},
    {path:'/login', name:'Login', component:Login},
    {path:'/good', name:'GoodDetail', component:GoodDetail}, // 商品详情

    // 底部标签
    {path:'/main', name:'Main', component:Main,
      children:[
        {path:'/', name:'ShoppingMall', component:ShoppingMall}, // 首页
        {path:'/categoryList', name:'CategoryList', component:CategoryList}, // 商品列表
        {path:'/cart', name:'Cart', component:Cart}, // 购物车

      ],
    }, 
  ]
})
