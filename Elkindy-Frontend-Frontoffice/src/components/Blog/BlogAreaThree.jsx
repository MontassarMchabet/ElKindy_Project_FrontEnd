import React from "react";
import BlogAreaThreeItem from "./BlogAreaThreeItem";
import { Link } from "react-router-dom";

const BlogAreaThree = () => {
  const blog_items = [
    {
      src: "/img/blog/image-16.jpg",
      url: "/blog-details",
      author: "Admin",
      date: "March 15, 2020",
      title: "International Piano Festival Workshop",
      desc: ``,
    },
    {
      src: "/img/blog/image-15.jpg",
      url: "/blog-details",
      author: "Admin",
      date: "December 5, 2019",
      title: "Guitar Workshop",
      desc: ``,
    },
    {
      src: "/img/blog/image-4-1.jpg",
      url: "/blog-details",
      author: "Admin",
      date: "December 10, 2019",
      title: "Percussion Workshop",
      desc: ``,
    },
  ];

  return (
    <section className="blog-area-two blog-area-three pt-110 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title title-style-two text-center mb-60">
              <span className="sub-title">Blog & Article</span>
              <h2 className="title">Latest News</h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {blog_items.map((x, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-10">
              <BlogAreaThreeItem item={x} />
            </div>
          ))}
        </div>

        <div className="read-more-btn text-center mt-30">
          <Link to="/blog" className="btn">
            Read More <span></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogAreaThree;
