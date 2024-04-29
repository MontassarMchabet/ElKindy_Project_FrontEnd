import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdPages,
  MdOutlineCalendarMonth ,
  MdOutlinePages,
  MdEditCalendar ,
  MdAddTask,

  MdMapsHomeWork ,

  MdOutlineMusicNote,
  MdOutlineMusicVideo,
  MdOutlineEvent,
  MdOutlineShoppingBag,

} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Events from "views/admin/events";
import EventsCalendar from "views/admin/eventsCalendar";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import UserTables from "views/admin/userTables";
import Courses from "views/admin/courses";
import Scheduling from "views/admin/Scheduling";

import Planning from "views/admin/planning";
import ExamTables from "views/admin/examTables";
import TeacherScheduling from "views/admin/Scheduling/teacherScheduling";


import Tickets from "views/admin/tickets";
import productTable from "views/admin/productTable";
import ordersTable from "views/admin/ordersTable";


const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Marketplace",
    layout: "/admin",
    path: "/marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {

    name: "Exams",
    layout: "/admin",
    path: "/exams",
    icon: (
      <Icon as={MdAddTask} width='20px' height='20px' color='inherit' />
    ),
    component: ExamTables,


    }, 
  {

    name: " Events Calendar",
    layout: "/admin",
    path: "/calendarevent",
    icon: (
      <Icon
        as={MdOutlineEvent}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: EventsCalendar,
    secondary: true,
  },
  {

    name: " ElKindy Events",
    layout: "/admin",
    path: "/event",
    icon: (
      <Icon
        as={MdOutlineMusicVideo}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Events,
    secondary: true,

  },

  {
    name: "Products Table",
    layout: "/admin",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    path: "/products",
    component: productTable,

  },
  {
    name: "Orders Table",
    layout: "/admin",
    icon: (
      <Icon
        as={MdOutlineShoppingBag}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    path: "/orders",
    component: ordersTable,

  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Users Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/users",
    component: UserTables,
  },

  {
    name: "Room & Classroom",
    layout: "/admin",
    icon: <Icon as={MdMapsHomeWork } width='20px' height='20px' color='inherit' />,
    path: "/course",
    component: Courses,
  },
  {
    name: "Planning",
    layout: "/admin",
    icon: <Icon as={MdEditCalendar } width='20px' height='20px' color='inherit' />,
    path: "/planning",
    component:Planning ,
  },
  {
    name: "Sdudent Calendar",
    layout: "/admin",
    icon: <Icon as={MdOutlineCalendarMonth } width='20px' height='20px' color='inherit' />,
    path: "/schedule",
    component: Scheduling,
  },
  {
    name: "Teacher Calendar",
    layout: "/admin",
    icon: <Icon as={MdOutlineCalendarMonth } width='20px' height='20px' color='inherit' />,
    path: "/teachercalender",
    component: TeacherScheduling,
  },
  

  {
    layout: "/admin",
    path: "/:eventId/tickets",
    component: Tickets,
  }
  
  

];

export default routes;
