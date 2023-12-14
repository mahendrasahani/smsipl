import React from 'react';
import Home from "../assests/home.png"
import Comment from "../assests/comment.png"
import Users from "../assests/man.png";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
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
