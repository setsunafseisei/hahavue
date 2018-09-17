const BASEURL = " https://www.easy-mock.com/mock/5b8e1d49ae6b714d1bc700c9/hahavue/"

// const LOCALURL = 'http://www.hahavue.cn/'
const LOCALURL = '/api/'


const URL = {
    getGoodsInfo:BASEURL + 'goodsList',
    registerUser:LOCALURL+'register',   //用户注册接口
    userLogin:LOCALURL+'login',   //用户登录接口
    getGoodDetail:LOCALURL+'goodInfo', // 获取产品详情接口 post id
    categoryList:LOCALURL+'Goods/categoryList', // 获取产品分类 
    categorySubList:LOCALURL+'Goods/categorySubList', // 获取产品分类 
    getSubCateGoods:LOCALURL+'Goods/goodsList', // 获取产品列表（根据对应条件） 
}

module.exports = URL