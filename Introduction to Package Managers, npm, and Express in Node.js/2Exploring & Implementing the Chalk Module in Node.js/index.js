const chalk = require('chalk');

console.log(chalk.blue('Hello, World!'));
console.log(chalk.yellow('Learning Chalk is fun!'));

console.log(chalk.bgYellow.black('Warning! Proceed with caution.'));
console.log(chalk.bgRed.white('Error! Something went wrong.'));

console.log(chalk.green('Success: ') + chalk.white('Operation completed!'));
console.log(chalk.cyan('Loading... ') + chalk.magenta('Please wait'));

const errorTheme = chalk.bold.red;
const warningTheme = chalk.bold.hex('#FFA500');
const successTheme = chalk.bold.green;

console.log(errorTheme('Error: Unable to connect to the server!'));
console.log(warningTheme('Warning: Low disk space!'));
console.log(successTheme('Success: Data saved successfully!'));
