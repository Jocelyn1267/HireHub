const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/html-report/test-report.html`, {waitUntil: 'networkidle0'});
  await page.pdf({
    path: 'test-report.pdf',
    format: 'A4'
  });

  await browser.close();
})();
