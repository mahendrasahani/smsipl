import React, { useState } from 'react';
import Header from "./Layout/Header"
import Sidebar from './Layout/Sidebar';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const Layout = () => {
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
