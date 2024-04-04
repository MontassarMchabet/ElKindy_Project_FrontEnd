

// import React from "react";
// import InnerEventAreaItem from "./InnerEventAreaItem";
// import SlickSlider from "../../SlickSlider/SlickSlider";

// import { useSlickArrows } from "../../../lib/hooks/useSlickArrows";
// import cn from "classnames";
// import { Link } from "react-router-dom";

// const InnerEventArea = () => {
//   const inner_projects = [
//     {
//       url: "/project-details",
//       src1: "/img/project/inner_two_project01.jpg",
//       src2: "/img/project/inner_two_project02.jpg",
//       title: "Motion Design",
//       desc: "Lorem Ipsum is simply",
//     },
//     {
//       url: "/project-details",
//       src1: "/img/project/inner_two_project04.jpg",
//       src2: "/img/project/inner_two_project03.jpg",
//       title: "Motion Design",
//       desc: "Lorem Ipsum is simply",
//     },
//     {
//       url: "/project-details",
//       src1: "/img/project/inner_two_project05.jpg",
//       src2: "/img/project/inner_two_project06.jpg",
//       title: "Motion Design",
//       desc: "Lorem Ipsum is simply",
//     },
//     {
//       url: "/project-details",
//       src1: "/img/project/inner_two_project08.jpg",
//       src2: "/img/project/inner_two_project07.jpg",
//       title: "Motion Design",
//       desc: "Lorem Ipsum is simply",
//     },
//     {
//       url: "/project-details",
//       src1: "/img/project/inner_two_project09.jpg",
//       src2: "/img/project/inner_two_project10.jpg",
//       title: "Motion Design",
//       desc: "Lorem Ipsum is simply",
//     },
//     {
//       url: "/project-details",
//       src1: "/img/project/inner_two_project08.jpg",
//       src2: "/img/project/inner_two_project07.jpg",
//       title: "Motion Design",
//       desc: "Lorem Ipsum is simply",
//     },
//   ];

//   const slick_settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     arrows: true,
//     slidesToShow: 3, // Afficher jusqu'à 6 éléments par ligne
//     slidesToScroll: 1,
//     centerMode: false,
//     responsive: [
//       {
//         breakpoint: 1600,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 1400,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 767,
//         settings: {
//           slidesToShow: 1,
//           arrows: false,
//         },
//       },
//     ],
//   };

//   const { sliderRef, toNext, toPrev } = useSlickArrows();

//   return (
//     <section className="inner-projcet-area-two pt-120 ">

//       <div className="container-fluid p-0">
//         <div className="inner-projcet-wrap-two">
//           <SlickSlider settings={slick_settings} ref={sliderRef}>
//             {inner_projects.map((x, index) => (
//               <div key={index} className="inner-two-item">
//                 <InnerEventAreaItem item={x} />
//               </div>
//             ))}
//           </SlickSlider>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InnerEventArea;


import React, { useState, useEffect } from "react";
import InnerEventAreaItem from "./InnerEventAreaItem";
import SlickSlider from "../../SlickSlider/SlickSlider";
import { getAllEvents } from "../../../services/eventsApi"; // Importez les fonctions API pour récupérer les événements

import { useSlickArrows } from "../../../lib/hooks/useSlickArrows";
import cn from "classnames";
import { Link } from "react-router-dom";

const InnerEventArea = () => {
  const [events, setEvents] = useState([]);
  const { sliderRef, toNext, toPrev } = useSlickArrows();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const slick_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: true,
    slidesToShow: 3, // Afficher jusqu'à 6 éléments par ligne
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="inner-projcet-area-two pt-140 ">
      <div className="container-fluid p-0">
        <div className="inner-projcet-wrap-two">
          <SlickSlider settings={slick_settings} ref={sliderRef}>
            {events.map((event, index) => (
              <div key={index} className="inner-two-item">
                <InnerEventAreaItem item={event} />
              </div>
            ))}
          </SlickSlider>
        </div>
      </div>
    </section>
  );
};

export default InnerEventArea;
