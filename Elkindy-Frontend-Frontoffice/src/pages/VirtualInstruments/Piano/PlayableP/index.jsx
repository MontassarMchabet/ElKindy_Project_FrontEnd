import React from 'react';
import './style.css'; // Import your CSS file
import './script.js'; // Import your JavaScript file (if necessary)

const Piano = () => {
  return (
    <div className="wrapper">
      <header>
        <h2>Playable PIANO</h2>
        <div className="column volume-slider">
          <span>Volume</span><input type="range" min="0" max="1" defaultValue="0.5" step="any" />
        </div>
        <div className="column keys-checkbox">
          <span>Show Keys</span><input type="checkbox" defaultChecked />
        </div>
      </header>
      <ul className="piano-keys">
        <li className="key white" data-key="a"><span>a</span></li>
        <li className="key black" data-key="w"><span>w</span></li>
        <li className="key white" data-key="s"><span>s</span></li>
        <li className="key black" data-key="e"><span>e</span></li>
        <li className="key white" data-key="d"><span>d</span></li>
        <li className="key white" data-key="f"><span>f</span></li>
        <li className="key black" data-key="t"><span>t</span></li>
        <li className="key white" data-key="g"><span>g</span></li>
        <li className="key black" data-key="y"><span>y</span></li>
        <li className="key white" data-key="h"><span>h</span></li>
        <li className="key black" data-key="u"><span>u</span></li>
        <li className="key white" data-key="j"><span>j</span></li>
        <li className="key white" data-key="k"><span>k</span></li>
        <li className="key black" data-key="o"><span>o</span></li>
        <li className="key white" data-key="l"><span>l</span></li>
        <li className="key black" data-key="p"><span>p</span></li>
        <li className="key white" data-key=";"><span>;</span></li>
      </ul>
    </div>
  );
};

export default Piano;
