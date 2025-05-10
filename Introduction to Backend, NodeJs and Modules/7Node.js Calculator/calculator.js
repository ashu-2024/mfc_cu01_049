const crypto = require('crypto');

const operation = process.argv[2];
const num1 = parseFloat(process.argv[3]);
const num2 = parseFloat(process.argv[4]);

function generateRandomNumber(length) {
  if (!length) {
    console.log("Provide length for random number generation.");
    return;
  }
  const randomBytes = crypto.randomBytes(length);
  const randomString = randomBytes.toString('binary');
  console.log(`Generated Random Number: ${randomString}`);
}

switch (operation) {
  case 'add':
    if (!isNaN(num1) && !isNaN(num2)) {
      console.log(`Result: ${num1 + num2}`);
    } else {
      console.log("Invalid numbers for addition");
    }
    break;

  case 'sub':
    if (!isNaN(num1) && !isNaN(num2)) {
      console.log(`Result: ${num1 - num2}`);
    } else {
      console.log("Invalid numbers for subtraction");
    }
    break;

  case 'mult':
    if (!isNaN(num1) && !isNaN(num2)) {
      console.log(`Result: ${num1 * num2}`);
    } else {
      console.log("Invalid numbers for multiplication");
    }
    break;

  case 'divide':
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
      console.log(`Result: ${num1 / num2}`);
    } else {
      console.log("Invalid numbers for division or division by zero");
    }
    break;

  case 'sin':
    if (!isNaN(num1)) {
      console.log(`Result: ${Math.sin(num1)}`);
    } else {
      console.log("Invalid number for sine calculation");
    }
    break;

  case 'cos':
    if (!isNaN(num1)) {
      console.log(`Result: ${Math.cos(num1)}`);
    } else {
      console.log("Invalid number for cosine calculation");
    }
    break;

  case 'tan':
    if (!isNaN(num1)) {
      console.log(`Result: ${Math.tan(num1)}`);
    } else {
      console.log("Invalid number for tangent calculation");
    }
    break;

  case 'random':
    generateRandomNumber(num1);
    break;

  default:
    console.log("Invalid operation");
    break;
}
