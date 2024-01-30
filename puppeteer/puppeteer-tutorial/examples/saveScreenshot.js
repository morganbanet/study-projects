const puppeteer = require('puppeteer');

const getExampleScreenshot = async () => {
  // launch the web browser and open a new page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // enter a domain to visit and save a screenshot of the page
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  // close the browser once done
  await browser.close();
};
getExampleScreenshot();
