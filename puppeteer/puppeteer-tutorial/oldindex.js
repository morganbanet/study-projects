const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,

		// specify size of browser window
		args: [`--window-size=1152,720`],

		// make viewport take up full browser width
		defaultViewport: false,

		// where to store cookies, local storage, etc, for a session
		// useful when dealing with recaptures
		userDataDir: './tmp',
	});

	const pages = await browser.pages();
	const page = pages[0];

	// go to the amazon devices category on amazon
	await page.goto(
		'https://www.amazon.co.uk/s?k=Amazon+Devices&i=electronics&rh=n%3A560798%2Cp_89%3AAmazon&dc&_encoding=UTF8&rnid=389035011&ref=gw_comb_qc_commuting_mso_uk_seemore',
	);

	// select container around all products
	const productHandles = await page.$$(
		'div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item',
	);

	// loop through each element inside the container and get inner text
	for (const productHandle of productHandles) {
		const title = await page.evaluate(
			(el) => el.querySelector('div > h2 > a > span').textContent,
			productHandle,
		);

		console.log(title);
	}

	// await browser.close();
})();
