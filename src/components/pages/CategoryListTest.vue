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
                            <div class="list-item" v-for="(item,index) in list" :key="index">
                                <div class="list-item-img"><img :src="item.image1" width="100%"/></div>
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

            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve()
                },100)
            }).then(()=>{
                if(this.category.length>0) {
                    this.getCategorySubByCategoryId();
                }
                if(this.categorySub.length>0) {
                    
                    console.log('created')
                    this.getSubCateGoods(0,0)
                }
            }).catch((err)=>{
                console.log(err)
            })


        },
        methods:{
            // 根据选择的子类 获取产品列表数据
            getSubCateGoods(index, title){
                // console.log(index);
                // console.log(title);
                console.log(this.categorySub);
                console.log(5555);
                console.log(this.categorySub[index]);

                this.categorySubIndex = index
                
                let activeCateSub = this.categorySub[index];// 通过循环的索引找到当前选中对象
                

                let sub_id = activeCateSub.sub_id ? activeCateSub.sub_id : 1 , id = activeCateSub.id ? activeCateSub.id : 1
                
                this.sub_id = sub_id

                this.goodList=[]
                this.finished = false
                // this.page=1

                this.$axios({
                    url:url.getSubCateGoods,
                    method:"post",
                    data:{
                        sub_id:sub_id,
                        id:id,
                        token:localStorage['token'],
                        page:this.page
                    }
                }).then(res=>{

                    console.log('res:');
                    console.log(res);
                    
                    var res = res.data;

                    var old_sub_obj = res.data.data

                    var old_sub_id = old_sub_obj.length ? old_sub_obj[0].sub_id : sub_id;
                    
                    if (res.code==1) {
                        var list = res.data.data

                        
                        if (this.page >= list.last_page) {
                            this.finished = true;
                        } else {
                            var new_sub_id = this.list.length!=0 ? this.list[0].sub_id : this.sub_id

                            console.log(new_sub_id);
                            console.log(333);
                            console.log(old_sub_id);
                            
                            // 本次请求的 sub_id 和 上一次请求 sub_id 不通则 更新this.list  否则为追加
                            if (new_sub_id != old_sub_id) {
                                this.page = 1
                                this.list = list
                            } else {
                                
                                this.list = this.list? this.list.concat(list) : list // 每一页的数据都要追加给 this.list
                                this.page++
                                console.log(this.list);
                                console.log('page:'+this.page);

                                // this.getSubCateGoods(index, title); // 继续获取数据

                            }
                        }


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

                    this.loading=false;

                }).catch(err=>{
                    console.log(err);  
                    // Toast.fail('网络错误')
                })
                
                
            },
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
                this.categoryIndex=index
                this.page=1
                this.finished = false
                this.list=[]
                this.getCategorySubByCategoryId(categoryId)
            },
            // 获取子类数据
            getCategorySubByCategoryId(categoryId=1){
                // console.log(categoryId);
                // console.log(this.category);
                this.category.forEach(each => {
                    if (each.id == categoryId) {
                        this.categorySub = each.goods_category_sub
                        this.active=0
                    }                    
                });
            },

            onLoad() {
                setTimeout(() => {
                    console.log('onload')
                    console.log('this.categoryIndex')
                    console.log(this.categorySubIndex)

                    var categorySubObj = this.categorySub[this.categorySubIndex]

                    // console.log('categorySubObj:');
                    // console.log(categorySubObj);
                    // console.log('this.categorySub:');
                    // console.log(this.categorySub);
                    
                    this.sub_id=this.sub_id ? this.sub_id:this.categorySub[0].id
                    // this.getSubCateGoods()  // todo   检查页码加载数据问题时看看

                }, 500);
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.list=[];
                    // this.onLoad()    
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
                sub_id:'', // 子类id

                categorySubIndex : 0
                
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