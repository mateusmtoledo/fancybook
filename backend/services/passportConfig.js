require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const User = require('../models/User');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  (username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        cb(err);
        return;
      }
      if (!user) {
        cb(null, false, { message: 'Wrong credentials' });
        return;
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          cb(err);
          return;
        }
        if (res) {
          cb(null, user.toJSON());
          return;
        }
        cb(null, false, { message: 'Wrong credentials' });
      });
    });
  },
));

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  (jwtPayload, cb) => User.findById(jwtPayload._id)
    .then((user) => cb(null, user))
    .catch((err) => cb(err)),
));
