/*
do a search on unsplash.com
read search term from cli and create folder
get copies of the images from the search results
save them locally in a folder named after search terms
get a screenshot saved in screens folder filename search term .png
*/

import { writeFile } from 'fs';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : 'mountains';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    args: ['--window-size=1100,700'],
  });

  const page = await browser.newPage();

  // everytime there is a response (anytime something is loaded on the
  // page for example images, scripts, fonts, css, etc) then run this.
  // can think of it like a subscribe method. it is also similar to
  // service workers.

  // we watch all the incoming network requests and check
  // the headers of each one to see if it includes a content-type
  // of image/avif
  page.on('response', async (resp) => {
    const headers = resp.headers();
    const url = new URL(resp.url()); // turn the url into an object

    // check for the headers and filter out images unrelated to our
    // search (profile avatars, banner logos, etc). also check the
    // minimum size
    if (
      headers['content-type']?.includes('image/avif') &&
      url.href.startsWith('https://images.unsplash.com/photo-') &&
      headers['content-length'] > 30000 // if image is bigger than 30k
    ) {
      console.log(url.pathname);

      // node asyncronous call that will return the binary data
      await resp.buffer().then(async (buffer) => {
        await writeFile(`./images${url.pathname}.avif`, buffer, (err) => {
          if (err) throw err;
        });
      });

      // javascript asyncronous call that will return the binary data
      // resp.blob()
    }
  });

  await page.goto('https://www.unsplash.com/');
  await page.screenshot({ path: './screens/unsplashhome.jpg' });

  const inputSelector = 'input[data-test="nav-bar-search-form-input"]';
  const btnSelector = 'button[data-test="nav-bar-search-form-button"]';

  const btn = await page.waitForSelector(btnSelector);
  await page.type(inputSelector, searchTermCLI);
  await Promise.all([btn.click(), page.waitForNavigation()]);

  await page.waitForNetworkIdle();

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await page.waitForNetworkIdle();

  await page.screenshot({
    path: './screens/unsplash-search.jpg',
    fullPage: true,
  });

  await browser.close();
})();
