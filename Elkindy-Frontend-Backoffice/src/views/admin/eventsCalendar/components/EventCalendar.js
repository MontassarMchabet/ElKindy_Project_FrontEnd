import Card from "components/card/Card";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
  return (<>

                <Card>
                <div className="App" style={{ padding: "14px" }}>
                  <Calendar
                    localizer={localizer}
                    startAccessor={"start"}
                    events={events}
                    endAccessor={"end"}
                    style={{
                      height: "1000px",
                    }}
                    eventPropGetter={(event) => {
                      return {
                        style: {
                          backgroundColor: event.color,
                        },
                      };
                    }}
                    onSelectEvent={(event) => alert(event.title)}
                    views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                  />
                </div>
                
                </Card>
                </>
  );
}

export default App;