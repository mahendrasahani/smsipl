import React from 'react';
import Header from "../main-components/Header"
import Sidebar from '../main-components/Sidebar';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';


                                                                                                           

const Layout = () => {                                                                              //Main layout 
  const value=useSelector(state=>state.hiddenstate.hidden);                                       
                    
  return (
    <div className='container'>
        <Header/>
        <div className='container-box'>
        {value?<Sidebar/>:null}
         <Outlet/>
        </div>
        
    </div>
  );
}

export default Layout;
