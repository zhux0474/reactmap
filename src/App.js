import React from 'react';
import Smoker from "./components/Smoker";
import './App.css';
import {Provider} from "./components/context.js";


function App() {
  return (
    <Provider>
    
 
    <div>
      <Smoker />
    </div>
    </Provider>
  );
}
export default App;





