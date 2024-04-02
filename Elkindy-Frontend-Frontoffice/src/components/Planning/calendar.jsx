
import './index.css';
import * as React from 'react';
import { useEffect, useRef,useState } from 'react';
import { ScheduleComponent, Day,Agenda , Month, Inject, Resize, DragAndDrop, ToolbarItemsDirective, ExcelExport, Week } from '@syncfusion/ej2-react-schedule';
//import { applyCategoryColor } from './helper';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import moment from 'moment';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import Cookies from 'js-cookie';

const HeaderBar = () => {
    let scheduleObj = useRef(null);
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const storedToken = Cookies.get('token');
          const storedRefreshToken = Cookies.get('refreshToken');
          const decodedToken = jwtDecode(storedToken);
          const { userId, role } = decodedToken;
  
          const response = await axios.get(`http://localhost:9090/api/auth/user/${userId}`);
          setUser(response.data);
          if(response.data.role==="client"){
            const response = await axios.get('http://localhost:9090/api/plannings/getall');
    
          const formattedData = await Promise.all(response.data.map(async planning => {
            if (planning.type === "instrument") {
              //const studentResponse = await axios.get(`http://localhost:9090/api/auth/user/${planning.studentIds}`);
              const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
              return {
                ...planning,
                StartTime: moment(planning.date).set({
                  hour: moment(planning.startDate, 'HH:mm').hour(),
                  minute: moment(planning.startDate, 'HH:mm').minute(),
                }).toDate(),
                EndTime: moment(planning.date).set({
                  hour: moment(planning.endDate, 'HH:mm').hour(),
                  minute: moment(planning.endDate, 'HH:mm').minute(),
                }).toDate(),
                Subject: "seance instrument",
                Location: RoomResponse.data.room_number
              };
            } else {
              const studentResponse = await axios.get(`http://localhost:9090/api/classroom/getById/${planning.classroomId}`);
              const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
              return {
                ...planning,
                StartTime: moment(planning.date).set({
                  hour: moment(planning.startDate, 'HH:mm').hour(),
                  minute: moment(planning.startDate, 'HH:mm').minute(),
                }).toDate(),
                EndTime: moment(planning.date).set({
                  hour: moment(planning.endDate, 'HH:mm').hour(),
                  minute: moment(planning.endDate, 'HH:mm').minute(),
                }).toDate(),
                Subject: studentResponse.data.name,
                Location: RoomResponse.data.room_number
              };
            }
          }));
    
          // Filtrer les éléments null de formattedData
          const filteredData = formattedData.filter(item => item !== null);
    
          setData(filteredData);
          }
          if(response.data.role==="prof"){
            const response = await axios.get(`http://localhost:9090/api/plannings/getByTeacherId/${userId}`);
    
          const formattedData = await Promise.all(response.data.map(async planning => {
            if (planning.type === "instrument") {
              const studentResponse = await axios.get(`http://localhost:9090/api/auth/user/${planning.studentIds}`);
              const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
              return {
                ...planning,
                StartTime: moment(planning.date).set({
                  hour: moment(planning.startDate, 'HH:mm').hour(),
                  minute: moment(planning.startDate, 'HH:mm').minute(),
                }).toDate(),
                EndTime: moment(planning.date).set({
                  hour: moment(planning.endDate, 'HH:mm').hour(),
                  minute: moment(planning.endDate, 'HH:mm').minute(),
                }).toDate(),
                Subject: `${studentResponse.data.name} ${studentResponse.data.lastname}`,
                Location: RoomResponse.data.room_number
              };
            } else {
              const ClassroomResponse = await axios.get(`http://localhost:9090/api/classroom/getById/${planning.classroomId}`);
              const RoomResponse = await axios.get(`http://localhost:9090/api/Room/getById/${planning.roomId}`);
              return {
                ...planning,
                StartTime: moment(planning.date).set({
                  hour: moment(planning.startDate, 'HH:mm').hour(),
                  minute: moment(planning.startDate, 'HH:mm').minute(),
                }).toDate(),
                EndTime: moment(planning.date).set({
                  hour: moment(planning.endDate, 'HH:mm').hour(),
                  minute: moment(planning.endDate, 'HH:mm').minute(),
                }).toDate(),
                Subject: ClassroomResponse.data.name,
                Location: RoomResponse.data.room_number
              };
            }
          }));
    
          // Filtrer les éléments null de formattedData
          const filteredData = formattedData.filter(item => item !== null);
    
          setData(filteredData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }, []);
 

    const onActionBegin = (args) => {
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick.bind(this)
            };
            args.items.push(exportItem);
        }
    };
    const onExportClick = () => {
        const exportFields = [
            { name: 'Id', text: 'Id' },
            { name: 'Subject', text: 'Summary' },
            { name: 'StartTime', text: 'Start Date' },
            { name: 'EndTime', text: 'End Date' },
            { name: 'Location', text: 'Place' }
        ];
        const exportValues = { fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
    };
    return (<div className='schedule-control-section'>
    <div className='col-lg-12 control-section'>
      <div className='control-wrapper'>
      
        <ScheduleComponent style={{marginLeft:50,marginRight:50,marginBottom:50}} height='650px'    ref={scheduleObj} selectedDate={new Date()}  startHour='09:00' endHour='24:00' eventSettings={{ dataSource: data,allowEditing: false ,allowAdding:false,allowDeleting:false }}   actionBegin={onActionBegin}>
          <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop,ExcelExport]}/>
        </ScheduleComponent>
      </div>
    </div>
  </div>);
};
export default HeaderBar;

