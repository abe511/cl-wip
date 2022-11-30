import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from  "react-leaflet";
import NewEventForm from "./NewEventForm";

const AddEvent = ({ icon, add, cancel }) => {

    const [ location, setLocation ] = useState(null);

    useMapEvents({
        click: (e) => {
            setLocation(e.latlng);
        }
    });

    return location === null
        ? null
        :<Marker position={location} icon={icon}>
            <Popup>
                <NewEventForm add={add} cancel={cancel}/>
            </Popup>
        </Marker>
};


export default AddEvent;