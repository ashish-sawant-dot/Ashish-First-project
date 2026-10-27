# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FlipkartE2ETest.spec.js >> Flipkart E2E Search, Add to Cart, and Proceed Flow
- Location: tests\FlipkartE2ETest.spec.js:7:1

# Error details

```
Error: page.waitForLoadState: Target page, context or browser has been closed
```

# Test source

```ts
  1  | class FlipkartSearchResultsPage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |     // Uses structural URL matching (href with /p/) instead of brittle random class names
  5  |     this.firstProductLink = page.locator('a[href*="/p/"]').first();
  6  |     this.loginCloseBtn = page.locator('button._2KpZ6l._2doB4z, span._30XB9F, button:has-text("✕")').first();
  7  |   }
  8  | 
  9  |   async selectFirstProduct() {
  10 |     await this.page.waitForLoadState('domcontentloaded');
  11 | 
  12 |     // Close login modal if it pops up after search
  13 |     const isModalVisible = await this.loginCloseBtn.isVisible({ timeout: 3000 }).catch(() => false);
  14 |     if (isModalVisible) {
  15 |       await this.loginCloseBtn.click();
  16 |     }
  17 | 
  18 |     // Wait for the first product link containing /p/ in its URL
  19 |     await this.firstProductLink.waitFor({ state: 'attached', timeout: 15000 });
  20 |     await this.firstProductLink.scrollIntoViewIfNeeded();
  21 | 
  22 |     // Listen for the new tab event when clicking product
  23 |     const [newPage] = await Promise.all([
  24 |       this.page.context().waitForEvent('page'),
  25 |       this.firstProductLink.click()
  26 |     ]);
  27 | 
> 28 |     await newPage.waitForLoadState('domcontentloaded');
     |                   ^ Error: page.waitForLoadState: Target page, context or browser has been closed
  29 |     return newPage;
  30 |   }
  31 | }
  32 | 
  33 | module.exports = { FlipkartSearchResultsPage };
```