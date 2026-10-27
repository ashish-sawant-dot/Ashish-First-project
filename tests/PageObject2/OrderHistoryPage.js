


class OrderHistoryPage 
{
  // @param {import('@playwright/test').Page} page
  constructor(page) {
    this.page = page;
    this.ordersHeaderButton = page.locator('button[routerlink*="myorders"]');
    this.rows = page.locator('tbody tr');
    
  }


  // Navigate to orders history page
  async navigateToOrders() {
    await this.ordersHeaderButton.click();
    await this.page.waitForURL('**/myorders');
  }

  // Check if order ID exists in the table
  async verifyOrderIdInHistory(orderId) {
    return await this.rows.filter({ hasText: orderId }).isVisible();
  }

}
module.exports = { OrderHistoryPage };