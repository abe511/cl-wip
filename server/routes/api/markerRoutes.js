import express from "express";

const markerRouter = express.Router();

import {
    addNewMarker,
    getMarkers,
    getMarkerById,
    updateMarkerById,
    deleteMarker,
    geoNear
} from  "../../controllers/markerControllers";

markerRouter.route("/near")
    .get(geoNear);

markerRouter.route("/")
    .get(getMarkers)
    .post(addNewMarker);

markerRouter.route("/:markerID")
    .get(getMarkerById)
    .put(updateMarkerById)
    .delete(deleteMarker);



export default markerRouter;