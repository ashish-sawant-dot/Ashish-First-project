class AmazonSearchResultsPage2 {
  constructor(page) {
    this.page = page;
  }

  async selectFirstProduct() {
    // Target organic product title links directly

   /* const productLink = this.page.locator(
      'div[data-component-type="s-search-result"]:not(.ad-widget) ' +
      'a.a-link-normal[href*="/dp/"]:has-text("iPhone 18")'
    ).first();*/

    const productLink = this.page.locator('xpath=//h2[contains(@aria-label, "iPhone 18 Pro")]').first();

// const productLink = this.page.locator('div[data-component-type="s-search-result"]:not(.ad-widget) 
// a.a-link-normal[href*="/dp/"]:has-text("iPhone 18")').first();


    await productLink.waitFor({ state: 'visible', timeout: 15000 });

    // Listen for new tab creation
    const newPagePromise = this.page.context().waitForEvent('page').catch(() => null);

    await productLink.click();

    const newPage = await newPagePromise;

    if (newPage) {
      // BRING NEW TAB TO FRONT
      await newPage.waitForLoadState('domcontentloaded');
      await newPage.bringToFront();
      return newPage; // Returns the product page tab
    }

    await this.page.waitForLoadState('domcontentloaded');
    return this.page;
  }
}

module.exports = { AmazonSearchResultsPage2 };