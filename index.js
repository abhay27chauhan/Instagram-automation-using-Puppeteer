const puppeteer = require('puppeteer');
const data = require("./config.json");
let noOfPosts = process.argv[2];
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/',{waitUntil: "networkidle2"});
    await page.type("input[name='username']", data.user, {delay:100});
    await page.type("input[name='password']", data.pwd, { delay: 100 });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        await page.click("button[type='submit']")
    ]);

    await page.type("input[placeholder='Search']", "aanchal.149",{delay: 100});
    await page.waitForSelector(".drKGC .fuqBx a",{visible: true});
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        await page.click(".drKGC .fuqBx a")
    ]);

    await page.waitForSelector("._9AhH0", {visible:true});
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        await page.click("._9AhH0")
    ]);

    let i = 0;
    do{
        await page.waitForSelector(".fr66n .wpO6b", {visible: true});
        await page.click(".fr66n .wpO6b");
        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }),
            await page.click(".DdSX2 ._65Bje.coreSpriteRightPaginationArrow")
        ]);
    }while(i<noOfPosts);

})();