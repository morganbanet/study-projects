/*
get screenshots full and partial
get content from html
search on https://www.algonquincollege.com/future-students/programs/
click on "m"
find rows where td[2] === 'Arts and Design' or td[2] === 'Media and
Communications
save td[1] and td[5] with program title and length and href to program
page
create json file with fs.writeFile(filename, (err) => {});
*/

import { writeFile } from 'fs';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

const keyword = 'Mobile';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    args: ['--window-size=1100,700'],
  });

  const page = await browser.newPage();
  await page.goto('https://algonquincollege.com/');

  await page.screenshot({ path: './screens/algonquinhome.jpg' });

  const btn = await page.waitForSelector('button.programSearchButton');
  await page.type('input#programSearch', keyword, { delay: 100 });
  await Promise.all([
    btn.click(), // can do this instead of page.click(btn)
    page.waitForNavigation({ waitUntil: 'load' }),
  ]);

  await page.waitForSelector('table.programFilterList');
  await page.screenshot({ path: './screens/program-list.jpg', fullPage: true });

  const data = await page.$$eval('table.programFilterList tbody tr', (rows) => {
    return rows
      .map((row) => {
        if (row.classList.contains('odd') || row.classList.contains('even')) {
          const tds = row.querySelectorAll('td');

          return {
            name: tds[1].innerText,
            area: tds[2].innerText,
            campus: tds[3].innerText,
            length: tds[5].innerText,
          };
        } else {
          return null;
        }
      })
      .filter((row) => row); // only return if the row is not null
  });

  console.log({ data });

  await writeFile(
    './data/coursedetails.json',
    JSON.stringify(data),
    'utf-8',
    (err) => {
      if (err) throw err;
      console.log('saved the file');
    }
  );

  await browser.close();
})();
