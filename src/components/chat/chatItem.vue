<template>
<div class = "chatItem">
    <div :class="{'my':this.info.isMe,'that':!this.info.isMe}">
        <div class="imgShow"><div class="lastContentImg"><img @load="configPic" :src="this.info.pic"></div></div>
        <div class="contentBox"><label>{{content}}<img :src = 'this.pic'></label></div>
        
    </div>
</div>
    
</template>
<script>
export default {
    props:['info'],
    data() {
        return {
            pic:'',

            
        }
    },
    computed:{
        content(){
            if(!(/^img\|/.test(this.info.content))){
                return this.info.content
            } else {
                this.pic = 'http://' + this.info.content.substring(4);
                return '';
            }
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

    }
    
}
}
</script>
<style>
.chatItem .imgShow{
    position: relative;
    flex-shrink:0;
    height: 10vw;
    width: 10vw;
    border:0.3vw black solid;
    border-radius: 2vw;
    overflow: hidden;
}
.chatItem .lastContentImg{
    width: 100%;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
}
.chatItem{
    position: relative;
    margin-top:4vw;
    padding:0 3vw;
    font-size: 4.5vw;
}
.that {
    position: relative;
    display: flex;
}
.that label{
    padding:2vw 3vw;
    padding-right: 3vw;
    background-color: #169bd5;
    border-radius: 2vw;
    display: block;
    word-break: break-all;
}
.that .imgShow{
    order: 1;

}
.that .contentBox{
    order: 2;
    background-image: url('../../../static/img/chatThat.png');
    background-repeat: no-repeat;
    padding-left: 4vw;
    background-size: 5vw 5vw;
    background-position-y: 2vw;
    margin-right: 10vw;
    margin-left: 1vw;
}

.my {
    position: relative;
    display: flex;
    justify-content:flex-end;
}
.my label{
    padding:2vw 5vw;
    padding-right: 3vw;
    background-color: #12c32b;
    border-radius: 2vw;
    display: block;
    word-break: break-all;
}
.my .imgShow{
    order: 2;

}
.my .contentBox{
    order: 1;
    background-image: url('../../../static/img/chatMe.png');
    background-repeat: no-repeat;
    padding-right: 4vw;
    background-size: 5vw 5vw;
    background-position:right top;
    background-position-y: 2vw;
    margin-left: 10vw;
    margin-right: 1vw;
}
.contentBox img{
    max-width: 70vw;
    max-height: 70vw;

}


</style>


