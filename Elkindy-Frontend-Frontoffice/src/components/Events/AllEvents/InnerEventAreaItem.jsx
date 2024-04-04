import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

const InnerEventAreaItem = ({ item }) => {
  return (
    <>
      

      <div className={cn("inner-project-item vertical-item")}>
        <div className="inner-project-thumb" style={{ maxHeight: "400px" }}>
          <Link to={item.url}>
            <img src={item.imageUrl} alt="" />
          </Link>
        </div>

        <div className="inner-project-content">
          <h3 className="title">
            <Link to={item.url}>{item.name}</Link>
          </h3>
          <p>{item.description}</p>
        </div>
      </div>
    </>
  );
};

export default InnerEventAreaItem;
