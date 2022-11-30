import passport from "passport";
import dotenv from "dotenv";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import UserModel from "../models/userModel";

dotenv.config({path: "../config.env"});


// USER SIGNUP

passport.use(
    "signup",
    new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
        session: false
    },
    async (req, email, password, done) => {
        try {
            const fields = req.body;
            // args: { email, password, userName, firstName, lastName, role }
            const user = await UserModel.create({...fields});
            return done(null, user);
        } catch(err) {
            done(err);
        }
    }
));


// USER LOGIN

passport.use(
    "login",
    new localStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        session: false
    },
    async(email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if(!user)
                return done(null, false, {message: "User not found"});
            
            const valid = await user.isValidPassword(password);
            if(!valid)
                return done(null, false, {message: "Wrong password"});
            
            return done(null, user, {message: "Logged in"});
        } catch(err) {
            return done(err);
        }
    }
));


// VERIFY JWT

passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch(err) {
                done(err);
            }
        }
    ),
);
