
import { Outlet, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from "./Components/main-components/Login"

import Layout from './Components/Layout/Layout';
import MessageDetails from './Components/main-components/MessageDetails/MessageDetails';

import Usermenu from './Components/main-components/Usermenu';
import { useSelector } from 'react-redux';
import SearchResults from './Components/main-components/SearchResults';
import Exceldata from './Components/main-components/Exceldata';





const App=()=> {

  return (
    <div className="App">
        <Outlet/>
    </div>
  );
}

const MessageDetailsWrapper = () => {
  const items = useSelector(state => state.Items.items);


  return <MessageDetails items={items} />;
};


   


const Approuter=createBrowserRouter([
  {
    path:'/',
    Element:<App/>,
    children:[
      {
        path:"/login",
        element:<Login/>
      },
   
      {
        path:"/admin/dashboard",
        element:<Layout/>,
        children:[
          // {
          //   path:"/admin/dashboard",
          //   element:<SearchResults/>
          // },
          {
            path:"/admin/dashboard",
             element:<Exceldata/>
          },

          {
            path:"/admin/dashboard/messagelist",
            element:<SearchResults/>
          },
       
        
          {
            path: '/admin/dashboard/messagelist/messageDetails/:id',
            element: <MessageDetailsWrapper />
          },
          {
            path:"/admin/dashboard/usermenu",
            element:<Usermenu/>
          },
        ]
      }
    ]
    
  
  }
])

export default Approuter;
