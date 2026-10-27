const { log } = require("node:console")

const pageTitle = "Dashboard - Playwright"
console.log(pageTitle)

console.log("*****************")

let text = "Ashish"
console.log(text.length)

console.log("****************")

let rawText = " Ashish Sawant "
let cleanText = rawText.trim()
console.log(cleanText)

console.log("***************")

let successSms = "Ashish is a man"
console.log(successSms.includes("man"))
console.log(successSms.includes("Women"))

console.log("****************")

let name = "Ashish iD:12345"
let splitedName = name.split(":")
console.log(splitedName[1])

console.log("****************")

// replace method
let name1 = "Ashish@5555"
let cleanname1 = name1.replace("@", "")
console.log(cleanname1)

console.log("****************")

let name2 = "ASHISH"
console.log(name2.toLocaleLowerCase())

console.log("****************")

let URL = "https://mail.google.com"
console,log(URL.slice(0,5))

console.log("****************")

const code = 555
let stringCode = code.toString()
console.log(typeof stringCode)

const DISCOUNT = 100
let PriceString = "300"
let ActualPrice = parseInt(PriceString)
console.log(ActualPrice-DISCOUNT) // (300-100 =200)

console.log("****************")

// replaceAll method
let firstPrice = "$1,250,000"
let cleanPrice = firstPrice.replaceAll("$", "").replaceAll(",", "")
console.log(cleanPrice)

console.log("****************")

let firstPrice1 = "$2,50,25,00,0"
let cleanPrice1 = firstPrice1.replaceAll("$", "").replaceAll(",", ",", "")
console.log(cleanPrice1)

console.log("****************")

// charAt method
let priceTag = "$500"
let findChar = priceTag.charAt(0)
let findcharAt1 = priceTag.charAt(1)
console.log(findChar)
console.log(findcharAt1)

console.log("****************")

// concat method
let firstName = "Ashish"
let lastName = "Sawant"
let fullName = firstName.concat(" ", lastName)
console.log(fullName)

// Repeat method
let textNew = "Test "
let repeatedText = textNew.repeat(3)
console.log(repeatedText)



