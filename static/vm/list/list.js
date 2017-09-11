/**
 * Created by 15-bc219tx on 2017/8/7.
 */
define(["lib/vue","css!vm/list/list.css"],function (Vue) {
    return {
        template:"#list-tpl",
        data:function () {
            return {
                list:[],
                searchText:"",
                gosearchText:"",
                showClass:"",
                nores:false,
                showtype:"",
                slideboxFix:false,
                orderText:"默认排序",
                placeText:"商区",
                filterS:"",
                filterE:"",
                surefilterS:"",
                surefilterE:"",
                id:0,
                types:[
                    {img:"nav16.png", text:"全部分类",id:"0"},
                    {img:"nav01.png", text:"美食",id:"1"},
                    {img:"nav02.png", text:"电影",id:"2"},
                    {img:"nav03.png", text:"酒店",id:"3"},
                    {img:"nav04.png", text:"爱创商城",id:"4"},
                    {img:"nav05.png", text:"休闲娱乐",id:"5"},
                    {img:"nav06.png", text:"自助餐",id:"6"},
                    {img:"nav07.png", text:"KTV ",id:"7"},
                    {img:"nav08.png", text:"蛋糕甜点",id:"8"},
                    {img:"nav09.png", text:"旅游",id:"9"},
                    {img:"nav10.png", text:"摄影写真",id:"10"},
                    {img:"nav11.png", text:"丽人",id:"11"},
                    {img:"nav12.png", text:"生活服务",id:"12"},
                    {img:"nav13.png", text:"门票",id:"13"},
                    {img:"nav14.png", text:"代金券",id:"14"},
                    {img:"nav15.png", text:"今日新单",id:"15"}

                ],
                orders:[
                    {id:"title",desc:false,text:"默认排序"},
                    {id:"sale",desc:false,text:"销量最高"},
                    {id:"score",desc:false,text:"评价最高"},
                    {id:"price",desc:true,text:"价格最低"},
                    {id:"price",desc:false,text:"价格最高"},
                    {id:"discount",desc:false,text:"优惠最大"}
                ],
                place:[]
            }
        },
        created:function () {
            var id = this.id = this.$store.state.searchObj.id;
            this.showClass = this.$store.state.searchObj.type;
            this.gosearchText = this.searchText = this.$store.state.searchObj.searchText;
            this.$http.get("data/list.json",{params:{id:id}}).then(function (res) {
                this.list = res.data.data.list;
                this.place = res.data.data.place;
            })
        },
        computed:{
            dealList:function () {
                var searchText = this.gosearchText;
                var searchId = +this.id;
                var searchPlace = this.placeText;
                var filterS = this.surefilterS;
                var filterE = this.surefilterE;
                if( this.surefilterS > this.surefilterE &&(filterS!=""&&filterE!="")){
                    filterS = this.surefilterE;
                    filterE = this.surefilterS;
                }
                var arr = [];
                if(searchText === ""){
                    this.nores = false;
                    arr = this.list;
                }else{
                    for(var i = 0;i < this.list.length; i++){
                        if(this.list[i].title.indexOf(searchText) >= 0){
                            arr.push(this.list[i])
                        }
                    }
                }

                if(searchId != 0){
                    var arr1 = [];
                    for(var i = 0; i <arr.length; i++ ){
                        if(arr[i].id === searchId){
                            arr1.push(arr[i]);
                        }
                    }
                    arr = arr1;
                }

                if(searchPlace != "商区"){
                    var arr2 = [];
                    for(var i = 0; i <arr.length; i++ ){
                        if(arr[i].place === searchPlace){
                            arr2.push(arr[i]);
                        }
                    }
                    arr = arr2;
                }

                if(filterS != "" || filterE != ""){
                    var arr3 = [];
                    for(var i = 0; i <arr.length; i++ ){
                       if(filterS === ""){
                           if(arr[i].price <= filterE){
                               arr3.push(arr[i]);
                           }
                       }else if(filterE === ""){
                           if(arr[i].price >= filterS){
                               arr3.push(arr[i]);
                           }
                       }else{
                           if(arr[i].price >= filterS && arr[i].price <= filterE){
                               arr3.push(arr[i]);
                           }
                       }
                    }
                    arr = arr3;
                }

                if(arr.length === 0){
                    this.nores = true;
                }else{
                    this.nores = false;
                }
                return arr;
            }
        },
        methods:{
            goback:function () {
                window.history.back();
            },
            gosearch:function () {
                 this.gosearchText = this.searchText;
                 this.searchText = "";
            },
            changeshow:function (type) {
                if(type === this.showtype){
                    this.hideClassBar();
                }else{
                    this.slideboxFix = true;
                    this.showtype =  type;
                }
            },
            hideClassBar:function () {
                this.slideboxFix = false;
                this.showtype =  "";
            },
            getNewData:function () {
                this.$http.get("data/home.json",{param:{id:this.id}}).then(function (res) {
                    this.list = res.data.data.list;
                })
            },
            chooseClass:function (text,id) {
                this.gosearchText = "";
                this.showClass = text
                this.id =id;
                this.hideClassBar();
            },
            orderBy:function (id,desc,text) {
                this.hideClassBar();
                this.orderText = text;
                this.list.sort(function (a,b) {
                    if(id === "discount"){
                        return (a["price"]-a["oriprice"]) - (b["price"]-b["oriprice"])
                    }else if( id === "title"){
                        return Math.random() > .5?1:-1;
                    }else if(desc){
                        return a[id] - b[id];
                    }else{
                        return  b[id] - a[id];
                    }
                })
            },
            searchByPlace:function (placename) {
                this.placeText = placename;
                this.hideClassBar();
            },
            clearFilter:function () {
                this.filterS = "";
                this.filterE = "";
            },
            surefilter:function () {
                this.surefilterS = this.filterS;
                this.surefilterE = this.filterE;
                this.hideClassBar();
            }
        },
        update:function () {
            // var id = this.$route.params.id;
        }
    }
});