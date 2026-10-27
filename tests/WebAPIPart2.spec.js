// TOPIC: SAVING AND REUSING LOGIN SESSION IN PLAYWRIGHT

const { test, expect } = require('@playwright/test');

// STEP: Run Setup Before All Tests
test.beforeAll(async ({ browser }) => {
  // 1) Why: Logs in once so other tests don't have to repeat login steps.
  // 2) Connection: Creates the state.json file used by the main test below.
  // 3) Meaning: Runs this code block first before starting any test.

  // STEP: Create Isolated Browser Context
  const context = await browser.newContext();
  // 1) Why: Opens a clean, isolated browser space free of old cache/cookies.
  // 2) Connection: Uses the browser engine and prepares a context to open pages.
  // 3) Meaning: Starts a fresh incognito-like browser window.
  
  // STEP: Open New Tab
  const page = await context.newPage();
  // 1) Why: Needed to navigate websites and click elements.
  // 2) Connection: Belongs to the context created right above.
  // 3) Meaning: Opens a new blank tab.
  
  // STEP: Go to Website
  await page.goto("https://rahulshettyacademy.com/client");
  // 1) Why: Opens the login portal.
  // 2) Connection: Loads the webpage so we can enter credentials next.
  // 3) Meaning: Directs the tab to the specified web address.
  
  // STEP: Enter User Email
  await page.locator("#userEmail").fill("ashishsawant64464@gmail.com");
  // 1) Why: Fills required account email.
  // 2) Connection: Works on the email field loaded on the webpage.
  // 3) Meaning: Types the email into the input box.
  
  // STEP: Enter User Password
  await page.locator("#userPassword").fill("Ashish@6500");
  // 1) Why: Fills required account password.
  // 2) Connection: Pairs with email entry to complete credentials.
  // 3) Meaning: Types the password into the input box.
  
  // STEP: Click Login Button
  page.locator("[value='Login']").click();
  // 1) Why: Submits credentials to authenticate.
  // 2) Connection: Sends filled credentials to the server.
  // 3) Meaning: Presses the Login button.
  
  // STEP: Wait for Network Requests
  await page.waitForLoadState('networkidle');
  // 1) Why: Ensures login API requests finish before saving session data.
  // 2) Connection: Triggered right after clicking the login button.
  // 3) Meaning: Pauses execution until web background traffic stops.
  
  // STEP: Wait for Dashboard Cards
  await page.locator(".card-body").first().waitFor();
  // 1) Why: Confirms the user dashboard has rendered completely.
  // 2) Connection: Verifies login succeeded before saving session.
  // 3) Meaning: Waits until product cards are visible on screen.
  
  // STEP: Save Session State
  await context.storageState({ path: 'state.json' });
  // 1) Why: Saves cookies and login tokens to disk for reuse.
  // 2) Connection: Captures current logged-in state and saves it to state.json.
  // 3) Meaning: Exports current login session into a local file.
  
  // STEP: Close Setup Browser
  await context.close();
  // 1) Why: Cleans up memory after saving session data.
  // 2) Connection: Closes the temporary setup window finished above.
  // 3) Meaning: Shuts down the temporary browser tab and context.
});

// TOPIC: MAIN TEST FOR E-COMMERCE CHECKOUT & ORDER HISTORY

// STEP: Define Main Test
test('Client App login', async ({ browser }) => {
  // 1) Why: Runs the full checkout and order verification workflow.
  // 2) Connection: Reuses state.json created in setup to skip login screen.
  // 3) Meaning: Declares a runnable Playwright test case.

  // STEP: Create Pre-Authenticated Context
  const context = await browser.newContext({ storageState: 'state.json' });
  // 1) Why: Bypasses login screen using saved cookies and tokens.
  // 2) Connection: Reads state.json created inside beforeAll hook.
  // 3) Meaning: Opens a browser context that is already logged in.
  
  // STEP: Open Page in Authenticated Context
  const page = await context.newPage();
  // 1) Why: Needed to interact with the authenticated website.
  // 2) Connection: Uses the logged-in context created above.
  // 3) Meaning: Opens a tab inside the pre-authenticated session.

  // STEP: Set Target Product Name
  const productName = 'ZARA COAT 3';
  // 1) Why: Stores target product name in a reusable variable.
  // 2) Connection: Used to search, add to cart, and verify item across steps.
  // 3) Meaning: Saves 'ZARA COAT 3' text to variable productName.

  // STEP: Open App Dashboard
  await page.goto("https://rahulshettyacademy.com/client");
  // 1) Why: Loads store page; opens directly logged-in.
  // 2) Connection: Relies on pre-loaded login cookies from context.
  // 3) Meaning: Directs browser to main web portal.

  // STEP: Get Product Cards Reference
  const products = page.locator(".card-body");
  // 1) Why: Targets all product cards displayed on page.
  // 2) Connection: Points to card elements on store page.
  // 3) Meaning: Stores a locator reference for all product cards.

  // STEP: Wait for Products to Load
  await products.first().waitFor(); 
  // 1) Why: Prevents errors by making sure catalog is visible.
  // 2) Connection: Waits on products locator defined above.
  // 3) Meaning: Pauses execution until product items appear on screen.
  
  // STEP: Filter Selected Product
  const product = products.filter({ hasText: productName });
  // 1) Why: Finds the specific card matching target item name.
  // 2) Connection: Narrows down products locator using productName.
  // 3) Meaning: Selects only the 'ZARA COAT 3' product card.

  // STEP: Add Item to Cart
  await product.locator("text= Add To Cart").click();
  // 1) Why: Puts target product into active shopping cart.
  // 2) Connection: Operates on filtered product card above.
  // 3) Meaning: Clicks the 'Add To Cart' button for target item.

  // STEP: Go to Cart Page
  await page.locator("[routerlink*='cart']").click();
  // 1) Why: Opens cart view to check selected items.
  // 2) Connection: Follows adding item to cart.
  // 3) Meaning: Clicks the cart navigation link.
  
  // STEP: Target Product in Cart
  const cartProduct = page.locator(`.cartSection h3:has-text("${productName}")`);
  // 1) Why: Points to item title inside cart view.
  // 2) Connection: Uses productName variable inside cart DOM.
  // 3) Meaning: Locates 'ZARA COAT 3' text heading in cart.

  // STEP: Verify Product in Cart
  await expect(cartProduct).toBeVisible();
  // 1) Why: Confirms target item was successfully added.
  // 2) Connection: Evaluates cartProduct locator from previous step.
  // 3) Meaning: Asserts target product name is visible in cart.

  // STEP: Click Checkout
  await page.locator("text=Checkout").click();
  // 1) Why: Starts order checkout process.
  // 2) Connection: Executed after cart contents are verified.
  // 3) Meaning: Presses Checkout button to view payment page.

  // STEP: Search Country Name
  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });
  // 1) Why: Triggers country autosuggest dropdown list.
  // 2) Connection: Types into search box on checkout form.
  // 3) Meaning: Types "ind" slowly to trigger suggestion menu.

  // STEP: Target Dropdown Options
  const dropdown = page.locator(".ta-results");
  // 1) Why: References autosuggest search results box.
  // 2) Connection: Appears after typing country query.
  // 3) Meaning: Stores locator for country results container.

  // STEP: Wait for Dropdown
  await dropdown.waitFor();
  // 1) Why: Ensures country list finishes rendering.
  // 2) Connection: Operates on dropdown reference defined above.
  // 3) Meaning: Pauses script until country option box is visible.

  // STEP: Select Country Option
  await dropdown.locator("button").filter({ hasText: "India" }).first().click();
  // 1) Why: Picks target shipping country from suggested options.
  // 2) Connection: Finds matching choice inside active dropdown list.
  // 3) Meaning: Clicks 'India' option from suggestions.

  // STEP: Submit Order
  await page.locator(".action__submit").click();
  // 1) Why: Places purchase order to backend system.
  // 2) Connection: Final step of checkout after choosing country.
  // 3) Meaning: Clicks 'Place Order' button.

  // STEP: Check Success Message
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  // 1) Why: Verifies order was processed successfully.
  // 2) Connection: Asserts output displayed on order confirmation screen.
  // 3) Meaning: Confirms success banner displays thank you text.

  // STEP: Read Raw Order ID
  const rawOrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  // 1) Why: Gets generated order ID text from confirmation page.
  // 2) Connection: Reads ID text generated right after placing order.
  // 3) Meaning: Extracts full order ID string from web element.

  // STEP: Clean Order ID Format
  const cleanOrderId = rawOrderId.replace(/[^a-zA-Z0-9]/g, "").trim();
  // 1) Why: Removes unwanted characters like '|' for easier comparison.
  // 2) Connection: Cleans rawOrderId string read in previous step.
  // 3) Meaning: Keeps only letters and numbers in order ID.

  // STEP: Print Clean Order ID
  console.log("Cleaned Order ID:", cleanOrderId);
  // 1) Why: Logs processed ID to console output for debugging.
  // 2) Connection: Prints cleanOrderId string created above.
  // 3) Meaning: Outputs cleaned order ID string in test terminal.

  // STEP: Open Order History Page
  await page.locator("button[routerlink*='myorders']").click();
  // 1) Why: Navigates to user order history list page.
  // 2) Connection: Leaves confirmation screen to verify record storage.
  // 3) Meaning: Clicks 'My Orders' navigation button.

  // STEP: Wait for Orders Table
  await page.locator("tbody").waitFor();
  // 1) Why: Ensures order records finish loading from database.
  // 2) Connection: Waits on history table loaded on orders page.
  // 3) Meaning: Pauses execution until table rows appear.
  
  // STEP: Filter Row by Order ID
  const targetRow = page.locator("tbody tr").filter({ hasText: cleanOrderId });
  // 1) Why: Finds table row containing newly placed order.
  // 2) Connection: Filters table rows using cleanOrderId variable.
  // 3) Meaning: Matches specific table row showing our clean order ID.

  // STEP: Open Order Details
  await targetRow.locator("button").first().click();
  // 1) Why: Opens detailed summary view for specific order.
  // 2) Connection: Clicks view button inside filtered table row.
  // 3) Meaning: Presses 'View' button on matching order row.

  // STEP: Read Summary Order ID
  const orderIdDetails = await page.locator(".col-text").textContent();
  // 1) Why: Retrieves order ID displayed inside details page.
  // 2) Connection: Reads text on order summary page opened above.
  // 3) Meaning: Extracts order ID text from summary view.

  // STEP: Final Order Verification
  expect(cleanOrderId.includes(orderIdDetails.trim())).toBeTruthy();
  // 1) Why: Final check ensuring created order matches order summary view.
  // 2) Connection: Compares cleanOrderId with orderIdDetails string.
  // 3) Meaning: Asserts that order history ID matches confirmation ID.
});