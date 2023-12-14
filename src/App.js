
import { Outlet, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from "./Components/main-components/Login"

import SearchResults from './Components/main-components/SearchResults';
import Layout from './Components/Layout/Layout';
import MessageDetails from './Components/main-components/MessageDetails';




const App=()=> {

  return (
    <div className="App">
        <Outlet/>

    </div>
  );
}

const Approuter=createBrowserRouter([
  {
    path:'/',
    Element:<App/>,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"admin",
        element:<Layout/>,
        children:[
          {
            path:"",
            element:<SearchResults/>
          },
          {
            path:'messageDetails',
            element:<MessageDetails/>
          }
        ]
      }
    ]
    
  
  }
])

export default Approuter;
