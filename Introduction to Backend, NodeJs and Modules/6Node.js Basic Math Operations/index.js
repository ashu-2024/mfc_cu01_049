// index.js
const sum = require("./sum");
const multiply = require("./multiplication");
const subtract = require("./subtraction");
const divide = require("./division");

let sumA = 3;
let sumB = 5;
let sumResult = sum(sumA, sumB);
console.log(`Sum of ${sumA} and ${sumB}: ${sumResult}`);

let mulA = 4;
let mulB = 6;
let mulResult = multiply(mulA, mulB);
console.log(`Multiplication of ${mulA} and ${mulB}: ${mulResult}`);

let subA = 10;
let subB = 4;
let subResult = subtract(subA, subB);
console.log(`Subtraction of ${subA} and ${subB}: ${subResult}`);

let divA = 10;
let divB = 2;
let divResult = divide(divA, divB);
console.log(`Division of ${divA} and ${divB}: ${divResult}`);

divB = 0; // testing division by zero
let divZeroResult = divide(divA, divB);
console.log(`Division of ${divA} by ${divB}: ${divZeroResult}`);
