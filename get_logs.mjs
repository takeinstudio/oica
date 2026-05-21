import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER_ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('BROWSER_PAGE_ERROR:', err.message);
  });

  try {
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    console.log('Page loaded successfully.');
  } catch (error) {
    console.error('Failed to load page:', error);
  }

  await browser.close();
})();
