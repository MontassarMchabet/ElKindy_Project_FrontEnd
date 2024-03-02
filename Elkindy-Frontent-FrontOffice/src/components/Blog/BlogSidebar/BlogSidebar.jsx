import React from "react";
import BlogCategories from "./BlogCategories";
import BlogPopulars from "./BlogPopulars";
import BlogSectors from "./BlogSectors";
import BlogTags from "./BlogTags";

const BlogSidebar = () => {
  return (
    <aside className="blog-sidebar">
      {/* sectors */}
      <div className="widget">
        <BlogSectors />
      </div>

      {/* categories */}
      <div className="widget">
        <h2 className="widget-title">Categories</h2>
        <BlogCategories />
      </div>

      {/* populars */}
      <div className="widget">
        <h2 className="widget-title">Popular posts</h2>
        <BlogPopulars />
      </div>

      {/* tags */}
      <div className="widget">
        <h2 className="widget-title">Tags</h2>
        <BlogTags />
      </div>
    </aside>
  );
};

export default BlogSidebar;
