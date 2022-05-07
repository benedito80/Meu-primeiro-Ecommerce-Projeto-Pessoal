"use strict";
require("../models/dadosPessoais.model");
const mongoose = require("mongoose");
const dadosPessoais = mongoose.model("dadosPessoais");

exports.post = async (req, res, next) => {
  const bodyData = req.body;
  const { user_id } = req.params;

  try {
    const data = { username: user_id, ...bodyData };

    const newObject = await dadosPessoais.create(data);

    await newObject.populate("username").execPopulate();

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    var data = await dadosPessoais.find().populate("username");

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getByUser = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const data = await dadosPessoais
      .find({ username: user_id })
      .sort({ data: -1 })
      .populate("username");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const bodyData = req.body;
  const { user_id } = req.params;
  try {
    const updateProduct = await dadosPessoais.findByIdAndUpdate(
      user_id,
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
  const { user_id } = req.params;

  try {
    const deleteCart = await dadosPessoais.findByIdAndDelete(user_id);
    return res.status(200).json(deleteCart);
  } catch (e) {
    return res.status(400).json(e);
  }
};
