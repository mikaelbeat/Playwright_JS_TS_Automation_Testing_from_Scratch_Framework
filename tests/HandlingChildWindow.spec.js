
const {test, expect} = require('@playwright/test');

test('Child window handling', async ({browser})=>
{
    // These are optional, you can also use the default context and page provided by Playwright
    // ({browser, page})=>
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");

    await page.goto('https://www.rahulshettyacademy.com/loginpagePractice/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
    [
        context.waitForEvent("page"),
        documentLink.click(),
    ]);
    
    const text = await newPage.locator(".red").textContent();
    console.log(text)
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0];
    console.log(domain)
    await page.locator("#username").type(domain);
    console.log(await userName.inputValue());

    await page.pause();


});