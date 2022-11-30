import express from "express";

const profileRouter = express.Router();


profileRouter.get("/profile", (req, res, next) => {
    res.json({
        msg: "protected route",
        user: req.user,
        token: req.query.token
    });
});

export default profileRouter;
