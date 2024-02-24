import React from "react";
import Odometer from "react-odometerjs";

const CounterAreaThreeItem = (props) => {
  return (
    <>
      <div className="counter-item-three">
        <div className="icon">
          <img src={props.item.src} alt="" />
        </div>
        <div className="content">
          <h2 className="count">
            <span className="odometer" data-count="210">
              <Odometer
                value={props.amount}
                format="(,ddd).dd"
                duration={1000}
                animation={"count"}
              />
            </span>
            +
          </h2>
          <p>
            {props.item.titles[0]} <span>{props.item.titles[1]}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CounterAreaThreeItem;
