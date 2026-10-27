class FlipkartCartPage {
  constructor(page) {
    this.page = page;
    // Place order button locator inside the cart
    this.placeOrderButton = page.locator('button:has-text("Place Order"), button:has-text("PLACE ORDER")').first();
  }

  async proceedToCheckout() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.placeOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.placeOrderButton.click();
  }
}

module.exports = { FlipkartCartPage };