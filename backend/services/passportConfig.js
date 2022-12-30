require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github2');
const TwitterStrategy = require('passport-twitter');
const User = require('../models/User');

passport.use(
  new LocalStrategy(
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
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/login/google/redirect',
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (!user) {
            new User({
              googleId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName || '',
              email: profile.emails[0].value,
              avatar: profile._json.picture,
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
    ),
  );
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/login/github/redirect',
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.findOne({ githubId: profile.id });
          if (!user) {
            new User({
              githubId: profile.id,
              firstName: profile.displayName || profile.username,
              lastName: '',
              email: profile?.emails[0]?.value,
              avatar: profile.photos[0].value,
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
    ),
  );
}

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_KEY_SECRET,
        callbackURL: '/api/login/twitter/redirect',
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.findOne({ twitterId: profile.id });
          if (!user) {
            new User({
              twitterId: profile.id,
              firstName: profile.displayName || profile.username,
              lastName: '',
              avatar: profile.photos[0].value,
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
    ),
  );
}
