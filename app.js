require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/js', express.static(__dirname + 'public/js'));

//template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const newsRouter = require('./src/routes/news');

app.use('/', newsRouter);
app.use('/article', newsRouter);


// Listen on port 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
