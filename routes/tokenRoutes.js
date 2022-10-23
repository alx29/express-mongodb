const express = require('express');
const router = express.Router();
const {
  getTokens,
  setToken,
  deleteToken,
  updateToken,
} = require('../controllers/tokenController');

router.route('/').get(getTokens).post(setToken);

router.route('/:id').put(updateToken).delete(deleteToken);

module.exports = router;
