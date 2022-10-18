require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const GoogleStrategy = require('passport-google-oidc');
const axios = require('axios');
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
        const error = new Error();
        error.statusCode = 401;
        error.invalidFields = {
          email: {
            param: 'email',
            msg: 'User not found',
            location: 'body',
          },
        };
        cb(error);
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
        const error = new Error();
        error.statusCode = 401;
        error.invalidFields = {
          password: {
            param: 'password',
            msg: 'Wrong password',
            location: 'body',
          },
        };
        cb(error);
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
  async (issuer, profile, cb) => {
    try {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const avatar = (await axios.get(
          `https://people.googleapis.com/v1/people/${profile.id}`,
          {
            params: {
              personFields: 'photos',
              key: process.env.GOOGLE_API_KEY,
            },
          },
        )).data.photos[0].url;
        new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName || '',
          email: profile.emails[0].value,
          avatar,
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
    } catch (err) {
      cb(err);
    }
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
