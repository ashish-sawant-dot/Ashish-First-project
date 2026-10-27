import { Page, Locator } from '@playwright/test';

export class OrderHistoryPage {
  page: Page;
  ordersBtn: Locator;
  orderRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersBtn = page.locator("button[routerlink*='myorders']");
    this.orderRows = page.locator('tbody tr');
  }
  async navigateToOrders() {
    await this.ordersBtn.click();
  }
  async verifyOrderIdInHistory(orderId: string): Promise<boolean> {
    await this.orderRows.first().waitFor();
    const count = await this.orderRows.count();
    for (let i = 0; i < count; i++) {
      const rowOrderId = await this.orderRows.nth(i).locator('th').textContent();
      if (rowOrderId && rowOrderId.trim() === orderId.trim()) {
        return true;
      }
    }
    return false;
  }
}