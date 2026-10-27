# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Playwright 1 to 10sec.spec.js\childSec5.spec.js >> @Child windows handle
- Location: tests\Playwright 1 to 10sec.spec.js\childSec5.spec.js:7:1

# Error details

```
Error: locator.textContent: Target page, context or browser has been closed
```

# Test source

```ts
  1  | // Meaning: Imports the `test` function from the Playwright Test package.
  2  | // Mechanism: Uses Node.js CommonJS `require` to extract the `test` runner capability into local scope.
  3  | const { test } = require('@playwright/test');
  4  | 
  5  | // Meaning: Defines an asynchronous test case named "@Child windows handle".
  6  | // Mechanism: Registers the test with Playwright's test runner and extracts the `browser` fixture via ES6 object destructuring.
  7  | test('@Child windows handle', async ({ browser }) => 
  8  |     {
  9  |     // Meaning: Creates a new, isolated browser context (similar to an Incognito session).
  10 |     // Mechanism: Spawns a fresh session within the browser instance with isolated cookies, cache, and storage.
  11 |     const context = await browser.newContext()
  12 | 
  13 |     // Meaning: Opens a new web page/tab inside the created browser context.
  14 |     // Mechanism: Asynchronously initializes a single tab instance attached to the active `context`.
  15 |     const page = await context.newPage()
  16 | 
  17 |     // Meaning: Creates a locator object targeting the element with the ID `username`.
  18 |     // Mechanism: Defines a re-usable element reference using an ID CSS selector without querying the DOM immediately.
  19 |     const userName = page.locator('#username')
  20 | 
  21 |     // Meaning: Navigates the current tab to the target URL.
  22 |     // Mechanism: Directs the browser page to the web address and waits until the network load event completes.
  23 |     await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  24 | 
  25 |     // Meaning: Locates an anchor element whose `href` attribute contains the substring `'documents-request'`.
  26 |     // Mechanism: Stores a lazy reference using a partial CSS attribute selector to find the target link later.
  27 |     const documentLink = page.locator("[href*='documents-request']")
  28 | 
  29 |     // Meaning: Destructures the array result to capture the newly opened target page into `newPage`.
  30 |     // Mechanism: Uses ES6 array destructuring to store the first resolved promise value from `Promise.all`.
  31 |     const [newPage] = await Promise.all([
  32 |         // Meaning: Sets up an event listener waiting for a new tab/window to open in this context.
  33 |         // Mechanism: Returns a Promise that resolves with the new `Page` object as soon as the browser emits the `page` event.
  34 |         context.waitForEvent('page'),
  35 | 
  36 |         // Meaning: Clicks the document request link on the parent page.
  37 |         // Mechanism: Triggers the click action on the located element, causing the page to open a new tab.
  38 |         documentLink.click()
  39 |     ]) // Meaning & Mechanism: Concludes `Promise.all` to run listener setup and click concurrently, preventing race conditions.
  40 | 
  41 |     // Meaning: Fetches the text content from the element with class `red` inside the new window.
  42 |     // Mechanism: Waits for the element `.red` on `newPage` to load and extracts its inner text string.
> 43 |     const text = await newPage.locator('.red').textContent()
     |                                                ^ Error: locator.textContent: Target page, context or browser has been closed
  44 | 
  45 |     // Meaning: Splits the extracted text string into two parts at the `@` symbol.
  46 |     // Mechanism: Generates an array of substrings where index 0 is before `@` and index 1 is after `@`.
  47 |     const arrayText = text.split('@')
  48 | 
  49 |     // Meaning: Extracts the domain/email string right after `@` up to the next space.
  50 |     // Mechanism: Takes the second array element, splits it by space delimiters, and retrieves the first segment.
  51 |     const domain = arrayText[1].split(' ')[0]
  52 | 
  53 |     // Meaning: Types the extracted `domain` string into the parent page's username input field.
  54 |     // Mechanism: Clears existing text in the `#username` field and simulates typing the extracted string.
  55 |     await userName.fill(domain)
  56 | 
  57 |     // Meaning: Prints the current value stored in the username input box to the console.
  58 |     // Mechanism: Asynchronously reads the input field's DOM `value` property and passes it to Node.js output.
  59 |     console.log(await userName.inputValue())
  60 | // Meaning & Mechanism: Closes the async test function callback block and signals Playwright to conclude test execution.
  61 | });
```