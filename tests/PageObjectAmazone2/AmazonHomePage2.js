class AmazonHomePage2 {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
  }

  async navigate() {
    await this.page.goto('https://www.amazon.in', { waitUntil: 'domcontentloaded' });
  }

  async goTo() {
    await this.navigate();
  }

  async searchProduct(productName) {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }
}

module.exports = { AmazonHomePage2 };