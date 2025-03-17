import { test, expect } from "@playwright/test";

test("minimal test", async ({ page }) => {
  console.log("Test is running!");
  await page.goto("https://example.com");
  console.log("Page loaded!");
  expect(await page.textContent("h1")).toBe("Example Domain");
});
