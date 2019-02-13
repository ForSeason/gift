<template>
    <div @click="write" class = "comment">
        <div class = "commentTop">
            <div class="imgShow"><div class="lastContentImg"><img @load="configPic" :src="pic"></div></div>
            <label class="myname">{{userinfo.nickname}}</label>
            <label class="mytime">{{this.time}}</label>
        </div>
        <div class = "commentMid">
            {{this.content}}
        </div>
        <div v-show = "this.info.comments.length > 0" class = "commentBottom">
            <recomment @write="othWrite" v-for="(item,index) in this.info.comments" :key="index" :info = "item"></recomment>
        </div>
    </div>
</template>
<script>
import recomment from './recomment.vue';
export default {
    props:['info'],
    components:{
        recomment,
    },
    data() {
        return {
            userinfo:'',
            pic:'',
        }
    },
    methods: {
        othWrite(val){
            console.log(val);
            this.$emit('write',val,this.info.floor,0)
        },
        write(){
            this.$emit('write',this.userinfo.nickname,this.info.floor,1);

        },
        configPic(e){
            var img = e.target;
            if(img.naturalWidth > img.naturalHeight){
                img.style = 'width:auto;height:100%';
            } else {
                img.style = 'width:100%;height:auto';
            }
        },
        getUserInfo(){
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_user_info.php',
            qs.stringify({
                id:this.info.id,
            })).then(res => {
                this.userinfo = res.data;
                if(this.userinfo.headPic === null){
                    this.pic = '../../../static/img/default.jpg';
                } else {
                    this.pic = 'http://' + this.userinfo.headPic;
                }
                
            })

        },
    },
    mounted() {
        console.log(this.info.id,this.info.content);
        this.getUserInfo();
        
    },
    computed:{
        time(){
            var date = new Date();
            var timeGo =(date.getTime()-this.info.time)/1000;
            if(timeGo <60){
                return '刚刚'
            } else if(timeGo <3600){
                return Math.floor(timeGo/60)+'分钟前';
            } else if(timeGo < 3600*24){
                return Math.floor(timeGo/3600)+'小时前'
            } else {
                var thatTime = new Date(this.info.time);
                return thatTime.getFullYear()+'-'+thatTime.getMonth()+'-'+thatTime.getDate()+'   '+thatTime.getHours()+':'+thatTime.getMinutes(); 
            }
            
        },
        content(){
            return this.info.content;
        }

    },
    
}
</script>
<style>
.commentBottom{
    width:75vw;
    margin-top:4vw;
    padding:3vw;
    background-color: #f0f4f7;
    margin-left: 13vw;
    border-radius: 3vw;
    margin-bottom: 4vw;
}
.commentMid{
    margin-top:1vw;
    width: 76vw;
    margin-left: 18vw;
    margin-bottom: 2vw;
}
.comment .commentTop .myname{
    position:absolute;
    color:#247fa7;
    font-size: 4vw;
    font-weight:bold;
    left:17vw;
}
.comment .commentTop .mytime{
    position:absolute;
    top:6vw;
    left:17vw;
    font-size: 3.5vw;
    color:rgb(124, 117, 117);
}
.commentTop .imgShow{
    position:absolute;
    height: 10vw;
    width: 10vw;
    border-radius: 50%;
    border:0.3vw black solid;
    overflow: hidden;
}
.commentTop .lastContentImg{
    width: 100%;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
}
.commentTop{
    position: relative;
    margin-top:2vw;
    height: 13vw;
    padding:0 3vw;
}
.comment{
    border-bottom:#CCC solid 0.5vw;
}
</style>


