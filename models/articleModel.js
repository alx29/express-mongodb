const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
  {
    Article_no: {
      type: String,
    },
    Article_short_description: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema);