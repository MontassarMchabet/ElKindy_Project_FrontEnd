import React from "react";
import EventBlogItem from "./EventBlogItem";
import EventBlogPagination from "./EventBlogPagination";

const InnerEventBlogArea = () => {
  const blog_items = [
    {
      url: "/blog-details",
      src: "/img/blog/inner_blog_img01.jpg",
      tag: "Sector",
      reading_time: "5 Min",
      created_at: "March 17, 2022",
      author: "Victor Pacheco",
      title: "How to Post a Classified Ad Online or in Newspapers",
      desc: `Lorem ipsum dolor sit amet, sed nulla ante amet, elementum tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac scelerisque nibh dolores consectetuer, nulla aptent est pede. Scelerisque euismod varius mi, congue eget sed vestibulum, ornare cras sed nec.`,
    },
    {
      url: "/blog-details",
      src: "/img/blog/inner_blog_img02.jpg",
      tag: "Sector",
      reading_time: "5 Min",
      created_at: "March 17, 2022",
      author: "Victor Pacheco",
      title: "How to Post a Classified Ad Online or in Newspapers",
      desc: `Lorem ipsum dolor sit amet, sed nulla ante amet, elementum tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac scelerisque nibh dolores consectetuer, nulla aptent est pede. Scelerisque euismod varius mi, congue eget sed vestibulum, ornare cras sed nec.`,
    },
    {
      url: "/blog-details",
      src: "/img/blog/inner_blog_img03.jpg",
      tag: "Sector",
      reading_time: "5 Min",
      created_at: "March 17, 2022",
      author: "Victor Pacheco",
      title: "How to Post a Classified Ad Online or in Newspapers",
      desc: `Lorem ipsum dolor sit amet, sed nulla ante amet, elementum tincidunt arcu sed laoreet, natoque ac eget imperdiet. Ac scelerisque nibh dolores consectetuer, nulla aptent est pede. Scelerisque euismod varius mi, congue eget sed vestibulum, ornare cras sed nec.`,
    },
  ];

  return (
    <section className="inner-blog-area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-70">
            {blog_items.map((x, index) => (
              <EventBlogItem key={index} item={x} />
            ))}

            {/* pagination */}
            <EventBlogPagination />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerEventBlogArea;
