const { extname } = require('path');
const { IConverterConfig } = require('@pdfator/core');
const { prompt } = require('inquirer');

function askConvertionConfig() {
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
      message: 'Enter the output filename. Valid extension .pdf or .png',
      default: 'out.pdf',
      validate: value => {
        if (value.length && ['.pdf', '.png'].includes(extname(value))) {
          return true;
        } else {
          return 'Please enter  the output filename. Valid extension .pdf or .png';
        }
      }
    },
    {
      name: 'format',
      type: 'list',
      message: 'Enter the wanted output format.',
      choices: ['A4', 'A3', 'letter'],
      default: 'A4',
      validate: value => {
        if (value.length) {
          return true;
        } else {
          return 'Please the wanted output format.';
        }
      }
    }
  ];
  return prompt(questions);
}

module.exports = { askConvertionConfig };
