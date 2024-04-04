import React from "react";
import { ProgressBar } from "react-bootstrap";
import "../SpaceOne/SpaceOne.css";

export default function SpaceOne() {
  const now = 60;
  const progressInstance = <ProgressBar now={now} label={`${now}%`} />;
  return <div className="SpaceOne">{progressInstance}</div>;
}
