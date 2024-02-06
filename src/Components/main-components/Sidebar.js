import React from 'react';
import Home from "../assests/home.png"
import Comment from "../assests/comment.png"
import Users from "../assests/man.png";
import { RxCross2 } from "react-icons/rx";
import { useDispatch} from 'react-redux';
import { setHidden } from '../store/HiddenSlice';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const dispatch=useDispatch();  
  return (
    <div className='sidebar'>
         <button onClick={()=>dispatch(setHidden())}><RxCross2 /></button>
         <ul className='nav-links'>
            <li><span><img src={Home} alt="img"/><Link>Dashboard</Link></span></li>

            <li>    
                <span>
                  <img src={Comment} alt="img"/><Link to={"messages"}>Messages</Link>
                </span>
            </li>
            
            <li><span><img src={Users} alt="img"/><Link to={"usermenu"}>Users</Link></span></li>
         </ul>
    </div>
  );
}

export default Sidebar;
