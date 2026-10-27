import { Page, Locator } from '@playwright/test';

export class LoginPage {
  page: Page;
  userEmail: Locator;
  password: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmail = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginBtn = page.locator("[value='Login']");
  }
  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }
  async login(email: string, password: string) {
    await this.userEmail.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}