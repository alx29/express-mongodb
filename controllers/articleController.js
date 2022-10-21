const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');

const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find();
  
  if (!req.body.Article_no) {
    res.status(200).json(articles);
    return;
  }
  
  let searchedArticle = undefined;

  for (article of articles) {
    if (article.Article_no === req.body.Article_no) {
      searchedArticle = article;
      break;
    }
  }

  if (!searchedArticle) {
    res.status(404);

    throw new Error('Article not found.');
  }

  res.status(200).json(searchedArticle);
});

const setArticle = asyncHandler(async (req, res) => {
  if (!req.body.Article_no) {
    res.status(400);

    throw new Error('Please add a text field');
  }

  const article = await Article.create({
    Article_no: req.body.Article_no,
    Article_short_description: req.body.Article_short_description,
    Article_date: req.body.Article_date,
    Collection_date: req.body.Collection_date,
    Article_body: req.body.Article_body,
    Article_source: req.body.Article_source,
    Article_URL: req.body.Article_URL,
    Location: req.body.Location,
    Article_keywords: req.body.Article_keywords,
    Article_weight: req.body.Article_weight,
    Article_citations: req.body.Article_citations,
  });

  res.status(200).json(article);
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error('Article not found');
  }

  const deletedArticle = await Article.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `DELETE ARTICLE ${req.params.id}` });
});

const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    res.status(404);
    throw new Error('Article not found!');
  }

  const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedArticle);
});

module.exports = { getArticles, setArticle, deleteArticle, updateArticle };