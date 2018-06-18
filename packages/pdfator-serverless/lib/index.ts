const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const { Spinner } = require('clui');

const inquirer = require('./inquirer');
const { convert } = require('./converter');

clear();
console.log(
  chalk.yellow(figlet.textSync('PdfAtor', { horizontalLayout: 'full' }))
);

const run = async () => {
  const config = await inquirer.askConvertionConfig();
  const loader = new Spinner(`Converting "${config.url}" please wait...`);
  loader.start();
  await convert(config);
  loader.stop();
};

run();
