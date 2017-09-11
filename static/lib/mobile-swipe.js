/**
 * mobile-swipe 1.0.0
 * Created by lvyang on 2017/8/8.
 * 移动端滑动滚动插件
 * @param container 轮播的容器
 * @param params 轮播的参数 auto是否自动轮播 speed轮播速度  swipeEnd是每次轮播后的回调
 * @constructor
 */
var Swipe = function (container,params) {
    this.params = {
        auto:true,
        speed:2000
    }//传递的参数
    if(params){
        if(!params.auto) this.params.auto = params.auto;
        if(params.speed) this.params.speed = params.speed;
        if(params.swipeEnd) this.params.swipeEnd = params.swipeEnd;
    }
    this.container = container; //容器元素
    this.startX = 0;    //起始位置
    this.endX = 0;     //结束位置
    this.clientWIdth = 0; //屏幕宽度
    this.lock = false; //是否锁定 （节流锁）
    this.liLength = 0; //轮播内容长度
    this.liIndex = 1; //当前轮播索引
    this.nowTranslate = 0;
};
Swipe.prototype.init = function () {
    this.clientWIdth =  document.querySelector(this.container).clientWidth;//document.documentElement.clientWidth;
    this.swipe_container = document.querySelector(this.container+" .swipe-container");
    this.swipe_lis = document.querySelectorAll(this.container+" .swipe-li");
    this.liLength =  this.swipe_lis.length;
    this.nowTranslate = -this.clientWIdth;
    this.swipe_container.style.transform = "translateX("+(this.nowTranslate)+"px)"
    this.initPos();
    this.initEvent();
};
Swipe.prototype.initEvent = function () {
    var me = this;
    this.swipe_container.addEventListener("touchstart",function (e) {
        me.toucheStart(e);
    });
    this.swipe_container.addEventListener("touchmove",function (e) {
        me.toucheMove(e);
    });
    this.swipe_container.addEventListener("touchend",function (e) {
        me.toucheEnd(e);
    })
};
Swipe.prototype.toucheStart = function (e) {
    if(this.locks){ return false}
    this.startX = e.touches[0].clientX;
};
Swipe.prototype.toucheMove = function (e) {
    if(this.locks){ return false}
    this.endX = e.touches[0].clientX;
    var moveX = this.endX-this.startX;
    this.swipe_container.style.transform = "translateX("+(moveX+this.nowTranslate)+"px)"
};
Swipe.prototype.toucheEnd = function (e) {
    if(this.endX === 0){
        return;
    }
    if(this.locks){ return false}
    this.locks = true;
    var me = this;
    var moveX = this.endX-this.startX;
    if(Math.abs(moveX) < 50){
        this.swipe_container.style.transition = "all 350ms ease 0s";
        this.swipe_container.style.transform = "translateX("+(this.nowTranslate)+"px)"
    }else{
        if(moveX > 0){
            this.nowTranslate += this.clientWIdth;
            this.swipe_container.style.transition = "all 350ms ease 0s";
            this.swipe_container.style.transform = "translateX("+this.nowTranslate+"px)";
            setTimeout(function () {

                me.resetPos("del");
            },350)
        }else{
            this.nowTranslate -= this.clientWIdth;
            this.swipe_container.style.transition = "all 350ms ease 0s";
            this.swipe_container.style.transform = "translateX("+this.nowTranslate+"px)";
            setTimeout(function () {
                me.resetPos("add");
            },350)
        }
    }
    setTimeout(function () {
        me.swipe_container.style.transition = "none";
        me.locks = false;
    },360);
    this.startX = 0;
    this.endX = 0;
};
Swipe.prototype.resetPos = function (type) {
    var me = this;
    // for(var i = 0; i < this.swipe_lis.length; i++){
    //     if(i < this.liIndex){
    //         this.swipe_lis[i].style.left = -((this.liIndex-i)*this.clientWIdth)+"px";
    //     }else if(i === this.liIndex){
    //         this.swipe_lis[i].style.left = "0px";
    //     }else{
    //         this.swipe_lis[i].style.left = (i-this.liIndex)*this.clientWIdth+"px";
    //     }
    // }
    if(type === "del"){
        me.liIndex--;
        if(me.liIndex === 0){
            me.liIndex = me.liLength-2;
            me.nowTranslate = -(me.clientWIdth * me.liIndex);
            me.swipe_container.style.transform = "translateX("+me.nowTranslate+"px)";
        }
    }else{
        me.liIndex++;
        if(me.liIndex === me.liLength-1){
            me.liIndex = 1;
            me.nowTranslate = -(me.clientWIdth * me.liIndex);
            me.swipe_container.style.transform = "translateX("+me.nowTranslate+"px)";
        }
    }
    if(this.params.swipeEnd){
        this.params.swipeEnd(this.liIndex,this.liLength-2)
    }
    this.swipe_container.style.transition = "none";
    // this.swipe_container.style.transform = "translateX(0px)";
};
Swipe.prototype.initPos = function () {
    var me = this;
    var length = this.swipe_lis.length;
    var temp_last = this.swipe_lis[length-1].cloneNode(true);
    var temp_first = this.swipe_lis[0].cloneNode(true);
    this.swipe_container.insertBefore(temp_last,this.swipe_lis[0]);
    this.swipe_container.appendChild(temp_first);
    this.swipe_lis = document.querySelectorAll(this.container+" .swipe-li");
    this.liLength =  this.swipe_lis.length;
    // this.resetPos();
    if(this.params.auto){
        setInterval(function () {
            if(me.locks){return false}
            me.locks = true;
            me.nowTranslate -= me.clientWIdth;
            me.swipe_container.style.transition = "all 350ms ease 0s";
            me.swipe_container.style.transform = "translateX("+me.nowTranslate+"px)";
            setTimeout(function () {
                me.resetPos("add");
                me.locks = false;
            },350)
        },this.params.speed)
    }

};