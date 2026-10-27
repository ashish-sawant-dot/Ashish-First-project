const { test, expect } = require('@playwright/test');
const { AmazonLoginPage2 } = require('./PageObjectAmazone2/AmazonLoginPage2');
const { AmazonHomePage2 } = require('./PageObjectAmazone2/AmazonHomePage2');
const { AmazonSearchResultsPage2 } = require('./PageObjectAmazone2/AmazonSearchResultsPage2');
const { AmazonProductPage2 } = require('./PageObjectAmazone2/AmazonProductPage2');
const { AmazonCartPage2 } = require('./PageObjectAmazone2/AmazonCartPage2');

test('Amazon E2E Login, Search, Add to Cart, and Cart Output Flow', async ({ page }) => {
  const credentials = {
    username: 'absgngdadacontact@gmail.com',
    password: 'Ashish@6500'
  };
  
  const searchKeyword = 'iPhone 18 Pro';

  // 1. Initialize Page Objects
  const loginPage = new AmazonLoginPage2(page);
  const homePage = new AmazonHomePage2(page);
  const searchResultsPage = new AmazonSearchResultsPage2(page);

  // 2. Perform Login
  await loginPage.navigateToSignIn();
  await loginPage.login(credentials.username, credentials.password);

  // 3. Search Product
  await homePage.searchProduct(searchKeyword);

  // 4. Select Product (returns active tab object)
  const productPageTab = await searchResultsPage.selectFirstProduct();

  // 5. Add to Cart & Navigate to Cart
  const productPage = new AmazonProductPage2(productPageTab);
  await productPage.addToCart();
  await productPage.goToCart();

  // 6. Print Cart Item in Output Terminal
  const cartPage = new AmazonCartPage2(productPageTab);
  const productName = await cartPage.getCartProductTitle();

  console.log('--------------------------------------------------');
  console.log('Selected Product in Cart:', productName);
  console.log('--------------------------------------------------');

  // 7. Proceed to Checkout
  await cartPage.proceedToCheckout();
});