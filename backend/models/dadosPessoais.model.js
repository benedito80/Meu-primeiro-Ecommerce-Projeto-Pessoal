const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  data: {
    type: Date,
    default: Date.now,
  },
  rua: {
    type: String,
  },
  numero: {
    type: String,
  },
  bairro: {
    type: String,
  },
  cidade: {
    type: String,
    default: "Oeiras",
  },
  estado: {
    type: String,
    default: "PI",
  },
  cep: {
    type: String,
    default: "64500-000",
  },
});
module.exports = mongoose.model("dadosPessoais", Schema);
