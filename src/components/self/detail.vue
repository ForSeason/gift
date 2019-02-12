<template>
    <div class="detail">
        <div class = "detailTop">
            <mt-header fixed title="详细信息">
                    <mt-button @click="$router.back(-1)" slot="left" icon="back">返回</mt-button>
            </mt-header>
        </div>
        <div class = "detailMid">
            <selfitem :info="$route.query.info"></selfitem>
        </div>
    </div>
</template>
<script>
import { Header } from 'mint-ui';
import selfitem from './selfitem.vue';
export default {
    components:{
        selfitem,
    },
        mounted(){
            var _this = this;
        console.log(this.$route.query.info);

        this.$axios.post('http://scut18pie1.top/test/gift/user/click.php',
        qs.stringify({
            eid:_this.$route.query.info.eid
        })).then(res => {
            console.log(res.data);
        })


        this.$axios.post('http://scut18pie1.top/test/gift/user/good.php',
        qs.stringify({
            eid:_this.$route.query.info.eid
        })).then(res => {
            console.log(res.data);
            this.$axios.post('http://scut18pie1.top/test/gift/user/get_event_info.php',
            qs.stringify({
                eid:_this.$route.query.info.eid,
            }))
            .then(re => {
                console.log(re.data);
            })
        })
    }
    
}
</script>
<style>
.detailTop{
    height: 15vw;
}
.detail .selfItem{
    border:none;
}
.detail .contentBottom{
    display: none;
}

</style>

