import React, { useEffect} from 'react';
import Header from "../main-components/Header"
import Sidebar from '../main-components/Sidebar';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setHidden } from '../store/HiddenSlice';


                                                                                                           

const Layout = () => {                                                                              //Main layout 
  const value=useSelector(state=>state.hiddenstate.hidden); 
  const dispatch=useDispatch();

  useEffect(() => {                                                      
    const handleResize = () => {                            //function to hide  sidebar when screen size is less than 1158
      
      if (window.innerWidth < 1158) {
         if(value===true)
         dispatch(setHidden())
      }

      if (window.innerWidth > 1158) {
        if(value===false)
        dispatch(setHidden())
     }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
                    
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
