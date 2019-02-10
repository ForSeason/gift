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
        login(){
            this.global.info.userpic = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549169583682&di=0a10fede3c3dcc3401e83334b880b1af&imgtype=0&src=http%3A%2F%2Fpre00.deviantart.net%2F601c%2Fth%2Fpre%2Ff%2F2017%2F310%2Fd%2Fd%2F__foxy___mangle____profile_pic___by_juliedraw2046-dbsx5pf.png'
             if(!/^[-\w_\u4e00-\u9fa5]+$/.test(this.userid)){
                this.isLoginFail = 2;
                return;
            }
            
            // ///////
            // this.$axios({
            //     method:'post',
            //     url:'http://scut18pie1.top/test/gift/user/response_login.php',
            //     data:qs.stringify(
            //          {
            //         'id':this.userid,
            //         'password':this.userpassword
            //     }
            //     )
            //     ,
            //     headers:{'Content-Type':'application/x-www-form-urlencoded'}
            // }).then(function(res){
            //     console.log(res.data);
            // })
            // .catch(function(){console.log("err")});
            // return;
            // //////
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
                        this.global.logState = 1;
                        this.$router.push('/self');
                    
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


