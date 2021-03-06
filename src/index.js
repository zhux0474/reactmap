import React from 'react';
import ReactDOM from 'react-dom';
//import './App.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "./components/context.js"

ReactDOM.render(

  //wrap the App in <Provider> tags.
  //ensure that the entire app has access to data in the Context file.
 <Provider>
    <App />
 </Provider>

  ,document.getElementById('root')
);

const title = (
  <div>
    <h1>Tobacco Smokers Rate in Minnesota</h1>
  </div>
)

ReactDOM.render(title, document.getElementById('root2'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
