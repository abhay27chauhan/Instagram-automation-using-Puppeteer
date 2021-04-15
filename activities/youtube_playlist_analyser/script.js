const puppeteer = require("puppeteer");
let cTab;

(async function fn() {
    try {
        let browserOpenPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let browser = await browserOpenPromise;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];
        await cTab.goto("https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq")
        await cTab.waitForSelector("h1#title");
        let playlistName = await cTab.evaluate(consoleFnForName, "h1#title");
        let statObj = await cTab.evaluate(consoleFnForStats, "#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer")

        console.log(playlistName, statObj.noOfVideos, statObj.noOfviews)
        let noOfSupposedVideos = statObj.noOfVideos.split(" ")[0];

        let cvlength = await getCVLength();
        while(noOfSupposedVideos - cvlength >= 20){
            await scrollToBottom();
            cvlength = await getCVLength();
        }
        let list = await getStats();

        console.table(list);
    } catch (err) {
        console.log(err);
    }
})();

async function getStats(){
    let list = await cTab.evaluate(consoleFnForNameAndTime, "#video-title", "#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer");
    return list;
}

async function getCVLength(){
    let length = await cTab.evaluate(consoleFnForLength, "#container>#thumbnail span.style-scope.ytd-thumbnail-overlay-time-status-renderer")
    return length;
}

async function scrollToBottom(){
    await cTab.evaluate(goToBottom);
}

function goToBottom() {
    window.scrollBy(0, window.innerHeight);
}

function consoleFnForName(sel){
    return document.querySelector(sel).innerText;
}

function consoleFnForStats(selector){
    let allElems = document.querySelectorAll(selector);
    let noOfVideos = allElems[0].innerText;
    let noOfviews = allElems[1].innerText;
    return {
        noOfVideos,
        noOfviews
    }
}

function consoleFnForNameAndTime(titleSel, timeSel){
    let allNamesElem = document.querySelectorAll(titleSel);
    let durationElem = document.querySelectorAll(timeSel);
    let currentVideoList = []
    for (let i = 0; i < durationElem.length; i++) {
        let videoTitle = allNamesElem[i].innerText;
        let duration = durationElem[i].innerText;

        currentVideoList.push({ videoTitle, duration });
    }
    return currentVideoList;
}

function consoleFnForLength(timeSel){
    let durationElem = document.querySelectorAll(timeSel);
    return durationElem.length;
}
