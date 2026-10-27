const { test, expect } = require('@playwright/test');

test('Extract dynamic number and web table book names', async ({ page }) => {
    // 1. Navigate to the practice website
    await page.goto('https://testautomationpractice.blogspot.com/');

    // -------------------------------------------------------------
    // SCENARIO 1: Extract dynamic number 1909 from text using Regex
    // -------------------------------------------------------------
    const s = "showing 1 to 10 of 1 (1909 pages)";
    const numbers = s.match(/\d+/g);
    const dynamicNumber = numbers ? numbers[numbers.length - 1] : '';
    
    console.log("Extracted Dynamic Number: " + dynamicNumber);

    // -------------------------------------------------------------
    // SCENARIO 2: Handle static web table to extract all Book Names
    // -------------------------------------------------------------
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForSelector('#productTable');

    const rows = await page.$$('#productTable tbody tr');

    console.log("\n--- List of Book Names from the Table ---");
    for (const row of rows) {
        const columns = await row.$$('td');
        if (columns.length >= 2) {
            const bookName = await columns[1].innerText();
            console.log(bookName);
        }
    }
});