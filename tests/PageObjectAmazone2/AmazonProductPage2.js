class AmazonProductPage2 {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('#productTitle');
    // Target ONLY the visible Add to Cart button on the product page
    this.addToCartButton = page.locator('#add-to-cart-button:visible, input[name="submit.add-to-cart"]:visible').first();
    this.sideSheetCartButton = page.locator('#attach-sidesheet-view-cart-button, #attach-view-cart-button-form input').first();
  
  // 2. Add to Cart Button (Simple ID / Input attribute)
  //  this.addToCartButton = page.locator('#add-to-cart-button, input[name="submit.add-to-cart"]').first();

    // 3. Side Sheet / Cart Drawer "View Cart" Button
   // this.sideSheetCartButton = page.locator('#attach-sidesheet-view-cart-button, #attach-view-cart-button-form input').first();
  
  }

  async getProductTitle() {
    await this.productTitle.waitFor({ state: 'visible', timeout: 15000 });
    return (await this.productTitle.innerText()).trim();
  }

  async addToCart() {
    // 1. Confirm product title is visible
    await this.productTitle.waitFor({ state: 'visible', timeout: 15000 });

    // 2. Wait until the visible Add to Cart button appears
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 15000 });

    // 3. Scroll & force-click to bypass any sticky headers or side drawers
    await this.addToCartButton.click({ force: true });

    // 4. Pause briefly for cart update
    await this.page.waitForTimeout(3000);
    console.log('iPhone 18 Pro added to cart successfully!');
  }

  async goToCart() {
    const isDrawerVisible = await this.sideSheetCartButton.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isDrawerVisible) {
      await this.sideSheetCartButton.click();
    } else {
      await this.page.goto('https://www.amazon.in/gp/cart/view.html', { waitUntil: 'domcontentloaded' });
    }
  }
}

module.exports = { AmazonProductPage2 };