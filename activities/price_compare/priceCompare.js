const puppeteer = require("puppeteer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

let pdfDoc = new PDFDocument;
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
        pdfDoc.pipe(fs.createWriteStream('Amazon.pdf'));
        pdfDoc.text(JSON.stringify(list));

        list = await getListingFromFlipkart(links[1], pName);
        console.table(list);
        pdfDoc.pipe(fs.createWriteStream('Flipkart.pdf'));
        pdfDoc.text(JSON.stringify(list));

        list = await getListingFromPaytm(links[2], pName);
        console.table(list);
        pdfDoc.pipe(fs.createWriteStream('Paytm.pdf'));
        pdfDoc.text(JSON.stringify(list));
        pdfDoc.end();
        

    } catch (err) {
        console.log(err);
    }
})();

async function getListingFromAmazon(link, pName) {
    try{
        await cTab.goto(link);
        await cTab.type("#twotabsearchtextbox", pName, {delay: 200});
        await cTab.click("#nav-search-submit-button")
        await cTab.waitForSelector(".a-section.a-spacing-medium", {visible: true})
        let arr = await cTab.evaluate(consoleFnAmazon, 
            ".s-include-content-margin.s-border-bottom.s-latency-cf-section",
            ".aok-inline-block.s-sponsored-label-info-icon",
            ".a-size-medium.a-color-base.a-text-normal",
            ".a-price-whole")

        return arr;

    }catch(err){
        console.log(err);
    }
}

async function getListingFromFlipkart(link, pName) {
    try{
        await cTab.goto(link);
        await cTab.type("input[type='text']", pName, { delay: 200 });
        await cTab.click("._2KpZ6l._2doB4z");
        await cTab.click(".L0Z3Pu");
        await cTab.waitForSelector("._4rR01T", { visible: true });
        await cTab.waitForSelector("._30jeq3._1_WHN1", { visible: true });
        return cTab.evaluate(consoleFnFlipkartPaytm, "._4rR01T", "._30jeq3._1_WHN1")

    }catch(err){
        console.log(err);
    }
}

async function getListingFromPaytm(link, pName) {
    try{
        await cTab.goto(link);
        await cTab.type("input[type='search']", pName,{delay:200});
        await cTab.keyboard.press("Enter");
        await cTab.waitForSelector(".UGUy", { visible: true });
        await cTab.waitForSelector("._1kMS", { visible: true });
        return  cTab.evaluate(consoleFnFlipkartPaytm, ".UGUy", "._1kMS");

    }catch(err){
        console.log(err);
    }
}

function consoleFnFlipkartPaytm(nameSelector, priceSelector){
    let pnames = document.querySelectorAll(nameSelector);
    let prices = document.querySelectorAll(priceSelector);

    let arr = [];
    for(let i=0; i<5; i++){
        let name = pnames[i].innerText;
        let price = prices[i].innerText;
        arr.push({
            name,
            price
        })
    }

    return arr;
}

function consoleFnAmazon(blockSelector, sponsoredIdentifier, nameSelector, priceSelector) {
    let allBlocks = document.querySelectorAll(blockSelector)
    let arr = [];
    for (let i = 0; i < allBlocks.length; i++) {
        let sponsored = allBlocks[i].querySelector(sponsoredIdentifier)
        if(sponsored == null){
            let name = allBlocks[i].querySelector(nameSelector).innerText;
            let price = allBlocks[i].querySelector(priceSelector).innerText;
            arr.push({
                name,
                price
            })
        }
        if(arr.length === 5){
            return arr;
        }
    }
}