const mongoose = require("mongoose");
const priceSchema = require("./swapPrice");

const swapProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
 
  userId: {
    type: String,
    required: true
  },
  prices: [priceSchema],

});

const SwapProduct = mongoose.model("SwapProduct", swapProductSchema);
module.exports = { SwapProduct, swapProductSchema };