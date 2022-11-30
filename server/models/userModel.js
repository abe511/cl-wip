import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "root"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
}, {timestamps: true});


UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};



const UserModel = mongoose.model("user", UserSchema);

export default UserModel;

// module.exports = UserModel;