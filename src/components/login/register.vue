<template>
<div>
    <div class="registerTop">
        <img @click="$router.back(-1);" src="../../../static/img/back.png">
        <label>注册</label>
    </div>
    
    <div class="registerMid">
        <div class="registerList">
            <mt-field label="姓名" :state="errorList['name'].state" @input="checkName" placeholder="老王" v-model="username"></mt-field>
            <div class="error" v-show="errorList['name'].state === 'error'"><label><img src="../../../static/img/error.png">{{this.errorList['name'].error}}</label></div>
            <mt-field label="手机号" :state="errorList['phone'].state" @input="checkPhone" placeholder="13XXXXXXXXX" v-model="userphone"></mt-field>
            <div class="error" v-show="errorList['phone'].state === 'error'"><label><img src="../../../static/img/error.png">{{this.errorList['phone'].error}}</label></div>

            <mt-field label="性别"><mt-radio v-model="usersex" :options="['男','女']"></mt-radio></mt-field>

            <mt-field label="账号" :state="errorList['id'].state" @input="checkId" placeholder="88888888" v-model="userid"></mt-field>
            <div class="error" v-show="errorList['id'].state === 'error'"><label><img src="../../../static/img/error.png">{{this.errorList['id'].error}}</label></div>
            <mt-field label="密码" type="password" :state="errorList['password'].state" @input="checkPassword" placeholder="******" v-model="userpassword"></mt-field>
            <div class="error" v-show="errorList['password'].state === 'error'"><label><img src="../../../static/img/error.png">{{this.errorList['password'].error}}</label></div>
            <mt-field label="地址" :state="errorList['address'].state"  placeholder="XX宿舍楼XX" v-model="useraddress"></mt-field>
        </div>
        
    </div>
    <div class="registerBottom">
        <button @click="submit">提交</button>
    </div>
</div>
    
</template>
<script>
import { Radio } from 'mint-ui';
import { Field } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    components:{
        Radio,
        Field
    },
    data(){
        return {
            username:'',
            userphone:'',
            userid:'',
            userpassword:'',
            useraddress:'',
            usersex:'男',
            errorList:{
                name:{
                    state:'none',         
                    error:'不能为空'
                },
                phone:{
                    state:'none',         
                    error:'不能为空'
                },
                id:{
                    state:'none',         
                    error:'不能为空'
                },
                password:{
                    state:'none',         
                    error:'不能为空'
                },
                address:{
                    state:'none',         
                    error:'不能为空'
                }

            },
        }
    },
    methods:{
        checkName(){
            if(this.username === ''){
                this.errorList['name'].state = 'error';
                this.errorList['name'].error = '姓名不能为空';
                return false;
            }
            if(!/^[\w_\u4e00-\u9fa5]+$/.test(this.username)){
                this.errorList['name'].state = 'error';
                this.errorList['name'].error = '姓名包含非法字符';
                return false;
            }
            if(!/^[\w_\u4e00-\u9fa5]{1,30}$/.test(this.username)){
                this.errorList['name'].state = 'error';
                this.errorList['name'].error = '姓名过长';
                return false;
            }
            this.errorList['name'].state = 'success';
            return true;
        },
        checkPhone(){
             if(this.userphone === ''){
                this.errorList['phone'].state = 'error';
                this.errorList['phone'].error = '电话不能为空';
                return false;
            }
            if(!/^0?(13|15|18)[0-9]{9}$/.test(this.userphone)){
                this.errorList['phone'].state = 'error';
                this.errorList['phone'].error = '请输入正确的电话号码';
                return false;
            }
            this.errorList['phone'].state = 'success';
            return true;
        },
        checkId(){
             if(this.userid === ''){
                this.errorList['id'].state = 'error';
                this.errorList['id'].error = '账号不能为空';
                return false;
            };
            if(!/^[_\w]+$/.test(this.userid)){
                this.errorList['id'].state = 'error';
                this.errorList['id'].error = '账号包含非法字符';
                return false;
            }
            if(!/^[_\w]{1,20}$/.test(this.userid)){
                this.errorList['id'].state = 'error';
                this.errorList['id'].error = '账号过长';
                return false;
            }
            this.$axios.post("http://scut18pie1.top/test/gift/user/check_id_existence.php",
                qs.stringify({
                    id:this.userid
                }))
                .then(res => {
                    if(res.data === 1){
                        this.errorList['id'].state = 'error';
                        this.errorList['id'].error = '该账号已被使用';
                        return false;
                    } 
                });

            this.errorList['id'].state = 'success';
            return true;
        },
        checkPassword(){
             if(this.userpassword === ''){
                this.errorList['password'].state = 'error';
                this.errorList['password'].error = '密码不能为空';
                return false;
            };
            if(!/^[_\w]+$/.test(this.userpassword)){
                this.errorList['password'].state = 'error';
                this.errorList['password'].error = '密码包含非法字符';
                return false;
            }
            if(!/^(?=.*\d)(?=.*[a-zA-Z]).+$/.test(this.userpassword)){
                this.errorList['password'].state = 'error';
                this.errorList['password'].error = '密码至少要有一个数字与字母';
                return false;
            }
            if(!/^.{5,20}$/.test(this.userpassword)){
                this.errorList['password'].state = 'error';
                this.errorList['password'].error = '密码字长为5-20';
                return false;
            }
            this.errorList['password'].state = 'success';
            return true;

        },
        submit(){
            if(this.checkPassword() && this.checkName() && this.checkPhone() && this.checkId()){
                this.$axios.post("http://scut18pie1.top/test/gift/user/register.php",
                qs.stringify({
                    id: this.userid,
                    nickname: this.username,
                    password: this.userpassword,
                    sex: this.usersex === '男'?0:1,
                    address: this.useraddress,
                    phone: this.userphone,
                })
                ).then(res => {
                    if(res.data === 1){
                        Toast({
                        message:"注册成功",
                        position:'bottom',
                        duration:'1000',
                    });
                    this.$axios.post("http://scut18pie1.top/test/gift/user/login.php",
                    qs.stringify({
                        id:this.userid,
                        password:this.userpassword
                    })).then(res => {
                        this.global.logState = 1;
                        MessageBox.confirm('是否去完善个人信息?','注册成功').then(action => {
                        this.$router.push('/self');
                        })
                    });
                    }
                }).catch(() => {
                    console.log("registererr");
                })
            }
        }
    },
    watch:{
    }
    
}
</script>
<style>
div{
    padding:0;
    margin: 0;
}
.registerTop {
    
    position: relative;
    background-color: #169bd5;
    top:0;
    left: 0;
    height: 13.8vw;
    width:100vw;
}
.registerTop img{
    height: 8vw;
    width: auto;
    position:absolute;
    left: 2vw;
    top:0;
    bottom: 0;
    margin:auto auto;
}
.registerTop label {
    color:white;
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    height: 13.8vw;
    width:40vw;
    text-align: center;
    line-height: 13.8vw;
    font-size: 7vw;
    margin:auto auto;
}
.registerMid{
    position: relative;
    left: 0;
    padding:0;
    margin: 0;
    width: 100vw;

}

.inputText{
    display: block;
    height: 10vw;
    width: 70vw;
    border-radius: 2vw;
    border:0.3vw black solid;
    left:0;
    right: 0;
    margin:auto auto;
    margin-top:3vw;
    margin-bottom: 5vw;
}
.mint-cell-wrapper{
    border-top:0;
    border-bottom:#CCC solid 0.5vw;
    background-image: none;

}
.mint-radiolist .mint-cell{
    position: relative;
    height: 15vw;
    margin:auto auto;
}
.mint-radiolist .mint-cell .mint-cell-wrapper{
    height: 15vw;

}
.mint-radiolist .mint-cell:last-child{
    background-image: none;
}
.error{
    margin-top:0.8vw;
    color:red;
    text-align: right;
    padding-right: 5vw;
    height: 9vw;
    line-height: 9vw;
    background: white;
}
.error img{
    height: 5vw;
    width: 5vw;
    margin-right: 1vw;

}
.error label{
    border:red 0.3vw solid;
    padding:1vw;
    border-radius: 2vw;
}
.mint-field-core{
    position: relative;
}

.mint-radiolist .mint-cell{
    float: left;
    width:30vw;
}
.mint-radiolist .mint-cell-wrapper{
    border:none;
}
.mint-radiolist-title{
    margin: 0;
}
.mint-field-other{
    position: relative;
    left:-15vw;
    height: 15vw;
}
.registerBottom{
    position:relative;
    margin-top:10vw;
    width: 100%;
}
.registerBottom button{
    outline: 0;
    position:absolute;
    border-radius: 2vw;
    height: 14vw;
    width: 77.8vw;
    border:0;
    background:#169bd5;
    color: white;
    text-align: center;
    line-height: 14vw;
    left: 0;
    right: 0;
    margin:auto auto;

}


</style>


