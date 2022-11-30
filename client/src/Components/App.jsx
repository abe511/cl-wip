import { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Map";
import Header from "./Header";
import Navbar from "./Navbar";
import "../styles/App.css";


let URL = "";

function App() {
    if(import.meta.env.MODE === "development"){
        URL = `${import.meta.env.VITE_DEV_SERVER_URL}:${import.meta.env.VITE_DEV_SERVER_PORT}`;
    }
    else {
        URL = `${import.meta.env.VITE_PROD_SERVER_URL}:${import.meta.env.VITE_PROD_SERVER_PORT}`;
    }

    const [ markers, setMarkers ] = useState([]);

    useEffect(() => {
        axios.get(`${URL}/api/marker`)
            .then((response) => {
                setMarkers(response.data);
            });
    }, []);


    return (
        <div className="App">
            <Header />
            <Navbar />
            <Map markers={markers} />
        </div>
    );
}

export default App
