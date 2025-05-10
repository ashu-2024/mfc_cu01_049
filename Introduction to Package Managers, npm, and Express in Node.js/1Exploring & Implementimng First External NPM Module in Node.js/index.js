const boxen = require('boxen');

const message = "I am using my first external module!";
const title = "Hurray!!!";

// Classic Box Style (default)
const classicBox = boxen(message, { 
    title: title, 
    padding: 1,
    borderStyle: 'classic',
    titleAlignment: 'center',
    backgroundColor: 'green', 
});


const singleDoubleBox = boxen(message, { 
    title: title, 
    padding: 1,
    borderStyle: 'singleDouble',
    titleAlignment: 'center',
    backgroundColor: 'cyan',
});


const roundBox = boxen(message, { 
    title: title, 
    padding: 1,
    borderStyle: 'round',
    titleAlignment: 'center',
    backgroundColor: 'blue',
});

console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
