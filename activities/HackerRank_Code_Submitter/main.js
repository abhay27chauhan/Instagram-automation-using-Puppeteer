const puppeteer = require("puppeteer");
const { answers } = require("./codes");
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
        let IpkitPromise = waitAndClick("a[href='/interview/interview-preparation-kit']")
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
        let questionSolverPromise = questionSolver(linksArr[0], 0);
        for(let i=1; i<linksArr.length; i++){
            questionSolverPromise = questionSolverPromise.then(() => {
                return questionSolver(linksArr[i], i);
            })
        }
        return questionSolverPromise;
    })
    .then(function(){
        console.log("Question Submited")
    })
    .catch(function(err){
        console.log(err);
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

function questionSolver(qLink, i){
    return new Promise(function(resolve, reject){
        let fullLink = `https://www.hackerrank.com${qLink}`;
        let goToQuestionPagePromise = cTab.goto(fullLink)

        goToQuestionPagePromise
            .then(function(){
                let checkboxPromise = waitAndClick(".checkbox-input")
                return checkboxPromise;
            })
            .then(function(){
                let waitForCustomInput = cTab.waitForSelector(".custominput", {visible: true});
                return waitForCustomInput;
            })
            .then(function(){
                let writeCodePromise = cTab.type(".custominput", answers[i], {delay: 10});
                return writeCodePromise;
            })
            .then(function(){
                let downCntrlPromise = cTab.keyboard.down("Control");
                return downCntrlPromise;
            })
            .then(function(){
                let aPressPromise = cTab.keyboard.press("a");
                return aPressPromise;
            })
            .then(function(){
                let xPressPromise = cTab.keyboard.press("x");
                return xPressPromise;
            })
            .then(function () {
                let pointerWillBeclicked = cTab.click(".monaco-editor.no-user-select.vs");
                return pointerWillBeclicked;
            })
            .then(function () {
                let awillBePressedOnpinter = cTab.keyboard.press("a");
                return awillBePressedOnpinter;
            })
            .then(function () {
                let codePastePromise = cTab.keyboard.press("v");
                return codePastePromise;
            })
            .then(function(){
                let downCntrlPromise = cTab.keyboard.up("Control");
                return downCntrlPromise;
            })
            .then(function () {
                let submitWillClickedPromise = cTab.click(".hr-monaco-submit");
                return submitWillClickedPromise;
            })
            .then(function(){
                resolve();
            })
            .catch(function(err){
                reject(err);
            })
    })
}