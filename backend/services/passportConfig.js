require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const GoogleStrategy = require('passport-google-oidc');
const User = require('../models/User');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },

  (email, password, cb) => {
    User.findOne({ email }, '+password', (err, user) => {
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

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/login/google/redirect',
  },
  (issuer, profile, cb) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
      if (err) {
        cb(err);
        return;
      }
      if (!user) {
        new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
        }).save((err, user) => {
          if (err) {
            cb(err);
            return;
          }
          cb(null, user);
        });
        return;
      }
      cb(null, user);
    });
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
