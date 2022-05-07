"use strict";
require("../models/historico.model");
const mongoose = require("mongoose");
const historico = mongoose.model("historico");

exports.post = async (req, res, next) => {
  const bodyData = req.body;
  const { user_id } = req.params;

  try {
    const data = { username: user_id, ...bodyData };
    const newObject = await historico.create(data);

    await newObject.populate("username").execPopulate();

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    var data = await historico.find({ fechouMes: false }).sort({ data: -1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getTrue = async (req, res, next) => {
  try {
    var data = await historico.find({ fechouMes: true }).sort({ data: -1 });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await historico.findById(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.delete = async (req, res, next) => {
  const { user_id, id } = req.params;

  try {
    const deleteProduct = await historico.findByIdAndDelete(id);
    return res.status(200).json(deleteProduct);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const bodyData = req.body;
  const { id } = req.params;

  try {
    const updateVenda = await historico.findByIdAndUpdate(id, bodyData, {
      new: true,
    });

    return res.status(200).json(updateVenda);
  } catch (e) {
    return res.status(400).json(e);
  }
};
