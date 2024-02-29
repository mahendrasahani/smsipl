
import {createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from "./Components/Login"
import Messages from './Components/Messages';
import MessageDetail from './Components/MessageDetail';
import Dashboard from './Components/Dashboard';






const App=()=> {

  return (
    <div className="App">
        <Login/>
    </div>
  );
}


   


const Approuter=createBrowserRouter([
  {
    path:'/',
   element:<App/>
   
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/messages",
    element:<Messages/>
  },
  {
    path:"/messageDetails/:id",
    element:<MessageDetail/>
  }
])

export default Approuter;
