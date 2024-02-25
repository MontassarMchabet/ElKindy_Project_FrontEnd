import React from "react";
import { Link } from "react-router-dom";

const BlogAreaThreeItem = (props) => {
  return (
    <div className="blog-item-two blog-item-three">
      <div className="blog-thumb-two">
        <Link to={props.item.url}>
          <img src={props.item.src} alt="" />
        </Link>
      </div>
      <div className="blog-content-two">
        <div className="blog-meta">
          <ul className="list-wrap">
            <li>
              <i className="fal fa-user" />
              <Link to={props.item.url}>{props.item.author}</Link>
            </li>
            <li>
              <i className="fal fa-calendar" />
              {props.item.date}
            </li>
          </ul>
        </div>
        <h2 className="title">
          <Link to={props.item.url}>{props.item.title}</Link>
        </h2>
      </div>
    </div>
  );
};

export default BlogAreaThreeItem;
