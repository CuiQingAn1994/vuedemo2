/**
 * Created by 15-bc219tx on 2017/8/7.
 */
define(["lib/vue","lib/mobile-swipe","css!vm/home/home.css"],function (Vue) {
    return {
        template:"#home-tpl",
        data:function () {
            return {
                swipe1:[],
                swipe2:{
                    page1:[
                        {img:"nav01.png", text:"美食",id:"1"},
                        {img:"nav02.png", text:"电影",id:"2"},
                        {img:"nav03.png", text:"酒店",id:"3"},
                        {img:"nav04.png", text:"爱创商城",id:"4"},
                        {img:"nav05.png", text:"休闲娱乐",id:"5"},
                        {img:"nav06.png", text:"自助餐",id:"6"},
                        {img:"nav07.png", text:"KTV ",id:"7"},
                        {img:"nav08.png", text:"蛋糕甜点",id:"8"}
                    ],
                    page2:[
                        {img:"nav09.png", text:"旅游",id:"9"},
                        {img:"nav10.png", text:"摄影写真",id:"10"},
                        {img:"nav11.png", text:"丽人",id:"11"},
                        {img:"nav12.png", text:"生活服务",id:"12"},
                        {img:"nav13.png", text:"门票",id:"13"},
                        {img:"nav14.png", text:"代金券",id:"14"},
                        {img:"nav15.png", text:"今日新单",id:"15"},
                        {img:"nav16.png", text:"全部分类",id:"0"}
                    ]
                },
                swipe3:[],
                swipe1_obj:0,
                swipe2_obj:0,
                swipe3_obj:0,
                swipe1choose:0,
                swipe2choose:0,
                swipe3choose:0,
                topLine:[],
                recommend:[],
                list:[],
                searchText:"",
                cityPos:"100",
                cityName:"北京",
                citys:[],
                adY:0,
                adIndex:1
            }
        },
        created:function () {
            var me =this;
            this.$http.get("data/home.json").then(function (res) {
                this.swipe1 = res.data.data.swipe1;
                this.swipe3 = res.data.data.swipe3;
                this.topLine = res.data.data.topLine;
                this.recommend = res.data.data.recommend;
                this.list = res.data.data.list;
                this.citys = res.data.data.citys;
            });
            // this.$watch("swipe1",function () {
            //     console.log(this.swipe1_hange)
            //     this.swipe1_hange++;
            // });
            setInterval(function () {
                if(me.adIndex === me.topLine.length){
                    me.adIndex = 0
                }
                me.adY = -0.36*me.adIndex;
                me.adIndex++;
            },2000)
        },
        mounted:function () {
            var me = this;
            this.swipe2_obj = new Swipe(".nav",{
                auto:false,
                swipeEnd:function (index,length) {
                    me.swipe2choose = (index-1);

                }
            });
            this.swipe2_obj.init();
        },
        updated:function () {
            var me = this;
           if(!this.swipe1_obj && this.swipe1.length != 0){
               console.log("创建swipe1");
               this.swipe1_obj = topswipe = new Swipe(".swipebox",{
                   auto:true,
                   speed:2500,
                   swipeEnd:function (index,length) {
                       me.swipe1choose = (index-1);
                   }
               });
               this.swipe1_obj.init();
           }


            if(!this.swipe3_obj && this.swipe3.length != 0){
                console.log("创建swipe3");
                this.swipe3_obj = new Swipe(".adbox",{
                    auto:true,
                    speed:2500,
                    swipeEnd:function (index,length) {
                        me.swipe3choose = (index-1);
                    }
                });
                this.swipe3_obj.init();
            }
        },
        methods:{
            "gosearch":function (id,text) {
                if(id){
                    this.searchText = "";
                }
                this.$store.commit("setSearch",{id:id || 0,type:text || "全部分类",searchText:this.searchText});
                window.location.href = "#/list";
            },
            gouser:function () {
                if(this.$store.state.islogin){
                    window.location.href="#/user";
                }else{
                    window.location.href="#/login/home";
                }
            },
            showCity:function () {
                if(this.cityPos){
                    this.cityPos = 0;
                }else{
                    this.cityPos = 100;
                }

            },
            choseCity:function (city) {
                this.cityName = city;
                this.cityPos = 100;
            }
        }
    }

});