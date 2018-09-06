<template>
    <div class="register">
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack" />
        <div class="register-panel">
            <van-field lable="用户名" v-model="username" icon="clear" placeholder="请输入用户名" required @click-icon="username=''" />        
            <van-field lable="密码" v-model="password" placeholder="请输入密码" required />
            <div class="register-btn">
                <van-button type="primary" @click="register" size="large">马上注册</van-button>
            </div>
        </div>   
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceApi.conf'
    export default {
        data(){
            return{
                username: '',
                password: '',
            }
        },
        methods:{
            goBack(){
                this.$route.go(-1);
            },
            register(){
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        username:this.username,
                        password:this.password,
                    }
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                    alert('register fail')
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