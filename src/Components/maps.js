import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";

let Localiza = {};
function Map() {
    return(
        <GoogleMap
        defaultZoom={16}
        defaultCenter={Localiza}
        >

    <Marker 
    position={Localiza} 
    icon={{
        url:"../../assets/vitima.png",
        scaledSize: new window.google.maps.Size(40, 40),
    }}
    />
            </GoogleMap>

       
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default ({MapsCaixa, Loc}) => {
      Localiza = Loc;
        return (
                
            <div className="maps-contener"  style={{height: MapsCaixa ? '45%' : '0%'}}>
                {/* <div className="maps--header">
                    </div> */}
                   
                    <WrappedMap
                     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U`}
                     loadingElement={<div style={{ height: `100%` }} />}
                     containerElement={<div style={{ height: `100%` }} />} 
                     mapElement={<div style={{ height: `100%` }} />} 
                     />
                    
                    
            </div>
        );
    }