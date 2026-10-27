import { Page, Locator } from '@playwright/test';

export class CartPage {
  page: Page;
  cartItems: Locator;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cartSection h3');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
  }
  verifyProductInCart(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }
  async checkout() {
    await this.checkoutButton.click();
  }
}