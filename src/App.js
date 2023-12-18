
import { Outlet, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from "./Components/main-components/Login"
import SearchResults from './Components/main-components/SearchResults';
import Layout from './Components/Layout/Layout';
import MessageDetails from './Components/main-components/MessageDetails';
import { useSelector } from 'react-redux';


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
        path:"/",
        element:<Login/>
      },
      {
        path:"/admin",
        element:<Layout/>,
        children:[
          {
            path:"/admin/",
            element:<SearchResults/>
          },
          {
            path: '/admin/messageDetails/:id',
            element: <MessageDetailsWrapper />
          }
        ]
      }
    ]
    
  
  }
])

export default Approuter;
