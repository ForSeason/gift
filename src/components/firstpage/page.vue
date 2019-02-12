<template>
<div class="firstPage">
    
    <div class="firstTop">
        
        <div class='towChoices'>
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">全部</mt-tab-item>
                <mt-tab-item id="2">寻物启事</mt-tab-item>
                <mt-tab-item id="3">失物招领</mt-tab-item>
            </mt-navbar>
        </div>
        <search></search>
    </div>
    <div class="firstMid">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottomAllLoaded="allLoaded" ref="loadmore">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <selfitem v-for="(item,index) in this.List" :info="item" :key="index"></selfitem>
                </mt-tab-container-item>
                 <mt-tab-container-item id="2">
                    <selfitem v-for="(item,index) in this.foundList" :info="item" :key="index"></selfitem>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <selfitem v-for="(item,index) in this.lostList" :info="item" :key="index"></selfitem>
                </mt-tab-container-item>
            </mt-tab-container>
        </mt-loadmore>
    </div>
    <div class=firstBottom >
        <guide></guide>
    </div>
</div>
    
</template>
<script>
import { Navbar, TabItem } from 'mint-ui';
import selfitem from '../self/selfitem.vue';
import guide from '../guide/bottom.vue';
import search from './search.vue';
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import { setTimeout } from 'timers';
export default {
    mounted(){
        this.getList(0,0);
        this.getList(0,1);
        this.getList(0,2);
    },
    components:{
        selfitem,
        guide,
        search,
    },
    watch:{
        List(val){

        }
    },
    data(){
        return {
            selected:'1',
            allLoaded:false,
            active:'',
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
            lostList:[],
            foundList:[],

        }
    },
    methods:{
        overLoad(type){
            if(type === 1){
                this.$refs.loadmore.onTopLoaded();
            } else if(type === 2){
                this.$refs.loadmore.onBottomLoaded();
            }
            
            
        },
        loadTop(){
            setTimeout(() =>{this.overLoad(1)},500);
        },
        loadBottom(){
            setTimeout(() =>{this.overLoad(2)},500);
        },
        listSort(itemOne,itemTwo){
            if(itemOne.time > itemTwo.time){
                return -1;
            } else {
                return 1;
            }

        },
        getList(start,type){
            var _this = this;
            var data = '';
            if(type === 0){
                data = qs.stringify({
                    start:start,
                    step:1,
                })
            } else {
                data = qs.stringify({
                    start:start,
                    step:1,
                    type:type
                })
            }
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_event_list.php',data)
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
                            if(type === 0){
                                _this.List.push(listItem);
                                _this.List.sort(this.listSort);
                            } else if(type === 1){
                                _this.lostList.push(listItem);
                                _this.lostList.sort(this.listSort);
                            } else if(type ===2 ){
                                _this.foundList.push(listItem);
                                _this.foundList.sort(this.listSort);
                            }

                        

                        })

                    })
                }
            })
            

        }
    }
    
}
</script>
<style>
.towChoices{
    /* display: flex; */
    height: 10vw;
}
.mint-navbar{
    height: 100%;
}
.towChoices button{
    background: white;
    flex-grow: 1;
    color:white;
    outline: 0;
    border:none;
    border-left:1vw #CCC solid
}
.firstPage{
    padding:0 0.5vw;


}
.firstMid{
    padding:0 3vw;
    height:calc(100vh - 45vw);
    overflow:scroll;
}
.firstBottom{
    position: fixed;
    bottom:0;
    height:20vw;
     width: 100%;

}

</style>


