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
 * https://github.com/octalmage/robotjs#building
 * https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/
 */

/**
 * 
 * const [fileChooser] = await Promise.all([
        tab.waitForFileChooser(),
        tab.click('.mTGkH')
    ]);

    //uploading file
    await fileChooser.accept([file]);

 * await tab._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: 'E:\\22_Sokle\\PEP_Coding\\Projects\\articalGenerator'
    });

 * inputUploadHandle.uploadFile(fileToUpload); -> (stack overflow)
 * https://github.com/puppeteer/puppeteer/issues/857#issuecomment-386222936

 *  args: [

            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--use-fake-ui-for-media-stream', //https://stackoverflow.com/questions/48264537/auto-allow-webcam-access-using-puppeteer-for-node-js
            '--disable-audio-output'   // for disabling the output of the chrome
        ],
 */