
import React from "react";
import { Link } from "react-router-dom";

const EventItem = ({ item }) => {
  return (
    <div className="inner-blog-item-1">
      <Link to={`/events/${item._id}`} className="inner-blog-thumb">
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
          <Link to={`/events/${item._id}`}>{item.name}</Link>
        </h2>

        <p>{item.description}</p>
        <ul>

          <Link to={`/events/${item._id}`} className="rade-more-btn">
            Read More
          </Link>

          <button className="button-book-ticket" style={{color:'white'}} ><Link to={`/events/${item._id}/${item.name}/bookTickets`}>
          Book Ticket
          </Link></button>{' '}

        </ul>


      </div>
    </div>
  );
};

export default EventItem;
