const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type, quality, fullPage, viewportWidth, viewportHeight) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        args: ['--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1'],
        defaultViewport: {
            width: viewportWidth,
            height: viewportHeight
        }
    });

    const page = await browser.newPage();
    await page.goto(url);
    const file = await page.screenshot({ type,  quality, fullPage });
    await browser.close();
    return file;
}

module.exports = { getScreenshot };
