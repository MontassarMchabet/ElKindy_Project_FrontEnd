import React from "react";
import { Link } from "react-router-dom";

const BlogSectors = () => {
  const sectors = [
    {
      url: "/blog-dtails",
      src: "/img/blog/rc_post_img01.jpg",
      tag: "Sector",
      reading_time: "5 Min",
      title: "Skello launches electronic signature",
    },
    {
      url: "/blog-dtails",
      src: "/img/blog/rc_post_img02.jpg",
      tag: "Our Team",
      reading_time: "5 Min",
      title: "Skello launches electronic signature",
    },
    {
      url: "/blog-dtails",
      src: "/img/blog/rc_post_img03.jpg",
      tag: "Solution",
      reading_time: "5 Min",
      title: "Skello launches electronic signature",
    },
  ];

  return (
    <div className="rc-post-wrap">
      {sectors.map((x, index) => (
        <div key={index} className="rc-post-item">
          <div className="thumb">
            <Link to={x.url}>
              <img src={x.src} alt="" />
            </Link>
          </div>
          <div className="content">
            <div className="blog-meta-two">
              <ul className="list-wrap">
                <li className="tag">
                  <Link to="/blog">{x.tag}</Link>
                </li>
                <li>
                  <i className="fal fa-clock" />
                  {x.reading_time}
                </li>
              </ul>
            </div>
            <h4 className="title">
              <Link to={x.url}>{x.title}</Link>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSectors;
