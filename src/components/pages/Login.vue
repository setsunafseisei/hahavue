<template>
    <div class="login">
        <van-nav-bar title="用户登录" left-text="返回" left-arrow @click="goBack" />
        <div class="login-panel">
            <van-field lable="手机号" v-model="phone" icon="clear" placeholder="请输入手机号" required @click-icon="phone=''" />
            <van-field lable="密码" v-model="password" placeholder="请输入密码" required />
            <div class="login-btn">
                <van-button type="primary" @click="loginAction" size="large" :loading="openLoading">登录</van-button>
            </div>
        </div>   
    </div>
</template>


<script>
    import url from '@/serviceApi.conf'
    import { encryptPwd } from '@/assets/js/common.js' // rsa 加密函数
    import { Toast } from 'vant' // 弹层

    
    export default {
        data(){
            return{
                phone: '',
                password: '',
                openLoading:false ,// 默认不开起 loading 当点击按钮后 再开启
                phoneErr:'',
                passwordErr:''
            }
        },
        methods:{
            loginAction(){
                this.checkForm() && this.login()
            },
            // 登录
            login(){
                this.openLoading = true
                this.$axios({
                    
                    url:url.userLogin,   
                    method:'post',
                    data:{
                        phone:this.phone,
                        password:encryptPwd(this.password),
                    }
                })
                .then(res => {
                    res = res.data;

                    if (res.code==1) {
                        var data = res.data;
                        console.log(data);
                        Toast.success(res.msg)
                        this.$router.push('/')
                    } else if (res.code==0) {
                        Toast.fail(res.msg)
                        this.openLoading=false
                    } else {
                        Toast.fail('unkonown error & register fail')
                        this.openLoading=false
                    }
                    
                })
                .catch(err=>{
                    console.log(err);
                    Toast.fail('login fail')
                    this.openLoading=false
                })
            },
            // 前端表单验证
            checkForm(){
                let isOk =true;
                if (this.phone.length != 11 | isNaN(this.phone)) {
                    this.phoneErr = '手机号为11位数字'
                    Toast.fail(this.phoneErr)
                    isOk = false
                } else {
                    this.phoneErr =""
                }
                
                if (this.password.length<6) {
                    this.passwordErr="密码最少为6位"
                    if (!this.phoneErr){
                        Toast.fail(this.passwordErr)
                    }
                    isOk=false
                }else {
                    this.passwordErr =""
                }

                return isOk
            },
            // 返回
            goBack(){
                // this.$router.push('/')
                this.$router.go(-1)
            },        
        },
    }
</script>

<style scoped>
.login-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
}
.login-btn{
    padding-top:10px;
}
</style>