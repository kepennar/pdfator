const puppeteer = require('puppeteer');

module.exports = {
  async convert({ url, outputFile, format }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const config = {
      path: outputFile,
      format: 'A4',
      fullPage: true,
      printBackground: true
    };
    if (format === 'pdf') {
      await page.pdf(config);
    } else if (format === 'png') {
      await page.screenshot(config);
    }

    await browser.close();
  }
};
