const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./PageObject2/LoginPage');
const { DashboardPage } = require('./PageObject2/DashboardPage');
const { CartPage } = require('./PageObject2/CartPage');
const { OrderReviewPage } = require('./PageObject2/OrderReviewPage');
const { OrderHistoryPage } = require('./PageObject2/OrderHistoryPage');

test('Complete E2E Order Flow Test', async ({ page }) => {
  const productName = 'ZARA COAT 3';
  const country = 'India';

  // Step 1: Create page objects
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const cartPage = new CartPage(page);
  const reviewPage = new OrderReviewPage(page);
  const historyPage = new OrderHistoryPage(page);

  // Step 2: Login to application
  await loginPage.goto();
  await loginPage.login('ashishsawant64464@gmail.com', 'Ashish@6500');

  // Step 3: Add product to cart
  await dashboardPage.waitForLoad();
  await dashboardPage.addProductToCart(productName);
  await dashboardPage.navigateToCart();

  // Step 4: Verify product in cart and checkout
  await expect(cartPage.verifyProductInCart(productName)).toBeVisible();
  await cartPage.checkout();

  // Step 5: Select country and place order
  await reviewPage.selectCountry(country);
  await reviewPage.placeOrder();
  await reviewPage.verifyConfirmMessage(" Thankyou for the order. ");
  
  // Get raw order ID and clean up vertical bars / extra spaces
  const rawOrderId = await reviewPage.getOrderId();
  const cleanOrderId = rawOrderId.replaceAll('|', '').trim();
  

  // PRINT ORDER ID TO TERMINAL OUTPUT
  console.log('-----------------------------------');
  console.log('Placed Order ID:', cleanOrderId);
  console.log('-----------------------------------');

  // Step 6: Verify order in history page
  await historyPage.navigateToOrders();
  const isFound = await historyPage.verifyOrderIdInHistory(cleanOrderId);
  expect(isFound).toBe(true);
  
});