#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const { Spinner } = require("clui");
const { convert, getBrowser } = require("@pdfator/core");

const { askConversionConfig } = require("./inquirer");

clear();
console.log(
  chalk.yellow(figlet.textSync("PdfAtor", { horizontalLayout: "full" }))
);

const run = async () => {
  try {
    const config = await askConversionConfig();
    const loader = new Spinner(`Converting "${config.url}" please wait...`);
    loader.start();
    const browser = await getBrowser();
    await convert(browser, { ...config, flushToDisk: true });
    loader.stop();
  } catch (error) {
    clear();
    console.log(
      chalk.red(figlet.textSync("ERROR", { horizontalLayout: "full" }))
    );
  }
};

run();
