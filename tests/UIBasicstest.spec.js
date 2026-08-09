
const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
    // These are optional, you can also use the default context and page provided by Playwright
    // ({browser, page})=>
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto('https://www.rahulshettyacademy.com/loginpagePractice/');
    console.log(await page.title());
    await username.fill("rahulshetty");
    await password.fill("learning");
    await signInButton.click();
    const error = await page.locator("[style*='block']").textContent();
    console.log(error);
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInButton.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({page})=>
{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});
