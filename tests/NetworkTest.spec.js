 

const { test, expect } = require('@playwright/test');
test('@QW Security test request intercept', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');

    // HEADING: Fill Email Credentials
    await page.locator("#userEmail").fill("ashishsawant64464@gmail.com");

    // HEADING: Fill Password Credentials
    await page.locator("#userPassword").fill("Ashish@6500");

    // HEADING: Submit Login Form
    await page.locator("[value='Login']").click();

    // HEADING: Wait for Network Idle
       await page.waitForLoadState('networkidle');
    // 1) Why: To ensure all network requests finish loading before proceeding.
    // 2) Connection: Connects login submission above to waiting for UI elements below.
    // 3) Meaning: Pauses the test until no active network calls remain.

    // HEADING: Wait for Dashboard Element
    await page.locator(".card-body b").first().waitFor();
    // 1) Why: To confirm that dashboard products are rendered on screen.
    // 2) Connection: Connects network idle check above to opening the orders page below.
    // 3) Meaning: Waits until the first product title becomes visible.

    // HEADING: Navigate to My Orders Page
    await page.locator("button[routerlink*='myorders']").click();
    // 1) Why: To go to the user's order history page.
    // 2) Connection: Connects successful login above to setting up API interception below.
    // 3) Meaning: Clicks the "My Orders" button.

    // HEADING: Intercept and Manipulate API Request
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    // 1) Why: To test security by swapping the target order ID with another user's order ID.
    // 2) Connection: Connects to clicking "View" below to trigger the altered API call.
    // 3) Meaning: Intercepts the URL and redirects it to load a different order ID.

    // HEADING: Trigger Order Details View
    await page.locator("button:has-text('View')").first().click();
    // 1) Why: To trigger the API call that was set up for interception.
    // 2) Connection: Connects directly to the `page.route` rule defined above.
    // 3) Meaning: Clicks the "View" button for the first order in the list.

    // HEADING: Verify Authorization Error Message
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    // 1) Why: To confirm that the backend blocks unauthorized access to other users' orders.
    // 2) Connection: Connects to the tampered request above to verify application security.
    // 3) Meaning: Asserts that the page shows "You are not authorize to view this order".

})


