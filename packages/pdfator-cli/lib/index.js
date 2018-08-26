#!/usr/bin/env node

const clear = require ('clear');
const chalk = require ('chalk');
const figlet = require ('figlet');
const {Spinner} = require ('clui');
const {convert} = require ('@pdfator/core');

const {askConvertionConfig} = require ('./inquirer');

clear ();
console.log (
  chalk.yellow (figlet.textSync ('PdfAtor', {horizontalLayout: 'full'}))
);

const run = async () => {
  try {
    const config = await askConvertionConfig ();
    const loader = new Spinner (`Converting "${config.url}" please wait...`);
    loader.start ();
    await convert ({...config, flushToDisk: true});
    loader.stop ();
  } catch (error) {
    clear ();
    console.log (
      chalk.red (figlet.textSync ('ERROR', {horizontalLayout: 'full'}))
    );
  }
};

run ();
