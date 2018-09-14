<template>
    <div class="register">
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click="goBack" />
        <div class="register-panel">
            <!-- 在input框上显示错误 -->
            <!-- <van-field lable="手机号" v-model="phone" icon="clear" placeholder="请输入手机号" required @click-icon="phone=''" :error-message="phoneErr"/>        
            <van-field lable="密码" v-model="password" placeholder="请输入密码" required v-if="phoneErr" />
            <van-field lable="密码" v-model="password" placeholder="请输入密码" required v-else :error-message="passwordErr"/> -->
            <!-- 利用弹层显示错误 -->
            <van-field lable="手机号" v-model="phone" icon="clear" placeholder="请输入手机号" required @click-icon="phone=''" />
            <van-field lable="密码" type="password" v-model="password" placeholder="请输入密码" required />
            <div class="register-btn">
                <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">马上注册</van-button>
            </div>
        </div>   
    </div>
</template>

<script>
    // import axios from 'axios'
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
            registerAction(){
                this.checkForm() && this.register()
            },
            // 注册
            register(){
                this.openLoading = true
                this.$axios({
                    url:url.registerUser,   
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
                    Toast.fail('register fail')
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
                console.log(this.phoneErr);
                
                if (this.password.length<6 | this.password.length>16) {
                    this.passwordErr="密码最少6位,最大16位"
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