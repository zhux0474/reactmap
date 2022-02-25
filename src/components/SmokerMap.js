import React from "react";
import { fromLonLat, get } from "ol/proj";
//import "./SmokerMap.css";
import Map from "ol/Map";
//import Feature from "ol/Feature";
import View from "ol/View";
//import { Point, Style, Circle, Fill, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import OSM from "ol/source/OSM";
import {Fill, Stroke, Style} from 'ol/style';
import cityboundary from "./Minneapolis_Police_Precincts.geojson";
//import county from "./County.json";

/*
const vectorlayer = 
new VectorLayer({
    source : new VectorSource({
      url: './City_Boundary.geojson',
      format: new GeoJSON(),
      featureProjection:"EPSG:4326"
    }),
    style: new Style({
      color: '#eeeeee',
      ///style: getFill().setColor(color),

    })
})*/

/*
const vectorlayer=new GeoJSON().readFeatures(geojsonObject, {
  featureProjection:'EPSG:3857'
});*/

export default class SmokerMap extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
    this.mapRef=React.createRef();
  }
  componentDidMount(){
    this.map=new Map({
      target: "mapContainer",
      layers: [
  
        new TileLayer({
          source: new OSM()
        }),

        new VectorLayer({
          //background: '#1a2b39',
          source : new VectorSource({
            url: cityboundary,
            format: new GeoJSON()
            //crossOrigin: 'anonymous',
            //featureProjection:"EPSG:4326"
          }),
          style: new Style({
            //need to add stuff here to style the polygon 
            fill: new Fill({
              color: [255,0,0,255]}),//'#eeeeee' [255,0,0,255]
            
            ///style: getFill().setColor(color),
      
          }), 
          
      })
      
      ],
      
      view :new View({
        center:fromLonLat([-94.6859,46.7296]),
        zoom: 7
      })

    });
   
  }
  render() {
    console.log("-> render App");
    return (
      <div
        id="mapContainer"
        ref={this.mapRef}
        style={{ width: "100%", height: "700px" }}
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
