import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip } from  "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import AddEvent from "./AddEvent";

import data from "./data.json";

import { useMap, useMapEvents, useMapEvent } from "react-leaflet/hooks";


const centerCoords = [40.1872, 44.5152];

const pin = new Icon({
    iconUrl: "./pin.svg",
    iconSize: [24, 24]
});

let URL = "";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzODRmOWI3YWE4ZjVhYTlhNDJmYzgwYiIsImVtYWlsIjoiampAZW1haWwuY29tIn0sImlhdCI6MTY2OTY1OTEzOH0.l53OtBUkkvlpB1FXB5ohufDWRbXXUKY6dZoRY4pWlHo";


const addNewEvent = (e) => {
    if(import.meta.env.MODE === "development"){
        URL = `${import.meta.env.VITE_DEV_SERVER_URL}:${import.meta.env.VITE_DEV_SERVER_PORT}`;
    }
    else {
        URL = `${import.meta.env.VITE_PROD_SERVER_URL}:${import.meta.env.VITE_PROD_SERVER_PORT}`;
    }

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-type": "application/json"
    };

    const data = {
        type: "event type",
        description: "event description",
        author: "username",
        location: [
            44.515575939822183,
            40.184578510200795
        ],
        participants: [
            "Author", "1", "2", "3"
        ]
    }
    axios.post(`${URL}/api/event`, data, { headers })
        .then((response) => {
            console.log(response);
        }); 
};

const cancelNewEvent = () => {
    console.log("event cancelled");
};

function Map({ markers }) {

    const [ activeMarker, setActiveMarker ] = useState(null);

    return (
        <main className="map-wrapper">
            <MapContainer
            center={centerCoords}
            zoom={13}
            >

                { markers.map((marker) => {
                    return <Marker
                        key={marker._id}
                        icon={pin}
                        position={[marker.geometry.coordinates[1], marker.geometry.coordinates[0]]}
                        eventHandlers={{
                            click: () => {setActiveMarker(marker);}
                        }}
                    >
                        <Tooltip>{marker._id}</Tooltip>
                    </Marker>
                })}

                {activeMarker && (
                    <Popup
                        position={[
                                activeMarker.geometry.coordinates[1],
                                activeMarker.geometry.coordinates[0]
                            ]}
                    >
                        <div>
                            <p>{activeMarker._id}</p>
                            <p>Latitude:{activeMarker.geometry.coordinates[1]}</p>
                            <p>Longitude:{activeMarker.geometry.coordinates[0]}</p>
                        </div>
                    </Popup>)
                }
                <AddEvent icon={pin} add={addNewEvent} cancel={cancelNewEvent} />
                {/* <ZoomControl position="bottomright"/> */}
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </ MapContainer>
        </main>
        );
}

export default Map;