/**
 * Created by 15-bc219tx on 2017/8/7.
 */
define([],function () {
    var clientWidth = document.documentElement.clientWidth;
    if(clientWidth < 320){
        clientWidth = 320;
    }
    if (clientWidth > 1024){
        document.documentElement.style.fontSize = "110px";
    }else{
        document.documentElement.style.fontSize = clientWidth/320 * 100+"px"
    }
})