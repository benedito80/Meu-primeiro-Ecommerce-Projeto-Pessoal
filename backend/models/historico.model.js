const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  data: {
    type: Date,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quantidade: {
    type: Number,
    default: 0,
  },
  tarifa: {
    type: Number,
    default: 0,
  },
  adicional: {
    type: Number,
    default: 0,
  },
  desconto: {
    type: Number,
    default: 0,
  },
  caixa: {
    type: Number,
    default: 0,
  },
  fechouMes: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("historico", Schema);
