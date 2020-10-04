const { prompt } = require("inquirer");

function askConversionConfig() {
  const questions = [
    {
      name: "url",
      type: "input",
      message: "Enter the website url you want to convert.",
      default: "https://www.google.fr/",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter the website url you want to convert.";
        }
      },
    },
    {
      name: "outputFile",
      type: "input",
      message: "Enter the output filename",
      default: "out",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter the output filename";
        }
      },
    },
    {
      name: "extension",
      type: "list",
      message: "Choose the desired file format",
      choices: ["PDF", "PNG"],
      default: "PDF",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please the desired file format.";
        }
      },
    },
    {
      name: "size",
      type: "list",
      message: "Enter the wanted output size.",
      choices: ["A4", "A3", "letter"],
      default: "A4",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please the wanted output size.";
        }
      },
    },
    {
      name: "mobileViewport",
      type: "confirm",
      message: "Simulate a mobile viewport ?",
    },
  ];
  return prompt(questions);
}

module.exports = { askConversionConfig };
