// @ts-check
import { test, expect } from '@playwright/test';

test('Special Locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByText("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("TosiSalainenJaPitkäSalainenSalasana");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();

  await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({ timeout: 10_000 });

  await page.getByRole("link", { name: "Shop" }).click();
  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click();

  

  await page.pause();

});



test('Test level timeout', async ({ page }) => {

  test.setTimeout(20_000);
  const slowExpect = expect.configure({ timeout: 10_000 });
  page.setDefaultTimeout(10_000);

  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByText("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("TosiSalainenJaPitkäSalainenSalasana");
  await page.getByRole("button", { name: "Submit" }).click();
  await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();

  await page.getByRole("link", { name: "Shop" }).click();
  await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");

  await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click();

  

  await page.pause();

});