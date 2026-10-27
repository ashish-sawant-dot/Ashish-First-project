const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(60 * 1000);

Before(async function () {
  // Check if HEADED environment variable is set to true
  const isHeaded = process.env.HEADED === 'true';

  this.browser = await chromium.launch({ 
    headless: !isHeaded 
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});