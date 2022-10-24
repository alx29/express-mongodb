const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
  {
    Article_no: {
      type: String,
    },
    Article_short_description: {
      type: String,
    },
    Article_date: {
      type: Date,
    },
    Collection_date: {
      type: Date,
    },
    Article_body: {
      type: String,
    },
    Article_source: {
      type: String,
    },
    Article_URL: {
      type: String,
    },
    Location: {
      type: String,
    },
    Article_keywords: {
      type: String,
    },
    Article_weight: {
      type: Number
    },
    Article_citations: {
      type: String,
    },
    Category: {
      type: String,
    },
    Tokens: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema);