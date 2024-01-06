import React, {useState} from 'react';
import Logo from "../assests/logo.png"
import UserIcon from "../assests/user-icon.png"
// import Hamburger from "../assests/hamburger.png"
import Hamburger from "../assests/hamburger.svg"
import { useDispatch} from 'react-redux';
import { setHidden } from '../store/HiddenSlice';



const Header = () => {
  const [modal,setModal]=useState(true)                                     //control modal box using this state variable
  const dispatch=useDispatch();                   
        
  const handleLogout=()=>{
    localStorage.removeItem('token')
    window.location.href="/login"
  }

  return (
    <div className='header'>
     <img className='logo' src={Logo} alt="img"/>
       
       <div className='header-main'>

        <img src={Hamburger} alt="img" className='hamburger' onClick={()=>dispatch(setHidden())}/>           

        <span className='user-box'>

        <img className='user-icon' src={UserIcon} alt="img" onClick={()=>setModal(!modal)}/>
        {
          modal||<div className='icon-click'>
          <p>Profile</p>
          <p onClick={handleLogout}>Logout</p>
        </div>
        }
    
        </span>
        
       </div>
    </div>
  );
}

export default Header;
