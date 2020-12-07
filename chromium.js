const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type, quality, fullPage, viewportWidth, viewportHeight) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
       
        defaultViewport: {
            width: viewportWidth,
            height: viewportHeight
        }
    });

    const page = await browser.newPage();
       await page.setCacheEnabled(false);
     await page.setUserAgent('Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36');
    await page.goto(url);
    await page.waitForNavigation();
    const file = await page.screenshot({ type,  quality, fullPage });
    await browser.close();
    return file;
}

module.exports = { getScreenshot };
