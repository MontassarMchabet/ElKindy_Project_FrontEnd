import React from "react";

const BlogCategories = () => {
  const categories = [
    {
      title: "Travel",
      count: 3,
    },
    {
      title: "Sport",
      count: 7,
    },
    {
      title: "Education",
      count: 12,
    },
    {
      title: "Business",
      count: 5,
    },
  ];

  return (
    <div className="blog-cat-list">
      <ul className="list-wrap">
        {categories.map((x, index) => (
          <li key={index}>
            <a href="#">
              {x.title} <span>({x.count})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
