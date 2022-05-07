const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Prod_categoria", Schema);
