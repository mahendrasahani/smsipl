import React, { useEffect } from 'react';
import Header from '../main-components/Header';
import Sidebar from '../main-components/Sidebar';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setHidden } from '../store/HiddenSlice';

const Layout = () => {
  const value = useSelector((state) => state.hiddenstate.hidden);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
 // ---------------------------------------------------------------function to hide/show sidebar based on screen size
      if (window.innerWidth < 1158 && value === true) {
        dispatch(setHidden());
      } else if (window.innerWidth >= 1158 && value === false) {
        dispatch(setHidden());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [value]); 

  return (
    <div className='container'>
      <Header />
      <div className='container-box'>
        {value ? <Sidebar /> : null}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
