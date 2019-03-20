<template>
<div>
    <div id="logChoose">
        <img src="../../../static/img/scale.png">
        <div id="chooseBox">
            <a @click="loginShow = true" >登录</a>
            <router-link to="/register">注册</router-link>
            <div @click = 'tourLogin' class="tour"><button>游客登录</button></div>
            
            
        </div>
        <label @click="$router.push('/');">暂不登录</label>
        
    </div>
    <transition name="fade">
        <login :to="this.to" ref="login" @close="loginShow = false" v-show="loginShow"></login>
    </transition>
    
    
</div>

    
</template>
<script>
import login from './login.vue'
import { setTimeout } from 'timers';
export default {
    components:{
        login,
    },
    data(){
        return {
            loginShow:false,
            to:'',

        }
    },
    methods: {
        getCookie(){
            var cookie = document.cookie;
            var nameRule = /name=(.*?)(;|$)/;
            var passwordRule = /password=(.*?)(;|$)/;
            if(nameRule.test(cookie) && passwordRule.test(cookie)){
                this.$refs.login.userid = nameRule.exec(document.cookie)[1]
                this.$refs.login.userpassword = passwordRule.exec(document.cookie)[1]
                this.$refs.login.login();
            } else {
                console.log("no");
            }


        },
        tourLogin(){
            this.$refs.login.userid = '11111111';
            this.$refs.login.userpassword = 'aaa111';
            this.$refs.login.login();

        }
        
    },
    mounted(){
         if(this.$route.query.to){
             this.to = this.$route.query.to.path;
         }
         this.getCookie();

    },
    
}
</script>
<style>
.tour {
    position: relative;
}
.tour button{
    position: absolute;
    right: 0;
    bottom: 0;
    background: #CCC;
    border:none;
    outline: none;
    font-size: 4vw;
    border-radius: 1vw;
    padding:1vw 2vw;
}
#logChoose{
    position: relative;
    margin: 0;
    padding: 0;
    font-size: 5vw;
    width:100vw;
    height: 100vh;
    background-color: white;
}
#logChoose img{
    position: absolute;
    width: 45vw;
    height: auto;
    left:0;
    right: 0;
    margin:auto auto;
    margin-top: 15vw;
}
#logChoose a{
    display: block;
    border-radius: 2vw;
    height: 10vw;
    width: 100%;
    border:0;
    background:#169bd5;
    text-decoration: none;
    color: white;
    text-align: center;
    line-height: 10vw;
    margin-bottom: 10vw;
}
#chooseBox{
    position:relative;
    width:40vw;
    left:0;
    right: 0;
    top:70vw;
    margin:0 auto;
}
#logChoose label{
    position: absolute;
    color:rgb(158, 152, 152);
    top:3vw;
    right: 0;
    margin-right: 5vw;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .9s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>


