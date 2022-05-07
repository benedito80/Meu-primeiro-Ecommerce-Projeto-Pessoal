require("dotenv").config();
require("./config/config");
require("./config/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const app = express();

const users = require("./routes/user.router");
const prod_categoria = require("./routes/Prod_categoria.router");
const categoria = require("./routes/Categoria.router");
const products = require("./routes/Product.router");
const finalizarVenda = require("./routes/finalizarVenda.router");
const endereco = require("./routes/dadosPessoaisRouter");
const historico = require("./routes/Historico.router");

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//ROTA UPLOAD DE IMAGENS
app.use(require("./routes/Posts.Router"));

app.use("/users", users);
app.use("/prod_categoria", prod_categoria);
app.use("/categorias", categoria);
app.use("/products", products);
app.use("/venda-finalizadas", finalizarVenda);
app.use("/endereco", endereco);
app.use("/historicos", historico);

app.use("/files", express.static(path.resolve(__dirname, "temp", "uploads")));

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta : ${process.env.PORT}`)
);
