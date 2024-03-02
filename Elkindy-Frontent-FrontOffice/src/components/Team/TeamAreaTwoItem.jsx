import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

const TeamAreaTwoItem = ({ item, className }) => {
  return (
    <div className={cn("team-item", className)}>
      <div className="team-thumb">
        <Link to={item.url}>
          <img src={item.src} alt="" />
        </Link>
      </div>

      <div className="team-content">
        <h2 className="title">
          <Link to={item.url}>{item.title}</Link>
        </h2>

        <span>{item.designation}</span>

        <div className="team-social">
          <ul className="list-wrap">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-behance"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamAreaTwoItem;
