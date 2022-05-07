const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  data: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contato: {
    type: String,
  },
  status: {
    type: String,
    default: "preparando para envio...",
  },
  listaVenda: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      precoVenda: {
        type: Number,
        default: 0,
      },
      quantidade: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
  ],
  enderecoEntrega: {
    type: String,
  },
  saiu_p_entrega: {
    type: Boolean,
    default: false,
  },
  vendaBoa: {
    type: Boolean,
    default: true,
  },
  caixa: {
    type: Number,
    default: 0,
  },
  tarifa: {
    type: Number,
    default: 0,
  },
  historico: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: String,
    enum: [
      "Avista|Entrega",
      "Cartão|Na entrega",
      "Tranf.Bancaria",
      "Retirada|Estabelecimento",
    ],
    default: "Avista|Entrega",
  },
  enviado: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("finalizarVenda", Schema);
