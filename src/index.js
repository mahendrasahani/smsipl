import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Components/store/store";
import AppRouter from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
        <Provider store={store}>
       <AppRouter />
    </Provider>
  </React.StrictMode>
   

);
