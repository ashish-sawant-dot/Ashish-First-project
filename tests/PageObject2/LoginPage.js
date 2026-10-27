class LoginPage {
  constructor(page) {
    this.page = page;
    this.userEmailInput = page.locator('#userEmail');
    this.userPasswordInput = page.locator('#userPassword');
    this.loginButton = page.locator('#login');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

  async login(email, password) {
    await this.userEmailInput.fill(email);
    await this.userPasswordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };