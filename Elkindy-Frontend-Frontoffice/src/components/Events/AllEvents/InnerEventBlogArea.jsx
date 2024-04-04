
// import React, { useEffect, useState } from "react";
// import EventBlogItem from "./EventBlogItem";
// import EventBlogPagination from "./EventBlogPagination";
// import { getAllEvents } from "../../../services/eventsApi";

// const InnerEventBlogArea = () => {
//   const blog_items = [
//     {
//       url: "/blog-details",
//       src: "/img/blog/inner_blog_img01.jpg",
//       tag: "Sector",
//       reading_time: "5 Min",
//       created_at: "March 17, 2022",
//       author: "Victor Pacheco",
//       title: "How to Post a Classified Ad Online or in Newspapers",
//       desc: `Lorem ipsum dolor sit amet, sed nulla ante amet, elementum tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac scelerisque nibh dolores consectetuer, nulla aptent est pede. Scelerisque euismod varius mi, congue eget sed vestibulum, ornare cras sed nec.`,
//     },
//   ];
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await getAllEvents();
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <section className="inner-blog-area pb-120">
//       <div className="container">
//         <div className="row justify-content-center">
//           {blog_items.map((x, index) => (
//             <div key={index} className="col-lg-4 col-md-6 mb-30">
//               <EventBlogItem item={x} />
//             </div>
//           ))}
//         </div>
//         {/* pagination */}
//         <EventBlogPagination />
//       </div>
//     </section>
//   );
// };

// export default InnerEventBlogArea;

import React, { useEffect, useState } from "react";
import EventBlogItem from "./EventBlogItem";
import EventBlogPagination from "./EventBlogPagination";
import { getAllEvents } from "../../../services/eventsApi";

const InnerEventBlogArea = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <section className="inner-blog-area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          {events.map((event, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-30">
              <EventBlogItem item={event} />
            </div>
          ))}
        </div>
        {/* pagination */}
        <EventBlogPagination />
      </div>
    </section>
  );
};

export default InnerEventBlogArea;
