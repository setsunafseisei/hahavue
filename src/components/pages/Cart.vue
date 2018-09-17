<template>
    <div class="cart">
        <div class="navbar-div">
            <van-nav-bar   title="购物车" /> 
        </div>


        <!--清空购物车-->
        <div class="card-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
    </div>
</template>

<script>
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
        }
    }
</script>

<style scoped>
.card-title{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
}
</style>