
import { Outlet, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';

import SearchResults from './Components/SearchResults';
import Layout from './Components/Layout';
import MessageDetails from './Components/MessageDetails';




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
