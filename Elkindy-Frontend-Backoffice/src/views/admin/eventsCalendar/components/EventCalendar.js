// import Card from "components/card/Card";
// import React from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// const localizer = momentLocalizer(moment);

// function App(props) {
//   const { eventsData } = props;
 

//   const events = eventsData.map((event) => {
//     // new Date(Y, M, D, H, MIN)
//     return {
//       title: event.name,
//       start: new Date(event.startDate),
//       end: new Date(event.endDate),
//       color: "#4169E1",
//     };
//   });
//   return (<>

//                 <Card>
//                 <div className="App" style={{ padding: "14px" }}>
//                   <Calendar
//                     localizer={localizer}
//                     startAccessor={"start"}
//                     events={events}
//                     endAccessor={"end"}
//                     style={{
//                       height: "1000px",
//                     }}
//                     eventPropGetter={(event) => {
//                       return {
//                         style: {
//                           backgroundColor: event.color,
//                         },
//                       };
//                     }}
//                     onSelectEvent={(event) => alert(event.title)}
//                     views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
//                   />
//                 </div>
                
//                 </Card>
//                 </>
//   );
// }

// export default App;
import Card from "components/card/Card";
import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from 'sweetalert2'
const localizer = momentLocalizer(moment);

function App(props) {
  const { eventsData } = props;
 

  const events = eventsData.map((event) => {
    // new Date(Y, M, D, H, MIN)
    return {
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      color: "#4169E1",
    };
  });
const handleEventClick = (event) => {
  Swal.fire({
    title: event.title,
    width: 600,
    padding: "3em",
    color: "#4169E1",
    background: "#fff",
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://th.bing.com/th/id/R.4dd2737005d538ff7e29530c66cd9640?rik=7LTnO%2bP1i%2f4pIQ&riu=http%3a%2f%2flepassetempsderose.l.e.pic.centerblog.net%2f5ba24276.gif&ehk=QLnEiEpDW3m%2bVzQYvPdNsj23XwXlsc3sILBETy6gPI0%3d&risl=1&pid=ImgRaw&r=0")
      left top
      no-repeat 
    `,
  });
};
  return (<>

                <Card>
                <div className="App" style={{ padding: "14px" }}>
                  <Calendar
                    localizer={localizer}
                    startAccessor={"start"}
                    events={events}
                    endAccessor={"end"}
                    style={{
                      height: "550px",
                    }}
                    eventPropGetter={(event) => {
                      return {
                        style: {
                          backgroundColor: event.color,
                        },
                      };
                    }}
                    onSelectEvent={handleEventClick}
                    views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                  />
                </div>
                
                </Card>
                </>
  );
}

export default App;
