import express from "express";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";

import("../auth/passport");

const router = express.Router();



// signup endpoint
// on post request from the user passport authenticates the user based on the middleware created in the utils/auth
router.post(
    "/signup",
    passport.authenticate("signup", {session: false}),
    async (req, res, next) => {
        res.json({
            message: "Signed up successfully",
            user: req.user
        });
    }
);

// SIGN JWT

// when the user logs in, the user credentials passed to a custom callback,
// which in turn creates a token and sends it back to the user
// {session: false} is set so that user credentials are not saved in the session
// instead, the token is sent on every request to the secure route
// this is useful for API's, but not recommended for apps due to performance issues 
router.post( // (route, callback)
    "/login",
    async (req, res, next) => {
        passport.authenticate(
            "login",
            async (err, user, info) => {
                try {
                    if(err || !user) {
                        const error = new Error("An error occurred");
                        return next(error);
                    }
                    req.login(
                        user,
                        {session: false},
                        async (err) => {
                            if(err)
                                return next(err);
                            // id and email in the payload (no sensitive info)
                            const body = {_id: user._id, email: user.email};
                            // sign up a jwt using the secret
                            const token = jsonwebtoken.sign({user: body}, process.env.JWT_SECRET);
                            return res.json({ token });
                        });
                } catch (err) {
                    return next(err);
                }
            }
        )(req, res, next);
});


// LOG OUT

router.post("/logout", (req, res, next) => {
    console.log(req);
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect("/");
    });
});


export default router;
