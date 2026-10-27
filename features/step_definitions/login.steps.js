const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the Swag Labs login page', async function () {
  await this.page.goto('https://www.saucedemo.com/');
});

When('I enter valid username {string} and password {string}', async function (username, password) {
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
});

When('I click on the login button', async function () {
  await this.page.click('#login-button');
});

Then('I should be navigated to the inventory page', async function () {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

