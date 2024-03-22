import React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import Demo from "./demo";
export default Demo;
//render(<Demo />, document.getElementById("root"));
//export default CustomScheduler;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("Schedule");
    if (container) {
        ReactDOM.render(<Demo />, container);
    } else {
        console.error("Target container '#schedule' is not found in the DOM.");
    }
});
