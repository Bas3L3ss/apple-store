import { test, expect } from "@playwright/test";

test.describe("Shop Page", () => {
  test("Should go to the featured product order page", async ({ page }) => {
    await page.goto("/shop");

    await page.click('button[name="featured-product-button"]');

    const titleSROnly = await page.locator("text=featured product");
    await expect(titleSROnly).toBeVisible();
  });
  test("Should go to the featured product detail page", async ({ page }) => {
    await page.goto("/shop");

    await page.click('button[name="featured-product-more"]');

    const titleSROnly = await page.locator("text=featured product");
    await expect(titleSROnly).toBeVisible();
  });
  test("Should go to the product buy page", async ({ page }) => {
    await page.goto("/shop");

    await page.click('a[about="product-order"]:first-of-type');
    const titleSROnly = await page.locator("text=product ordering page");
    await expect(titleSROnly).toBeVisible();
  });
});
