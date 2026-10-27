# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Screenshot.spec.js >> Popup validations
- Location: tests\Screenshot.spec.js:8:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/AutomationPractice/", waiting until "load"

```

# Test source

```ts
  1   | // Heading - Import Playwright test and expect
  2   | const { test, expect } = require('@playwright/test');
  3   | // Why - To use Playwright's test() and expect() functions.
  4   | // Meaning - Imports test and expect from the Playwright library.
  5   | 
  6   | 
  7   | // Heading - Create Popup validations test
  8   | test("Popup validations", async ({ page }) => {
  9   | // Why - To create a test for popup, visibility, mouse hover and iframe validations.
  10  | // Meaning - Starts a Playwright test and provides the page object.
  11  | 
  12  |     // Heading - Handle browser dialogs automatically
  13  |     page.on('dialog', dialog => dialog.accept());
  14  |     // Why - To automatically accept JavaScript alert or confirmation popups.
  15  |     // Meaning - Listens for a dialog and clicks its Accept/OK button.
  16  | 
  17  |     // Heading - Open the Automation Practice website
> 18  |     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      |                ^ Error: page.goto: Target page, context or browser has been closed
  19  |     // Why - To open the webpage before performing test actions.
  20  |     // Meaning - Navigates the browser to the given URL.
  21  | 
  22  |     // Heading - Verify that the textbox is visible
  23  |     await expect(page.locator("#displayed-text")).toBeVisible();
  24  |     // Why - To verify that the textbox is initially displayed.
  25  |     // Meaning - Finds the element using its ID and checks that it is visible.
  26  | 
  27  |     // Heading - Click the Hide button
  28  |     await page.locator("#hide-textbox").click();
  29  |     // Why - To hide the textbox using the application's Hide button.
  30  |     // Meaning - Finds the Hide button using its ID and clicks it.
  31  | 
  32  |     // Heading - Verify that the textbox is hidden
  33  |     await expect(page.locator("#displayed-text")).toBeHidden();
  34  |     // Why - To verify that the textbox was successfully hidden.
  35  |     // Meaning - Checks that the displayed-text element is not visible.
  36  | 
  37  |     // Heading - Click the Confirm button
  38  |     await page.locator("#confirmbtn").click();
  39  |     // Why - To trigger the JavaScript confirmation popup.
  40  |     // Meaning - Finds the Confirm button and clicks it.
  41  | 
  42  |     // Heading - Hover over Mouse Hover
  43  |     await page.locator("#mousehover").hover();
  44  |     // Why - To test the mouse-hover functionality.
  45  |     // Meaning - Moves the mouse pointer over the specified element.
  46  | 
  47  |     // Heading - Create a locator for the iframe
  48  |     const framesPage = page.frameLocator("#courses-iframe");
  49  |     // Why - To access elements inside the iframe.
  50  |     // Meaning - Creates a FrameLocator for the iframe having ID courses-iframe.
  51  | 
  52  |     // Heading - Click the visible Lifetime Access link
  53  |     await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  54  |     // Why - To click the required Lifetime Access link inside the iframe.
  55  |     // Meaning - Finds a visible link containing "lifetime-access" and clicks it.
  56  | 
  57  |     // Heading - Get the heading text from the iframe
  58  |     const textCheck = await framesPage.locator(".text h2").textContent();
  59  |     // Why - To read the text displayed in the h2 element.
  60  |     // Meaning - Gets the h2 text and stores it in textCheck.
  61  | 
  62  |     // Heading - Print the second word from the text
  63  |     console.log(textCheck.split(" ")[1]);
  64  |     // Why - To print a specific word from the retrieved text.
  65  |     // Meaning - split(" ") separates the text into words and [1] gets the second word.
  66  | });
  67  | 
  68  | 
  69  | // Heading - Create Screenshot and Visual comparison test
  70  | test("Screenshot & Visual comparison", async ({ page }) => {
  71  | // Why - To create a separate test for screenshots and visibility validation.
  72  | // Meaning - Starts a Playwright test using the page object.
  73  | 
  74  |     // Heading - Open the Automation Practice website
  75  |     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  76  |     // Why - To open the webpage before taking screenshots.
  77  |     // Meaning - Navigates the browser to the given URL.
  78  | 
  79  |     // Heading - Verify that the textbox is visible
  80  |     await expect(page.locator("#displayed-text")).toBeVisible();
  81  |     // Why - To make sure the textbox is visible before taking its screenshot.
  82  |     // Meaning - Checks whether the displayed-text element is visible.
  83  | 
  84  |     // Heading - Take a screenshot of only the textbox
  85  |     await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' });
  86  |     // Why - To capture only the selected textbox.
  87  |     // Meaning - Takes a screenshot of the element and saves it as partialScreenshot.png.
  88  | 
  89  |     // Heading - Hide the textbox
  90  |     await page.locator("#hide-textbox").click();
  91  |     // Why - To change the page state before taking the full-page screenshot.
  92  |     // Meaning - Clicks the Hide button to hide the textbox.
  93  | 
  94  |     // Heading - Take a screenshot of the complete page
  95  |     await page.screenshot({ path: 'screenshot.png' });
  96  |     // Why - To capture the current webpage.
  97  |     // Meaning - Takes a screenshot of the page and saves it as screenshot.png.
  98  | 
  99  |     // Heading - Verify that the textbox is hidden
  100 |     await expect(page.locator("#displayed-text")).toBeHidden();
  101 |     // Why - To verify that the Hide operation worked correctly.
  102 |     // Meaning - Checks that the displayed-text element is hidden.
  103 | });
  104 | 
  105 | 
  106 | // Heading - Create Visual comparison test
  107 | test('visual', async ({ page }) => {
  108 | // Why - To create a test for Playwright's visual screenshot comparison.
  109 | // Meaning - Starts a test named "visual" using the page object.
  110 | 
  111 |     // Heading - Open the Automation Practice website
  112 |     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  113 |     // Why - To open the webpage whose appearance will be compared.
  114 |     // Meaning - Navigates the browser to the Automation Practice URL.
  115 | 
  116 |     // Heading - Compare the current screenshot with the baseline screenshot
  117 |     await expect(page).toHaveScreenshot('landing.png', {
  118 |         maxDiffPixelRatio: 0.05
```