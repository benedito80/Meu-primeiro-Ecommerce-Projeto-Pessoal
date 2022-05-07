"use strict";
require("../models/Product.model");
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.post = async (req, res, next) => {
  const bodyData = req.body;
  const { post_id } = req.params;

  try {
    const data = { post: post_id, ...bodyData };
    const newObject = await Product.create(data);

    await newObject.populate("post").execPopulate();

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    var data = await Product.find({ ativo: true })
      .sort({ estoque: 1 })
      .populate("post");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getDesativado = async (req, res, next) => {
  try {
    var data = await Product.find({ ativo: false })
      .sort({ estoque: 1 })
      .populate("post");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getByIdProduct = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    var data = await Product.findById(product_id).populate("post");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getProductNome = async (req, res, next) => {
  const { productname } = req.params;

  try {
    var data = await Product.find({ productname: productname }).populate(
      "post"
    );

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getCategoria = async (req, res, next) => {
  const { categoria } = req.params;

  try {
    var data = await Product.find({
      categoria: categoria,
      ativo: true,
    }).populate("post");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const { product_id } = req.params;
  const bodyData = req.body;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product_id,
      bodyData,
      {
        new: true,
      }
    );

    return res.status(200).json(updateProduct);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.delete = async (req, res, next) => {
  const { user_id, product_id } = req.params;

  try {
    const deleteProduct = await Product.findByIdAndDelete(product_id);
    return res.status(200).json(deleteProduct);
  } catch (e) {
    return res.status(400).json(e);
  }
};
