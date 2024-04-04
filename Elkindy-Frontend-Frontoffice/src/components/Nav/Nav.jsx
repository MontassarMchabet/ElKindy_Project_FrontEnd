import React from "react";
import { Navbar } from "react-bootstrap";
import "../SpaceOne/SpaceOne.css";

export default function Nav() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" fixed="bottom">
      <Navbar.Brand href="/">
        <img
          src="/images/logo.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Navbar.Brand>
    </Navbar>
  );
}
