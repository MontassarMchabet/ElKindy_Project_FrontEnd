// // import React from 'react';

// // function LeftPanel() {
// //     return (
// //         <div className="left">
// //             <img src="img/bruno_mantovanicheloisa_bortz.jpeg" alt="" id="poster" />
// //             <div className="play">
// //                 <i className="bi bi-play-fill" id="play"></i>
// //             </div>
// //             <div className="cont">
// //             <h6>Directed by</h6>
// //                 <p>Atlee Kumar</p>
// //                 <h6>Starring</h6>
// //                 <p>	Shah Rukh Khan
// //                     Nayanthara
// //                     Vijay Sethupath</p>
// //                     <h6>Edited by</h6>
// //                     <p>	Ruben</p>
// //             </div>
// //         </div>
// //     );
// // }

// // export default LeftPanel;


import React, { useState , useEffect  } from 'react';
// import { getEventById } from "../../../services/eventsApi";
import { getEventById } from "../../services/eventsApi";
import { useParams } from "react-router-dom";

const LeftPanel = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    // const handlePlayButtonClick = () => {
    //     const video = document.getElementById('video');
    //     const playBtn = document.getElementById('play');

    //     if (!isPlaying) {
    //         video.play();
    //         playBtn.classList.remove('bi-play-fill');
    //         playBtn.classList.add('bi-pause');
    //         setIsPlaying(true);
    //     } else {
    //         video.pause();
    //         playBtn.classList.remove('bi-pause');
    //         playBtn.classList.add('bi-play-fill');
    //         setIsPlaying(false);
    //     }
    // };
    const handlePlayButtonClick = () => {
        const video = document.getElementById('video');
        const playBtn = document.getElementById('play');

        if (video.paused) {
            video.play();
            video.style.display = 'unset';
            // video.style.position = 'fixed';
            playBtn.classList.remove('bi-play-fill');
            playBtn.classList.add('bi-pause');
        
        } else {
            video.pause();
            video.style.display = 'none';
            playBtn.classList.add('bi-play-fill');
            playBtn.classList.remove('bi-pause');
        }
    };
    const [eventDetails, setEventDetails] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEventDetails(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);
console.log("evenementttttttt",eventId)

    return (
        // <div className="left">
            
        //   <img src="img/bruno_mantovanicheloisa_bortz.jpeg" alt="" id="poster" />

            
        //     <div className="play" onClick={handlePlayButtonClick}>
        //         <i className={isPlaying ? "bi bi-pause" : "bi bi-play-fill"} id="play"></i>
        //     </div>
            
        //     <div className="cont">
        //         <h6>Directed by</h6>
        //         <p>Atlee Kumar</p>
        //         <h6>Starring</h6>
        //         <p>Shah Rukh Khan, Nayanthara, Vijay Sethupath</p>
        //         <h6>Edited by</h6>
        //         <p>Ruben</p>
        //     </div>
        // </div>
        <div className="left">
            {eventDetails && (
                <div>
                    <img src={eventDetails.imageUrl} alt="" id="poster" />
                    <div className="play" onClick={handlePlayButtonClick}>
                        <i className={isPlaying ? "bi bi-pause" : "bi bi-play-fill"}></i>
                    </div>
                

                    <div className="cont">
                        <h6>Event</h6>
                        <p>{eventDetails.name}</p>
                        <h6>Details</h6>
                        <p>{eventDetails.desciption}</p>
                        <h6>By</h6>
                        <p>Elkindy</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeftPanel;


// import React, { useState, useEffect } from 'react';
// import { getEventById } from "../../services/eventsApi";
// import { useParams } from "react-router-dom";

// const LeftPanel = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [eventDetails, setEventDetails] = useState(null);
//     const { eventId } = useParams();

//     const handlePlayButtonClick = () => {
//         setIsPlaying(prevState => !prevState);
//     };

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const eventData = await getEventById(eventId);
//                 setEventDetails(eventData);
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//             }
//         };

//         fetchEventDetails();
//     }, [eventId]);

//     return (
//         <div className="left">
//             {eventDetails && (
//                 <div>
//                     <img src={eventDetails.imageUrl} alt="" id="poster" />
//                     <div className="play" onClick={handlePlayButtonClick}>
//                         <i className={isPlaying ? "bi bi-pause" : "bi bi-play-fill"}></i>
//                     </div>
//                     <div className="cont">
//                         <h6>Event</h6>
//                         <p>{eventDetails.name}</p>
//                         <h6>Details</h6>
//                         <p>{eventDetails.description}</p>
//                         <h6>By</h6>
//                         <p>Elkindy</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LeftPanel;
