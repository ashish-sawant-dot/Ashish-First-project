class FlipkartHomePage {
  constructor(page) {
    this.page = page;
    // Multi-strategy selector for search input
    this.searchBox = page.locator('input[title*="Search"], input[name="q"]').first();
    // Selector for Flipkart login dialog close button (X button or outside click)
    this.loginCloseBtn = page.locator('button._2KpZ6l._2doB4z, span._30XB9F, button:has-text("✕")').first();
  }

  async navigate() {
    await this.page.goto('https://www.flipkart.com', { waitUntil: 'domcontentloaded' });
    await this.closeLoginModalIfPresent();
  }

  async closeLoginModalIfPresent() {
    try {
      const isVisible = await this.loginCloseBtn.isVisible({ timeout: 3000 });
      if (isVisible) {
        await this.loginCloseBtn.click();
      }
    } catch (e) {
      // Ignore if no login popup appears
    }
  }

  async searchProduct(productName) {
    await this.closeLoginModalIfPresent();
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }
}

module.exports = { FlipkartHomePage };