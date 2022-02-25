import React, { useState, useEffect } from "react"
import SmokerMap from "./SmokerMap";
import LoadData from "../tasks/LoadData";


const Smoker = () =>{
    //const [counties, setCounties] = useState([]);
    /*
    const load = () =>{
        console.log("load");
        const loadData = new LoadData();
        loadData.load((counties)=> setCounties(counties));

    };
    
    useEffect(load,[]);
    
    below is the code go inside the div below
    {counties.length === 0 ?(
                <Loading />):(
                    <div>
                        <SmokerMap counties = {counties} />
                
                        </div>
                )}  */

    return (
        <div>
            
            <SmokerMap />
            
            </div>
    );

};

export default Smoker;