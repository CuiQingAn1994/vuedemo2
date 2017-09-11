/**
 * Created by 15-bc219tx on 2017/8/12.
 */
define(["lib/vue","css!vm/login/login.css"],function (Vue) {
    return {
        template:"#login-tpl",
        data:function () {
            return {
                tel:"",
                showSencond:false,
                second:60,
                timer:"",
                tipmsg:"请输入正确的电话号！",
                checkcode:"",
                isShowTip:false
            }
        },
        computed:{
            dealTel:function () {
                var tel = this.tel;
                if(/^1[0-9]{10}$/.test(tel)){
                    return false
                }else{
                    return true
                }
            }
        },
        created:function () {
            
        },
        methods:{
            getCode:function () {
                var me = this;
                if(this.dealTel) return false;
                this.showSencond = true;
                this.timer = setInterval(function () {
                    --me.second;
                    if(me.second === 0){
                        clearInterval(me.timer);
                        me.showSencond = false;
                    }
                },1000)
            },
            goback:function () {
                history.back();
            },
            login:function () {
                var me = this;
                if(this.dealTel){
                    this.isShowTip = true;
                    this.tipmsg = "请输入正确的电话号！"
                    throttle(fn);
                }else if(this.checkcode === ""){
                    this.isShowTip = true;
                    this.tipmsg = "请输入短信验证码！"
                    throttle(fn);
                }else{
                    this.$store.commit("changeLogin",true);
                    if(this.$route.query.id){
                        window.location.href="#/"+this.$route.params.type+"/"+this.$route.query.id
                    }else{
                        window.location.href="#/"+this.$route.params.type
                    }

                }
                function throttle (fn) {
                    if(fn.fntimer){
                        clearInterval(fn.fntimer)
                    }
                    fn.fntimer = setTimeout(function () {
                        fn();
                    },500)
                }
                function fn() {
                    setTimeout(function () {
                        me.isShowTip = false;
                    },2000)
                };
            }
        }
    }
})