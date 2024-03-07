import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

const InnerProjectAreaItem = ({ item }) => {
  return (
    <>
      <div className={cn("inner-project-item horizoital-item")}>
        <div className="inner-project-thumb">
          <Link to={item.url}>
            <img src={item.src1} alt="" />
          </Link>
        </div>

        <div className="inner-project-content">
          <h3 className="title">
            <Link to={item.url}>{item.title}</Link>
          </h3>
          <p>{item.desc}</p>
        </div>
      </div>

      <div className={cn("inner-project-item vertical-item")}>
        <div className="inner-project-thumb">
          <Link to={item.url}>
            <img src={item.src2} alt="" />
          </Link>
        </div>

        <div className="inner-project-content">
          <h3 className="title">
            <Link to={item.url}>{item.title}</Link>
          </h3>
          <p>{item.desc}</p>
        </div>
      </div>
    </>
  );
};

export default InnerProjectAreaItem;
