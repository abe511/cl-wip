import MarkerModel from "../models/markerModel";


// CREATE

export const addNewMarker = async (req, res) => {
    const newMarker = new MarkerModel(req.body);
    try {
        await newMarker.save();
        res.send(newMarker);
    } catch(err) {
        res.send(err);
    }
};


// READ ALL

export const getMarkers = async (req, res) => {
    try {
        const data = await MarkerModel.find({});
        res.send(data);
    } catch(err) {
        res.send(err);
    }
};


// READ

export const getMarkerById = async (req, res) => {
    try {
        const data = await MarkerModel.findById(req.params.markerID);
        res.send(data);
    } catch(err) {
        res.status(404).json({message: "Not found"});
    }
}


// UPDATE

export const updateMarkerById = async (req, res) => {
    try {
        const data = await MarkerModel.findByIdAndUpdate(
            {_id: req.params.markerID},
            req.body,
            {new: true}
        );
        res.send(data);
    } catch(err) {
        res.status(404).json({message: "Not found"});
    }
}


// DELETE

export const deleteMarker = async (req, res) => {
    try {
        await MarkerModel.deleteOne({_id: req.params.markerID});
        res.json({message: "Record removed"});
    } catch(err) {
        res.send(err);
    }
}


// FIND NEAR

export const geoNear = async (req, res) => {
    try {
        console.log(req.query);
        const data = await MarkerModel.geoSearch(
            {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
            {maxDistance: parseFloat(req.query.maxDistance), spherical: true}
        );
        res.send(data);
    } catch(err) {
        res.send(err);
    }
};
