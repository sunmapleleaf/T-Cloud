

var winWidth = 0, winHeight = 0;
// 获取窗口宽度
if (window.innerWidth)
    winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
    winWidth = document.body.clientWidth;
// 获取窗口高度
if (window.innerHeight)
    winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
    winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
}

var userID = getCookie('userID');

//(function browserRedirect() {
//    var sUserAgent = navigator.userAgent.toLowerCase();
//    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
//    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
//    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
//    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
//    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
//    var bIsAndroid = sUserAgent.match(/android/i) == "android";
//    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
//    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
//    if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
//        window.location.replace('http://' + location.host + '/mobile/index.html');
//    }
//})();
if (userID == null)
    location.href = "../login.html?monitor/index.html";




$(document).ready(function () {


    //设置 body 宽度为 window宽度,解决模态框中禁止滚动条后body宽度会变，子元素设为的100%宽度也会有变化
    $("body").css("width", winWidth);
     $("body").css("height", winHeight);

    $("#myexample .dropdown-toggle").html(userID+'<b class="caret"></b>');
    //$("#myexample dropdown-toggle")

    $(".icon-chevron-left").click(function () {
        var regExp = /machineID[^&]+/;
        location.href = "http://"+location.host+"/monitor/machine.html?machineID="+(window.location.href.match(regExp) && window.location.href.match(regExp).toString().split("=")[1].trim()) || "gefranVedo001";;

    })

    //退出
    $("#myexample .dropdown-menu li:last-child").click(function () {
        
        location.href = "../login.html?url="+encodeURI(location.href);

    });


})

/** 
  * 获取指定URL的参数值 

  */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


// cookie
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;

}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return null;
}
//清除cookie  
function clearCookie(name) {
    setCookie(name, "", -1);
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

(function () { var a, b = {}.hasOwnProperty; a = jQuery, a.fn.extend({ wodry: function (c) { var d, e, f, g, h; return null == c && (c = {}), e = a.extend({}, c), null == e.separator && (e.separator = "|"), null == e.delay && (e.delay = 2e3), null == e.animationDuration && (e.animationDuration = 500), null == e.animation && (e.animation = "rotateY"), null == e.callback && (e.callback = function () { }), null == e.shift && (e.shift = {}), null == (f = e.shift).x && (f.x = 0), null == (g = e.shift).y && (g.y = 0), null == (h = e.shift).z && (h.z = 0), null == e.styles && (e.styles = []), d = { rotateY: { front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotateY(180deg)", action: { transform: " rotateY(180deg)", transition: " " + e.animationDuration + "ms" } }, rotateX: { front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotateX(180deg)", action: { transform: " rotateX(180deg)", transition: " " + e.animationDuration + "ms" } }, rotateAll: { isCoplex: !0, front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotateX(180deg) rotateY(180deg)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotateX(180deg) rotateY(180deg)", action: { transform: " rotateX(180deg) rotateY(180deg)", transition: " " + e.animationDuration + "ms" } }, scaleX: { isCoplex: !0, front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) scaleX(0.1)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) scaleX(0.1)", action: { transform: " scaleX(10)", transition: " " + e.animationDuration + "ms" } }, scaleY: { isCoplex: !0, front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) scaleY(0.1)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) scaleY(0.1)", action: { transform: " scaleY(10)", transition: " " + e.animationDuration + "ms" } }, scaleAll: { isCoplex: !0, front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) scaleY(0.1) slaleX(0.1)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) scaleY(0.1) scaleX(0.1)", action: { transform: " scaleY(10) scaleX(10)", transition: " " + e.animationDuration + "ms" } }, anticlockwise: { isCoplex: !0, front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotate3d(100,40,-80,180deg)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotate3d(100,40,-80,180deg)", action: { transform: " rotate3d(100,40,-80,180deg)", transition: " " + e.animationDuration + "ms" } }, clockwise: { isCoplex: !0, front_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotate3d(40,100,80,180deg)", back_transform: "translate3d(" + e.shift.x + "px," + e.shift.y + "px," + e.shift.z + "px) rotate3d(40,100,80,180deg)", action: { transform: " rotate3d(40,100,80,180deg)", transition: " " + e.animationDuration + "ms" } } }, this.map(function () { var c, f, g, h, i, j, k, l, m; return i = a(this), f = [], a.each(i.text().split(e.separator), function (a, b) { return f.push(b) }), m = 0, e.styles.length > 0 ? i.html("<span class='" + e.styles[0] + "'>" + f[0] + "</span>") : i.text(f[0]), k = function () { return m = (m + 1) % e.styles.length }, j = "front-face", g = "back-face", l = function (a, c) { var d, e, f, g, h, i, j, k, l, m, n; for (i = {}, g = {}, l = 0, m = a.length; m > l; l++) h = a[l], d = a.indexOf(h), g[h] = c[d]; if (a.length === c.length) { for (h in g) b.call(g, h) && (j = g[h], n = ["-webkit-" + h, "-moz-" + h, "-o-" + h], k = n[0], e = n[1], f = n[2], i[k] = j, i[e] = j, i[f] = j, i[h] = j); return i } }, c = function (b, c, d, e) { return c.html(""), a("<span class='" + j + "'>" + d + "</span>").appendTo(c), a("." + c.context.className + " .front-face").css(l(["transform"], [b.front_transform])), a("<span class='" + g + "'>" + e + "</span>").appendTo(c), a("." + c.context.className + " .back-face").css(l(["transform"], [b.back_transform])), c.wrapInner("<span class='wodry-flipping' />").find(".wodry-flipping").hide().show().css(l(["transform", "transition"], [b.action.transform, b.action.transition])), b.isCoplex ? setTimeout(function () { return a("." + c.context.className + " .front-face").remove() }, 1) : void 0 }, h = function () { var b, h; return e.styles.length > 0 && (j = "front-face " + e.styles[m], g = "back-face " + e.styles[k()]), i.find(".back-face").length > 0 && i.html(i.find(".back-face").html()), h = i.text(), b = a.inArray(h, f), b + 1 === f.length && (b = -1), c(d[e.animation], i, h, f[b + 1]) }, setInterval(function () { return h(), e.callback() }, e.delay + e.animationDuration) }) } }) }).call(this);
