<template>
<div @click.stop="write" class = "recomment">
    <label class="recommentFirst">{{from}}</label>
    <label v-show="isShow" class="second">回复</label>
    <label v-show="isShow" class="recommentFirst">{{to}}</label>
    <label>:</label>
    <label>{{info.content}}</label>
</div>
    
</template>
<script>
export default {
    props:['info'],
    data() {
        return {
            from:'',
            to:'',
            isShow:false,
        }
    },
    methods:{
        write(){
            this.$emit('write',this.from);
        }
    },
    mounted(){
        this.$axios.post('/get_user_info.php',
        qs.stringify({
            id:this.info.id,
        })).then(res => {
            this.from = res.data.nickname;
            this.to = this.info.to;
            if(this.info.to === 'defaultfloor'){
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        })
    }
    
}
</script>
<style>
.recomment label{
    word-break:break-all;
    font-size: 3.5vw;
}
.recommentFirst{
    color:#169bd5;
}

</style>


