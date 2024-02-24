import React from "react";
import BlogAreaTwoItem from "./BlogAreaTwoItem";

const BlogAreaTwo = () => {
  const blog_items = [
    {
      url: "/blog-details",
      date: {
        day: 27,
        month: "Nov",
      },
      src: "/img/blog/h2_blog_img01.jpg",
      tag: "Branding",
      title: "How To Create JavaScript Vanilla Gantt Chart: Adding",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took`,
    },
    {
      url: "/blog-details",
      date: {
        day: 27,
        month: "Nov",
      },
      src: "/img/blog/h2_blog_img02.jpg",
      tag: "Branding",
      title: "How To Create JavaScript Vanilla Gantt Chart: Adding",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took`,
    },
    {
      url: "/blog-details",
      date: {
        day: 27,
        month: "Nov",
      },
      src: "/img/blog/h2_blog_img03.jpg",
      tag: "Branding",
      title: "How To Create JavaScript Vanilla Gantt Chart: Adding",
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took`,
    },
  ];

  return (
    <section className="blog-area-two pt-110 pb-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title title-style-two white-title text-center mb-60">
              <span className="sub-title">My Blog</span>
              <h2 className="title">Recent blog post</h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {blog_items.map((x, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-10">
              <BlogAreaTwoItem item={x} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogAreaTwo;
