<template>
<div class="firstPage">
    <div class="firstTop">
    </div>
    <div class="firstMid">
        <selfitem v-for="(item,index) in this.List" :info="item" :key="index"></selfitem>
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
        console.log('dd');
        this.getList(0);
    },
    components:{
        selfitem,
        guide,
    },
    watch:{
        List(val){
            console.log(val);
        }
    },
    data(){
        return {
            List:[
                // {
                //     eid:12,
                //     time:1549181649005,
                //     content:'wolaoposdfsdfa',
                //     picList:[],
                //     goodNumber:50,
                //     skimNumber:69,
                //     commentNumber:70,
                //     rid:1,
                //     userinfo:{

                //     }
                // }
            ],

        }
    },
    methods:{
        getList(start){
            var _this = this;
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_event_list.php',
            qs.stringify({
                start:start,
                step:5,
            }))
            .then(res => {
                for(var i = 0,j = 0;i<res.data.length;i++){
                    this.$axios.post('http://scut18pie1.top/test/gift/user/get_event_info.php',
                    qs.stringify({
                        eid:res.data[i]
                    }))
                    .then (re => {
                        this.$axios.post('http://scut18pie1.top/test/gift/user/get_user_info.php',
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
                            _this.List[start+j] = (JSON.parse(JSON.stringify(listItem)));
                            j++;
                            var fakeList = [];
                            for(var k = 0;k < _this.List.length;k++){
                                fakeList[k] = _this.List[k];
                            }
                            _this.List = fakeList;
                            //console.log(_this.List);
                        })

                    })
                }
            })
            

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


