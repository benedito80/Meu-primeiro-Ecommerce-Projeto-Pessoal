const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "O campo nome não pode estar vazio",
  },
  cpf: {
    type: String,
    unique: true,
    required: "O campo nome não pode estar vazio",
  },
  funcao: {
    type: String,
    enum: ["admin", "cliente", "gerente", "empacotador"],
    default: "cliente",
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: "Email não pode estar vazio",
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: "A senha não pode estar em branco",
    minlength: [8, "A senha deve ter no mínimo 8 caracteres"],
  },
  saltSecret: String,
});

userSchema.path("email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Email inválido!.");

// Events
userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

mongoose.model("User", userSchema);
