import React from "react";
import {metadata} from './metadata.js';

export default class SmokerLengend extends React.Component{
    
    render(){
        
        var legend=[];
        for (var i =1; i<metadata.break.length;i++) {
            legend.push(
            <div key={i} style={{display: 'flex',alignItems: 'center'}}>
                <span style ={{backgroundColor:metadata.color[i], width: '15px', height: '15px', display: 'inline-block'}}>
                </span>
                    {metadata.break[i-1]}-{metadata.break[i]-1}
                
                </div>); 
            
        }
        return legend.reverse();
    
}
}

