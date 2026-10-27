import { test, expect } from '@playwright/test';
// Imports the main test functions and assertions from Playwright.

test('test', async ({ page }) => {
// Starts the test named 'test' and opens a new browser page context.

  page.on('dialog', dialog => dialog.accept());
// Listens for pop-up alerts or dialogs and automatically clicks "OK".

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
// Opens the web page URL in the browser.

  await expect(page.locator("#displayed-text")).toBeVisible();
// Checks that the text box with ID 'displayed-text' is visible.

  await page.locator("#hide-textbox").click();
// Clicks the button to hide the text box.

  await expect(page.locator("#displayed-text")).toBeHidden();
// Checks that the text box is now hidden.

  await page.locator("#confirmbtn").click();
// Clicks the confirm button, which opens a pop-up dialog.

  await page.locator("#mousehover").hover();
// Moves the mouse pointer over the element with ID 'mousehover'.

  const framesPage = page.frameLocator("#courses-iframe");
// Finds and stores the iframe element with ID 'courses-iframe'.
// it highlighted small frame inside big frame.

  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
// Finds and clicks the visible 'lifetime-access' link inside the iframe.

  await page.frameLocator('iframe[name="iframe-name"]').getByRole('link', { name: 'NEW All Access plan' }).click();
// Finds the iframe by name and clicks the 'NEW All Access plan' link inside it.

  await page.frameLocator('iframe[name="iframe-name"]').getByText('13,522').click();
// Finds the iframe by name and clicks the text '13,522' inside it.

});
