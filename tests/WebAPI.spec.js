// ==================================================
// HEADING: Import Playwright
// ==================================================

const { test, expect, request } = require('@playwright/test');
// WHY: To use test, expect and request in this file.
// MEANING: Imports Playwright features from the package.


// HEADING: Import Console Assert

const { assert } = require('node:console');
// WHY: This line imports assert from node:console.
// MEANING: assert is not used anywhere in this program.


// HEADING: Import APIUtils

const { APIUtils } = require('./Utils/APIUtils');
// WHY: To reuse API methods written in APIUtils.js.
// MEANING: APIUtils is the class used for login and order creation.


// ==================================================
// HEADING: Create Login Payload
// ==================================================

const loginPayLoad = {
    userEmail: "ashishsawant64464@gmail.com",
    userPassword: "Ashish@6500"
}
// WHY: To provide username and password for API login.
// MEANING: loginPayLoad stores login credentials.


// HEADING: Create Order Payload

const orderPayLoad = {
    orders: [
        {
            country: "India",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}
// WHY: To provide order details to the Create Order API.
// MEANING: orderPayLoad contains country and product ID.


// HEADING: Declare Response Variable

let response
// WHY: To store the token and order ID returned by APIUtils.
// MEANING: response is declared outside the hooks so both hooks can use it.


// ==================================================
// HEADING: Before All Hook
// ==================================================

test.beforeAll(async () =>
// WHY: To execute API order creation before the test starts.
// MEANING: beforeAll runs once before all tests in this file.
{

    // HEADING: Create API Context

    const apiContext = await request.newContext();
    // WHY: To create an object for sending API requests.
    // MEANING: apiContext is used for POST requests.


    // HEADING: Create APIUtils Object

    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    // WHY: To use the API methods from APIUtils class.
    // MEANING: Creates an APIUtils object with context and login data.


    // HEADING: Create Order Through API

    response = await apiUtils.createOrder(orderPayLoad);
    // WHY: To create the order before opening the website.
    // MEANING: Calls createOrder() and stores token + order ID.

});

// ==================================================
// HEADING: Place Order Test
// ==================================================

test('@API Place the order', async ({ page }) =>
// WHY: To verify that the API-created order is visible in UI.
// MEANING: Starts a Playwright test with a browser page.
{

    // HEADING: Set Browser Local Storage

    await page.addInitScript(value =>
    // WHY: To store the API login token in browser storage.
    // MEANING: addInitScript runs before page scripts.
    {

        // HEADING: Save Token

        window.localStorage.setItem('token', value);
        // WHY: To authenticate the website using the API token.
        // MEANING: Stores the token under the key "token".

    }, response.token);
    // WHY: To pass the token to the initialization script.
    // MEANING: response.token contains the login token.


    // HEADING: Open Client Website

    await page.goto("https://rahulshettyacademy.com/client");
    // WHY: To open the web application for UI verification.
    // MEANING: Navigates the browser to the client application.


    // HEADING: Click My Orders

    await page.locator("button[routerlink*='myorders']").click();
    // WHY: To open the order list page.
    // MEANING: Clicks the button whose routerlink contains "myorders".


    // HEADING: Wait for Order Table

    await page.locator("tbody").waitFor();
    // WHY: To wait for the table body to be available.
    // MEANING: tbody represents the table body containing order rows.


    // HEADING: Get All Order Rows

    const rows = await page.locator("tbody tr");
    // WHY: To find all rows in the order table.
    // MEANING: rows contains the locator for all tbody tr elements.


    // ==================================================
    // HEADING: Loop Through Order Rows
    // ==================================================

    for (let i = 0; i < await rows.count(); ++i)
    // WHY: To check every order until the matching order is found.
    // MEANING: The loop processes one row at a time.
    {

        // HEADING: Get Row Order ID

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // WHY: To read the order ID from the current row.
        // MEANING: nth(i) selects the current row, th contains the order ID.


        // HEADING: Compare Order IDs

        if (response.orderId.includes(rowOrderId))
        // WHY: To find the order created through API.
        // MEANING: includes() checks whether response.orderId contains rowOrderId.
        {

            // HEADING: Click Order Details

            await rows.nth(i).locator("button").first().click();
            // WHY: To open details of the matching order.
            // MEANING: Selects the first button in the matching row and clicks it.


            // HEADING: Stop Loop

            break;
            // WHY: No need to check remaining rows after finding the order.
            // MEANING: break exits the for loop.

        }

    }


    // HEADING: Get Order ID from Details

    const orderIdDetails = await page.locator(".col-text").textContent();
    // WHY: To read the order ID displayed on the details page.
    // MEANING: .col-text identifies the element containing the order ID.


    // HEADING: Pause Debugging

    // await page.pause();
    // WHY: To pause execution for manual inspection when needed.
    // MEANING: page.pause() opens Playwright Inspector.
    // This line is commented, so it will not execute.


    // HEADING: Verify Order ID

    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    // WHY: To confirm the API order ID matches the UI order ID.
    // MEANING: includes() checks the ID, and toBeTruthy() verifies true.

});