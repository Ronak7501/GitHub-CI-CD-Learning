

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;





const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL);
    const articles = response.data.articles;

    // Restructure the articles
    const customArticles = articles.map((article) => ({
      headline: article.title,
      summary: article.description,
      image: article.urlToImage,
      source: article.source.name,
      link: article.url,
      publishedAt: article.publishedAt,
    }));

    res.json({ status: 'success', articles: customArticles });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
