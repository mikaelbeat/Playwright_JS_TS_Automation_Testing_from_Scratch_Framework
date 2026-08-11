
const {test, expect} = require('@playwright/test');

test('UI Control Test', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms")).not.toBeChecked();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");


    //await page.pause();
});
