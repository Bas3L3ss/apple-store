import { test, expect } from "@playwright/test";

test("Homepage should load correctly", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Check if the title is correct
  await expect(page).toHaveTitle(/Mac Air/i);

  // Ensure the navbar exists
  const navbar = page.locator("nav");
  await expect(navbar).toBeVisible();
});
