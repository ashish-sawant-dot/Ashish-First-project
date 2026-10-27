class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cartSection h3');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
  }

  // NO 'async' keyword here! Returns a Locator directly.
  verifyProductInCart(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };