// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

function print_keyword (keyword, input) {
    input.value += keyword[i];
    i++;
}

function get_random (min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

let yandex_input = document.getElementsByName('text')[0];
let keywords =["гобой","кларнет","саксофон","как звучит флейта","фагот"];
let keyword = keywords[get_random(0,keywords.length)]; //"полотер";
let i = 0;
let flag = true;


let btn_next = document.getElementsByClassName('pager__item_kind_next')[0];
let search_btn = document.getElementsByClassName('button_theme_websearch button_size_ws-head')[0];
if (search_btn!=undefined) {
    let timerId = setInterval (function(){
        print_keyword(keyword,yandex_input);
        if (keyword.length==i) {
            clearTimeout(timerId);
            search_btn.click();
        }},500);

} else {
    let page_number = document.querySelector(".pager__item_current_yes").innerText;
    let links = document.links;
    for(let i=0; i<links.length;i++) {
        let link = links[i];
        link.removeAttribute("target");
        if (link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1) {
            setTimeout(function(){link.click()},2000);
            flag = false;
            break;
        }
    }
    if (page_number==10) {
        flag = false;
        location.href="https://yandex.ru";
    }
    if (flag) {
        setTimeout(function(){btn_next.click()},5000);
    }
}
