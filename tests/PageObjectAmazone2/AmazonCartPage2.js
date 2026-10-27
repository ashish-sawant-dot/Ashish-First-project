class AmazonCartPage2 {
  constructor(page) {
    this.page = page;
    this.cartItemTitle = page.locator('.sc-product-title span.a-truncate-cut, .sc-product-title span.a-truncate-full').first();
    this.proceedToCheckoutButton = page.locator('input[name="proceedToRetailCheckout"], #sc-buy-box-ptc-button').first();
  }

  async getCartProductTitle() {
    await this.cartItemTitle.waitFor({ state: 'attached', timeout: 15000 });
    let text = await this.cartItemTitle.textContent();
    text = text.replace(/\s+/g, ' ').trim();

    // Deduplicate if Amazon renders identical duplicated text strings
    const halfLength = Math.floor(text.length / 2);
    const firstHalf = text.substring(0, halfLength).trim();
    const secondHalf = text.substring(halfLength).trim();

    if (firstHalf === secondHalf && firstHalf.length > 0) {
      return firstHalf;
    }

    return text;
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { AmazonCartPage2 };