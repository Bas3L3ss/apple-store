import { test } from "@playwright/test";
import { CartPage, ProductOption, ProductPage } from "../class";

type TestFixtures = {
  productPage: ProductPage;
  cartPage: CartPage;
};

test.describe("Cart Page", () => {
  // Define test fixtures
  const testWithPages = test.extend<TestFixtures>({
    productPage: async ({ page }, to) => {
      await to(new ProductPage(page));
    },
    cartPage: async ({ page }, to) => {
      await to(new CartPage(page));
    },
  });

  // Common product configuration
  const PRODUCT_SLUG = "iphone-15-silicone-case-with-magsafe";
  const PRODUCT_OPTIONS: ProductOption[] = [
    { type: "color", value: "Pink", index: 1 },
    { type: "material", value: "FineWoven", index: 1 },
  ];

  // Helper function for the common workflow
  async function setupProductInCart({
    productPage,
    cartPage,
  }: TestFixtures): Promise<void> {
    await productPage.navigateTo(PRODUCT_SLUG);
    await productPage.openCart();
    await cartPage.verifyCartIsEmpty();

    await productPage.verifyAddToBagButtonState("disabled");

    for (const option of PRODUCT_OPTIONS) {
      await productPage.selectOption(option);
    }

    await productPage.verifyAddToBagButtonState("enabled");
    await productPage.addToBag();
    await productPage.openCart();
    await cartPage.verifyCartItemCount(1);
  }

  testWithPages(
    "Should add product into cart",
    async ({ productPage, cartPage }) => {
      await setupProductInCart({ productPage, cartPage });
    }
  );

  testWithPages(
    "Should see products in cart page",
    async ({ productPage, cartPage }) => {
      await setupProductInCart({ productPage, cartPage });

      await productPage.viewCart();
      await cartPage.verifyContinueShoppingVisible();

      // Verify product attributes
      for (const option of PRODUCT_OPTIONS) {
        await cartPage.verifyProductAttributeVisible(option.value);
      }
    }
  );
});
