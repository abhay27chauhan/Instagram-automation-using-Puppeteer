const puppeteer = require("puppeteer");
let links = ["https://www.amazon.in", "https://www.flipkart.com/", "https://paytmmall.com"];
let pName = process.argv[2];
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
        let list = await getListingFromAmazon(links[0], pName);
        console.table(list);

    } catch (err) {
        console.log(err);
    }
})();

async function getListingFromAmazon(link, pName) {
    try{

        await cTab.goto(link);
        await waitAndClick("#twotabsearchtextbox")
        await cTab.type("#twotabsearchtextbox", pName, {delay: 200});
        await cTab.click("#nav-search-submit-button")
        await cTab.waitForSelector(".a-section.a-spacing-medium", {visible: true})
        let arr = await cTab.evaluate(ConsoleWalaFn)

        return arr;

    }catch(err){
        console.log(arr);
    }
}

function ConsoleWalaFn() {
    let allElem = document.querySelectorAll(".a-section.a-spacing-medium")
    let arr = [];
    for (let i = 0; i < 5; i++) {
        let name = allElem[i].querySelectorAll(".a-size-medium.a-color-base.a-text-normal")[0].innerText;
        let price = allElem[i].querySelectorAll(".a-price-whole")[0].innerText
        arr.push({
            name,
            price
        })
    }
    return arr;
}

async function waitAndClick(selector){
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