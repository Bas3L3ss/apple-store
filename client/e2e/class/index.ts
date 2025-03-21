import { expect, Page } from "@playwright/test";

const SELECTORS = {
  SHOPPING_CART: 'div[about="shopping-cart"]',
  EMPTY_CART_TEXT: "text=Your cart is empty",
  CART_ITEM_COUNT: "text=1 item",
  ADD_TO_BAG_BUTTON: 'button[name="add-to-bag"]',
  VIEW_CART_LINK: 'a[about="view-cart"]',
  CONTINUE_SHOPPING: "text=Continue Shopping",
  FEATURED_PRODUCT_BUTTON: 'button[name="featured-product-button"]',
  FEATURED_PRODUCT_MORE: 'button[name="featured-product-more"]',
  PRODUCT_ORDER_LINK: 'a[about="product-order"]',
  FEATURED_PRODUCT_TEXT: "text=featured product",
  PRODUCT_ORDERING_TEXT: "text=product ordering page",
  EMAIL_INPUT: 'input[name="email"]',
  PASSWORD_INPUT: 'input[name="password"]',
  SUBMIT_BUTTON: 'button[type="submit"]',
  ERROR_MESSAGE: "text=Failed to sign in. Please check your credentials.",
  ACCOUNT_SETTINGS: "text=Account Settings",
} as const;

export interface ProductOption {
  type: "color" | "material";
  value: string;
  index: number;
}

export class LoginPage {
  constructor(private page: Page) {}

  async navigateTo(): Promise<void> {
    await this.page.goto("/auth");
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(SELECTORS.EMAIL_INPUT, email);
    await this.page.fill(SELECTORS.PASSWORD_INPUT, password);
    await this.page.click(SELECTORS.SUBMIT_BUTTON);
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.page.click(SELECTORS.SHOPPING_CART);
    const accountSettings = this.page.locator(SELECTORS.ACCOUNT_SETTINGS);
    await expect(accountSettings).toBeVisible();
  }

  async verifyLoginError(): Promise<void> {
    const errorMessage = this.page.locator(SELECTORS.ERROR_MESSAGE);
    await expect(errorMessage).toBeVisible();
  }
}

export class ProductPage {
  constructor(private page: Page) {}

  async navigateTo(productSlug: string): Promise<void> {
    await this.page.goto(`/shop/${productSlug}`);
  }

  async openCart(): Promise<void> {
    await this.page.click(SELECTORS.SHOPPING_CART);
  }

  async selectOption({
    type,
    index,
  }: Omit<ProductOption, "value">): Promise<void> {
    await this.page.click(`button[name="select-${type}-${index}"]`);
  }

  async addToBag(): Promise<void> {
    await this.page.click(SELECTORS.ADD_TO_BAG_BUTTON);
  }

  async verifyAddToBagButtonState(
    expectedState: "enabled" | "disabled"
  ): Promise<void> {
    const button = this.page.locator(SELECTORS.ADD_TO_BAG_BUTTON);

    if (expectedState === "enabled") {
      await expect(button).toBeEnabled();
    } else {
      await expect(button).toBeDisabled();
    }
  }

  async viewCart(): Promise<void> {
    await this.page.click(SELECTORS.VIEW_CART_LINK);
  }
}

export class CartPage {
  constructor(private page: Page) {}

  async verifyCartIsEmpty(): Promise<void> {
    const emptyCartText = this.page.locator(SELECTORS.EMPTY_CART_TEXT);
    await expect(emptyCartText).toBeVisible();
  }

  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const cartText = this.page.locator(
      `text=${expectedCount} item${expectedCount !== 1 ? "s" : ""}`
    );
    await expect(cartText).toBeVisible();
  }

  async verifyProductAttributeVisible(attribute: string): Promise<void> {
    await expect(this.page.locator(`text=${attribute}`)).toBeVisible();
  }

  async verifyContinueShoppingVisible(): Promise<void> {
    await expect(this.page.locator(SELECTORS.CONTINUE_SHOPPING)).toBeVisible();
  }
}
export class ShopPage {
  constructor(private page: Page) {}

  async navigateTo(): Promise<void> {
    await this.page.goto("/shop");
  }

  async clickFeaturedProductOrderButton(): Promise<void> {
    await this.page.click(SELECTORS.FEATURED_PRODUCT_BUTTON);
  }

  async clickFeaturedProductMoreButton(): Promise<void> {
    await this.page.click(SELECTORS.FEATURED_PRODUCT_MORE);
  }

  async clickFirstProductOrderLink(): Promise<void> {
    await this.page.click(`${SELECTORS.PRODUCT_ORDER_LINK}:first-of-type`);
  }

  async verifyFeaturedProductVisible(): Promise<void> {
    const titleElement = this.page.locator(SELECTORS.FEATURED_PRODUCT_TEXT);
    await expect(titleElement).toBeVisible();
  }

  async verifyProductOrderingPageVisible(): Promise<void> {
    const titleElement = this.page.locator(SELECTORS.PRODUCT_ORDERING_TEXT);
    await expect(titleElement).toBeVisible();
  }
}
