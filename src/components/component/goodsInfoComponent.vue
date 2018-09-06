<template>
    <div class="goods-info">
        <div class="goods-img">
            <img v-lazy="goodsImg" width="90%">
        </div>
        <div class="goods-name">{{ goodsName }}</div>
        <div class="goods-price"> ￥ {{goodsPrice | moneyFilter}} </div>
    </div>
</template>

<script>
    import { toMoney } from '@/filter/moneyFilter.js'
    export default {
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        props:['goodsImg','goodsName','goodsPrice'],        
    }
</script>

<style scoped>
.goods-name{
    padding: 0 8px;
    /*通过下面三个属性可以设置一行文字最后部分以...显示*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
}
</style>