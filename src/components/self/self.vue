<template>
<div>
    <input id="updataPic" accept=".jpg,.png" @change="updataPic" type="file">
    <router-link to="/"><img src="../../../static/img/back_bl.png"></router-link>
    <div class="selfTop">
        <div class="show"> <img @load="configPic" @click="getpic" id="myimg"  :src="userpic"></div>
        <label>{{this.$store.state.userinfo.name}}</label>
    </div>
    <div class="selfMid">
        <mt-field label="姓名" :state="errorList['name'].state" @input="checkName" placeholder="老王" v-model="username"></mt-field>
        <div class="error" v-show="errorList['name'].state === 'error'"><label><img src="../../../static/img/error.png">{{this.errorList['name'].error}}</label></div>
         <mt-field label="手机号" :state="errorList['phone'].state" @input="checkPhone" placeholder="13XXXXXXXXX" v-model="userphone"></mt-field>
        <div class="error" v-show="errorList['phone'].state === 'error'"><label><img src="../../../static/img/error.png">{{this.errorList['phone'].error}}</label></div>
        <mt-field label="地址"  placeholder="XX宿舍楼XX" v-model="useraddress"></mt-field>
        <div class="selfintro">
            <mt-field class="myintr" label="自我介绍" placeholder="自我介绍" type="textarea" rows="1" v-model="userselfintro"></mt-field>
        </div>
        
    </div>
    <div class="selfBottom">
        <button @click="save">保存提交</button>
    </div>
</div>
    
</template>
<script>
import { Field } from 'mint-ui';
export default {
    data(){
        return {
            username:this.$store.state.userinfo.name,
            userphone:this.$store.state.userinfo.phone,
            useraddress:this.$store.state.userinfo.address,
            userselfintro:this.$store.state.userinfo.intro,
            userpic:this.$store.state.userinfo.pic,
            change:0,
            errorList:{
                name:{
                    state:'none',
                    error:''
                },
                phone:{
                    state:'none',
                    error:''
                }
            }
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
        },
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
        checkPic(){
            var file =document.getElementById('updataPic').files[0];
            if(!file){
                return 0;
            }
            if(!/.*(jpg)|(png)$/.test(file.name)){
                return 1;
            }
            if(file.size / 1024 > 5*1024){
                return 2;
            }
            return 0;
        },
        save(){
            if(this.checkPic() || !this.checkPhone || !this.checkName){
                return;
            }
            var file =document.getElementById('updataPic').files[0];
            var formdata = new FormData();
            formdata.append('headPic',file);
            this.$axios.post('http://scut18pie1.top/test/gift/user/update_my_info.php',
            qs.stringify({
                    params:['address','selfIntro','phone','nickname'],
                    values:[this.useraddress,this.userselfintro,this.userphone,this.username]
                
            })).then(res => {
                if(this.change !== 1){
                    this.change = 1;
                    return
                }
                if(res.data === 1 || !file){
                    Toast({
                        message:"修改成功",
                        position:'bottom',
                        duration:'1000',
                        });
                        this.getUserInfo();
                }

            });
            if(file){
            this.$axios({
                method:'post',
                url: 'http://scut18pie1.top/test/gift/user/update_headPic.php',
                data:formdata,
                headers:{'Content-Type':'multipart/form-data'},
            })
            .then(res => {
                if(this.change !== 1){
                    this.change = 1;
                    return
                }
                if(res.data === 1){
                    Toast({
                        message:"修改成功",
                        position:'bottom',
                        duration:'1000',
                        });
                        this.getUserInfo();
                }
            })

            }

        },
        getpic(){
            document.getElementById('updataPic').click();
        },
        configPic(e){
            var img = e.target;
            if(img.naturalWidth > img.naturalHeight){
                img.style = 'width:auto;height:100%';
            } else {
                img.style = 'width:100%;height:auto';
            }

        },
        updataPic(e){
            var res = this.checkPic();
            if(res === 1){
                Toast({
                    message:"文件类型不符",
                    position:'bottom',
                    duration:'1000',
                    });
                    return;

            } else if(res === 2){
                Toast({
                    message:"图片过大",
                    position:'bottom',
                    duration:'1000',
                    });
                    return;
            } 
            var file = e.target.files[0];
            var reader = new FileReader();
            var formdata = new FormData();
            formdata.append('headPic',file);
            reader.readAsDataURL(file);
            reader.onload = function(){
                var img = document.getElementById("myimg");
                img.src = this.result; 
                img.onload = function() {
                    if(img.naturalWidth > img.naturalHeight){
                        img.style = 'height:100%;width:auto;';
                    } else {
                        img.style = 'width:100%;height:auto;';
                    }        
                }
            };
        }
    },
    mounted(){
    },
    computed:{
    }
    
    
}
</script>
<style>
#updataPic{
    visibility: hidden;
    position:absolute;
}
.selfTop{
    position: relative;
    margin-top:10vw;
    height: 55vw;
    border-bottom:#169bd5 0.6vw dashed;
    
}
.show{
    position:absolute;
    left: 0;
    right: 0;
    margin:0 auto;
    height: 35vw;
    width:35vw;
    border:black solid 1vw;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    line-height: 30vw;
}
.selfTop label{
    position:absolute;
    text-align: center;
    font-size: 10vw;
    width:100%;
    top:38vw;
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
.selfMid{
    position: relative;
}
.selfBottom{
    position: relative;
    margin-top:10vw;
}
.selfBottom button{
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
a img{
    margin-top:3vw;
    margin-left: 2vw;
}


</style>

