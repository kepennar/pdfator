const puppeteer = require('puppeteer');
const path = require('path');

module.exports = {
  async convert({ url, outputFile, format }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulateMedia('screen');
    await page.goto(url, { waitUntil: 'networkidle2' });

    const config = {
      path: outputFile,
      format,
      printBackground: true
    };
    const desiredOutput = path.extname(outputFile);
    if (desiredOutput === '.pdf') {
      await page.pdf({
        ...config,
        scale: 0.78,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      });
    } else if (desiredOutput === '.png') {
      await page.screenshot({ ...config, fullPage: true });
    }

    await browser.close();
  }
};
