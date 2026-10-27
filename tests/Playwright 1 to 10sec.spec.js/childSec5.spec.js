// Meaning: Imports the `test` function from the Playwright Test package.
// Mechanism: Uses Node.js CommonJS `require` to extract the `test` runner capability into local scope.
const { test } = require('@playwright/test');

// Meaning: Defines an asynchronous test case named "@Child windows handle".
// Mechanism: Registers the test with Playwright's test runner and extracts the `browser` fixture via ES6 object destructuring.
test('@Child windows handle', async ({ browser }) => 
    {
    // Meaning: Creates a new, isolated browser context (similar to an Incognito session).
    // Mechanism: Spawns a fresh session within the browser instance with isolated cookies, cache, and storage.
    const context = await browser.newContext()

    // Meaning: Opens a new web page/tab inside the created browser context.
    // Mechanism: Asynchronously initializes a single tab instance attached to the active `context`.
    const page = await context.newPage()

    // Meaning: Creates a locator object targeting the element with the ID `username`.
    // Mechanism: Defines a re-usable element reference using an ID CSS selector without querying the DOM immediately.
    const userName = page.locator('#username')

    // Meaning: Navigates the current tab to the target URL.
    // Mechanism: Directs the browser page to the web address and waits until the network load event completes.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    // Meaning: Locates an anchor element whose `href` attribute contains the substring `'documents-request'`.
    // Mechanism: Stores a lazy reference using a partial CSS attribute selector to find the target link later.
    const documentLink = page.locator("[href*='documents-request']")

    // Meaning: Destructures the array result to capture the newly opened target page into `newPage`.
    // Mechanism: Uses ES6 array destructuring to store the first resolved promise value from `Promise.all`.
    const [newPage] = await Promise.all([
        // Meaning: Sets up an event listener waiting for a new tab/window to open in this context.
        // Mechanism: Returns a Promise that resolves with the new `Page` object as soon as the browser emits the `page` event.
        context.waitForEvent('page'),

        // Meaning: Clicks the document request link on the parent page.
        // Mechanism: Triggers the click action on the located element, causing the page to open a new tab.
        documentLink.click()
    ]) // Meaning & Mechanism: Concludes `Promise.all` to run listener setup and click concurrently, preventing race conditions.

    // Meaning: Fetches the text content from the element with class `red` inside the new window.
    // Mechanism: Waits for the element `.red` on `newPage` to load and extracts its inner text string.
    const text = await newPage.locator('.red').textContent()

    // Meaning: Splits the extracted text string into two parts at the `@` symbol.
    // Mechanism: Generates an array of substrings where index 0 is before `@` and index 1 is after `@`.
    const arrayText = text.split('@')

    // Meaning: Extracts the domain/email string right after `@` up to the next space.
    // Mechanism: Takes the second array element, splits it by space delimiters, and retrieves the first segment.
    const domain = arrayText[1].split(' ')[0]

    // Meaning: Types the extracted `domain` string into the parent page's username input field.
    // Mechanism: Clears existing text in the `#username` field and simulates typing the extracted string.
    await userName.fill(domain)

    // Meaning: Prints the current value stored in the username input box to the console.
    // Mechanism: Asynchronously reads the input field's DOM `value` property and passes it to Node.js output.
    console.log(await userName.inputValue())
// Meaning & Mechanism: Closes the async test function callback block and signals Playwright to conclude test execution.
});