<template>
    <div class="detail">
        <div class = "detailTop">
            <mt-header fixed title="详细信息">
                    <mt-button @click="$router.push('/')" slot="left" icon="back">返回</mt-button>
            </mt-header>
        </div>
        <div class = "detailMid">
            <selfitem :info="this.info"></selfitem>
            <hr>
            <div class="commentArea">
                <label class="commentTag">评论区(请文明妈卖批)</label>
                <div class="commentPlace">
                    <comment @write="write" v-for = "(item,index) in this.comments" :info = 'item' :key="index"></comment>
                </div>
                
            </div>
        </div>
        <div class='detailBottom' >
            <div class="subDetailBottom" v-show="isBottom">
                <div class="commentBox">
                    <button @click="isBottom = false">
                        <img src = "../../../static/img/pen.png">
                        <label>写评论...</label>
                    </button>
                </div>
                <div class="multibut">
                    <div @click="$router.push('/')" class="detailLast">
                        <img src = '../../../static/img/homen.png'>
                        <label>首页</label>
                    </div>
                    <div @click = "changeGood" class="detailLast">
                        <img :src = 'goodPic'>
                        <label>点赞</label>
                    </div>
                    <div class="detailLast">
                        <img src = '../../../static/img/share2.png'>
                        <label>分享</label>
                    </div>
                </div>

            </div>
            <div v-show="!isBottom"  class="commentWrite">
                <textarea id="comment" v-model="myComment" :placeholder="this.toMessage"></textarea>
                <button @click="submit">发表</button>
            </div>
        </div>
        <div v-show="!isBottom" @click="closeWrite" class="bg"></div>
    </div>
</template>
<script>
import { Header } from 'mint-ui';
import selfitem from './selfitem.vue';
import comment from './comment.vue';
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            to:null,
            toFloor: null,
            toMessage:'发表评论...',
            isDefault:0,
            info:
                {
                    eid:this.$route.query.eid,
                    time:'',
                    content:'',
                    picList:[],
                    goodNumber:'',
                    skimNumber:'',
                    commentNumber:'',
                    rid:'',
                    userinfo:'',
                }
            ,
            isBottom:true,
            myComment:'',
            goodPic:'',
            isGood:this.$route.query.isGood,
            comments:[
                // {
                //     id:'',
                //     time:'',
                //     critics:[
                //         {
                //             name:'',
                //             content:'',
                //         }
                //     ]
                // }
            ],

        }
    },
    components:{
        selfitem,
        comment,
    },
    watch:{
        isGood(val){
            this.setGood();
        },
    },
    methods:{
        closeWrite(){
            this.to = null;
            this.toFloor = null;
            this.toMessage = '发表评论';
            this.isBottom = true;
            this.myComment = '';
            this.isDefault = 0;

        },
        write(val,floor,de){
            this.to = val;
            this.toFloor = floor;
            this.toMessage = '回复' + val;
            this.isBottom = false;
            this.isDefault = de;
            setTimeout(() => {document.getElementById('comment').focus();}, 10);
        },
        getInfo(){
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_event_info.php',
            qs.stringify({
                eid:this.info.eid,
            })).then (res => {
                this.info.time = res.data.createTime*1000;
                this.info.content = res.data.content;
                this.info.picList = res.data.pics;
                this.info.goodNumber = res.data.goods;
                this.info.skimNumber = res.data.clicks;
                this.info.commentNumber = res.data.chats;
                this.info.rid = res.data.rid;
                this.info.type = res.data.type;
                this.getComment();
                this.$axios.post('http://scut18pie1.top/test/gift/user/get_user_info.php',
                qs.stringify({
                    id:res.data.id,
                })) .then(re => {
                    this.info.userinfo = re.data;
                })
            })

        },

        sortList(itema,itemb){
            if(itema.time > itemb.time){
                return 1;
            } else {
                return -1;
            }
        },
        getComment(){
            this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
            qs.stringify({
                rid:this.info.rid,
            })).then (res => {
                var fakseComment = [];
                var comments = [];
                for(var i = 0;i<res.data.length;i++){
                    var item = {};
                    item.id = res.data[i].id;
                    item.time = res.data[i].createTime*1000;
                    var content = JSON.parse(res.data[i].content);
                    item.floor = content.floor;
                    item.to = content.to;
                    item.content = content.content;
                    fakseComment.push(item);  
                }
                for(var j = 0;j<fakseComment.length;j++){
                    if(fakseComment[j].to === null){
                        comments[fakseComment[j].floor-1] = fakseComment[j];
                        comments[fakseComment[j].floor-1].comments = [];
                    }
                }
                for(var j = 0;j<fakseComment.length;j++){
                    if(fakseComment[j].to != null){
                        comments[fakseComment[j].floor-1].comments.push(fakseComment[j]);
                    }
                }
                this.comments = [];
                setTimeout(() => {this.comments = comments.reverse();},10);
            })

        },
        submit(){
            if(this.myComment === ''){
                Toast({
                    message:"内容不能为空",
                    position:'bottom',
                    duration:'1000',
                });
                return;
            }
            this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
            qs.stringify({
                rid:this.info.rid
            })).then(res => {
                var floor;
                if(this.toFloor === null){
                    
                    var maxFloor = 0;
                    for(var i = 0;i<res.data.length;i++){
                        if( maxFloor < JSON.parse( res.data[i].content).floor){
                            maxFloor = JSON.parse( res.data[i].content).floor;
                        }

                    }
                    floor = maxFloor + 1;
                } else {
                    floor = this.toFloor
                }
                var to = this.to;
                if(this.isDefault === 1){
                    to = 'defaultfloor';
                }
                var sendMessage = {
                    floor:floor,
                    to:to,
                    content:this.myComment,
                }
                this.$axios.post('http://scut18pie1.top/test/gift/user/post_a_chat.php',
                qs.stringify({
                    rid:this.info.rid,
                    content:JSON.stringify(sendMessage),
                })).then( res => {
                    Toast({
                        message:"发送成功",
                        position:'bottom',
                        duration:'1000',
                    });
                    this.getComment();
                    this.closeWrite();
                })
            })
        },
        setGood(){
            if(this.isGood === 0){
                this.goodPic = '../../../static/img/good2.png';
            } else {
                this.goodPic = '../../../static/img/good.png';
            }
        },
        changeGood(){
            this.$axios.post('http://scut18pie1.top/test/gift/user/good.php',
            qs.stringify({
                eid:this.info.eid
            })).then (res => {
                if(this.isGood === 0){
                    this.isGood = 1;
                } else {
                    this.isGood = 0;
                }
                
            })
        }

    },
    mounted(){
        var _this = this;
        this.setGood();
        this.getInfo();
        this.$axios.post('http://scut18pie1.top/test/gift/user/click.php',
        qs.stringify({
            eid:_this.info.eid
        })).then(res => {
        })
    },
    directives:{
        focus:{
            inserted: function(el){
                el.focus();
            }
        }
    }
    
}
</script>
<style>
.detailMid{
    margin-bottom:13vw;
}
.commentPlace{
    margin-top:5vw;
}
.commentTag{
    background-color:#f0f4f7;
    padding:2vw;
    border-radius: 3vw;
    text-align: center;
    width:20vw;
    height: 7vw;
    color:#a3a7aa;
    font-size: 4vw;
}
.bg{
    position:fixed;
    top: 0;
    height: 100vh;
    width:  100vw;
    opacity: 0.5;
    background: black;
    z-index: 998;
}
.commentWrite{
    position: relative;
    width:100vw;
    bottom:0;
    height: 40vw;
    border-top:black solid 0.5vw;
}
.commentWrite label{
    color:#CCC;
    font-size: 4vw;
    margin-left: 4vw;
}
.commentWrite textarea{
    width: 90vw;
    background-color:#f7f7f7;
    height: 18vw;
    border-radius: 5vw;
    border:none;
    outline: none;
    padding:3vw;
    position:absolute;
    left: 0;
    right: 0;
    top:2vw;
    margin:2vw auto;

}
.commentWrite button{
    font-size: 4vw;
    position:absolute;
    height: 6vw;
    width: 20vw;
    background-color: #169bd5;
    /* border-radius: 4vw; */
    color:white;
    border:0;
    outline: none;
    right: 3vw;
    bottom:3vw;
}
.multibut{
    position:absolute;
    right: 0;
    top:0;
    bottom:0;
    margin:auto 0;
    font-size: 3vw;

}
.commentBox{
    position:absolute;
    top:0;
    bottom:0;
    margin:auto 0;
}
.commentBox button{
    background: #f0f4f7;
    border:none;
    outline: none;
    border-radius: 3vw;
    width:40vw;
    color:#a3a7aa;
    font-size: 5vw;
    height: 10vw;
    overflow: hidden;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto 0;
}
.commentBox label{
    position:absolute;
    left: 13vw;
    height: 10vw;
    line-height: 10vw;
    top:1vw;
}
.commentBox img{
    position:absolute;
    left: 2vw;
    top:0;
    height: 10vw;
}
.detailTop{
    height: 15vw;
}
.detail .selfItem{
    border:none;
}
.detail .contentBottom{
    display: none;
}
.subDetailBottom{
    position:relative;
    width:100vw;
    height: 13vw;
    border-top:1px #CCC solid;
}
.multibut img{
    margin-top:1vw;
    height:7vw;

}
.detailLast{
    display: flex;
    float: left;
    flex-direction:column;
    justify-items: center;
    align-items: center;
    height: 15vw;
    width: 20vw;
}
.detailBottom{
    position:fixed;
    bottom:0;
    z-index:999;
    background: white;
}

</style>

