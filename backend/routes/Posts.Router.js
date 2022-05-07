const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const Post = require("../models/Post");

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  try {
    const post = await Post.create({ name, size, key, url });
    return res.json({ post });
  } catch (e) {
    return res.status(400).json(e);
  }
});

routes.get("/posts/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const data = await Post.find({ image: user_id });
    return res.json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
});

routes.get("/posts", async (req, res) => {
  try {
    const data = await Post.find().populate("product");
    return res.json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  try {
    await post.remove();
    return res.status(200).json({ message: "Dados excluido com sucesso!" });
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = routes;
