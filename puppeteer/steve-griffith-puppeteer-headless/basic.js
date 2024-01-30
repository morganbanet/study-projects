// puppeteer and headless chrome (or firefox)
// npm init -y
// add "type":"module" to package.json
// npm install puppeteer@19.11.1

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
})();
