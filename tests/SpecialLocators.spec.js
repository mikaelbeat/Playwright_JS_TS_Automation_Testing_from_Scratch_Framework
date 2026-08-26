// @ts-check
import { test, expect } from '@playwright/test';

test('Special Locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByText("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");

  await page.pause();

});
