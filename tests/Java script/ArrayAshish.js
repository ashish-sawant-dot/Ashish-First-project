let marks = [10,20,30,40,50,60,70]
console.log(marks[2]) // index start from zero
marks[3] =333
console.log(marks)
console.log(marks.length)  // lenght start from one
marks.push(99,100)
console.log(marks)
marks.pop(99)
console.log(marks)
marks.unshift(121)
console.log(marks)
console.log(marks.slice(1,3))
let result = marks.findIndex(function(marks)
{
    return marks > 20
})
console.log(result)
console.log(marks.includes(50))
console.log(marks.includes(200))

// To perform sum of Arrays
let num = [10,20,30,40,50,60,70]
let sum = marks.reduce((total, num) => total+ num, 0) 
console.log(sum)

// using the filter() method to find numbers that are multiples of 2
let multipleOfTwo = num.filter(function(num)
{
       return num  %2==0
})
console.log(multipleOfTwo)

let resul = num.map(function(num)
{
    return num*2
})
console.log(resul)

console.log("*****************")
//Ascending Order (Smallest to Largest)
//Subtract b from a (a - b):

let Fnum = [54, 10, 5, 100, 2]
Fnum.sort((a,b) => a-b)
console.log(Fnum)

console.log("*****************")
//Example 2: Numbers Descending
Fnum.sort((a,b) => b-a)
console.log(Fnum)

console.log("*****************")

//Example 3: Strings Ascending (A to Z)
let fruits1 = ['Orange', 'Apple', 'Banana', 'Mango']
fruits1.sort()    // never forgot to give method symbol i.e.()
console.log(fruits1)

console.log("*****************")

// Example 4: Strings Decending (Z to A)
fruits1.sort().reverse()     // // never forgot to give method symbol i.e.()
console.log(fruits1)

console.log("*****************")
const add = (a,b) => a+b
console.log(add(10,5))

console.log("*****************")

let sub = (a,b) => a-b
console.log(sub(25,12))

console.log("*****************")

const multiple = (a,b) => a*b
console.log(multiple(10,5))

console.log("****************")

let Divide = (a,b) => a/b
console.log(Divide(100,20))

console.log("****************")

function test() 
{
  var a = 10
  let b = 20
 console.log(test())
}
//console.log(test())
