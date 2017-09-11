/**
 * Created by 15-bc219tx on 2017/8/7.
 */
define(["lib/vue","css!vm/detail/detail.css"],function (Vue) {
    return {
        template:"#detail-tpl",
        data:function () {
            return {
                detailId:"",
                detailObj:{}
            }
        },
        created:function () {
            var id = this.$route.params.id;
            this.$http.get("data/detail.json",{params:{proid:id}}).then(function (res) {
                this.detailObj = res.data.data;
            })
        },
        methods:{
            goback:function () {
                window.history.back();
            },
            goPay:function () {
                if(this.$store.state.islogin){
                    window.location.href="#/pay/"+this.$route.params.id;
                }else{
                    window.location.href="#/login/pay?id="+this.$route.params.id;
                }
            }
        }
    }
})