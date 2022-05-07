"use strict";
require("../models/categoria");
const mongoose = require("mongoose");
const Categoria = mongoose.model("Categoria");

exports.post = async (req, res, next) => {
  const bodyData = req.body;

  try {
    const data = { ...bodyData };
    const newObject = await Categoria.create(data);

    await newObject;

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    var data = await Categoria.find().sort({ nome: 1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getCategoria = async (req, res, next) => {
  const { nome } = req.params;

  try {
    var data = await Categoria.find({ nome: nome }).sort({ nome: 1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    var data = await Categoria.findById(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const updateProduct = await Categoria.findByIdAndUpdate(id, bodyData, {
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
    const deleteProduct = await Categoria.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  } catch (e) {
    return res.status(400).json(e);
  }
};
