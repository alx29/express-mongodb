const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema(
  {
    Token_body: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Token', tokenSchema);