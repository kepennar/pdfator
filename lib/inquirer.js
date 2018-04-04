const inquirer = require('inquirer');

module.exports = {
  askUrlToConvert: () => {
    const questions = [
      {
        name: 'url',
        type: 'input',
        message: 'Enter the website url you want to convert.',
        default: 'https://google.fr',
        validate: value => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter the website url you want to convert.';
          }
        }
      },
      {
        name: 'outputFile',
        type: 'input',
        message: 'Enter the output filename.',
        default: 'out.pdf',
        validate: value => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter  the output filename.';
          }
        }
      },
      {
        name: 'format',
        type: 'list',
        message: 'Enter the wanted output format.',
        choices: ['pdf', 'png'],
        default: 'pdf',
        validate: value => {
          if (value.length) {
            return true;
          } else {
            return 'Please the wanted output format.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
