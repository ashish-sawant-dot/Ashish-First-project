// Heading - Import Playwright test and expect
const { test, expect } = require('@playwright/test');
// Why - To use Playwright's test() and expect() functions.
// Meaning - Imports test and expect from the Playwright library.


// Heading - Create Popup validations test
test("Popup validations", async ({ page }) => {
// Why - To create a test for popup, visibility, mouse hover and iframe validations.
// Meaning - Starts a Playwright test and provides the page object.

    // Heading - Handle browser dialogs automatically
    page.on('dialog', dialog => dialog.accept());
    // Why - To automatically accept JavaScript alert or confirmation popups.
    // Meaning - Listens for a dialog and clicks its Accept/OK button.

    // Heading - Open the Automation Practice website
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // Why - To open the webpage before performing test actions.
    // Meaning - Navigates the browser to the given URL.

    // Heading - Verify that the textbox is visible
    await expect(page.locator("#displayed-text")).toBeVisible();
    // Why - To verify that the textbox is initially displayed.
    // Meaning - Finds the element using its ID and checks that it is visible.

    // Heading - Click the Hide button
    await page.locator("#hide-textbox").click();
    // Why - To hide the textbox using the application's Hide button.
    // Meaning - Finds the Hide button using its ID and clicks it.

    // Heading - Verify that the textbox is hidden
    await expect(page.locator("#displayed-text")).toBeHidden();
    // Why - To verify that the textbox was successfully hidden.
    // Meaning - Checks that the displayed-text element is not visible.

    // Heading - Click the Confirm button
    await page.locator("#confirmbtn").click();
    // Why - To trigger the JavaScript confirmation popup.
    // Meaning - Finds the Confirm button and clicks it.

    // Heading - Hover over Mouse Hover
    await page.locator("#mousehover").hover();
    // Why - To test the mouse-hover functionality.
    // Meaning - Moves the mouse pointer over the specified element.

    // Heading - Create a locator for the iframe
    const framesPage = page.frameLocator("#courses-iframe");
    // Why - To access elements inside the iframe.
    // Meaning - Creates a FrameLocator for the iframe having ID courses-iframe.

    // Heading - Click the visible Lifetime Access link
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    // Why - To click the required Lifetime Access link inside the iframe.
    // Meaning - Finds a visible link containing "lifetime-access" and clicks it.

    // Heading - Get the heading text from the iframe
    const textCheck = await framesPage.locator(".text h2").textContent();
    // Why - To read the text displayed in the h2 element.
    // Meaning - Gets the h2 text and stores it in textCheck.

    // Heading - Print the second word from the text
    console.log(textCheck.split(" ")[1]);
    // Why - To print a specific word from the retrieved text.
    // Meaning - split(" ") separates the text into words and [1] gets the second word.
});


// Heading - Create Screenshot and Visual comparison test
test("Screenshot & Visual comparison", async ({ page }) => {
// Why - To create a separate test for screenshots and visibility validation.
// Meaning - Starts a Playwright test using the page object.

    // Heading - Open the Automation Practice website
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // Why - To open the webpage before taking screenshots.
    // Meaning - Navigates the browser to the given URL.

    // Heading - Verify that the textbox is visible
    await expect(page.locator("#displayed-text")).toBeVisible();
    // Why - To make sure the textbox is visible before taking its screenshot.
    // Meaning - Checks whether the displayed-text element is visible.

    // Heading - Take a screenshot of only the textbox
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
    // Why - To capture only the selected textbox.
    // Meaning - Takes a screenshot of the element and saves it as partialScreenshot.png.

    // Heading - Hide the textbox
    await page.locator("#hide-textbox").click();
    // Why - To change the page state before taking the full-page screenshot.
    // Meaning - Clicks the Hide button to hide the textbox.

    // Heading - Take a screenshot of the complete page
    await page.screenshot({ path: 'screenshot.png' });
    // Why - To capture the current webpage.
    // Meaning - Takes a screenshot of the page and saves it as screenshot.png.

    // Heading - Verify that the textbox is hidden
    await expect(page.locator("#displayed-text")).toBeHidden();
    // Why - To verify that the Hide operation worked correctly.
    // Meaning - Checks that the displayed-text element is hidden.
});


// Heading - Create Visual comparison test
test('visual', async ({ page }) => {
// Why - To create a test for Playwright's visual screenshot comparison.
// Meaning - Starts a test named "visual" using the page object.

    // Heading - Open the Automation Practice website
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // Why - To open the webpage whose appearance will be compared.
    // Meaning - Navigates the browser to the Automation Practice URL.

    // Heading - Compare the current screenshot with the baseline screenshot
    await expect(page).toHaveScreenshot('landing.png', {
        maxDiffPixelRatio: 0.05
    });
    // Why - To compare the current page screenshot with the saved baseline screenshot.
    // Meaning - Compares the screenshots and allows up to 5% pixel difference.
});