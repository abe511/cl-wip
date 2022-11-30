import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PointSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere",
        required: true
    }
});

export const MarkerSchema = new Schema({
    geometry: PointSchema,
    type: {
        type: String,
        default: "POI",
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps: true});


const MarkerModel = mongoose.model("marker", MarkerSchema);

export default MarkerModel;
