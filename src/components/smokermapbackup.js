import React, { useEffect } from "react";
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
  
  context=this.context;
  //var oldgeoid={};
  
  
  
  constructor(props){
    super(props);
    this.state = {
      
      smokerSource : null,
      smokerlayer: false,
      stylefunction: null,
      countyOutlineSource: null,
      countyOutline: false,
      countyReady: false
      
  };
   // console.log(this.props);
  }
  
  //global function（styledata） to style map 
  // will be called in componentDidMount and componentDidUpdate
  //static geojsondata =metadata[1].geojson_url; 
  styledata(feature){

    var thestyle;
    //console.log(feature)
    var value=feature.get('brfss_smoker');
    //var testvalue = 6
    //console.log(value)
    //this.oldgeoid=feature.get('geo_id');
    //console.log(this.oldgeoid)
    //console.log(feature.get('geo_id'))
    //for (var i=0; i<feature.length;i++){
      //var newgeoid=feature[i].values.geo_id;
      //console.log(newgeoid);
      //if (newgeoid===this.oldgeoid ){
        //var value= feature[i].values.brfss_smoker;
       //};
    //}

    for (let i =0;i<metadata[1]['break'].length;i++){
      if(value>metadata[1]['break'][i]){
      thestyle= new Style({
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
    //console.log(thestyle)
    return thestyle;

  }
  //a global function(getData) to get json data from url when called from componentDidUpdate 
  async getData(url,starturl) {
    console.log(url)
    console.log(starturl)
    const response = await fetch(url);//new json value
    const response2 = await fetch(starturl);//old geojson value
    
    var jsondata=await response.json();
    var geojsondata=await response2.json();
    //compare and update the geojsondata 
    
    for (var i=0;i<jsondata.features.length;i++){
      var newgeoid=jsondata.features[i]['properties']['geo_id']
      var value=jsondata.features[i]['properties']['brfss_smoker']
      for (var j=0;j<geojsondata.features.length;j++){
        var oldgeoid=geojsondata.features[j]['properties']['geo_id']
        var oldvalue=geojsondata.features[j]['properties']['brfss_smoker']
        if (newgeoid=oldgeoid)
         {
            geojsondata.features[j]['properties']['brfss_smoker']=value
            var newfeature=geojsondata.features[j]['properties']['brfss_smoker']
            
          }
      } 
      //console.log(oldvalue,value)
      //console.log(geojsondata.features[i]['properties']['brfss_smoker'])
      //console.log(newfeature)
    }

    //console.log(geojsondata)
    var newstyle=this.styledata(geojsondata)
    console.log(newstyle)
    return this.styledata(geojsondata)


  }
    //return jsondata;}
/*
    for (var i=0;i<jsondata.features.length;i++){
      var newgeoid=jsondata.features[i]['properties']['geo_id']
      var value=jsondata.features[i]['properties']['brfss_smoker']
      //if (newgeoid=oldgeoid)
    }
    console.log(jsondata.features[0]['properties']['geo_id'])

    //return await response.json();
  };*/
  /*
  stylefunction(feature){
    var style;
    //console.log(feature.features)
    var geoid=feature.get('geo_id');
    //var geoid=feature.features
    for (var i=0; i<feature.length;i++){
    var newgeoid=feature[i].values.geo_id;
        //console.log(newgeoid);
    if (newgeoid===geoid ){
      var value= feature[i].values.brfss_smoker;
         };
      }
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

  };*/

  
  componentDidMount(){
    
    const context=this.context;
    console.log(context);
    // get the current value in UsersContext through the hook
    var basemap =new TileLayer({
      source: new OSM()
    })
    var smokerSource = new VectorSource({
      url: metadata[1].geojson_url, //context.state.attribute,
      format: new GeoJSON()
    })

    console.log("source is:",context.state.attribute)
    
   //need to pass context.state.attribute into some function to get new json
   //store json as a variable 

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
    });

    
    
  /*
    var stylefunction = function(feature){
      
        var style;
        //console.log(feature);
        
        var value=feature.get('brfss_smoker');
        //console.log(value);
        //var geojson1={geoid:23,value:16},{geoid:50,value:25}
        //var geojson2={geoid:27,value:55},{geoid:55,value:25},{geoid:63,value:16},{geoid:23,value:25},{geoid:99,value:16},{geoid:50,value:65}

        //var county=feature.get('county');
        //var value = feature.get('brfss_smoker');
        
        var geoid=feature.get('geo_id');
        console.log(geoid);
        for (var i=0; i<feature.length;i++){
          var newgeoid=feature[i].values.geo_id;
          //console.log(newgeoid);
          if (newgeoid===geoid ){
            var value= feature[i].values.brfss_smoker;
           };
        }
       //console.log("geoid",geoid);
        //console.log(value);
        //console.log(Object.keys(geoid));
       // const newgeoid = Whitesmoker.map((id)=> {
         // var white=Whitesmoker.get('geo_id');
          //console.log(white);
          /*
          for sample
          var geoid=feature.get('geo_id');
        for (var i=0; i<Whitesmoker.features.length;i++){
            var newgeoid=Whitesmoker.features[i].properties.geo_id;
            //console.log(newgeoid);
            if (newgeoid===geoid ){
              var value= Whitesmoker.features[i].properties.brfss_smoker;
             };
          }
        //console.log(value)
        
        
        //var jsondata= getData();
        //console.log(jsondata);
        
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
    */

    var smokerlayer = new VectorLayer({

       source: smokerSource,
       style: this.styledata
       //need to figure out how to update this style

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
      //stylefunction:this.styledata
      
  })

  
  

}


componentDidUpdate(){
  const context=this.context;
  console.log("update:",context.state.attribute)
  var geojsondata=metadata[1].geojson_url; 
  console.log(this.state.smokerSource)
  
  var jsondata= this.getData(context.state.attribute,geojsondata);
  //console.log(jsondata);
  //this.styledata(jsondata);

  
  
  
  
  //this.stylefunction(jsondata);
    //const printAddress = async () => {
      //const a = jsondata;
      //const jsonn=JSON.stringify(a)
      //console.log(a);
    //};
    //printAddress();
}
/*
  componentDidUpdate(prevProps,prevState){
    //console.log(this.props)
    if (prevProps.api != this.props.api){
      
      //console.log(prevState.smokerSource)
      const context=this.context;
      console.log("update:",context)
      const getjson=()=>{
        fetch(context.state.attribute)
        .then(function(response){
          //console.log(response)
          return response.json();
        })
        .then(function(myJson){
          //console.log(myJson);
  
        });
  
  
      }
    
    }
    
      
      
  }*/
    
  
  

  

  
  render() {
    //console.log("-> render App");
    //console.log("before return",this.state)
    return (
      console.log("after return",this.state),
      //{context},
      <Context.Consumer>

        {(context)=>(

          <p>{context.state.attribute}</p>
        )}
      
      </Context.Consumer>,
      
      <div id="mapContainer" style={{ width: "100%",height: "500px"}}></div>
      //console.log(this.state)
      

    );
    
  }


}