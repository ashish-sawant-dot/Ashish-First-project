const { test, expect } = require('@playwright/test');
const { FlipkartHomePage } = require('./PageObjectsFlipKart/FlipkartHomePage');
const { FlipkartSearchResultsPage } = require('./PageObjectsFlipKart/FlipkartSearchResultsPage');
const { FlipkartProductPage } = require('./PageObjectsFlipKart/FlipkartProductPage');
const { FlipkartCartPage } = require('./PageObjectsFlipKart/FlipkartCartPage');

test('Flipkart E2E Search, Add to Cart, and Proceed Flow', async ({ page }) => {
  // 1. Navigate to Flipkart
  const homePage = new FlipkartHomePage(page);
  await homePage.navigate();

  // 2. Search for the product (e.g., iPhone 18 pro)
  await homePage.searchProduct('iPhone 18 pro');

  // 3. Select first result and switch to the product page tab
  const searchResultsPage = new FlipkartSearchResultsPage(page);
  const productTab = await searchResultsPage.selectFirstProduct();

  // 4. Add product to cart & Go to cart on the new tab
  const productPage = new FlipkartProductPage(productTab);
  await productPage.addToCart();
  await productPage.goToCart();

  // 5. Place order (Checkout flow step)
  const cartPage = new FlipkartCartPage(productTab);
  await cartPage.proceedToCheckout();
});