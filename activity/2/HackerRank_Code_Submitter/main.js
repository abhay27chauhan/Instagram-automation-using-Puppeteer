const puppeteer = require("puppeteer");
let cTab;

const browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})

browserOpenPromise
    .then(function(browser){
        let alltabsPromise = browser.pages();
        return alltabsPromise
    })
    .then(function(allTabsArr){
        cTab = allTabsArr[0];
        let visitLoginPagePromise = cTab.goto("https://www.hackerrank.com/auth/login");
        return visitLoginPagePromise;
    })
    .then(function(){
        let emailWillTypedPromise = cTab.type("input[name='username']", "leyovo4533@dwgtcm.com", {delay: 200});
        return emailWillTypedPromise; 
    })
    .then(function(){
        let passwordWillTypedPromise = cTab.type("input[name='password']", "leyovo4533", {delay: 200});
        return passwordWillTypedPromise;
    })
    .then(function(){
        let loginPromise = cTab.click("button[data-analytics='LoginPassword']")
        return loginPromise;
    })
    .then(function(){
        let IpkitPromise = waitAndClick("a[data-analytics='InterviewPromotionCard']")
        return IpkitPromise;
    })
    .then(function(){
        let WarmupPromise = waitAndClick("a[data-attr1='warmup']")
        return WarmupPromise;
    })
    .then(function () {
        let waitForQuestions = cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']", { visible: true });
        return waitForQuestions;
    })
    .then(function () {
        function ConsoleWalaFn() {
            let allElem = document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']")
            let linksArr = [];
            for (let i = 0; i < allElem.length; i++) {
                linksArr.push(allElem[i].getAttribute("href"));
            }
            return linksArr;
        }
        let linkArrPromise = cTab.evaluate(ConsoleWalaFn);
        return linkArrPromise;
        //link -> of all questions
        // serially question -> question solver -> question solve
    })
    .then(function (linksArr) {
        console.log(linksArr);
    })
    .then(function(){
        console.log("done")
    })

function waitAndClick(selector){
    return new Promise(function(resolve, reject){
        let waitForCurSel = cTab.waitForSelector(selector, {visible: true})
        waitForCurSel
            .then(function(){
                let clickPromise = cTab.click(selector)
                return clickPromise
            })
            .then(function(){
                resolve();
            })
            .catch(function(err){
                reject(err);
            })
        
    })
}