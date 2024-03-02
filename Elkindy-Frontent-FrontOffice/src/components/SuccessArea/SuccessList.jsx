import React from "react";
import SuccessListItem from "./SuccessListItem";

const SuccessList = () => {
  const success_list_items = [
    {
      src: "/img/icon/success_icon01.png",
      title: "App Design",
      percentage: 85,
    },
    {
      src: "/img/icon/success_icon02.png",
      title: "App Design",
      percentage: 75,
    },
    {
      src: "/img/icon/success_icon03.png",
      title: "App Design",
      percentage: 95,
    },
    {
      src: "/img/icon/success_icon04.png",
      title: "App Design",
      percentage: 99,
    },
  ];

  return (
    <div className="success-list">
      <ul className="list-wrap">
        {success_list_items.map((x, index) => (
          <li key={index}>
            <SuccessListItem item={x} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuccessList;
