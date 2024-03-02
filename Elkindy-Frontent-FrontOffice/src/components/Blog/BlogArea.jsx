import React from "react";
import BlogAreaItem from "./BlogAreaItem";

const BlogArea = () => {
  const blog_area_items = [
    {
      src: "/img/blog/blog_img01.jpg",
      tag: "Branding",
      title: "How To Create JavaScript Vanilla Gantt Chart: Adding",
      author_img: "/img/blog/blog_avatar01.png",
      author_name: "Ataur",
    },
    {
      src: "/img/blog/blog_img02.jpg",
      tag: "Branding",
      title: "How To Create JavaScript Vanilla Gantt Chart: Adding",
      author_img: "/img/blog/blog_avatar02.png",
      author_name: "Ataur",
    },
    {
      src: "/img/blog/blog_img03.jpg",
      tag: "Branding",
      title: "How To Create JavaScript Vanilla Gantt Chart: Adding",
      author_img: "/img/blog/blog_avatar03.png",
      author_name: "Ataur",
    },
  ];

  return (
    <section className="blog-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title text-center mb-50">
              <span className="sub-title">My Blog</span>
              <h2 className="title">News & Updates</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {blog_area_items.map((x, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <BlogAreaItem item={x} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArea;
