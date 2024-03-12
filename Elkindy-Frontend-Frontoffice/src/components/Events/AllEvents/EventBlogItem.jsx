// import React from "react";
// import { Link } from "react-router-dom";

// const BlogItem = ({ item }) => {
//   return (
//     <div className="inner-blog-item-1">
//       <div className="inner-blog-thumb">
//         <Link to={item.url}>
//           <img src={item.imageUrl} alt="" />
//         </Link>
//       </div>

//       <div className="inner-blog-content">
//         <div className="blog-meta-two">
//           <ul className="list-wrap">
//             <li className="tag">
//               <Link to="/events">{item.tag}</Link>
//             </li>

//             <li>
//               <i className="fal fa-clock"/>{item.startDate}
//             </li>

//             <li>
//               <i className="fal fa-calendar"></i>{item.endDate}
//             </li>

//             <li>
//               By <Link to="/events">{item.author}</Link>
//             </li>
//           </ul>
//         </div>

//         <h2 className="title">
//           <Link to={item.url}>
//             {item.name}
//           </Link>
//         </h2>

//         <p>
//           {item.description}
//         </p>

//         <Link to={item.url} className="rade-more-btn">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogItem;
// import React from "react";
// import { Link } from "react-router-dom";

// const EventItem = ({ item }) => {
//   return (
//     <div className="inner-blog-item-1">
//       <div className="inner-blog-thumb">
//         <Link to={item.url}>
//           <img src={item.imageUrl} alt="" style={{ width: "100%", height: "auto" }} /> {/* Assurez-vous que les dimensions des images sont uniformes */}
//         </Link>
//       </div>

//       <div className="inner-blog-content">
//         <div className="blog-meta-two">
//           <ul className="list-wrap">
//             <li className="tag">
//               <Link to="/events">{item.tag}</Link>
//             </li>

//             <li>
//               <i className="fal fa-clock"/>{item.startDate}
//             </li>

//             <li>
//               <i className="fal fa-calendar"></i>{item.endDate}
//             </li>

//             <li>
//               By <Link to="/events">{item.author}</Link>
//             </li>
//           </ul>
//         </div>

//         <h2 className="title">
//           <Link to={item.url}>
//             {item.name}
//           </Link>
//         </h2>

//         <p>
//           {item.description}
//         </p>

//         <Link to={item.url} className="rade-more-btn">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default EventItem;
import React from "react";
import { Link } from "react-router-dom";

const EventItem = ({ item }) => {
  return (
    <div className="inner-blog-item-1">
      <Link to={item.url} className="inner-blog-thumb">
        <img src={item.imageUrl} alt="" style={{ width: "450px", height: "225px" }} />
      </Link>

      <div className="inner-blog-content">
        <div className="blog-meta-two">
          <ul className="list-wrap">
            <li className="tag">
              <Link to="/events">Event</Link>
            </li>
            <li>
              <i className="fal fa-clock"></i> {new Date(item.startDate).toLocaleString('tn-TN', {

                hour: 'numeric',
                minute: 'numeric'

              })}
            </li>
            <li>
              <i className="fal fa-calendar" color="bleu"></i> {new Date(item.startDate).toLocaleString('tn-TN', {

                year: 'numeric',
                month: 'long',
                day: 'numeric',


              })}
            </li>
            <li>
              By <Link to="/events">ELKINDY</Link>
            </li>
          </ul>
        </div>

        <h2 className="title">
          <Link to={item.url}>{item.name}</Link>
        </h2>

        <p>{item.description}</p>
        <ul>

          <Link to="/events/1" className="rade-more-btn">
            Read More
          </Link>

          <button variant="primary">Reserve Ticket</button>{' '}

        </ul>


      </div>
    </div>
  );
};

export default EventItem;
