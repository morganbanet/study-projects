const puppeteer = require('puppeteer');

const windowSize = { width: 1152, height: 720 };

const printBlogPost = async () => {
  // launch browser and open new blank page
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${windowSize.width},${windowSize.height}`],
  });
  const page = await browser.newPage();

  // navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // set screen size
  await page.setViewport({
    width: windowSize.width,
    height: windowSize.height,
  });

  // type into the searchbox
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
};

printBlogPost();
