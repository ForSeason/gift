<template>
<div class="chat">
    <input id="myPic" accept="image/*" @change="sendPic" style="position:absolute;visibility: hidden;" type="file">
    <div class = "chatTop">
            <mt-header fixed :title="info.thatName">
                    <mt-button @click="$router.back(-1)" slot="left" icon="back"></mt-button>
            </mt-header>
    </div>
    <div id = 'mid' class="chatMid">
        <chat-item v-for="(item,index) in this.chatList" :key = "index" :info = "item"></chat-item>

    </div>
    <div class = "chatBottom">
        <div class = "chatPlace">
            <input v-model = 'writeData' type="text">
            <div class='picBox'>
                <img @click="picClick" src="../../../static/img/picture.png">
                <button @click = 'send'>发送</button>
            </div>
        </div>

    </div>
    
</div>

    
</template>
<script>
import { Header } from 'mint-ui';
import chatItem from './chatItem.vue'
import { Indicator } from 'mint-ui';
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
    data() {
        return {
            info:this.$route.query,
            ishave:false,
            rid:'',
            time:'',
            writeData:'',
            chatList:[
            ]
            
        }
    },
    components:{
        chatItem,
    },
    watch:{
        ishave(){
            this.time = setInterval(() => {
                this.getMessage();
            }, 500);
            
        },
    },
    methods: {
        toBottom(){
            this.$nextTick(() => {
                document.getElementById('mid').scrollTop = document.getElementById('mid').scrollHeight;

            })
            

            
        },
        getMessage(type = 0){
            this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
            qs.stringify({
                rid:this.rid,
            })).then(res => {
                var chats = res.data.chats;
                var datas = [];
                for(var i = 0;i<chats.length;i++){
                    var item = {};
                    item.isMe = chats[i].id === this.info.myId;
                    item.pic = item.isMe?this.info.myPic:this.info.thatPic;
                    item.content = chats[i].content;
                    datas.push(item);
                }
                if(datas.length > this.chatList.length){
                    type = 1;
                }
                this.chatList = datas;
                if(type === 1){
                    this.toBottom();
                }
            })
        },
        send(){
            if(this.writeData === ''){
                return;
            }
            if(!this.ishave){
                this.$axios.post('http://scut18pie1.top/test/gift/user/create_a_chatroom.php',
                qs.stringify({
                    title:'chatRoom',
                    participants:[this.info.myId,this.info.thatId],
                })).then( res => {
                    this.rid = res.data;
                    this.ishave = true;
                    this.send();
                })
            } else {
                
                this.$axios.post('http://scut18pie1.top/test/gift/user/post_a_chat.php',
                qs.stringify({
                    rid:this.rid,
                    content:this.writeData,
                })) .then( res => {
                    this.getMessage(1);
                })
                this.writeData = '';
            }
        },
        sendPic(){
            var file = document.getElementById('myPic').files[0];
            var formdata = new FormData();
            formdata.append('pic',file);
            this.$axios({
                method:'post',
                url: 'http://scut18pie1.top/test/gift/user/upload_pic.php',
                data:formdata,
                headers:{'Content-Type':'multipart/form-data'},
            })
            .then(res => {
                document.getElementById('myPic').value = '';
                console.log('img|'+res.data);
                this.$axios.post('http://scut18pie1.top/test/gift/user/post_a_chat.php',
                qs.stringify({
                    rid:this.rid,
                    content: 'img|'+res.data,
                })) .then( res => {
                    this.getMessage();
                })
                this.writeData = '';
            })
        },
        picClick(){
            document.getElementById("myPic").click();

        },
        isHave(){
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_room_list.php')
            .then (res => {
                var length = 0;
                if(res.data.length === 0){
                    Indicator.close();
                }
                res.data.forEach((item) => {
                    this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
                    qs.stringify({
                        rid:item,
                    })).then(re => {
                        if(this.ishave){
                            return;
                        }
                        for(var i =0;i<re.data.members.length;i++){
                            if(this.info.thatId === re.data.members[i].id){
                                this.ishave = true;
                                this.rid = item;
                                this.getMessage();
                                Indicator.close();
                            }
                        }
                        length ++;
                        if(length === res.data.length){
                            Indicator.close();
                        }
                    })             
                });

                // for(var i =0;i<res.data.length;i++){
                //     this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
                //     qs.stringify({
                //         rid:res.data[i],
                //     })).then (re => {
                //         console.log(re.data);
                //         for(var j = 0;j<re.data.members.length;j++){
                //             if(re.data.menbers[j] === this.info.thatId){
                //                 this.isHave = true;
                //                 this.rid = 
                //             }
                //         }
                //     })

                // }
            })
            // this.$axios.post('http://scut18pie1.top/test/gift/user/post_a_chat.php',
            // qs.stringify({
            //     rid:26,
            //     content:'你好',
            // })) .then(res => {
            //     console.log('send',res.data);
            // })
            // this.$axios.post('http://scut18pie1.top/test/gift/user/create_a_chatroom.php',
            // qs.stringify({
            //     title:'chatroom',
            //     participants:[this.info.myId,this.info.thatId],
            // })).then(res => {
            //     console.log(res.data);
            // })

            // this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
            // qs.stringify({
            //     rid:26,
            // })).then (res => {
            //     console.log('room data:',res.data);
            // })
        }
    },
    mounted() {
        if(this.info.myId === this.info.thatId){
            this.$router.back(-1);
            return;
        }
        Indicator.open({
        text: '加载中',
        spinnerType: 'fading-circle'
        });
        this.isHave();

    },
    destroyed(){
        if(this.time !== ''){
            clearInterval(this.time);
        }
    }
    
}
</script>
<style>
.chat .chatTop .mint-header{
    
    background-color: white;
    color:black;
    height: 15vw;
    font-size: 4vw;
    border-bottom:0.3vw #CCC solid;

}
.chatTop{
    position: relative;
    height: 15vw;
    
}
.chatBottom{
    position:fixed;
    bottom:0;
    width:100vw;
}
.chatMid{
    margin-bottom:13vw;
    height: calc(100vh - 30vw);
    overflow: scroll;
}
.chatPlace{
    height: 12vw;
    border-top:black solid 0.2vw;
    background: #f0f4f7;
    position: relative;

}
.chatPlace input{
    position:absolute;
    width:60vw;
    left:5vw;
    height: 8vw;
    top:2vw;
    outline: none;
    border:black solid 0.2vw;
    border-radius: 2vw;
    padding:0 3vw;
}
/* .chatPlace img{
    position:absolute;
    height: 8vw;
    width: 8vw;
    right: 5vw;
    top:1vw;

} */
.picBox{
    height: 10vw;
    position:absolute;
    right: 3vw;
    width:25vw;
    display: flex;
    justify-content: space-between;
    align-items:center;
    top:1vw;
}
.picBox img{
    height: 9vw;
    width:auto;
}
.picBox button{
    height: 8vw;
    width: 13vw;
    border:none;
    outline: none;
    background: #169bd5;
    color:white;
}

</style>


