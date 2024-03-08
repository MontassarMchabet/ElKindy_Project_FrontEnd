import React from "react";

const BlogPagination = () => {
  return (
    <div className="pagination-wrap">
      <nav aria-label="Page navigation example">
        <ul className="pagination list-wrap">
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BlogPagination;
