import { test } from "@playwright/test";
import { ShopPage } from "../class";

test.describe("Shop Page", () => {
  // Define test fixtures
  const testWithPages = test.extend({
    // @ts-expect-error: no prob
    shopPage: async ({ page }, to) => {
      await to(new ShopPage(page));
    },
  });

  testWithPages(
    "Should go to the featured product order page",
    // @ts-expect-error: no prob
    async ({ shopPage }) => {
      await shopPage.navigateTo();
      await shopPage.clickFeaturedProductOrderButton();
      await shopPage.verifyFeaturedProductVisible();
    }
  );

  testWithPages(
    "Should go to the featured product detail page",
    // @ts-expect-error: no prob
    async ({ shopPage }) => {
      await shopPage.navigateTo();
      await shopPage.clickFeaturedProductMoreButton();
      await shopPage.verifyFeaturedProductVisible();
    }
  );
  // @ts-expect-error: no prob
  testWithPages("Should go to the product buy page", async ({ shopPage }) => {
    await shopPage.navigateTo();
    await shopPage.clickFirstProductOrderLink();
    await shopPage.verifyProductOrderingPageVisible();
  });
});
