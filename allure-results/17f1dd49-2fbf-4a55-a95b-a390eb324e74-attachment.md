# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Playwright 1 to 10sec.spec.js\AlertPopUp.spec.js >> test
- Location: tests\Playwright 1 to 10sec.spec.js\AlertPopUp.spec.js:4:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/AutomationPractice/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | // Imports the main test functions and assertions from Playwright.
  3  | 
  4  | test('test', async ({ page }) => {
  5  | // Starts the test named 'test' and opens a new browser page context.
  6  | 
  7  |   page.on('dialog', dialog => dialog.accept());
  8  | // Listens for pop-up alerts or dialogs and automatically clicks "OK".
  9  | 
> 10 |   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     |              ^ Error: page.goto: Target page, context or browser has been closed
  11 | // Opens the web page URL in the browser.
  12 | 
  13 |   await expect(page.locator("#displayed-text")).toBeVisible();
  14 | // Checks that the text box with ID 'displayed-text' is visible.
  15 | 
  16 |   await page.locator("#hide-textbox").click();
  17 | // Clicks the button to hide the text box.
  18 | 
  19 |   await expect(page.locator("#displayed-text")).toBeHidden();
  20 | // Checks that the text box is now hidden.
  21 | 
  22 |   await page.locator("#confirmbtn").click();
  23 | // Clicks the confirm button, which opens a pop-up dialog.
  24 | 
  25 |   await page.locator("#mousehover").hover();
  26 | // Moves the mouse pointer over the element with ID 'mousehover'.
  27 | 
  28 |   const framesPage = page.frameLocator("#courses-iframe");
  29 | // Finds and stores the iframe element with ID 'courses-iframe'.
  30 | // it highlighted small frame inside big frame.
  31 | 
  32 |   await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  33 | // Finds and clicks the visible 'lifetime-access' link inside the iframe.
  34 | 
  35 |   await page.frameLocator('iframe[name="iframe-name"]').getByRole('link', { name: 'NEW All Access plan' }).click();
  36 | // Finds the iframe by name and clicks the 'NEW All Access plan' link inside it.
  37 | 
  38 |   await page.frameLocator('iframe[name="iframe-name"]').getByText('13,522').click();
  39 | // Finds the iframe by name and clicks the text '13,522' inside it.
  40 | 
  41 | });
  42 | 
```