<template>
    <div class="cart">
        <div class="navbar-div">
            <van-nav-bar   title="购物车" /> 
        </div>

        <div class="cart-list">
            <div class="each-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="each-img">
                    <img :src="item.image" width="100%" />
                </div>

                <div class="each-text">
                    <div class="each-goods-name">{{item.name}}</div>
                    <div class="each-control">
                        <van-stepper v-model="item.count" integer @change="countChange(item.count,index)" />
                    </div>
                </div>

                <div class="each-price">
                    <div>￥ {{item.price | moneyFilter}}</div>
                    <div>× {{item.count}}</div>
                    <div class="all-price">￥ {{item.price*item.count | moneyFilter}}</div>

                </div>
            </div>
        </div>
        <!--显示总金额-->
        <div class="totalMoney">
            商品总价: ￥ {{totalMoney | moneyFilter}}
        </div>

        <!--清空购物车-->
        <div class="card-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>

<script>
    import url from '@/serviceApi.conf'
    import { toMoney } from '@/filter/moneyFilter.js'
    import { Toast } from 'vant' // 弹层
    export default {
        created(){
            this.getCartInfo()
        },
        data(){
            return{
                isEmpty:false, // 购物车是否为空
                cartInfo:[], // 购物车中的商品
            }
        },
        methods:{
            // 修改购物车数量
            countChange(count,index){
                this.cartInfo[index].count = count
                localStorage.cartInfo = JSON.stringify(this.cartInfo)
                
            },
            // 清空购物车操作
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo=[]
            },
            // 获取购物车商品
            getCartInfo(){
                if ( localStorage.cartInfo ) {
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }

                console.log(' this.cartInfo:'+JSON.stringify( this.cartInfo))
                this.isEmpty = this.cartInfo.length>0 ? true:false
            }
        },
        computed:{
            totalMoney(){
                let allmoney = 0
                this.cartInfo.forEach((item,index)=>{
                    allmoney += item.price * item.count
                })
                localStorage.cartInfo = JSON.stringify(this.cartInfo)
                return allmoney
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        }
    }
</script>

<style scoped>
.totalMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
}
.cart-list{
    background-color: #fff;
}
.each-row{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #E4E7ED;
}
.each-img{
    flex:6;
}
.each-text{
    flex: 12;
    padding-left: 10px;
}
.each-price{
    flex: 6;
    text-align: right;
}
.each-control{
    padding: 5px 0;
}
.card-title{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
}
</style>