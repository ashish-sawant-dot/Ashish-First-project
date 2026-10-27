
const {expect} = require("@playwright/test");

class OrderReviewPage {
  constructor(page) 
  {
    this.verifyConfirmMsg = page.locator(".hero-primary");
    this.page = page;
    this.countryInput = page.getByPlaceholder('Select Country');
    this.dropdown = page.locator('.ta-results');
    this.placeOrderButton = page.locator('.action__submit');
   // this.orderIdLabel = page.locator('.em-spacer-1 .ng-star-inserted');
    this.orderIdLabel = page.locator('label.ng-star-inserted');
  }

async selectCountry(countryName) {
    await this.countryInput.pressSequentially("indi", { delay: 100 });
    await this.dropdown.locator('button').last().click();

  }

  // Click the place order button
  async placeOrder() {
    await this.placeOrderButton.click();
  }

  // Cleanly extract the order ID string
  async getOrderId() {
    let text = await this.orderIdLabel.textContent();
    text = text.replaceAll('|', '');
    return text.trim();
  }

  async verifyConfirmMessage(expectedMessage)
{
    const actual = await this.verifyConfirmMsg.textContent()
    expect(actual).toBe(expectedMessage)
}

}

module.exports = { OrderReviewPage };