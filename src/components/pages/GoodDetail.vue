<template>
    <div class="good-detail">
        <div class="navbar-div">
            <van-nav-bar 
                title="商品详情"
                left-text="返回"
                left-arrow
                @click="goBack"
            />
        </div>

        <div class="top-image-div">
            <img :src="goodsInfo.image1" width="100%">
        </div>

        <div class="goods-name">
            {{goodsInfo.name}}
        </div>

        <div class="goods-price">
            价格:￥ {{goodsInfo.present_price | moneyFilter}}
        </div>

        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.detail">

                    </div>
                </van-tab>
                <van-tab title="评价">
                    暂无
                </van-tab>
            </van-tabs>
        </div>

        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>

    </div>

    
</template>

<script>
// console.log(localStorage.getItem('token'));
// console.log(localStorage['token']);

    import url from '@/serviceApi.conf'
    import { toMoney } from '@/filter/moneyFilter.js'
    import { Toast } from 'vant' // 弹层

    export default {
        created(){
            
            // 获取 页面 传递的 数据
            this.goodsId = this.$route.query.goodsId
            console.log(this.goodsId);
            
            // 去后端接口 查数据
            this.getInfo();
        },
        data(){
            return{
                goodsId:'',
                goodsInfo:{}
            }
        },
        methods:{
            getInfo(){
                this.$axios({
                    
                    url:url.getGoodDetail,   
                    method:'post',
                    data:{
                        token: localStorage['token'],
                        good_id:this.goodsId,
                    }
                })
                .then(res=>{
                    res = res.data;
                    if (res.code==1) {

                        console.log(res.data);
                        this.goodsInfo = res.data

                    } else if (res.code==0) {
                        Toast.fail(res.msg)
                        if (res.err_code==1007) {
                            this.$router.push({name:'Login'})
                        } else {
                            Toast.fail('网络错误')
                        }
                    } else {
                        Toast.fail('网络错误')
                    }
                })
                .catch(err=>{
                    console.log(err);     
                    Toast.fail('网络错误')               
                })
            },
            goBack(){
                this.$router.go(-1)
            },  
        },
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        
    }
</script>

<style scoped>
    .goods-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;

        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }

    .goods-bottom>div{
        flex: 1;
        padding: 5px;   
    }



   .detail{
     font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
</style>