<template>
<div @click = "send" class = "chatListItem">
    <div class="chatListItemTop">
        <div class="imgShow"><div class="lastContentImg"><img @load="configPic" class="showImg" :src="this.sendData.thatPic"></div></div>
        <label>{{this.sendData.thatName}}</label>
    </div>
    
</div>
    
</template>
<script>
export default {
    props:['info'],
    data() {
        return {
            sendData:{},
        }
    },
    mounted(){
        this.$axios.post('http://scut18pie1.top/test/gift/user/pull_chats.php',
        qs.stringify({
            rid:this.info
        })) .then(res => {
            var thatId = '';
            if (res.data.members[0].id === this.$store.state.userinfo.id){
                thatId = res.data.members[1].id;
            } else {
                thatId = res.data.members[0].id;
            }
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_user_info.php',
            qs.stringify({
                id:thatId,
            })) .then (re => {
                this.sendData = {
                    myId:this.$store.state.userinfo.id,
                    myName:this.$store.state.userinfo.name,
                    myPic:this.$store.state.userinfo.pic,
                    thatId:re.data.id,
                    thatName:re.data.nickname,
                    thatPic:re.data.headPic === null?this.$store.state.defalutPic:'http://'+re.data.headPic,
                }
            })

        })
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
        send(){
            this.$router.push({
                path:'/chat',
                query:this.sendData,
            })
        }
    }
    
}
</script>
<style>
.chatListItemTop{
    display: flex;
    align-items: center;
    font-size: 7vw;
    padding:3vw;
    border-bottom: #CCC solid 0.5vw;
}
.chatListItem .imgShow{
    position: relative;
    flex-shrink:0;
    height: 17vw;
    width: 17vw;
    border:0.3vw black solid;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5vw;
}
.chatListItem .lastContentImg{
    width: 100%;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
}

</style>


