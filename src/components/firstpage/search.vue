<template>
<div class="search">
    <div>
        <img src = "../../../static/img/search.png">
        <input placeholder="搜索" type="text">
    </div>
    
    <button>搜索</button>

</div>
    
</template>


<script>
export default {


}
</script>
<style>
.search{
    padding:0;
    margin:0;
    position: relative;
    margin-top: 2vw;
    margin-bottom:2vw;
    /* border-bottom: black dashed 0.3vw; */
    border:0.6vw solid #169bd5;
    background-color: #169bd5;
    border-radius: 3vw;
    height: 9vw;
    box-shadow: 0 0.5vw 1vw #333;
    overflow: hidden;
}
.search div{
    background-color: white;
    height: 100%;
    width:calc(80vw);

}
.search img{
    position:absolute;
    top:1.5vw;
    left: 2vw;
    height: 6vw;
    width:auto;
}
.search input{
    border:none;
    position:absolute;
    left:10vw;
    height: 100%;
    outline: none;
    width:67vw;

}
.search button{
    margin:0;
    outline: 0;
    border:0;
    position: absolute;
    right: 0;
    height: 10vw;
    width:20vw;
    color:white;
    top:-0.3vw;
    background: #169bd5;
    border:0.5vw solid #169bd5;
}

</style>

