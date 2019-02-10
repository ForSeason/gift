<template>
<div class="firstPage">
    <div class="firstTop">
    </div>
    <div class="firstMid">
        <selfitem :info="this.global.list[0]"></selfitem>
        <selfitem :info="this.global.list[1]"></selfitem>
        <selfitem :info="this.global.list[2]"></selfitem>
    </div>
    <div class=firstBottom >
        <guide></guide>
    </div>
</div>
    
</template>
<script>
import selfitem from '../self/selfitem.vue';
import guide from '../guide/bottom.vue';
export default {
    mounted(){
        this.$axios.post('http://scut18pie1.top/test/gift/user/get_event_list.php',
        qs.stringify({
            start:0,
            step:10
        }))
        .then(res => {
            console.log(res.data);
        })

    },
    components:{
        selfitem,
        guide,
    },
    data(){
        return {
        }
    }
    
}
</script>
<style>
.firstPage{
    padding:0 0.5vw;


}
.firstMid{
    padding:0 3vw;
}
.firstBottom{
    position: fixed;
    bottom:0;
    height:20vw;
     width: 100%;

}

</style>


