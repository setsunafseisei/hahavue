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
            <div class="rcmd-body">
                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="rcmd-item">
                            <!-- <img v-lazy="item.image" width="80%" /> -->
                            <img :src="item.image" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>            
                <!-- <div class="swiperComponentTest">
                    <swiperDefault></swiperDefault> 
                    <swiperDefaultVertical></swiperDefaultVertical>
                    <swiperDefaultPageBar></swiperDefaultPageBar>
                    <swiperDefaultText></swiperDefaultText>
                </div> -->
            </div>
        </div>

        <!-- 商品楼层 -->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>

        <!-- 热卖商品 -->
        <div class="hot">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info-component :goodsName="item.name" :goodsImg="item.image" :goodsPrice="item.price"></goods-info-component>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    // 引入  vue-awesome-swiper
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from "vue-awesome-swiper"
    // 引入自己封装的各种样式的滑动 组件    /*import swiperDefault from '../swiper/swiperDefault'    import swiperDefaultVertical from '../swiper/swiperDefault-vertical'import swiperDefaultPageBar from '../swiper/swiperDefault-pageBar'import swiperDefaultText from '../swiper/swiperDefault-text' */
    // 引入 自己做的 floor 组件
    import floorComponent from '../component/floorComponent'
    // 引入 金额相关计算函数
    import { toMoney } from '@/filter/moneyFilter.js'// @代表的是src目录,在/build/webpack.base.conf.js配置
    // 引入 产品信息 组件
    import goodsInfoComponent from '../component/goodsInfoComponent'
    // 引入 url 常量
    import url from '@/serviceApi.conf.js'

    export default {
        
        // 输出允许使用  vue-awesome-swiper 
        components:{ 
            swiper, swiperSlide, floorComponent, goodsInfoComponent,
            /*这是自己封装的 滑动组件*/
            // swiperDefault,swiperDefaultVertical,swiperDefaultPageBar,swiperDefaultText 
            },
        data() {
            return {
                swiperOption:{
                    slidesPerView: 2,
                },
                locationIcon: require('../../assets/images/location.png'),  // 图片直接require进来 一边 build 打包的时候不出错
                swpPicArr:[
                    {imgUrl:require('./../../assets/images/swpPic001.jpg')},
                    {imgUrl:require('./../../assets/images/swpPic002.jpg')},
                    {imgUrl:require('./../../assets/images/swpPic003.jpg')}
                ],
                category:[], // 产品分类
                recommendGoods:[], // 推荐商品
                floor1:[], // 一层商品(vue对多维数组取值 不友好 需要把下面的键 放到几个变量中))
                floor2:[], // 
                floor3:[], // 
                floorName:[],
                hotGoods:[],
                loading: false,
      finished: false
            }
        },
       
        created(){
            axios({
                // url: 'https://www.easy-mock.com/mock/5b8e1d49ae6b714d1bc700c9/hahavue/goodsList/',
                url: url.getGoodsInfo,
                method: 'get',
            })
            .then(res => {
                console.log(res)
                if (res.status==200) {
                    let resData = res.data.data
                    this.category = resData.category;
                    this.recommendGoods = resData.recommend;
                    this.floor1 = resData.floor1;
                    this.floor2 = resData.floor2;
                    this.floor3 = resData.floor3;
                    this.floorName = resData.floorName;
                    this.hotGoods = resData.hotGoods           
                }

            })
            .catch((error) => {     
                console.log(error)
                alert('产品数据异常')
            })
        },
        
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
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
    overflow: hidden;
    max-height:15rem;
}
.swp-box{
    /*处理轮播下方点点位置*/
    height: 9rem;
}
/*flex  布局 详解 http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html */
.type-bar{
    background-color: #fff;
    margin:.3rem ;
    border-radius: .3rem;
    font-size:14px;
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
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
.recommend{
    background-color: #fff;
    margin-top: .3rem;
}
.rcmd-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: 0.2rem;
    color:#e5017d;
}
.rcmd-body{
    /* width: 20rem; */
    width: 100%;
    border-bottom: 1px solid #eee;
}
.rcmd-item{
    width:99%;
    border-right:1px solid #eee;
    font-size:12px;
    text-align: center;
}
.hot{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
}
.hot-title{
    color:#e5017d;
    font-weight: 600;
}
.hot-goods{
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
.hot .van-col{
    border-bottom: #eee 1px solid;
    border-right: #eee 1px solid;
}
    
</style>