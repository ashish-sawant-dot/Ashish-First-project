class FlipkartSearchResultsPage {
  constructor(page) {
    this.page = page;
    // Uses structural URL matching (href with /p/) instead of brittle random class names
    this.firstProductLink = page.locator('a[href*="/p/"]').first();
    this.loginCloseBtn = page.locator('button._2KpZ6l._2doB4z, span._30XB9F, button:has-text("✕")').first();
  }

  async selectFirstProduct() {
    await this.page.waitForLoadState('domcontentloaded');

    // Close login modal if it pops up after search
    const isModalVisible = await this.loginCloseBtn.isVisible({ timeout: 3000 }).catch(() => false);
    if (isModalVisible) {
      await this.loginCloseBtn.click();
    }

    // Wait for the first product link containing /p/ in its URL
    await this.firstProductLink.waitFor({ state: 'attached', timeout: 15000 });
    await this.firstProductLink.scrollIntoViewIfNeeded();

    // Listen for the new tab event when clicking product
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.firstProductLink.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}

module.exports = { FlipkartSearchResultsPage };