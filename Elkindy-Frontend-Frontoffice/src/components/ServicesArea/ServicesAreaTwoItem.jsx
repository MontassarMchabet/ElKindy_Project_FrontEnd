import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const ServicesAreaTwoItem = (props) => {
  useEffect(() => {
    $(".services-item-two").on("mouseenter", function () {
      $(this)
        .addClass("active")
        .parent()
        .siblings()
        .find(".services-item-two")
        .removeClass("active");
    });
  }, []);

  return (
    <div className="services-item-two">
      <div className="services-icon-two">
        <img src={props.item.src} alt="" />
      </div>
      <div className="services-content-two">
        <h2 className="title">
          <Link to={props.item.url}>{props.item.title}</Link>
        </h2>
        <p>{props.item.desc}</p>
      </div>
    </div>
  );
};

export default ServicesAreaTwoItem;
