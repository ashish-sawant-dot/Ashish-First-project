// Note - Do not run this program under terminal.
// test is not present in this whole program hence can't run
//  This program exported from here.
// & Imported in WebAPI.spec.js file & run WebAPI.spec.js file

// ==================================================
// HEADING: Create APIUtils class
// WHY: To keep API-related methods in one place.
// MEANING: APIUtils is a class containing API methods.
// ==================================================

class APIUtils
{

    // HEADING: Constructor
    // WHY: To receive and store API context and login data.
    // MEANING: Constructor runs when an object of this class is created.
    constructor(apiContext, loginPayLoad)
    {

        // WHY: Store the received API context in the object.
        // MEANING: this.apiContext refers to the API request object.
        this.apiContext = apiContext

        // WHY: Store login details for authentication.
        // MEANING: this.loginPayLoad contains username and password.
        this.loginPayLoad = loginPayLoad

    }


    // ==================================================
    // HEADING: Get Authentication Token
    // WHY: To login through API and get a token.
    // MEANING: getToken() returns the login token.
    // ==================================================

    async getToken()
    {

        // HEADING: Send Login API Request
        // WHY: To login using the provided credentials.
        // MEANING: POST sends login data to the authentication API.
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        )


        // HEADING: Check Login Response
        // WHY: To verify that the login API was successful.
        // MEANING: ok() returns true for a successful HTTP response.
        // This line is commented, so it will not execute.
        // await expect(loginResponse.ok()).toBeTruthy()


        // HEADING: Convert Response to JSON
        // WHY: To read the response body as JavaScript data.
        // MEANING: loginResponseJsons contains the API response details.
        const loginResponseJsons = await loginResponse.json()


        // HEADING: Extract Token
        // WHY: To get the token from the login response.
        // MEANING: token contains the authentication token.
        const token = loginResponseJsons.token


        // HEADING: Print Token
        // WHY: To see the token in the terminal/report output.
        // MEANING: console.log() prints the token.
        console.log(token)


        // HEADING: Return Token
        // WHY: To send the token back to the calling method.
        // MEANING: return token gives the token to createOrder().
        return token

    }


    // ==================================================
    // HEADING: Create Order
    // WHY: To create an order through API.
    // MEANING: createOrder() sends order details and returns order information.
    // ==================================================

    async createOrder(orderPayLoad)
    {

        // HEADING: Create Response Object
        // WHY: To store token and order ID together.
        // MEANING: response is an empty object.
        let response = {}


        // HEADING: Get Token
        // WHY: To authenticate the order API request.
        // MEANING: Calls getToken() and stores the returned token.
        response.token = await this.getToken()


        // HEADING: Send Create Order API Request
        // WHY: To create an order using order data and token.
        // MEANING: POST sends the order payload to the order API.
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {

                // HEADING: Send Order Payload
                // WHY: To provide the order details to the API.
                // MEANING: orderPayLoad contains the order data.
                data: orderPayLoad,

                // HEADING: Send Request Headers
                // WHY: To provide authentication and content type.
                // MEANING: Headers give extra information about the request.
                headers: {

                    // WHY: To send the login token for authentication.
                    // MEANING: authorization contains the token.
                    authorization: response.token,

                    // WHY: To tell the API that data is in JSON format.
                    // MEANING: The request body is JSON.
                    "content-type": "application/json"

                }
            }
        )


        // HEADING: Convert Order Response to JSON
        // WHY: To read the order API response.
        // MEANING: orderResponseJson contains the order details.
        const orderResponseJson = await orderResponse.json()


        // HEADING: Print Order Response
        // WHY: To see the response returned by the API.
        // MEANING: Prints order details in the terminal/report output.
        console.log(orderResponseJson)


        // HEADING: Extract Order ID
        // WHY: To get the created order ID from the response.
        // MEANING: orders[0] gets the first order ID.
        const orderId = orderResponseJson.orders[0]


        // HEADING: Store Order ID
        // WHY: To save the order ID in the response object.
        // MEANING: response.orderId stores the order ID.
        response.orderId = orderId


        // HEADING: Return Response Object
        // WHY: To send token and order ID back to the test.
        // MEANING: Returns the response object containing token and orderId.
        return response

    }

}


// ==================================================
// HEADING: Export APIUtils Class
// WHY: To use this class in another JavaScript file.
// MEANING: Exports APIUtils so WebAPI.spec.js can import it.
// ==================================================

module.exports = { APIUtils }