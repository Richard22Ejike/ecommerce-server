const mongoose = require("mongoose");

const priceSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = priceSchema;