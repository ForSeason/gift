<template>
<div class="bottomGuide">
    <div class="guideItem">
        <img src="../../../static/img/homea.png">
        <label class="clicked">失物招领</label>
    </div>
    <div @click="$router.push('/assign')" class="guideItem">
        <img src="../../../static/img/add.png">
        <label>发布信息</label>
    </div>
    <div @click="$router.push('/chatList')" class="guideItem">
        <img src="../../../static/img/chat.png">
        <label>聊天列表</label>
    </div>
    <div @click="$router.push('/self')" class="guideItem">
        <img src="../../../static/img/user.png">
        <label>个人中心</label>
    </div>
</div>
    
</template>
<script>
export default {
    
}
</script>
<style>
.guideItem{
    display: flex;
    position: relative;
    border-right: 0.5vw #CCC solid;
    display: inline-block;
    width:32vw;
    text-align: center;
    height: 19vw;
}
.bottomGuide div:last-child{
    
    position: relative;
    border:none;
    right: 0;
}
.bottomGuide{
    padding:0;
    position:fixed;
    display:flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    bottom:0;
    width: 100vw;
    height: 15vw;
    background-color: white;
}
.guideItem img{
    position: relative;
    top:2vw;
    height: 7vw;
    width: 7vw;
}
.guideItem label{
    display: block;
    text-align: center;
    font-size: 4vw;
    margin-top:1vw;
    width:100%;
}
.clicked{
    color:#169bd5;
}

</style>


