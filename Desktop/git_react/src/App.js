import './App.css';
import React from 'react';
import { fromLonLat, get } from "ol/proj";
import{
  interaction,layer,custom,control, //name spaces
  Interactions,Overlays,Controls, //group
  Map,Layers,Overlay,Util //objects
} from 'react-openlayers';
import * as ol from "ol";


function App() {
  return (
    <div className="App_map">
  
    <Map view={{center:fromLonLat([-94.6859,46.7296]),zoom:5}}>
      <Layers>
        <layer.Tile></layer.Tile>
        </Layers>

    </Map>
    
    </div>
  );
}

export default App;
