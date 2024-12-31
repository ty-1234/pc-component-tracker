const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/pcparts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB schema for PC parts
const partSchema = new mongoose.Schema({
  name: String,
  price: String,
  url: String,
  image: String,
});

const Part = mongoose.model('Part', partSchema);

const app = express();
const PORT = 5000;

// Enable Cross-Origin Requests
app.use(cors());
app.use(express.json());

// Scrape Route
app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const content = await page.content();
  const $ = cheerio.load(content);

  const parts = [];

  // Scraping logic based on the website's structure
  if (url.includes('amazon')) {
    $('.s-main-slot .s-result-item').each((index, element) => {
      const name = $(element).find('h2 span').text().trim();
      const price = $(element).find('.a-price-whole').text().trim() || $(element).find('.a-price').text().trim();
      const link = 'https://www.amazon.com' + $(element).find('h2 a').attr('href');
      const image = $(element).find('.s-image').attr('src');

      if (name && price) {
        parts.push({ name, price, url: link, image });
      }
    });
  } else if (url.includes('newegg')) {
    $('.item-cell').each((index, element) => {
      const name = $(element).find('.item-title').text().trim();
      const price = $(element).find('.price-current').text().trim();
      const link = $(element).find('.item-title').attr('href');
      const image = $(element).find('.item-img img').attr('src');

      if (name && price) {
        parts.push({ name, price, url: link, image });
      }
    });
  } else if (url.includes('ebay')) {
    $('.s-item').each((index, element) => {
      const name = $(element).find('.s-item__title').text().trim();
      const price = $(element).find('.s-item__price').text().trim();
      const link = $(element).find('.s-item__link').attr('href');
      const image = $(element).find('.s-item__image-img').attr('src');

      if (name && price) {
        parts.push({ name, price, url: link, image });
      }
    });
  }

  // Save data to MongoDB
  try {
    await Part.insertMany(parts);
    res.status(200).json({ message: 'Scraped and saved data successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save data', error: err });
  }

  await browser.close();
});

// Get all scraped parts from MongoDB
app.get('/parts', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve parts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.delete('/clear-parts', async (req, res) => {
  try {
    await Part.deleteMany(); // Deletes all records in the "parts" collection
    res.status(200).json({ message: 'All parts cleared successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear parts', error: err });
  }
});