<template>
    <div class="register">
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack" />
        <div class="register-panel">
            <van-field lable="手机号" v-model="phone" icon="clear" placeholder="请输入手机号" required @click-icon="phone=''" />        
            <van-field lable="密码" v-model="password" placeholder="请输入密码" required />
            <div class="register-btn">
                <van-button type="primary" @click="register" size="large" >马上注册</van-button>
            </div>
        </div>   
    </div>
</template>

<script>
    // import axios from 'axios'
    import url from '@/serviceApi.conf'
    import { encryptPwd } from '@/assets/js/common.js'

    console.log(url.registerUser);
    
    export default {
        data(){
            return{
                phone: '',
                password: '',
            }
        },
        computed:{
            crypt_password : function(){
                return this.password = encryptPwd(this.password);
            }
        },
        methods:{
            goBack(){
                this.$route.go(-1);
            },
            register(){
                this.$axios({
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    // },
                    url:url.registerUser,   
                    method:'post',
                    data:{
                        phone:this.phone,
                        password:this.password,
                    }
                })
                .then(res => {
                    res = res.data;
                    if (res.code==0) {
                        alert(res.msg)
                    } else {
                        var data = res.data;
                        console.log(data);
                        alert(res.msg)
                    }
                    
                })
                .catch(err=>{
                    console.log(err);
                    // alert('register fail')
                })
            }
        },
    }
</script>

<style scoped>
.register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
}
.register-btn{
    padding-top:10px;
}
</style>