// stock-scraper.js
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

async function getStock() {
  const res = await fetch("https://www.gamersberg.com/grow-a-garden/stock");
  const html = await res.text();
  const $ = cheerio.load(html);

  // Example selectors (you'll inspect the actual page to adjust!)
  const seeds = $('#seeds-stock').text().trim().split(',');
  const gear = $('#gear-stock').text().trim().split(',');
  const eggs = $('#egg-stock').text().trim().split(',');

  const data = { seeds, gear, eggs, timestamp: Date.now() };
  fs.writeFileSync('stock.json', JSON.stringify(data));
}

setInterval(getStock, 10000);
getStock();
