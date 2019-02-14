<template>
<div>
    <div id="logChoose">
        <img src="../../../static/img/scale.png">
        <div id="chooseBox">
            <a @click="loginShow = true" >登录</a>
            <router-link to="/register">注册</router-link>
        </div>
        <label @click="$router.back(-1);">暂不登录</label>
        
    </div>
    <transition name="fade">
        <login @close="loginShow = false" v-show="loginShow"></login>
    </transition>
    
    
</div>

    
</template>
<script>
import login from './login.vue'
export default {
    components:{
        login,
    },
    data(){
        return {
            loginShow:false,

        }
    }
    
}
</script>
<style>
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


