<template>
    <div>
        <!-- search-bar -->
        <div class="search-bar">
            <van-row>
                <van-col span="3" class="icon">
                    <img width="100%" :src="locationIcon" class="location-icon">
                </van-col>
                <van-col span="16" class="search-box">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5" class="btn">
                    <van-button  type="default" plain size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>

        <!-- banner -->
        <div class="swipe-pic">
            <van-swipe :autoplay="1600" class="swp-box">
                <van-swipe-item v-for="(banner, index) in swpPicArr" :key="index">
                    <!-- <img :src="banner.imgUrl" width="100%"/> -->
                    <img v-lazy="banner.imgUrl" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 产品分类 -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index" class="each-cate">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>

        <!-- recommand 推荐商品 -->
        <div class="recommend">
            <div class="rcmd-title">
                商品推荐
            </div>
            <div class="rcmd-body"></div>
        </div>





    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                locationIcon: require('../../assets/images/location.png'),  // 图片直接require进来 一边 build 打包的时候不出错
                swpPicArr:[
                    {imgUrl:require('./../../assets/images/swpPic001.jpg')},
                    {imgUrl:require('./../../assets/images/swpPic002.jpg')},
                    {imgUrl:require('./../../assets/images/swpPic003.jpg')}
                ],
                category:[],

            }
        },

        created(){
            axios({
                url: 'https://www.easy-mock.com/mock/5b8e1d49ae6b714d1bc700c9/hahavue/goodsList/',
                method: 'get',
            })
            .then(res => {
                console.log(res)
                if (res.status==200) {
                    this.category=res.data.data.category;
                }
            })
            .catch((error) => {     
                console.log(error)
            })

            // fetch 获取列表数据
            // fetch('https://www.easy-mock.com/mock/5b8e1d49ae6b714d1bc700c9/hahavue/goodsList/' , {
            //     method: 'GET',
            //     headers: new Headers({
            //         'Accept': 'application/json' // 通过头指定，获取的数据类型是JSON
            //     }),
            // })
            // .then((res)=>{
            //     return res.json();
            // })
            // .then((res)=>{
            //     console.log(res);
            // })
            // .catch((error) => {     
            //     console.log(error);
            // })
            

        },
    }
</script>

<style scoped>
.search-bar {
    height: 2.4rem;
    background-color: #e5017d;
    line-height: 2.4rem;
    text-align: center;
    overflow: hidden;
}
.location-icon{
    width: 76%;
    padding-top: 0.2rem;
}
.search-input{
    width : 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    border-top:0;
    border-right:0;
    border-left:0;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
}
.swipe-pic{
    width: 100%;
    clear:both;
}
.swp-box{
    /*处理轮播下方点点位置*/
    height: 9rem;
}
.recommend{
    background-color: #fff;
    margin-top: 3rem;
}
.type-bar{
    background-color: #fff;
    margin:.3rem ;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
    /*flex  布局 详解 http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html */
}
.type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}
.each-cate{
    width: 20%;
    margin: 0.1rem;
}
.rcmd-title{
    border-bottom: 1px solid #eee;
}


</style>