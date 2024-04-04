import React from 'react';
import elkindylogo from "assets/img/elkindy.png"
import './sideBar.css'
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdPages,
  MdPageview,
  MdOutlinePages,
  MdAddAlarm,
  MdAddTask,
  MdOutlineMusicNote,
  MdOutlineMusicVideo,
  MdOutlineEvent,
} from "react-icons/md";
import { HSeparator } from 'components/separator/Separator';
import { Link } from 'react-router-dom';

function Sidebar() {

  return (
    <div id="sidebar">
      <img src={elkindylogo} style={{ width: '200px', height: 'auto' }} />
      <br></br>
      <HSeparator mb='20px' />
      <ul>

        <li><Link to={'/admin/dashboard'}><Icon as={MdHome} width='20px' height='20px' color='inherit' marginRight={'10px'} />Dashboard </Link></li>
        <li><Link to={'/admin/profile'}><Icon as={MdPerson} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Profile</Link></li>
        <li><Link to={'/admin/marketplace'}><Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Marketplace</Link></li>
        <li><Link to={'/admin/exams'}><Icon as={MdAddTask} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Exams</Link></li>
        <li><Link to={'/admin/calendarevent'}><Icon as={MdOutlineEvent} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Events Calendar</Link></li>
        <li><Link to={'/admin/event'}><Icon as={MdOutlineMusicVideo} width='20px' height='20px' color='inherit' marginRight={'10px'} /> ElKindy Events</Link></li>
        <li><Link to={'/admin/products'}><Icon as={MdBarChart} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Products</Link></li>
        <li><Link to={'/admin/data-tables'}><Icon as={MdBarChart} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Data Tables</Link></li>
        <li><Link to={'/admin/users'}><Icon as={MdBarChart} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Users Tables</Link></li>
        <li><Link to={'/admin/course'}><Icon as={MdBarChart} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Courses Tables</Link></li>
        <li><Link to={'/admin/schedule'}><Icon as={MdBarChart} width='20px' height='20px' color='inherit' marginRight={'10px'} /> Schedule</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;