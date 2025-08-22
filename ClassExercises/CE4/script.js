console.log('Hello');
//Anonymous function
let func = function() {
    console.log("Gagnesh");
}
func();
//Arrow function
let arrowFunc = () => console.log("Kakkar");
arrowFunc();

//Function are first class citizens as:
//1. we can store a function in a variable
//2. we can call a function from another function
//3. we can passs a function as a parameter in a function

function sum(num1,num2) {
    return num1+num2;
}

let add = sum();//storing function in a variable

function average(num1,num2,add) {//passing funtion in a function
    return sum(num1,num2)/2;//calling another function from this function
}

console.log(average(10,20,add));