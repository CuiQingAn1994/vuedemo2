/**
 * Created by 15-bc219tx on 2017/8/8.
 */
define(["lib/vue","mrouter","lib/vue-resource","lib/vuex","router/router","vm/home/home","vm/list/list","css!vm/app.css"],function (Vue,VueRouter,VueResource,Vuex,router,home,list) {
    Vue.use(VueRouter);
    Vue.use(VueResource);
    Vue.use(Vuex);
    var store = new Vuex.Store({
        state:{
            searchObj:{id:0,type:"全部分类",searchText:""},
            islogin:false
        },
        mutations:{
            setSearch:function (state,searchObj) {
                state.searchObj = searchObj;
            },
            changeLogin:function (state,type) {
                state.islogin = type;
            }
        }
    })

    var app = new Vue({
        el:"#app",
        router:router,
        data:{

        },
        store:store
    });


})
