let student =       // Here student is an object
{
  name: "Ashish",  // here name & ashish r properties.name is key & Ashish is value.
  age: 34,         // same as above
  city: "Kolapur",
  marks: 100
}

console.log(student.name)
console.log(student.age)
console.log(student.city)
console.log(student.marks)
console.log(student)
student.Gender = "male"
console.log(student)
student.Present ="Yes"
console.log(student)
delete student.marks  // imp step - space after delete & object. Not a dot. 
console.log(student)
delete student.city
student.FavColor = "yellow"   // Added new property
console.log(student)
student.age =35
console.log(student)
console.log("*******************")
console.log("name" in student)
console.log("*******************")
console.log(Object.keys(student))
console.log("*******************")
console.log(Object.values(student))
console.log("*******************")
console.log(Object.entries(student))
console.log("*******************")
console.log(student.hasOwnProperty("name"))
console.log(student.hasOwnProperty("job"))
console.log("*******************")
for (let key in student)
{
    console.log(key)
}
console.log("***************")

let school = 
{
  name: "Rahul",
  greet: function() 
{
    return "Ashish is ex-student of school"
  }
}
console.log(school.greet())
