const express = require('express');
const routes = express.Router();
const TweetController = require('./controllers/TweetControllers');
const LikeController = require('./controllers/LikesController');

routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);

routes.post('/likes/:id', LikeController.store);

module.exports = routes;