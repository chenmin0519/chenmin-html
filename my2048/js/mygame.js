window.onload = init();
var result = false,
    ys = true;

function GetRandom(Min, Max) {
    return Min + Math.round((Max - Min) * Math.random());
}

function RandomNum() {
        var num = GetRandom(1, 16);
        if (document.getElementById(num).innerHTML == "") {
            document.getElementById(num).innerHTML = GetRandom(1, 2) * 2;
        } else {
            RandomNum();
        }
    }
    //初始化数据
function init() {
        var tab = document.getElementById("tab"),
            text = "",
            id = 1;
        for (var i = 1; i < 5; i++) {
            text += "<tr>";
            for (var j = i; j <= i + 12; j += 4) {
                text += "<td id=" + id + "></td>";
                id++;
            }
            text += "</tr>"
        }
        tab.innerHTML = text;
        for (var i = 0; i < 2; i++) {
            RandomNum();
        }
        Result();
    }
    //上
function Top() {
        for (var i = 1; i < 5; i++) {
            ys = true;
            for (var j = i; j <= i + 12; j += 4) {
                for (var x = j; x > 4; x -= 4) {
                    var test1 = document.getElementById(x - 4);
                    var test2 = document.getElementById(x);
                    Change(test1, test2);
                }
            }
        }
    }
    //下
function But() {
        for (var i = 1; i < 5; i++) {
            ys = true;
            for (var j = i + 12; j >= i; j -= 4) {
                for (var x = j; x < 13; x += 4) {
                    var test1 = document.getElementById(x + 4);
                    var test2 = document.getElementById(x);
                    Change(test1, test2);
                }
            }
        }
    }
    //左
function Left() {
        for (var i = 1; i <= 13; i += 4) {
            ys = true;
            for (var j = i; j <= i + 3; j += 1) {
                for (var x = j; x > i; x -= 1) {
                    var test1 = document.getElementById(x - 1);
                    var test2 = document.getElementById(x);
                    Change(test1, test2);
                }
            }
        }
    }
    //右
function Right() {
        for (var i = 1; i <= 13; i += 4) {
            ys = true;
            for (var j = i + 4; j >= i; j -= 1) {
                for (var x = j; x < i + 3; x += 1) {
                    var test1 = document.getElementById(x + 1);
                    var test2 = document.getElementById(x);
                    Change(test1, test2);
                }
            }
        }
    }
    //点击键盘事件
function test() {
        result = false;
        if (event.keyCode == 37) Left();
        if (event.keyCode == 38) Top()
        if (event.keyCode == 39) Right();
        if (event.keyCode == 40) But();
        if (result) RandomNum();
        Result();
    }
    //位置改变并合并
function Change(test1, test2) {
        if (test1.innerHTML == "" && test2.innerHTML != "") {
            result = true;
            test1.innerHTML = test2.innerHTML;
            test2.innerHTML = "";
        } else if (test1.innerHTML != "" && test1.innerHTML == test2.innerHTML && ys) {
            test1.innerHTML = parseInt(test1.innerHTML) + parseInt(test2.innerHTML);
            test2.innerHTML = "";
            result = true;
            ys = false;
        }
    }
    //设置颜色，计算积分
function Result() {
    var result = 0,
        colors = colors = {
            "": "#d3d3d3",
            "2": "#fef4f2",
            "4": "#fed9a2",
            "8": "#fc8c5e",
            "16": "#f8692f",
            "32": "#f8563d",
            "64": "#ff3936",
            "128": "#00c3dd",
            "256": "#00a4be",
            "512": "#00abcb",
            "1024": "#00abcb",
            "2048": "#00abcb",
            "4096": "#005d6e"
        };
    for (var i = 1; i <= 16; i++) {
        var text = document.getElementById(i);
        text.style.backgroundColor = colors[text.innerHTML];
        if (text.innerHTML >= 8) {
            text.style.color = "#FFF";
        } else {
            text.style.color = "#6e6f71"
        }
        if (text.innerHTML != "") {
            result += parseInt(text.innerHTML) * 10;
        }
    }
    document.getElementById("show").innerHTML = result;
}