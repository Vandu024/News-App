const express = require('express');
const newsRouter = express.Router();
const axios = require('axios');




newsRouter.get('/', async (req, res) => {

    try {

        // var url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=096e9cfd92e04e7eb8b8ce7eb5957915';
        var url = `https://newsapi.org/v2/everything?q=India&apiKey=${process.env.API_KEY}`;

        const news_get = await axios.get(url);
        res.render('news', { articles: news_get.data.articles });

    }
    catch (error) {
        console.error('Error', error.message);
        res.render('news', { articles: [] });

    }

})



newsRouter.get('/:url', async (req, res) => {
    let articleUrl = decodeURIComponent(req.params.url);
    try {
        const url = `https://newsapi.org/v2/everything?q=India&apiKey=${process.env.API_KEY}`;
    


        const news_get = await axios.get(url);


        const article = news_get.data.articles.find(article => article.url === articleUrl);
        res.render('newsSingle', { article: article || null });
    }
    catch (error) {
        console.error('Error', error.message);
        res.render('newsSingle', { article: [] });
    }

})



newsRouter.post('/', async (req, res) => {
    let searchQuery = req.body.search;

    try {
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${process.env.API_KEY}`;
        const news_response = await axios.get(url);

        res.render('newsSearch', { articles: news_response.data.articles });
    }
    catch (error) {
        console.error('Error', error.message);
        res.render('newsSearch', { articles: null })
    }
})




module.exports = newsRouter;


