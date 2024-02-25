import React from "react";
import { Link } from "react-router-dom";

const ServiceAreaThreeItem = (props) => {
  return (
    <div className="services-item-three">
      <div className="services-icon-three">
        <img src={props.item.src} alt="" />
      </div>

      <div className="services-content-three">
        <h3 className="title">
          <Link to={props.item.url}>{props.item.title}</Link>
        </h3>

        <p>{props.item.desc}</p>

        <Link to={props.item.url} className="link-btn">
          Learn More <i className="fal fa-long-arrow-right" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceAreaThreeItem;
