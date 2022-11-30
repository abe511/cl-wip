import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";


import routes from "./routes/routes";
import profileRoutes from "./routes/profileRoutes";

import markerRoutes from "./routes/api/markerRoutes";
import eventRoutes from "./routes/api/eventRoutes";


// dotenv setup
dotenv.config({path: "./config.env"});


// require("./config/auth.js");
import("./auth/passport");



const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI;


mongoose.connect(DB_URI, {
            useNewUrlParser: true, // CHECK IF NECESSARY
            useUnifiedTopology: true // CHECK IF NECESSARY
}).then(() => {
    console.log("Connection to MongoDB established");
}).catch((err) => {
    console.log(`Connection to MongoDB failed. ${err}`);
})



// parser setup
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

// routes(app);

// app.get("/", (req, res) => {
//     res.send(`server running on port ${PORT}`);
// });

app.use("/", routes);
// use JWT strategy as a middleware so only verified users can access this route
app.use("/user", passport.authenticate("jwt", {session: false}), profileRoutes);

app.use("/api/marker", markerRoutes);
app.use("/api/event", eventRoutes);




// error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({error: err});
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

