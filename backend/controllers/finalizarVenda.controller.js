"use strict";
require("../models/finalizarVenda.model");
const mongoose = require("mongoose");
const vendaFinalizada = mongoose.model("finalizarVenda");

exports.post = async (req, res, next) => {
  const bodyData = req.body;
  const { user_id } = req.params;

  try {
    const data = { username: user_id, ...bodyData };
    const newObject = await vendaFinalizada.create(data);

    await newObject.populate("username  listaVenda.products ").execPopulate();

    return res.status(200).json(newObject);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getTodasVenda = async (req, res, next) => {
  try {
    var data = await vendaFinalizada
      .find({
        enviado: true,
      })
      .sort({ data: -1 })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getVendaRuim = async (req, res, next) => {
  try {
    var data = await vendaFinalizada
      .find({
        vendaBoa: false,
      })
      .sort({ data: -1 })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAllEnviadoFalse = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    var data = await vendaFinalizada
      .find({
        enviado: false,
        vendaBoa: true,
        saiu_p_entrega: false,
        historico: false,
        username: user_id,
      })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAllEnviadoTrue = async (req, res, next) => {
  try {
    var data = await vendaFinalizada
      .find({
        enviado: true,
        vendaBoa: true,
        saiu_p_entrega: false,
        historico: false,
      })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getAllEntregaTrue = async (req, res, next) => {
  try {
    var data = await vendaFinalizada
      .find({ saiu_p_entrega: true, vendaBoa: true, historico: false })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getEntregaTrue = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    var data = await vendaFinalizada
      .find({
        saiu_p_entrega: true,
        vendaBoa: true,
        historico: false,
        username: user_id,
      })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await vendaFinalizada
      .findById(id)
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.geVendasUser = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    var data = await vendaFinalizada
      .find({
        username: user_id,
        enviado: true,
      })
      .sort({ data: -1 })
      .populate("username listaVenda.products ")
      .populate({
        path: "listaVenda.products",
        populate: { path: "post" },
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.put = async (req, res, next) => {
  const bodyData = req.body;

  const { finalizarVenda_id } = req.params;
  try {
    const updateVenda = await vendaFinalizada.findByIdAndUpdate(
      finalizarVenda_id,
      bodyData,
      {
        new: true,
      }
    );

    return res.status(200).json(updateVenda);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.delete = async (req, res, next) => {
  const { finalizarVenda_id } = req.params;

  try {
    const deleteVenda = await vendaFinalizada.findByIdAndDelete(
      finalizarVenda_id
    );
    return res.status(200).json(deleteVenda);
  } catch (e) {
    return res.status(400).json(e);
  }
};
