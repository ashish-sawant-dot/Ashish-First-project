class Employee   // class
{
      static StringSS = "Ashish"    // class property
      constructor (age, FavColour)
      {
            this.age       = age        // Instance property
            this.FavColour = FavColour  // Instance property
      }
             greet()         // Instance method
             {
                return "Yellow" + this.FavColour
                
             }  // closed for class also
             // Here, greet() uses this.name (above instance property) of the current object.
             //  Instance method = Action performed using the instance's own data.

}

let Employee1 = new Employee(34, "+"+ "Green")    // Variable + Instance/Object

console.log(Employee.StringSS)    // Acess class property
console.log(Employee1.age)         // Acccss instance prpperty
console.log(Employee1.FavColour)    // Acccss instance prpperty
console.log(Employee1.greet())     // // Call instance method