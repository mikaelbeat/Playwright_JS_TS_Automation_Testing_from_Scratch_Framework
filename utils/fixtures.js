
const base = require('@playwright/test');
const {APIutils} = require("./APIutils.js");

const loginPayLoad = {userEmail:"testihemmo@testi.fi",userPassword:"Mustakissa1"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};


exports.custometest = base.test.extend(

    {
authenticatedPage : async ({browser}, use)=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("testihemmo@testi.fi");
    await page.locator("#userPassword").fill("Mustakissa1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    await use(page);
    },

createOrder : async ({request}, use) => {
    const apiUtils = new APIutils(request, loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        await use(response);
    },

testDataForOrder : {
    productName : "ADIDAS ORIGINAL"
}


});