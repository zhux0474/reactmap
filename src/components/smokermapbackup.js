import React from "react";
import { fromLonLat, get } from "ol/proj";
//import "./SmokerMap.css";
import Map from "ol/Map";
//import Feature from "ol/Feature";
import View from "ol/View";
//import { Point, Style, Circle, Fill, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import OSM from "ol/source/OSM";
import {Fill, Stroke, Style} from 'ol/style';
//import cityboundary from "./Minneapolis_Police_Precincts.geojson";


export default class SmokerMap extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
    this.mapRef=React.createRef();
  }
  componentDidMount(){

    var basemap =new TileLayer({
      source: new OSM()
    })

    var vectorstyle = new Style({
      fill: new Fill({
        color: '#eeeeee'
      }),
      stroke: new Stroke({
        color:'black',
        width:1
      })
    })

    var totalsmoker = new VectorSource({
      url:"https://smartcommunityhealth.ahc.umn.edu/lung_cancer/wms?service=WMS&version=1.1.0&request=GetMap&layers=lung_cancer%3Atotal_smokers_v2&bbox=-97.239209%2C43.499383499%2C-89.4917389999999%2C49.3843580000001&width=768&height=583&srs=EPSG%3A4326&format=geojson",
      format: new GeoJSON()
    })

    var vectorlayer = new VectorLayer({
       //source : new VectorSource({
        //url: "https://smartcommunityhealth.ahc.umn.edu/lung_cancer/wms?service=WMS&version=1.1.0&request=GetMap&layers=lung_cancer%3Atotal_smokers_v2&bbox=-97.239209%2C43.499383499%2C-89.4917389999999%2C49.3843580000001&width=768&height=583&srs=EPSG%3A4326&format=geojson",
        //format: new GeoJSON(),
        source: totalsmoker,
        style: vectorstyle
        
        /*function (feature){
          const color=feature.get('COLORS')|| '#eeeeee';
          this.style.getFill().setColor(color);
          return this.style;
            */
        })
    
      var stylefunction = function(feature){
      var style;
      var value=feature.get('brffs_smokers');
      var color= value <100 ? '#ffffff': value <200 ? '#ff3f3f' : '#3f0000';
      this.style.getFill().setColor(color);

      /*
      if(feature.get('brffs_smokers')>'100'){
        style= new Style({
          fill: new Fill({
            color: '#B4DFB4'
          }),
          stroke: new Stroke({
            color:'black',
            width:1
          })
        })
      }
      else 
        style= new Style({
         fill: new Fill({
            color: '#B4DFB4'
          }),
         stroke: new Stroke({
           color:'yellow',
            width:1
         })
      })
      */
      return style;

    };

    

    var lungdata = new TileLayer({
      source : new TileWMS ({
        url:'https://smartcommunityhealth.ahc.umn.edu/lung_cancer/wms',
        serverType:'geoserver',
        params: {'LAYERS': 'lung_cancer:total_smokers_v2', 'TILED': true},
        
        transition: 0

      }),
      style: vectorstyle




    })
    
    this.map=new Map({
      layers: [basemap,vectorlayer],
      target: "mapContainer",
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