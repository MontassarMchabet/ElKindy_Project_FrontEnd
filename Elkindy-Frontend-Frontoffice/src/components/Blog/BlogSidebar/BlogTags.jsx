import React from "react";

const BlogTags = () => {
  const tags = ["Design", "Fashion", "Looks", "Men", "Music", "Style", "Women"];

  return (
    <div className="tag-list">
      <ul className="list-wrap">
        {tags.map((tag, index) => (
          <li key={index}>
            <a href="#">{tag}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTags;
