for (let z=0; z<=2; z++)  // here let inside the bracket
{
   console.log(z)
}
console.log("*****************")
let required = true
while (required)
{
    console.log(required)
    required =false
}
console.log("*********************")

for (i = 0; i<5; i++)
{
    if(i%2==0)
    console.log(i)
}
console.log("************")
let n=0
for(i=0; i<50; i++)
{
    if(i%2 ==0 && i%5==0) 
        { 
// it answer will only 10,20,30,40 ,50 but we given break after n==3 hence break 
// after 20 in o/p
//bcoz 0,10,20 is only one common number from zero to one which is multiple of 2 & 5
        n++
        console.log(i)
        if(n==3)
            break
    }
}

console.log("*************")