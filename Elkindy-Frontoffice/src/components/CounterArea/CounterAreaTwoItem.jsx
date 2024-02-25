import React from "react";
import Odometer from "react-odometerjs";

const CounterAreaTwoItem = (props) => {
  return (
    <>
      <div className="counter-item-two">
        <div className="icon">
          <img src={props.item.src} alt="" />
        </div>
        <div className="content">
          <span className="count odometer" data-count="252">
            <Odometer
              value={props.amount}
              format="(,ddd).dd"
              duration={1000}
              animation={"count"}
            />

            {props.item.suffix}
          </span>

          <p>{props.item.title}</p>
        </div>
      </div>

   
    </>
  );
};

export default CounterAreaTwoItem;
