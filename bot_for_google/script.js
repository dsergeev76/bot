// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

function print_keyword (keyword, input) {
    input.value += keyword[i];
    i++;
}

function get_random (min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

let google_input = document.getElementsByName('q')[0];
let keywords =["гобой","кларнет","саксофон","как звучит флейта","фагот"];
let keyword = keywords[get_random(0,keywords.length)];
let i = 0;
let flag = true;

//google_input.value="гобой";

let btnK = document.getElementsByName('btnK')[0];
if (btnK!=undefined) {
    let timerId = setInterval (function(){
        print_keyword(keyword,google_input);
        if (keyword.length==i) {
            clearTimeout(timerId);
            btnK.click();
        }},500);

} else {
    let page_number = document.querySelector(".YyVfkd").innerText;
    let links = document.links;
    for(let i=0; i<links.length;i++) {
        let link = links[i];
        if (link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1) {
            setTimeout(function(){link.click()},2000);
            flag = false;
            break;
        }
    }
    if (page_number==10) {
        flag = false;
        location.href="https://google.com";
    }
    if (flag) {
        pnnext.click();
    }
}
