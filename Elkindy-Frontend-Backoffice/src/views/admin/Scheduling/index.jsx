import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../node_modules/@syncfusion/ej2/material.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
const App = () => {
    const data = [
        {
            Id: 2,
            Subject: 'Meeting',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 15, 12, 30),
            IsAllDay: false,
            Status: 'Completed',
            Priority: 'High'
        },
    ];
    const fieldsData = {
        id: 'Id',
        subject: { name: 'Subject' },
        isAllDay: { name: 'IsAllDay' },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' }
    }
    const eventSettings = { dataSource: data, fields: fieldsData }

    return (<ScheduleComponent height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={eventSettings}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>);
}
export default App;

document.addEventListener('DOMContentLoaded', () => {
  const container =document.getElementById("schedule");
  if (container) {
    ReactDOM.render(<App />,container);
  } else {
      console.error("Target container '#sample' is not found in the DOM.");
  }
});