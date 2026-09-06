
const { test, expect } = require('@playwright/test');

test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  await page.pause();
  page.on('dialog', dialog => dialog.accept());
  // page.on('dialog', dialog => dialog.dismiss());
  await page.locator("#confirmbtn").click();

  await page.locator("#mousehover").hover();

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage.locator(".text h2").textContent();
  console.log(expect(textCheck.split(" ")[1].trim()).toBe("13,522"));

});