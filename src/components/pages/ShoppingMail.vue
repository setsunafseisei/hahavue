<template>
    <div>

        <div class="search-bar">
            <van-row>
                <van-col span="3" class="icon">
                    <img width="100%" :src="locationIcon" class="location-icon">
                </van-col>
                <van-col span="16" class="search-box">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5" class="btn">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: "Shopping Mail",
                locationIcon: require('../../assets/images/location.png'),  // 图片直接require进来 一边 build 打包的时候不出错
            }
        },
    }
</script>

<style scoped>
.search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    text-align: center;
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
</style>