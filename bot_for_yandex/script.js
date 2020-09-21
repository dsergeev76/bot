// ==UserScript==
// @name         Yandex Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function print_keyword (keyword, input) {
    input.value += keyword[i];
    i++;
}

function get_random (min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai": ["гобой","кларнет","саксофон","как звучит флейта","фагот"],
    "crushdrummers.ru": ["барабанное шоу","шоу барабанщиков", "барабанное шоу в Москве"]
};

let site = Object.keys(sites)[get_random(0,Object.keys(sites).length)];

let yandex_input = document.getElementsByName('text')[0];
let keywords = sites[site];
let keyword = keywords[get_random(0,keywords.length)]; //"полотер";
let i = 0;
let flag = true;

let btn_next = document.getElementsByClassName('pager__item_kind_next')[0];
let search_btn = document.getElementsByClassName('button_theme_websearch button_size_ws-head')[0];
if (search_btn!=undefined) {
    document.cookie = "site="+site;
    let timerId = setInterval (function(){
        print_keyword(keyword,yandex_input);
        if (keyword.length==i) {
            clearTimeout(timerId);
            search_btn.click();
        }},500);

} else if (location.hostname!="yandex.ru") {
     if (get_random (0,100)>80 && get_random (0,100)<90) {
         location.href="https://yandex.ru/";
     } else if (get_random (0,100)>90) {
         location.href="https://google.com";
     } else {
         let links = document.links;
         setInterval (function(){
             let link = links[get_random(0,links.length)];
             if (link.href.indexOf(location.hostname)!=-1) {
             setTimeout(function(){link.click()},2000);}},5000);
     }
} else {
    let site = getCookie("site");
    let page_number = document.querySelector(".pager__item_current_yes").innerText;
    let links = document.links;
    for(let i=0; i<links.length;i++) {
        let link = links[i];
        link.removeAttribute("target");
        if (link.href.indexOf(site)!=-1) {
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
