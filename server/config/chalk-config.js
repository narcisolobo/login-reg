import chalk from 'chalk';

function error(message) {
  console.log(chalk.bold.red(message));
}

function success(message) {
  console.log(chalk.bold.magentaBright(message));
}

function primary(message) {
  console.log(chalk.bold.blueBright(message));
}

export { error, success, primary };
