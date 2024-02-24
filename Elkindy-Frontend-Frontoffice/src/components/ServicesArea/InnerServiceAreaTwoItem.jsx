import React from "react";
import { Link } from "react-router-dom";

const InnerServiceAreaTwoItem = ({ item }) => {
  return (
    <>
      <div className="services-item-five">
        <div className="services-icon-five">
          <img src={item.src} alt="" />
        </div>

        <div className="services-content-five">
          <h2 className="title">
            <Link to={item.url}>
              {item.titles[0]} <span>{item.titles[1]}</span>
            </Link>
          </h2>

          <p>
            {item.desc}
          </p>
        </div>
      </div>
    </>
  );
};

export default InnerServiceAreaTwoItem;
