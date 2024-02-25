import React from "react";
import { Link } from "react-router-dom";

const ServicesAreaItem = (props) => {
  return (
    <div
      className="services-item wow fadeInUp"
      data-wow-delay={`.${props.item.delay_time}s`}
    >
      <div className="services-icon">
        <img src={`/img/icon/services_icon0${props.index + 1}.png`} alt="" />
      </div>
      <div className="services-content">
        <h4 className="title">
          <Link to={props.item.url}>{props.item.title}</Link>
        </h4>
        <p>{props.item.desc}</p>
      </div>
    </div>
  );
};

export default ServicesAreaItem;
