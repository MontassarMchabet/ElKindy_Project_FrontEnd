import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

const CaseStudyItem = ({ item }) => {
  return (
    <div className={cn(item.colClassName)}>
      <div className="inner-project-item">
        <div className="inner-project-thumb">
          <Link to={item.url}>
            <img src={item.src} alt="" />
          </Link>
        </div>

        <div className="inner-project-content">
          <h3 className="title">
            <Link to={item.url}>{item.title}</Link>
          </h3>

          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyItem;
