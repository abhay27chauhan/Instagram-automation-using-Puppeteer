1. page.$
2. page.$$
3. page.evaluate()
4. page.evaluateHandle()
5. page.exposeFunction()
6. page.waitForFunction()
7. const devices = require('puppeteer/DeviceDescriptors');
   1. page.emulate(device['iPhone X'])
8. page.focus()
9.  page.goBack()
10. page.goForward()
11. page.pdf({path: 'file.pdf'}) -> Generates a PDF from the page content
12. page.reload()
13. page.title()
14. page.url()
15. const defaultContext = browser.defaultBrowserContext(); -> A reference for the default browser context
    1.  const newContext = browser.createIncognitoBrowserContext(); -> Creates a new browser context
    2.  newContext.close(); -> Closes the created browser context
    3.  browser.close -> Closes the browser with the default context
16. mouse events -> page.mouse.move(), page.mouse.click(), page.mouse.up(), page.mouse.down()
17. keyboard events -> page.keyboard.type(), page.keyboard.press(), page.keyboard.down(), page.keyboard.up()
18.  page.screenshot({
        path: 'screenshot.jpg',
        type: 'jpeg',
        quality: 80,
        clip: { x: 220, y: 0, width: 630, height: 360 }
    });