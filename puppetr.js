const puppeteer = require("puppeteer");

let browseropenP = puppeteer.launch({
    headless: false
})

// serially
browseropenP
    .then(function (browser){
        console.log("browser opended");
        let alltabsPromise = browser.pages();

        // let browserclosePromise = browser.close();
        // browserclosePromise
        //     .then(function (){
        //         console.log("Browser Closed")
        //     })
        
        alltabsPromise
            .then(function (tabs){
                let page = tabs[0];
                let googlehomePageOpenPromise = page.goto("https://google.com");
                googlehomePageOpenPromise
                    .then(function(){
                        console.log("google home page opened");
                    })
            })
    })

// serially without nesting

browseropenP
    .then(function (browser){
        console.log("browser opended");
        let alltabsPromise = browser.pages();

        // let browserclosePromise = browser.close();
        // browserclosePromise
        //     .then(function (){
        //         console.log("Browser Closed")
        //     })
        
        return alltabsPromise;
    })
    .then(function (tabs){
        let page = tabs[0];
        let googlehomePageOpenPromise = page.goto("https://google.com");
        return googlehomePageOpenPromise;
            
    })
    .then(function(){
        console.log("google home page opened");
    })

    
/**
 * references
 * https://flaviocopes.com/puppeteer/
 * https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/
 * https://peter.sh/experiments/chromium-command-line-switches/
 */