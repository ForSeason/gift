<template>
<div class="search">
    <div>
        <img src = "../../../static/img/search.png">
        <input v-model="text" placeholder="搜索" type="text">
    </div>
    
    <button @click="search">搜索</button>

</div>
    
</template>


<script>
export default {
    data() {
        return {
            text:'',
            
        }
    },
    methods: {
        search(){
            if(this.text === ''){
                Toast({
                    message:"内容不能为空",
                    position:'bottom',
                    duration:'1000',
                });
                return;
            }
            this.$axios.post('/search_event.php',
            qs.stringify({
                content:this.text,
            })).then( res => {
                this.$router.push({
                    path:'/result',
                    query:{
                        info:res.data
                    }
                })
            })

        }
    },


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

