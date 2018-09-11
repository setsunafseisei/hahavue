const BASEURL = " https://www.easy-mock.com/mock/5b8e1d49ae6b714d1bc700c9/hahavue/"

// const LOCALURL = 'http://www.hahavue.cn/'
const LOCALURL = '/api/'


const URL = {
    getGoodsInfo:BASEURL + 'goodsList',
    registerUser:LOCALURL+'register',   //用户注册接口
    userLogin:LOCALURL+'login',   //用户登录接口
}

module.exports = URL