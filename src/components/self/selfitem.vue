<template>
<div @click="init" class="selfItem">
    <div class="selfItemTop">
        <div class="imgShow"><div class="lastContentImg"><img @load="configPic" class="showImg" :src="'http://' + info.userinfo.headPic"></div></div>
        <label class="myname">{{info.userinfo.nickname}}</label>
        <label class="mytime">{{this.time}}</label>
    </div>
    <div class="selfItemMid">
        {{info.content}}
        <div @click.stop="" class="contentImg">
            <viewer :images="info.picList">
                <div v-for="(item,index) in info.picList" :key="index" class="subContentImg">
                    <div class="lastContentImg"><img class="showImg" @load="configPic" :src="'http://'+item" :key="item"></div>
                </div>
            </viewer>  
        </div>
        
    </div>
    <div class="contentBottom">
        <div class="bottomItem">
            <img src="../../../static/img/cursor2.png">
            <label>{{info.skimNumber}}</label>
        </div>
        <div class="bottomItem">
            <img src="../../../static/img/comment2.png">
            <label>{{info.commentNumber}}</label>
        </div>
         <div class="bottomItem" @click.stop="changGood">
            <img :src="goodPic">
            <label>{{info.goodNumber}}</label>
        </div>
         <div class="bottomItem">
            <img src="../../../static/img/share2.png">
            <label></label>
        </div>
    </div>


</div>
    
</template>
<script>
export default {
    props:['info'],
    watch:{
    },
    data(){
        return{
            goodPic:'',
            isGood:'',
        }
    },
    watch:{
        isGood(val){
            if(val === 0){
                this.goodPic = '../../../static/img/good2.png';
            } else {
                this.goodPic = '../../../static/img/good.png';

            }

        }
    },
    methods:{
        changGood(){
            if(this.$store.state.logState === 0){
                this.$router.push('/log');
            }

            this.$axios.post('http://scut18pie1.top/test/gift/user/good.php',
            qs.stringify({
                eid:this.info.eid,
            })).then (res => {
                if(this.isGood === 0){
                    this.isGood = 1;
                    this.info.goodNumber ++;
                } else {
                    this.isGood = 0;
                    this.info.goodNumber --;
                }
            })


        },
        setGood(){
            if(this.$store.state.logState === 0){
                this.isGood = 0;
                return;
            }
            this.$axios.post('http://scut18pie1.top/test/gift/user/check_good_existence.php',
            qs.stringify({
                eid:this.info.eid,
            }))
            .then(res => {
                this.isGood = res.data;
            });
        },
        init(){
            this.$router.push({
                path:'/detail',
                query:{
                    isGood:this.isGood,
                    eid:this.info.eid,
                }
            })


        },
        configPic(e){
            var img = e.target;
            if(img.naturalWidth > img.naturalHeight){
                img.style = 'width:auto;height:100%';
            } else {
                img.style = 'width:100%;height:auto';
            }

        },

    },
    computed:{
        time(){
            var d =new Date();
            d.setFullYear(1999);
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
        }

    },
    mounted(){
        this.setGood();
   
    }

    
}
</script>
<style>
.lastContentImg{
    width: 100%;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
}
.contentBottom{
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: #f7f7f7;
    margin-top:4vw;
    border-radius: 3vw;
    padding:3vw 5vw;

    font-size: 5vw;

}
.bottomItem label{
    margin-left: 8vw;
    
}
.bottomItem img{
    position:absolute;
    top:0;
    bottom:0;
    margin:auto auto;
    height: 7vw;
    width: 7vw;
}

.selfItem{
    position: relative;
    border:black 0.4vw solid;
    margin-bottom:5vw;
    background-color: white;

    border-radius: 4vw;
    padding:2vw;
    word-wrap:break-word;
}
.imgShow{
    position:absolute;
    height: 13vw;
    width: 13vw;
    border-radius: 2vw;
    overflow: hidden;
}
/* .imgShow img{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto auto;
} */
.myname{
    position:absolute;
    color:#247fa7;
    font-size: 5.5vw;
    font-weight:bold;
    left:17vw;
}
.mytime{
    position:absolute;
    top:10vw;
    left:17vw;
    font-size: 3.5vw;
    color:rgb(124, 117, 117);
}
.selfItemTop{
    height: 15vw;
    border-bottom: #CCC 0.2vw solid;
}
.selfItemMid{
    font-size: 5vw;
    position: relative;
    font-weight: 530;
    padding:0 5vw;
    margin-top:5vw;
}
.contentImg{
    line-height: 0;
    margin-top:5vw;
}
.subContentImg{
    position: relative;
    height: 25vw;
    width: 25vw;
    overflow: hidden;
    display: inline-block;
    margin:0.5vw;
}
/* .showImg{
    position: absolute;
    left:0;
    right: 0;
    top:0;
    bottom:0;
    margin:auto auto;

} */
</style>


