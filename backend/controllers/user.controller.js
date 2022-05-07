const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const User = mongoose.model("User");

const bcrypt = require("bcryptjs");

module.exports.register = async (req, res, next) => {
  const bodyData = req.body;

  try {
    await User.create(bodyData, (err, doc) => {
      if (!err) return res.send(doc);
      else {
        if (err.code == 11000)
          return res.status(422).send(["Email ja cadastrado!."]);
        else return next(err);
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json(err);
    else if (user)
      return res.status(200).json({
        token: user.generateJwt(),
        user: user._id,
        funcao: user.funcao,
        email: user.email,
        mostrar: true,
      });
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = async (req, res, next) => {
  await User.findOne({ _id: req._id }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Registro do usuário não encontrado.",
      });
    } else {
      return res.status(200).json({
        status: true,
        user: _.pick(user, [
          "fullName",
          "funcao",
          "cpf",
          "image",
          "email",
          "ativo",
        ]),
      });
    }
  });
};

module.exports.userAll = async (req, res, next) => {
  try {
    var data = await User.find({}, "fullName cpf email funcao ativo ");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.userUpdate = async (req, res, next) => {
  const newUser = {
    $set: {
      fullName: req.body.fullName,
      funcao: req.body.funcao,
      cpf: req.body.cpf,
      ativo: req.body.ativo,
      image: req.body.image,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    },
  };
  try {
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.status(200).send({ message: "Dados atualizado com sucesso" });
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.userUpdatePost = async (req, res, next) => {
  const bodyData = req.body;
  const { post_id } = req.params;
  try {
    const data = await User.findOneAndUpdate(post_id, bodyData, {
      new: true,
    });
    console.log(data);
    res.status(200).send(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.userDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const objDelete = await User.findByIdAndDelete(id);
    return res.status(200).json(objDelete);
  } catch (e) {
    return res.status(400).json(e);
  }
};

module.exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id, "fullName cpf email funcao ativo ");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json(e);
  }
};
