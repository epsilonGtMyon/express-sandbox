const passport = require("passport");
const LocalStrategy = require("passport-local");
//const crypto = require('node:crypto');
const { findUser } = require("./user.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: false,
    },
    (username, password, cb) => {
      console.log("[auth]");
      const user = findUser(username);
      if (user == null || user.password !== password) {
        // とりあえず平文です。
        console.log("auth failed", user);
        cb(null, null, { value: "NG" });
        return;
      }

      // ユーザーあり
      console.log("auth success");
      cb(null, user, { value: "OK" });
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { ...user });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});
