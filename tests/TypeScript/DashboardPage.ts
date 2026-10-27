import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  page: Page;
  products: Locator;
  cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.cartBtn = page.locator("[routerlink*='cart']");
  }
  async waitForLoad() {
    await this.products.first().waitFor();
  }
  async addProductToCart(productName: string) {
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const title = await this.products.nth(i).locator('b').textContent();
      if (title === productName) {
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cartBtn.click();
  }
}