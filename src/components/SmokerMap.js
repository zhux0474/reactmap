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
import { set } from "ol/transform";
import Feature from 'ol/Feature';



export default class SmokerMap extends React.Component{

  static contextType = Context;

  context=this.context;

  constructor(props){
    super(props);
    this.state = {

      smokerSource : null,
      smokerlayer: false,
      stylefunction: null,
      countyOutlineSource: null,
      countyOutline: false,
      countyReady: false,
      smokerData: null

  };
   // console.log(this.props);
  }

  //global function（styledata） to style map
  // will be called in componentDidMount and componentDidUpdate
  //static geojsondata =metadata[1].geojson_url;

  styledata(geoFeature){

    let newStyle;
    var metaValue = 1
  
    var value=geoFeature['values_']['brfss_smoker'];
  

    for (let i =0;i<metadata[metaValue]['break'].length;i++){
      if(value>metadata[metaValue]['break'][i]){
      newStyle = new Style({
        fill: new Fill({
          color: metadata[metaValue]['color'][i]
        }),
        stroke: new Stroke({
          color:'black',
          width:0.3
        })
      })
    };
  }
    //console.log(newStyle)
    //this iterates through every feature and assigns a style
    //this.setState({ mapStyle: newStyle });
    return newStyle;

  }


  styledata2(geoFeature){

    let newStyle;
    // console.log(geoFeature)
    // Fixed this error
    //var value=geoFeature.get('brfss_smoker');
    var value=geoFeature['properties']['brfss_smoker'];

    for (let i =1;i<Object.keys(metadata).length;i++){
      if(value>metadata[3]['break'][i]){
      newStyle = new Style({
        fill: new Fill({
          color: metadata[3]['color'][i]
        }),
        stroke: new Stroke({
          color:'black',
          width:0.3
        })
      })
    };
  }
    //console.log(newStyle)
    //this iterates through every feature and assigns a style
    //this.setState({ mapStyle: newStyle });
    return newStyle;

  }
  //a global function(getData) to get json data from url when called from componentDidUpdate
  async getData(url,starturl) {
    if ( url != starturl){
      //console.log(starturl)
      const response = await fetch(url);//new json value
      const response2 = await fetch(starturl);//old geojson value

      var jsondata=await response.json();
      var geojsondata=await response2.json();
      //compare and update the geojsondata

      for (var i=0;i<jsondata.features.length;i++){
        //New json value
        var newgeoid=jsondata.features[i]['properties']['geo_id']
        var newvalue=jsondata.features[i]['properties']['brfss_smoker']

        for (var j=0;j<geojsondata.features.length;j++){
          //Old json
          var oldgeoid=geojsondata.features[j]['properties']['geo_id']
          var oldvalue=geojsondata.features[j]['properties']['brfss_smoker']
          if (newgeoid===oldgeoid)
           {
             //console.log(oldgeoid,newvalue, oldvalue)
             geojsondata.features[j]['properties']['brfss_smoker']=newvalue
              //var newfeature=geojsondata.features[j]['properties']['brfss_smoker']

            }
        }
        //console.log(oldvalue,value)
        //console.log(geojsondata.features[i]['properties']['brfss_smoker'])
        //console.log(newfeature)
      }

      //console.log("Is this data altered before it leaves the function")
      //console.log(geojsondata)
      // var newChoropleth=this.styledata(geojsondata);
      // console.log(newChoropleth);

      return geojsondata 
    }



  }




  componentDidMount(){

    const context=this.context;
    console.log(context);// get the current value in UsersContext through the hook
    var basemap =new TileLayer({
      source: new OSM()
    })
    var smokerSource = new VectorSource({
      url: metadata[1].geojson_url, 
      format: new GeoJSON()
    })

    console.log("source is:",context.state.dataurl)

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
      source: countyOutlineSource,
      style: countyBorder
    });

    var initialStyle = this.styledata;
    // console.log("What does this look like")
    console.log(this.styledata)
    var smokerlayer = new VectorLayer({

       source: smokerSource,
       style: initialStyle
    
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
      //set the initial state
      olmap: olmap,
      countyOutlineSource:countyOutlineSource,
      countyOutline: countyOutline,
      smokerlayer: smokerlayer,
      smokerSource:smokerSource,
      smokerStyle:initialStyle

  })




}


async componentDidUpdate(prevProps,prevState){
  const context=this.context;
  console.log(context)
  console.log("update:",context.state.attributeid)
  console.log("update:",context.state.dataurl)
  var geojsondata=metadata[1].geojson_url;
  

  if ( prevState.smokerSource != null){
    console.log("Component is updating");
    //console.log(this.state.smokerSource['url_']);

    //console.dir(this.state.smokerlayer)
    var updatedGeoJSON = await this.getData(context.state.dataurl,geojsondata);
    //console.log(updatedGeoJSON)
    this.state.smokerlayer.getSource().forEachFeature(function(feature) {
    //console.log(feature)
    //compare value from updated GeoJson with the value from this.state.smokerlayer 
    //and update this.state.smokerlayer if the geoid matches and values are not the same
    var oldgeoid=feature['values_']['geo_id']
    var oldvalue=feature['values_']['brfss_smoker']
    //console.log(updatedGeoJSON.features.length)
      for (var i=0;i<updatedGeoJSON.features.length;i++){
        //New json value
        var newgeoid=updatedGeoJSON.features[i]['properties']['geo_id']
        var newvalue=updatedGeoJSON.features[i]['properties']['brfss_smoker']
          //Old json

          //console.log(oldgeoid,newvalue, oldvalue)
          if (newgeoid===oldgeoid)
           {
             //console.log(oldgeoid,newvalue, oldvalue)
             feature['values_']['brfss_smoker']=newvalue
             let updatedStyle;


             for (let i =1;i<Object.keys(metadata).length;i++){

              if(feature>metadata[3]['break'][i]){
                updatedStyle = new Style({
                fill: new Fill({
                  color: metadata[3]['color'][i]
                }),
                stroke: new Stroke({
                  color:'black',
                  width:0.3
                  })
                })
              };

            }
              //var newfeature=geojsondata.features[j]['properties']['brfss_smoker']
              feature.setStyle(updatedStyle)
            }

        //console.log(oldvalue,value)
        //console.log(geojsondata.features[i]['properties']['brfss_smoker'])
        //console.log(newfeature)
      }
    })

            console.log("Done")



}}

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
