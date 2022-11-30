import mongoose from "mongoose";
import UserModel from "./userModel";
import MarkerModel from "./markerModel";


const Schema = mongoose.Schema;

const EventSchema = new Schema({
    type: {
        type: String,
        default: "Meetup",
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     default: undefined
    // },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    author: {
        type: String,
        required: true
    },
    // location: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "MarkerModel",
    //     default: undefined
    // },
    location: {
        type: [Number],
        default: [0.0, 0.0]
    },
    // participants: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "UserModel"
    // },
    participants: {
        type: [String],
        // type: [UserSchema],
        // default: [UserSchema]
        default: undefined
    },
    status: {
        type: String,
        default: "Initialized"
    }
}, {timestamps: true});


const EventModel = mongoose.model("event", EventSchema);

export default EventModel;
