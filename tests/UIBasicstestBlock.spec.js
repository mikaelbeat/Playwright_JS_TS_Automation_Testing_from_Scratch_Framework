
const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
    // These are optional, you can also use the default context and page provided by Playwright
    // ({browser, page})=>
    const context = await browser.newContext();
    const page = await context.newPage();

    // Block all CSS requests
    page.route('**/*.css', route => route.abort());

    // Block all image requests
    page.route('**/*.{png,jpg,jpeg}', route => route.abort());

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInButton = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    // Log all network requests
    page.on('request', request => console.log(request.url()));

    // Log all network responses
    page.on('response', response => console.log(response.url(), response.status()));

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
