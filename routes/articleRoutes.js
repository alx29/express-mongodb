const express = require('express');
const router = express.Router();
const { getArticles, setArticle, deleteArticle, updateArticle } = require('../controllers/articleController');

router.route('/').get(getArticles).post(setArticle);

router.route('/:id').put(updateArticle).delete(deleteArticle);

module.exports = router;