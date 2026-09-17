
const { test, expect } = require('@playwright/test');

test('Visual validations', async ({ page }) => {
  await page.goto('https://www.fantasiapelit.com');
  expect(await page.screenshot()).toMatchSnapshot('https://www.fantasiapelit.com/_landing.png');


});