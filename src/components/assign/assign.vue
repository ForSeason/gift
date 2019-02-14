<template>
    <div>
        <div class="assignTop">
            <mt-header fixed title="发布信息">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
        </div>
        <div class="assignMid">
            <input id="updataPic" accept="image/*" @change="updataPic" type="file">
            <mt-field label="" placeholder="写点什么吧..." type="textarea" rows="4" v-model="content">
            </mt-field>
            <mt-radio title="发布类型" v-model="fineType" :options="['失物招领', '寻物启事']"></mt-radio>

            <div @click.stop="" class="contentImg">
                <viewer :images="images">
                    <div v-for="(item,index) in images" :key="index" class="subContentImg">
                        <button :name="index" @click="deletePic" class="subtract"></button>
                        <div class="lastContentImg"><img @load="configPic" class="showImg" :src="item" :key="item"></div>
                    </div>
                    <div v-show="showAdd" @click="addPic" class="subContentImg">
                        <div class="lastContentImg"><button id="myAdd"></button></div>
                    </div>
                </viewer>
                
            </div>
        </div>
        <div class = "assignBottom">
            <button @click="submit">提交</button>

        </div>
    </div>
</template>
<script>
import { Header } from 'mint-ui';
import { Field } from 'mint-ui';
import { Radio } from 'mint-ui';


export default {
    data(){
        return {
            content:'',
            images:[],
            imgsData:[],
            showAdd:true,
            fineType:'失物招领',
        }
    },
    methods:{
        submit(){
            var myurl = '';
            if(this.fineType === '失物招领'){
                myurl = 'http://scut18pie1.top/test/gift/user/create_a_found.php';
            } else {
                myurl = 'http://scut18pie1.top/test/gift/user/create_a_lost.php';
            }
            var formdata = new FormData();
            formdata.append('content',this.content);
            formdata.append('phone',this.$store.state.userinfo.phone);
            formdata.append('address',this.$store.state.userinfo.address);
            if(this.getPic().length >0){
                var imgData = this.getPicData();
                for(var i = 0 ;i < imgData.length;i++){
                    formdata.append('pic'+i,imgData[i]);
                }

            }
            
            this.$axios({
                method:'post',
                url: myurl,
                data:formdata,
                headers:{'Content-Type':'multipart/form-data'},
            })
            .then(res => {
                if(res.data !== 0){
                    Toast({
                    message:"发布成功",
                    position:'bottom',
                    duration:'1000',
                    });
                    this.$router.push('/');
                }
            })
            

        },
        getPic(){
            return this.images.filter((item) => {
                        if(item !== ''){
                            return true;
                        } else {
                            return false;
                        }

                    })

        },
        getPicData(){
            return this.imgsData.filter((item) => {
                        if(item !== ''){
                            return true;
                        } else {
                            return false;
                        }

                    })

        },
        deletePic(e){
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            this.images[e.target.name] = '';
            this.imgsData[e.target.name] = '';
            if(this.getPic().length < 9){
                this.showAdd = true;
            }  
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
            var file = e.target.files[0];
            var reader = new FileReader();
            var _this = this;
            reader.readAsDataURL(file);
            reader.onload = function(){
                _this.imgsData.push(file);
                _this.images.push(this.result);
                if(_this.getPic().length === 9){
                    _this.showAdd = false;
                } 
                e.target.val = '';
            };
           
               
        },
        addPic(){
            document.getElementById("updataPic").click();
        }
    },
    mounted(){
    }
    
}
</script>
<style>
.assignBottom button {
    outline: 0;
    position: absolute;
    border-radius: 2vw;
    height: 14vw;
    width: 77.8vw;
    border: 0;
    background: #169bd5;
    color: white;
    text-align: center;
    line-height: 14vw;
    left: 0;
    right: 0;
    margin: 10vw auto;
}
button{
    border:0;
    outline: 0;
}
.subtract{
    position:absolute;
    right: 0;
    top:0;
    background: url("../../../static/img/subtract.png");
    width:5vw;
    height: 5vw;
    background-size: 100% 100%;
    border:none;
    outline: none;

}
#myAdd{
    width: 100%;
    height: 100%;
    background:url("../../../static/img/picadd.jpg");
    background-size: 100% 100%;
}

#updataPic{
    visibility: hidden;
    position:absolute;
}
.assignMid{
    margin-top:12vw;
}
.subContentImg{
    position: relative;
    height: 25vw;
    width: 25vw;
    overflow: hidden;
    display: inline-block;
    margin:0.5vw;
}
.lastContentImg{
    width: 100%;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
}
.contentImg{
    margin-top:0;
}

</style>


