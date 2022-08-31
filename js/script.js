"use strict";

var progress = document.querySelector(".progress"),
    textarea = document.querySelector("textarea"),
    counter = document.querySelector(".counter"),
    backdrop = document.querySelector('.backdrop'),
    highlight = document.querySelector('.highlights');

// Nastavenie dĺžky textu na 40 a vytiahnutie dĺžky progress krúžku
var pathLength =progress.getAttribute("r")*2* Math.PI,  //obvod kruhu //progress.getTotalLength() -->deprecated
    tweetLength = 40,
    //nastavenie zón od ktorých sa bude kruh zafarbovať podľa classov
    warnZone = Math.floor(tweetLength*(1/2)),
    dangerZone = Math.floor(tweetLength*(3/4));

    progress.style.strokeDasharray = pathLength + "px",
    progress.style.strokeDashoffset = pathLength + "px";
//Pridanie event listeneru na textareu – input – tj po každej zmene inputu sa zavolá funkcia

//7A Funkcie
let handleProgress = function (pathLength, per){
    var newOffset = pathLength - (pathLength*per) + "px"; //od pôvodného obvodu odrátame vynásobenú dĺžku daným pomerom
        progress.style.strokeDashoffset = newOffset;   //nastavenie nového offsetu  
    }

let handleColors = function (warnZone, dangerZone, len, tweetLength){
    progress.classList.toggle("warn", len > warnZone && len < dangerZone);
    progress.classList.toggle("danger", len >= dangerZone );
    progress.classList.toggle("tragedy", len == tweetLength );
}

let handleCounter = function (counter, tweetLength, len, dangerZone) {
    counter.textContent = tweetLength - len;
    counter.classList.toggle("danger", len >= dangerZone );
    };


textarea.addEventListener("keydown", function(event){
        var len = textarea.value.length, //pomocou value sa zisťuje, čo sme do textarea napísali a pomocou length počet znakov
            per = len/tweetLength; //Pomer medzi aktuálnou dĺžkou a možnou dĺžkou tweetu 
        

//posúvame, len ak je dĺžka textu menšia/rovná stanovenej dĺžke tweetu
    if (len <= tweetLength){

    handleProgress  (pathLength, per);
    handleColors (warnZone, dangerZone, len, tweetLength);


if (event.code === "Backspace"){
    progress.classList.remove("tragedy", "danger");
    progress.classList.add("progress");
}
}

handleCounter(counter, tweetLength, len, dangerZone);

//7F Highlight 
  $('textarea').highlightTextarea({
     ranges: [{
        color: '#FFB8C2',
         start: tweetLength,
                   }]
            }).focus();    });

