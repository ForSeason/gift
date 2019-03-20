<template>
<div calss="chatList">
    <div class="chatListTop">
        <mt-header title="聊天列表">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        </mt-header>
    </div>
    <div class="chatListMid">
        <label class="lab" v-show="this.list.length === 0">你没有任何聊天</label>
        <chatlistitem v-for = "(item,index) in this.list" :key = "index" :info = "item"></chatlistitem>
    </div>

</div>


    
</template>
<script>
import { Header } from 'mint-ui';
import chatlistitem from './chatlistitem.vue'
export default {
    data() {
        return {
            list:[],
        }
    },
    components:{
        chatlistitem,
    },
    mounted(){
        this.$axios.post('/get_room_list.php')
        .then (res => {
            this.list = res.data;
        })
    }
    
}
</script>
<style>
.lab{
    display: block;
    text-align: center;
    color:#CCC;
    font-size: 5vw;
}

</style>


