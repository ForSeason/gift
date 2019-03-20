<template>
<div class="result">
    <div class = "resultTop">
            <mt-header fixed title="搜索结果">
                    <mt-button @click="$router.push('/')" slot="left" icon="back">返回</mt-button>
            </mt-header>
    </div>
    <div class = "resultMid">
        <label class="noFound" v-show="info.length === 0">亲，搜索不到你要的信息</label>
        <selfitem v-for="(item,index) in this.List" :info="item" :key="index"></selfitem>
    </div>
</div>
    
</template>
<script>
import { Header } from 'mint-ui';
import selfitem from '../self/selfitem.vue';
export default {
    data() {
        return {
            info:this.$route.query.info,
            List:[],
        }
    },
    components:{
        selfitem,

    },
    methods: {
        listSort(itemOne,itemTwo){
            if(itemOne.time > itemTwo.time){
                return -1;
            } else {
                return 1;
            }

        },
        getList(){
            var _this = this;
                for(var i = 0,j = 0;i<this.info.length;i++){
                    this.$axios.post('/get_event_info.php',
                    qs.stringify({
                        eid:this.info[i]
                    }))
                    .then (re => {
                        this.$axios.post('/get_user_info.php',
                        qs.stringify({
                            id:re.data.id
                        }))
                        .then(response => {
                            var listItem = {};
                            listItem.userinfo = response.data;
                            listItem.time = re.data.createTime*1000;
                            listItem.eid = re.data.eid;
                            listItem.content = re.data.content;
                            listItem.picList = re.data.pics;
                            listItem.goodNumber = re.data.goods;
                            listItem.skimNumber = re.data.clicks;
                            listItem.commentNumber = re.data.chats;
                            listItem.rid = re.data.rid;
                            listItem.type = re.data.type;
                            _this.List.push(listItem);
                            _this.List.sort(this.listSort);
                        })

                    })
                }
        }
        
    },
    mounted() {
        this.getList();

    },
    
}
</script>
<style>
.resultTop{
    height: 13vw;
}
.noFound{
    color:#CCC;
    position:absolute;
    margin-top:10vw;
    font-size: 5vw;
    margin-left: 5vw;

}
.resultMid{
    position: relative;
}

</style>


