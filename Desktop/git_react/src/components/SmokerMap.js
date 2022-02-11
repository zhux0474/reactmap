import React from "react";
import { fromLonLat, get } from "ol/proj";
//import { Map, GeoJSON } from "react-leaflet";
import{
    interaction,layer,custom,control, //name spaces
    Interactions,Overlays,Controls, //group
    Map,Layers,Overlay,Util //objects
  } from 'react-openlayers';
//import "leaflet/dist/leaflet.css";
import "./SmokerMap.css";

const SmokerMap = ({ counties}) =>{
    /*
    const mapStyle={
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    };
    const onEachCountry = (country, layer) => {
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const confirmedText = country.properties.confirmedText;
        layer.bindPopup(`${name} ${confirmedText}`);
      };*/

      /*return (
        <Map style={{ height: "90vh" }} zoom={2} center={[-94.6859,46.7296]}>
          <GeoJSON
            style={mapStyle}
            data={countries}
            onEachFeature={onEachCountry}
          />
        </Map>
      );*/

      return (
        <div className="map_div">
        <Map className="smoker_map" view={{center:fromLonLat([-94.6859,46.7296]),zoom:6}}>
          <Layers>
            <layer.Tile></layer.Tile>
            </Layers>
    
        </Map>
        
        </div>
      );

};
export default SmokerMap;

