const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  productVolume: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  estoque: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});
module.exports = mongoose.model("Product", Schema);
