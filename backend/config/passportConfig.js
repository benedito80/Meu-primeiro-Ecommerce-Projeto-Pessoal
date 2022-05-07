const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
var User = mongoose.model("User");

passport.use(
  new localStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      // usuário desconhecido
      else if (!user)
        return done(null, false, { message: "Email não está registrado" });
      // senha incorreta
      else if (!user.verifyPassword(password))
        return done(null, false, { message: "Senha incorreta." });
      // autenticação bem sucedida
      else return done(null, user);
    });
  })
);
