import passport from 'passport';
import passportJWT from 'passport-jwt';
import JWTStrategy = passportJWT;
import ExtractJWT = passportJWT.ExtractJwt;
import User from '../entity/User';
import passportFacebook from 'passport-facebook';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

import GoogleStrategy from 'passport-google-oauth20';
const FacebookStrategy = passportFacebook.Strategy;
const LocalStrategy = passportLocal.Strategy;

import { getRepository } from 'typeorm';
import { Request, request } from 'express';
import { ClientRequest } from 'http';
import { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_OR_KEY as string;

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);

//jwt strategy settings
passport.use(
  new JWTStrategy.Strategy(
    {
      jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.jwt;
        }
        return token;
      },
      secretOrKey: SECRET_KEY,
      passReqToCallback: true,
    },
    async (req: Request, jwt_payload: JwtPayload, done: any) => {
      if (
        jwt_payload.user &&
        req.user &&
        (req.user as User).id == jwt_payload.user.id
      ) {
        return done(null, jwt_payload.user);
      } else {
        return done(null, false);
      }
    }
  )
);

//local strategy settings
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false, // Use JWT and not session,
      passReqToCallback: true,
    },

    async (req, email: string, password: string, done: any) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          // Username doesn't exist
          req.flash('error', 'User cannot be found with this email');

          return done(null, false);
        }

        //check if the hashed password matches
        const pass = bcrypt.compareSync(password, user.password);
        if (!pass) {
          // Password doesn't match
          req.flash('error', 'Wrong password');

          return done(null, false);
        }
        // Login is successful
        done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

//faceboook strategy settings
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL as string,
      profileFields: ['id', 'displayName', 'email'],
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ email: profile._json.email });
      // let saved = undefined
      if (!user) {
        const user = new User();
        user.email = profile._json.email as string;
        user.username = profile.displayName;

        // hash a password
        const salt = bcrypt.genSaltSync(SALT_ROUND);
        user.password = bcrypt.hashSync(salt, salt);

        //save the user created
        const saved = await User.save(user);
        request.user = saved;
        done(undefined, saved);
      }
      else{

        done(null, user);
      }
    }
  )
);

//google strategy settings
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const user = await User.findOne({ email: profile._json.email });

      if (!user) {
        const user = new User();
        user.email = profile._json.email as string;
        user.username = profile.displayName;

        // hash a password
        const salt = bcrypt.genSaltSync(SALT_ROUND);
        user.password = bcrypt.hashSync(salt, salt);

        const saved = await User.save(user);
        done(undefined, saved);
      } else {
        done(undefined, user);
      }
    }
  )
);

//serialize user
passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

//deserialize user
passport.deserializeUser((obj: any, done: any) => {
  done(null, obj);
});

export default passport;
