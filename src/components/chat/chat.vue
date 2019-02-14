<template>
<div class="chat">
    <input id="myPic" accept=".jpg,.png" @change="sendPic" style="position:absolute;visibility: hidden;" type="file">
    <div class = "chatTop">
            <mt-header fixed :title="info.thatName">
                    <mt-button @click="$router.push('/')" slot="left" icon="back"></mt-button>
            </mt-header>
    </div>
    <div class="chatMid">

    </div>
    <div class = "chatBottom">
        <div class = "chatPlace">
            <input type="text">
            <div class='picBox'>
                <img @click="picClick" src="../../../static/img/picture.png">
                <button>发送</button>
            </div>
        </div>

    </div>
    
</div>

    
</template>
<script>
import { Header } from 'mint-ui';
export default {
    data() {
        return {
            info:this.$route.query,
            ishave:false,
            rid:'',
            chatList:[
                
            ]
            
        }
    },
    methods: {
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
                console.log(res.data);
                document.getElementById('myPic').value = '';
                
            })
        },
        picClick(){
            document.getElementById("myPic").click();

        },
        isHave(){
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_room_list.php')
            .then (res => {
                console.log(res.data);
            })
            // this.$axios.post('http://scut18pie1.top/test/gift/user/create_a_chatroom.php',
            // qs.stringify({
            //     title:this.info.myName + ' And ' + this.info.thatName,
            //     participants:[this.info.myId,this.info.thatId],
            // })).then ( res => {
            //     console.log(res.data);
            // })
        }
    },
    mounted() {
        if(this.info.myId === this.info.thatId){
            this.$router.back(-1);
            return;
        }
        this.isHave();

    },
    
}
</script>
<style>
.chat .chatTop .mint-header{
    
    background-color: white;
    color:black;
    height: 15vw;
    font-size: 4vw;

}
.chatTop{
    position: relative;
    height: 15vw;
    border-bottom:0.3vw #CCC solid;
}
.chatBottom{
    position:fixed;
    bottom:0;
    width:100vw;
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


