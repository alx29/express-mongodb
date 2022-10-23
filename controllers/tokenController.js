const asyncHandler = require('express-async-handler');
const Token = require('../models/tokenModel');

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
  });

  res.status(200).json(token);
});

const deleteToken = asyncHandler(async (req, res) => {
  const token = await Token.findById(req.params.id);

  if (!token) {
    res.status(404);
    throw new Error('Token not found');
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