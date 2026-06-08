
const {test} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
    // These are optional, you can also use the default context and page provided by Playwright
    // ({browser, page})=>
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.rahulshettyacademy.com/AutomationPractice/');

});

test('Page Playwright test', async ({page})=>
{

    await page.goto('https://google.com');

});
