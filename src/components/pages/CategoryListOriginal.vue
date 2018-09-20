<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>

        <div>
            <van-row>
                 <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.id)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index">
                                {{item.mall_category_name}}
                            </li>
                        </ul>
                    </div>
                </van-col>
    
                <van-col span="18">

                    <div class="tabCategorySub">
                        <!-- <van-tabs v-model="active" @click="getSubCateGoods"> -->
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.mall_sub_name">
                            </van-tab>
                        </van-tabs>
                    </div>

                    <div id="list-div">

                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">

                            <van-list
                            v-model="loading"
                            :finished="finished"
                            @load="onLoad"
                            >
                            <div class="list-item" v-for="(item,index) in list" :key="index" @click="goodsInfo(item.good_id)">
                                <div class="list-item-img"><img :src="item.image1" :onerror="errorImg" width="100%"/></div>
                                <div class="list-item-text">
                                    <div>{{item.name}}</div>
                                    <div class="">￥{{item.ori_price}}</div>
                                </div>
                            </div>
                        </van-list>

                        </van-pull-refresh>
                    </div>
                    
                </van-col>
            </van-row>
        </div>
        

    </div>
</template>

<script>
    import url from '@/serviceApi.conf'
    import { Toast } from 'vant' // 弹层
    export default {
        created() {
            // 去后端接口 查数据
            this.getCategoryList();

            // new Promise((resolve,reject)=>{
            //     setTimeout(()=>{
            //         resolve()
            //     },100)
            // }).then(()=>{
            //     if(this.category.length>0) {
            //         this.getCategorySubByCategoryId();
            //     }
            //     if(this.categorySub.length>0) {
                    
            //         console.log('created')
            //         this.getSubCateGoods(0,0)
            //     }
            // }).catch((err)=>{
            //     console.log(err)
            // })

        },
        methods:{
            
            // 分类数据获取
            getCategoryList(){
                this.$axios({
                    url:url.categoryList,
                    method:'post',
                    data:{
                        token:localStorage['token'],
                    }
                }).then(res=>{
                    var res = res.data;
                    if (res.code==1) {
                        this.category = res.data

                        this.getCategorySubByCategoryId()

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
                }).catch(err=>{
                    console.log(err);  
                    // Toast.fail('网络错误')
                })
            },
            // 点击大类 自动 输出子类数据
            clickCategory(index,categoryId){
                this.clickable = false;
                this.categoryIndex=index
                this.page=1
                this.finished = false
                this.list=[]
                this.getCategorySubByCategoryId(categoryId)
            },
            // 获取子类 列表 数据
            getCategorySubByCategoryId(categoryId=1){
                
                this.$axios({
                    method:'post',
                    url:url.categorySubList,
                    data:{token:localStorage['token'],category_id:categoryId}
                }).then(res=>{
                    var res = res.data;
                    if (res.code==1) {
                        this.categorySub = res.data
                        this.active=0
                        this.categorySubId = this.categorySub[0].sub_id
                        // this.onLoad()
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
                    
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 点击获取 当前选中子类的 属性值 以便传给 查询产品的接口
            onClickCategorySub(index,title){
                this.categorySubId = this.categorySub[index].sub_id
                // console.log('categorySubId:'+this.categorySubId)
                this.goodList=[]
                this.finished = false
                this.page = 1
                this.onLoad()
            },
            // 根据选择的子类 获取产品列表数据
            getSubCateGoods(){
                // console.log(this.categorySubId);
                
                this.$axios({
                    url:url.getSubCateGoodsList,
                    method:"post",
                    data:{
                        category_sub_id:this.categorySubId,
                        token:localStorage['token'],
                        page:this.page
                    }
                }).then(res=>{
                    var res = res.data
                    var list = res.data.data

                    if (res.code==1) {

                        this.page++

                        console.log(this.list);
                        console.log(list);
                        

                        if (this.page > res.data.last_page){
                            this.list=list
                            this.finished = true
                        } else {
                            this.list=this.list.concat(list)
                        }

                    } else if (res.code==0) {
                        Toast.fail(res.msg)
                        if (res.err_code==1007) {
                            this.$router.push({name:'Login'})
                        } else {
                            this.finished = true
                            Toast.fail('网络错误')
                        }
                    } else {                     
                        this.finished = true
                        Toast.fail('网络错误')
                    }

                    this.loading=false;

                }).catch(err=>{
                    console.log(err);  
                    this.$router.go(0)
                    // Toast.fail('网络错误')
                })              
            },
            goodsInfo(id){
                this.$router.push({name:'GoodDetail',params:{goodsId:id}})
            },
            //上拉加载方法
            onLoad() {
                setTimeout(() => {
                    this.categorySub = this.categorySub ? this.categorySub : [{sub_id:0}]
                    this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].sub_id
                    this.getSubCateGoods()
                },888)

            },
            //下拉刷新方法
            onRefresh(){
                setTimeout(() => {
                    this.page=1
                    this.isRefresh = false;
                    this.finished = false;
                    this.list=[];
                    this.onLoad()    
                }, 500);
            }
        },
        data(){
            return{
                category:[], // 大类
                categoryIndex:0, // 默认选中第一个 类别
                categorySub:[], // 子类
                active:0,    //激活标签的值
                //  List vant组件
                list: [],
                loading:false,   //上拉加载使用
                finished:false,  //下拉加载是否没有数据了
                // PullRefresh vant组件
                isRefresh:false, //下拉加载
                page:1,
                categorySubId:'', // 子类分类 id
                errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
                clickable:true // 是否可点击
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('leftNav').style.height=winHeight-46-50 +'px'
            document.getElementById('list-div').style.height=winHeight-90-50 +'px'
        },
        
    }
</script>

<style scoped>
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }

    #leftNav{
        font-size: 0.8rem;
        line-height: 2rem;
        border-bottom: 1px solid #e4e7ed;
        padding: 3px;
        text-align: center;
        /* position: fixed;
        top: 46px;
        left: 0; */
    }
    .categoryActive{
        background-color: #fff;
    }
</style>