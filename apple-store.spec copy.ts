// e2e/tests/apple-store.spec.ts

import { test, expect, Page } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

// Test data
const TEST_USER = {
  email: `test-${uuidv4().substring(0, 8)}@example.com`,
  username: `tester-${uuidv4().substring(0, 8)}`,
  password: "Test@123456",
};

const TEST_SHIPPING_ADDRESS = {
  fullAddress: "123 Apple Way",
  line1: "123 Apple Way",
  city: "Cupertino",
  state: "CA",
  postalCode: "95014",
  country: "USA",
  coordinates: {
    lat: 37.3346,
    lng: -122.009,
  },
};

// Helper functions
async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.fill('[data-testid="email-input"]', email);
  await page.fill('[data-testid="password-input"]', password);
  await page.click('[data-testid="login-button"]');
  await page.waitForURL("**/");
}

async function registerNewUser(page: Page, user = TEST_USER) {
  await page.goto("/register");
  await page.fill('[data-testid="username-input"]', user.username);
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);
  await page.fill('[data-testid="confirm-password-input"]', user.password);
  await page.click('[data-testid="register-button"]');

  // Wait for registration to complete and redirect
  await page.waitForURL("**/");

  // Verify toast notification for successful registration
  await expect(page.locator(".toast-success")).toContainText(
    "Successfully registered"
  );
}

async function addProductToCart(page: Page, productSlug: string) {
  await page.goto(`/product/${productSlug}`);

  // Wait for product details to load
  await page.waitForSelector('[data-testid="product-title"]');

  // Select product options if available
  const optionSelectors = await page.$$('[data-testid="product-option"]');
  for (const selector of optionSelectors) {
    await selector.click();
    // Select the first option in each dropdown
    await page.click('[data-testid="option-item"]:first-child');
  }

  // Add to cart
  await page.click('[data-testid="add-to-cart-button"]');

  // Verify toast notification
  await expect(page.locator(".toast-success")).toContainText("Added to cart");
}

async function proceedToCheckout(page: Page) {
  await page.goto("/cart");
  await page.click('[data-testid="proceed-to-checkout"]');
  await page.waitForURL("**/checkout");
}

async function fillShippingAddress(
  page: Page,
  address = TEST_SHIPPING_ADDRESS
) {
  await page.fill('[data-testid="address-line1"]', address.line1);
  await page.fill('[data-testid="address-city"]', address.city);
  await page.fill('[data-testid="address-state"]', address.state);
  await page.fill('[data-testid="address-postal"]', address.postalCode);
  await page.fill('[data-testid="address-country"]', address.country);

  // Save address
  await page.click('[data-testid="save-address-button"]');
}

// Test suite
test.describe("Apple Store E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test("should display homepage with featured products", async ({ page }) => {
    // Verify navbar elements
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator("nav")).toContainText("Apple store");

    // Verify featured products section
    await expect(
      page.locator('[data-testid="featured-products"]')
    ).toBeVisible();

    // Verify at least one product is displayed
    const productCards = await page.$$('[data-testid="product-card"]');
    expect(productCards.length).toBeGreaterThan(0);
  });

  test("user registration flow", async ({ page }) => {
    await registerNewUser(page);

    // Verify user is logged in
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test("login and logout flow", async ({ page }) => {
    // First register a new user
    const user = {
      email: `login-test-${uuidv4().substring(0, 8)}@example.com`,
      username: `login-tester-${uuidv4().substring(0, 8)}`,
      password: "Test@123456",
    };

    await registerNewUser(page, user);

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');

    // Verify logged out state
    await expect(page.locator('[data-testid="login-link"]')).toBeVisible();

    // Login again
    await login(page, user.email, user.password);

    // Verify logged in state
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test("product browsing and filtering", async ({ page }) => {
    // Navigate to shop page
    await page.goto("/shop");

    // Verify product filters
    await expect(page.locator('[data-testid="product-filters"]')).toBeVisible();

    // Apply category filter
    await page.click('[data-testid="category-filter-iphone"]');

    // Verify URL contains filter parameter
    await expect(page.url()).toContain("category=iphone");

    // Verify filtered products
    const productCards = await page.$$('[data-testid="product-card"]');
    expect(productCards.length).toBeGreaterThan(0);

    // Apply price filter
    await page.fill('[data-testid="price-min"]', "500");
    await page.fill('[data-testid="price-max"]', "1500");
    await page.click('[data-testid="apply-price-filter"]');

    // Verify URL contains price filter parameters
    await expect(page.url()).toContain("minPrice=500");
    await expect(page.url()).toContain("maxPrice=1500");
  });

  test("product detail page displays correct information", async ({ page }) => {
    // Navigate to a specific product
    await page.goto("/shop");
    await page.click('[data-testid="product-card"]:first-child');

    // Verify product details
    await expect(page.locator('[data-testid="product-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-price"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="product-description"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="product-images"]')).toBeVisible();

    // Verify product options
    await expect(page.locator('[data-testid="product-options"]')).toBeVisible();
  });

  test("cart functionality with websocket connection", async ({ page }) => {
    // Register and login
    await registerNewUser(page);

    // Add a product to cart
    await page.goto("/shop");
    await page.click('[data-testid="product-card"]:first-child');

    // Get product name for later verification
    const productName = await page
      .locator('[data-testid="product-title"]')
      .textContent();

    // Add to cart
    await page.click('[data-testid="add-to-cart-button"]');

    // Verify toast notification
    await expect(page.locator(".toast-success")).toContainText("Added to cart");

    // Navigate to cart
    await page.goto("/cart");

    // Verify cart contains the product (websocket should fetch cart items)
    await expect(page.locator('[data-testid="cart-item"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-item-name"]')).toContainText(
      productName
    );

    // Test quantity update
    await page.click('[data-testid="increase-quantity"]');

    // Wait for websocket to update quantity
    await page.waitForTimeout(500);

    // Verify quantity is updated
    await expect(page.locator('[data-testid="item-quantity"]')).toContainText(
      "2"
    );

    // Test cart item removal
    await page.click('[data-testid="remove-item"]');

    // Wait for websocket to remove item
    await page.waitForTimeout(500);

    // Verify cart is empty
    await expect(page.locator('[data-testid="empty-cart"]')).toBeVisible();
  });

  test("complete checkout process", async ({ page }) => {
    // Register and login
    await registerNewUser(page);

    // Add product to cart
    await page.goto("/shop");
    await page.click('[data-testid="product-card"]:first-child');
    await page.click('[data-testid="add-to-cart-button"]');

    // Go to checkout
    await proceedToCheckout(page);

    // Fill shipping address
    await fillShippingAddress(page);

    // Select payment method
    await page.click('[data-testid="payment-method-cc"]');

    // Add order notes
    await page.fill(
      '[data-testid="order-notes"]',
      "Please deliver in the evening"
    );

    // Place order
    await page.click('[data-testid="place-order-button"]');

    // Wait for redirect to payment provider
    await page.waitForURL("**/checkout-success*");

    // Verify success page
    await expect(page.locator('[data-testid="order-success"]')).toBeVisible();
  });

  test("user account management", async ({ page }) => {
    // Register and login
    await registerNewUser(page);

    // Navigate to account page
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="account-settings"]');

    // Update profile information
    await page.fill(
      '[data-testid="update-username"]',
      `${TEST_USER.username}-updated`
    );
    await page.click('[data-testid="save-profile"]');

    // Verify toast notification
    await expect(page.locator(".toast-success")).toContainText(
      "Profile updated"
    );

    // Verify email verification section
    await expect(
      page.locator('[data-testid="email-verification"]')
    ).toBeVisible();

    // Test password change
    await page.fill('[data-testid="current-password"]', TEST_USER.password);
    await page.fill('[data-testid="new-password"]', "NewTest@123456");
    await page.fill('[data-testid="confirm-new-password"]', "NewTest@123456");
    await page.click('[data-testid="change-password"]');

    // Verify toast notification
    await expect(page.locator(".toast-success")).toContainText(
      "Password updated"
    );
  });

  test("order history and tracking", async ({ page }) => {
    // Register, login, and complete an order
    await registerNewUser(page);
    await addProductToCart(page, "iphone-15-pro");
    await proceedToCheckout(page);
    await fillShippingAddress(page);
    await page.click('[data-testid="payment-method-cc"]');
    await page.click('[data-testid="place-order-button"]');
    await page.waitForURL("**/checkout-success*");

    // Navigate to order history
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="order-history"]');

    // Verify order is listed
    await expect(page.locator('[data-testid="order-item"]')).toBeVisible();

    // View order details
    await page.click('[data-testid="view-order-details"]');

    // Verify order details page
    await expect(page.locator('[data-testid="order-details"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-status"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-items"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="shipping-address"]')
    ).toBeVisible();
  });

  test("admin dashboard access and functionality", async ({ page }) => {
    // Login as admin (using predefined admin credentials)
    await login(page, "admin@example.com", "admin123");

    // Navigate to admin dashboard
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="admin-dashboard"]');

    // Verify admin dashboard components
    await expect(page.locator('[data-testid="admin-sidebar"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="admin-dashboard-stats"]')
    ).toBeVisible();

    // Test product management
    await page.click('[data-testid="manage-products"]');
    await expect(page.locator('[data-testid="products-table"]')).toBeVisible();

    // Test order management
    await page.click('[data-testid="manage-orders"]');
    await expect(page.locator('[data-testid="orders-table"]')).toBeVisible();

    // Test user management
    await page.click('[data-testid="manage-users"]');
    await expect(page.locator('[data-testid="users-table"]')).toBeVisible();
  });

  test("responsive design across different viewports", async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Verify mobile menu
    await expect(
      page.locator('[data-testid="mobile-menu-button"]')
    ).toBeVisible();
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();

    // Test on tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    // Verify responsive layout
    await expect(page.locator("nav")).toBeVisible();

    // Test on desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Verify desktop layout
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('[data-testid="desktop-menu"]')).toBeVisible();
  });

  test("SEO metadata is properly set", async ({ page }) => {
    // Check home page metadata
    await page.goto("/");

    // Verify title and meta tags
    expect(await page.title()).toBe("Apple store");

    // Check product page metadata
    await page.goto("/product/iphone-15-pro");

    // Verify product-specific title
    expect(await page.title()).toContain("iPhone 15 Pro");

    // Verify meta description
    const metaDescription = await page.$eval('meta[name="description"]', (el) =>
      el.getAttribute("content")
    );
    expect(metaDescription).not.toBeNull();
    expect(metaDescription?.length).toBeGreaterThan(10);

    // Verify canonical link
    const canonicalLink = await page.$eval('link[rel="canonical"]', (el) =>
      el.getAttribute("href")
    );
    expect(canonicalLink).toContain("/product/iphone-15-pro");
  });

  test("error handling and fallback UI", async ({ page }) => {
    // Test 404 page
    await page.goto("/non-existent-page");

    // Verify 404 page is displayed
    await expect(page.locator('[data-testid="error-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-code"]')).toContainText(
      "404"
    );

    // Test server error handling (simulate by navigating to a special test route)
    await page.goto("/test-server-error");

    // Verify error UI is displayed
    await expect(page.locator('[data-testid="error-page"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();

    // Verify navigation still works after error
    await page.click('[data-testid="go-home"]');
    await expect(page.url()).toBe(new URL("/", page.url()).toString());
  });

  // test("performance metrics collection", async ({ page }) => {
  //   // Enable performance metrics collection
  //   await page.evaluate(() => {
  //     window.performanceMetrics = [];
  //     const observer = new PerformanceObserver((list) => {
  //       window.performanceMetrics.push(...list.getEntries());
  //     });
  //     observer.observe({
  //       entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
  //     });
  //   });

  //   // Navigate to home page
  //   await page.goto("/");

  //   // Wait for metrics to be collected
  //   await page.waitForTimeout(3000);

  //   // Retrieve collected metrics
  //   const metrics = await page.evaluate(() => window.performanceMetrics);

  //   // Verify metrics were collected
  //   expect(metrics.length).toBeGreaterThan(0);

  //   // Log metrics for analysis
  //   console.log("Performance metrics:", metrics);
  // });
});
