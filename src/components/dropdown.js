import React, {useState} from 'react';
import {metadata} from './metadata.js';

function App() {
  // Array of objects containing data
  var attributes = []
  for (var i =0; i<metadata.attributename.length;i++) {
    attributes.push( { label: metadata.attributename[i], value: metadata.geojson_url[0]}); 
  }
  

// Using state to keep track of selection
var [attribute, setAttribute] = useState("Select an attribute")
console.log(attribute)

// Using this function to update the state 
// whenever a new option is selected from the dropdown
var handleAttributeChange = (e) => {
  setAttribute(e.target.value)
}

  return (
    <div className="Dropdown">
    {attribute}
    <br />

    <select onChange={handleAttributeChange}> 
      <option value=" Select an attribute to display"> -- Select an attribute -- </option>
      
      {attributes.map((attribute) => <option value={attribute.value}> {attribute.label}</option>)}
    </select>
    </div>
  );
}

export default App;