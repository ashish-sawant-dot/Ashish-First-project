const {test, expect} = require('@playwright/test');
const console = require('node:console');

 //test('First playwright test' , async function()

 test('First playwright test' , async ({browser})=> 
    // Need a curly bracets to browser in playwright
{
    // chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());

    });

    test('Browser contaxt playwright test' , async ({browser})=>
    {
       const context = await browser.newContext();
       const page = await context.newPage();
       await page.goto("https://rahulshettyacademy.com/loginpagePractise")
       console.log(await page.title());
       //CSS
       await page.locator('#username').fill("rahulshetty");
       await page.locator('#password').fill("learning");
       await page.locator('#signInBtn').click();
       // Below line is to get error message -  incorrect username or password
      // const ErrorMsg = await page.locator(".alert-danger").first().textContent();
       //console.log(ErrorMsg);
       console.log(await page.locator("[style*='block']").textContent());
       //await expect(page.locator("[style*='block']").toHaveText("Incorrect username/password.");
       await expect(page.locator("[style*='block']")).toContainText('Incorrect');
      
    });

    test.only('lecture 17', async ({browser})=>
    {
       const context = await browser.newContext();
       const page = await context.newPage();

       const userName = page.locator('#username');
       const signIn = page.locator('#signInBtn')
       const cardName = page.locator(".card-title a");

       await page.goto("https://rahulshettyacademy.com/loginpagePractise")
       console.log(await page.title());
       //CSS
       await page.locator('#username').fill("rahulshetty");
       await page.locator('#password').fill("Learning@830$3mK2");
       await signIn.click();
       console.log(await page.locator("[style*='block']").textContent());
       await expect(page.locator("[style*='block']")).toContainText('Incorrect');
       //await userName.fill("");
       await userName.fill("rahulshettyacademy")
       await page.waitForTimeout(3000)
       await signIn.click();
       await page.waitForTimeout(7000)

       console.log((cardName).first().textContent());
       console.log((cardName).nth(1).textContent());

       const AllcardName = await cardName.allTextContents()
       console.log(AllcardName)

       //await page.waitForTimeout(4000)
       //await page.close()
    });












