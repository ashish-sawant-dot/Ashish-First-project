const { test, expect } = require('@playwright/test')

// PURPOSE: Create a Playwright test.
// MECHANISM: test() defines the test name and receives the browser page fixture.
test('@Webst Client App login', async ({ page }) => {

  // PURPOSE: Store the login email in a variable.
  // MECHANISM: The email value can be reused later in the test.
  const email = "ashishsawant64464@gmail.com"

  // PURPOSE: Store the product we want to purchase.
  // MECHANISM: This value is compared with product names on the page.
  const productName = "ZARA COAT 3"

  // PURPOSE: Locate all product cards.
  // MECHANISM: .card-body identifies every product card on the page.
  const products = page.locator(".card-body")

  // PURPOSE: Open the application.
  // MECHANISM: goto() navigates the browser to the specified URL.
  await page.goto("https://rahulshettyacademy.com/client")

  // PURPOSE: Enter the email.
  // MECHANISM: fill() clears the field and enters the given value.
  await page.locator("#userEmail").fill(email)

  // PURPOSE: Enter the password.
  // MECHANISM: fill() enters the password into the password field.
  await page.locator("#userPassword").fill("Ashish@6500")

  // PURPOSE: Login to the application.
  // MECHANISM: click() clicks the element whose value attribute is Login.
  await page.locator("[value='Login']").click()

  // PURPOSE: Wait until network activity becomes idle.
  // MECHANISM: Playwright waits until there are no ongoing network requests.
  await page.waitForLoadState("networkidle")

  // PURPOSE: Wait until the first product title is available.
  // MECHANISM: waitFor() waits for the located element to become visible.
  await page.locator(".card-body b").first().waitFor()

  // PURPOSE: Get the names of all products.
  // MECHANISM: allTextContents() returns the text of all matching elements as an array.
  const titles = await page.locator(".card-body b").allTextContents()

  // PURPOSE: Display all product names in the terminal.
  // MECHANISM: console.log() prints the array.
  console.log(titles)

  // PURPOSE: Find how many products are displayed.
  // MECHANISM: count() returns the number of elements matching products.
  const count = await products.count()

  // PURPOSE: Check every product one by one.
  // MECHANISM: nth(i) selects the product at index i.
  for (let i = 0; i < count; ++i) {

    // PURPOSE: Check whether the current product is ZARA COAT 3.
    // MECHANISM: textContent() gets the product name and compares it with productName.
    if (await products.nth(i).locator("b").textContent() === productName) {

      // PURPOSE: Add the matching product to the cart.
      // MECHANISM: locator() finds Add To Cart inside the selected product and click() clicks it.
      await products.nth(i).locator("text= Add To Cart").click()

      // PURPOSE: Stop searching after finding the required product.
      // MECHANISM: break exits the for loop.
      break
    }
  }

  // PURPOSE: Open the shopping cart.
  // MECHANISM: Finds an element whose routerlink contains "cart" and clicks it.
  await page.locator("[routerlink*='cart']").click()

  // PURPOSE: Wait for the cart item to appear.
  // MECHANISM: first() selects the first matching li and waitFor() waits for it.
  await page.locator("div li").first().waitFor()

  // PURPOSE: Check whether ZARA COAT 3 is visible in the cart.
  // MECHANISM: isVisible() returns true or false.
  const isProductVisible =
    await page.locator("h3:has-text('ZARA COAT 3')").isVisible()

  // PURPOSE: Verify that the product is present in the cart.
  // MECHANISM: toBeTruthy() passes when isProductVisible is true.
  expect(isProductVisible).toBeTruthy()

  // PURPOSE: Go to checkout.
  // MECHANISM: Finds the Checkout text and clicks it.
  await page.getByText("Checkout").click()

  // PURPOSE: Enter the country name.
  // MECHANISM: pressSequentially() types characters one by one, which is useful for autocomplete fields.
  await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 })

  // PURPOSE: Locate the country dropdown.
  // MECHANISM: .ta-results identifies the autocomplete result container.
  const dropdown = page.locator(".ta-results")

  // PURPOSE: Wait for the country dropdown to appear.
  // MECHANISM: waitFor() waits until the dropdown is visible.
  await dropdown.waitFor()

  // PURPOSE: Find the number of country options.
  // MECHANISM: count() counts all button elements inside the dropdown.
  const optionsCount = await dropdown.locator("button").count()

  // PURPOSE: Check each country option.
  // MECHANISM: nth(i) selects each button one at a time.
  for (let i = 0; i < optionsCount; ++i) {

    // PURPOSE: Get the name of the current country.
    // MECHANISM: textContent() reads the text of the current button.
    const text = await dropdown.locator("button").nth(i).textContent()

    // PURPOSE: Check whether the current option is India.
    // MECHANISM: Compares the returned text with " India".
    if (text?.trim() === "India") {

      // PURPOSE: Select India.
      // MECHANISM: click() clicks the India option.
      await dropdown.locator("button").nth(i).click()

      // PURPOSE: Stop searching after selecting India.
      // MECHANISM: break exits the loop.
      break
    }
  }

  // PURPOSE: Verify that the email is displayed correctly on the checkout page.
  // MECHANISM: toHaveText() automatically waits and compares the element's text.
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email)

  // PURPOSE: Place the order.
  // MECHANISM: click() clicks the submit/place-order button.
  await page.locator(".action__submit").click()

  // PURPOSE: Verify that the order was successfully placed.
  // MECHANISM: toHaveText() waits for and compares the confirmation message.
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

  // PURPOSE: Get the generated order ID.
  // MECHANISM: textContent() reads the order ID from the page.
  const orderId =
    await page.locator(".em-spacer-1 .ng-star-inserted").textContent()

  // PURPOSE: Display the order ID in the terminal.
  // MECHANISM: console.log() prints the order ID.
  console.log(orderId)

  // PURPOSE: Open My Orders.
  // MECHANISM: Finds the button whose routerlink contains "myorders" and clicks it.
  await page.locator("button[routerlink*='myorders']").click()

  // PURPOSE: Wait for the orders table to appear.
  // MECHANISM: waitFor() waits until the tbody is visible.
  await page.locator("tbody").waitFor()

  // PURPOSE: Locate all order rows.
  // MECHANISM: tbody tr represents each row in the orders table.
  const rows = page.locator("tbody tr")

  // PURPOSE: Check every order row.
  // MECHANISM: Loops through all rows using their index.
  for (let i = 0; i < await rows.count(); ++i) {

    // PURPOSE: Get the order ID from the current row.
    // MECHANISM: locator("th").textContent() reads the order ID.
    const rowOrderId = await rows.nth(i).locator("th").textContent()

    // PURPOSE: Find our newly created order.
    // MECHANISM: includes() checks whether the main order ID contains the row order ID.
    if (rowOrderId && orderId?.includes(rowOrderId.trim())) {

      // PURPOSE: Open the details of the matching order.
      // MECHANISM: first() selects the first button in that row and click() opens it.
      await rows.nth(i).locator("button").first().click()

      // PURPOSE: Stop searching after finding the order.
      // MECHANISM: break exits the loop.
      break
    }
  }

  // PURPOSE: Get the order ID from the order details page.
  // MECHANISM: textContent() reads the order ID displayed on the page.
  const orderIdDetails = await page.locator(".col-text").textContent()

  // PURPOSE: Verify that the order details ID matches the created order ID.
  // MECHANISM: includes() checks whether the order ID contains the displayed ID.
 expect(orderId.includes(orderIdDetails.trim())).toBeTruthy()

})
