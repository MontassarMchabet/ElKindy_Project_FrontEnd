import React from "react";

const ToolsAreaItem = ({ item }) => {
  return (
    <div className="tools-item">
      <div className="tools-icon">
        <img src={item.src} alt="" />
      </div>

      <div className="tools-content">
        <h3 className="title">{item.title}</h3>

        <p>{item.desc}</p>
      </div>
    </div>
  );
};

export default ToolsAreaItem;
