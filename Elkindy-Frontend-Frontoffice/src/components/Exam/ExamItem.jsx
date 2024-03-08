import React from "react";
import { Link } from "react-router-dom";

const ExamItem = (props) => {
    return (
        <div className="exam-item">
          <div
            className="sector"
            style={{ backgroundColor: props.item.sectorColor }}
          ></div>
          <div className="content">
            <div className="exam-meta">
              <ul className="list-wrap">
                <li className="date">{props.item.date}</li>
                <li className="icon">
                  <i className={props.item.icon}></i>
                </li>
              </ul>
            </div>
            <h4 className="title">
              <Link to={props.item.url}>{props.item.title}</Link>
            </h4>
            <p>{props.item.desc}</p>
          </div>
        </div>
      );
    };

export default ExamItem;
