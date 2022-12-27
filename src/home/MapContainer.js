import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';



const MapContainer = (props: any) => {


    const getMapOptions = (maps: any) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
    };

    const [center, setCenter] = useState({lat: 46.770562, lng: 23.627147 });
    const [zoom, setZoom] = useState(18);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <div  key={localStorage.getItem("plannerEventsId")} >
                <h5 style={{color: 'rgba(76,78,78,0.65)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Alexandru Vaida Voevod 72</h5>

            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: ""}}
                defaultCenter={center}
                defaultZoom={zoom}
                options={getMapOptions}
            >
                <Marker
                    lat={46.770562}
                    lng={23.627147}
                    name="Our location"
                    color="blue"
                />
            </GoogleMapReact>
        </div>
    );
}

export default MapContainer;
