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
            <input id="updataPic" accept=".jpg,.png" @change="updataPic" type="file">
            <mt-field label="" placeholder="写点什么吧..." type="textarea" rows="4" v-model="content">
            </mt-field>
            <div @click.stop="" class="contentImg">
                <viewer :images="images">
                    <div v-for="(item,index) in images" :key="index" class="subContentImg">
                        <a><img class = "subtract" src="../../../static/img/subtract.png"></a>
                        <div class="lastContentImg"><img @load="configPic" class="showImg" :src="item" :key="item"></div>
                    </div>
                    <div @click="addPic" class="subContentImg">
                        <div><img @load.stop="configPic" class="showImg" src="../../../static/img/picadd.jpg"></div>
                    </div>
                </viewer>
                
            </div>
        </div>
    </div>
</template>
<script>
import { Header } from 'mint-ui';
import { Field } from 'mint-ui';

export default {
    data(){
        return {
            content:'',
            images:[],
        }
    },
    methods:{
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
                _this.images.push(this.result);
                _this.initiatePic();
            };
        },
        test(){
            this.images.push('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549735521817&di=4241ef182c2ab9d79983f68bc94cbf40&imgtype=0&src=http%3A%2F%2Fwww.wzsky.net%2Fimg%2Fuploadimg%2F20121029%2F1019250.jpg');
            this.global.test.push(5);
        },
        addPic(){
            document.getElementById("updataPic").click();
            return false;

        }
    },
    mounted(){
    }
    
}
</script>
<style>
.subtract{
    position:absolute;
    height: 5vw;
    right:0;
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

</style>


