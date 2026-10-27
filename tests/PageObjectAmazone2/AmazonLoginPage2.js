class AmazonLoginPage2 {
  constructor(page) {
    this.page = page;
    this.signInNavButton = page.locator('#nav-link-accountList');
    this.emailInput = page.locator('#ap_email, input[name="email"]');
    this.continueButton = page.locator('input#continue, #continue');
    this.passwordInput = page.locator('#ap_password, input[name="password"]');
    this.signInSubmitButton = page.locator('#signInSubmit, #auth-signin-button input[type="submit"]').first();
  }

  async navigateToSignIn() {
    // Open home page
    await this.page.goto('https://www.amazon.in');

    // Wait until sign-in button is ready, then click directly
    await this.signInNavButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.signInNavButton.click();
  }

  async login(email, password,page) {
    // Fill email
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput.fill(email);
    await this.continueButton.click();
    //await this.page.pause();

    // Fill password
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.fill(password);
    await this.signInSubmitButton.click();
    await this.page.pause();

    
  }
}

module.exports = { AmazonLoginPage2 };