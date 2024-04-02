import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ScheduleComponent, Day, Week, Month, Agenda, Timezone, Inject, Resize, DragAndDrop,ExcelExport } from '@syncfusion/ej2-react-schedule';

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
import { Browser, extend } from '@syncfusion/ej2-base';
import { tz } from 'moment-timezone';
import moment from 'moment';
import axios from 'axios';

if (Browser.isIE) {
    Timezone.prototype.offset = (date, timezone) => {
        return tz.zone(timezone).utcOffset(date.getTime());
    };
}

const TimeZone = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/plannings/getallStudent');
        const formattedData = await Promise.all(response.data.map(async planning => {
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
        }));
        setData(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des plannings :", error);
      }
    };
  
    fetchPlannings();
  }, []);
  
    const scheduleObj = useRef(null);
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
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '18px' }}>

          </table>
          <ScheduleComponent style={{marginTop:100}} width='100%' height='650px' ref={scheduleObj} selectedDate={new Date()}  workHours={{ start: '11:00' }} eventSettings={{ dataSource: data,allowEditing: false ,allowAdding:false,allowDeleting:false }}   actionBegin={onActionBegin}>
            <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop,ExcelExport]}/>
          </ScheduleComponent>
        </div>
      </div>
    </div>);
};
export default TimeZone;
