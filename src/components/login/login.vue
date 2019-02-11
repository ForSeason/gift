<template>
    <div id="login" v-show="loginShow">
        <div id="loginBox">
            <img @click="$emit('close')" src="../../../static/img/close.png">
            <label>账号<input type="text" v-model="userid"></label>
            <label>密码<input type="password" v-model="userpassword"></label>
            <div v-show="isLoginFail === 0">*账号或密码错误</div>
            <div v-show="isLoginFail === 1">*账号不存在</div>
            <button :disabled="!isOkToLogin" :class="{butdisabled:!isOkToLogin}" @click="login">登录</button>
        </div>
    </div>
</template>
<script>

export default {
    props:["loginShow"],
    data(){
        return {
            userid:'',
            userpassword:'',
            isLoginFail:-1,
            
        }
    },
    computed:{
        isOkToLogin(){
            if(this.userid && this.userpassword){
                return true;
            }
            return false;
        }
    },
    methods:{
        getUserInfo(){
            this.$axios.get("http://scut18pie1.top/test/gift/user/get_my_info.php")
            .then(res => {
                if(res.data.status === 0){
                    Toast({
                        message:"登录出现异常",
                        position:'bottom',
                        duration:'1000',
                    });
                    return;
                }
                var userinfo = res.data.info;
                this.$store.commit('setId',userinfo.id);
                this.$store.commit('setName',userinfo.nickname);
                this.$store.commit('setSex',userinfo.sex);
                this.$store.commit('setPhone',userinfo.phone);
                this.$store.commit('setIntro',userinfo.selfIntro);
                var userPic = userinfo.headPic;
                if(userPic === null){
                    userPic = this.$store.state.defalutPic;
                } else {
                    userPic = 'http://' + userPic;
                }
                this.$store.commit('setPic',userPic);
                this.$store.commit('setAddress',userinfo.address);
            });
            this.$store.commit('setLogState',1);
            this.$router.push('/');
        },
        login(){
             if(!/^[-\w_\u4e00-\u9fa5]+$/.test(this.userid)){
                this.isLoginFail = 2;
                return;
            }
            this.$axios.post("http://scut18pie1.top/test/gift/user/login.php",
            qs.stringify({
                id:this.userid,
                password:this.userpassword
            })
            ).then(res => {
                if(res.data === 0){
                    this.$axios.post("http://scut18pie1.top/test/gift/user/check_id_existence.php",
                    qs.stringify({
                        id:this.userid
                    }))
                    .then(res => {
                        if(res.data === 0){
                            this.isLoginFail = 1;
                        } else if(res.data === 1){
                            this.isLoginFail = 0;
                        }
                    })
                } else if (res.data === 1){
                    this.isLoginFail = -1;
                        Toast({
                            message:"登录成功",
                            position:'bottom',
                            duration:'1000',
                        });
                        this.getUserInfo();

                }
            })
        }
    }

    
}
</script>
<style>
#login{
    margin: 0;
    padding: 0;
    font-size: 5vw;
    

}

#loginBox label{
    display: block;
    height: 8vw;
    margin-top: 6vw;
    
}
#loginBox input{
    margin-left: 5vw;
    border-radius: 5vw;
    border:0.3vw black solid;
    padding:2vw 4vw;
    outline:0;
    height: 4vw;
    width:40vw;
}

#loginBox input:focus{
    border:#169bd5 solid 0.3vw;

}
#loginBox {
    background-color: white;
    position: absolute;
    top:65vw;
    width:80vw;
    height: 60vw;
    border-radius: 3vw;
    border:0.5vw #169bd5 solid;
    left:0;
    right: 0;
    margin:0 auto;
    text-align: center;
}
#loginBox button {
    position:absolute;
    border-radius: 2vw;
    height: 10vw;
    width: 50vw;
    border:0;
    background:#169bd5;
    color: white;
    text-align: center;
    line-height: 10vw;
    left:0vw;
    right: 0vw;
    margin:0 auto;
    bottom:7vw;
}
#loginBox .butdisabled{
    background: white;
    border:#CCC solid 0.3vw;
    color: #CCC;
}

#loginBox div{
    position: relative;
    top:4vw;
    left: -15vw;
    color:red;
}

#loginBox img{
    position:absolute;
    width:10vw;
    height: 10vw;
    right: -3vw;
    top:-3vw;
}





</style>


