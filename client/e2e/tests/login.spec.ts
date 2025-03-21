import { test } from "@playwright/test";
import { LoginPage } from "../class";

test.describe("Login Page", () => {
  const testWithPages = test.extend({
    // @ts-expect-error: no prob
    loginPage: async ({ page }, to) => {
      await to(new LoginPage(page));
    },
  });

  testWithPages(
    "Should log in successfully with valid credentials",
    // @ts-expect-error: no prob
    async ({ loginPage }) => {
      await loginPage.navigateTo();
      await loginPage.login(
        "phamthien.hung060907@yahoo.com",
        "phamthien.hung060907@yahoo.com"
      );
      await loginPage.verifySuccessfulLogin();
    }
  );

  testWithPages(
    "Should show error message with invalid credentials",
    // @ts-expect-error: no prob
    async ({ loginPage }) => {
      await loginPage.navigateTo();
      await loginPage.login("wronguserhung060907@yahoo.com", "wrongpassword");
      await loginPage.verifyLoginError();
    }
  );
});
