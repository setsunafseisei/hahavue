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
                        <van-tabs v-model="active" @click="getSubCateGoods">
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
                                <div class="list-item" v-for="item in list" :key="item">
                                    {{item}}
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

            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve()
                },800)
            }).then(()=>{
                if(this.category.length>0) {
                    this.getCategorySubByCategoryId();
                }
            }).catch((err)=>{
                console.log(err)
            })


        },
        methods:{
            getSubCateGoods(index, title){
                let activeCateSub = this.categorySub[index];// 通过循环的索引找到当前选中对象
                let sub_id = activeCateSub.sub_id , id = activeCateSub.id 
                this.$axios({
                    url:url.getSubCateGoods,
                    method:"post",
                    data:{
                        sub_id:sub_id,
                        id:id,
                        token:localStorage['token'],
                    }
                })
                
                
            },
            getCategoryList(){
                this.$axios({
                    url:url.categoryList,
                    method:'post',
                    data:{
                        token:localStorage['token'],
                    }
                })
                .then(res=>{
                    var res = res.data;

                    if (res.code==1) {
                        this.category = res.data
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
            clickCategory(index,categoryId){
                this.categoryIndex=index
                this.getCategorySubByCategoryId(categoryId)
            },
            getCategorySubByCategoryId(categoryId=1){
                // console.log(categoryId);
                // console.log(this.category);
                this.category.forEach(each => {
                    if (each.id == categoryId) {
                        this.categorySub = each.goods_category_sub
                        // console.log(this.categorySub);
                        this.active=0
                        // this.onLoad()
                    }                    
                });
            },
            onLoad() {
                setTimeout(() => {

                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    this.loading = false;

                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
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
            }
        },

        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("leftNav").style.height = winHeight - 46 + 'px'
            document.getElementById('list-div').style.height=winHeight-90 +'px'
        }
        
    }
</script>

<style scoped>
    .list-item{
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    #list-div{
        overflow: scroll;
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