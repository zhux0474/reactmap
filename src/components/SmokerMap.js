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
import countyData from './countyline.geojson';
import Dropdown from './dropdown.js';
import Whitesmoker from '../data/whitesmoker.json';
import {Context} from "./context";
import { useContext } from "react";
//import {ccontext} from "./context";


export default class SmokerMap extends React.Component{

  static contextType = Context;
  
  constructor(props){
    super(props);
    this.state = {
     
      smokerSource : null,
      smokerlayer: false,
      countyOutlineSource: null,
      countyOutline: false,
      countyReady: false
      
  };
   // console.log(this.props);
  }

  


  
  componentDidMount(){
  
    const context=this.context;
    console.log(context);
    // get the current value in UsersContext through the hook
    var basemap =new TileLayer({
      source: new OSM()
    })
    var smokerSource = new VectorSource({
      url: context.state.attribute,//metadata[1].geojson_url,
      
      format: new GeoJSON()
    })
    console.log("source is:",context.state.attribute)
   

    var countyOutlineSource = new VectorSource({
      url: countyData,
      format: new GeoJSON()

    })
    var countyBorder = new Style({
      stroke: new Stroke({
          color: 'black',
          width: 1
      })
  });
    var countyOutline = new VectorLayer({
      opacity: 1,
      //visible: this.props.viewed === 'County',
      source: countyOutlineSource,
      style: countyBorder
    })

    
  
    var stylefunction = function(feature){
        var style;
        console.log(feature);
        
        //var value=feature.get('brfss_smoker');
        //var geojson1={geoid:23,value:16},{geoid:50,value:25}
        //var geojson2={geoid:27,value:55},{geoid:55,value:25},{geoid:63,value:16},{geoid:23,value:25},{geoid:99,value:16},{geoid:50,value:65}

        //var county=feature.get('county');
        //var value = feature.get('brfss_smoker');
        var geoid=feature.get('geo_id');
       //console.log("geoid",geoid);
        //console.log(value);
        //console.log(Object.keys(geoid));
       // const newgeoid = Whitesmoker.map((id)=> {
         // var white=Whitesmoker.get('geo_id');
          //console.log(white);
        for (var i=0; i<Whitesmoker.features.length;i++){
            var newgeoid=Whitesmoker.features[i].properties.geo_id;
            //console.log(newgeoid);
            if (newgeoid===geoid ){
              var value= Whitesmoker.features[i].properties.brfss_smoker;
             };
          }
        //console.log(value)
        
        
        
        
        //compare geoid with the next json
        // mapping function or a for loop to find the matching value
        // return value from geojson2 and assign to var value 
        
        // assign color to each break from metadata.js
        //console.log(county,value)
        for (let i =0;i<metadata[1]['break'].length;i++){
          if(value>metadata[1]['break'][i]){
          style= new Style({
            fill: new Fill({
              color: metadata[1]['color'][i]
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

    var smokerlayer = new VectorLayer({

       source: smokerSource,
       style: stylefunction,
       //showLegend:true

       })

    var olmap=new Map({
      layers: [basemap,countyOutline,smokerlayer],
      target: "mapContainer",
      view :new View({
        center:fromLonLat([-94.6859,46.7296]),
        zoom: 6
      })



    });

    this.setState({
      
      olmap: olmap,
      countyOutlineSource:countyOutlineSource,
      countyOutline: countyOutline,
      smokerlayer: smokerlayer,
      smokerSource:smokerSource
  })

  
  

}


  componentDidUpdate(){
    const context=this.context;
    console.log("update:",context)
  }

  

  
  render() {
    console.log("-> render App");
    //console.log("before return",this.state)
    return (
      console.log("after return",this.state),
      //{context},
      <Context.Consumer>

        {(context)=>(

          <p>{context.state.season}</p>
        )}
      
      </Context.Consumer>,
      
      <div id="mapContainer" style={{ width: "100%",height: "500px"}}></div>
      //console.log(this.state)
      

    );
    
  }


}