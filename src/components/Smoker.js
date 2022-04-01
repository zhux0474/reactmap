import React, { useState, useEffect } from "react"
import SmokerMap from "./SmokerMap";
import "./Smoker.css";
import SmokerLegend from "./SmokerLegend";
import LoadData from "../tasks/LoadData";
import Dropdown from "./dropdown.js"


const Smoker = () =>{
    return (
        <div >
            <div style={{height: '400px'}}>
                <SmokerMap  />
            </div>
            <div style={{position: 'relative' }} >
                <SmokerLegend/> 
                <Dropdown/> 
            </div>
        </div>
    );

};

export default Smoker;