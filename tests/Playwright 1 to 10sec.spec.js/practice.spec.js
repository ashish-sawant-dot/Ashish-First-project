import { test, expect } from '@playwright/test';

// Meaning: Imports Playwright's test function and assertion library.
// Mechanism: test() creates a test case, while expect() verifies expected results.

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// Meaning: Stores the common base URL of the application.
// Mechanism: This variable is reused with different paths throughout the test.

// ── Credentials ────────────────────────────────────────────────────────────────

const USER_EMAIL = 'ashishsawant64464@gmail.com'; // update email with your account

// Meaning: Stores the email used to log in.
// Mechanism: The value is passed to the email input during login.

const USER_PASSWORD = 'Ashish@6500'; // update password with your account

// Meaning: Stores the password used to log in.
// Mechanism: The value is passed to the password field during login.

// ── Helpers ────────────────────────────────────────────────────────────────────

async function login(page)
{
  // Meaning: Defines a reusable login function.
// Mechanism: It receives the Playwright page object and performs all login steps.

  await page.goto(`${BASE_URL}/login`);

  // Meaning: Opens the application's login page.
// Mechanism: goto() navigates the browser to the specified URL.

  // Located by placeholder
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

  // Meaning: Enters the user's email into the email field.
// Mechanism: getByPlaceholder() finds the field using its placeholder text, then fill() enters the value.

  // Located by label
  await page.getByLabel('Password').fill(USER_PASSWORD);

  // Meaning: Enters the password into the password field.
// Mechanism: getByLabel() locates the input associated with the Password label, then fill() enters the password.

  // Located by id
  await page.locator('#login-btn').click();

  // Meaning: Clicks the Login button.
// Mechanism: locator() finds the element using its ID, and click() performs the click action.

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

  // Meaning: Verifies that login was successful.
// Mechanism: getByRole() finds the link and toBeVisible() checks that it is displayed.
}

// ── Test ────────────────────────────────────────────────────────────────────────

test('create event via UI, book it, and verify seat reduction', async ({ page }) => {

  // Meaning: Creates a test for event creation, booking, and seat verification.
// Mechanism: Playwright provides the page object, which is used to interact with the browser.

  // ── Step 1: Log in ───────────────────────────────────────────────────────

  await login(page);

  // Meaning: Logs into the application.
// Mechanism: Calls the reusable login() function created above.

  // ── Step 2: Create a new event via the admin form ────────────────────────

  await page.goto(`${BASE_URL}/admin/events`);

  // Meaning: Opens the admin event creation page.
// Mechanism: goto() navigates the browser to the admin events URL.

  // Unique title so we can find this exact card later
  const eventTitle = `Test Event ${Date.now()}`;

  // Meaning: Creates a unique event title.
// Mechanism: Date.now() adds the current timestamp, making every title different.

  // Located by id (explicit on the component)
  await page.locator('#event-title-input').fill(eventTitle);

  // Meaning: Enters the generated event title.
// Mechanism: locator() finds the input by ID and fill() enters the title.

  // Description — only textarea in the form
  await page.locator('#admin-event-form textarea').fill('Playwright test event');

  // Meaning: Enters the event description.
// Mechanism: CSS selector finds the textarea inside the admin form, then fill() enters the text.

  // Located by label (Select auto-generates id from label text)
  await page.getByLabel('City').fill('Test City');

  // Meaning: Enters the event city.
// Mechanism: getByLabel() finds the input associated with the City label.

  await page.getByLabel('Venue').fill('Test Venue');

  // Meaning: Enters the event venue.
// Mechanism: getByLabel() locates the Venue input and fill() enters the value.

  // datetime-local input — located by label
  await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

  // Meaning: Enters the event date and time.
// Mechanism: getByLabel() finds the datetime input and fill() sets its value.

  await page.getByLabel('Price ($)').fill('100');

  // Meaning: Sets the ticket price to 100.
// Mechanism: getByLabel() locates the price field and fill() enters 100.

  await page.getByLabel('Total Seats').fill('50');

  // Meaning: Sets the total number of seats to 50.
// Mechanism: getByLabel() finds the Total Seats input and fill() enters 50.

  // Located by id
  await page.locator('#add-event-btn').click();

  // Meaning: Submits the new event form.
// Mechanism: locator() finds the Add Event button by ID and click() presses it.

  // Wait for success toast
  await expect(page.getByText('Event created!')).toBeVisible();

  // Meaning: Verifies that the event was created successfully.
// Mechanism: getByText() finds the success message and toBeVisible() confirms it appears.

  console.log(`Created event: "${eventTitle}"`);

  // Meaning: Prints the created event title in the console.
// Mechanism: console.log() displays the value stored in eventTitle.

  // ── Step 3: Go to Events page and find the newly created card ─────────────

  await page.goto(`${BASE_URL}/events`);

  // Meaning: Opens the Events page.
// Mechanism: goto() navigates the browser to the events URL.

  // Located by data-testid
  const eventCards = page.getByTestId('event-card');

  // Meaning: Finds all event cards on the page.
// Mechanism: getByTestId() locates elements using the data-testid attribute.

  await expect(eventCards.first()).toBeVisible();

  // Meaning: Verifies that at least the first event card is visible.
// Mechanism: first() selects the first card and toBeVisible() checks its visibility.

  // Scan all visible event cards for the one matching our created title
  const targetCard = eventCards.filter({ hasText: eventTitle }).first();

  // Meaning: Finds the event card containing our unique event title.
// Mechanism: filter() keeps matching cards and first() selects the first matching card.

  await expect(targetCard).toBeVisible({ timeout: 5000 });

  // Meaning: Verifies that the required event card appears within 5 seconds.
// Mechanism: Playwright waits up to the specified timeout for the card to become visible.

  // Capture seat count before booking
  const seatsBeforeBooking =
    parseInt(await targetCard.getByText('seat').first().innerText());

  // Meaning: Gets the number of available seats before booking.
// Mechanism: innerText() reads the seat text and parseInt() converts it into a number.

  console.log(`Seats before booking: ${seatsBeforeBooking}`);

  // Meaning: Prints the available seat count before booking.
// Mechanism: console.log() displays the stored seat count.

  // Located by data-testid inside the matched card
  await targetCard.getByTestId('book-now-btn').click();

  // Meaning: Opens the booking form for the selected event.
// Mechanism: getByTestId() finds the Book Now button inside targetCard and click() presses it.

  // ── Step 4: Fill the booking form ────────────────────────────────────────

  // Quantity defaults to 1 — verify via id
  const ticketCount = page.locator('#ticket-count');

  // Meaning: Stores the locator for the ticket quantity element.
// Mechanism: locator() finds the element using its ID.

  await expect(ticketCount).toHaveText('1');

  // Meaning: Verifies that the default ticket quantity is 1.
// Mechanism: toHaveText() compares the element's displayed text with '1'.

  // Located by label
  await page.getByLabel('Full Name').fill('Test Student');

  // Meaning: Enters the customer's full name.
// Mechanism: getByLabel() finds the Full Name field and fill() enters the name.

  // Located by id
  await page.locator('#customer-email').fill('test.student@example.com');

  // Meaning: Enters the customer's email address.
// Mechanism: locator() finds the email field by ID and fill() enters the email.

  // Located by placeholder
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

  // Meaning: Enters the customer's phone number.
// Mechanism: getByPlaceholder() finds the phone field using its placeholder and fill() enters the number.

  // Located by CSS class
  await page.locator('.confirm-booking-btn').click();

  // Meaning: Submits the booking form.
// Mechanism: locator() finds the button using its CSS class and click() submits the booking.

  // ── Step 5: Verify booking confirmation ──────────────────────────────────

  // Located by CSS class
  const bookingRefEl = page.locator('.booking-ref').first();

  // Meaning: Finds the first booking reference element.
// Mechanism: locator() searches by CSS class and first() selects the first matching element.

  await expect(bookingRefEl).toBeVisible();

  // Meaning: Verifies that the booking reference is displayed.
// Mechanism: toBeVisible() checks whether the element is visible.

  const bookingRef = (await bookingRefEl.innerText()).trim();

  // Meaning: Gets the booking reference text without extra spaces.
// Mechanism: innerText() reads the text and trim() removes leading/trailing spaces.

  expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

  // Meaning: Verifies that the booking reference starts with the expected character.
// Mechanism: charAt(0) gets the first character and toBe() compares both values.

  console.log(`Booking confirmed. Ref: ${bookingRef}`);

  // Meaning: Prints the confirmed booking reference.
// Mechanism: console.log() displays the value stored in bookingRef.

  // ── Step 6: Verify booking appears in My Bookings ────────────────────────

  await page.getByRole('link', { name: 'View My Bookings' }).click();

  // Meaning: Opens the My Bookings page.
// Mechanism: getByRole() finds the link by role and name, then click() opens it.

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  // Meaning: Verifies that the browser is on the correct bookings URL.
// Mechanism: toHaveURL() compares the current page URL with the expected URL.

  // Located by id
  const bookingCards = page.locator('#booking-card');

  // Meaning: Finds all booking cards.
// Mechanism: locator() searches for elements having the booking-card ID.

  await expect(bookingCards.first()).toBeVisible();

  // Meaning: Verifies that a booking card is visible.
// Mechanism: first() selects the first card and toBeVisible() checks its visibility.

  // Find the card that contains our booking ref (via CSS class inside the card)
  const matchingCard = bookingCards.filter({
    has: page.locator('.booking-ref', { hasText: bookingRef })
  });

  // Meaning: Finds the booking card containing our booking reference.
// Mechanism: filter() keeps cards containing an element with the matching booking reference.

  await expect(matchingCard).toBeVisible();

  // Meaning: Verifies that the matching booking card is displayed.
// Mechanism: toBeVisible() checks the filtered card's visibility.

  // Verify event title also appears in the same card
  await expect(matchingCard).toContainText(eventTitle);

  // Meaning: Verifies that the event title is present in the same booking card.
// Mechanism: toContainText() checks whether the card contains the expected text.

  console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

  // Meaning: Prints confirmation that the booking card was found.
// Mechanism: console.log() displays the booking reference.

  // ── Step 7: Verify seat count reduced on Events page ─────────────────────

  await page.goto(`${BASE_URL}/events`);

  // Meaning: Returns to the Events page to check the updated seats.
// Mechanism: goto() navigates the browser to the Events page.

  await expect(eventCards.first()).toBeVisible();

  // Meaning: Verifies that event cards are visible again.
// Mechanism: first() selects the first card and toBeVisible() checks its visibility.

  // Find the same event by title
  const updatedCard = eventCards.filter({ hasText: eventTitle }).first();

  // Meaning: Finds the same event created earlier.
// Mechanism: filter() searches cards containing eventTitle and first() selects the match.

  await expect(updatedCard).toBeVisible();

  // Meaning: Verifies that the same event card is visible.
// Mechanism: toBeVisible() confirms that updatedCard is displayed.

  const seatsAfterBooking =
    parseInt(await updatedCard.getByText('seat').first().innerText());

  // Meaning: Gets the number of seats remaining after booking.
// Mechanism: innerText() reads the seat count and parseInt() converts it to a number.

  console.log(`Seats after booking: ${seatsAfterBooking}`);

  // Meaning: Prints the remaining seat count after booking.
// Mechanism: console.log() displays the value stored in seatsAfterBooking.

  // Booked 1 ticket — count must drop by exactly 1
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

  // Meaning: Verifies that exactly one seat was reduced.
// Mechanism: seatsAfterBooking must equal the original seats minus 1.

});