import React from "react";
import { Link } from "react-router-dom";

const InnerServicesAreaItem = ({ item }) => {
  return (
    <div className="services-item-four" style={{ backgroundColor: "white", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}>
      {/* <div className="services-icon-four">
        <img src={item.src} alt="" />
      </div> */}
      <div className="services-content-four">
        <h2 className="title">
          <Link to={item.url}>{item.title}</Link>
        </h2>
        <p>{item.desc}</p>
      </div>

      <div className="content" style={{ marginTop: "30px" }}>
        <div className="blog-meta-two">
          <ul className="list-wrap">
            <li className="tag">
              <Link to="/blog">{item.tag}</Link>
            </li>
            <li>
              <i className="fal fa-clock" />
              {item.reading_time}
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default InnerServicesAreaItem;
