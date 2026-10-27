const { test, expect } = require('@playwright/test');

test('Amazon E2E Search, Add to Cart, and Proceed to Checkout', async ({ page }) => {
  // Navigate to Amazon
  await page.goto('https://www.amazon.in');

  // Perform search
  const searchBox = page.getByRole('searchbox', { name: 'Search Amazon.in' });
  await searchBox.fill('iPhone 15');
  await page.getByRole('button', { name: 'Go' }).click();

  // Add the first matching product to cart directly from search results
  const addToCartBtn = page.getByRole('button', { name: 'Add to cart' }).first();
  await addToCartBtn.click();

  // Open the Shopping Cart
  const cartLink = page.getByRole('link', { name: /cart/i }).first();
  await cartLink.click();

  // Verify item in cart and proceed to checkout
  await expect(page).toHaveURL(/.*cart.*/);
  const checkoutBtn = page.getByRole('button', { name: /proceed to checkout/i });
  await checkoutBtn.click();
});