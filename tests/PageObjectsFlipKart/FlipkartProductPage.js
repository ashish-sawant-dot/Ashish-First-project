class FlipkartProductPage {
  constructor(page) {
    this.page = page;
    // Locators for Add to Cart and Go to Cart buttons
    this.addToCartButton = page.locator('button:has-text("Add to cart"), button:has-text("ADD TO CART")').first();
    this.goToCartButton = page.locator('button:has-text("Go to cart"), button:has-text("GO TO CART")').first();
  }

  async addToCart() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
    await this.page.waitForTimeout(2000); // Give a short pause for cart updates
  }

  async goToCart() {
    // If "Go to cart" button appears after clicking "Add to cart"
    const isGoToCartVisible = await this.goToCartButton.isVisible({ timeout: 3000 }).catch(() => false);
    if (isGoToCartVisible) {
      await this.goToCartButton.click();
    } else {
      // Direct navigation fallback if required
      await this.page.goto('https://www.flipkart.com/viewcart', { waitUntil: 'domcontentloaded' });
    }
  }
}

module.exports = { FlipkartProductPage };