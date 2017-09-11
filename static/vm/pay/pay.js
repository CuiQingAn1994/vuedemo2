/**
 * Created by 15-bc219tx on 2017/8/14.
 */
define(["lib/vue","css!vm/pay/pay.css"],function (Vue) {
    return {
        template:"#pay-tpl",
        data:function () {
            return {
                count:1,
                onePrice:98,
                type:'wx',
                paymsg:"支付中...",
                payingShow:false
            }
        },
        created:function () {
            console.log(this.$route)
        },
        computed:{
            dealTotal:function () {
                return this.count * this.onePrice;
            }
        },
        methods:{
            add:function () {
                this.count++;
            },
            del:function () {
                if(this.count > 1){
                    this.count --;
                }
            },
            chooseType:function (type) {
                this.type = type;
            },
            pay:function () {
                var me = this;
                this.payingShow = true;
                setTimeout(function () {
                    me.paymsg = "支付成功"
                },1000)
                setTimeout(function () {
                    location.href = "#/user"
                },2000)
            }

        }
    }
})