/*
test interactions with a form and ui elements
https://youtube.com/
get a screenshot and a blurred screenshot
complete and submit the search form with value from cli or env
'#search-input #search' and '#search-icon-legacy'
screenshot of search results
output text from firstMatch 'ytd-video-renderer h3 a~video-title'
click on a firstMatch, navigate
click on dismiss button for login '#dismiss-button'
wait for and check number of comments `ytd-comments-header-renderer h2`
screenshot of video playing
get text for first suggested 'ytd-compact-video-render'
output comment count and first suggested video title
*/

import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
const log = console.log;

const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : 'Volbeat';
const searchTermENV = process.env.SEARCHTXT ?? 'Volbeat';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    args: [`--window-size=1100,700`],
  });

  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');

  const buttonSelector =
    'ytd-button-renderer.ytd-consent-bump-v2-lightbox:nth-child(2) > yt-button-shape:nth-child(1) > button:nth-child(1)';
  await page.waitForSelector(buttonSelector);
  await page.click(buttonSelector);
  await page.waitForNavigation();

  // use delay for each character to visually see it be typed
  const searchSelector = '#search-input #search';
  await page.waitForSelector(searchSelector);
  await page.type(searchSelector, searchTermCLI, { delay: 100 });

  await page.emulateVisionDeficiency('blurredVision');
  await page.screenshot({ path: './screens/youtube-homeblurred.jpg' });
  await page.emulateVisionDeficiency('none');
  await page.screenshot({ path: './screens/youtube-home.jpg' });

  // promise all waits for all tasks in the array to be completed before
  // reporting back to await
  await Promise.all([
    page.click('#search-icon-legacy'),
    page.waitForNavigation(), // waits for page to navigate to new url
  ]);

  // wait till next page
  await page.waitForSelector('ytd-video-renderer h3 a#video-title');
  await page.screenshot({ path: './screens/search-result.jpg' });

  // page.$eval runs querySelector and returns the first result to the
  // function argument (elem)
  const firstMatch = await page.$eval(
    'ytd-video-renderer h3 a#video-title',
    (elem) => {
      // runs when that a#video-title is found
      return elem.innerText;
    }
  );
  console.log({ firstMatch });

  await Promise.all([
    page.click('ytd-video-renderer h3 a#video-title'),
    page.waitForNavigation(), // waitForNetWorkIdle()

    // waitForTimeout is deprecated. We can create our own promise and
    // wrap it around a setTimeout of our own instead (39:45:00 in video).
    // we can use this to wait a while for a page to load.
    // we tell the promise its resolved after 17 seconds here. it will
    // do this before proceeding with our code.
    new Promise((resolve) => setTimeout(resolve, 15000)),
  ]);
  await page.screenshot({ path: './screens/first-video.jpg' });

  // scroll down page and force comments to load
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });

  const commentCountSelector = 'ytd-comments-header-renderer h2';
  await page.waitForSelector(commentCountSelector);
  const videoComments = await page.$eval(commentCountSelector, (h2) => {
    return h2.innerText;
  });
  console.log({ videoComments });

  const firstSuggestedSelector = 'ytd-compact-video-renderer';
  const firstSuggested = await page.$eval(firstSuggestedSelector, (elem) => {
    return elem.querySelector('h3').innerText;
  });
  console.log({ firstSuggested });

  await browser.close();
})();
