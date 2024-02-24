import React from "react";
import { Link } from "react-router-dom";

const InnerServicesAreaItem = ({ item }) => {
  return (
    <div className="services-item-four">
      <div className="services-icon-four">
        <img src={item.src} alt="" />
      </div>
      <div className="services-content-four">
        <h2 className="title">
          <Link to={item.url}>{item.title}</Link>
        </h2>
        <p>{item.desc}</p>
      </div>
    </div>
  );
};

export default InnerServicesAreaItem;
