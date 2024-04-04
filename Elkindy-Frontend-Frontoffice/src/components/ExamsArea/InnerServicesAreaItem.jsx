import React from "react";
import { Link } from "react-router-dom";

const InnerServicesAreaItem = ({ item, onItemClick }) => {
  const handleItemClick = () => {
      onItemClick(item);
  };
  return (
      <div className="services-item-four" style={{ backgroundColor: "white", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", height: "300px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="services-content-four">
              <h2 className="title">
                  <Link to={`/exam-details/${item._id}`}>
                      {item.title}
                  </Link>
              </h2>
              <p>{item.description}</p>
          </div>

          <div className="blog-meta-two">
              <ul className="list-wrap">
                  <li className="tag">
                      <Link to="/blog">{item.type}</Link>
                  </li>
                  <li>
  <i className="fal fa-calendar"></i>
  {item.endAt ? 
    (new Date(item.endAt) < new Date()) ?
      `${new Date(item.endAt).toLocaleDateString()} - Exam expired` :
      `${new Date(item.endAt).toLocaleDateString()} - ${new Date(item.endAt).getHours()}:${(new Date(item.endAt).getMinutes() < 10 ? '0' : '') + new Date(item.endAt).getMinutes()}`
    : 'No specified end time'}
</li>





              </ul>
          </div>
      </div>
  );
};

export default InnerServicesAreaItem;
