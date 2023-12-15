import React from 'react';
import Home from "../assests/home.png"
import Comment from "../assests/comment.png"
import Users from "../assests/man.png";
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { useDispatch} from 'react-redux';
import { setHidden } from '../store/HiddenSlice';

const Sidebar = () => {
  const dispatch=useDispatch();  
  return (
    <div className='sidebar'>
         <button onClick={()=>dispatch(setHidden())}><RxCross2 /></button>
         <ul className='nav-links'>
            <li><span><img src={Home} alt="img"/> Dashboard</span></li>

            <li>
              <Link to={'messageDetails'}>
                <span>
                  <img src={Comment} alt="img"/> Messages
                </span>
              </Link>
            </li>
            
            <li><span><img src={Users} alt="img"/> Users</span></li>
         </ul>
    </div>
  );
}

export default Sidebar;
