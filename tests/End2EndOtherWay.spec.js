
const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({page})=>
{
    const email = "testihemmo@testi.fi";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Mustakissa1");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({ hasText: productName }).getByRole('button', { name: ' Add To Cart' }).click();
    await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();

    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();


    await page.getByPlaceholder('Country').pressSequentially("Ind", { delay: 150 });
    await page.getByRole('button', { name: ' India' }).nth(1).click();
    await page.getByText('PLACE ORDER').click();
    await expect(page.getByText(email)).toBeVisible();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


    await page.pause();

});