class DashboardPage {
  // @param {import('@playwright/test').Page} page
  constructor(page) {
    /** @type {import('@playwright/test').Page} */
    this.page = page;
    this.products = page.locator('.card-body');
    this.cartButton = page.locator('[routerlink*="cart"]');
  }

  async waitForLoad() {
    await this.page.waitForURL('**/dashboard/**');
  }

  async addProductToCart(productName) {
    const targetProduct = this.products.filter({ hasText: productName });
    await targetProduct.getByRole('button', { name: 'Add To Cart' }).click();
  }

  async navigateToCart() {
    await this.cartButton.click();
  }
}

module.exports = { DashboardPage };