const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    Category_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', categorySchema);