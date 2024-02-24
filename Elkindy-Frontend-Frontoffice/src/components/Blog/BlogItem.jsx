import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ item }) => {
  return (
    <div className="inner-blog-item">
      <div className="inner-blog-thumb">
        <Link to={item.url}>
          <img src={item.src} alt="" />
        </Link>
      </div>

      <div className="inner-blog-content">
        <div className="blog-meta-two">
          <ul className="list-wrap">
            <li className="tag">
              <Link to="/blog">{item.tag}</Link>
            </li>

            <li>
              <i className="fal fa-clock"/>{item.reading_time}
            </li>

            <li>
              <i className="fal fa-calendar"></i>{item.created_at}
            </li>

            <li>
              By <Link to="/blog">{item.author}</Link>
            </li>
          </ul>
        </div>

        <h2 className="title">
          <Link to={item.url}>
            {item.title}
          </Link>
        </h2>

        <p>
          {item.desc}
        </p>

        <Link to={item.url} className="rade-more-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
