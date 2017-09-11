/**
 * Created by 15-bc219tx on 2017/8/14.
 */
define(["lib/vue","css!vm/user/user.css"],function (Vue) {
    return {
        template:"#user-tpl",
        data:function () {
            return {
                showorder:true,
                data:{}
            }
        },
        methods:{
            toggleOrder:function () {
                this.showorder = !this.showorder;
            }
        },
        created:function () {
            this.$http.get("data/user.json").then(function (res) {
                this.data = res.data;
            })
        }
    }
})