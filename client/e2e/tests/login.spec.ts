import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should log in successfully with valid credentials", async ({
    page,
  }) => {
    await page.goto("/auth");

    await page.fill('input[name="email"]', "phamthien.hung060907@yahoo.com");
    await page.fill('input[name="password"]', "phamthien.hung060907@yahoo.com");

    await page.click('button[type="submit"]');

    await page.click('div[about="shopping-cart"]');
    const accountSettings = await page.locator("text=Account Settings");
    await expect(accountSettings).toBeVisible();
  });

  test("should show error message with invalid credentials", async ({
    page,
  }) => {
    await page.goto("/auth");

    await page.fill('input[name="email"]', "wronguserhung060907@yahoo.com");
    await page.fill('input[name="password"]', "wrongpassword");

    await page.click('button[type="submit"]');

    const errorMessage = await page.locator(
      "text=Failed to sign in. Please check your credentials."
    );
    await expect(errorMessage).toBeVisible();
  });
});
