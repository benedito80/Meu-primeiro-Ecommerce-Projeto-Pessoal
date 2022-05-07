"use strict";
require("../models/Prod_categoria");
const mongoose = require("mongoose");
const Prod_categoria = mongoose.model("Prod_categoria");

exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Prod_categoria.create(data);

    await newObject;

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    var data = await Prod_categoria.find().sort({ nome: 1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getProd_categoria = async (req, res, next) => {
  const { nome } = req.params;

  try {
    var data = await Prod_categoria.find({ nome: nome }).sort({ nome: 1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Prod_categoria.findById(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateProduct = await Prod_categoria.findByIdAndUpdate(id, bodyData, {
      new: true,
    });

    return res.status(200).json(updateProduct);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteProduct = await Prod_categoria.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  } catch (e) {
    return res.status(400).json(e);
  }
};
