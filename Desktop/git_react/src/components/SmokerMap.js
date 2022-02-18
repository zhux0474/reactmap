import React from "react";
import { fromLonLat, get } from "ol/proj";
//import { Map, GeoJSON } from "react-leaflet";

//import "leaflet/dist/leaflet.css";
//import "./SmokerMap.css";
import Map from "ol/Map";
//import Feature from "ol/Feature";
import View from "ol/View";
//import { Point, Style, Circle, Fill } from "ol";
import TileLayer from "ol/layer/Tile";
//import VectorLayer from "ol/layer/Vector";
//import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";


export default class SmokerMap extends React.Component{
  constructor(props){
    super(props);
    this.mapRef=React.createRef();
  }
  componentDidMount(){
    this.map=new Map({
      target: "mapContainer",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view :new View({
        center:fromLonLat([-94.6859,46.7296]),
        zoom: 6
      })

    });
   
  }
  render() {
    console.log("-> render App");
    return (
      <div
        id="mapContainer"
        ref={this.mapRef}
        style={{ width: "100%", height: "500px" }}
      >
       
      </div>
    );
  }


}
/*
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
      );

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
*/
