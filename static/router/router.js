/**
 * Created by 15-bc219tx on 2017/8/7.
 */
define(["lib/vue","mrouter","vm/home/home","vm/list/list","vm/detail/detail","vm/login/login","vm/pay/pay","vm/user/user"],function (Vue,VueRouter,Home,List,Detail,Login,Pay,User) {

    var routes =[
        {
            path:"/home",
            component:Home
        },
        {
            path:"/list",
            component:List
        },
        {
            path:"/detail/:id",
            component:Detail
        },
        {
            path:"/login/:type",
            component:Login
        },
        {
            path:"/pay/:id",
            component:Pay
        },
        {
            path:"/user",
            component:User
        },
        {
            path:"*",
            redirect:"/home"
        }
    ]

    return new VueRouter({
        routes:routes
    })

});
