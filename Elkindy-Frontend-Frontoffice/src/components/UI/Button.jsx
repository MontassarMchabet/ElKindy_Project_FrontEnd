import React from "react";
import { Button } from "react-bootstrap";
import "../UI/Button.css";

const MyButton = () => {
  return (
    <Button className="mybutton" size="lg" block>
      Answer goes here.
    </Button>
  );
};

export default MyButton;
