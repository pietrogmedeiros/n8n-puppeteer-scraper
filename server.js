const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
app.use(express.json());

let browser;

(async () => {
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    console.log('✅ Puppeteer started successfully');
  } catch (err) {
    console.error('❌ Failed to start puppeteer:', err);
    process.exit(1);
  }
})();

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: 'URL required' });
  
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const html = await page.content();
    await page.close();
    res.json({ success: true, html });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(3000, () => console.log('🚀 Server on port 3000'));
