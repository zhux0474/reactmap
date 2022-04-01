import React from "react";
import { fromLonLat, get } from "ol/proj";
//import "./SmokerMap.css";
import Map from "ol/Map";
//import Feature from "ol/Feature";
import View from "ol/View";
//import { Point, Style, Circle, Fill, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
//import TileWMS from 'ol/source/TileWMS';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
import OSM from "ol/source/OSM";
import {Fill, Stroke, Style} from 'ol/style';
import {metadata} from './metadata.js';
//import Dropdown from "./dropdown.js"

//import ImageWMS from 'ol/source/ImageWMS';



export default class SmokerMap extends React.Component{
  constructor(props){
    super(props);
    //console.log(this.props);
  }


  componentDidMount(){

    var basemap =new TileLayer({
      source: new OSM()
    })
    

    // use usestate to update the url base on 
    var totalsmoker = new VectorSource({
      url:metadata.geojson_url[0],
      format: new GeoJSON()
    })


  
    

    //var breakarray= [300,400,500,600];
    //var colorarray= ['#edf8fb','#b3cde3','#8c96c6','#88419d']
  
      var stylefunction = function(feature){
        var style;
        
        var value=feature.get('brffs_smokers');
        //var county=feature.get('county');
        
        // assign color to each break from metadata.js
        //console.log(county,value)
        for (let i =0;i<metadata.break.length;i++){
          if(value>metadata.break[i]){
          style= new Style({
            fill: new Fill({
              color: metadata.color[i]
            }),
            stroke: new Stroke({
              color:'black',
              width:0.3
            })
          })
        };
      }

        return style;

    };

    var vectorlayer = new VectorLayer({

       source: totalsmoker,
       style: stylefunction,
       showLegend:true


       })

     /*
    var lungdata = new TileLayer({
      source : new TileWMS ({
        url:'https://smartcommunityhealth.ahc.umn.edu/lung_cancer/wms',
        serverType:'geoserver',
        params: {'LAYERS': 'lung_cancer:total_smokers_v2', 'TILED': true},

        transition: 0

      }),
      style: vectorstyle
   const wmsSource = new ImageWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: {'LAYERS': 'topp:states'},
      target: "maplegend",
      ratio: 1,
      serverType: 'geoserver',
    });



    })*/

    var remap=new Map({
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


      <div id="mapContainer" style={{ width: "100%",height: "500px"}}></div>
      


    );
  }


}
