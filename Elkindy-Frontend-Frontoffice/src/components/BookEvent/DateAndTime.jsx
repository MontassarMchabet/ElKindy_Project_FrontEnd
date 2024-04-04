// import React, { useState } from 'react';

// function DateAndTime() {
//     return (
//         <div className="date_type">
//                 <div className="left_card">
//                     <h6 className="title">Thursday 4 May</h6>
//                     <div className="card_month crd">
//                         <li>
//                             <h6>Mon</h6>
//                             <h6 className="date_point">20</h6>
//                         </li>
//                         <li>
//                             <h6>Tue</h6>
//                             <h6 className="date_point">21</h6>
//                         </li>
//                         <li>
//                             <h6>Wed</h6>
//                             <h6 className="date_point">22</h6>
//                         </li>
//                         <li>
//                             <h6>Thu</h6>
//                             <h6 className="date_point">23</h6>
//                         </li>
//                         <li>
//                             <h6>Fri</h6>
//                             <h6 className="date_point">24</h6>
//                         </li>
//                         <li>
//                             <h6>Sat</h6>
//                             <h6 className="date_point">25</h6>
//                         </li>
//                         <li>
//                             <h6>Sun</h6>
//                             <h6 className="date_point">26</h6>
//                         </li>
//                         <li>
//                             <h6>Mon</h6>
//                             <h6 className="date_point">27</h6>
//                         </li>
//                         <li>
//                             <h6>Tue</h6>
//                             <h6 className="date_point">28</h6>
//                         </li>
//                         <li>
//                             <h6>Wed</h6>
//                             <h6 className="date_point">29</h6>
//                         </li>
//                         <li>
//                             <h6>Thu</h6>
//                             <h6 className="date_point">30</h6>
//                         </li>
//                         <li>
//                             <h6>Fri</h6>
//                             <h6 className="date_point">1</h6>
//                         </li>
//                         <li>
//                             <h6>Sat</h6>
//                             <h6 className="date_point">2</h6>
//                         </li>
//                         <li>
//                             <h6>Sun</h6>
//                             <h6 className="date_point">3</h6>
//                         </li>
//                     </div>
//                 </div>
//                 <div className="right_card">
//                     <h6 className="title">Show Time</h6>
//                     <div className="card_month crd">
//                         <li>
//                             <h6>2D</h6>
//                             <h6>10:00</h6>
//                         </li>
//                         <li>
//                             <h6>2D</h6>
//                             <h6>12:30</h6>
//                         </li>
//                         <li>
//                             <h6>2D</h6>
//                             <h6>14:00</h6>
//                         </li>
//                         <li>
//                             <h6>2D</h6>
//                             <h6>17:00</h6>
//                         </li>
//                         <li>
//                             <h6>2D</h6>
//                             <h6>18:00</h6>
//                         </li>
//                         <li>
//                             <h6>3D</h6>
//                             <h6>20:00</h6>
//                         </li>
//                         <li>
//                             <h6>3D</h6>
//                             <h6>10:00</h6>
//                         </li>
//                         <li>
//                             <h6>4DX</h6>
//                             <h6>21:00</h6>
//                         </li>
//                         <li>
//                             <h6>4DX</h6>
//                             <h6>22:30</h6>
//                         </li>
//                         <li>
//                             <h6>4DX</h6>
//                             <h6 className="h6_active">12:00</h6>
//                         </li>
//                         <li>
//                             <h6>4DX</h6>
//                             <h6>12:30</h6>
//                         </li>
//                     </div>
//                 </div>
//             </div>
//     );
// }

// export default DateAndTime;






// import React, { useEffect } from 'react';

// function DateAndTime() {
//     useEffect(() => {
//         const date = new Date();
//         const main_date = date.getDate();

//         Array.from(document.getElementsByClassName('date_point')).forEach((el) => {
//             if (parseInt(el.innerText) === main_date) {
//                 el.classList.add('h6_active');
//             }
//         });
//     }, []); // Utilisation d'un tableau vide pour s'assurer que useEffect ne s'exécute qu'une seule fois

//     return (
//         <div className="date_type">
//             <div className="left_card">
//                 <h6 className="title">Thursday 4 May</h6>
//                 <div className="card_month crd">
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Mon</h6>
//                         <h6 className="date_point" style={{ color: 'white', fontSize: '12px' }}>20</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Tue</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">21</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Wed</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">22</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Thu</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">23</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Fri</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">24</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Sat</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">25</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Sun</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">26</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Mon</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">27</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Tue</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">28</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Wed</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">29</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Thu</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">30</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Fri</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">1</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Sat</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">2</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>Sun</h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">3</h6>
//                     </li>
//                 </div>
//             </div>
//             <div className="right_card">
//                 <h6 className="title">Show Time</h6>
//                 <div className="card_month crd">
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>08:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>09:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>10:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>11:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>12:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>13:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>14:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>15:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>16:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }} className="h6_active">17:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>18:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>19:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>20:00</h6>
//                     </li>
//                     <li>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                         <h6 style={{ color: 'white', fontSize: '12px' }}>21:00</h6>
//                     </li>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DateAndTime;





// ****ghata hedhi =>
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';


// function DateAndTime({ eventDetails }) {
//     const [eventDetails, setEventDetails] = useState(null);
//     const { eventId } = useParams();
//     const [mainDate, setMainDate] = useState(null);

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const eventData = await getEventById(eventId);
//                 setEventDetails(eventData);
//                 setMainDate(new Date(eventData.StartDate).getDate());
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//             }
//         };

//         fetchEventDetails();
//     }, [eventId]);
//     function DateAndTime() {
//             useEffect(() => {

//                 const main_date = mainDate;

//                 Array.from(document.getElementsByClassName('date_point')).forEach((el) => {
//                     if (parseInt(el.innerText) === main_date) {
//                         el.classList.add('h6_active');
//                     }
//                 });
//             }, []); // Utilisation d'un tableau vide pour s'assurer que useEffect ne s'exécute qu'une seule fois

//     console.log('dateeee')
//     return (
//         <div className="date_type">
//             <div className="left_card">
//                 <h6 className="title">Thursday 4 May</h6>

//                 <div className="card_month crd">
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Mon</h6>
//                          <h6 className="date_point" style={{ color: 'white', fontSize: '12px' }}>20</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Tue</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">21</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Wed</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">22</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Thu</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">23</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Fri</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">24</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Sat</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">25</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Sun</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">26</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Mon</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">27</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Tue</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">28</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Wed</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">29</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Thu</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">30</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Fri</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">1</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Sat</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">2</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>Sun</h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="date_point">3</h6>
//                      </li>
//                  </div>

//             </div>
//             <div className="right_card">
//                 <h6 className="title">Show Time</h6>
//                 <div className="card_month crd">
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>08:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>09:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>10:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>11:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>12:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>13:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>14:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>15:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>16:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }} className="h6_active">17:00</h6>
//                      </li>
//                      <li>
//                        <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>18:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>19:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>20:00</h6>
//                      </li>
//                      <li>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
//                          <h6 style={{ color: 'white', fontSize: '12px' }}>21:00</h6>
//                      </li>
//                  </div>
//             </div>
//         </div>
//     );
// }

// export default DateAndTime;
// *********
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../../services/eventsApi'; // Assurez-vous d'importer depuis le bon emplacement

function DateAndTime() {
    const [eventDetails, setEventDetails] = useState(null);
    const { eventId } = useParams();
    const [mainDate, setMainDate] = useState(null);
    const [mainHour, setMainHour] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventData = await getEventById(eventId);
                setEventDetails(eventData);
                setMainDate(new Date(eventData.startDate).getDate());
                const hour = new Date(eventData.startDate).getHours();
                const minute = new Date(eventData.startDate).getMinutes();
                const hourMinute = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                setMainHour(hourMinute);
                console.log('startDate', new Date(eventData.StartDate).getDate())
                console.log('starhourrr', mainHour)
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    useEffect(() => {
        
        Array.from(document.getElementsByClassName('date_point')).forEach((el) => {
            if (parseInt(el.innerText) === mainDate) {
                el.classList.add('h6_active');
            }
        });
    }, []);
    useEffect(() => {
        

        Array.from(document.getElementsByClassName('hour_point')).forEach((el) => {
            if (parseInt(el.innerText) === mainHour) {
                el.classList.add('h6_active');
            }
        });
    }, []);
    
    return (
        <div>
            {eventDetails && (

                <div className="date_type">

                    <div className="left_card">
                        <h6 className="title">{new Date(eventDetails.startDate).toLocaleString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',

                        })}</h6>


                        <div className="card_month crd">
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>1</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>2</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>3</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>4</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>5</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>6</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>7</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>8</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>9</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>10</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>11</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>12</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>13</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>14</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>15</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>16</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>17</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>18</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>19</h6>
                            </li>
                            <li>

                                <h6 className="date_point" style={{ color: 'white', fontSize: '13px' }}>20</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">21</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">22</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">23</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">24</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">25</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">26</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">27</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">28</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">29</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">30</h6>
                            </li>
                            <li>

                                <h6 style={{ color: 'white', fontSize: '13px' }} className="date_point">31</h6>
                            </li>

                        </div>


                    </div>
                    <div className="right_card">
                        <h6 className="title">Show Time</h6>

                        <div className="card_month crd">
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>08:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>09:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>04:50</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>10:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>11:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>12:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>13:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>14:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>15:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>16:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }} >17:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>18:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>19:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>20:00</h6>
                            </li>
                            <li>
                                <h6 style={{ color: 'white', fontSize: '12px' }}> </h6>
                                <h6 className="hour_point" style={{ color: 'white', fontSize: '12px' }}>21:00</h6>
                            </li>
                        </div>

                    </div>
                </div>
            )};
        </div>
    );
}

export default DateAndTime;
