import React, {useState} from 'react';
import {Context} from "./context.js"
import {metadata} from './metadata.js';






/*
function App() {
  // Array of objects containing data
  var attributes = []
  for (var i =1; i<=Object.keys(metadata).length;i++) {
    console.log(metadata[i]['attributename'])
    //need put this info somewhere (inside the state)
    attributes.push( { label: metadata[i]['attributename'], value: metadata[i]['geojson_url']}); 
  }
  

// Using state to keep track of selection
var [attribute, setAttribute] = useState("Select an attribute")
console.log(attribute)

// Using this function to update the state 
// whenever a new option is selected from the dropdown
// only if i could move it so smokermap could use it to update source link 
var handleAttributeChange = (e) => {
  setAttribute(e.target.value)
  console.log(e.target.value)
}

  return (
    
    <Context.Consumer>
      {(context)=>(
    <div className="Dropdown">
    {attribute}
    <br />
   
    <select onChange={context.handleChange}> 
      <option value=" Select an attribute"> -- Select an attribute -- </option>
      {attributes.map((attribute) => <option value={attribute.value}> {attribute.label}</option>)}
      console.log(attributes)
    </select>
    </div>
    )}
    </Context.Consumer>
  );
}
export default App;*/

function Dropdown(){

  var attributes = []
  for (var i =1; i<=Object.keys(metadata).length;i++) {
    console.log(metadata[i]['attributename'])
    //need put this info somewhere (inside the state)
    attributes.push( { label: metadata[i]['attributename'], value: metadata[i]['geojson_url']}); 
  }
  

// Using state to keep track of selection
//console.log(attributes)

  return(
    //add an onChange event listener to the <select> tag and set the value to {context.handleChange}.
    <Context.Consumer>
      {(context)=>(
      <div>
      <p>Please Select an Attribute to Display</p>
      <select onChange={context.handleChange}>
        <option value=" Select an attribute"> -- Select an attribute -- </option>
        {attributes.map((attribute) => <option value={attribute.value}> {attribute.label}</option>)}
        console.log(attributes)
      </select>
    </div>
      )}
      
    </Context.Consumer>

  )



}
export default Dropdown;