import React from "react";
import { Link } from "react-router-dom";

const BlogAreaTwoItem = (props) => {
  return (
    <div className="blog-item-two">
      <div className="blog-thumb-two">
        <Link to={props.item.url}>
          <img src={props.item.src} alt="" />
        </Link>

        <h5 className="date">
          {props.item.date.day} <span>{props.item.month}</span>
        </h5>
      </div>

      <div className="blog-content-two">
        <Link to="/blog" className="tag">
          {props.item.tag}
        </Link>
        <h2 className="title">
          <Link to={props.item.url}>{props.item.title}</Link>
        </h2>
        <p>
          {props.item.desc}...
          <Link to={props.item.url}>Read More</Link>
        </p>
      </div>
    </div>
  );
};

export default BlogAreaTwoItem;
