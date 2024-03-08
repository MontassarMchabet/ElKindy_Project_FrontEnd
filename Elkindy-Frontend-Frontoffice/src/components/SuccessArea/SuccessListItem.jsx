import React from "react";

const SuccessListItem = ({ item }) => {
  return (
    <>
      <div className="content">
        <img src={item.src} alt="" />
        <span>
          {item.title} {item.percentage}%
        </span>
      </div>

      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${item.percentage}%` }}
          aria-valuenow={item.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </>
  );
};

export default SuccessListItem;
