import React from 'react';
import ReactDOM from 'react-dom/client';
import Approuter from "./App"
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Components/store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={Approuter}/>
    </Provider>
   
  </React.StrictMode>
);

