import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import "./index.css"

const Location = () => {

    const containerStyle = {
        width: '80%',
        height: '400px',
        margin: 'auto'
    };
      
    const [center, setCenter] = useState({lat: 43.30410903683898, lng: -79.86780663703834})

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, [])

    return(
        <div id="contact">
            <div id="location">
                <div id="address">
                    <address tabIndex={"0"} onClick={() => setCenter({lat: 43.30410903683898, lng: -79.86780663703834})}>
                            Main Location: <br/>
                            Aldershot Storage and Parking <br/>
                            279 Sumach Dr, Burlington, ON L7R 3X5
                    </address>
                    <address tabIndex={"0"} onClick={() => setCenter({lat: 43.25313823011172, lng: -79.92147746194964})}>
                            Secondary Location: <br/>
                            Near West End Pub <br/>
                            151 Emerson St, Hamilton, ON L8S 2Y1
                    </address>
                </div>
                <div id="map">
                    { isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={16}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <>{
                                <Marker position={center} />
                            }</>
                        </GoogleMap>
                    ) : <></>}
                </div>
            </div>
            <footer>
                &copy; 2024 - 3Y Brick Veneer Website 
            </footer>
        </div>
    )

};

export default Location