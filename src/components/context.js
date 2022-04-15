import React, { useState } from "react";
import {metadata} from './metadata.js';


export const Context = React.createContext("Select an attribute");

//export const ccontext = React.createContext("Select a attribute");

export const { Consumer } = Context;



//this class will live a the top level of our application and 
//will store all data that we want to share with other components
// need to add a value to <Context.Provider> tags




 

  // Make the context object:
  

  // pass the value in provider and return
  //return <Context.Provider value={usersContext}>{children}</Context.Provider>;




export class Provider extends React.Component{
    state={
        attribute: metadata[1]['geojson_url'] //default to total smoker
        
    }


    render(){
        
        //within the value, set state to be "this.state"
        // add function to handle the change when selection is made to dropdown menu

        return(
            console.log(this.state),
            //handleChange function sets the state of season to event.target.value 
            //which is the option from dropdown
            <Context.Provider value ={{
                state:this.state,

                //handleChange function sets the state of 'season' to 'event.target.value' 
                //(the option selected from the dropdown).
                handleChange: (event) => this.setState({
                    attribute: event.target.value
                }),
                

            }}>
                
                {this.props.children}
            </Context.Provider>
        )
    }
}