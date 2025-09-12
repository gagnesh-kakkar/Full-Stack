// function display(name, callback){//first property of callback function
//     console.log(name)
//     console.log(name)
//     console.log(name)

//     callback()//
// }
// function add(){
//     console.log(5+1)
// }

// display("Gagnesh", add)

//Promises 
//syntax
// new Promise((resolve,reject)=>{
//     if(OperationSuccessful){
//         resolve
//     }else {
//         reject
//     }
// })

//Promises resolve Example
let promise = new Promise((resolve) => 
    setTimeout(() => resolve("foo"), 300))
    .then(r => (console.log("A:",r), r + " -> A"))
    .then(r => (console.log("B:",r), r + " -> B"))
    .then(r => (console.log("C:",r)))
    .catch(e => (console.error("Error:", e)))
    .finally(() => console.log("Promise 1 excecuted!\n")
);

//Promises resolve Example
let promise2 = new Promise((resolve, reject) => 
    setTimeout(() => reject("rej"), 300))
    .then(r => (console.log("A:",r), r + " -> A"))
    .then(r => (console.log("B:",r), r + " -> B"))
    .then(r => (console.log("C:",r)))
    .catch(e => (console.error("Error:", e)))
    .finally(() => console.log("Promise 2 excecuted!\n")
);
