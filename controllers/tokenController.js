const asyncHandler = require('express-async-handler');
const Token = require('../models/tokenModel');
const Article = require('../models/articleModel');

const getTokens = asyncHandler(async (req, res) => {
  const tokens = await Token.find();

  res.status(200).json(tokens);
});

const setToken = asyncHandler(async (req, res) => {
  if (!req.body.Token_body) {
    res.status(400);

    throw new Error('Please add a token body field');
  }

  const token = await Token.create({
    Token_body: req.body.Token_body,
    Articles: req.body.Articles,
  });

  if (token.Articles !== undefined) {
    const articles = await Article.find();
    for (article_id of token.Articles) {
      for (article of articles) {
        if (article.id === article_id) {
          article.Tokens.push(token.id);
          await Article.findByIdAndUpdate(article_id, article);
        }
      }
    }
  } 

  res.status(200).json(token);
});

const deleteToken = asyncHandler(async (req, res) => {
  const token = await Token.findById(req.params.id);

  if (!token) {
    res.status(404);
    throw new Error('Token not found');
  }

  if (token.Articles !== undefined) {
    const articles = await Article.find();

    for (article_id of token.Articles) {
      for (article of articles) {
        article.Tokens = article.Tokens.filter(token_id => token_id !== token.id);
        await Article.findByIdAndUpdate(article.id, article);
      }
    }
  }

  const deletedToken = await Token.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: `DELETE TOKEN ${req.params.id}` });
});

const updateToken = asyncHandler(async (req, res) => {
  const token = await Token.findById(req.params.id);

  if (!token) {
    res.status(404);
    throw new Error('Token not found!');
  }

  const updatedToken = await Token.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedToken);
});

module.exports = { getTokens, setToken, deleteToken, updateToken };